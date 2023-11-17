CREATE TABLE tb_usuario
(
    id bigint NOT NULL DEFAULT nextval('tb_usuario_id_seq'::regclass),
    senha character varying(255) COLLATE pg_catalog."default",
    user_login character varying(255) COLLATE pg_catalog."default",
    cargo smallint,
    CONSTRAINT tb_usuario_pkey PRIMARY KEY (id),
    CONSTRAINT tb_usuario_cargo_check CHECK (cargo >= 0 AND cargo <= 1)
)