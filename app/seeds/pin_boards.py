from app.models import db, Pin, Board, environment, SCHEMA, PinBoard
from sqlalchemy.sql import text


def seed_pin_boards():
    # # remember: for each pin saved to a board, it is also saved to the default "all pins" board
    # [board1, board2, board3, board4, board5, board6, board7, board8, board9, board10, board11,
    #     board12, board13, board14, board15, board16] = Board.query.order_by(Board.id.asc()).all()

    # [pin1, pin2, pin3, pin4, pin5] = Pin.query.all()

    # # board6.owner_id = 1, so default board id = 1,
    # # as in seed data we put all default boards to the top of boards table
    # # board10.owner_id = 3, so default board id = 3,
    # # as in seed data we put all default boards to the top of boards table

    # # one user can only save a pin to one board other than default board
    # # user1 owns the following boards, the 1st one is the default board
    # # add all pins in other boards to the default board as well
    # board1.pins.extend([pin1, pin4, pin3])
    # board6.pins.extend([pin1, pin4, pin3])

    # # user2 owns the following boards
    # board2.pins.extend([pin1, pin3, pin2, pin5])
    # board7.pins.extend([pin1, pin3])
    # board8.pins.extend([])
    # board9.pins.extend([pin2, pin5])
    # board10.pins.extend([])
    # board11.pins.extend([])

    # # user3 owns the following boards
    # board3.pins.extend([pin3, pin5, pin4])
    # board12.pins.extend([pin3, pin5])
    # board13.pins.extend([pin4])
    # board14.pins.extend([])

    # # user4 owns the following boards
    # board4.pins.extend([pin4])
    # board15.pins.extend([pin4])

    # # user5 owns the following boards
    # board5.pins.extend([])

    # db.session.commit()

    # number of pins  = number of entries in initial_board_for_pin
    initial_board_for_pin = [
        {"board_id": 7, "pin_id": 1,
            "note_to_group": 'Need to get some time to finish the quiz by this weekend and meet my home designer'},
        {"board_id": 7, "pin_id": 2, "note_to_group": ''},
        {"board_id": 7, "pin_id": 3, "note_to_group": ''},
        {"board_id": 7, "pin_id": 4, "note_to_group": ''},
        {"board_id": 7, "pin_id": 5, "note_to_group": ''},
        {"board_id": 7, "pin_id": 6, "note_to_group": ''},
        {"board_id": 7, "pin_id": 7, "note_to_group": ''},
        {"board_id": 7, "pin_id": 8, "note_to_group": ''},
        {"board_id": 7, "pin_id": 9,
            "note_to_group": 'Pin this for inspiration on creating a stylish gallery wall in the bedroom!'},
        {"board_id": 7, "pin_id": 10, "note_to_group": ''},
        {"board_id": 7, "pin_id": 11, "note_to_group": ''},
        {"board_id": 7, "pin_id": 12, "note_to_group": ''},
        {"board_id": 7, "pin_id": 13, "note_to_group": ''},
        {"board_id": 7, "pin_id": 14,
            "note_to_group": 'Fantastic idea for organizing kitchen spices! Need to implement in my kitchen.'},
        {"board_id": 8, "pin_id": 15, "note_to_group": ''},
        {"board_id": 8, "pin_id": 16, "note_to_group": ''},
        {"board_id": 9, "pin_id": 17, "note_to_group": ''},
        {"board_id": 9, "pin_id": 18, "note_to_group": ''},
        {"board_id": 11, "pin_id": 19, "note_to_group": ''},
        {"board_id": 12, "pin_id": 20, "note_to_group": ''},
        {"board_id": 12, "pin_id": 21, "note_to_group": ''},
        {"board_id": 12, "pin_id": 22, "note_to_group": ''},
        {"board_id": 12, "pin_id": 23, "note_to_group": ''},
        {"board_id": 14, "pin_id": 24, "note_to_group": ''},
        {"board_id": 14, "pin_id": 25, "note_to_group": ''},
        {"board_id": 14, "pin_id": 26, "note_to_group": ''},
        {"board_id": 15, "pin_id": 27, "note_to_group": ''},
        {"board_id": 15, "pin_id": 28,
            "note_to_group": 'This chicken dinner looks amazing and simple! Adding it to the weekly menu.'},
        {"board_id": 15, "pin_id": 29,
            "note_to_group": 'Must try! Need to get peaches!'},
        {"board_id": 16, "pin_id": 30, "note_to_group": ''},
        {"board_id": 16, "pin_id": 31, "note_to_group": ''},

        # don't add note_to_group to the following collaborator pin_board entries
        # as they are just adding to personal default board.
        # for those boards that the pinner is a collaborator,
        # add the pins inside to the default board of user.
        # {"user_id": 1, "board_id": 12, "role": 'collaborator'},
        # board12 has pin20, pin21, pin22, add those pins to board1,
        # which is default board of collaborator user1
        {"board_id": 1, "pin_id": 20, "note_to_group": ''},
        {"board_id": 1, "pin_id": 21, "note_to_group": ''},
        {"board_id": 1, "pin_id": 22, "note_to_group": ''},

        # {"user_id": 1, "board_id": 15, "role": 'collaborator'},
        # board 15 has pin 27,28,29,30, add those pins
        # to board1, board2, board3, board4, board5, board6
        {"board_id": 1, "pin_id": 27, "note_to_group": ''},
        {"board_id": 1, "pin_id": 28, "note_to_group": ''},
        {"board_id": 1, "pin_id": 29, "note_to_group": ''},
        {"board_id": 1, "pin_id": 30, "note_to_group": ''},
        {"board_id": 2, "pin_id": 27, "note_to_group": ''},
        {"board_id": 2, "pin_id": 28, "note_to_group": ''},
        {"board_id": 2, "pin_id": 29, "note_to_group": ''},
        {"board_id": 2, "pin_id": 30, "note_to_group": ''},
        {"board_id": 3, "pin_id": 27, "note_to_group": ''},
        {"board_id": 3, "pin_id": 28, "note_to_group": ''},
        {"board_id": 3, "pin_id": 29, "note_to_group": ''},
        {"board_id": 3, "pin_id": 30, "note_to_group": ''},
        {"board_id": 4, "pin_id": 27, "note_to_group": ''},
        {"board_id": 4, "pin_id": 28, "note_to_group": ''},
        {"board_id": 4, "pin_id": 29, "note_to_group": ''},
        {"board_id": 4, "pin_id": 30, "note_to_group": ''},
        {"board_id": 5, "pin_id": 27, "note_to_group": ''},
        {"board_id": 5, "pin_id": 28, "note_to_group": ''},
        {"board_id": 5, "pin_id": 29, "note_to_group": ''},
        {"board_id": 5, "pin_id": 30, "note_to_group": ''},
        {"board_id": 6, "pin_id": 27, "note_to_group": ''},
        {"board_id": 6, "pin_id": 28, "note_to_group": ''},
        {"board_id": 6, "pin_id": 29, "note_to_group": ''},
        {"board_id": 6, "pin_id": 30, "note_to_group": ''},
    ]

    # query all the pins, for each pin find the pin.owner_id
    # create the entry for board_id = pin.owner_id,
    # which also add the pin to the default board of the pin creator
    all_pins = Pin.query.all()
    for pin in all_pins:
        add_pin_to_default_board = {
            "board_id": pin.owner_id,
            "pin_id": pin.id,
            "note_to_group": ""
        }
        initial_board_for_pin.append(add_pin_to_default_board)

    seed_pin_boards = [db.session.add(
        PinBoard(**pin_board)) for pin_board in initial_board_for_pin]
    db.session.commit()


def undo_pin_boards():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.pin_boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pin_boards"))

    db.session.commit()
