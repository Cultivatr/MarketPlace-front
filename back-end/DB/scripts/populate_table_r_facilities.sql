\copy r_facilities FROM 'sample_files/r_facilities.tsv' WITH NULL ''

ALTER TABLE R_Facilities add column r_facilities_id SERIAL PRIMARY KEY;
