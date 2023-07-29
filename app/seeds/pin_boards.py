from app.models import db, Pin, Board, environment, SCHEMA
from sqlalchemy.sql import text


def seed_pin_boards():
    [board1, board2, board3, board4, board5] = Board.query.all()
    [pin1, pin2, pin3, pin4, pin5] = Pin.query.all()

    board1.pins.extend([pin1, pin4, pin3])
    board2.pins.extend([pin2, pin5])
    board3.pins.extend([pin3, pin5])
    board4.pins.extend([pin2, pin5])
    board5.pins.extend([pin3])

    db.session.commit()


def undo_pin_boards():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.pin_boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pin_boards"))

    db.session.commit()
