from app.models import db, Board, environment, SCHEMA
from sqlalchemy.sql import text


def seed_boards():
    boards = [
        # remember to create a default board for each user!
        # attention: these default boards should be put at the top so we need the board ids easier
        {"owner_id": 1, "name": 'All pins', "is_secret": False, "is_default": True},
        {"owner_id": 2, "name": 'All pins', "is_secret": False, "is_default": True},
        {"owner_id": 3, "name": 'All pins', "is_secret": False, "is_default": True},
        {"owner_id": 4, "name": 'All pins', "is_secret": False, "is_default": True},
        {"owner_id": 5, "name": 'All pins', "is_secret": False, "is_default": True},
        {"owner_id": 6, "name": 'All pins', "is_secret": False, "is_default": True},

        # board7
        {"owner_id": 1, "name": 'Home decor idea',
         "description": 'Our Stylist\'s Guide to Bookshelf Styling', "is_secret": True},

        # board8
        {"owner_id": 1, "name": 'Ikea Hack Ideas',
         "description": 'Great Ikea hack ideas for your home decor. Find the most up to date, current ideas for Ikea hacks as well as the best of past Ikea hacks. You can create great things for your home with Ikea hacks. ', "is_secret": False},

        # board9
        {"owner_id": 1, "name": 'Classic Christmas',
         "description": 'Check out hundres of ways to spend Christmas!', "is_secret": False},

        # board10
        {"owner_id": 1, "name": 'DIY Gifts',
         "description": 'You don\'t have to spend money to show someone that they are appreciated. Homemade gifts are an awesome way to get creative, without spending a lot of cash! From handmade cards to handmade jewelry and even DIY Christmas gifts your friends and family will fully appreciate the time and effort you put into their personalized gift!', "is_secret": False},

        # board11
        {"owner_id": 2, "name": 'Check out these amazing ideas', "description": 'Creating a Productive Home Office',
         "description": 'Home Decor kitchen makeover kitchen cabinet kitchen design ideas', "is_secret": False},

        # board12
        {"owner_id": 3, "name": 'Wallpaper inspiration',
         "description": 'All the most gorgeous wallpapers for every room in your home. Decorate with wallpaper in your nursery, bedroom, living room, dining room and bathroom for a great statement, splash of color or accent. ', "is_secret": False},

        # board13
        {"owner_id": 3, "name": 'Halloween Costumes & Fancy Dress',
         "description": 'Halloween costumes and fancy dress costume ideas for the whole family', "is_secret": False},

        # board14
        {"owner_id": 5, "name": 'Strawberry Recipes',
         "description": 'The best strawberry recipes! So many dessert ideas using fresh or frozen strawberries from cookies to cheesecake bars and brownies and more! You\'ll love these easy ways to use up strawberries in your baked goods', "is_secret": False},

        # board15
        {"owner_id": 5, "name": 'Dinner Ideas',
         "description": 'Delicious dinner recipes from the best food bloggers! All sorts of meal ideas to help you with dinner! ', "is_secret": False},

        # board16
        {"owner_id": 6, "name": '40+ Beautiful Small Kitchen',
         "description": 'Home Decor kitchen makeover kitchen cabinet kitchen design ideas', "is_secret": False},

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
