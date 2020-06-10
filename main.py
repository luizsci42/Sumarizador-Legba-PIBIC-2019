from flask import Flask
from sumarizador import main

app = Flask(__name__)


@app.route('/<titulo_do_artigo>')
def sumarizar(titulo_do_artigo):
    arquivo_json = main(titulo_do_artigo)
    # retorna um JSON com os títulos dos tópicos e seus respectivos conteúdos sumarizados
    return arquivo_json
