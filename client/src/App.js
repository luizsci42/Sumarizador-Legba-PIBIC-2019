import React, { Component } from 'react';
import Reveal from 'reveal.js'
import './reveal.css';
import './black.css';

function Slides(props) {
    return (
      <section>{props.conteudo}</section>
    );
}

class Apresentacao extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }

  // Método responsável por criar uma tag <section> com o texto a ser exibido
  renderizarSlide(texto) {
    console.log("Apresentacao/i: ", this.props.value)
    return <Slides 
    value = {"Olá " + texto}
    conteudo = {this.props.value} />
  }

  // Dentro da div slides, podemos colocar um for para criar cada tag section
  // utilizando a função renderizarSlide
  // TODO: Substituir o argumento para this.state.value
  render() {
    return (
      <div className="slides">
      {this.renderizarSlide('mundo!')}
      <section>Single Horizontal Slide</section>
      <section>
        <section>Vertical Slide 1</section>
        <section>Vertical Slide 2</section>
      </section>
    </div>
    )}
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  // Este método faz parte do ciclo de vida do componenete. É o primeiro a ser chamado após o construtor
  componentWillMount() {
    fetch('/home')
      .then(res => {
        return res.json();
      })
      .then(conteudo => {
        this.setState({ data: conteudo.dados });
      });
   }

   // Outro método do ciclo de vida, executado após o componentWillMount()
   componentDidMount() {
     // Inicializamos a biblioteca de terceiros, RevealJS.
      Reveal.initialize({
        controls: true,
        progress: true,
        transition: "slide"
      });
    }

  render() {
    return (
      // Passamos para o component Apresentacao os dados obtidos do banco de dados
      <div className="reveal">
        <Apresentacao value = {this.state.data} />
      </div>
    )}
}

export default App;