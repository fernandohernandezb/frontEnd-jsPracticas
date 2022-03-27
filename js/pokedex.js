//Funcion para extraer pokemons de la pokeapi
const fetchPokemon = () => {
    const pokeFind = document.getElementById("pokeFind");
    let pokeInput = pokeFind.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`;
    pokeType.innerHTML = "";
    pokeStats.innerHTML = "";
    pokeAbilities.innerHTML = "";
    pokeMoves.innerHTML = "";
    fetch(url).then((res) => { //promesas y consulta
        //manejo de errores
        if(res.status != "200"){
            //console.log(res);
            let infoPoke = {
                number: "?",
                name: "Sin datos",
                image: "./images/pokemon_sad.png",
                type: {name: "?"},
                height: "?",
                weight: "?",
                stats: {name: "?"},
                abilities: {name: "?"},
                moves: {name: "?"}
            }
            //console.log(infoPoke);
            pokeData(infoPoke);
        }else{
            return res.json();
        }
    }).then((data) => {
        //console.log(data);
        if(data != undefined){
        let infoPoke = {
            number: data.id,
            name: data.name,
            image: data.sprites.front_default,
            type: data.types,
            height: data.height,
            weight: data.weight,
            stats: data.stats,
            abilities: data.abilities,
            moves: data.moves
        }
        //console.log(infoPoke);
        pokeData(infoPoke);
    }
    })
}

//Vaciado de información de la api a la pagina
const pokeData = (data) => {
    pokeNum.innerHTML = data.number;
    pokeName.innerHTML = toCap(data.name);
    pokeImg.src = data.image;

    for(var i=0;i<data.type.length;i++){
        pokeType.innerHTML += `${toCap(data.type[i].type.name)} `;
    }    

    pokeWeight.innerHTML = data.height;
    pokeHeight.innerHTML = data.weight;
    
    for(var i=0;i<data.stats.length;i++){
        pokeStats.innerHTML += `<li> ${toCap(data.stats[i].stat.name)} <span>${data.stats[i].base_stat}</span></li>`;
    }

    for(var i=0;i<data.abilities.length;i++){
        pokeAbilities.innerHTML += `<li> ${toCap(data.abilities[i].ability.name)}</li>`;
    }

    for(var i=0;i<data.moves.length;i++){
        pokeMoves.innerHTML += ` ${toCap(data.moves[i].move.name)}, `;
    }

}

//Función 
function toCap(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
