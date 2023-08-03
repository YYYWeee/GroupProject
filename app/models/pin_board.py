# from .db import db, environment, SCHEMA, add_prefix_for_prod

# pin_boards = db.Table('pin_boards',  db.Model.metadata,
#                       db.Column('board_id', db.Integer, db.ForeignKey(
#                           add_prefix_for_prod("boards.id")), primary_key=True),
#                       db.Column('pin_id', db.Integer, db.ForeignKey(
#                           add_prefix_for_prod("pins.id")), primary_key=True))

# if environment == "production":
#     pin_boards.schema = SCHEMA

from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from sqlalchemy.sql import func


class PinBoard(db.Model):
    __tablename__ = 'pin_boards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    pin_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("pins.id")), nullable=False)

    board_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("boards.id")), nullable=False)

    note_to_group = db.Column(db.String, nullable=True)
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now(), onupdate=func.now())

    pins = db.relationship('Pin', back_populates='board_pins')
    boards = db.relationship('Board', back_populates='board_pins')
