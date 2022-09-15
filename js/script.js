
var address = document.getElementById("addresses");
var pokemon;
const options = {
    method: 'GET',
    url: 'https://realty-in-us.p.rapidapi.com/properties/list-for-sale',
    params: {
        state_code: 'NY',
        city: 'New York City',
        offset: '0',
        limit: '100',
        sort: 'relevance'
    },
    headers: {
        'X-RapidAPI-Key': '275e820486msh3fc17a74d49f814p17781cjsn6a42cad3a8e1',
        'X-RapidAPI-Host': 'realty-in-us.p.rapidapi.com'

    }
}
axios.request(options).then(function (response) {
    for (i = 0; i < 100; i++) {

        console.log(response.data.listings[i]);
        var devEl = document.createElement("div");
        var imgEl = document.createElement("img");
        var priceEl = document.createElement("p");
        var floorPlanEl = document.createElement("p");
        var pokemonEl = document.createElement("div");
        if (response.data.listings[i].price_raw < 500000) {
            pokemonEl.setAttribute("class", "animate__animated animate__jello squirtleSprite")
            pokemonEl.style.setProperty('--animate-duration', '5s')
        } else if (response.data.listings[i].price_raw > 500000 && response.data.listings[i].price_raw < 1000000) {
            pokemonEl.setAttribute("class", "animate__animated animate__jello wartortleSprite")
            pokemonEl.style.setProperty('--animate-duration', '5s')
        } else if (response.data.listings[i].price_raw > 1000000) {
            pokemonEl.setAttribute("class", "animate__animated animate__jello blastoiseSprite")
            pokemonEl.style.setProperty('--animate-duration', '5s')
        }
        devEl.textContent = response.data.listings[i].address;
        imgEl.src = response.data.listings[i].photo;
        priceEl.textContent = "Price " + response.data.listings[i].price;

        var hasBedrooms = response.data.listings[i].beds;
        var floorPlanString = "";
        if (hasBedrooms === 0) {
            floorPlanString = "Studio";
        } else {
            floorPlanString = hasBedrooms + " Bedrooms";
        }

        floorPlanEl.textContent = floorPlanString;
        address.append(imgEl);
        address.append(devEl);
        address.append(priceEl);
        address.append(pokemonEl);
        address.append(floorPlanEl);

    }
    getPokes()
}).catch(function (error) {
    console.error(error);
});

async function getPokes() {
    try {
        const poke1 = await axios.get('https://pokeapi.co/api/v2/pokemon/squirtle')
        const poke2 = await axios.get('https://pokeapi.co/api/v2/pokemon/wartortle')
        const poke3 = await axios.get('https://pokeapi.co/api/v2/pokemon/blastoise')
        console.log(poke1, poke2, poke3)
        console.log(poke1.data.sprites.front_shiny)
        var squirtleDivs = document.getElementsByClassName("squirtleSprite")
        console.log(squirtleDivs)
        for (var index = 0; index < squirtleDivs.length; index++) {
            var squirtleImage = document.createElement("img")
            squirtleImage.src = poke1.data.sprites.front_shiny
            squirtleDivs[index].appendChild(squirtleImage)
        }

        var wartortleDivs = document.getElementsByClassName("wartortleSprite")
        console.log(wartortleDivs)
        for (var index = 0; index < wartortleDivs.length; index++) {
            var wartortleImage = document.createElement("img")
            wartortleImage.src = poke2.data.sprites.front_shiny
            wartortleDivs[index].appendChild(wartortleImage)
        }

        var blastoiseDivs = document.getElementsByClassName("blastoiseSprite")
        console.log(blastoiseDivs)
        for (var index = 0; index < blastoiseDivs.length; index++) {
            var blastoiseImage = document.createElement("img")
            blastoiseImage.src = poke3.data.sprites.front_shiny
            blastoiseDivs[index].appendChild(blastoiseImage)
        }
    }
    catch (err) {
        console.log(err)
    }
}



    // Pokemon in use: Blastoise => Wartortle => Squirtle

