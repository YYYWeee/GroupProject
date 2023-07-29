from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text


def seed_comments():
    comments = [{"pin_id": 1, "user_id": 1, "message": 'Such a cute setup!'},
                {"pin_id": 2, "user_id": 3,
                    "message": 'Where\'s the chair from please?'},
                {"pin_id": 3, "user_id": 2,
                    "message": 'I would like to know the name of the paint color.'},
                {"pin_id": 4, "user_id": 1, "message": 'All you need now is the perfect scent, Im thinking Jasmine Bamboo or Champagne Rose. What do you think?'},
                {"pin_id": 5, "user_id": 2, "message": 'Where did you get the rug from?'}]
    seed_boards = [db.session.add(Comment(**comment)) for comment in comments]
    db.session.commit()


def undo_comments():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
