

    
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
            for(i = 0; i < 100; i++) {
                
                console.log(response.data.listings[i]);
                var devEl = document.createElement("div");
                var imgEl = document.createElement("img");
                var priceEl = document.createElement("p");
                var floorPlanEl = document.createElement("p");
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
                address.append(floorPlanEl);
            
            }

           }).catch(function (error) {
            console.error(error);
        });


    // axios.get('https://pokeapi.co/api/v2/pokemon/squirtle')
    // .then(res => {
    //     console.log(res)
    //     console.log(res.data.abilities[0].ability.name)
    // })
    // .catch(err => [
    //     console.log(err)
    // ])

    // axios.get('https://pokeapi.co/api/v2/pokemon/wartortle')
    // .then(res => {
    //     console.log(res)
    //     console.log(res.data.abilities[0].ability.name)
    // })
    // .catch(err => [
    //     console.log(err)
    // ])

    // axios.get('https://pokeapi.co/api/v2/pokemon/blastoise')
    // .then(res => {
    //     console.log(res)
    //     console.log(res.data.abilities[0].ability.name)
    // })
    // .catch(err => [
    //     console.log(err)
    // ])

    

    // Pokemon in use: Blastoise => Wartortle => Squirtle

