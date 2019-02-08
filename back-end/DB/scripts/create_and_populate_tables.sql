DROP TABLE Status_Tracker;
DROP TABLE Offered_Item;
DROP TABLE Users;
DROP TABLE R_Status;
DROP TABLE R_Product;
DROP TABLE R_Facilities;


CREATE TABLE R_Facilities (
  Name TEXT,
  Type TEXT
);

CREATE TABLE R_Product (
  Name   TEXT,
  Type   TEXT,
  Qty_unit TEXT
);

CREATE TABLE R_Status (
  Status_Name TEXT
);

CREATE TABLE Users (
  First_name TEXT,
  Last_name TEXT,
  Primary_phone TEXT,
  Secondary_phone TEXT,
  Email TEXT,
  Farm_name TEXT,
  Farm_location TEXT,
  Area TEXT,
  Is_producer BOOLEAN,
  Is_admin BOOLEAN,
  Is_other BOOLEAN,
  Member_since DATE,
  Farm_type TEXT,
  Rating INT,
  Mailing_street TEXT,
  Mailing_city TEXT,
  Mailing_province TEXT,
  Mailing_country TEXT,
  Mailing_postal_code TEXT,
  Billing_street TEXT,
  Billing_city TEXT,
  Billing_province TEXT,
  Billing_country TEXT,
  Billing_postal_code TEXT,
  User_comments TEXT

);

\copy r_facilities FROM 'sample_files/r_facilities.tsv' WITH NULL ''

ALTER TABLE R_Facilities add column r_facilities_id SERIAL PRIMARY KEY;

\copy r_product FROM 'sample_files/r_product.tsv' WITH NULL ''

ALTER TABLE r_product add column product_id SERIAL PRIMARY KEY;

\copy r_status FROM 'sample_files/r_status.tsv' WITH NULL ''

ALTER TABLE r_status add column status_id SERIAL PRIMARY KEY;

\copy users from 'sample_files/user.tsv' with null ''

ALTER TABLE users add column user_id SERIAL PRIMARY KEY;


CREATE TABLE Offered_Item(
  user_id INT REFERENCES users ON DELETE RESTRICT,
  product_id INT REFERENCES r_product ON DELETE RESTRICT,
  status_id INT REFERENCES r_status ON DELETE RESTRICT,
  Quantity INT,
  Price_paid MONEY,
  Est_birthdate DATE,
  Registration_number INT,
  RFID_tag INT,
  Breed TEXT,
  Single_brand BOOLEAN,
  Starting_date_of_feed DATE,
  Type_of_feed TEXT,
  Est_completion_date DATE,
  Starting_weight NUMERIC,
  Est_finished_weight NUMERIC,
  Hanging_weight NUMERIC,
  Est_price_to_be_paid MONEY,
  Date_planted DATE,
  Seed_type TEXT,
  Heirloom BOOLEAN,
  GMO BOOLEAN,
  Fertilizer_type_used TEXT,
  Pesticide_type_used TEXT,
  Estimated_qty_planted NUMERIC,
  Estimated_finished_qty NUMERIC,
  Qty_accepted_for_listing NUMERIC,
  Qty_accepted_at_delivery NUMERIC,
  Chargebacks MONEY,
  Delivered_date DATE,
  Delivered_to TEXT
);

\copy Offered_Item FROM 'sample_files/offered_item.tsv' WITH NULL ''

ALTER TABLE Offered_Item add column offer_id SERIAL PRIMARY KEY;


CREATE TABLE Status_Tracker (

  status_id INT REFERENCES r_status ON DELETE RESTRICT,
  start_date DATE,
  end_date DATE,
  offer_id INT REFERENCES offered_item ON DELETE RESTRICT
);

\copy status_tracker FROM 'sample_files/status_tracker.tsv' WITH NULL ''

ALTER TABLE Status_Tracker add column status_tracker_id SERIAL PRIMARY KEY;
