CREATE TABLE PERSON (
    id serial PRIMARY KEY,
    name varchar(120),
    email varchar(150),
    password varchar(200)
);

CREATE TABLE LINK (
    id serial PRIMARY KEY,
    url text,
    shortUrl text,
    visitCount integer,
    FK_PERSON_id serial
);
 
ALTER TABLE LINK ADD CONSTRAINT FK_LINK_PERSON
    FOREIGN KEY (FK_PERSON_id)
    REFERENCES PERSON (id)
    ON DELETE CASCADE;