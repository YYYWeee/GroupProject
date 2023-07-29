from app.models import db, Board, environment, SCHEMA
from sqlalchemy.sql import text


def seed_boards():
    boards = [{"owner_id": 1, "name": 'Floof',
               "description": 'Board dedicated to the cutest floofballs of all time: Samoyeds!', "is_secret": False},
              {"owner_id": 2, "name": 'Home decor idea',
               "description": 'Our Stylist\'s Guide to Bookshelf Styling', "is_secret": False},
              {"owner_id": 3, "name": 'Check out these amazing ideas',
               "description": 'Creating a Productive Home Office', "is_secret": False},
              {"owner_id": 2, "name": '40+ Beautiful Small Kitchen',
               "description": 'Home Decor kitchen makeover kitchen cabinet kitchen design ideas', "is_secret": False},
              {"owner_id": 3, "name": 'Neutral bedroom inspo',
                              "description": 'Pottery barn neutral bedroom', "is_secret": False},
              ]
    seed_boards = [db.session.add(Board(**board)) for board in boards]
    db.session.commit()


def undo_boards():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM boards"))

    db.session.commit()
