DROP TABLE Users;

CREATE TABLE Users (
  User_ID SERIAL PRIMARY KEY,
  First_name TEXT,
  Last_name TEXT,
  Primary_phone TEXT,
  Secondary_phone TEXT,
  Email TEXT,
  Mailing_address TEXT,
  Farm_name TEXT,
  Farm_location TEXT,
  Billing_address TEXT,
  Area TEXT,
  Is_producer BOOLEAN,
  Is_admin BOOLEAN,
  Is_other BOOLEAN,
  Member_since DATE,
  Farm_type TEXT,
  Rating INT
);
