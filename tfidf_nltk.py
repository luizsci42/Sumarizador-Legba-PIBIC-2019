"""
Implementão da sumarização extrativa por tf-idf utilizando NLTK, de acordo com
o tutorial disponível em: https://towardsdatascience.com/text-summarization-using-tf-idf-e64a0644ace3
"""
import math

from nltk import sent_tokenize, word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer


def tokenizar(texto):
    periodos = sent_tokenize(texto)
    total_de_documentos = len(periodos)

    return total_de_documentos


def matriz_frequencia(periodos):
    matriz_frequencia = {}
    stopWords = set(stopwords.words('portuguese'))
    ps = PorterStemmer()

    for periodo in periodos:
        tabela_freq = {}
        palavras = word_tokenize(periodo)
        for palavra in palavras:
            palavra = palavra.lower()
            palavra = ps.stem(palavra)
            if palavra in stopWords:
                continue
            if palavra in tabela_freq:
                tabela_freq[palavra] += 1
            else:
                tabela_freq[palavra] = 1

        matriz_frequencia[periodo[:15]] = tabela_freq

    return matriz_frequencia


def criar_matriz_tf(matriz_frequencia):
    matriz_tf = {}

    for periodo, tabela_frequencia in matriz_frequencia.items():
        tabela_tf = {}

        quantidade_palavras_periodo = len(tabela_frequencia)
        for palavra, cont in tabela_frequencia.items():
            tabela_tf[palavra] = cont / quantidade_palavras_periodo

        matriz_tf[periodo] = tabela_tf

    return matriz_tf


def criar_documentos_por_palavras(matriz_freq):
    tabela_palavra_por_doc = {}

    for periodo, tabela_frequencia in matriz_freq.items():
        for palavra, cont in tabela_frequencia.items():
            if palavra in tabela_palavra_por_doc:
                tabela_palavra_por_doc[palavra] += 1
            else:
                tabela_palavra_por_doc[palavra] = 1

    return tabela_palavra_por_doc


def criar_matriz_idf(matriz_frequencia, n_docs_por_palavras, total_docs):
    matriz_idf = {}

    for periodo, tabela_frequencia in matriz_frequencia.items():
        tabela_idf = {}
        for palavra in tabela_frequencia.keys():
            tabela_idf[palavra] = math.log10(total_docs / float(n_docs_por_palavras[palavra]))
        matriz_idf[periodo] = tabela_idf

    return matriz_idf


def criar_matriz_tfidf(matriz_tf, matriz_idf):
    matriz_tfidf = {}

    for (periodo1, tabela_freq1), (periodo2, tabela_freq2) in zip(matriz_tf.items(), matriz_idf.items()):
        tabela_tfidf = {}
        for (palavra1, valor1), (palavra2, valor2) in zip(tabela_freq1.items(),
                                                          tabela_freq2.items()):
            tabela_tfidf[palavra1] = float(valor1 * valor2)
        matriz_tfidf[periodo1] = tabela_tfidf

    return matriz_tfidf


def pontuar_periodos(matriz_tfidf) -> dict:
    valorPeriodo = {}

    for periodo, tabela_freq in matriz_tfidf.items():
        pontuacao_total_por_periodo = 0
        cont_palavras_no_periodo = len(tabela_freq)
        for palavra, pontuacao in tabela_freq.items():
            pontuacao_total_por_periodo += pontuacao

        valorPeriodo[periodo] = pontuacao_total_por_periodo / cont_palavras_no_periodo

    return valorPeriodo


def encontrar_pontuacao_media(valorPeriodo):
    valores_soma = 0

    for entrada in valorPeriodo:
        valores_soma += valorPeriodo[entrada]

    media = (valores_soma / len(valorPeriodo))

    return media


def gerar_resumo(periodos, valorPeriodo, limiar):
    contador_periodo = 0
    resumo = ''

    for periodo in periodos:
        if periodo[:15] in valorPeriodo and valorPeriodo[periodo[:15]] >= limiar:
            resumo += " " + periodo
            contador_periodo += 1

    return resumo


def tf_idf(texto):
    """
    Faz o resumo de um texto utilizando o algoritmo TF-IDF

    :param texto: O texto original a ser resumido
    :return: O texto resumido
    """
    # 1
    periodos = sent_tokenize(texto)
    total_docs = len(periodos)
    # 2
    matriz_freq = matriz_frequencia(periodos)
    # 3
    matriz_tf = criar_matriz_tf(matriz_freq)
    # 4
    cont_doc_por_palavras = criar_documentos_por_palavras(matriz_freq)
    # 5
    matriz_idf = criar_matriz_idf(matriz_freq, cont_doc_por_palavras, total_docs)
    # 6
    matriz_tfidf = criar_matriz_tfidf(matriz_tf, matriz_idf)
    # 7
    pontuacao_periodos = pontuar_periodos(matriz_tfidf)
    # 8
    limiar = encontrar_pontuacao_media(pontuacao_periodos)
    # 9
    resumo = gerar_resumo(periodos, pontuacao_periodos, 1.1 * limiar)

    return resumo
