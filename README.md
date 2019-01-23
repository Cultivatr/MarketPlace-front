# MarketPlace

# Setting up your local database:
0. Git Pull fresh copy of the repository

1. Navigate to Marketplace/back-end in console

2. run **npm install**

3. run **psql evolveu**

4. run **CREATE DATABASE cultivatr**

5. exit psql **\q**

6. run **node server.js** 
>*this will create tables and columns*

7. exit server.js **Ctrl c**

8. navigate to Marketplace/back-end/DB and get back into your psql console

9. run **\i scripts/populate_tables.sql** 
>*this will populate tables with dummy data*

