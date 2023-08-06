from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime
import random


def seed_comments():
    comments = [{"pin_id": 1, "user_id": 3,
                 "message": 'Where\'s the chair from please?\u2728 \U0001F612',
                 "created_at": datetime(2021, 2, 28, 11, 57),
                 "updated_at": datetime(2021, 3, 17, 11, 57),
                 },
                {"pin_id": 1, "user_id": 1,
                 "message": 'Indulge in tropical bliss with our delightful No-Bake Pineapple Cream Dessert! A heavenly combination of velvety cream, juicy pineapple chunks, and a buttery graham cracker crust, this easy-to-make treat is perfect for hot summer days or any occasion. Just assemble, chill, and enjoy a taste of paradise in every bite!',
                 "created_at": datetime(2019, 12, 12, 7, 10),
                 "updated_at": datetime(2019, 12, 17, 22, 10),
                 },
                {"pin_id": 1, "user_id": 2,
                 "message": 'I kept it simple. No coconut and no extra pineapple on top. And it is still excellent.',
                 "created_at": datetime(2023, 6, 22, 4, 00),
                 "updated_at": datetime(2023, 6, 28, 7, 10),
                 },
                {"pin_id": 1, "user_id": 3,
                 "message": 'Yum! This is the perfect dessert for those lazy days when you don\'t want to turn on the oven. Love the tropical twist with pineapple!',
                 "created_at": datetime(2023, 1, 22, 4, 00),
                 "updated_at": datetime(2023, 1, 28, 7, 10),
                 },
                {"pin_id": 1, "user_id": 2,
                 "message": 'I made this for our potluck, and it disappeared within minutes! It\'s a total crowd-pleaser! Thanks for the recipe!',
                 "created_at": datetime(2021, 10, 1, 17, 00),
                 "updated_at": datetime(2021, 10, 7, 19, 22),
                 },
                {"pin_id": 1, "user_id": 3,
                 "message": 'ok',
                 "created_at": datetime(2022, 9, 14, 8, 00),
                 "updated_at": datetime(2022, 9, 17, 13, 22),
                 },
                {"pin_id": 1, "user_id": random.randint(1, 6),
                 "message": 'Sooooo good!!!'},
                {"pin_id": 3, "user_id": 2,
                 "message": 'I would like to know the name of the paint color.'},
                {"pin_id": 4, "user_id": 1, "message": 'All you need now is the perfect scent, Im thinking Jasmine Bamboo or Champagne Rose. What do you think?'},
                {"pin_id": 5, "user_id": 2,
                 "message": 'Where did you get the rug from?'},
                {"pin_id": 5, "user_id": 1,
                 "message": 'looks delicious will make, thank you for sharing'},
                {"pin_id": 5, "user_id": 3,
                 "message": 'Delicious and refreshing! I used a 10” graham cracker crust and had 2 cups extra filling. Trust me, it didn\'t go to waste.'},
                {"pin_id": 5, "user_id": 2,
                 "message": 'Absolutely Stunning!!! Beautiful choice of colours. Gorgeous!'},
                {"pin_id": 5, "user_id": 4,
                 "message": 'Yum! This is the perfect dessert for those lazy days when you don\'t want to turn on the oven. Love the tropical twist with pineapple!'},
                {"pin_id": 5, "user_id": 5,
                 "message": 'I made this for our potluck, and it disappeared within minutes! It\'s a total crowd-pleaser! Thanks for the recipe!'},
                {"pin_id": 5, "user_id": 4,
                 "message": 'I kept it simple. No coconut and no extra pineapple on top. And it is still excellent.'},
                {"pin_id": 5, "user_id": 5,
                 "message": 'I had a snake plant for years… never had blooms. It became really pot-bound and I kept meaning to repot it, but… you know how it is. Then one day I noticed a spike! Bloomed every year after that until one year we had a really hard freeze come up suddenly (Texas weather) and I was out of town at the time.'},
                {"pin_id": 5, "user_id": 1,
                 "message": 'I love this plant I have with more than 7 planters, I wish to get its flowers.....'},
                {"pin_id": 5, "user_id": 2,
                 "message": 'I was lucky to have the flowers on the snake plants. It has a really strong smell.'},
                {"pin_id": 5, "user_id": 5, "message": 'Mine just bloomed for the first time ever. I didn’t smell anything from the flowers. Do they just die and drop off, or should they be cut?'}]

    seed_boards = [db.session.add(Comment(**comment)) for comment in comments]
    db.session.commit()


def undo_comments():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
