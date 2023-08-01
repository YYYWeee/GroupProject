from flask import Blueprint, jsonify,request
from flask_login import login_required, current_user
from app.models import Board, BoardUser, db
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

@board_routes.route('/new',methods=['POST'])
def create_board():
    form = BoardForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_board = Board(
            owner_id = current_user.id,
            name = form.data['name'],
            is_secret = form.data['is_secret']
        )
        db.session.add(new_board)
        db.session.commit()
        created_board = Board.query.order_by(Board.id.desc()).first()
        new_board_user = BoardUser(
            user_id= created_board.owner_id,
            board_id = created_board.id,
            role = 'owner'
                                   )
        db.session.add(new_board_user)
        db.session.commit()
        response = created_board.to_dict()
        return response
    if form.errors:
        return form.errors
    
@board_routes.route('/<int:id>',methods=['GET','PUT','DELETE'])
@login_required
def handle_board(id):
    
    
    if request.method == 'GET':
        board = Board.query.get(id)
        if not board:
            return {'errors': ['No board found']}
        response = board.to_dict()
        return response
    
    
    elif request.method == 'PUT':
        form = BoardForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        target_board = Board.query.get(id)
        if form.validate_on_submit():
            target_board.name = form.data['name']
            target_board.description = form.data['description']
            target_board.is_secret = form.data['is_secret']
            db.session.commit()

            #collaborator
            user_id_list = form.data['collaborators'].split(',')
            for item in user_id_list:
                new_board_user = BoardUser(
                user_id= item,
                board_id = target_board.id,
                role = 'collaborator'
                )
                db.session.add(new_board_user)
                db.session.commit()
            response = target_board.to_dict()
            return response
        if form.errors:
            return form.errors
        

    elif request.method == 'DELETE':
        board = Board.query.get(id)
        if not board:
            return {'errors': ['No board found']}
        else:
            db.session.delete(board)
            db.session.commit()
            return {"Response": "Successfully deleted board"}



    

        
        




# @board_routes.route('/<int:id>')
# # @login_required do we want it to be logged in required
# def get_single_board(id):
    

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
