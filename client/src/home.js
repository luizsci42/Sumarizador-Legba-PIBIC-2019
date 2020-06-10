import React, { Component } from 'react';

class Busca extends Component {
    render() {
        return (
            // Podemos definir um parâmetro action para a tag form, que irá especificar o script a ser
            // executado quando o formulário for submetido. Ao deixar em branco, a ação irá para a mesma página.
            <form>
                <input type="text" placeholder="Título do artigo da Wikipédia" />
                <input type="submit" value="Gerar"/>
            </form>
        )
    }
}

export default Busca;