from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password',  first_name='Demo', last_name='Lition', about='Hello, fellow Pinners! Welcome to my Pinterest profile! 🌟 I\'m a passionate PinThis user with a diverse range of interests. From home decor to mouthwatering recipes, my pins reflect my love for exploring new trends and DIY projects. I hope my boards bring a touch of inspiration to your life and spark your imagination!', photo_url='https://static.vecteezy.com/system/resources/previews/002/002/257/non_2x/beautiful-woman-avatar-character-icon-free-vector.jpg')
    ross = User(
        username='Ross', email='user2@aa.io', password='password', first_name='Ross', last_name='Geller', about='I love everything about science, dinosaurs, comic books, sports and keyboard music.', photo_url='https://i.pinimg.com/564x/b0/a5/a8/b0a5a8192234f926ab55d382c8573681.jpg')
    rachel = User(
        username='Rachel', email='user3@aa.io', password='password', first_name='Rachel', last_name='Green', about='I am Rachel. I am talking about women\'s fashion here and there. Discover modern casual, classy, comfy, outfit ideas for summer, spring, fall, and winter.', photo_url='https://www.tvguide.com/a/img/hub/2018/11/01/f1282706-5733-45d1-a1ea-602bf54ebf0a/friendsrachel1.png')
    joey = User(
        username='Joey', email='user4@aa.io', password='password', first_name='Joey', last_name='Tribbiani', about='Living life frugally with DIY, budgeting, freezer meals..', photo_url='https://upload.wikimedia.org/wikipedia/en/d/da/Matt_LeBlanc_as_Joey_Tribbiani.jpg')
    monica = User(
        username='TheCozyCook', email='user5@aa.io', password='password', first_name='The Cozy Cook -Easy Dinner Recipes, Chicken, Pasta, Soup, + more!', last_name='', about='Hi, I\'m Monica Geller! My mission is to help busy home cooks create delicious recipes that are budget-friendly and easy to follow.', photo_url='https://www.looper.com/img/gallery/every-love-interest-of-friends-monica-geller-ranked/intro-1668012545.webp')
    phoebe = User(
        username='HomeTalk', email='user6@aa.io', password='password', first_name='Home Talk & Decor | Creativity | Life', last_name='', about='🌴DIY crafts YouTuber ☀️Resin art & resin crafts maker 🌴Flip-flop wearer 🐈Stops for stuff at curb for furniture makeovers ☀️Loves pinning DIY home decor ideas', photo_url='https://imgix.bustle.com/rehost/2016/9/13/c9e38185-9873-4dd9-82eb-6d873280415e.png')

    db.session.add(demo)
    db.session.add(ross)
    db.session.add(rachel)
    db.session.add(joey)
    db.session.add(monica)
    db.session.add(phoebe)

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
