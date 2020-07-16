import React, { Component } from 'react';
import Reveal from 'reveal.js';
import './reveal.css';
import './black.css';
import './apresentacao.css';

function Slides(props) {
  if(props.imagem) {
    return (
      <section className="imagem">
        <img src={props.url} alt="" />
      </section>
    )
  }
  
  if(props.final) {
    return (
      <section>
        <section>
          <label>Fim</label>
          <br />
          <button type="button"><a href="?print-pdf">Download</a></button>
        </section>
      </section>
    )
  }

  const topico = <section  className="topico">{props.conteudo}</section>
  var sentencas = props.conteudo.split('.');

 const texto = 
 <section className="texto">
   <ul>
     {sentencas.map(sentenca => {
       if(sentenca !== '') {
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
      return content.texto.map((conteudo) => {
        const [topico, texto] = conteudo;

        const slideTopico = <Slides texto={true} topico={true} conteudo={topico} />

        const unicoSlide = 
        <section className="quadro" key={topico}>
            {slideTopico}
            {<Slides texto={true} conteudo={texto} />}
        </section>

        const doisSlides = 
        <section className="quadro" key={topico}>
          {slideTopico}
          {<Slides conteudo={texto.slice(0, 453)} />}
          {<Slides conteudo={texto.slice(453, -1)} />}          
        </section>
        
        return texto.length > 452 ? doisSlides : unicoSlide;
      })
    }

    slideImagem(dados) {
     return dados.imagens.map(imagem => {
       return <Slides key={imagem} url={imagem} imagem={true} />
     })
    }

    // Dentro da div slides, podemos colocar um for para criar cada tag section
    // utilizando a função renderizarSlide
    render() {
      return (
        <section className="slides">
          {this.renderizarSlide(this.props.value)}
          {this.slideImagem(this.props.value)}
        </section>
      )
    }
  }

  export default Apresentacao;