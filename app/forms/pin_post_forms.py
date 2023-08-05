from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, DecimalField, BooleanField, SubmitField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired, URL, NumberRange, Length
from ..api.AWS_helpers import ALLOWED_EXTENSIONS


class PinForm(FlaskForm):

    image = FileField("Image File", validators=[
                      FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    title = StringField('Title', validators=[DataRequired()])
    description = StringField('Description')
    alt_text = StringField('Alt text')
    link = StringField('Link')
    # note_to_self=StringField('Note To Self')
    # allow_comment=BooleanField('Allow')
    # show_shopping_recommendations=BooleanField('Show')
    # submit = SubmitField("Submit")
    session_user_boards = SelectField('Boards', coerce=int)
