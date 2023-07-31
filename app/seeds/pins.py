from app.models import db, Pin, environment, SCHEMA
from sqlalchemy.sql import text


def seed_pins():
    pins = [{
        "owner_id": 1,
        "image_url": 'https://cdn.discordapp.com/attachments/1134270927769698500/1134701025694056549/IMG_2454.jpg',
        "title": 'Room inspiration',
        "description": 'Shop Belmont Shore Wood End Table -and other curated products on LTK, the easiest way to shop everything from your favorite creators.',
        "alt_text": 'Shop Belmont Shore Wood End Table',
        "link": 'https://www.shopltk.com/explore/whereheartresides/posts/dfb01e98-840b-11eb-ad86-0242ac110004',
        "note_to_self": 'Room inspiration 2023',
        "allow_comment": True,
        "show_shopping_recommendations": False,
    }, {
        "owner_id": 2,
        "image_url": 'https://cdn.discordapp.com/attachments/1134270927769698500/1134691145688039444/IMG_0456.jpg',
        "title": 'Playroom essemtials',
        "description": 'When choosing a decorating scheme for your child\'s playroom idea, the more imaginative and colourful the better. It\'s a dedicated and fun space for your children to spark and develop their little imaginations.',
        "alt_text": 'Playroom essemtials',
        "link": 'https://istome.co.uk/blogs/news/playroom-essentials',
        "note_to_self": 'Montessori Inspired Playroom',
        "allow_comment": True,
        "show_shopping_recommendations": False,
    },
        {
        "owner_id": 3,
        "image_url": 'https://media.discordapp.net/attachments/1134270927769698500/1134703078436765777/5.jpg',
        "title": 'Spring Tour: Part II-- Family Room — Design Loves Detail',
        "description": 'Finding your design style can be hard, but it doesn\'t have to be. Start by taking this design style quiz',
        "alt_text": 'Family Room — Design Loves Detail',
        "link": 'https://www.designlovesdetail.com/recentposts/spring-tour-part-ii-family-room/',
        "note_to_self": 'Fresh Design, Classic Pieces, and A True Sense of Style, With A Pure Salt Point of View.',
        "allow_comment": True,
        "show_shopping_recommendations": True,
    },
        {
        "owner_id": 1,
        "image_url": 'https://i.pinimg.com/564x/a0/58/c3/a058c392e6b02eee501b5bfab2f9700c.jpg',
        "title": 'How To Create a Montessori Room-The Prepared Environment From 1 -3 Years',
        "description": 'How to Create a Montessori Children\'s Room. 4 Key Principles to keep in mind when creating a montessori room.',
        "alt_text": 'MONTESSORI - A GUIDE for parent',
        "link": 'https://fredtedandcompany.wordpress.com/2017/07/12/how-to-create-a-montessori-room-the-prepared-environment-from-1-3-years/',
        "note_to_self": 'Tip to create a Montessori Room by expert',
        "allow_comment": False,
        "show_shopping_recommendations": False,
    },
        {
        "owner_id": 2,
        "image_url": 'https://media.discordapp.net/attachments/1134270927769698500/1134703078436765777/5.jpg',
        "title": '54 Simple Dining Room Wall Decor Ideas | Displate Blog',
        "description": 'Here are some great ideas to make your snack room or dining room look stunning with some simple wall decor ideas.\nIndulge in tropical bliss with our delightful No-Bake Pineapple Cream Dessert! A heavenly combination of velvety cream, juicy pineapple chunks, and a buttery graham cracker crust, this easy-to-make treat is perfect for hot summer days or any occasion. Just assemble, chill, and enjoy a taste of paradise in every bite!\nIndulge in tropical bliss with our delightful No-Bake Pineapple Cream Dessert! A heavenly combination of velvety cream, juicy pineapple chunks, and a buttery graham cracker crust, this easy-to-make treat is perfect for hot summer days or any occasion. Just assemble, chill, and enjoy a taste of paradise in every bite!\nYum! This is the perfect dessert for those lazy days when you don\'t want to turn on the oven. Love the tropical twist with pineapple!',
        "alt_text": 'Creating the perfect place to enjoy a Sunday brunch or dinner with friends and family can be a fun experience.',
        "link": 'https://blog.displate.com/dining-room-wall-decor/?epik=dj0yJnU9c04yOU42RWNqWTdPeHZtczJxUlk4NTRYUFFLSHZVRE4mcD0wJm49dTIzd1l2cDNpaS0zeF9vc1VzSzcwUSZ0PUFBQUFBR1RCN3Z3',
        "note_to_self": 'To make it an even more incredible space here\'s a great list of dining room wall decor to spruce up your space.',
        "allow_comment": True,
        "show_shopping_recommendations": True,
    },
    ]

    seed_pins = [db.session.add(Pin(**pin)) for pin in pins]
    db.session.commit()


def undo_pins():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pins"))

    db.session.commit()
