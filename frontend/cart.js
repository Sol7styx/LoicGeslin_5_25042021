//déclaration variable productInLocalStorage dans laquelle on met les key et les values qui sont dans le local storage
let products = JSON.parse(localStorage.getItem("productList"));



//---AFFICHAGE DES PRODUITS DU PANIER---
//Sélection de la classe où on injecte le code HTML
const addHtml = document.getElementById("cartcontainer");
const totalPriceHtml = document.getElementById("totalCart");
const btnEmptyCart = document.getElementById("emptyallcart");
const finalPrice = document.getElementById("totalPriceCart");

if(products === null || products == 0 ){
    //Html panier vide
    addHtml.innerHTML = `
        <div class="emptycard">
        <iframe src="https://giphy.com/embed/26hkhPJ5hmdD87HYA" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/kitchen-looney-tunes-empty-26hkhPJ5hmdD87HYA"></a></p>
        <p class="textempty">Votre panier est vide</p>
        </div>`;
} else {
    //on crée une boucle pour parcourir les éléments du tableau et générer le HTML
    products.forEach((objet) => {
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

            let removeId = products[a].idCamera && products[a].lens;
            console.log("removeId");
            console.log(removeId);
            //méthode filter
            products = products.filter( el => (el.idCamera && el.lens)  !== removeId);
            console.log(products);

            //on envoie la variable dans le local Storage 
            //transformation en format JSON et envoie dans la key "productList" du localStorage
            localStorage.setItem("productList", JSON.stringify(productInLocalStorage));

            //avertir que le produit a été supprimé et rechargement de la page
            alert("Confirmation de la suppression de cet article");
            window.location.href = "cart.html";
        })
    }

    //--Vider entièrement le panier --
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
    for (let x = 0; x < products.length; x++){
        let cartPrices = products[x].totalPrice;

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


//--Formulaire
//Sélection du bouton envoyer le formulaire
const btnSendForm = document.querySelector("#btnForm");

btnSendForm.addEventListener("click", (e)=>{
e.preventDefault();
//Récupération des valeurs du formulaire pour les mettre dans le local storage
const contact = {
    firstName : document.querySelector("#prenom").value,
    lastName : document.querySelector("#nom").value,
    address : document.querySelector("#adresse").value,
    city : document.querySelector("#ville").value,
    mail : document.querySelector("#email").value,
}

//--Gestion validation du formulaire


localStorage.setItem("contact", JSON.stringify(contact));
//Mettre les values du formulaire et mettre les produits sélectionnés dans un objet à envoyer vers le serveur
const sendToServer = {
    products,
    contact
}
console.log("sendToServer");
console.log(sendToServer);

//Envoie de l'objet sendToServer vers le serveur
const promise01 = fetch("http://localhost:3000/api/cameras/order", {
    method: "POST",
    body: JSON.stringify(sendToServer),
    headers: {
        "Content-type" : "application/json",
    },

});

console.log("prommise01");
console.log(promise01);
});

   
            //--Maintenir le contenu du localStorage dans les champs du formulaire
            //Prendre la key dans le local storage et la mettre dans une variable
            let dataLocalStorage = localStorage.getItem("contact");
            //Convertir la chaîne de caractère en objet javascript
            let dataLocalStorageObjet = JSON.parse(dataLocalStorage);
            //Mettre les values du localStorage dans le formulaire
            console.log(dataLocalStorageObjet);
            document.querySelector("#nom").value =  dataLocalStorageObjet.lastName;
            document.querySelector("#prenom").value =  dataLocalStorageObjet.firstName;
            document.querySelector("#adresse").value =  dataLocalStorageObjet.address;
            document.querySelector("#ville").value =  dataLocalStorageObjet.city;
            document.querySelector("#email").value =  dataLocalStorageObjet.mail;