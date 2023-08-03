from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Board, BoardUser, Pin, db, User
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

# get all current user's board


@board_routes.route('')
@login_required
def get_all_boards():
    # all_boards = Board.query.filter(Board.owner_id == current_user.id).all()
    all_boards = Board.query \
        .join(BoardUser) \
        .filter(BoardUser.user_id == current_user.id, BoardUser.role.in_(role_types)) \
        .all()
    response = [board.to_dict() for board in all_boards]
    return response

# get a single board of user

@board_routes.route('/<int:id>',methods=['GET'])
@login_required
def get_board(id):
    if request.method == 'GET':
        board = Board.query.get(id)
        if not board:
            return {'errors': ['No board found']}
        collaborators = db.session.query(User).\
        join(BoardUser, User.id == BoardUser.user_id).\
        filter(and_(BoardUser.board_id == id, BoardUser.role == 'collaborator')).all()
        response = board.to_dict()
        response['collaborators'] = [col.to_dict() for col in collaborators]
        associated_pins = board.pins  # a list of associated pin
        response['associated_pins'] = [col.to_dict() for col in associated_pins]
        return response


@board_routes.route('/new', methods=['POST'])
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


@board_routes.route('/<int:id>',methods=['PUT'])
@login_required
def update_board(id):
        form = BoardForm()
        users = User.query.all()
        user_choices = [(user.id,user.username)for user in users]
        form.collaborators.choices = user_choices
        form['csrf_token'].data = request.cookies['csrf_token']
        target_board = Board.query.get(id)
        if form.validate_on_submit():
            target_board.name = form.data['name']
            target_board.description = form.data['description']
            target_board.is_secret = form.data['is_secret']
            db.session.commit()
            print('col form data', form.data['collaborators'])
            for collaborator in form.data['collaborators']:
                new_board_user = BoardUser(
                    user_id = collaborator,
                    board_id = id,
                    role = 'collaborator'
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

    pin = Pin.query.get(pinId)
    if not pin:
        return jsonify({"message": "Pin not found"}), 404

    if (pin not in board.pins):
        board.pins.extend([pin])
        db.session.commit()
        return {"message": "Pin added successfully"}
    else:
        return jsonify({"message": "Pin already exists in this board"}), 404
