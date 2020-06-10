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
  // Método responsável por criar uma tag <section> com o texto a ser exibido
  renderizarSlide(content) {
    if(content === undefined) {
      content = []
    }
    console.log('Dentro de renderizarSlide(): ', content)
    return content.map((conteudo) => {
      const [topico, texto] = conteudo;
      return (
        <section>
          <Slides conteudo={topico} />
          <Slides conteudo={texto} />
        </section>
      )
    })
  }

  // Dentro da div slides, podemos colocar um for para criar cada tag section
  // utilizando a função renderizarSlide
  render() {
    return (
      <div className="slides">
        {this.renderizarSlide(this.props.value.texto)}
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  // Outro método do ciclo de vida, executado após o componentWillMount()
  async componentDidMount() {
    await fetch('/Pan-africanismo')
      .then(res => {
        console.log('Resposta: ', res.json)
        return res.json();
      })
      .then(conteudo => {
        this.setState({ data: conteudo });
        console.log('Dentro do fetch: ', conteudo);
      });
    // Inicializamos a biblioteca de terceiros, RevealJS.
    Reveal.initialize({
      controls: true,
      progress: true,
      transition: "slide",
      overview: true,
      slideNumber: true,
      keyboard: true
    });
  }

  render() {
    return (
      // Passamos para o component Apresentacao os dados obtidos do banco de dados
      <div className="reveal">
        <Apresentacao value={this.state.data} />
      </div>
    )
  }
}

export default App;