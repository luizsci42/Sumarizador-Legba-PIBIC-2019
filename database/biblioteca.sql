DROP SCHEMA biblioteca CASCADE;
CREATE  SCHEMA  biblioteca;

CREATE DOMAIN biblioteca.tipo_isbn AS VARCHAR(13);
CREATE DOMAIN biblioteca.tipo_doi AS VARCHAR(13);
CREATE DOMAIN biblioteca.tipo_cpf AS VARCHAR(11);
CREATE DOMAIN biblioteca.tipo_ano AS INTEGER CHECK(VALUE >= 0 AND VALUE < 3000);

CREATE TABLE biblioteca.obras(
    id SERIAL,
    titulo VARCHAR(90),
    editora VARCHAR(20),
    idioma VARCHAR(20),
    genero VARCHAR(45),
    ano biblioteca.tipo_ano,
    CONSTRAINT pk_obras PRIMARY KEY (id)
);

CREATE TABLE biblioteca.periodico(
    id_doi biblioteca.tipo_doi,
    obras_id SERIAL,
    CONSTRAINT pk_periodico PRIMARY KEY (id_doi),
    FOREIGN KEY (obras_id) REFERENCES biblioteca.obras (id)
)INHERITS (biblioteca.obras);

CREATE TABLE biblioteca.livros(
    id_isbn biblioteca.tipo_isbn,
    autor VARCHAR(90),
    obras_id SERIAL,
    CONSTRAINT pk_livro PRIMARY KEY (id_isbn),
    FOREIGN KEY (obras_id) REFERENCES biblioteca.obras (id)
    
)INHERITS (biblioteca.obras);

CREATE TABLE biblioteca.autor(
    id_autor SERIAL,
    livro_id_isbn biblioteca.tipo_isbn,
    livros_obras_titulo SERIAL,
    FOREIGN KEY (livro_id_isbn) REFERENCES biblioteca.livros (id_isbn),
    FOREIGN KEY (livros_obras_titulo) REFERENCES biblioteca.obras (id),
    CONSTRAINT pk_autor PRIMARY KEY (id_autor)
);

CREATE TABLE biblioteca.exemplares(
  id_exemplares SERIAL,
    numero INTEGER,
    edicao INTEGER,
    numero_renovacao INTEGER DEFAULT 0,
    status BOOLEAN, 
    previsao_entrega DATE DEFAULT CURRENT_DATE,
    data_entrega DATE,
    obras_titulo SERIAL,
    FOREIGN KEY (obras_titulo) REFERENCES biblioteca.obras (id),
    CONSTRAINT pk_exemplares PRIMARY KEY (id_exemplares)
);

CREATE TABLE biblioteca.emprestimo(
    data DATE DEFAULT CURRENT_DATE,
    status BOOLEAN DEFAULT TRUE,
    id SERIAL,
    CONSTRAINT pk_emprestimo PRIMARY KEY (id)
);

CREATE TABLE biblioteca.bloqueio(
  id SERIAL,
  CONSTRAINT pk_bloqueio PRIMARY KEY (id)
);

CREATE TABLE biblioteca.cliente(
    id SERIAL,
    endereco VARCHAR(90) NOT NULL,
    nome VARCHAR(90) NOT NULL,
    dependente VARCHAR(90) DEFAULT 'Não possui',
    dias_de_atraso INTEGER DEFAULT 0,
    status BOOLEAN DEFAULT TRUE,
    bloqueio DATE DEFAULT NULL,
    operacao VARCHAR(45) DEFAULT 'Nenhuma Operação Realizada',
    data_de_operacao DATE DEFAULT CURRENT_DATE,
    idade INTEGER NOT NULL,
    emprestimo_id SERIAL,
    bloqueio_id SERIAL,
    CHECK(idade>=18),
    FOREIGN KEY (emprestimo_id) REFERENCES biblioteca.emprestimo(id),
    FOREIGN KEY (bloqueio_id) REFERENCES biblioteca.bloqueio(id),
    CONSTRAINT pk_cliente PRIMARY KEY (id)
);

CREATE TABLE biblioteca.funcionario(
  id SERIAL,
    dia_de_pagamento DATE,
    emprestimo_id SERIAL,
    FOREIGN KEY (emprestimo_id) REFERENCES biblioteca.emprestimo(id),
    CONSTRAINT pk_funcionario PRIMARY KEY (id)
)INHERITS (biblioteca.cliente);

CREATE TABLE biblioteca.atendente(
  id SERIAL,
  cliente_id SERIAL,
    FOREIGN KEY (cliente_id) REFERENCES biblioteca.cliente(id),
    CONSTRAINT pk_atendente PRIMARY KEY (id)
)INHERITS (biblioteca.funcionario);

CREATE TABLE biblioteca.bibliotecario(
  id SERIAL,
  cliente_id SERIAL,
  titulo_id SERIAL,
    FOREIGN KEY (cliente_id) REFERENCES biblioteca.cliente(id),
    FOREIGN KEY (titulo_id) REFERENCES biblioteca.emprestimo(id),
    CONSTRAINT pk_bibliotecario PRIMARY KEY (id)
)INHERITS (biblioteca.funcionario);