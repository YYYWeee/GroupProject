from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Board, BoardUser, Pin, Favorite, Pin, db, User, PinBoard
from app.forms.board_form import BoardForm
from sqlalchemy import and_

board_routes = Blueprint('board', __name__)

role_types = ['owner', 'collaborator']


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# get all the boards and related info for the username, might not be the session user.


@board_routes.route('/<string:username>')
def get_user_all_boards(username):
    # all_boards = Board.query.filter(Board.owner_id == current_user.id).all()
    print(username)
    target_user = User.query.filter(User.username == username).first()
    if not target_user:
        return jsonify({"message": "User not found"}), 404
    print(target_user.to_dict())
    all_boards = Board.query \
        .join(BoardUser) \
        .filter(and_(BoardUser.user_id == target_user.id, BoardUser.role.in_(role_types))) \
        .order_by(Board.updated_at.desc()).all()

    # find all the collborators for each board belonging to this user,
    # get the id and user image and updated_at for sorting the membership date
    response = {}
    for board in all_boards:
        response[board.id] = board.to_dict_simple()
        response[board.id]["membersId"] = []
        for membership in board.board_users:
            response[board.id]["membersId"].append(membership.user_id)

    allUsers = User.query.all()

    returned_response = {"boards": response,
                         "boardUser": target_user.to_dict(),
                         "allUsers": [user.to_dict_simple() for user in allUsers]}
    return returned_response

    # response = [board.to_dict_simple() for board in all_boards]
    # returned_response = {"boards": response,
    #                      "boardUser": target_user.to_dict()}
    # return returned_response

# get a single board of user


@board_routes.route('/<int:id>', methods=['GET'])
def get_board(id):
    board = Board.query.get(id)
    if not board:
        return {'errors': ['No board found']}
    response = board.to_dict()

    # finding all collaborators for this board
    # collaborators = db.session.query(User).\
    #     join(BoardUser, User.id == BoardUser.user_id).\
    #     filter(and_(BoardUser.board_id == id,
    #            BoardUser.role == 'collaborator')).all()
    collaborators = db.session.query(User).\
        join(BoardUser, User.id == BoardUser.user_id).\
        filter(BoardUser.board_id == id).all()
    response['collaborators'] = [col.to_dict() for col in collaborators]

    # fnding all pins for this board
    associated_pins = db.session.query(Pin).\
        join(PinBoard, Pin.id == PinBoard.pin_id).\
        filter(PinBoard.board_id == id).all()
    # associated_pins = board.pins  # a list of associated pin
    response['associated_pins'] = [col.to_dict()
                                   for col in associated_pins]
    return response


@board_routes.route('/new', methods=['POST'])
def create_board():
    form = BoardForm()
    users = User.query.all()
    user_choices = [(user.id, user.username)for user in users]
    form.collaborators.choices = user_choices
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_board = Board(
            owner_id=current_user.id,
            name=form.data['name'],
            is_secret=form.data['is_secret']
        )
        db.session.add(new_board)
        db.session.commit()
        created_board = Board.query.order_by(Board.id.desc()).first()
        new_board_user = BoardUser(
            user_id=created_board.owner_id,
            board_id=created_board.id,
            role='owner'
        )
        db.session.add(new_board_user)
        db.session.commit()
        response = created_board.to_dict()
        return response
    if form.errors:
        return form.errors


# specific route to add collaborators on boarduser table for invite collaborators


@board_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_board(id):
    form = BoardForm()

    users = User.query.all()
    user_choices = [(user.id, user.username)for user in users]
    form.collaborators.choices = user_choices

    form['csrf_token'].data = request.cookies['csrf_token']
    target_board = Board.query.get(id)
    if form.validate_on_submit():
        target_board.name = form.data['name']
        target_board.description = form.data['description']
        target_board.is_secret = form.data['is_secret']
        db.session.commit()
        # for collaborator in form.data['collaborators']:
        #     new_board_user = BoardUser(
        #         user_id = collaborator,
        #         board_id = id,
        #         role = 'collaborator'
        #     )
        #     db.session.add(new_board_user)
        #     db.session.commit()
        # this route is abandoned since there is a specific route adding collaborators

        response = target_board.to_dict()
        return response
    if form.errors:
        return form.errors


# delete a board


@board_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_board(id):
    board = Board.query.get(id)
    if not board:
        return {'errors': ['No board found']}
    else:
        db.session.delete(board)
        db.session.commit()
        return {"Response": "Successfully deleted board"}


@board_routes.route('/<int:id>/collaborator/new', methods=['POST'])
@login_required
def add_collaborator(id):
    form = BoardForm()
    users = User.query.all()
    user_choices = [(user.id, user.username)for user in users]
    form.collaborators.choices = user_choices
    form['csrf_token'].data = request.cookies['csrf_token']
    target_board = Board.query.get(id)
    if target_board.is_default:
        return jsonify({"message": "Cannot add colloborator to your default board"}), 408

    if form.validate_on_submit():
        for collaborator in form.data['collaborators']:
            exist_user = BoardUser.query.filter_by(
                user_id=collaborator, board_id=id).first()
            if not exist_user:
                new_collaborator = BoardUser(
                    board_id=id,
                    user_id=collaborator,
                    role='collaborator'
                )
                db.session.add(new_collaborator)

                # START: add all the pins in target_board to the default board of this new collaborator
                collaborator_default_board = Board.query.filter(and_(
                    Board.owner_id == collaborator, Board.is_default == True)).first()
                # get all the pins in the target_board
                associated_pins = db.session.query(Pin).\
                    join(PinBoard, Pin.id == PinBoard.pin_id).\
                    filter(PinBoard.board_id == target_board.id).all()
                for pin in associated_pins:
                    pin_found_in_default = PinBoard.query.filter(and_(
                        PinBoard.pin_id == pin.id, PinBoard.board_id == collaborator_default_board.id)).first()
                    if not pin_found_in_default:
                        new_pin_in_default = PinBoard(
                            pin_id=pin.id,
                            board_id=collaborator_default_board.id,
                        )
                        db.session.add(new_pin_in_default)
                db.session.commit()
                # END!

        collaborators = db.session.query(User).\
            join(BoardUser, User.id == BoardUser.user_id).\
            filter(and_(BoardUser.board_id == id,
                   BoardUser.role == 'collaborator')).all()
        response = target_board.to_dict()
        response['collaborators'] = [col.to_dict() for col in collaborators]
        return response
    if form.errors:
        return form.errors


@board_routes.route('/<int:boardId>/pins/<int:pinId>', methods=['POST'])
@login_required
def add_pin_to_board(boardId, pinId):
    pin = Pin.query.get(pinId)
    if not pin:
        return jsonify({"message": "Pin not found"}), 404

    # the pin need to save in both non-default saved_board and default_board
    # the user cannot choose to save to default board if it already exists in default board.
    # the user cannot choose to save to feature board if it already exists in feature board.
    saved_board = Board.query.get(boardId)
    if not saved_board:
        return jsonify({"message": "Board not found"}), 404
    pin_found_in_saved = PinBoard.query.filter(and_(
        PinBoard.pin_id == pinId, PinBoard.board_id == saved_board.id)).first()
    if pin_found_in_saved:
        return jsonify({"message": "Pin already exists in this board"}), 408
    else:
        # add this pin to saved_board
        new_pin_in_board = PinBoard(
            pin_id=pinId,
            board_id=boardId,
        )
        db.session.add(new_pin_in_board)

    # if the user selected non-default saved_board, then need to save to default_board as well.
    # so if what user selected is already his default board, this default_board set to None to avoid duplicates in default boards
    default_board = Board.query.filter(and_(
        Board.owner_id == current_user.id, Board.is_default == True)).first() if not saved_board.is_default else None
    if default_board is not None:
        # if the pin already exist in default board, then don't add again.
        pin_found_in_default = PinBoard.query.filter(and_(
            PinBoard.pin_id == pinId, PinBoard.board_id == default_board.id)).first()
        if not pin_found_in_default:
            new_pin_in_default = PinBoard(
                pin_id=pinId,
                board_id=default_board.id,
            )
            db.session.add(new_pin_in_default)
    db.session.commit()
    return {"message": ["Pin added successfully"]}


@board_routes.route('/<int:boardId>/pins/<int:pinId>', methods=['DELETE'])
@login_required
def remove_pin_from_board(boardId, pinId):
    pin = Pin.query.get(pinId)
    if not pin:
        return jsonify({"message": "Pin not found"}), 404

    saved_board = Board.query.get(boardId)
    if not saved_board:
        return jsonify({"message": "Board not found"}), 404

    pin_found_in_saved = PinBoard.query.filter(and_(
        PinBoard.pin_id == pinId, PinBoard.board_id == saved_board.id)).first()
    if pin_found_in_saved:
        # remove this pin to saved_board
        db.session.delete(pin_found_in_saved)
        db.session.commit()
        return {"Response": "Successfully remove pin from this board"}


# get all the favorite pins of a board
@board_routes.route('/<int:id>/favorite')
@login_required
def board_favorite(id):
    board = Board.query.get(id)
    if not board:
        return {'errors': ['No board found']}
    else:
        favorite_pins = Pin.query.join(Favorite, Pin.id == Favorite.pin_id).filter(
            Favorite.board_id == id).all()

        response = [pin.to_dict() for pin in favorite_pins]
        return response
