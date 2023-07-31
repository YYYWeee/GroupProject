from flask import Blueprint, jsonify
from flask_login import login_required,current_user
from app.models import Pin

pin_routes = Blueprint('pins', __name__)


@pin_routes.route('')
@login_required
def get_all_pins():
    """
    Query for all pins and returns them in a list of pin dictionaries
    """
    pins = Pin.query.order_by(Pin.created_at.desc()).all()
    return {"pins": [pin.to_dict() for pin in pins]}


@pin_routes.route('/<int:pinId>')
@login_required
def get_one_pin(pinId):
    """
    Query for all pins and returns them in a list of pin dictionaries
    """
    pin = Pin.query.get(pinId)
    response = pin.to_dict()
    response["creator"] = pin.user.to_dict()
    response["comments"] = []
    for comment in pin.comments:
        comment_dict = comment.to_dict()
        comment_dict["commenter"] = {
            "photo_url": comment.user.photo_url, "first_name": comment.user.first_name}
        response["comments"].append(comment_dict)
    return response
