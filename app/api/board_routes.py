from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Board, BoardUser, Pin, db, User, PinBoard
from app.forms.board_form import BoardForm

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
        .filter(BoardUser.user_id == target_user.id, BoardUser.role.in_(role_types)) \
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
@login_required
def get_board(id):
    if request.method == 'GET':
        board = Board.query.get(id)
        if not board:
            return {'errors': ['No board found']}
        response = board.to_dict()
        return response


@board_routes.route('/new', methods=['POST'])
@login_required
def create_board():
    form = BoardForm()
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


@board_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_board(id):
    form = BoardForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    target_board = Board.query.get(id)
    if form.validate_on_submit():
        target_board.name = form.data['name']
        target_board.description = form.data['description']
        target_board.is_secret = form.data['is_secret']
        db.session.commit()

        # collaborator
        user_id_list = form.data['collaborators'].split(',')
        for item in user_id_list:
            new_board_user = BoardUser(
                user_id=item,
                board_id=target_board.id,
                role='collaborator'
            )
            db.session.add(new_board_user)
            db.session.commit()
        response = target_board.to_dict()
        return response
    if form.errors:
        return form.errors


@board_routes.route('/<int:boardId>/pins', methods=['POST'])
@login_required
def add_pin_to_board(boardId):
    pin_data = request.json
    pinId = pin_data.get('pinId')

    board = Board.query.get(boardId)
    if not board:
        return jsonify({"message": "Board not found"}), 404
    default_board = Board.query.filter(
        owner_id=current_user.id, is_default=True)

    pin = Pin.query.get(pinId).join
    if not pin:
        return jsonify({"message": "Pin not found"}), 404

    new_pin_in_board = PinBoard(
        pin_id=pinId,
        board_id=boardId,
    )
    db.session.add(new_pin_in_board)

    pin_found_in_default = PinBoard.query.filter(
        pin_id=pinId, board_id=default_board.id).first()
    if not pin_found_in_default:
        new_pin_in_default = PinBoard(
            pin_id=pinId,
            board_id=default_board.id,
        )
        db.session.add(new_pin_in_default)
    db.session.commit()
    return {"message": ["Pin added successfully", "Pin already exists in default board" if pin_found_in_default else ""]}

    # if (pin not in board.pins):
    #     board.pins.extend([pin])
    #     db.session.commit()
    #     return {"message": "Pin added successfully"}
    # else:
    #     return jsonify({"message": "Pin already exists in this board"}), 404
