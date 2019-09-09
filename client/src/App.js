import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = { obras: [] };

  componentDidMount() {
    this.callApi()
        .then( res => this.setState({response: res.express}))
        .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/teste')
        .then(res => {
          console.log(res);
          return res.json();
        })
        .then(obras => {
          this.setState({obras});
          console.log(obras)
        })
    const body = await response.json();
    return body;
  };

  render() {
    return (
        <div>
          <h2>Trabalho de Banco de Dados</h2>
          <div className="row">
            <div className="botoes">
              <h2>Consultas pré definidas</h2>
              <button>Teste de Consulta</button>
              <button>Todas as obras em ordem alfabética por título</button>
              <button>Mostra a quantidade de obras no acervo</button>
              <button>Mostra a quantidade de clientes da biblioteca</button>
              <button>Mostra os empréstimos atuais de determinado cliente</button>
              <button>Mostra todos os títulos de determinado autor</button>
              <button>Mostra qual emprestimo gerou o bloqueio do cliente</button>
              <button>Todos os clientes e funcionários</button>
            </div>
            <div className="resultado">
              <h2>Acervo</h2>
              {this.state.obras.map(obra =>
                  <div titulo={obra.titulo}>Titulo: {obra.titulo} Autor: {obra.autor}</div>
              )}
            </div>
          </div>
        </div>
    );
  }
}

export default App;
