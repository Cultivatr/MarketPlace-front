\copy r_status FROM 'sample_files/r_status.tsv' WITH NULL ''

ALTER TABLE r_status add column status_id SERIAL PRIMARY KEY;
