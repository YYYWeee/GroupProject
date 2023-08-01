from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Pin, Comment, db
from datetime import datetime
from app.forms.comment_form import CommentForm

pin_routes = Blueprint('pins', __name__)


@pin_routes.route('')
# @login_required
def get_all_pins():
    """
    Query for all pins and returns them in a list of pin dictionaries
    """
    pins = Pin.query.all()
    return {"pins": [pin.to_dict() for pin in pins]}


@pin_routes.route('/<int:pinId>')
# @login_required
def get_one_pin(pinId):
    """
    Query for all pins and returns them in a list of pin dictionaries
    """
    pin = Pin.query.get(pinId)
    response = pin.to_dict()
    response["creator"] = pin.user.to_dict()
    # comments_list = []
    # for comment in pin.comments:
    #     comment_dict = comment.to_dict()
    #     comment_dict["commenter"] = {
    #         "photo_url": comment.user.photo_url, "first_name": comment.user.first_name}
    #     comments_list.append(comment_dict)
    # response["comments"] = sorted(
    #     comments_list, key=lambda x: x["updated_at"], reverse=True)
    return response


@pin_routes.route('/<int:pinId>/comments')
def get_pin_comments_by_pinId(pinId):
    comments = Comment.query.join(Pin).filter(Pin.id == pinId)
    comments_list = []
    for comment in comments:
        comment_dict = comment.to_dict()
        comment_dict["commenter"] = {
            "photo_url": comment.user.photo_url, "first_name": comment.user.first_name}
        comments_list.append(comment_dict)
    return comments_list


@pin_routes.route('/<int:pinId>/comments', methods=['POST'])
@login_required
def add_comment_to_pin(pinId):
    form = CommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        new_comment = Comment(
            pin_id=pinId,
            user_id=current_user.id,
            message=form.data["message"]
        )
        db.session.add(new_comment)
        db.session.commit()
        response = new_comment.to_dict()
        response["commenter"] = {
            "photo_url": new_comment.user.photo_url, "first_name": new_comment.user.first_name}
        return response
    if form.errors:
        print(form.errors)
        return form.errors
