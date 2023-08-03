from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required, current_user
from datetime import datetime
from app.models import Comment, db
from app.forms.edit_comment_form import EditCommentForm

comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
    comment = Comment.query.get(id)
    if not comment:
        return jsonify({"message": "Comment not found"}), 404
    if (current_user.id != comment.user_id):
        return redirect('/api/auth/unauthorized')
    db.session.delete(comment)
    db.session.commit()
    return {"id": comment.id}


@comment_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_comment_for_pin(id):
    form = EditCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    target_comment = Comment.query.get(id)
    if not target_comment:
        return jsonify({"message": "Comment not found"}), 404
    if (current_user.id != target_comment.user_id):
        return redirect('/api/auth/unauthorized')
    if form.validate_on_submit():
        target_comment.message = form.data["message"]
        db.session.commit()
        response = target_comment.to_dict()
        response["commenter"] = {
            "photo_url": target_comment.user.photo_url, "first_name": target_comment.user.first_name
        }
        return response
    if form.errors:
        print(form.errors)
        return form.errors
