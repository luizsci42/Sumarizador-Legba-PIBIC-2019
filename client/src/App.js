import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = { data: [] };

  // Esta função é do ciclo de vida do ReactJS. Executada quando os componentes são montados
  componentDidMount() {
    this.direcionar('/home');
    // Acho que irei precisar inicializar alguma referência ao elemento raíz e passá-lo 
    // para o RevelJS. Conferir: https://pt-br.reactjs.org/docs/integrating-with-other-libraries.html
  }

  // Aqui será removida a referência que definimos no método componentDidMount()
  componentWillUnmount() {}

  direcionar(caminho) {
    fetch(caminho)
      .then(res => {
        return res.json();
      })
      .then(conteudo => {
        this.setState({ data: conteudo.dados });
      });
  }

  render() {
    return (
      <div class="reveal">
        <div class="slides">
          <section>{this.state.data}</section>
          <section>Slide 2</section>
        </div>
      </div>
    );
  }
}

export default App;
