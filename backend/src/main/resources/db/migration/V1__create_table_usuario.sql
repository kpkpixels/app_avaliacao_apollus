CREATE TABLE tb_usuario
(
    id SERIAL PRIMARY KEY,
    senha character varying(255),
    user_login character varying(255),
    cargo smallint,
    CONSTRAINT tb_usuario_cargo_check CHECK (cargo >= 0 AND cargo <= 1)
)