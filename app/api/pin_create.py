from flask import Blueprint, render_template, redirect, url_for, request
from app.forms.pin_post_forms import PinForm
from ..models.pin import Pin
from ..models.user import User
from ..models.db import db
from random import randint
from flask_login import login_required, current_user
from .AWS_helpers import upload_file_to_s3, get_unique_filename
from .auth_routes import validation_errors_to_error_messages

pin_create_route = Blueprint("pin_create", __name__)


@pin_create_route.route('',methods=["POST"])
@login_required
def new_pin():
    form = PinForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    count = Pin.query.all().count

    if form.validate_on_submit():

        image_file = form.data["image"]
        image_file.filename = get_unique_filename(image_file.filename)
        upload = upload_file_to_s3(image_file)
        # if "url" not in upload:
        #     print(upload)
        #     return render_template("post_form.html", form=form, errors=[upload])

        new_pin= Pin(
            owner_id = form.data['owner_id'],
            image_url= upload["url"],
            title =form.data['title'],
            description=form.data['description'],
            alt_text=form.data['alt_text'],
            link=form.data['link'],
            note_to_self=form.data['note_to_self'],
            # allow_comment=form.data['allow_comment'],
            # show_shopping_recommendations=form.data['show_shopping_recommendations']
        )
        print(new_pin)
        db.session.add(new_pin)
        db.session.commit()
        return {"new Pin": new_pin.to_dict()}


    print(form.errors)
    return {"errors": validation_errors_to_error_messages(form.errors)}
