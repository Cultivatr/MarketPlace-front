\copy status_tracker FROM 'sample_files/status_tracker.tsv' WITH NULL ''

ALTER TABLE Status_Tracker add column status_tracker_id SERIAL PRIMARY KEY;
