import React, { Component } from 'react';
import Apresentacao from './Apresentacao.js';
import './styles.css';


class TituloForm extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  tratarErros(response) {
    if(response.status === 500) {
      document.getElementById('caixaBusca').style.backgroundColor = 'red';
      const mensagem = document.getElementById('mensagem');

      mensagem.textContent = 'Tópico não encontrado. A página deve existir na Wikipédia!';
    }
  }

  direcionar(titulo) {
    fetch('/' + titulo)
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      else {
        this.tratarErros(res);
      }
    })
    .then(conteudo => {
      this.setState({ data: conteudo });
    })
    .catch(err => {
      console.log(err);
    })
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
      <div className="form">
        <form onSubmit={this.handleSubmit}>
          <label>Gerador de slides</label>
          <input 
            type="text" 
            placeholder="Título do artigo da Wikipédia"
            id="caixaBusca"
            value={this.state.value} onChange={this.handleChange} 
          />
          <label id="mensagem"></label>
        <input type="submit" value="Gerar Slides" />
      </form>
      </div>
    )
    return (
      // Se this.state.data tiver dados, os passe para o componente App. Caso contrário, retorne formulario
      this.state.data ? <App dados={this.state.data} /> : formulario
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: props };
  }

  render() {
    const paginaSlides = (
      // Passamos para o component Apresentacao os dados obtidos do banco de dados
      <div className="reveal">
        <Apresentacao value={this.state.data.dados} />
      </div>
    )
    return (
      this.state.data.dados === undefined ? <TituloForm /> : paginaSlides
    )
  }
}

export default App;