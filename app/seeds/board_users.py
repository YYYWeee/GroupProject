from app.models import db, BoardUser, environment, SCHEMA
from sqlalchemy.sql import text


def seed_board_users():
    board_users = [{"user_id": 1, "board_id": 1, "role": 'owner'},
                   {"user_id": 2, "board_id": 2, "role": 'owner'},
                   {"user_id": 3, "board_id": 3, "role": 'owner'},
                   {"user_id": 2, "board_id": 4, "role": 'owner'},
                   {"user_id": 3, "board_id": 5, "role": 'owner'},
                   {"user_id": 1, "board_id": 3, "role": 'collaborator'},
                   {"user_id": 2, "board_id": 3, "role": 'collaborator'},]

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
