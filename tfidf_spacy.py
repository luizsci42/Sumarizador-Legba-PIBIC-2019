"""
Sumarização extrativa utilizando tf-idf, de acordo com o tutorial disponível em:
https://medium.com/better-programming/extractive-text-summarization-using-spacy-in-python-88ab96d1fd97
"""
import spacy
from collections import Counter

nlp = spacy.load('pt_core_news_sm')


def top_sentence(text, limit):
    keyword = []
    pos_tag = ['PROPN', 'ADJ', 'NOUN', 'VERB']
    # Deixa o texto em letras minúsculas e faz a tokenização
    doc = nlp(text.lower())

    # itera em cada um tokens
    for token in doc:
        # ignoramos o token se ele for alguma stopword ou símbolo de pontuação
        if token.text in nlp.Defaults.stop_words:
            continue
        if token.pos_ in pos_tag:
            # Caso o token faça parte de alguma das classes gramaticais, o adicionamos à lista
            keyword.append(token.text)

    # Counter() converte a lista em um dicionário com suas respectivas frequências
    freq_word = Counter(keyword)
    # Pega a frequência das da palavra mais comum
    max_freq = Counter(keyword).most_common(1)[0][1]
    for w in freq_word:
        # itera pelos itens do dicionário e analisa a frequência
        freq_word[w] = (freq_word[w] / max_freq)

    # print(freq_word)

    sent_strength = {}
    # itera por cada frase no texto, separadas pelo modelo do SpaCy
    for sent in doc.sents:
        # itera por cada palavra da frase, de acordo com a tokenização do SpaCy
        for word in sent:
            # Determina se a plavra é uma palavra cave, de acordo com as palavras chave que extraímos anteriormente
            if word.text in freq_word.keys():
                if sent in sent_strength.keys():
                    # adiciona a palavra normatizada ao par chave-valor da frase
                    sent_strength[sent] += freq_word[word.text]
                else:
                    # cria um novo valor chave-valor
                    sent_strength[sent] = freq_word[word.text]

    summary = []
    # Ordena o dicionário em ordem decrescente, com base no valor normalizado
    sorted_x = sorted(sent_strength.items(), key=lambda kv: kv[1], reverse=True)

    counter = 0
    for i in range(len(sorted_x)):
        # Adicionamos a palavra à lista e deixamos a primeira letra maiúscula
        summary.append(str(sorted_x[1][0]).capitalize())
        counter += 1
        if counter >= limit:
            # Quebramos o laço para que o número de iterações seja o que passamos como limite
            break

    return ' '.join(summary)
