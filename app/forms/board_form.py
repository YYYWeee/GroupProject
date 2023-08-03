from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField,SelectMultipleField
from wtforms.validators import DataRequired,Length

class BoardForm(FlaskForm):
    name = StringField('Name', validators = [DataRequired(),Length(min=0,max=50,message='Please enter no more than 50 characters.' )])
    is_secret = BooleanField('Keep this board secret',default = True)
    description = StringField('Description', validators = [Length(min=0,max=500,message='Please enter no more than 500 characters.' )])
    collaborators = SelectMultipleField('Collaborators',coerce=int)

