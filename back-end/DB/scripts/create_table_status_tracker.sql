DROP TABLE Status_Tracker;

CREATE TABLE Status_Tracker (

  status_id INT REFERENCES r_status ON DELETE RESTRICT,
  start_date DATE,
  end_date DATE,
  offer_id INT REFERENCES offered_item ON DELETE RESTRICT
);
