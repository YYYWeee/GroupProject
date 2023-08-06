from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from sqlalchemy.sql import func


class Favorite(db.Model):
    __tablename__ = 'favorites'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    board_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("boards.id")), nullable=False)
    pin_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("pins.id")), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now(), onupdate=func.now())

    user = db.relationship('User', back_populates='favorite')
    board = db.relationship('Board', back_populates='favorite')
    pin = db.relationship('Pin', back_populates='favorite')


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'board_id': self.board_id,
            'pin_id': self.pin_id
        }
