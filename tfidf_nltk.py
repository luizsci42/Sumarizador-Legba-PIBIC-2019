"""
Implementação da sumarização extrativa por tf-idf utilizando NLTK, de acordo com
o tutorial disponível em: https://towardsdatascience.com/text-summarization-using-tf-idf-e64a0644ace3
"""
import math
from nltk import sent_tokenize, word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer


def tokenizar(texto):
    """
    Função para tokenizar as sentenças do texto passado como argumento.

    :param texto: texto original
    :return: o texto tokenizado
    """
    periodos = sent_tokenize(texto)
    total_de_documentos = len(periodos)

    return total_de_documentos


def matriz_frequencia(periodos):
    """
    Cria uma matriz de frequência das palavras em cada sentença. Cada sentença é a chave e o valor é um 
    dicionário com a frequência de palavras.
    
    :param periodos: A sentença que será analisada
    :return: Uma matriz de frequência das palavras por sentença
    """
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
    """
    Calcula a frequência de termo de cada palavra e gera uma matriz.
    Aqui cada parágrafo é considerado como um documento e o termo como uma palavra no parágrafo
    
    :param matriz_frequencia: Matriz de frequência dos termos (palavras) por documento (parágrafo)
    :return: Matriz TF (Term Frequency)
    """
    matriz_tf = {}

    for periodo, tabela_frequencia in matriz_frequencia.items():
        tabela_tf = {}

        quantidade_palavras_periodo = len(tabela_frequencia)
        for palavra, cont in tabela_frequencia.items():
            tabela_tf[palavra] = cont / quantidade_palavras_periodo

        matriz_tf[periodo] = tabela_tf

    return matriz_tf


def criar_documentos_por_palavras(matriz_freq):
    """
    Cria uma matriz que contém quantas sentenças possuem determinada palavra.
    
    :param matriz_freq: Matriz de frequência das palavras por parágrafo
    :return: Matriz de quantas sentenças possuem determinada palavra.
    """
    tabela_palavra_por_doc = {}

    for periodo, tabela_frequencia in matriz_freq.items():
        for palavra, cont in tabela_frequencia.items():
            if palavra in tabela_palavra_por_doc:
                tabela_palavra_por_doc[palavra] += 1
            else:
                tabela_palavra_por_doc[palavra] = 1

    return tabela_palavra_por_doc


def criar_matriz_idf(matriz_frequencia, n_docs_por_palavras, total_docs):
    """
    Calcula a matriz idf, considerando o parágrafo como o documento
    e cada palavra no parágrafo como termo.
    
    :param matriz_frequencia: Matriz de frequência das palavras por parágrafo
    :param n_docs_por_palavras: Quantas sentenças possuem cada palavra
    :param total_docs: Quantidade de documentos (parágrafos)
    :return: Matriz IDF (Inverse Document Frequency)
    """
    matriz_idf = {}

    for periodo, tabela_frequencia in matriz_frequencia.items():
        tabela_idf = {}
        for palavra in tabela_frequencia.keys():
            tabela_idf[palavra] = math.log10(total_docs / float(n_docs_por_palavras[palavra]))
        matriz_idf[periodo] = tabela_idf

    return matriz_idf


def criar_matriz_tfidf(matriz_tf, matriz_idf):
    """
    Multiplica os termos da matriz tf e da idf e cria uma nova matriz com o resultado
    
    :param matriz_tf: Matriz TF (Term Frequency)
    :param matriz_idf: Matriz IDF (Inverse Document Frequency)
    :return: Matriz TF-IDF
    """
    matriz_tfidf = {}

    for (periodo1, tabela_freq1), (periodo2, tabela_freq2) in zip(matriz_tf.items(), matriz_idf.items()):
        tabela_tfidf = {}
        for (palavra1, valor1), (palavra2, valor2) in zip(tabela_freq1.items(),
                                                          tabela_freq2.items()):
            tabela_tfidf[palavra1] = float(valor1 * valor2)
        matriz_tfidf[periodo1] = tabela_tfidf

    return matriz_tfidf


def pontuar_periodos(matriz_tfidf) -> dict:
    """
    Dá um peso para cada parágrafo de acordo com sua pontuação na matriz TF-IDF
    
    :param matriz_tfidf: Matriz TF-IDF
    :return: Matriz com pesos para cada sentença
    """
    valorPeriodo = {}

    for periodo, tabela_freq in matriz_tfidf.items():
        pontuacao_total_por_periodo = 0
        cont_palavras_no_periodo = len(tabela_freq)
        for palavra, pontuacao in tabela_freq.items():
            pontuacao_total_por_periodo += pontuacao

        valorPeriodo[periodo] = pontuacao_total_por_periodo / cont_palavras_no_periodo

    return valorPeriodo


def encontrar_pontuacao_media(valor_periodo):
    """
    Calcula a pontuação média das pontuções dadas para cada sentença
    
    :param valor_periodo: Pontuações dadas às sentenças
    :return: Pontuação média entre as sentenças
    """
    valores_soma = 0

    for entrada in valor_periodo:
        valores_soma += valor_periodo[entrada]

    media = (valores_soma / len(valor_periodo))

    return media


def gerar_resumo(periodos, valor_periodo, pont_media):
    """
    Gera um resumo com base na pontuação média das sentenças. Serão colocadas no resumo apenas as sentenças que 
    possuírem um valor superior ao produto da limiar escolhida pela pontuação média as sentenças.
    
    :param periodos: texto original tokenizado
    :param valor_periodo: Pontuação de uma sentença específica
    :param pont_media: Pontuação média entre todas as sentenças 
    :return: Texto resumido
    """
    contador_periodo = 0
    resumo = ''

    for periodo in periodos:
        if periodo[:15] in valor_periodo and valor_periodo[periodo[:15]] >= pont_media:
            resumo += " " + periodo
            contador_periodo += 1

    return resumo


def tf_idf(texto):
    """
    Faz o resumo de um texto utilizando o algoritmo TF-IDF

    :param texto: O texto original a ser resumido
    :return: O texto resumido
    """
    print("Texto original: " + texto)
    # Tokenizamos as sentenças, ao invés das palavras
    periodos = sent_tokenize(texto)
    print("Períodos: " + str(periodos))

    total_docs = len(periodos)
    print("Número de documentos: " + str(total_docs))

    # Criamos uma matriz de frequência das palavras em cada sentença
    # Cada sentença é a chave e o valor é um dicionário com a frequência de palavras
    matriz_freq = matriz_frequencia(periodos)
    print("Matriz de frequência: " + str(matriz_freq))

    # Calculamos a frequência de termo de cada palavra e geramos uma matriz
    # Consideramos cada parágrafo como um documento e o termo como uma palavra no parágrafo
    matriz_tf = criar_matriz_tf(matriz_freq)
    print("Matriz TF: " + str(matriz_tf))

    # Uma matriz que contém quantas sentenças possuem determinada palavra
    cont_doc_por_palavras = criar_documentos_por_palavras(matriz_freq)
    print("Contagem de documentos por palavras: " + str(cont_doc_por_palavras))

    # Aqui finalmente calculamos a matriz idf, lembrando que consideramos o parágrafo como o documento
    # e cada palavra no parágrafo como termo
    matriz_idf = criar_matriz_idf(matriz_freq, cont_doc_por_palavras, total_docs)
    print("Matriz IDF: " + str(matriz_idf))

    # Agora multiplicamos os termos da matriz tf e da idf e criamos uma nova matriz com o resultado
    matriz_tfidf = criar_matriz_tfidf(matriz_tf, matriz_idf)
    print("Matriz TF-IDF: " + str(matriz_tfidf))

    # Damos um peso para cada parágrafo de acordo com sua pontuação na matriz TF-IDF
    pontuacao_periodos = pontuar_periodos(matriz_tfidf)
    print("Pontuação dos períodos: " + str(pontuacao_periodos))

    # Cada algoritmo de sumarização utiliza uma forma diferente para calcular a limiar
    # Aqui, calculamos a pontuação média das pontuções dadas para cada sentença
    pontuacao_media = encontrar_pontuacao_media(pontuacao_periodos)
    print("Pontuação média: " + str(pontuacao_media) + "\n\n")

    # Por fim, são colocadas no resumo apenas as frases que pssuem uma pontuação maior que
    # o valor rescolhido como limiar. Aqui, vamos escolher uma limiar de 1.1
    limiar = 1.1
    resumo = gerar_resumo(periodos, pontuacao_periodos, limiar * pontuacao_media)

    return resumo
