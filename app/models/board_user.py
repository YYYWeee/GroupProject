from .db import db, environment, SCHEMA, add_prefix_for_prod

role_types = ['owner', 'collaborator']

class BoardUser(db.Model):
    __tablename__ = 'board_users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    board_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("boards.id")),nullable=False)
    user_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("users.id")),nullable=False)
    role = db.Column(db.Enum(*role_types), nullable=False)

    users = db.relationship('User', back_populates ='board_users')
    boards = db.relationship('Board', back_populates ='board_users')
