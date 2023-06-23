# read-to-win-publications
1. Install node
2. Install nodemon (npm install -g nodemon # or using yarn: yarn global add nodemon)
3. Inside the directory install node modules by following command (npm install)
4. Create the database(CREATE DATABASE `read_win_publications`;)
5. Create the author table(CREATE TABLE `author` (
      `ID` int(11) NOT NULL AUTO_INCREMENT,
      `FIRST_NAME` varchar(45) DEFAULT NULL,
      `LAST_NAME` varchar(45) DEFAULT NULL,
      `EMAIL` varchar(100) DEFAULT NULL,
      `CONTACT_NO` varchar(45) DEFAULT NULL,
      PRIMARY KEY (`ID`)
    ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;)
6. Create the book table(CREATE TABLE `books` (
      `ID` int(11) NOT NULL AUTO_INCREMENT,
      `ISBN_NO` varchar(45) DEFAULT NULL,
      `TITLE` varchar(100) DEFAULT NULL,
      `CATEGORY` varchar(45) DEFAULT NULL,
      `AUTHOR_ID` varchar(45) NOT NULL,
      `LIKE_COUNT` int(11) DEFAULT 0,
      PRIMARY KEY (`ID`)
    ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;)
7. Configure the database.js file host, user and password
8. Configure app.js with sender mail, receiver maail and sender mail app password
9. Execute the app using "node app.js" or "nodemon app.js"
10. To get the details by ISBN, use GET Method followed url "localhost:9001/book/ISBN_Number"
11. To get the author List, use GET Method followed url "localhost:9001/author/getAuthorList"
12. To save an author, use POST Method with JSON body ({
    "FIRST_NAME":"Kavindu",
    "LAST_NAME":"Rathnayake",
    "EMAIL":"asdsasfsfdg@gmail.com",
    "CONTACT_NO": "7413674589"
	}) followed url "localhost:9001/author/addAuthor"
13. To save a book, use POST Method with JSON body ({
    "AUTHOR_ID":"1",
    "CATEGORY":"Scifi",
    "TITLE":"Gravity",
    "ISBN_NO": "ISBN12345"
	}) followed url "localhost:9001/book/addBook"
14. To like a book by book id, use POST Method with JSON body ({"BOOK_ID": 1}) followed url "localhost:9001/book/likeBookById"
15. To like a book by ISBN, use POST Method with JSON body ({"ISBN_NO": "ISBN12345"}) followed url "localhost:9001/book/likeBookByIsbn"