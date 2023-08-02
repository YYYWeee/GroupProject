from app.models import db, Pin, Board, environment, SCHEMA
from sqlalchemy.sql import text


def seed_pin_boards():
    # remember: for each pin saved to a board, it is also saved to the default "all pins" board
    [board1, board2, board3, board4, board5, board6, board7, board8, board9, board10, board11,
        board12, board13, board14, board15, board16] = Board.query.order_by(Board.id.asc()).all()

    [pin1, pin2, pin3, pin4, pin5] = Pin.query.all()

    # board6.owner_id = 1, so default board id = 1,
    # as in seed data we put all default boards to the top of boards table
    # board10.owner_id = 3, so default board id = 3,
    # as in seed data we put all default boards to the top of boards table

    # one user can only save a pin to one board other than default board
    # user1 owns the following boards, the 1st one is the default board
    # add all pins in other boards to the default board as well
    board1.pins.extend([pin1, pin4, pin3])
    board6.pins.extend([pin1, pin4, pin3])

    # user2 owns the following boards
    board2.pins.extend([pin1, pin3, pin2, pin5])
    board7.pins.extend([pin1, pin3])
    board8.pins.extend([])
    board9.pins.extend([pin2, pin5])
    board10.pins.extend([])
    board11.pins.extend([])

    # user3 owns the following boards
    board3.pins.extend([pin3, pin5, pin4])
    board12.pins.extend([pin3, pin5])
    board13.pins.extend([pin4])
    board14.pins.extend([])

    # user4 owns the following boards
    board4.pins.extend([pin4])
    board15.pins.extend([pin4])

    # user5 owns the following boards
    board5.pins.extend([])

    db.session.commit()


def undo_pin_boards():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.pin_boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pin_boards"))

    db.session.commit()
