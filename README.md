# Welcome to PinThis!

PinThis is a Pinterest clone where users have full CRUD on Pin, Board, Comments and favorite functions. The backend of PinThis is built on Python with a PostgreSQL database. Frontend rendering is handled with React.
Check out a live version of PinThis [here](https://pinthis.onrender.com/)

## Technologies Used
<!-- [![JavaScript](https://camo.githubusercontent.com/aeddc848275a1ffce386dc81c04541654ca07b2c43bbb8ad251085c962672aea/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6a6176617363726970742d2532333332333333302e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d6a617661736372697074266c6f676f436f6c6f723d253233463744463145)](https://camo.githubusercontent.com/aeddc848275a1ffce386dc81c04541654ca07b2c43bbb8ad251085c962672aea/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6a6176617363726970742d2532333332333333302e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d6a617661736372697074266c6f676f436f6c6f723d253233463744463145)  -->
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)   ![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)   ![Postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)   ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)   ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)   ![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)   ![AWS](https://img.shields.io/badge/Amazon_AWS-%23232f3e.svg?style=for-the-badge&logo=amazonaws&logoColor=ec912d)


## Getting started

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
![2023-08-05 23 53 52](https://github.com/YYYWeee/GroupProject/assets/63111667/1abc5104-f31a-48cb-8403-1df0b08fb016)


## Create a board and invite collaborators

![2023-08-06 00 14 18](https://github.com/YYYWeee/GroupProject/assets/63111667/272e8267-3a1f-44a4-a597-ca8e69e23f5f)

## Favorite a specific pin 

![2023-08-06 22 32 11](https://github.com/YYYWeee/GroupProject/assets/63111667/7c4b02b3-4ad9-488e-a305-2ae211dc2281)


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


### Favorites 
* Users should be able to see all Pins they favorited.
* Users should be able to favorite Pins.
* Users should be able to unfavorite Pins.
