var dados = [];
var cabecalho = new Headers();

var inicializador = {
    method: 'GET',
    headers: cabecalho,
    mode: 'cors',
    cache: 'default'
};

var requisicao = new Request('/consultar', inicializador);
var element = document.getElementById('slide1');

await fetch(requisicao)
    .then(res => {
        console.log('Consultar/i: ', res);
        if (res.ok) {
            res.json()
                .then(res => {
                    console.log('Consultar/i: Resposta recebida!');
                    texto = res.dados;
                    element.innerText = texto;
                })
        } else {
            console.log("Ocorreu um erro de comunicação com o servidor");
        }
    })
    .catch(err => {
        console.log("Erro: ", err.message)
    })