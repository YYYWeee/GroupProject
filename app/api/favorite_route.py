from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Pin, Favorite, db

favorite_routes = Blueprint('favorites', __name__)

# mark a pin in a board as favorite


@favorite_routes.route('/<int:boardId>/<int:pinId>', methods=['DELETE'])
@login_required
def unfavorite_pin(pinId, boardId):
    fav_pin = Favorite.query.filter_by(pin_id=pinId, board_id=boardId).first()

    if fav_pin:
        db.session.delete(fav_pin)
        db.session.commit()
        # return {"Response": "Successfully unfavorited this pin"}
        return {"board_id": boardId, "pin_id": pinId, "user_id": current_user.id}
    else:
        return {"Response": "Could not unfavorite this pin"}

# unfavoriate a pin in a board


@favorite_routes.route('/<int:boardId>/<int:pinId>', methods=['POST'])
@login_required
def favorite_pin(boardId, pinId):
    pin = Pin.query.get(pinId)
    if not pin:
        return jsonify({"error": "Pin not found"}), 404

    favorite = Favorite.query.filter_by(board_id=boardId, pin_id=pinId).first()
    if favorite:
        return jsonify({"error": "Pin is already favorited"}), 400

    new_favorite = Favorite(
        board_id=boardId, pin_id=pinId, user_id=current_user.id)
    db.session.add(new_favorite)
    db.session.commit()

    response = new_favorite.to_dict()

    return response
