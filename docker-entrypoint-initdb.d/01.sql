CREATE EXTENSION postgis;

\c docker

CREATE TABLE room (
  id serial PRIMARY KEY,
  room_name varchar(100),
  location GEOGRAPHY(POINT, 4326)
);

CREATE TABLE message (
  id serial PRIMARY KEY,
  room_id integer references room(id),
  text varchar(1000)
);

CREATE INDEX room_location ON room USING GIST(location);

INSERT INTO room (room_name, location) VALUES ('Kumpulan kampus', ST_GeographyFromText('SRID=4326;POINT(24.96232925 60.2050521)'));
INSERT INTO room (room_name, location) VALUES ('Kauppakeskus Arabia', ST_GeographyFromText('SRID=4326;POINT(24.96785 60.20282)'));
INSERT INTO room (room_name, location) VALUES ('Raha-automaattiyhdistys', ST_GeographyFromText('SRID=4326;POINT(24.8290792 60.2190648)'));
