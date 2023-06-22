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
