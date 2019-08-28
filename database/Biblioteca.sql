CREATE DATABASE biblioteca
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

CREATE  SCHEMA  biblioteca;

CREATE DOMAIN biblioteca.tipo_isbn AS VARCHAR(13);
--não foi verificado a quantidade de digitos do DOI
CREATE DOMAIN biblioteca.tipo_doi AS VARCHAR(13);
CREATE DOMAIN biblioteca.tipo_cpf AS VARCHAR(11);
CREATE DOMAIN biblioteca.tipo_ano AS INTEGER CHECK(VALUE >= 0 AND VALUE < 3000);

CREATE TABLE biblioteca.obras(
    id_titulo SERIAL,
    editora VARCHAR(20),
    idioma VARCHAR(20),
    genero VARCHAR(45),
    ano biblioteca.tipo_ano,
    CONSTRAINT pk_obras PRIMARY KEY (id_titulo)
);

CREATE TABLE biblioteca.periodico(
    id_doi biblioteca.tipo_doi,
    obras_titulo SERIAL,
    CONSTRAINT pk_periodico PRIMARY KEY (id_doi,id_titulo),
    FOREIGN KEY (obras_titulo) REFERENCES biblioteca.obras (id_titulo)
);

CREATE TABLE biblioteca.livros(
    id_isbn biblioteca.tipo_isbn,
    autor VARCHAR(90)
    obras_titulo SERIAL,
    CONSTRAINT pk_livro PRIMARY KEY (id_isbn,id_titulo),
    FOREIGN KEY (obras_titulo) REFERENCES biblioteca.obras (id_titulo)
    
);

CREATE TABLE biblioteca.autor(
    id_autor SERIAL,
    livros_isbn biblioteca.tipo_isbn,
    livros_obras_titulo INTEGER REFERENCES biblioteca.obras (obras_titulo),
    CONSTRAINT pk_autor PRIMARY KEY (id_autor,livros_isbn,livros_obras_titulo),
    FOREIGN KEY (livros_isbn) REFERENCES biblioteca.livros (id_isbn)
);

CREATE TABLE biblioteca.exemplares(
    numero INTEGER,
    edicao INTEGER,
    numero_renovacao INTEGER,
    status BOOLEAN, 
    previsao_entrega DATE,
    data_entrega DATE,
    FOREIGN KEY (obras_titulo) REFERENCES biblioteca.obras (id_titulo)  
);

CREATE TABLE biblioteca.emprestimo(
    data DATE,
    status BOOLEAN,
    id_emprestimo SERIAL
);

CREATE TABLE biblioteca.bloqueio(
    id_bloqueio INTEGER
);

CREATE TABLE biblioteca.cliente(
    id_cliente SERIAL,
    endereco VARCHAR(90),
    nome VARCHAR(90)
    dependente VARCHAR(90),
    dias_de_atraso INTEGER,
    status BOOLEAN,
    bloqueio DATE,
    operacao VARCHAR(45),
    data_de_operacao DATE,
    FOREIGN KEY (emprestimo_id) REFERENCES biblioteca.emprestimo(id_emprestimo),
    FOREIGN KEY (bloqueio_id) REFERENCES biblioteca.bloqueio(id_bloqueio)
);

CREATE TABLE biblioteca.funcionario(
    dia_de_pagamento DATE,
    FOREIGN KEY (emprestimo_id) REFERENCES biblioteca.emprestimo(id_emprestimo)    
);

CREATE TABLE biblioteca.atendente(
    FOREIGN KEY (funcionario_cliente_idCliente) REFERENCES biblioteca.cliente(id_cliente)
);

CREATE TABLE biblioteca.bibliotecario(
    FOREIGN KEY (atendente_funcionario_cliente_idCliente) REFERENCES biblioteca.cliente(id_cliente),
    FOREIGN KEY (obras_titulo) REFERENCES biblioteca.emprestimo(id_titulo)
);