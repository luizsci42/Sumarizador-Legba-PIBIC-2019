import React, {Component} from 'react';
import './App.css';

class App extends Component {

  state = { data: [] };

    // Esta função é do ciclo de vida do ReactJS. Executada quando os componentes são montados
    async componentDidMount() {
        this.direcionar('/teste');
    }

  renderTableData() {
        return this.state.data.map((dado, index) => {
          const [titulo, autor]  = dado;
          return (
              <tr>
                  <td>{titulo}</td>
                  <td>{autor}</td>
              </tr>
          )
      })
  }

  async direcionar(caminho, query) {
      console.log(query)
      await fetch(caminho)
          .then(res => {
              return res.json();
          })
          .then(obras => {
              this.setState({data: obras.dados});
          });
  }

  render() {
    return (
        <div>
          <h2>Trabalho de Banco de Dados</h2>
          <div className="row">
            <div className="botoes">
              <h2>Consultas pré definidas</h2>
                <button onClick={texto => this.direcionar(texto='/teste', 'SELECT obras.titulo, livros.autor FROM biblioteca.obras natural join biblioteca.livros')}>Teste de Consulta</button>
                <button onClick={texto => this.direcionar(texto='/consum', 'SELECT DISTINCT obras.titulo FROM biblioteca.obras ORDER BY obras.titulo ASC')}>Todas as obras em ordem alfabética por título</button>
                <button onClick={texto => this.direcionar(texto='/consdois', 'SELECT COUNT(obras.titulo) FROM biblioteca.obras NATURAL JOIN biblioteca.livros')}>Mostra a quantidade de obras no acervo</button>
                <button onClick={texto => this.direcionar(texto='/constres', 'SELECT COUNT(cliente.nome) FROM biblioteca.cliente')}>Mostra a quantidade de clientes da biblioteca</button>
                <button onClick={texto => this.direcionar(texto='/consQuatro', 'SELECT cliente.nome, emprestimo.status FROM biblioteca.cliente JOIN biblioteca.emprestimo ON cliente.emprestimo_id = emprestimo.id WHERE emprestimo.status IS TRUE')}>Mostra os empréstimos ativos dos clientes</button>
                <button onClick={texto => this.direcionar(texto='/consCinco', 'SELECT autor.id_autor, livros.titulo FROM biblioteca.autor JOIN biblioteca.livros ON autor.livro_id_isbn = livros.id_isbn')}>Todos os títulos e id's de autores</button>
                <button onClick={texto => this.direcionar(texto='/consSeis', 'SELECT bloqueio.id, cliente.nome FROM biblioteca.cliente JOIN biblioteca.emprestimo ON cliente.emprestimo_id = emprestimo.id JOIN biblioteca.bloqueio ON bloqueio.id = cliente.bloqueio_id WHERE bloqueio.id IS NOT NULL')}>Clientes com bloqueio e id do empréstimo</button>
                <button onClick={texto => this.direcionar(texto='/consSete', 'SELECT nom FROM biblioteca.bibliotecario NATURAL JOIN biblioteca.atendente NATURAL JOIN biblioteca.cliente')}>Nomes dos funcionários</button>
                <button onClick={texto => this.direcionar(texto='/consOito', 'SELECT obras.titulo FROM biblioteca.obras WHERE obras.titulo LIKE "P%"')}>Livros que começam com P</button>
                <button onClick={texto => this.direcionar(texto='/consNove', 'SELECT bibliotecario.i FROM biblioteca.bibliotecario GROUP BY bibliotecario.id HAVING COUNT(bibliotecario.id) > 0')}>Id's dos bibliotecários</button>
                <button onClick={texto => this.direcionar(texto='/consDez', 'SELECT cliente.nome FROM biblioteca.cliente WHERE EXISTS(SELECT atendente.id FROM biblioteca.atendente WHERE cliente.id = atendente.cliente_id)')}>Nomes dos clientes</button>
                <button onClick={texto => this.direcionar(texto='/consOnze', 'SELECT atendente.id, bibliotecario.id FROM biblioteca.atendente JOIN biblioteca.bibliotecario USING(id) WHERE EXISTS (SELECT cliente.nascimento FROM biblioteca.cliente WHERE cliente.nascimento BETWEEN \"1978-09-06\" AND \"1999-09-06\")')}>ID's dos funcionários</button>
                <button onClick={texto => this.direcionar(texto='/consDoze', 'SELECT AGE(now(),(SELECT cliente.nascimento FROM biblioteca.cliente WHERE nome = "Geovanne"))')}>Idade do cliente Geovanne</button>
                <button onClick={texto => this.direcionar(texto='/consTreze', 'SELECT  (COUNT(obras.genero="Ficção Científica")+COUNT(obras.genero="Fantasia")) as total FROM biblioteca.obras JOIN biblioteca.livros ON obras.id = livros.obras_id')}>Quantidade total de livros de fantasia e ficção científica</button>
                <button onClick={texto => this.direcionar(texto='/consCatorze', 'SELECT  obras.titulo FROM biblioteca.obras WHERE obras.id IN (SELECT livros.obras_id FROM biblioteca.livros)')}>Titulos de obras</button>
                <button onClick={texto => this.direcionar(texto='/consQuinze', 'SELECT  obras.titulo FROM biblioteca.obras WHERE obras.id IN(SELECT periodico.obras_id FROM biblioteca.periodico JOIN biblioteca.obras ON obras.genero = "Ficção Científica" WHERE periodico.obras_id = obras.id)')}>Periódicos de ficção científica</button>
            </div>
            <div className="resultado">
                <h2 id='titulo'>Acervo</h2>
                <table>
                    <tbody>
                    {this.renderTableData()}
                    </tbody>
                </table>
            </div>
          </div>
        </div>
    );
  }
}

export default App;
