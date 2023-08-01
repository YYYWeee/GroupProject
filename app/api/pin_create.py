from flask import Blueprint, redirect, url_for, request
from ..forms.pin_post_forms import PinForm
from ..models.pin import Pin
from ..models.user import User
from ..models.db import db
from random import randint
from flask_login import login_required, current_user
from .AWS_helpers import upload_file_to_s3, get_unique_filename
from .auth_routes import validation_errors_to_error_messages

pin_create_route = Blueprint("pin_create", __name__)


@pin_create_route.route('', methods=["GET", "POST"])
@login_required
def new_pin():
    form = PinForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # count = Pin.query.all().count
    print('Bckend now!!!!!!!', current_user)

    if form.validate_on_submit():

        image_file = form.data["image"]
        image_file.filename = get_unique_filename(image_file.filename)
        upload = upload_file_to_s3(image_file)

        new_pin = Pin(
            owner_id=current_user.to_dict()['id'],
            image_url=upload["url"],
            title=form.data['title'],
            description=form.data['description'],
            alt_text=form.data['alt_text'],
            link=form.data['link']
        )
        print('new pin@@@@@@@@@@@@@@@@@@@@', new_pin.to_dict())
        db.session.add(new_pin)
        db.session.commit()
        # return {"new Pin": new_pin.to_dict()}

    print(form.errors)
    return {"errors": validation_errors_to_error_messages(form.errors)}
