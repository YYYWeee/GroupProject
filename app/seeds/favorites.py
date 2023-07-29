from app.models import db, Favorite, environment, SCHEMA
from sqlalchemy.sql import text


def seed_favorites():
    favorites = [{"user_id":,"board_id":,"pin_id":}]
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
