from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Board, BoardUser, db

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

# get all the current user's board
@board_routes.route('')
# @login_required
def get_all_boards():
    # all_boards = Board.query.filter(Board.owner_id == current_user.id).all()
    all_boards = Board.query \
        .join(BoardUser) \
        .filter(BoardUser.user_id == current_user.id, BoardUser.role.in_(role_types)) \
        .all()
    response = [board.to_dict() for board in all_boards]
    return response


@board_routes.route('/<int:id>')
# @login_required do we want it to be logged in required
def get_single_board(id):
    board = Board.query.get(id)
    if not board:
        return {'errors': ['No board found']}
    response = board.to_dict()
    return response


# delete a board
@board_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_board(id):
    board = Board.query.get(id)
    if not board:
        return {'errors': ['No board found']}
    else:
        db.session.delete(board)
        db.sessin.commit()
        return {"Response": "Successfully deleted board"}
