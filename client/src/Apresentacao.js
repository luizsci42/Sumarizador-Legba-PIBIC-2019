import React, { Component } from 'react';
import Reveal from 'reveal.js';
import './reveal.css';
import './black.css';

function Slides(props) {
    return (
      <section>{props.conteudo}</section>
    );
  }
  
  class Apresentacao extends Component {
    // Outro método do ciclo de vida, executado após o componentWillMount()
    componentDidMount() {
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
    // Método responsável por criar uma tag <section> com o texto a ser exibido
    renderizarSlide(content) {
      return content.map((conteudo) => {
        const [topico, texto] = conteudo;
        const unicoSlide = 
        <section>
            <Slides conteudo={topico} />
            <Slides conteudo={texto} />
        </section>
        const doisSlides = 
        <section>
            <Slides conteudo={topico} />
            <Slides conteudo={texto.slice(0, 453)} />
            <Slides conteudo={texto.slice(453, -1)} />
        </section>
        
        return (
          texto.length > 452 ? doisSlides : unicoSlide
        )
      })
    }
  
    // Dentro da div slides, podemos colocar um for para criar cada tag section
    // utilizando a função renderizarSlide
    render() {
      return (
        <div className="slides">
          {this.renderizarSlide(this.props.value)}
        </div>
      )
    }
  }

  export default Apresentacao;