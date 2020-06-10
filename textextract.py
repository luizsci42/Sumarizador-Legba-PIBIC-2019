import json
import re
import requests


def extrair(titulo):
    titulo = titulo.replace('_', ' ')

    parametros = {
        'action': 'query',
        'format': 'json',
        'titles': titulo,
        'prop': 'extracts',
        'explaintext': True
    }

    response = requests.get(
        'https://pt.wikipedia.org/w/api.php',
        params=parametros
    ).json()

    page = next(iter(response['query']['pages'].values()))

    # Este é o conteúdo em texto da página
    return page['extract']


def extrair_topicos(texto):
    """
    :param texto:
    :return:
    """
    # Queremos extrair todas as ocorrências em que o padrão é == Algum texto ==
    # () significar capturar e agrupar
    # . qualquer caractere exceto de quebra de linha
    # + uma ou mais ocorrências
    resultado = re.findall("==(.+?)==", texto)

    irrelevantes = [' Ver também ', ' Referências ', ' Bibliografia ', ' Ligações Externas ']
    # Pegamos apenas os tópicos relevantes
    topicos = [topico for topico in resultado if topico not in irrelevantes]

    # Cada == indica um bloco novo
    paragrafos_e_titulos = texto.split('==')
    # Parágrafos são todos os itens que não começam com ==
    paragrafos = [bloco for bloco in paragrafos_e_titulos if bloco not in topicos + irrelevantes]
    # Removemos os caracteres de quebra de linha
    paragrafos = [paragrafo.replace('\n', '') for paragrafo in paragrafos]

    # Vamos crirar uma lista de tuplas de pares ordenados
    # em que o primeiro item é o tópico e o segundo seu respectivo conteúdo
    conteudo = [('Introdução', paragrafos[0])]
    for i in range(0, len(topicos)):
        conteudo.append((topicos[i], paragrafos[i+1]))

    return conteudo


def escrever_json(conteudo):
    """
    :param chaves:
    :param conteudo:
    :return:
    """
    dicio = {'texto': []}
    for i in range(0, len(conteudo)):
        dicio['texto'].append((conteudo[i][0], conteudo[i][1]))
        # dicio.update({conteudo[i][0]: conteudo[i][1]})

    saida = dict(dicio)

    return json.dumps(saida, ensure_ascii=False)


def gerar_dicionario(titulo_do_artigo):
    # Extrair texto da Wikipedia
    texto = extrair(titulo_do_artigo)
    # Faz uma lista com os títulos de cada tópico
    topicos = extrair_topicos(texto)
    # Gera um JSON cujas chaves são os tópicos e seus respectivos valores são os conteúdos
    return topicos
