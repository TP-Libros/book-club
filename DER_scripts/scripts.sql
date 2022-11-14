CREATE TABLE public.editorial (
 edi_id INTEGER NOT NULL,
 edi_name VARCHAR(10) NOT NULL,
 CONSTRAINT editorial_pk PRIMARY KEY (edi_id)
);
CREATE TABLE public.associated (
 ass_id_ INTEGER NOT NULL,
 ass_userName_ VARCHAR NOT NULL,
 ass_password VARCHAR NOT NULL,
 CONSTRAINT associated_pk PRIMARY KEY (ass_id_)
);
CREATE TABLE public.author (
 aut_id_ INTEGER NOT NULL,
 aut_name_ VARCHAR NOT NULL,
 aut_surname_ VARCHAR NOT NULL,
 CONSTRAINT author_pk PRIMARY KEY (aut_id_)
);
CREATE TABLE public.gender (
 gen_id_ SMALLINT NOT NULL,
 gen_name_ VARCHAR NOT NULL,
 CONSTRAINT gender_pk PRIMARY KEY (gen_id_)
);
CREATE TABLE public.book (
 boo_ISBN_ INTEGER NOT NULL,
 boo_borrowingSt BOOLEAN NOT NULL,
 boo_title_ VARCHAR NOT NULL,
 aut_id_ INTEGER NOT NULL,
 edi_id INTEGER NOT NULL,
 gen_id_ SMALLINT NOT NULL,
 boo_yearEdition INTEGER NOT NULL,
 boo_synopsis VARCHAR,
 boo_imagePath VARCHAR NOT NULL,
 ass_id_ INTEGER NOT NULL,
 CONSTRAINT book_pk PRIMARY KEY (boo_ISBN_)
);
CREATE TABLE public.borrowing (
 boo_ISBN_ INTEGER NOT NULL,
 bor_from_date_ DATE NOT NULL,
 bor_to_date_ DATE NOT NULL,
 bor_devolution_date_ DATE,
 ass_id_ INTEGER NOT NULL,
 CONSTRAINT borrowing_pk PRIMARY KEY (boo_ISBN_, bor_from_date_, bor_to_date_)
);

ALTER TABLE public.book ADD CONSTRAINT editorial_book_fk
FOREIGN KEY (edi_id)
REFERENCES public.editorial (edi_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.borrowing ADD CONSTRAINT associated_borrowing_fk
FOREIGN KEY (ass_id_)
REFERENCES public.associated (ass_id_)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.book ADD CONSTRAINT associated_book_fk
FOREIGN KEY (ass_id_)
REFERENCES public.associated (ass_id_)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.book ADD CONSTRAINT author_book_fk
FOREIGN KEY (aut_id_)
REFERENCES public.author (aut_id_)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.book ADD CONSTRAINT gender_book_fk
FOREIGN KEY (gen_id_)
REFERENCES public.gender (gen_id_)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.borrowing ADD CONSTRAINT book_borrowing_fk
FOREIGN KEY (boo_ISBN_)
REFERENCES public.book (boo_ISBN_)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE