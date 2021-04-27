


fetch('http://localhost:3000/api/cameras')
    .then( data => data.json())
    .then( jsonListCamera => {
         for(let jsonCamera of jsonListCamera){
             let camera = new Camera(jsonCamera);
             document.querySelector(".container").innerHTML += `<article id=products" class="products">
                                                                    <img class="cameraimage" src="${camera.imageUrl}" alt="photo de l'appareil ${camera.name}">
                                                                    <h2 id="cameras_name" class="cameras_name">${camera.name}</h2>
                                                                    <p id="cameras_price" class="cameras_price">${camera.price / 100} €</p>
                                                                    <a href="">Pour plus de détails</a>
                                                                </article>`;
         }
        });
