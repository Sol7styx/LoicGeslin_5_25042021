//déclaration variable productInLocalStorage dans laquelle on met les key et les values qui sont dans le local storage
let productsCart = JSON.parse(localStorage.getItem("productList"));



//---AFFICHAGE DES PRODUITS DU PANIER---
//Sélection de la classe où on injecte le code HTML
const addHtml = document.getElementById("cartcontainer");
const totalPriceHtml = document.getElementById("totalCart");
const btnEmptyCart = document.getElementById("emptyallcart");
const finalPrice = document.getElementById("totalPriceCart");

if(productsCart === null || productsCart == 0 ){
    //Html panier vide
    addHtml.innerHTML = `
        <div class="emptycard">
        <iframe src="https://giphy.com/embed/26hkhPJ5hmdD87HYA" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/kitchen-looney-tunes-empty-26hkhPJ5hmdD87HYA"></a></p>
        <p class="textempty">Votre panier est vide</p>
        </div>`;
} else {
    //on crée une boucle pour parcourir les éléments du tableau et générer le HTML
    productsCart.forEach((objet) => {
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

    //--Bouton suppression article
    let btnremove = document.querySelectorAll(".btnremove");
    //console.log(btnremove);

    for (let a = 0; a < btnremove.length; a++){
        btnremove[a].addEventListener("click" , (event) =>{
            event.preventDefault(); //pour éviter que le click sur le bouton supprimer ne recharge la page

            let removeId = productsCart[a].idCamera && productsCart[a].lens;
            console.log("removeId");
            console.log(removeId);
            //méthode filter
            productsCart = productsCart.filter( el => (el.idCamera && el.lens)  !== removeId);
            console.log(productsCart);

            //on envoie la variable dans le local Storage 
            //transformation en format JSON et envoie dans la key "productList" du localStorage
            localStorage.setItem("productList", JSON.stringify(productsCart));

            //avertir que le produit a été supprimé et rechargement de la page
            alert("Confirmation de la suppression de cet article");
            window.location.href = "cart.html";
        })
    }

    //--Vider entièrement le panier --git 
    //Insertion du bouton dans le HTML du panier
    btnEmptyCart.innerHTML = `
        <div>
            <button class="btnClearCart" id="btnClearCart">Vider le Panier</button>
        </div>
    `;
    //Suppression de la key "produit" du local storage pour vider entièrement le panier
    btnEmptyCart.addEventListener('click', (e)=>{
        e.preventDefault;

    //utilisation de .removeItem pour vider le Local Storage
    localStorage.removeItem("productList");
    //on recharge la page
    window.location.href = "cart.html";
    });

    //--Montant total du panier
    //Déclaration de la variable pour pouvoir y mettre les prix qui sont présents dans le panier
    let calculFinalPrice = [];
    //--Récupérer les prix dans le panier--
    for (let x = 0; x < productsCart.length; x++){
        let cartPrices = productsCart[x].totalPrice;

    //--mettre les prix dans le tableau contenu par la variable calculFinalPrice
        calculFinalPrice.push(cartPrices)
    }
    //Additionner les prix qui sont dans le tableau de la variable calculFinalPrice avec la méthode .reduce
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const finalCartPrice = calculFinalPrice.reduce(reducer, 0);
        
        //Code HTML pour affichage prix total
    finalPrice.innerHTML = `
        <div class="totalCart" id="totalCart">
            <h2>Total de votre panier : ${finalCartPrice}<span>€</span></h2>
        </div>
        `;
};



//POST pour l'envoie du contact et du tableau d'achats
const sendOrderRequest = async function (sendToServer) {
    console.log(sendToServer);
    try {
        let response = await fetch('http://localhost:3000/api/cameras/order', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(sendToServer)
        });
        if (response.ok) {
            let responseData = await response.json();
            console.log(responseData.orderId);
            windows.location = 'confirmation.html';
        } else {
            console.log("Une erreur s'est produite et la requête n'a pas abouti");
            console.log(response.status);
        }
    } catch (error){
        console.log(error);
    }
}

//Sélection et écoute du bouton pour envoyer le formulaire
document.getElementById('btnForm').addEventListener('click', function (e) {
    e.preventDefault();
    let formOrder = {
        contact : { 
            firstName : document.getElementById('prenom').value,
            lastName : document.getElementById('nom').value,
            address : document.getElementById('adresse').value,
            city : document.getElementById('ville').value,
            mail : document.getElementById('email').value},
        products : []
        };
    for (let h = 0; h < productsCart.length; h++) {
        formOrder.products.push(productsCart[h].id);
    }
    console.log(formOrder);
sendOrderRequest (formOrder);
});

    




//--Maintenir le contenu du localStorage dans les champs du formulaire
//Prendre la key dans le local storage et la mettre dans une variable
let dataLocalStorage = localStorage.getItem("contact");
//Convertir la chaîne de caractère en objet javascript
let dataLocalStorageObjet = JSON.parse(dataLocalStorage);
//Mettre les values du localStorage dans le formulaire
document.querySelector("#nom").value =  dataLocalStorageObjet.lastName;
document.querySelector("#prenom").value =  dataLocalStorageObjet.firstName;
document.querySelector("#adresse").value =  dataLocalStorageObjet.address;
document.querySelector("#ville").value =  dataLocalStorageObjet.city;
document.querySelector("#email").value =  dataLocalStorageObjet.mail;