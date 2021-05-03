

//Récupération de la chaîne de requête dans l'url
const queryString_url_id = window.location.search;
console.log(queryString_url_id);

//extraire l'id
const urlSearchParams = new URLSearchParams(queryString_url_id);
console.log(urlSearchParams);

const id = urlSearchParams.get("id")
console.log(id);

main()

async function main() {
    const camera = await getCamera()
    displayCamera(camera)
}
function getCamera() {
    return fetch('http://localhost:3000/api/cameras/${id}')
        .then(function(response){
            return response.json()
        })
        .then(function(camera){
            return camera
        })
        .catch(function(error){
            alert(error)
        })
}
function displayCamera() {
    document.getElementById("main").innerHTML += `
    <h2>Card</h2>
    <div class="cameracard">
        <img alt="" class="" src="${camera.imageUrl}>
    </div>
    
    `;
}
//const addHtml = document.getElementById("content");
//const searchParams = new URLSearchParams(window.location.search);


//id du produit dans le fetch
/*fetch(`http://localhost:3000/api/cameras/${searchParams.get("id")}`) //récupérer la source située à l'adresse url
        .then( data => data.json ) //quand c'est fait, exécuter la fonction   
        .then( displayProduct => {
            let camera = new Camera(jsonCamera);
            document.querySelector(".container").innerHTML += `<article id=products" class="products">
                                                                    <img class="cameraimage" src="${camera.imageUrl}" alt="photo de l'appareil ${camera.name}">
                                                                    <h2 id="cameras_name" class="cameras_name">${camera.name}</h2>
                                                                    <p id="cameras_price" class="cameras_price">${camera.price / 100} €</p>
                                                                    <div class="detailsbutton">
                                                                        <a href="product.html?id${camera._id}">Pour plus de détails</a>
                                                                    </div>
                                                                </article>`;
        })
        */

/*injecte l'id du produit dans le fetch
function afficheUnProduit (){
fetch(`http://localhost:3000/api/cameras/${objectId.get("id")}`)
    .then((response) => {
        // me renvoie une première prommesse
        if (response.ok) {
            return (data = response.json()); // Si response ok, retourne un objet json
        } else {
            Promise.reject(response.status); // sinon, me retroune la cause de l'echec
        }
    })
    .then((data) => {
        console.log(data)
        //variable prix pour le diviser par 100
        let priceProdUnit = data.price / 100;
        //variable vide pour les lentilles
        let lens = "";
        //boucle pour selectionner la lentille
        data.lenses.forEach((lentille) => {
            lens += `<option value="${lentille}">${lentille}</option>`;
        });
        //Insertion du HTML dans le DOM
        //Interpolation de variable
        addHtml.innerHTML += `
                <div class="card produit">
                    <img alt="${data.name}" class="content__img" src="${data.imageUrl}">
                </div>
                <div class="card produit">
                    <h2 class="name">${data.name}</h2>
                    <p class="description">${data.description}</p>
                    <form>
                        <label class="text" for="quantiteProduit">Quantité</label>
                        <input id ="quantiteProduit" type="number" min="1" value="1"/>
                            <div>
                                <label class="text" for="lensSelect">Objectifs</label>
                                <select class="" id="lensSelect">
                                    ${lens}   
                                </select>        
                            </div>
                        <p class="price">Prix total : <span id="totalPrice">${priceProdUnit}</span> €</p>
                        <button id="btnAjoutId" type="button" class="btn-success">Ajouter au panier</button>                       
                    </form>   
                </div>
                `;
               
        //calcul pour le prix total
        calculePrice(priceProdUnit);
        //écoute le bouton
        const btnAjout = document.getElementById("btnAjoutId");

        btnAjout.addEventListener("click", () => {
            let lensElm = document.getElementById("lensSelect");
            let quantityElm = document.getElementById("quantiteProduit");
            //variable qui contient un objet avec les propriétés (clé et valeur)
            let objetCam = {
                _id: data._id,
                image: data.imageUrl,
                name: data.name,
                lens: lensElm.value,
                quantite: quantityElm.value,
                totalPrice: (data.price * parseInt(quantityElm.value)) / 100,
                price: data.price / 100,
            };
            //On passe en argument de la fonction mon objet
            ajoutLocalStorage(objetCam);
        });      
        
    });  
}
afficheUnProduit();
/** 
/**Fonction pour calculer le prix total en fonction de la quantité
 * 
 * @param {objet} priceProdUnit - prix unitaire
 * 
 */
/*function calculePrice(priceProdUnit) {
    let quantites = document.getElementById("quantiteProduit");
    quantites.addEventListener("change", (event) => {
        const result = document.getElementById("totalPrice");
        result.textContent = `${priceProdUnit}` * `${event.target.value}`;
    });
}
*/