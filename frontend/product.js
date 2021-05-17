

//Récupération de la chaîne de requête dans l'url
const queryString_url_id = window.location.search;

//extraire l'id
const urlSearchParams = new URLSearchParams(queryString_url_id);

const id = urlSearchParams.get("id")


async function main() {
    const camera = await getCamera()
    displayCamera(camera)
}
function getCamera() {
    return fetch('http://localhost:3000/api/cameras/' + id )
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

function displayCamera(camera) {

    let priceProduct = camera.price / 100;
    let optionLens="";
    camera.lenses.forEach((lens) => {
    optionLens = optionLens + `<option value="${lens}">${lens}</option>`;
    });


    document.getElementById("productcontainer").innerHTML += `
        <div class="cameraphoto">
            <img class="cameraimage" src="${camera.imageUrl}" alt="photo de l'appareil"> 
        </div>

        <div class="productsheet">
            <h2 class="productname">${camera.name}</h2>
            <h3 class="unitProductPrice">Prix unitaire : ${priceProduct} €</h3>
            <p class="productdescription">${camera.description}</p>
            <form>
                <label class="text" for="productAmount">Quantité</label>
                <input id="productAmount" type="number" min="1" value="1"/>
                <div>
                    <label class="text" for="lensSelect">Objectifs</label>
                    <select class="lensSelect" id="lensSelect">
                        ${optionLens}
                    </select>
                </div>
                <p class="selectionprice">Prix total : <spans id="totalSelectionPrice">${priceProduct}</spans> €</p>
                <button id="addcart" type="submit" class="addcart">Ajouter au Panier</button>
            </form>                    
            </div>
        </div>`;

        totalProductPrice(priceProduct);
        function totalProductPrice(priceProduct) {
            let amount = document.getElementById("productAmount");
            amount.addEventListener("change", (event) => {
                const result = document.getElementById("totalSelectionPrice");
                result.textContent = `${priceProduct}` * `${event.target.value}`;
            });
        }
        //Récupération des données sélectionnées par l'utilisateur et envoie au panier
        //Choix de la lentille par l'utilisateur et des quantités dans les variables
        let lensChoice = document.getElementById("lensSelect");
        let productQuantity = document.getElementById("productAmount");
        
        //Sélection du bouton Ajouter au Panier
        const btn_addcart = document.getElementById("addcart");
        
        //Ecouter le bouton et envoyer le panier
        btn_addcart.addEventListener("click", (event) => {
            event.preventDefault();

            //Récupération des valeurs du formulaire
        let detailsCam = {
            idCamera: camera._id,
            image: camera.imageUrl,
            name: camera.name,
            price: camera.price / 100,
            lens: lensChoice.value,
            quantity: productQuantity.value,
            totalPrice: (camera.price * parseInt(productQuantity.value)) / 100,
        }
        console.log(detailsCam);

        //Local Storage
        //fenêtre popup 
        const popupConfirmation = () =>{
            if(window.confirm(`${camera.name} option: ${lensChoice.value} a bien été ajouté au panier
OK pour aller au panier ANNULER pour revenir à l'accueil`)){
            window.location.href = "cart.html";
            }else{
                window.location.href = "index.html";
            }
        }
        //fonction pour ajouter un produit dans le localStorage
        const addProductInLocalStorage = () => {
            productInLocalStorage.push(detailsCam); //Ajout dans le tableau de l'objet avec les values choisies
            //Transformation en JSON, puis envoie dnas la key "productList" du local Storage
            localStorage.setItem("productList", JSON.stringify(productInLocalStorage)); 
        };
        //Vérifions si le local storage contient des données (prductsInLocalStorage)
        let productInLocalStorage = JSON.parse(localStorage.getItem("productList"));
        //JSON.parse pour convertir les données au format JSON qui sont dans le local storage en objet JavaScript
        if(productInLocalStorage){ //Si pas de produit dans le loca storage
            addProductInLocalStorage();
            popupConfirmation();
        }
        else{
            productInLocalStorage = [];
            addProductInLocalStorage();
            popupConfirmation();
        }

        });
        
}
/*fonction auto appellée*/
/*Requête API*/
main()
