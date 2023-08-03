from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Pin, Favorite, db

favorite_routes = Blueprint('favorites', __name__)

@favorite_routes.route('/<int:boardId>/<int:pinId>',methods=['DELETE'])
@login_required
def unfavorite_pin(pinId, boardId):
    fav_pin = Favorite.query.filter_by(pin_id=pinId, board_id=boardId).first()

    if fav_pin:
        db.session.delete(fav_pin)
        db.session.commit()
        return {"Response": "Successfully unfavorited this pin"}
    else:
        return {"Response": "Could not unfavorite this pin"}
