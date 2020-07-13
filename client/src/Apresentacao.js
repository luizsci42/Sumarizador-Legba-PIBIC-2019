import React, { Component } from 'react';
import Reveal from 'reveal.js';
import './reveal.css';
import './black.css';
import './apresentacao.css';

function Slides(props) {
  const topico = <section className="topico">{props.conteudo}</section>
  var sentencas = props.conteudo.split('.');
  // TODO: Quero definir um limite de caracteres por slide, sem cortar uma sentença no meio
  // Para isso, acho que posso fazer uma cahamda recursiva à função Slides()

  const texto = 
  <section className="texto">
    <ul>
      {sentencas.map(sentenca => {
        if(sentenca !== "") {
          return <li key={sentenca.toString()}>{sentenca}</li>
        }
      })}
    </ul>
  </section>

  return props.topico ? topico : texto;
}
  
  class Apresentacao extends Component {
    // TODO: Dar mais destaque aos slides de título e mais destaque ainda ao primeiro slide

    // Outro método do ciclo de vida, executado após o componentWillMount()
    componentDidMount() {
      // Inicializamos a biblioteca de terceiros, RevealJS.
      Reveal.initialize({
        controls: true,
        progress: true,
        transition: "slide",
        overview: true,
        slideNumber: true,
        keyboard: true,
        display: 'block',
        disableLayout: true
      });
    }

    // Método responsável por criar uma tag <section> com o texto a ser exibido
    renderizarSlide(content) {
      return content.map((conteudo) => {
        const [topico, texto] = conteudo;

        const slideTopico = <Slides topico={true} conteudo={topico} />

        const unicoSlide = 
        <section key={topico}>
            {slideTopico}
            {<Slides conteudo={texto} />}
        </section>

        const doisSlides = 
        <section>
          {slideTopico}
          {<Slides conteudo={texto.slice(0, 453)} />}
          {<Slides conteudo={texto.slice(453, -1)} />}
        </section>
        
        return texto.length > 452 ? doisSlides : unicoSlide;
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