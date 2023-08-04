from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from sqlalchemy.sql import func

from .pin import Pin
from .pin_board import PinBoard

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
    is_default = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now(), onupdate=func.now())

    # many-to-many
    board_users = db.relationship(
        'BoardUser', back_populates='boards', cascade="all, delete-orphan")
    favorite = db.relationship(
        'Favorite', back_populates='board', cascade="all, delete-orphan")

    # pins = db.relationship("Pin", secondary=pin_boards,
    #                        back_populates='boards')

    board_pins = db.relationship(
        "PinBoard", back_populates='boards', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'description': self.description,
            'is_secret': self.is_secret,
            'is_default': self.is_default
        }

    def to_dict_simple(self):
        pins_for_board = Pin.query.join(PinBoard).filter(
            PinBoard.board_id == self.id).all()

        selectedPinImages = []
        selectedBoardPreviewImg = ""
        if len(pins_for_board) > 0:
            pinImagesUrls = [pin.image_url for pin in pins_for_board]

            selectedPinImages = random.sample(
                pinImagesUrls, 5) if len(pinImagesUrls) > 5 else pinImagesUrls
            selectedBoardPreviewImg = selectedPinImages[0]

        return {
            'id': self.id,
            'name': self.name,
            'is_default': self.is_default,
            'is_secret': self.is_secret,
            'numPins': len(pins_for_board),
            'previewImgUrl': selectedBoardPreviewImg,
            'pinImgUrls': selectedPinImages,
            'updated_at': self.updated_at

        }
