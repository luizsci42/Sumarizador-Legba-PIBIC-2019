import React, {Component} from 'react';
import './App.css';

class App extends Component {

  state = { data: [] };

    // Esta função é do ciclo de vida do ReactJS. Executada quando os componentes são montados
    async componentDidMount() {
        this.direcionar('/teste');
    }

  renderTableData() {
        return this.state.data.map((dado, index) => {
            console.log(dado)
          const [titulo, autor]  = dado;
          console.log(dado)
          return (
              <tr>
                  <td>{titulo}</td>
                  <td>{autor}</td>
              </tr>
          )
      })
  }

  async direcionar(caminho) {
      await fetch(caminho)
          .then(res => {
              console.log(res)
              return res.json();
          })
          .then(obras => {
              this.setState({data: obras.dados});
          });
  }

  render() {
    return (
        <div>
          <h2>Trabalho de Banco de Dados</h2>
          <div className="row">
            <div className="botoes">
              <h2>Consultas pré definidas</h2>
                <button onClick={texto => this.direcionar(texto='/teste')}>Teste de Consulta</button>
                <button onClick={texto => this.direcionar(texto='/consum')}>Todas as obras em ordem alfabética por título</button>
                <button onClick={texto => this.direcionar(texto='/consdois')}>Mostra a quantidade de obras no acervo</button>
                <button onClick={texto => this.direcionar(texto='/constres')}>Mostra a quantidade de clientes da biblioteca</button>
                <button onClick={texto => this.direcionar(texto='/consQuatro')}>Mostra os empréstimos ativos dos clientes</button>
                <button onClick={texto => this.direcionar(texto='/consCinco')}>Todos os títulos e id's de autores</button>
                <button onClick={texto => this.direcionar(texto='/consSeis')}>Clientes com bloqueio e id do empréstimo</button>
                <button onClick={texto => this.direcionar(texto='/consSete')}>Nomes dos funcionários</button>
                <button onClick={texto => this.direcionar(texto='/consOito')}>Livros que começam com P</button>
                <button onClick={texto => this.direcionar(texto='/consNove')}>Id's dos bibliotecários</button>
                <button onClick={texto => this.direcionar(texto='/consDez')}>Nomes dos clientes</button>
                <button onClick={texto => this.direcionar(texto='/consOnze')}>ID's dos funcionários</button>
                <button onClick={texto => this.direcionar(texto='/consDoze')}>Idade do cliente Geovanne</button>
                <button onClick={texto => this.direcionar(texto='/consTreze')}>Quantidade total de livros de fantasia e ficção científica</button>
                <button onClick={texto => this.direcionar(texto='/consCatorze')}>Titulos de obras</button>
                <button onClick={texto => this.direcionar(texto='/consQuinze')}>Periódicos de ficção científica</button>
            </div>
            <div className="resultado">
                {React.createElement("h2", null, "Acervo")}
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
