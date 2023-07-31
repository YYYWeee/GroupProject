from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired,Length

class BoardForm(FlaskForm):
    name = StringField('Name', validators = [DataRequired(),Length(min=0,max=50,message='Please enter no more than 50 characters.' )])
    is_secret = BooleanField('Keep this board secret',default = True)
