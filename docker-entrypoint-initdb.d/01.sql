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

INSERT INTO room (room_name, location) VALUES ('Kumpulan kampus', ST_GeographyFromText('SRID=4326;POINT(60.2050521 24.96232925)'));
INSERT INTO room (room_name, location) VALUES ('Arabia-kauppakeskus', ST_GeographyFromText('SRID=4326;POINT(60.20282 24.96785)'));
INSERT INTO room (room_name, location) VALUES ('Raha-automaattiyhdistys', ST_GeographyFromText('SRID=4326;POINT(60.21906 24.829)'));
