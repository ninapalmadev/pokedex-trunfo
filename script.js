const card = document.querySelector('#card_wrap');
const pokeCard = document.querySelector('.pokemon-info');
const searchInput = document.querySelector('#search-name');
const container = document.querySelector('.unit')

// LISTA COM OS POKEMONS NA MAIN
const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 150; i++){
        const allPokemons = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(allPokemons).then((res) => res.json()));
    }
    Promise.all(promises).then(results => {
        const pokemon = results.map((data) => ({
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            type: data.types.map(typeInfo => typeInfo.type.name).join(' | ')
        }));
        cardPokemon(pokemon);

        //BUSCA POR NOME E TIPO
        searchInput.addEventListener('keyup', (e)=> {
            const searchString = e.target.value.toLowerCase();
            const filtredPokemons = pokemon.filter((character) => {
                return (
                    character.name.toLowerCase().includes(searchString) ||
                    character.type.toLowerCase().includes(searchString)
                    )
            });
            cardPokemon(filtredPokemons);
        });
    });
};
//INFORMAÇÕES DO POKEMON NA MAIN
const cardPokemon = (pokemon) => {
    const pokemonHTML = pokemon.map((infoPokemon) => 
        `<div onClick="fetchPokemonCard(${infoPokemon.id})" class="card ${infoPokemon.type}">
            <img class="card-img" src="${infoPokemon.image}" 
            alt="Imagem do pokemon ${infoPokemon.name}"/>
            <h3 class="card-title nome-pokemon">${infoPokemon.name}</h3>
            <p class="card-type type-box">${infoPokemon.type}</p>
            <p class="id-pokemon">#${infoPokemon.id}</p>
        </div>
        `
        ).join('');
    card.innerHTML = pokemonHTML;
};
fetchPokemon()
//CARD COM AS INFORMAÇÕES DO POKEMON SELECIONADO
const fetchPokemonCard = (pokemonNumber) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`;
    fetch(url)
        .then((response) => {
        return response.json()
        })
        .then((data) => {
            const pokemon = {
                name: data.name,
                id: data.id,
                image: data.sprites['front_default'],
                type: data.types.map(type => type.type.name).sort().join(' | '),
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                special_attack: data.stats[3].base_stat,
                special_defense: data.stats[4].base_stat,
                speed: data.stats[5].base_stat
            };
            pokeCard.innerHTML = `
            <div class="pokemon-info ${pokemon.type}"> 
                <p class="hp">
                    <span>HP</span>
                    ${pokemon.hp}
                </p>
                <img src="${pokemon.image}" alt="Imagem do pokemon ${pokemon.name}">
                <h2 class="poke-name">${pokemon.name}</h2>
                <div class="types">
                    <span>${pokemon.type}</span>
                </div>
                <ul class="stats">
                    <li class="stats-info">
                        Attack: 
                        <span>${pokemon.attack} | 200</span>
                    </li>
                    <li class="stats-info">
                        Defense: 
                        <span>${pokemon.defense} | 200</span>
                    </li>
                    <li class="stats-info">
                        Special Attack: 
                        <span>${pokemon.special_attack} | 200<span>
                    </li>
                    <li class="stats-info">
                        Special Defense: 
                        <span>${pokemon.special_defense} | 200</span>
                    </li>
                    <li class="stats-info">
                        Speed:
                        <span>${pokemon.speed} | 200</span>
                    </li>
                </ul>
            </div>
            `;
        });
};
