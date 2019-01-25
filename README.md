# MarketPlace

# Setting up your local database:
0. Git Pull fresh copy of the repository

1. Navigate to Marketplace/back-end in console

2. run **npm install**

3. run **psql evolveu**

4. run **CREATE DATABASE cultivatr**

THIS STEP (#5) IS GONNA BE ONLY FOR LINUX USERS
5. run ** ALTER USER evolveu PASSWORD 'evolveu';

6. exit psql **\q**

7. run **node server.js** *this will create tables and columns*

8. exit server.js **Ctrl c**

9. navigate to Marketplace/back-end/DB and get back into your psql console

10. run **\i scripts/populate_tables.sql** *this will populate tables with dummy data*

