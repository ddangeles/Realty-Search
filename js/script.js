
var address = document.getElementById("addresses");
var limit   = 3;
var city    = "San Diego";

var pokemon;

var defaultDom = document.getElementById("addresses").innerHTML;


//navbar dropdown list materialize functionality
$( document ).ready(function(){
    $(".dropdown-trigger").dropdown();

})

async function getMapURL(listingAddress){

    let result;
        try {
            result = await $.ajax({
            method: 'GET',
            url: 'https://api.positionstack.com/v1/forward',
            data: {
            access_key: '7d2b7f731cdc2afa902de837bf9a10d0',
            query: listingAddress,
            limit: 1
        }
});
        return result;
}
        catch(error){
            console.log(error);
        }
} 
// function getCity() {
//     while (address.hasChildNodes()){
//         address.removeChild(address.firstChild);
//     }
//     city  = document.getElementById('inputId').value;
//     console.log(city);
// }

document.addEventListener("click", function(event){
    if(event.target.id === "list-style"){
    limit = event.target.value;
    console.log(limit);
    // getCity();
    getAddresses(limit);
    }
})

function getAddresses(limit) {
    while (address.hasChildNodes()){
        address.removeChild(address.firstChild);
    }
    const options = {

        method: 'GET',
        // url: 'https://realty-in-us.p.rapidapi.com/locations/auto-complete',
        url: 'https://realty-in-us.p.rapidapi.com/properties/list-for-sale',

        params: {

        state_code: 'CA',
        city: "San Diego",
        offset: '0',
        limit: limit,
        sort: 'relevance'

        },

        headers: {

            'X-RapidAPI-Key': '186617ac64msh9a42996fe62ec00p1d7c23jsnaf6e5046d454',
            'X-RapidAPI-Host': 'realty-in-us.p.rapidapi.com'

        }

    }

    axios.request(options).then(function (response) {

        for (let i = 0; i < limit; i++) {
            
            console.log(response.data.listings[i]);
            var column      = document.createElement("div");
            column.setAttribute("class","col s4")
            var devEl       = document.createElement("div");
            devEl.setAttribute("class","card");
            devEl.style.height="580px";
            devEl.style.width="462px";
            var imgDiv      = document.createElement("div");
            imgDiv.setAttribute("class","card-image");
            var imgEl       = document.createElement("img");
            var cardContent = document.createElement("div");
            cardContent.setAttribute("class","card-content")
            var priceEl     = document.createElement("p");
            var floorPlanEl = document.createElement("p");
            var pokemonEl   = document.createElement("div");


            if (response.data.listings[i].price_raw < 500000) {

                pokemonEl.setAttribute("class", "animate__animated animate__shakeX squirtleSprite centered")
                pokemonEl.style.setProperty('--animate-duration', '5s')

            } else if (response.data.listings[i].price_raw > 500000 && response.data.listings[i].price_raw <1000000) {

                pokemonEl.setAttribute("class", "animate__animated animate__shakeX wartortleSprite centered")
                pokemonEl.style.setProperty('--animate-duration', '5s')

            } else if (response.data.listings[i].price_raw > 1000000) {

                pokemonEl.setAttribute("class", "animate__animated animate__shakeX blastoiseSprite centered")
                pokemonEl.style.setProperty('--animate-duration', '5s')

            }

            var listingAddress = response.data.listings[i].address;
            var cardAddress = document.createElement("p");
            cardAddress.setAttribute("class","card-title");

                // fetch map URL
                var urlEl = document.createElement("a");
                urlEl.setAttribute("id",i);
                urlEl.textContent='Click to view location on maps';
                cardAddress.textContent = listingAddress;
                var getURL = getMapURL(listingAddress);
                console.log(i);
               
                       mapURL = getURL.then( function(result){
                            console.log(i+" : "+result);
                            var mapURL = result.data[0].map_url;
                            console.log(i+" : " + mapURL);
                            document.getElementById(i+"").setAttribute("href",mapURL);
                            document.getElementById(i+"").setAttribute("target","_blank");
                            
                        })
                         
                        //end fetch

                        //set not found image

            if (response.data.listings[i].photo_count == 0) {

                imgEl.src = "./assets/images/404.jpg";

            } else {

                imgEl.src = response.data.listings[i].photo;

            }
            imgEl.style.height= "310px";
            imgEl.style.width="460px";
            // imgEl.src = response.data.listings[i].photo;

            priceEl.textContent = "Price " + response.data.listings[i].price;

            var hasBedrooms     = response.data.listings[i].beds;
            var hasBathrooms    = response.data.listings[i].baths;
            var sqft            = response.data.listings[i].sqft;
            console.log("sqft : "+ sqft)
            var floorPlanString = "";

            if (hasBedrooms === 0) {

                floorPlanString = "Studio - " + hasBathrooms + " Bath";
            
            } else {
            
                floorPlanString = hasBedrooms + " Bedrooms - " + hasBathrooms + " Bath";
            
            }

            var pricePerSqft = (response.data.listings[i].price_raw/response.data.listings[i].sqft_raw).toFixed(2);
            var sqftEl = document.createElement("p");
            sqftEl.textContent= `${sqft}, price/sqft: $${pricePerSqft}`;
            floorPlanEl.textContent = floorPlanString;
            
            imgDiv.append(imgEl);
            devEl.append(cardAddress);
            devEl.append(imgDiv);
            cardContent.append(priceEl);
            cardContent.append(sqftEl);
            cardContent.append(floorPlanEl);
            cardContent.append(pokemonEl);
            cardContent.append(urlEl);
            devEl.append(cardContent);
            column.append(devEl);
            address.append(column);

            // address.append(imgEl);
            // address.append(devEl);
            // address.append(priceEl);
            // address.append(floorPlanEl);
            // address.append(pokemonEl);
        
        }

        getPokes()}).catch(function (error) {

            console.error(error);

    });


    var blastoiseDivs = document.getElementsByClassName("blastoiseSprite")
    var squirtleDivs = document.getElementsByClassName("squirtleSprite")
    var wartortleDivs = document.getElementsByClassName("wartortleSprite")

    async function getPokes() {

        
        try {

            const poke1 = await axios.get('https://pokeapi.co/api/v2/pokemon/squirtle')
            const poke2 = await axios.get('https://pokeapi.co/api/v2/pokemon/wartortle')
            const poke3 = await axios.get('https://pokeapi.co/api/v2/pokemon/blastoise')

            // console.log(poke1, poke2, poke3)
            // console.log(poke1.data.sprites.front_shiny)

            

            // console.log(squirtleDivs)

            for (var index = 0; index < squirtleDivs.length; index++) {
                while (squirtleDivs[index].hasChildNodes()){
                    squirtleDivs[index].removeChild(squirtleDivs[index].firstChild);
                }
                var squirtleImage = document.createElement("img")
                squirtleImage.src = poke1.data.sprites.front_shiny
                squirtleImage.setAttribute("class","centered")

                squirtleDivs[index].appendChild(squirtleImage)

            }

            

            // console.log(wartortleDivs)

            for (var index = 0; index < wartortleDivs.length; index++) {
                while (wartortleDivs[index].hasChildNodes()){
                    wartortleDivs[index].removeChild(wartortleDivs[index].firstChild);
                }
                
                var wartortleImage = document.createElement("img")
                wartortleImage.src = poke2.data.sprites.front_shiny
                wartortleImage.setAttribute("class","centered");

                wartortleDivs[index].appendChild(wartortleImage)

            }

            

            // console.log(blastoiseDivs)

            for (var index = 0; index < blastoiseDivs.length; index++) {
                while (blastoiseDivs[index].hasChildNodes()){
                    blastoiseDivs[index].removeChild(blastoiseDivs[index].firstChild);
                }
                var blastoiseImage = document.createElement("img")
                blastoiseImage.src = poke3.data.sprites.front_shiny
                blastoiseImage.setAttribute("class","centered");
                blastoiseDivs[index].appendChild(blastoiseImage)

            }

        }

        catch (err) {

            console.log(err)

        }

    }

}

function init() {

    while (address.hasChildNodes()){
        address.removeChild(address.firstChild);
    }
    // getCity();
    getAddresses(limit);

}
init();

// Pokemon in use: Blastoise => Wartortle => Squirtle