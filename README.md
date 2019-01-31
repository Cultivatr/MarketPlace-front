# MarketPlace

## Setting up your local database:
0. Git Pull fresh copy of the repository

1. in your console, navigate to Marketplace/back-end 

2. run **npm install**

3. run **psql evolveu**

4. run **CREATE DATABASE cultivatr**

THIS STEP (#5) IS GONNA BE ONLY FOR LINUX USERS

5. run **ALTER USER evolveu PASSWORD 'evolveu';**

6. exit psql **\q**

7. run **npm start** *this will create tables and columns*

8. exit the server **Ctrl c**

8.5 in server.js, comment out line 29, so that tables are persistent every time you run the server. 

9. navigate to Marketplace/back-end/DB and get back into your psql console: **psql cultivatr**

10. run **\i scripts/populate_tables.sql** *this will populate tables with dummy data*

## Refreshing your database

1. in server.js, uncomment line 29. 

2. in your console, navigate to Marketplace/back-end and run **npm start** *this will drop all tables and create new (empty) ones*

3. exit the server **Ctrl c**

4. navigate to Marketplace/back-end/DB and run **psql cultivatr**

5. run **\i scripts/populate_tables.sql** *this will re-populate tables with dummy data*

6. exit psql **\q**

7. in server.js, comment out line 29, so that tables are persistent every time you run the server. 

