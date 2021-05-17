//déclaration variable productInLocalStorage dans laquelle on met les key et les values qui sont dans le local storage
let productInLocalStorage = JSON.parse(localStorage.getItem("productList"));
console.log(productInLocalStorage);

/*--Fonctin pour supprimer un produit du panier
function delLocalStorage(name) {
    let removal = JSON.parse(localStorage.getItem("productInLocalStorage"));
    const removeCart = removal.filter((objet) => objet.name !== name);
    localStorage.setItem("productInLocalStorage", JSON.stringify(removeCart));
    if (removeCart == 0) {
        localStorage.removeItem('productInLocalStorage');
    }
    window.location.assign("cart.html");
    console.log("Le panier est vide");
}
*/

//---AFFICHAGE DES PRODUITS DU PANIER---
//Sélection de la classe où on injecte le code HTML
const addHtml = document.getElementById("cartcontainer");
const totalPriceHtml = document.getElementById("totalCart");



if(productInLocalStorage === null || productInLocalStorage == 0 ){
    //Html panier vide
    addHtml.innerHTML = `
        <div class="emptycard">
        <iframe src="https://giphy.com/embed/26hkhPJ5hmdD87HYA" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/kitchen-looney-tunes-empty-26hkhPJ5hmdD87HYA"></a></p>
        <p class="textempty">Votre panier est vide</p>
        </div>`;
} else {
    //on crée une boucle pour parcourir les éléments du tableau et générer le HTML
    productInLocalStorage.forEach((objet) => {
        addHtml.innerHTML += `
            <div class="card" id="card">
                <div class="cardimage">
                    <img alt="${objet.name}" class="imageCard" src="${objet.image}">
                </div>
                <div>
                    <a href="product.html?id=${objet._id}"><h2>${objet.name}</h2></a>
                    <p class="text">Quantité :</p>
                    <p class="text">Objectifs : ${objet.lens}</p>
                </div>
                <div class="price">
                    <p>Prix : <span>€</span></p>
                </div>
                <div>
                    <button class="btnremove" id="btnremove">Supprimer</button>
                </div>
            </div>
            `;
    });
}

let btnremove = document.querySelectorAll(".btnremove");
console.log(btnremove);

for (let i = 0; i < btnremove.length; i++){
    btnremove[i].addEventListener("click" , (event) =>{
        event.preventDefault();

        let removeId = productInLocalStorage[i].idCamera;
        console.log("removeId");
        console.log(removeId);
        //méthode filter
        productInLocalStorage = productInLocalStorage.filter( el => el.idCamera !== removeId);
        console.log(productInLocalStorage);

        //on envoie la variable dans le local Storage 
        //transformation en format JSON et envoie dans la key "productList" du localStorage
        localStorage.setItem("productList", JSON.stringify(productInLocalStorage));

        //alert pour avertir que le produit a été supprimé et rechargement de la page
        alert("Confirmation de la suppression de cet article");
        window.location.href = "cart.html";
    })
}