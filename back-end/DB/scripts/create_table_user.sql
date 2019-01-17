create table User (
  User_ID serial,
  First_name text,
  Last_name text,
  Primary_phone text,
  Secondary_phone text,
  Email text,
  Mailing_address text,
  Farm_name text,
  Farm_location text,
  Billing_address text,
  Area text,
  Is_producer boolean,
  Is_admin boolean,
  Is_other boolean,
  Member_since date,
  Farm_type text,
  Rating int
);
