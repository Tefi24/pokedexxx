// const searchInput= document.querySelector(".recherche-poke input");
// let allPokemon= [];
// let tableauFin= [];
// const listePoke= document.querySelector('.liste-poke');
// const limite= 75;
// var PokeNombreDebut= 21;



// var types= {
//     bug: '#a8b820',
//     dark: '#705848',
//     dragon: '#7038f8',
//     electric: '#f8d030',
//     fairy: '#ee99ac',
//     fighting: '#c03028',
//     fire: '#f08030',
//     flying: '#a890f0',
//     ghost: '#705898',
//     grass: '#78c850',
//     ground: '#e0c068',
//     ice: '#98d8d8',
//     normal: '#a8a878',
//     poison: '#a040a0',
//     psychic: '#f85888',
//     rock: '#b8a038',
//     steel: '#b8b8d0',
//     water: '#6890f0',
//     immune: '#d6d6d6',
//     noteffective: '#fdd0d0',
//     veryeffective: '#ccfbcc',
// };



// function fetchPokemonBase(){
//     const promises =[]

// fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limite}`)
//     .then(reponse => reponse.json())
//     .then((allPoke) =>{
//         allPoke.results.forEach((pokemon)=>{
//             promises.push(fetchPokemonComplet(pokemon).catch(error => console.error(error)));
//         })
//     })
//     .then(() => {
//         promise.all(promises)
//             .then(() => {
//                 tableauFin= allPokemon.sort((a,b) => {
//                     return a.id - b.id;
//                 }).slice(0, PokeNombreDebut);

//                 createCard(tableauFin);
//                 const chargement= document.querySelector('.chargement');
//             })
//     })
// }


//     let counter = 0
//     function fetchPokemonComplet(pokemon) {
//         let objPokemonFull = {};
//         let url = pokemon.url;
//         let nameP = pokemon.name;
//         return fetch(url)
//             .then(reponse => reponse.json())
//             .then((pokeData) => {
//                 counter++;
//                 objPokemonFull.pic = pokeData.sprites.front_default;
//                 objPokemonFull.type = pokeData.types[0].type.name;
//                 objPokemonFull.id = pokeData.id;
//                 return fetch(`https://pokeapi.co/api/v2/pokemon-species/${nameP}`)
//                     .then(reponse => reponse.json())
//                     .then((pokeData) => {
//                         objPokemonFull.name= pokeData.names[4].name;
//                         const frName = pokeData.names.find(n => n.language.name=== "fr");
//                         objPokemonFull.name = frName ? frName.name : pokemon.name;
//                         allPokemon.push(objPokemonFull);

//                     })
//             });
//     }


//     function createCard(arr){

//         for(let i=0; i< arr.length; i++){

//             const carte= document.createElement("li");
//             carte.classList.add('hoverableCarte')
//             let couleur= types[arr[i].type];
//             carte.style.background= couleur;
//             const txtCarte= document.createElement('h5');
//             txtCarte.innerText= arr[i].name;
//             const idCarte = document.createElement('p');
//             idCarte.innerText= `ID# ${arr[i].id}`;
//             const imgCarte= document.createElement('img');
//             imgCarte.src= arr[i].pic;

//             carte.appendChild(imgCarte);
//             carte.appendChild(txtCarte);
//             carte.appendChild(idCarte);

//             listePoke.appendChild(carte);
//         }

//     }

//     searchInput.addEventListener("input",function(e){

//         if(e.target.value !== ""){
//             e.target.parentNode.classList.add("active-input");
//         }else{
//              e.target.parentNode.classList.remove("active-input");
//         }
//     });

//     window.addEventListener('load',(e) =>{
//         if(searchInput.value !== ""){
//             searchInput.parentNode.classList.add("active-input");
//         }
//     })


//     let index= PokeNombreDebut;

//     window.addEventListener('scroll', ()=>{

//         const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

//         if(clientHeight + scrollTop >= scrollHeight - 20){
//             addPoke(6);
//         }
//     })

//     function addPoke(nb){
//         if (index> counter){
//             return;
//         }
//         const arrToAdd= allPokemon.slice(index,index+ nb);
//         createCard(arrToAdd);
//         index+= nb;
//     }




//     const formSearch= document.querySelector('form');
//     formSearch.addEventListener('submit' ,(e) =>{
//         e.preventDefault();
//         recherche();
//     })

//     function recherche(){
//         if(index < counter){
//             addPoke(counter - index);
//         }

//         let filter, allLi, titleValue, allTittles;
//         filter = searchInput.value.toUpperCase();
//         allLi=document.querySelectorAll('li');
//         allTittles= document.querySelectorAll("li > h5");

//         for(i=0; i< allLi.length; i++){

//             titleValue= allTittles[i].innerText;
//             if(titleValue.toUpperCase().indexOf(filter) > -1){
//                 allLi[i].style.display= "flex";
//             }else{
//                 allLi[i].style.display= 'none';
//             }
//         }
//     }



// ===================
// Sélecteurs DOM
// ===================
const searchInput = document.querySelector(".recherche-poke input");
const listePoke = document.querySelector('.liste-poke');
const formSearch = document.querySelector('form');
const chargement = document.querySelector('.loader');

// ===================
// Variables globales
// ===================
let allPokemon = [];
let tableauFin = [];
const limite = 75;
let PokeNombreDebut = 21;
let index = PokeNombreDebut;
let counter = 0;

// ===================
// Couleurs par type
// ===================
const types = {
    bug: '#a8b820',
    dark: '#705848',
    dragon: '#7038f8',
    electric: '#f8d030',
    fairy: '#ee99ac',
    fighting: '#c03028',
    fire: '#f08030',
    flying: '#a890f0',
    ghost: '#705898',
    grass: '#78c850',
    ground: '#e0c068',
    ice: '#98d8d8',
    normal: '#a8a878',
    poison: '#a040a0',
    psychic: '#f85888',
    rock: '#b8a038',
    steel: '#b8b8d0',
    water: '#6890f0'
};

// ===================
// Fetch principal
// ===================
function fetchPokemonBase() {

    chargement.style.display = 'flex';

    const promises = [];

    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limite}`)
        .then(res => res.json())
        .then(data => {
            data.results.forEach(pokemon => {
                promises.push(fetchPokemonComplet(pokemon));
            });
        })
        .then(() => Promise.all(promises))
        .then(() => {
            tableauFin = allPokemon
                .sort((a, b) => a.id - b.id)
                .slice(0, PokeNombreDebut);

            createCard(tableauFin);
            chargement.style.display = 'none';
        })
        .catch(err => console.error(err));
}

// ===================
// Fetch d’un Pokémon
// ===================
function fetchPokemonComplet(pokemon) {

    const objPokemonFull = {};
    const url = pokemon.url;
    const nameP = pokemon.name;

    return fetch(url)
        .then(res => res.json())
        .then(pokeData => {

            counter++;

            objPokemonFull.pic = pokeData.sprites.front_default;
            objPokemonFull.type = pokeData.types[0].type.name;
            objPokemonFull.id = pokeData.id;

            return fetch(`https://pokeapi.co/api/v2/pokemon-species/${nameP}`)
                .then(res => res.json())
                .then(speciesData => {
                    objPokemonFull.name = speciesData.names[4].name;
                    allPokemon.push(objPokemonFull);
                });
        });
}

// ===================
// Création des cartes
// ===================
function createCard(arr) {

    arr.forEach(poke => {

        const carte = document.createElement("li");
        carte.classList.add('hoverableCarte');

        carte.style.background = types[poke.type] || '#ccc';

        const imgCarte = document.createElement('img');
        imgCarte.src = poke.pic;

        const txtCarte = document.createElement('h5');
        txtCarte.innerText = poke.name;

        const idCarte = document.createElement('p');
        idCarte.innerText = `ID# ${poke.id}`;

        carte.append(imgCarte, txtCarte, idCarte);
        listePoke.appendChild(carte);
    });
}

// ===================
// Recherche
// ===================
formSearch.addEventListener('submit', e => {
    e.preventDefault();
    recherche();
});

function recherche() {

    if (index < counter) {
        addPoke(counter - index);
    }

    const filter = searchInput.value.toUpperCase();
    const allLi = document.querySelectorAll('.liste-poke li');
    const allTitles = document.querySelectorAll('.liste-poke li h5');

    for (let i = 0; i < allLi.length; i++) {
        const titleValue = allTitles[i].innerText.toUpperCase();
        allLi[i].style.display =
            titleValue.includes(filter) ? 'flex' : 'none';
    }
}

// ===================
// Scroll infini
// ===================
window.addEventListener('scroll', () => {

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (clientHeight + scrollTop >= scrollHeight - 20) {
        addPoke(6);
    }
});

function addPoke(nb) {

    if (index >= counter) return;

    const arrToAdd = allPokemon.slice(index, index + nb);
    createCard(arrToAdd);
    index += nb;
}

// ===================
// Label animé
// ===================
searchInput.addEventListener("input", e => {
    e.target.parentNode.classList.toggle(
        "active-input",
        e.target.value !== ""
    );
});

// ===================
// Lancement appli
// ===================
fetchPokemonBase();