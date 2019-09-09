import React, {Component} from 'react';
import './App.css';

class App extends Component {

  state = { data: [] };

    // Esta função é do ciclo de vida do ReactJS. Executada quando os componentes são montados
    async componentDidMount() {
        await fetch('/teste')
            .then(res => {
                // console.log('resposta', res)
                return res.json();
            })
            .then(obras => {
                // console.log('O que temos?', obras.dados)
                // this.state.data = obras.dados;
                // this.renderTableData();
                this.setState({data: obras.dados});
            });
    }

  renderTableData() {
        console.log('Tabela', this.state.data);
        return this.state.data.map((obra, index) => {
            console.log(obra)
          const [titulo, autor]  = obra;
          return (
              <tr>
                  <td>{titulo}</td>
                  <td>{autor}</td>
              </tr>
          )
      })
  }

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
                {React.createElement("h2", null, "Dados")}
                <table>
                    <tbody>
                    {this.renderTableData()}
                    </tbody>
                </table>
            </div>
          </div>
        </div>
    );
  }
}

export default App;
