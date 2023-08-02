from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from sqlalchemy.sql import func

from .pin import pin_boards

import random


class Board(db.Model):
    __tablename__ = 'boards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=True)
    is_secret = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now(), onupdate=func.now())

    board_users = db.relationship(
        'BoardUser', back_populates='boards', cascade="all, delete-orphan")
    pins = db.relationship("Pin", secondary=pin_boards,
                           back_populates='boards')
    favorite = db.relationship(
        'Favorite', back_populates='board', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'description': self.description,
            'is_secret': self.is_secret
        }

    def to_dict_simple(self):
        return {
            'id': self.id,
            'name': self.name,
            'previewImgUrl': random.choice(self.pins).image_url if self.pins else ""
        }
