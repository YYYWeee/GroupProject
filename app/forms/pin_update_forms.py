from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, DecimalField, BooleanField, SubmitField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired, URL, NumberRange, Length
from ..api.AWS_helpers import ALLOWED_EXTENSIONS

class EditPinForm(FlaskForm):

    title = StringField('Title', validators=[DataRequired()])
    description=StringField('Description')
    alt_text=StringField('Alt text')
    link=StringField('Link')
    note_to_self=StringField('Note To Self')
    allow_comment=BooleanField('Allow people to comment')
    # show_shopping_recommendations=BooleanField('Show shopping recommendations')
    submit = SubmitField("Submit")
