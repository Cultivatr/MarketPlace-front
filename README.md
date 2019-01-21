# MarketPlace

# Setting up your local database:
0. Pull a fresh copy of the repo :)
1. In your terminal, nagivate to MarketPlace/back-end/DB
2. Open a psql console.

3. There will be several scripts to run that create and populated all the tables. It is important to run them in this order:

3.a: \i scripts/create_table_r_product.sql

3.b: \i scripts/create_table_r_status.sql

3.c: \i scripts/create_table_users.sql

3.d: \i scripts/populate_table_r_product.sql

3.e: \i scripts/populate_table_r_status.sql

3.f: \i scripts/populate_table_users.sql

3.g: \i scripts/create_table_offered_item.sql

3.h: \i scripts/populate_table_offered_item.sql

