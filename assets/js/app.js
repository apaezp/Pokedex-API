const pokemonContainer = document.querySelector('.pokemon-container');

const colors = {
	fire: '#E6564E',
	grass: '#7BA671',
	electric: '#FCF7DE',
	water: '#6AA4DE',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#8B84C9',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#D3DCDE',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};

const mainTypes = Object.keys(colors);

const fetchData = async (id) => {
    try {
      let fetchData = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      let data = await fetchData.json();
      createPokemons(data);
      
     } catch (error) {
      console.log(error);
     }     
};

document.addEventListener("DOMContentLoaded", () => {
    async function fetchPokemones(number) {
        for (let i = 1; i <= number; i++) 
       await fetchData(i);
    }
    fetchPokemones(20);
});
  


const createPokemons = (pokemon) => { 
    const card = document.createElement('div');
    card.classList.add('pokemon-card');

    const cardImage = document.createElement('div');
    cardImage.classList.add('img-container');

    const pokemonPhoto = document.createElement('img');
    pokemonPhoto.src = pokemon.sprites.other.dream_world.front_default;

    const pokeTypes = pokemon.types.map(type => type.type.name);
    const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1);

    const color = colors[type];	
    card.style.backgroundColor = color;

    const cardInfoNumber = document.createElement('p');
    cardInfoNumber.classList.add('number');
    cardInfoNumber.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

    const cardName = document.createElement('p');
    cardName.classList.add('name');
    cardName.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);


    cardImage.appendChild(pokemonPhoto);
    card.appendChild(cardImage);
    card.appendChild(cardInfoNumber);
    card.appendChild(cardName);
    pokemonContainer.appendChild(card);
}

