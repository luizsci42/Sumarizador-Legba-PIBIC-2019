-- Mostra todos os TITULOS da biblioteca EM ORDEM ALFABETICA
SELECT obras.titulo 
FROM biblioteca.obras
ORDER BY obras.titulo ASC;

-- Mostra todos os LIVROS da biblioteca EM ORDEM ALFABETICA
SELECT obras.titulo 
FROM biblioteca.obras 
JOIN biblioteca.livros 
ON obras.id = livros.obras_id
ORDER BY obras.titulo ASC;
-- Mostra a QUANTIDADE de TITULOS de LIVROS da biblioteca
SELECT COUNT(obras.titulo) 
FROM biblioteca.obras
JOIN biblioteca.livros 
ON obras.id = livros.obras_id;
-- Mostra a QUANTIDADE de CLIENTES da biblioteca
SELECT COUNT(cliente.id) 
FROM biblioteca.cliente;

-- Mostra os EMPRESTIMOS ATIVOS dos CLIENTES
SELECT cliente.nome , emprestimo.status
FROM biblioteca.cliente
JOIN biblioteca.emprestimo
ON cliente.emprestimo_id = emprestimo.id
WHERE emprestimo.status IS TRUE;

-- Mostra todos os TITULOS de um AUTOR
SELECT autor.id_autor, livros.titulo
FROM biblioteca.autor 
JOIN biblioteca.livros 
ON autor.livro_id_isbn = livros.id_isbn;

-- Mostra qual EMPRESTIMO gerou o BLOQUEIO do CLIENTE
SELECT bloqueio.id, cliente.nome 
FROM biblioteca.cliente 
JOIN biblioteca.emprestimo 
ON cliente.emprestimo_id = emprestimo.id
JOIN biblioteca.bloqueio
ON bloqueio.id = cliente.bloqueio_id 
WHERE bloqueio.id 
IS NOT NULL;

-- Mosta o NOME dos CLIENTES ordenados NOME do Cliente 
SELECT cliente.nome 
FROM biblioteca.cliente
GROUP BY cliente.nome;

-- Mostra o TITULOS de todos os PERIODICO que tenham a no inicio
SELECT periodico.titulo 
FROM biblioteca.periodico
WHERE periodico.titulo 
LIKE 'a%';

--Mostra o NOME de todos os BIBLIOTECARIOS AGRUPADOS por NOME após o QUINTO
SELECT bibliotecario.nome
FROM biblioteca.bibliotecario
GROUP BY bibliotecario.nome
HAVING COUNT(bibliotecario.id) > 5;

-- Mostra o NOME dos BIBLIOTECARIOS, ATENDENTES e CLIENTES SEM REPETIÇÂO
SELECT nome
FROM biblioteca.bibliotecario
NATURAL JOIN biblioteca.atendente
NATURAL JOIN biblioteca.cliente;

-- Mostra o DIA DE PAGAMENTO de todos os FUNCIONARIOS que são BIBLIOTECARIOS
SELECT funcionario.dia_de_pagamento
FROM biblioteca.funcionario
WHERE EXISTS
	(SELECT bibliotecario.id 
	FROM biblioteca.bibliotecario);

--Mostra todos os ID das obras e GENEROS de LIVROS que NÂO estão dentro do INTERVALO
--'2010/09/10' AND '2011/10/10'
SELECT obras.id, livros.genero
FROM biblioteca.livros 
JOIN biblioteca.obras
USING(id) 
WHERE NOT EXISTS
	(SELECT exemplares.data_entrega 
	FROM biblioteca.exemplares
	WHERE exemplares.data_entrega 
	BETWEEN '2010/09/10' AND '2011/10/10'
	);

--Mostra o autor que possui MAIS TITULOS de LIVROS na biblioteca
SELECT autor.id_autor
FROM biblioteca.autor 
WHERE EXISTS
	(SELECT MAX(livro_id_isbn) AS maximo
	FROM 
		(SELECT COUNT(livro_id_isbn) AS livro_id_isbn 
		FROM biblioteca.autor 
		GROUP BY id_autor) 
	AS Tab_Aux);

--Mostra a editora que tem mais livros e periodicos na mesma consulta
SELECT periodico.editora, livros.editora
FROM biblioteca.periodico
JOIN biblioteca.livros
ON EXISTS
	(SELECT MAX(editoraP) AS periodico
	FROM( 
		SELECT COUNT(editora) AS editoraP
		FROM biblioteca.obras  
		GROUP BY editora)
	AS Tab_Aux);

--Mostra os FUNCIONARIOS que são BIBLIOTECARIOS e ESTÃO BLOQUEADOS
SELECT funcionario.nome
FROM biblioteca.funcionario
WHERE EXISTS 
	(SELECT bibliotecario.bloqueio
	FROM biblioteca.bibliotecario
	WHERE bibliotecario.bloqueio IS NOT NULL);