import json
import re
import requests
from requests import RequestException
from PIL import Image
from io import BytesIO


def extrair_texto(titulo):
    """
    :param titulo:
    :return:
    """
    parametros = {
        'action': 'query',
        'format': 'json',
        'titles': titulo,
        'prop': 'extracts',
        'explaintext': True
    }

    try:
        response = requests.get(
            'https://pt.wikipedia.org/w/api.php',
            params=parametros
        ).json()
    # Exceção levantada quando há erro de conexão
    except RequestException:
        # raise irá rpassar a exceção para ser tratada depois, em outra parte do software
        raise
    # Exceção lançada quando não é encontrada uma página com o título passado
    except KeyError:
        raise
    # Código executado se não ocorrer nenhuma exceção
    else:
        page = next(iter(response['query']['pages'].values()))
        # Este é o conteúdo em texto da página
        return page['extract']


def extrair_imagens(titulo):
    """

    :param titulo:
    :return:
    """
    parametros = {
        'action': 'query',
        'format': 'json',
        'titles': titulo,
        'prop': 'images',
        'explaintext': True
    }

    try:
        response = requests.get(
            'https://pt.wikipedia.org/w/api.php',
            params=parametros
        ).json()
    # Exceção levantada quando há erro de conexão
    except RequestException:
        # raise irá rpassar a exceção para ser tratada depois, em outra parte do software
        raise
    # Exceção lançada quando não é encontrada uma página com o título passado
    except KeyError:
        raise
    # Código executado se não ocorrer nenhuma exceção
    else:
        page = next(iter(response['query']['pages'].values()))
        # Este é o conteúdo em texto da página
        imagens = []
        for imagem in page['images']:
            imagens.append(imagem['title'])

        fotos = extrair_imagens_aux(imagens)

        return fotos


def extrair_imagens_aux(titulos_imagens):
    enderecos = []
    for nome_imagem in titulos_imagens:
        parametros = {
            'action': 'query',
            'format': 'json',
            'titles': nome_imagem,
            'prop': 'imageinfo',
            'iiprop': 'url'
        }

        response = requests.get('https://pt.wikipedia.org/w/api.php', params=parametros).json()
        dados_imanges = next(iter(response['query']['pages'].values()))
        endereco = dados_imanges['imageinfo'][0]['url']
        enderecos.append(endereco)

    return enderecos


def extrair(titulo):
    texto = extrair_texto(titulo)
    imagens = extrair_imagens(titulo)

    return texto, imagens


def extrair_topicos(texto, titulo):
    """
    :param texto:
    :return:
    """
    # Queremos extrair todas as ocorrências em que o padrão é == Algum texto ==
    # () significar capturar e agrupar
    # . qualquer caractere exceto de quebra de linha
    # + uma ou mais ocorrências
    resultado = re.findall("==(.+?)==", texto)

    irrelevantes = [' Ver também ', ' Referências ', ' Bibliografia ', ' Ligações externas ', ' Fontes ', ' Artigos ']
    # Pegamos apenas os tópicos relevantes
    topicos = [topico for topico in resultado if topico not in irrelevantes]
    # Removemos o primeiro = dos subtópicos
    topicos = [topico.replace('=', '') for topico in topicos]

    # Cada == indica um bloco novo
    paragrafos_e_titulos = texto.split('==')
    # Parágrafos são todos os itens que não começam com ==
    paragrafos = [bloco for bloco in paragrafos_e_titulos if bloco not in topicos + irrelevantes]
    # Removemos os caracteres de quebra de linha
    paragrafos = [paragrafo.replace('\n', '') for paragrafo in paragrafos]

    # Vamos crirar uma lista de tuplas de pares ordenados
    # em que o primeiro item é o tópico e o segundo seu respectivo conteúdo
    conteudo = [(titulo, paragrafos[0])]
    for i in range(0, len(topicos)):
        conteudo.append((topicos[i], paragrafos[i+1]))

    return conteudo


def escrever_json(conteudo, imagens):
    """
    :param chaves:
    :param conteudo:
    :return:
    """

    dicio = {'texto': [], "imagens": imagens}
    for i in range(0, len(conteudo)):
        dicio['texto'].append((conteudo[i][0], conteudo[i][1]))

    saida = dict(dicio)

    return json.dumps(saida, ensure_ascii=False)


def gerar_dicionario(titulo_do_artigo):
    try:
        # Extrair texto da Wikipedia
        texto, imagens = extrair(titulo_do_artigo)
    except KeyError:
        raise
    except RequestException:
        raise
    else:
        # Faz uma lista com os títulos de cada tópico
        topicos = extrair_topicos(texto, titulo_do_artigo)
        # Gera um JSON cujas chaves são os tópicos e seus respectivos valores são os conteúdos
        return topicos, imagens


if __name__ == '__main__':
    gerar_dicionario()
