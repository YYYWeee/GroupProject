from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from sqlalchemy.sql import func
from .pin_board import pin_boards


class Pin(db.Model):
    __tablename__ = 'pins'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    image_url = db.Column(db.String, nullable=False)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=True)
    alt_text = db.Column(db.String, nullable=True)
    link = db.Column(db.String, nullable=True)
    note_to_self = db.Column(db.String, nullable=True)
    allow_comment = db.Column(db.Boolean, nullable=True, default=True)
    show_shopping_recommendations = db.Column(
        db.Boolean, nullable=True, default=True)
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now(), onupdate=func.now())

    user = db.relationship("User", back_populates="pins",
                           cascade="all, delete-orphan")
    comments = db.relationship(
        "Comment", back_populates="pin", cascade="all, delete-orphan")
    boards = db.relationship(
        "Board", secondary=pin_boards, back_populates='pins')
    favorite = db.relationship('Favorite', back_populates='pin')

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'image_url': self.image_url,
            'title': self.title,
            'description': self.description,
            'alt_text': self.alt_text,
            'link': self.link,
            'note_to_self': self.note_to_self,
            'allow_comment': self.allow_comment,
            'show_shopping_recommendations': self.show_shopping_recommendations
        }
