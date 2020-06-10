import json
from tfidf_nltk import tf_idf
from textextract import gerar_dicionario
from textextract import escrever_json


def escrever_arquivo(texto):
    saida = dict(resumo=texto)
    return json.dumps(saida, ensure_ascii=False)        


def main(titulo_do_artigo):
    # Dicionário com os respectívos tópicos e seus conteúdos extraídos da Wikipédia
    original = gerar_dicionario(titulo_do_artigo)
    topicos_e_resumos = []

    for i in range(0, len(original)):
        # Mandamos texto por texto para ser resumido
        resumo = tf_idf(original[i][1])
        # Criamos uma lista de tuplas com os tópicos e seus respectivos conteúdos
        topicos_e_resumos.append((original[i][0], resumo))

    return escrever_json(topicos_e_resumos)
