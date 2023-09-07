from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime
import random


def seed_comments():
    comments = [
        # pin 1
        {
            "pin_id": 1, "user_id": 3,
            "message": 'Took the quiz and found out I\'m all about that modern vibe! Thanks for helping me discover my style! 😊',
            "created_at": datetime(2021, 2, 28, 11, 57),
            "updated_at": datetime(2021, 3, 17, 11, 57),
        },
        {
            "pin_id": 1, "user_id": 1,
            "message": 'This quiz was so much fun! It nailed my love for rustic design. Can\'t wait to start redecorating! 🏡🌿',
            "created_at": datetime(2019, 12, 12, 7, 10),
            "updated_at": datetime(2019, 12, 17, 22, 10),
        },
        {
            "pin_id": 1, "user_id": 2,
            "message": 'Boho chic is my design crush, and this quiz confirmed it. Colorful, free-spirited, and full of personality! 🌈🌟 ',
            "created_at": datetime(2019, 12, 12, 7, 10),
            "updated_at": datetime(2019, 12, 17, 22, 10),
        },
        {
            "pin_id": 1, "user_id": 1,
            "message": 'This quiz was very accurate for me.👌',
            "created_at": datetime(2023, 6, 22, 4, 00),
            "updated_at": datetime(2023, 6, 28, 7, 10),
        },
        {
            "pin_id": 1, "user_id": 4,
            "message": 'Glam, modern, traditional!',
            "created_at": datetime(2021, 10, 1, 17, 00),
            "updated_at": datetime(2021, 10, 7, 19, 22),
        },
        {
            "pin_id": 1, "user_id": 5,
            "message": 'I took the quiz twice, with a few changes since I was undecided on a few pictures. Both times came with the same result. So I guess I must be traditional, and I agree with it, although I do love the French Country designs… Is this considered Traditional?',
            "created_at": datetime(2023, 1, 22, 4, 00),
            "updated_at": datetime(2023, 1, 28, 7, 10),
        },
        {
            "pin_id": 1, "user_id": 6,
            "message": '🏡 I got farmhouse style on the quiz, and it\'s so accurate! I can\'t resist those rustic charm and cozy vibes. 🌾',
            "created_at": datetime(2022, 9, 14, 8, 00),
            "updated_at": datetime(2022, 9, 17, 13, 22),
        },
        {
            "pin_id": 1, "user_id": 6,
            "message": 'Anyone else love farmhouse style? Share your favorite farmhouse decor ideas!😊',
            "created_at": datetime(2022, 9, 17, 8, 00),
            "updated_at": datetime(2022, 9, 18, 13, 22), },

        # pin 3
        {
            "pin_id": 3, "user_id": 1,
            "message": "Hey everyone, this room is incredibly beautiful and so inspiring! I can't wait to try something similar myself. Share with me how you feel! 😊",
            "created_at": datetime(2023, 8, 17, 8, 00),
            "updated_at": datetime(2023, 8, 18, 13, 22),
        },
        {
            "pin_id": 3, "user_id": 3,
            "message": "This setup looks so inviting and relaxing. Perfect for unwinding after a long day.🌆🛋️🌿",
            "created_at": datetime(2022, 9, 17, 8, 00),
            "updated_at": datetime(2022, 9, 18, 13, 22),
        },
        {
            "pin_id": 3, "user_id": 5,
            "message": "This family room is a dream come true! 😍🌼 The attention to detail and the choice of colors create such a cozy atmosphere. I can't wait to incorporate some of these ideas into my own space. 🛋️🌷",
            "created_at": datetime(2023, 3, 17, 8, 00),
            "updated_at": datetime(2023, 3, 18, 13, 22),
        },
        {
            "pin_id": 3, "user_id": 2,
            "message": "I'm feeling so inspired to revamp my own family room now. Thank you for the inspiration!🏠",
            "created_at": datetime(2023, 5, 17, 8, 00),
            "updated_at": datetime(2023, 5, 18, 13, 22),
        },
        {
            "pin_id": 3, "user_id": 6,
            "message": "Wow, the design style in this family room is impeccable! 🏠🏠🏠🏠🏠💫 It's evident that every piece was chos tc💖aaaae.",
            "created_at": datetime(2023, 8, 17, 8, 00),
            "updated_at": datetime(2023, 8, 18, 13, 22),
        },

        # pin 5
        {
            "pin_id": 5, "user_id": 2,
            "message": 'Wow, these wall decor ideas are fantastic! It\'s amazing how a few well-placed pieces can transform the entire dining area. Thanks for the inspiration! 🏡❤️',
            "created_at": datetime(2022, 9, 17, 8, 00),
            "updated_at": datetime(2022, 9, 18, 13, 22),
        },
        {
            "pin_id": 5, "user_id": 3,
            "message": 'Absolutely Stunning!!! Beautiful choice of colours. Gorgeous!',
            "created_at": datetime(2023, 9, 5, 22, 00),
            "updated_at": datetime(2023, 9, 6, 23, 22),
        },
        {
            "pin_id": 5, "user_id": 4,
            "message": 'I adore these dining room decor ideas! They add so much character to the space. The simplicity of it all is just 👌. Can\'t wait to try some of these out! 🎨✨',
            "created_at": datetime(2023, 8, 1, 22, 00),
            "updated_at": datetime(2023, 8, 2, 23, 22),
        },
        {
            "pin_id": 5, "user_id": 5,
            "message": 'I\'m all about that minimalist look, and these ideas are perfect! Less is definitely more when it comes to dining room decor.',
            "created_at": datetime(2023, 6, 1, 22, 00),
            "updated_at": datetime(2023, 6, 2, 23, 22),
        },
        {
            "pin_id": 5, "user_id": 1,
            "message": 'Thank you all for showing love to this pin! 🙏 There\'s a lot more inspiration waiting for you on my page. Feel free to explore and discover even more amazing ideas. Happy decorating! 🏡💫',
            "created_at": datetime(2023, 9, 1, 22, 00),
            "updated_at": datetime(2023, 9, 2, 23, 22),
        },

        # pin 6
        {
            "pin_id": 6, "user_id": 6,
            "message": "This pumpkin centerpiece is giving me all the cozy fall vibes! t 💕",
            "created_at": datetime(2023, 9, 5, 22, 00),
            "updated_at": datetime(2023, 9, 5, 23, 22),
        },
        {
            "pin_id": 6, "user_id": 1,
            "message": "Enjoy the fall season, everyone!🍁 ",
            "created_at": datetime(2023, 9, 1, 22, 00),
            "updated_at": datetime(2023, 9, 2, 23, 22),
        },
        {
            "pin_id": 6, "user_id": 5,
            "message": "Pumpkin spice latte in hand and this centerpiece on my table—fall perfection! 🍂☕ The farmhouse touch is exactly what I was looking for. 🏡",
            "created_at": datetime(2022, 12, 5, 22, 00),
            "updated_at": datetime(2022, 12, 5, 23, 22),
        },
        {
            "pin_id": 6, "user_id": 3,
            "message": "I've been searching for the ideal fall centerpiece, and this wooden pumpkin is just what I needed! ",
            "created_at": datetime(2023, 8, 15, 22, 00),
            "updated_at": datetime(2023, 8, 17, 23, 22),
        },

        # pin 7
        {
            "pin_id": 7, "user_id": 1,
            "message": "🏡 Welcome to my colorful South London abode! 🌈✨ I'm thrilled to share the eclectic and vibrant world I've created right here at home.",
            "created_at": datetime(2023, 9, 3, 22, 00),
            "updated_at": datetime(2023, 9, 4, 23, 22),
        },
        {
            "pin_id": 7, "user_id": 2,
            "message": "Your home is an absolute dream! 😍 The mix of colors and personal touches is pure magic. I'm feeling so inspired to add some eclectic flair to my space now! 🏡🎨 ",
            "created_at": datetime(2023, 8, 23, 22, 00),
            "updated_at": datetime(2023, 8, 24, 23, 22),
        },
        {
            "pin_id": 7, "user_id": 3,
            "message": "I can't get enough of the personality in every corner of your home!                            It's like stepping into a world of creativity and happiness. Well done! 🥂 ",
            "created_at": datetime(2023, 7, 23, 22, 00),
            "updated_at": datetime(2023, 7, 24, 23, 22),
        },
        {
            "pin_id": 7, "user_id": 4,
            "message": "Colorful and eclectic - just the way I like it!",
            "created_at": datetime(2022, 12, 23, 22, 00),
            "updated_at": datetime(2022, 12, 24, 23, 22),
        },
        {
            "pin_id": 7, "user_id": 4,
            "message": "The eclectic and colorful vibes are refreshing and make me smile. Thanks for the tour again! ",
            "created_at": datetime(2022, 12, 25, 22, 00),
            "updated_at": datetime(2022, 12, 27, 23, 22),
        },

        # pin 8
        {
            "pin_id": 8, "user_id": 4,
            "message": "I'm all about seasonal decor, and this watermelon doormat is a summer must-have! It's the perfect way to greet guests with a smile. 🍉🌞",
            "created_at": datetime(2023, 8, 26, 11, 00),
            "updated_at": datetime(2023, 8, 27, 13, 22),
        },
        {
            "pin_id": 8, "user_id": 5,
            "message": "This item is now officially on my wishlist. I can't resist its charm and elegance.",
            "created_at": datetime(2023, 7, 26, 11, 00),
            "updated_at": datetime(2023, 7, 27, 13, 22),
        },
        {
            "pin_id": 8, "user_id": 1,
            "message": "The watermelon pattern on this doormat is such a fun and fresh idea. It brightens up our doorstep and brings a touch of summer into our home. Great quality!👍",
            "created_at": datetime(2023, 9, 1, 11, 00),
            "updated_at": datetime(2023, 9, 2, 13, 22),
        },

        # pin 9
        {
            "pin_id": 9, "user_id": 1,
            "message": "A 1950's bus and a 1970's caravan as additional rooms? That's next-level ingenuity! 🚎🏕️ Trish and Nathan, your home is a work of art, and it must be a dream living there. Thanks for allowing me to share this inspiring space!👏",
            "created_at": datetime(2023, 8, 15, 11, 00),
            "updated_at": datetime(2023, 8, 17, 13, 22),
        },
        {
            "pin_id": 9, "user_id": 2,
            "message": "You deserve an award for turning your home into a magical wonderland! 🏆",
            "created_at": datetime(2023, 5, 15, 11, 00),
            "updated_at": datetime(2023, 5, 17, 13, 22),
        },
        {
            "pin_id": 9, "user_id": 3,
            "message": "Wow, what an incredible transformation! 😍 The way you expanded your one-bedroom home to accommodate a family of 6 is mind-blowing. This is a true testament to creativity and design. 🏠👨‍👩‍👦‍👦 ",
            "created_at": datetime(2023, 2, 15, 11, 00),
            "updated_at": datetime(2023, 2, 17, 13, 22),
        },
        {
            "pin_id": 9, "user_id": 4,
            "message": "The way you've blended nostalgia with contemporary design is outstanding! 🪑",
            "created_at": datetime(2023, 2, 15, 11, 00),
            "updated_at": datetime(2023, 2, 17, 13, 22),
        },
        {
            "pin_id": 9, "user_id": 4,
            "message": "Your home is a visual treat and an oasis of creativity. It's evident that every corner tells a unique story. 📖",
            "created_at": datetime(2023, 2, 17, 11, 00),
            "updated_at": datetime(2023, 2, 18, 13, 22),
        },
        {
            "pin_id": 9, "user_id": 5,
            "message": "Love the unique vibe! 💖🚌",
            "created_at": datetime(2023, 7, 30, 11, 00),
            "updated_at": datetime(2023, 7, 30, 13, 22),
        },

        # pin 10
        {
            "pin_id": 10, "user_id": 1,
            "message": "Sharing some of my favorite small living room ideas on a budget! 💡✨ These creative and wallet-friendly tips can make a big difference in small spaces. Let me know what you think.",
            "created_at": datetime(2023, 6, 15, 11, 00),
            "updated_at": datetime(2023, 6, 17, 13, 22),
        },
        {
            "pin_id": 10, "user_id": 4,
            "message": "Small living, big style! Your budget-friendly ideas are a breath of fresh air. 🍃",
            "created_at": datetime(2023, 7, 15, 11, 00),
            "updated_at": datetime(2023, 7, 17, 13, 22),
        },
        {
            "pin_id": 10, "user_id": 5,
            "message": "These ideas are pure genius! 🤓",
            "created_at": datetime(2023, 5, 20, 11, 00),
            "updated_at": datetime(2023, 5, 22, 13, 22),
        },
        {
            "pin_id": 10, "user_id": 6,
            "message": " I'm bookmarking this for my next home project. Thanks for sharing! 📚",
            "created_at": datetime(2023, 3, 20, 11, 00),
            "updated_at": datetime(2023, 3, 22, 13, 22),
        },

        # pin 12
        {
            "pin_id": 12, "user_id": 2,
            "message": "Amazing master bedroom tips! 💡💤 Saved me money and gave me ideas. Thanks! 🏡✨",
            "created_at": datetime(2023, 6, 15, 11, 00),
            "updated_at": datetime(2023, 6, 17, 13, 22),
        },
        {
            "pin_id": 12, "user_id": 1,
            "message": "Ready to transform?💪💪💪",
            "created_at": datetime(2023, 5, 15, 11, 00),
            "updated_at": datetime(2023, 5, 17, 13, 22),
        },
        {
            "pin_id": 12, "user_id": 4,
            "message": "Master bedroom inspo + budget tips = Perfect! 😍💐 Thanks for sharing. 🌷🏠",
            "created_at": datetime(2023, 8, 15, 11, 00),
            "updated_at": datetime(2023, 8, 17, 13, 22),
        },
        {
            "pin_id": 12, "user_id": 5,
            "message": "The fashion look here is so versatile. Something for every style and taste.",
            "created_at": datetime(2023, 3, 15, 11, 00),
            "updated_at": datetime(2023, 3, 17, 13, 22),
        },

        # pin 15
        {
            "pin_id": 15, "user_id": 1,
            "message": "Completed this project in just one week! Feeling incredibly proud now that it's finished. 🙌💪",
            "created_at": datetime(2023, 8, 15, 11, 00),
            "updated_at": datetime(2023, 8, 17, 13, 22),
        },
        {
            "pin_id": 15, "user_id": 3,
            "message": "You're incredible and so fast! 😲 This project turned out amazing in just one week.🌟 ",
            "created_at": datetime(2023, 8, 19, 11, 00),
            "updated_at": datetime(2023, 8, 20, 13, 22),
        },
        {
            "pin_id": 15, "user_id": 4,
            "message": "DIY trim adds a special touch. Impressive makeover! 🏡🔑",
            "created_at": datetime(2023, 6, 19, 11, 00),
            "updated_at": datetime(2023, 6, 20, 13, 22),
        },
        {
            "pin_id": 15, "user_id": 5,
            "message": "Great use of space with IKEA shoe storage! Smart hack! 👍👟",
            "created_at": datetime(2023, 7, 19, 11, 00),
            "updated_at": datetime(2023, 7, 20, 13, 22),
        },

        # pin 16
        {
            "pin_id": 16, "user_id": 1,
            "message": "The mix of black, white, and natural elements creates such a stylish, high-end look without breaking the bank. Can't wait to upgrade my space with these budget-friendly finds. ",
            "created_at": datetime(2023, 8, 3, 11, 00),
            "updated_at": datetime(2023, 8, 8, 13, 22),
        },
        {
            "pin_id": 16, "user_id": 3,
            "message": "Adding these to my shopping list. Thanks for sharing!🛒",
            "created_at": datetime(2023, 7, 3, 11, 00),
            "updated_at": datetime(2023, 7, 8, 13, 22),
        },
        {
            "pin_id": 16, "user_id": 5,
            "message": "IKEA always nails affordable style! Love these picks.🧡",
            "created_at": datetime(2023, 7, 15, 11, 00),
            "updated_at": datetime(2023, 7, 20, 13, 22),
        },
        {
            "pin_id": 16, "user_id": 4,
            "message": " IKEA really knows how to make budget-friendly items that look expensive. Could you please provide links to these gems? Kudos for sharing!",
            "created_at": datetime(2023, 7, 16, 11, 00),
            "updated_at": datetime(2023, 7, 25, 13, 22),
        },
        {
            "pin_id": 16, "user_id": 6,
            "message": "Would you mind sharing the links to these fantastic recommendations? 🛍️ ",
            "created_at": datetime(2023, 6, 16, 11, 00),
            "updated_at": datetime(2023, 6, 25, 13, 22),
        },

        # pin 17
        {
            "pin_id": 17, "user_id": 3,
            "message": "Considering a sunny Christmas on the beach this year! 🏝️🌞 Who else loves the idea of a tropical holiday season? 🎄⛱️",
            "created_at": datetime(2023, 9, 6, 11, 00),
            "updated_at": datetime(2023, 9, 6, 13, 22),
        },
        {
            "pin_id": 17, "user_id": 1,
            "message": "These charming Christmas towns are calling my name!❤️ ",
            "created_at": datetime(2023, 6, 6, 11, 00),
            "updated_at": datetime(2023, 6, 6, 13, 22),
        },

        # pin 18
        {
            "pin_id": 18, "user_id": 4,
            "message": "Feeling festive already! 🎉❄️ This list of Christmas towns and travel ideas is a gift in itself. 🎁",
            "created_at": datetime(2023, 8, 6, 11, 00),
            "updated_at": datetime(2023, 8, 6, 13, 22),
        },
        {
            "pin_id": 18, "user_id": 5,
            "message": "Ready to jingle all the way to these awesome Christmas destinations! 🌆🎶 Thanks for the travel tips and ideas. 🧳❤️ ",
            "created_at": datetime(2023, 8, 23, 11, 00),
            "updated_at": datetime(2023, 8, 23, 13, 22),
        },
        {
            "pin_id": 18, "user_id": 1,
            "message": "Can't wait to explore these winter wonderlands.  Hey, friends, any suggestions on where to spend our Christmas this year? 🎄",
            "created_at": datetime(2023, 8, 30, 11, 00),
            "updated_at": datetime(2023, 8, 31, 13, 22),
        },
        {
            "pin_id": 18, "user_id": 4,
            "message": "Considering Key West sounds like a great idea! 🌴",
            "created_at": datetime(2023, 9, 1, 11, 00),
            "updated_at": datetime(2023, 9, 1, 13, 22),
        },
        {
            "pin_id": 18, "user_id": 6,
            "message": "A tropical Christmas? That could be amazing!",
            "created_at": datetime(2023, 9, 2, 11, 00),
            "updated_at": datetime(2023, 9, 2, 13, 22),
        },
        {
            "pin_id": 18, "user_id": 2,
            "message": "Ooh, love that idea! ",
            "created_at": datetime(2023, 9, 3, 11, 00),
            "updated_at": datetime(2023, 9, 3, 13, 22),
        },

        # pin 20
        {
            "pin_id": 20, "user_id": 1,
            "message": "I've always been hesitant about wallpaper in the bathroom, but I'm open to new ideas. Looking forward to discovering the secret to making it work! 🚽",
            "created_at": datetime(2023, 9, 6, 11, 00),
            "updated_at": datetime(2023, 9, 6, 13, 22),
        },
        {
            "pin_id": 20, "user_id": 3,
            "message": "I absolutely need this in my life! It's unique and adds so much character to any space.",
            "created_at": datetime(2023, 8, 16, 11, 00),
            "updated_at": datetime(2023, 8, 16, 13, 22),
        },
        {
            "pin_id": 20, "user_id": 5,
            "message": "The devil is in the details, they say. I'm ready to embrace the charm of wallpaper in my bathroom. Share those secrets to make it work beautifully! 🚿",
            "created_at": datetime(2023, 7, 16, 11, 00),
            "updated_at": datetime(2023, 7, 16, 13, 22),
        },

        # pin 22
        {
            "pin_id": 22, "user_id": 1,
            "message": "This item is now officially on my wishlist. 🤩🤩🤩",
            "created_at": datetime(2023, 9, 6, 11, 00),
            "updated_at": datetime(2023, 9, 6, 13, 22),
        },

        # pin 24
        {
            "pin_id": 24, "user_id": 2,
            "message": "Such a moist and flavourful cake. I baked it in a 9\" x 9\" square pan, so it would be easier to slice into cute squares for Valentine's Day. My daughter and coworkers loved it.",
            "created_at": datetime(2023, 2, 6, 11, 00),
            "updated_at": datetime(2023, 2, 6, 13, 22),
        },
        {
            "pin_id": 24, "user_id": 1,
            "message": "Made it, looks yummy! Do I need to keep it for the fridge since it has yogurt in it? Also, can I freeze it?",
            "created_at": datetime(2023, 6, 6, 11, 00),
            "updated_at": datetime(2023, 6, 6, 13, 22),
        },
        {
            "pin_id": 24, "user_id": 6,
            "message": "Delicious! I made this with all purpose gluten free flour and it turned out well!",
            "created_at": datetime(2023, 5, 14, 11, 00),
            "updated_at": datetime(2023, 5, 16, 13, 22),
        },
        {
            "pin_id": 24, "user_id": 6,
            "message": "I love simple and tasty recipes like this! Perfect for spring and summer gatherings. Can't wait to try it out! 🌞🍰",
            "created_at": datetime(2023, 5, 6, 11, 00),
            "updated_at": datetime(2023, 5, 6, 13, 22),
        },
        {
            "pin_id": 24, "user_id": 4,
            "message": "So yummy and moist and not too sweet.",
            "created_at": datetime(2023, 7, 6, 11, 00),
            "updated_at": datetime(2023, 7, 6, 13, 22),
        },
        {
            "pin_id": 24, "user_id": 3,
            "message": "I tried this cake. Followed the recipe exactly. My cake fell. Don't understand why.",
            "created_at": datetime(2023, 4, 6, 11, 00),
            "updated_at": datetime(2023, 4, 6, 13, 22),
        },
        {
            "pin_id": 24, "user_id": 5,
            "message": "Love it! ❤ made it. what a wonderful recipe!🍓🍓🍓",
            "created_at": datetime(2023, 9, 2, 11, 00),
            "updated_at": datetime(2023, 9, 2, 13, 22),
        },

        # pin 25
        {
            "pin_id": 25, "user_id": 1,
            "message": " I made this and it was amazing! Next time we will have to scoop vanilla ice cream and serve hot. It's good either way!😋",
            "created_at": datetime(2023, 9, 6, 11, 00),
            "updated_at": datetime(2023, 9, 6, 13, 22),
        },
        {
            "pin_id": 25, "user_id": 2,
            "message": "I couldn't open the link for the recipe. Could someone forward it to me?",
            "created_at": datetime(2023, 3, 6, 11, 00),
            "updated_at": datetime(2023, 3, 6, 13, 22),
        },
        {
            "pin_id": 25, "user_id":3,
            "message": "Easy to make! A huge hit. Loved having the \"jam\" taste but with fresh strawberries.",
            "created_at": datetime(2023, 7, 6, 11, 00),
            "updated_at": datetime(2023, 7, 6, 13, 22),
        },

        # pin 26
        {
            "pin_id": 26, "user_id": 1,
            "message": "Strawberry season is the best! So many tasty options to choose from! 😋",
            "created_at": datetime(2023, 9, 6, 11, 00),
            "updated_at": datetime(2023, 9, 6, 13, 22),
        },
        {
            "pin_id": 26, "user_id": 1,
            "message": "Homemade strawberry ice cream is a must-try. 🍨",
            "created_at": datetime(2023, 9, 6, 14, 00),
            "updated_at": datetime(2023, 9, 6, 15, 22),
        },
        {
            "pin_id": 26, "user_id": 4,
            "message": "Strawberry shortcake is a timeless dessert. 🍰🍓",
            "created_at": datetime(2023, 7, 6, 14, 00),
            "updated_at": datetime(2023, 7, 6, 15, 22),
        },
        {
            "pin_id": 26, "user_id": 6,
            "message": "Strawberry jam sandwiches are my childhood favorite. 🥪 ",
            "created_at": datetime(2023, 6, 6, 14, 00),
            "updated_at": datetime(2023, 6, 6, 15, 22),
        },

        # pin 29
        {
            "pin_id": 29, "user_id": 1,
            "message": "Nothing beats the taste of fresh peaches in a margarita. It's like sunshine in a sip! 🍹🍑 ",
            "created_at": datetime(2023, 9, 1, 11, 00),
            "updated_at": datetime(2023, 9, 1, 13, 22),
        },
        {
            "pin_id": 29, "user_id": 5,
            "message": "I kept it simple. No coconut and no extra peach on top. And it is still excellent.",
            "created_at": datetime(2023, 9, 1, 11, 00),
            "updated_at": datetime(2023, 9, 1, 13, 22),
        },

        # pin 30
        {
            "pin_id": 30, "user_id": 1,
            "message": "A kitchen is a long-term investment, so it's great to see trends that emphasize quality and durability. These choices are spot on! 👌",
            "created_at": datetime(2023, 7, 21, 11, 00),
            "updated_at": datetime(2023, 7, 21, 13, 22),
        },
        {
            "pin_id": 30, "user_id": 2,
            "message": "I'm planning a kitchen remodel, and this list is a goldmine of inspiration. ",
            "created_at": datetime(2023, 6, 21, 11, 00),
            "updated_at": datetime(2023, 6, 21, 13, 22),
        },
        {
            "pin_id": 30, "user_id": 6,
            "message": "New year, new kitchen trends! These are definitely not just fast fashion fads. They're here to stay and elevate our homes. 🏠🍽️",
            "created_at": datetime(2023, 1, 21, 11, 00),
            "updated_at": datetime(2023, 1, 21, 13, 22),
        },
        {
            "pin_id": 30, "user_id": 4,
            "message": "The styling ideas are so chic and elegant. Love them!",
            "created_at": datetime(2023, 8, 21, 11, 00),
            "updated_at": datetime(2023, 8, 21, 13, 22),
        },
        {
            "pin_id": 30, "user_id": 5,
            "message": "Thanks for sharing these trends for 2023! 🏡👨‍🍳",
            "created_at": datetime(2023, 2, 21, 11, 00),
            "updated_at": datetime(2023, 2, 21, 13, 22),
        },
        {
            "pin_id": 30, "user_id": 3,
            "message": "I love how these trends combine modern style with classic elements. It's all about creating a kitchen that's both stylish and enduring. ",
            "created_at": datetime(2023, 1, 21, 11, 00),
            "updated_at": datetime(2023, 1, 21, 13, 22),
        },

        # pin 31
        {
            "pin_id": 31, "user_id": 1,
            "message": "So nice,👍great 👍👍❤️",
            "created_at": datetime(2023, 9, 2, 11, 00),
            "updated_at": datetime(2023, 9, 4, 13, 22),
        },
        {
            "pin_id": 31, "user_id": 4,
            "message": "Farmhouse style doesn't have to cost a fortune. These Dollar Tree finds are a game-changer for anyone looking to revamp their decor affordably.💰",
            "created_at": datetime(2023, 8, 2, 11, 00),
            "updated_at": datetime(2023, 8, 4, 13, 22),
        },
        {
            "pin_id": 31, "user_id": 5,
            "message": "The charm of farmhouse decor is within reach, thanks to these clever Dollar Tree hacks. 🛠️",
            "created_at": datetime(2023, 6, 2, 11, 00),
            "updated_at": datetime(2023, 6, 4, 13, 22),
        },
        {
            "pin_id": 31, "user_id": 6,
            "message": "I love a good DIY project, especially when it's budget-friendly! ",
            "created_at": datetime(2023, 5, 1, 11, 00),
            "updated_at": datetime(2023, 5, 1, 13, 22),
        },
        {
            "pin_id": 31, "user_id": 3,
            "message": "DIY enthusiasts, rejoice! ",
            "created_at": datetime(2023, 7, 30, 11, 00),
            "updated_at": datetime(2023, 7, 30, 13, 22),
        },
        {
            "pin_id": 31, "user_id": 6,
            "message": "Everyone have fun with your DIY projects. 🌟🌟",
            "created_at": datetime(2023, 5, 30, 11, 00),
            "updated_at": datetime(2023, 5, 30, 13, 22),
        },
        {
            "pin_id": 31, "user_id": 2,
            "message": "I'm all about making my home cozy and stylish without overspending. These Dollar Tree Farmhouse DIYs are a must-try! ",
            "created_at": datetime(2022, 1, 30, 11, 00),
            "updated_at": datetime(2022, 1, 30, 13, 22),
        },
    ]

    seed_boards = [db.session.add(Comment(**comment)) for comment in comments]
    db.session.commit()


def undo_comments():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
