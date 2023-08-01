from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='demo', email='demo@aa.io', password='password', photo_url='https://img.freepik.com/free-photo/bacon-burger_1339-1384.jpg', first_name='Demo', last_name='Lition', about='this is demo user')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', photo_url='https://upload.wikimedia.org/wikipedia/commons/7/74/A-Cat.jpg', first_name='Elegant Wedding Invites | wedding stationery, wedding colors', last_name='', about='heelllo world')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', photo_url='https://repairit.wondershare.com/article-banner/photo-repair-banner-pic-1.png', first_name='Bobbie', last_name='Brown', about='nice to see you')
    rachel = User(
        username='rachel', email='rachel@aa.io', password='password', photo_url='https://staticg.sportskeeda.com/editor/2021/12/82829-16389776187798-1920.jpg', first_name='Rachel', last_name='Green', about='I am a friends character')
    ross = User(
        username='ross', email='ross@aa.io', password='password', photo_url='https://i.pinimg.com/564x/b0/a5/a8/b0a5a8192234f926ab55d382c8573681.jpg', first_name='Ross', last_name='Geller', about='Rachel my love')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(rachel)
    db.session.add(ross)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
