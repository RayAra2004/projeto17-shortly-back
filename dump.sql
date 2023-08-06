--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 15.3

-- Started on 2023-08-06 17:15:38

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- *not* creating schema, since initdb creates it


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 212 (class 1259 OID 24976)
-- Name: link; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.link (
    id integer NOT NULL,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "visitCount" integer DEFAULT 0,
    fk_person_id integer NOT NULL,
    "createdAt" timestamp without time zone
);


--
-- TOC entry 211 (class 1259 OID 24975)
-- Name: link_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.link_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3332 (class 0 OID 0)
-- Dependencies: 211
-- Name: link_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.link_id_seq OWNED BY public.link.id;


--
-- TOC entry 210 (class 1259 OID 24967)
-- Name: person; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.person (
    id integer NOT NULL,
    name character varying(120) NOT NULL,
    email character varying(150) NOT NULL,
    password character varying(200) NOT NULL,
    "createdAt" timestamp without time zone
);


--
-- TOC entry 209 (class 1259 OID 24966)
-- Name: person_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.person_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3333 (class 0 OID 0)
-- Dependencies: 209
-- Name: person_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.person_id_seq OWNED BY public.person.id;


--
-- TOC entry 214 (class 1259 OID 24986)
-- Name: session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.session (
    id integer NOT NULL,
    token text NOT NULL,
    fk_person_id integer NOT NULL,
    "createdAt" timestamp without time zone
);


--
-- TOC entry 213 (class 1259 OID 24985)
-- Name: session_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.session_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3334 (class 0 OID 0)
-- Dependencies: 213
-- Name: session_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.session_id_seq OWNED BY public.session.id;


--
-- TOC entry 3175 (class 2604 OID 24979)
-- Name: link id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.link ALTER COLUMN id SET DEFAULT nextval('public.link_id_seq'::regclass);


--
-- TOC entry 3174 (class 2604 OID 24970)
-- Name: person id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.person ALTER COLUMN id SET DEFAULT nextval('public.person_id_seq'::regclass);


--
-- TOC entry 3177 (class 2604 OID 24989)
-- Name: session id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session ALTER COLUMN id SET DEFAULT nextval('public.session_id_seq'::regclass);


--
-- TOC entry 3183 (class 2606 OID 24984)
-- Name: link link_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.link
    ADD CONSTRAINT link_pkey PRIMARY KEY (id);


--
-- TOC entry 3179 (class 2606 OID 24974)
-- Name: person person_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT person_email_key UNIQUE (email);


--
-- TOC entry 3181 (class 2606 OID 24972)
-- Name: person person_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT person_pkey PRIMARY KEY (id);


--
-- TOC entry 3185 (class 2606 OID 24993)
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (id);


--
-- TOC entry 3186 (class 2606 OID 24994)
-- Name: link fk_link_person; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.link
    ADD CONSTRAINT fk_link_person FOREIGN KEY (fk_person_id) REFERENCES public.person(id) ON DELETE CASCADE;


--
-- TOC entry 3187 (class 2606 OID 24999)
-- Name: session fk_token_person; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT fk_token_person FOREIGN KEY (fk_person_id) REFERENCES public.person(id) ON DELETE CASCADE;


-- Completed on 2023-08-06 17:15:38

--
-- PostgreSQL database dump complete
--

