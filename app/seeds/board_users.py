from app.models import db, BoardUser, environment, SCHEMA
from sqlalchemy.sql import text


def seed_board_users():
    board_users = [
        # firstly remember to create each input for each default board and each user
        {"user_id": 1, "board_id": 1, "role": 'owner'},
        {"user_id": 2, "board_id": 2, "role": 'owner'},
        {"user_id": 3, "board_id": 3, "role": 'owner'},
        {"user_id": 4, "board_id": 4, "role": 'owner'},
        {"user_id": 5, "board_id": 5, "role": 'owner'},
        {"user_id": 6, "board_id": 6, "role": 'owner'},

        {"user_id": 1, "board_id": 7, "role": 'owner'},
        {"user_id": 1, "board_id": 8, "role": 'owner'},
        {"user_id": 1, "board_id": 9, "role": 'owner'},
        {"user_id": 1, "board_id": 10, "role": 'owner'},
        {"user_id": 2, "board_id": 11, "role": 'owner'},
        {"user_id": 3, "board_id": 12, "role": 'owner'},
        {"user_id": 3, "board_id": 13, "role": 'owner'},
        {"user_id": 5, "board_id": 14, "role": 'owner'},
        {"user_id": 5, "board_id": 15, "role": 'owner'},
        {"user_id": 6, "board_id": 16, "role": 'owner'},

        {"user_id": 1, "board_id": 12, "role": 'collaborator'},
        {"user_id": 1, "board_id": 15, "role": 'collaborator'},
        {"user_id": 2, "board_id": 15, "role": 'collaborator'},
        {"user_id": 3, "board_id": 15, "role": 'collaborator'},
        {"user_id": 4, "board_id": 15, "role": 'collaborator'},
        {"user_id": 6, "board_id": 15, "role": 'collaborator'},

    ]

    seed_board_users = [db.session.add(
        BoardUser(**board_user)) for board_user in board_users]
    db.session.commit()


def undo_board_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.board_users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM board_users"))

    db.session.commit()
