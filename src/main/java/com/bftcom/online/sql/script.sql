CREATE DATABASE LibraryOnLine;

CREATE TABLE IF NOT EXISTS public.user_table
(
    id       INT  NOT NULL CONSTRAINT user_table_pk PRIMARY KEY,
    name TEXT NOT NULL,
    password TEXT NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS user_table_id_index on public.user_table (id);

CREATE UNIQUE INDEX IF NOT EXISTS user_table_username_index on public.user_table (name);
/**/

CREATE TABLE IF NOT EXISTS public.author
(
    id          BIGINT CONSTRAINT author_pk PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name   TEXT NOT NULL,
    last_name    TEXT NOT NULL,
    display_name TEXT,
    biography TEXT
);

CREATE UNIQUE INDEX IF NOT EXISTS author_id_index ON public.author (id);
/**/
CREATE TABLE IF NOT EXISTS public.book
(
    id   BIGINT CONSTRAINT book_pk PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    definition TEXT
);
CREATE UNIQUE INDEX IF NOT EXISTS book_id_index ON public.book (id);
/**/

CREATE TABLE IF NOT EXISTS  public.file
(
    id           BIGINT CONSTRAINT file_pk PRIMARY KEY  GENERATED ALWAYS AS IDENTITY,
    name         TEXT  NOT NULL,
    data         BYTEA NOT NULL,
    type         TEXT  NOT NULL,
    content_type INT   NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS file_id_index ON public.file (id);
/**/
CREATE TABLE IF NOT EXISTS public.genre
(
    id        BIGINT CONSTRAINT genre_pk PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name      TEXT   NOT NULL,
    parent_id BIGINT CONSTRAINT genre_genre_id_fk REFERENCES public.genre
);

CREATE UNIQUE INDEX IF NOT EXISTS genre_id_index ON genre (id);

/**/
CREATE TABLE IF NOT EXISTS public.book_author
(
    book_id   BIGINT NOT NULL CONSTRAINT book_author_book_id_fk
            REFERENCES public.book,
    author_id BIGINT NOT NULL CONSTRAINT book_author_author_id_fk
            REFERENCES public.author
);

/**/
CREATE TABLE IF NOT EXISTS public.book_genre
(
    book_id  BIGINT NOT NULL CONSTRAINT book_genre_book_id_fk REFERENCES public.book,
    genre_id BIGINT NOT NULL CONSTRAINT book_genre_genre_id_fk REFERENCES public.genre
);

/**/
CREATE TABLE IF NOT EXISTS public.book_file
(
    book_id  BIGINT NOT NULL CONSTRAINT book_file_book_id_fk REFERENCES public.book,
    file_id BIGINT NOT NULL CONSTRAINT book_file_file_id_fk REFERENCES public.file
);