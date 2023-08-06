# Welcome to PinThis!

PinThis is a Pinterest clone where users have full CRUD on Pin, Board, Comments functions, and partial CRUD on Favorite function. The backend of PinThis is built on Python with a PostgreSQL database. Frontend rendering is handled with React.
Check out a live version of PinThis [here](https://pinthis.onrender.com/)

## Technologies Used
[![JavaScript](https://camo.githubusercontent.com/aeddc848275a1ffce386dc81c04541654ca07b2c43bbb8ad251085c962672aea/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6a6176617363726970742d2532333332333333302e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d6a617661736372697074266c6f676f436f6c6f723d253233463744463145)](https://camo.githubusercontent.com/aeddc848275a1ffce386dc81c04541654ca07b2c43bbb8ad251085c962672aea/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6a6176617363726970742d2532333332333333302e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d6a617661736372697074266c6f676f436f6c6f723d253233463744463145) [![Flask](https://camo.githubusercontent.com/43c40e9f61f01e780f4cfed5dafda9e3494310ba1b6ea11e20c4949e556a47c3/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f666c61736b2d2532333030302e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d666c61736b266c6f676f436f6c6f723d7768697465)](https://camo.githubusercontent.com/43c40e9f61f01e780f4cfed5dafda9e3494310ba1b6ea11e20c4949e556a47c3/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f666c61736b2d2532333030302e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d666c61736b266c6f676f436f6c6f723d7768697465)  [![Postgres](https://camo.githubusercontent.com/29e7fc6c62f61f432d3852fbfa4190ff07f397ca3bde27a8196bcd5beae3ff77/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f706f7374677265732d2532333331363139322e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d706f737467726573716c266c6f676f436f6c6f723d7768697465)](https://camo.githubusercontent.com/29e7fc6c62f61f432d3852fbfa4190ff07f397ca3bde27a8196bcd5beae3ff77/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f706f7374677265732d2532333331363139322e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d706f737467726573716c266c6f676f436f6c6f723d7768697465)  [![NodeJS](https://camo.githubusercontent.com/7d7b100e379663ee40a20989e6c61737e6396c1dafc3a7c6d2ada8d4447eb0e4/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6e6f64652e6a732d3644413535463f7374796c653d666f722d7468652d6261646765266c6f676f3d6e6f64652e6a73266c6f676f436f6c6f723d7768697465)](https://camo.githubusercontent.com/7d7b100e379663ee40a20989e6c61737e6396c1dafc3a7c6d2ada8d4447eb0e4/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6e6f64652e6a732d3644413535463f7374796c653d666f722d7468652d6261646765266c6f676f3d6e6f64652e6a73266c6f676f436f6c6f723d7768697465)  [![React](https://camo.githubusercontent.com/ab4c3c731a174a63df861f7b118d6c8a6c52040a021a552628db877bd518fe84/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f72656163742d2532333230323332612e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d7265616374266c6f676f436f6c6f723d253233363144414642)](https://camo.githubusercontent.com/ab4c3c731a174a63df861f7b118d6c8a6c52040a021a552628db877bd518fe84/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f72656163742d2532333230323332612e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d7265616374266c6f676f436f6c6f723d253233363144414642)  [![Redux](https://camo.githubusercontent.com/9a7c7ebbabb2096c0ad0cac6f64bc9fe93f4954a3ae3f51d6f3e076ba462aab1/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f72656475782d2532333539336438382e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d7265647578266c6f676f436f6c6f723d7768697465)](https://camo.githubusercontent.com/9a7c7ebbabb2096c0ad0cac6f64bc9fe93f4954a3ae3f51d6f3e076ba462aab1/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f72656475782d2532333539336438382e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d7265647578266c6f676f436f6c6f723d7768697465)  [![AWS](https://camo.githubusercontent.com/9281daa5684971fd3325661e3dd5fea86b21a902e3741a556fb636fbf0e2f3d4/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4157532d2532334646393930302e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d616d617a6f6e2d617773266c6f676f436f6c6f723d7768697465)](https://camo.githubusercontent.com/9281daa5684971fd3325661e3dd5fea86b21a902e3741a556fb636fbf0e2f3d4/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4157532d2532334646393930302e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d616d617a6f6e2d617773266c6f676f436f6c6f723d7768697465)


## Getting started
The file explorer is accessible using the button in left corner of the navigation bar. You can create a new file by clicking the **New file** button in the file explorer. You can also create folders by clicking the **New folder** button.

 1. Clone this repository
 2. Install dependencies
- Backend
```bash
      pipenv install
  ```
  
 - Frontend
```bash
      npm install
  ```

3. Create a  **.env**  file based on the example with proper settings for your development environment, you should have these key in the  **.env**  file .
	 - SECRET_KEY 
	 - DATABASE_URL
	 - SCHEMA
	 - S3_BUCKET
	 - S3_KEY
	 - S3_SECRET

4. Make sure the SQLite3 database connection URL is in the **.env** file
5. Set up your database with information from your .env and then run the following to create your database, migrate, and seed
  ```bash
   pipenv shell
   ```
   
   ```bash
   pipenv db init
   ```
   
  ```bash
   flask db migrate
   ```
   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```
6. Start the app for both backend and frontend using:


-   backend :
    -   `pipenv run flask run`
-   frontend :
    -   `npm start`
 
   
## Landing Page
![2023-08-05 23 44 04](https://github.com/YYYWeee/GroupProject/assets/63111667/f6eb90ce-9f11-4887-b117-a673b97db4b3)


## Sign up & Log in 
![2023-08-05 23 32 35](https://github.com/YYYWeee/GroupProject/assets/63111667/3a51d653-638d-4005-99fd-22a54b71c737)


## Home Page
![Screenshot 2023-08-05 at 11 37 14 PM](https://github.com/YYYWeee/GroupProject/assets/63111667/ce9dad08-8fed-4ef9-8b75-5dc772b16a31)


## Pin detail page
![2023-08-05 23 36 00](https://github.com/YYYWeee/GroupProject/assets/63111667/00cac2a8-b4cf-409c-8bbc-45aeafed7ca5)


## Create Pin page

![2023-08-05 23 39 50](https://github.com/YYYWeee/GroupProject/assets/63111667/dc15357b-0977-451c-852c-ec3700930d88)


## All Boards belong to  specific user page



## Board detail page





## Features
### Pins
* Users should be able to view all posted Pins.
* Users should be able to create new posts.
* Users should be able to update their posts
* Users should be able to delete their posts.

  
### Boards
* Users should be able to view all boards on a user's profile.
* Users should be able to create new boards and add/remove Pins.
* Users should be able to update their boards.
* Users should be able to delete their boards.


### Comments 
* Users should be able to view all comments on a pin.
* Users should be able to create new comments on a pin.
* Users should be able to delete their comment from a pin.


### Favorites (partial CRUD)
* Users should be able to see all Pins they favorited.
* Users should be able to favorite Pins.
* Users should be able to unfavorite Pins.
