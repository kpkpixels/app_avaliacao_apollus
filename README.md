# app_avaliacao_apollus
Aplicação criada para o processo seletivo da Apollus

Simples sistema de controle de usuários.

Front-end -> Angular 17.0.

Back-end -> Java Spring Boot com JPA.

# Banco de Dados
Instale <a href="https://www.postgresql.org/download/">PostgreSQL 16</a>.

Crie uma base de dados chamada "avaliacao_apollus_db"

Se necessário, altere as configurações de acesso no arquivo "application.properties" da API.

Por meio de uma migration do Flyway será criada a tabela "tb_usuario" com o usuário "admin" e senha "admin" prontos;

# API
Versão Java JDK: 17.0

IDE: <a href="https://spring.io/tools">Spring Tools 4.20.1</a>

Clone o repositório, importe o projeto, pasta "backend", para o Spring Tools. Com o lado direito do mouse, clique no projeto e selecione Configurações -> Configure to Maven Project.

Executar o arquivo "UserApplication"

# FRONT
Ter o Node instalado (v18.16.1 ou mais recente)

Abra a pasta "frontend" e execute o comando "npm i" no terminal. 

Após isso, execute o comando "ng s" no terminal para iniciar o projeto.


