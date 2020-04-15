import React, { Component } from 'react';
import Reveal from 'reveal.js'
import './reveal.css';
import './black.css';

class Slides extends Component {
  slides() {
    React.useEffect(() => {
      Reveal.initialize({
        controls: true,
        progress: true,
        transition: "slide"
      });
    }, []);
  }
  render() {
    return (
      <div className="reveal">
      <div className="slides">
        <section>Single Horizontal Slide</section>
        <section>
          <section>Vertical Slide 1</section>
          <section>Vertical Slide 2</section>
        </section>
      </div>
    </div>
    );
  }
}

class App extends Component {
  state = { data: [] };

  // Esta função é do ciclo de vida do ReactJS. Executada quando os componentes são montados
  componentDidMount() {
    this.direcionar('/home');
    // Acho que irei precisar inicializar alguma referência ao elemento raíz e passá-lo 
    // para o RevelJS. Conferir: https://pt-br.reactjs.org/docs/integrating-with-other-libraries.html
  }

  direcionar(caminho) {
    fetch(caminho)
      .then(res => {
        return res.json();
      })
      .then(conteudo => {
        this.setState({ data: conteudo.dados });
        console.log(this.state.data)
      });
  }

  render() {
      return (
        <div>
          <Slides />
        </div>
      );
  }
}

export default App;