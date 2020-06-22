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

  direcionar(titulo) {
    fetch('/' + titulo)
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      else {
        console.log(res)
        throw new Error(res.statusText);
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
      <div>
        <form onSubmit={this.handleSubmit}>
        <label>
          <img src="../public/freedom.jpg" alt="Gerador de slides" />
          <input 
            type="text" 
            placeholder="Título do artigo da Wikipédia" 
            value={this.state.value} onChange={this.handleChange} 
          />
        </label>
        <input type="submit" value="Gerar Slides" />
      </form>
      </div>
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