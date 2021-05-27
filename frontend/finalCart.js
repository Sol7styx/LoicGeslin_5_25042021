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

    //--Vider entièrement le panier
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

// formulaire de contact

// déclaration des regex
let regexText = /^[A-Za-zçàêéèîïÀÊÉÈÎÏ\s-]{2,}$/;
let regexAddress = /^[A-Za-zçàêéèîïÀÊÉÈÎÏ0-9\s-]{2,}$/;
let regexMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9]+)*$/;

// récupération des champs du formulaire
let firstName = document.getElementById("firstname");
let lastName = document.getElementById("lastname");
let address = document.getElementById("address");
let city = document.getElementById("city");
let mail = document.getElementById("mail");

// fonction de validation du formulaire
function validateForm()
{
    // si un champ requis est manquant
    if(firstName.validity.valueMissing || lastName.validity.valueMissing || address.validity.valueMissing || city.validity.valueMissing || mail.validity.valueMissing)
    {
        let alert = document.getElementById("alert");
        alert.innerHTML = "Veuillez remplir tous les champs.";
        alert.style.color = "#FF0000";
        console.log("Missing value here");
        return false;
    }
    // si un champ est mal rempli
    else if(regexText.test(firstName.value) == false || regexText.test(lastName.value) == false || regexAddress.test(address.value) == false || regexText.test(city.value) == false || regexMail.test(mail.value) == false)
    {
        let alert = document.getElementById("alert");
        alert.innerHTML = "Veuillez remplir les champs correctement.";
        alert.style.color = "#FF0000";
        console.log("Wrong value here");
        return false;
    }
    else
    {
        let alert = document.getElementById("alert");
        alert.innerHTML = "Merci !";
        return true;
    }
};

// fonction de création de l'objet contact pour POST
function createContact()
{
    let contact = {
    firstName : firstName.value, 
    lastName : lastName.value, 
    address : address.value, 
    city : city.value, 
    email : mail.value
    };
    return contact;
}

// création du tableau de produits pour POST
let products = [];
products.push(productsCart);
console.log(products);
// fonction POST products et contact à l'API
function sendAndReceiveData(contact, products)
{
    let fetchPostPromise = fetch("http://localhost:3000/api/cameras/order",
    {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({contact, products})
    });
    fetchPostPromise.then(response =>
        {
            return response.json(); 
        }).then(backData => 
            {
            console.log("Numéro de commande :" + backData.orderId);
            localStorage.setItem("orderId", backData.orderId);
            });
    fetchPostPromise.catch(error => {
        console.log("Erreur lors de POST : " + error);
    });
};

// au clic sur le bouton d'envoi...

let sendInput = document.getElementById("btnForm");
sendInput.addEventListener('click', function(e)
{
    // ... validation du formulaire
    validateForm(); 
    e.preventDefault();
    // ... création d'un objet contact 
    if(validateForm()==true)
    {
    console.log("Formulaire validé");
    contact = createContact();
    console.log("Contact créé");
    // ... POST à l'API
    sendAndReceiveData(contact, products);
    // ... redirection page de commande
    setTimeout (function()
    {
        window.location.href = "confirmation.html"
    }, 500)
    }
    else
    {
        console.log("Formulaire non-validé");
    }
});