//Assigner les propriétés du format json à la class Camera
class Camera{
    constructor(jsonCamera){
        jsonCamera && Object.assign(this, jsonCamera);
    }
}
function productsDisplay() {
//Requête au serveur et affichage détaillé des caméras.
    fetch('http://localhost:3000/api/cameras')
        .then( data => data.json())
        .then( jsonListCamera => {
            //console.log(jsonListCamera); 
            for(let jsonCamera of jsonListCamera){
                let camera = new Camera(jsonCamera);
                document.querySelector(".container").innerHTML += `
                    <article id=products" class="products">
                    <img class="cameraimage" src="${camera.imageUrl}" alt="photo de l'appareil ${camera.name}">
                    <h2 id="cameras_name" class="cameras_name">${camera.name}</h2>
                    <p id="cameras_price" class="cameras_price">${camera.price / 100} €</p>
                    <div class="detailsbutton">
                    <a href="product.html?id=${camera._id}">Pour plus de détails</a>
                    </div>
                    </article>
                    `;
            }
        });
    //Le ? et l'id pour avoir l'id du produit dans l'url de la page produit correspondant
}
productsDisplay();