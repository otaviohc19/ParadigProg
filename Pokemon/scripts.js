let btn = document.getElementById("btn");
btn.addEventListener("click", () => carregaPokemon());

function verificaPokemon() {
    let pokemon = document.getElementById("nome").value;

    let url = `https://pokemon.danielpimentel.com.br/v1/pokemon/nome/${pokemon}`;

    return new Promise((resolve, reject) => {
        fetch(url)
        .then((resposta) => resposta.json() )
        .then((pokemon) => resolve(pokemon.pokemon))
        .catch((erro) => reject(erro));
    });
}

function carregaPokemon() {
    let ger = document.getElementById("geracao").value;

    verificaPokemon().then((pokemon) =>{
        if (ger == pokemon.geracao) {

            let div = document.getElementById("pokedex");
            div.innerHTML = "";

            let html = `
            <div id="pokedex" class="pokedex">
                <img src="${pokemon.img}" height="500px" width="500px" />
                <br>
                Número: ${pokemon.numero}
                <br>
                Nome: ${pokemon.nome}
                <br>
                Tipo: ${pokemon.tipo}
            </div>  
            `;  
            div.insertAdjacentHTML("beforeend", html);

        } else{
            alert("O pokemon não é dessa geração");
        }
    }).catch((erro) => {
        console.error(erro);
        let div = document.getElementById("pokedex");
        div.innerHTML = `<p>Erro ao carregar Pokémon. Por favor, verifique o nome e tente novamente.</p>`;
    });
}
