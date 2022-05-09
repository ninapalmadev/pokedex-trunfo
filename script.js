const card = document.querySelector('#card_wrap');

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
    });
};

const cardPokemon = (pokemon) => {
    const pokemonHTML = pokemon.map((infoPokemon) => 
        `<div class="card">
            <img class="card-img" src="${infoPokemon.image}" alt="Imagem do pokemon ${infoPokemon.name}">
            <h3 class="card-title">${infoPokemon.name}</h3>
            <p class="card-type">${infoPokemon.type}</p>
            <p class="id-pokemon">#${infoPokemon.id}</p>
        </div>
        `
        )
        .join('');
    card.innerHTML = pokemonHTML;
};

fetchPokemon()

card.addEventListener('click', event => {
   const clickedCard = event.target 

   if (clickedCard.className === 'card' || 
      clickedCard.className === 'card-img' ||
      clickedCard.className === 'card-title' ||
      clickedCard.className === 'card-type' ||
      clickedCard.className === 'id-pokemon'){
    console.log(`clicou no ${clickedCard.className}`)
   }
})
