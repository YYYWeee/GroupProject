from app.models import db, Favorite, environment, SCHEMA
from sqlalchemy.sql import text


def seed_favorites():
    favorites = [
        # {"user_id": 1, "pin_id": 3, "board_id": 3},
        # {"user_id": 2, "pin_id": 4, "board_id": 1},
        # {"user_id": 3, "pin_id": 5, "board_id": 4},
        # {"user_id": 3, "pin_id": 2, "board_id": 4},
        # {"user_id": 1, "pin_id": 15, "board_id": 8},
        # {"user_id": 1, "pin_id": 16, "board_id": 8},
        # default board for user1
        {"user_id": 1, "board_id": 1, "pin_id": 3},
        {"user_id": 1, "board_id": 1, "pin_id": 4},
        {"user_id": 1, "board_id": 1, "pin_id": 6},
        {"user_id": 1, "board_id": 1, "pin_id": 10},
        {"user_id": 1, "board_id": 1, "pin_id": 18},
        {"user_id": 1, "board_id": 1, "pin_id": 12},
        {"user_id": 1, "board_id": 1, "pin_id": 27},

        # groups board for user 1
        {"user_id": 1, "board_id": 7, "pin_id": 1},
        {"user_id": 1, "board_id": 7, "pin_id": 2},
        {"user_id": 1, "board_id": 7, "pin_id": 4},
        {"user_id": 2, "board_id": 7, "pin_id": 5},
        {"user_id": 1, "board_id": 7, "pin_id": 9},

        {"user_id": 2, "board_id": 7, "pin_id": 1},
        {"user_id": 2, "board_id": 7, "pin_id": 4},
        {"user_id": 2, "board_id": 7, "pin_id": 5},
        {"user_id": 2, "board_id": 7, "pin_id": 11},
        {"user_id": 2, "board_id": 7, "pin_id": 12},

        {"user_id": 4, "board_id": 7, "pin_id": 1},
        {"user_id": 4, "board_id": 7, "pin_id": 4},
        {"user_id": 4, "board_id": 7, "pin_id": 8},
        {"user_id": 4, "board_id": 7, "pin_id": 10},
        {"user_id": 4, "board_id": 7, "pin_id": 11},

        {"user_id": 6, "board_id": 7, "pin_id": 4},
        {"user_id": 6, "board_id": 7, "pin_id": 6},
        {"user_id": 6, "board_id": 7, "pin_id": 8},
        {"user_id": 6, "board_id": 7, "pin_id": 13},

        # {"user_id": 1, "board_id": 12, "role": 'collaborator'},
        {"user_id": 1, "board_id": 12, "pin_id": 22},
        {"user_id": 3, "board_id": 12, "pin_id": 20},
        {"user_id": 3, "board_id": 12, "pin_id": 21},
        {"user_id": 3, "board_id": 12, "pin_id": 22},

        # {"user_id": 1, "board_id": 15, "role": 'collaborator'},  pin27 28 29
        {"user_id": 1, "board_id": 15, "pin_id": 27},

        {"user_id": 2, "board_id": 15, "pin_id": 27},
        {"user_id": 2, "board_id": 15, "pin_id": 28},
        {"user_id": 2, "board_id": 15, "pin_id": 29},

        {"user_id": 3, "board_id": 15, "pin_id": 27},
        {"user_id": 3, "board_id": 15, "pin_id": 28},

        {"user_id": 4, "board_id": 15, "pin_id": 28},

        {"user_id": 5, "board_id": 15, "pin_id": 28},
        {"user_id": 5, "board_id": 15, "pin_id": 29},

        {"user_id": 6, "board_id": 15, "pin_id": 28},
    ]

    seed_favorites = [db.session.add(Favorite(**favorite))
                      for favorite in favorites]
    db.session.commit()


def undo_favorites():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM favorites"))

    db.session.commit()
