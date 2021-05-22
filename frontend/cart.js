//déclaration variable productInLocalStorage dans laquelle on met les key et les values qui sont dans le local storage
let productInLocalStorage = JSON.parse(localStorage.getItem("productList"));
console.log(productInLocalStorage);


//---AFFICHAGE DES PRODUITS DU PANIER---
//Sélection de la classe où on injecte le code HTML
const addHtml = document.getElementById("cartcontainer");
const totalPriceHtml = document.getElementById("totalCart");
const btnEmptyCart = document.getElementById("emptyallcart");
const finalPrice = document.getElementById("totalPriceCart");

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
                    <p class="text">Quantité : ${objet.quantity}</p>
                    <p class="text">Objectifs : ${objet.lens}</p>
                </div>
                <div class="price">
                    <p>Prix : ${objet.totalPrice}<span>€</span></p>
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

for (let a = 0; a < btnremove.length; a++){
    btnremove[a].addEventListener("click" , (event) =>{
        event.preventDefault(); //pour éviter que le click sur le bouton supprimer ne recharge la page

        let removeId = productInLocalStorage[a].idCamera && productInLocalStorage[a].lens;
        console.log("removeId");
        console.log(removeId);
        //méthode filter
        productInLocalStorage = productInLocalStorage.filter( el => (el.idCamera && el.lens)  !== removeId);
        console.log(productInLocalStorage);

        //on envoie la variable dans le local Storage 
        //transformation en format JSON et envoie dans la key "productList" du localStorage
        localStorage.setItem("productList", JSON.stringify(productInLocalStorage));

        //alert pour avertir que le produit a été supprimé et rechargement de la page
        alert("Confirmation de la suppression de cet article");
        window.location.href = "cart.html";
    })
}

//--Vider entièrement le panier --//
//--Insertion du bouton dans le HTML du panier
btnEmptyCart.innerHTML = `
    <div>
        <button class="btnClearCart" id="btnClearCart">Vider le Panier</button>
    </div>
    `;
//Suppression de la key "produit du local storage pour vider entièrement le panier
btnEmptyCart.addEventListener('click', (e)=>{
    e.preventDefault;

//utilisation de .removeItem pour vider le Local Storage
    localStorage.removeItem("productList");

    window.location.href = "cart.html";

});

//--Montant total du panier
let calculFinalPrice = [];
//--Récupérer les prix dans le panier--
for (let x = 0; x < productInLocalStorage.length; x++){
    let cartPrices = productInLocalStorage[x].totalPrice;

//--mettre les prix dans le tableau contenu par la variable calculFinalPrice
    calculFinalPrice.push(cartPrices)

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const finalCartPrice = calculFinalPrice.reduce(reducer,0);

    //Affichage Prix Total
finalPrice.innerHTML = `
    <div class="totalCart" id="totalCart">
        <h2>Total de votre panier : ${finalCartPrice}<span>€</span></h2>
    </div>
    `;
}

//--Formulaire



//Sélectionner le bouton envoyer formulaire
const formButton = document.getElementById("btnForm");

//Ajout de l'évènement
formButton.addEventListener("click", (e)=>{
    e.preventDefault();

        /*if (productInLocalStorage == 0) {
            alert("Votre panier est vide")
        }
        else {*/
            const formValues = {
                lastname : document.getElementById("nom").value,
                firstname : document.getElementById("prenom").value,
                address : document.getElementById("adresse").value,
                city : document.getElementById("ville").value,
                mail : document.getElementById("email").value,
            }
            //Mettre l'objet "formValues" dans le localStorage
            localStorage.setItem("formValues", JSON.stringify(formValues));  //convertir l'objet en chaîne de caractères
        
            //Mettre les infos du formulaire et les produits du panier dans un objet à envoyer vers le serveur
            const objetForOrder = {productInLocalStorage, formValues};
            //Envoi les données au serveur 
            const requestOptions = {
                method: 'POST',
                body: JSON.stringify(formValues),
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
            }
            const promise01 = fetch('http://localhost:3000/api/cameras/order', requestOptions);

            console.log (promise01);
            
            
            /*    .then((response) => response.json())
                .then((json) => {
                console.log(json)
                localStorage.removeItem('shoppingCart')
                window.location.href = `${window.location.origin}/orderStatus.html?orderId=${json.orderId}`
           => {
                alert(error) })
                .catch(() 
            })*/

//}
});
            
            //--Maintenir le contenu du localStorage dans les champs du formulaire
            //Prendre la key dans le local storage et la mettre dans une variable
            const dataLocalStorage = localStorage.getItem("formValues");
            //Convertir la chaîne de caractère en objet javascript
            const dataLocalStorageObjet = JSON.parse(dataLocalStorage);
            //Mettre les values du localStorage dans le formulaire
            document.querySelector("#nom").value =  dataLocalStorageObjet.lastname;
            document.querySelector("#prenom").value =  dataLocalStorageObjet.firstname;
            document.querySelector("#adresse").value =  dataLocalStorageObjet.address;
            document.querySelector("#ville").value =  dataLocalStorageObjet.city;
            document.querySelector("#email").value =  dataLocalStorageObjet.mail;
