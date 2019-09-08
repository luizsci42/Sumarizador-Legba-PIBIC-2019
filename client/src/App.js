import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {response: ''};

  componentDidMount() {
    this.callApi()
        .then( res => this.setState({response: res.express}))
        .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/teste');
    const body = await response.json();

    return body;
  };

  render() {
    return (
        <div>
          <h2>{$state.response}</h2>
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
            </div>
          </div>
        </div>
    );
  }
}

export default App;
