import React, { Component } from 'react';
import Apresentacao from './Apresentacao.js';
import './reveal.css';
import './black.css';

class TituloForm extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  direcionar(titulo) {
    fetch('/' + titulo)
      .then(res => {
        return res.json();
      })
      .then(conteudo => {
        this.setState({ data: conteudo });
        console.log('Conteúdo obtido do servidor: ', this.state.data.texto);
      });
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.direcionar(this.state.value);
    event.preventDefault();
  }

  render() {
    const formulario = (
      <form onSubmit={this.handleSubmit}>
        <label>
          Título:
          <input type="text" placeholder="Título do artigo da Wikipédia" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Gerar Slides" />
      </form>
    )
    return (
      // Se this.state.data tiver dados, os passe para o componente App. Caso contrário, retorne formulario
      this.state.data ? <App dados={this.state.data.texto} /> : formulario
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    console.log('props do app: ', props)
    this.state = { data: props };
  }

  render() {
    const paginaSlides = (
      // Passamos para o component Apresentacao os dados obtidos do banco de dados
      <div className="reveal">
        <Apresentacao value={this.state.data.dados} />
      </div>
    )
    console.log("State do app: ", this.state.data)
    return (
      this.state.data.dados === undefined ? <TituloForm /> : paginaSlides
    )
  }
}

export default App;