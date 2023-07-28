from .db import db, environment, SCHEMA, add_prefix_for_prod

class Board(db.Model):
    __tablename__ = 'boards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id= db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("users.id")),nullable=False)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String,nullable=True)
    is_secret = db.Column(db.Boolean, nullable=False)
    created_at =db.Column(db.Date,nullable=False)
    updated_at =db.Column(db.Date,nullable=False)

    board_users = db.relationship('BoardUser', back_populates ='boards')
    pins = db.relationship("Pin", secondary=pin_boards, back_populates='boards')


    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'description':self.description,
            'is_secret': self.is_secret,
        }
