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
          const [titulo, autor]  = dado;
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
              return res.json();
          })
          .then(obras => {
              this.setState({data: obras.dados});
          });
  }

  render() {
    return (
      <div className="reveal">
      <div className="slides">
        <section>{this.state.data}</section>
        <section>Slide 2</section>
      </div>
    </div>
    );
  }
}

export default App;
