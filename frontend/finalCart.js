let products = document.getElementById('products');
let totalCart = document.getElementById('cart-total-price');
let quantityInput = document.getElementsByClassName('cart-quantity-input');
let total = 0;
// -- récupération des articles dans le localStorage et tout mettre dans panier
let panier = JSON.parse(localStorage.getItem('productList'));
console.log(panier);

if(panier === null || panier == 0 ){
    //Html panier vide
    products.innerHTML = `
        <div class="emptycard">
        <iframe src="https://giphy.com/embed/26hkhPJ5hmdD87HYA" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/kitchen-looney-tunes-empty-26hkhPJ5hmdD87HYA"></a></p>
        <p class="textempty">Votre panier est vide</p>
        </div>`;
} else {
    panier.forEach(element => {
    console.log(element);
    products.innerHTML += `
    <div class="card-cart">
        <div class="cardimage">
            <img alt="${element.name}" class="imageCard" src="${element.image}">
        </div>
        <div class="cardtext">
            <a href="product.html?id=${element.idCamera}"><p>${element.name}</p></a>
            <p class="text">Quantité : ${element.quantity}</p>
            <p class="text">Objectifs : ${element.lens}</p>
        </div>
        <div class="price">
            <p>Prix : ${element.totalPrice}<span>€</span></p>
        </div>
        <div class="buttonx">    
            <button id="${element.id}" class="btn btn-del btn-X" type="button">X</button>
        </div>
    </div>`;

});
};
deletearticle();
totalCount();

//Suppression article
function deletearticle() {
    let btnremove = document.querySelectorAll(".btn-del");
    for (let a = 0; a < btnremove.length; a++){
        btnremove[a].addEventListener("click" , (event) =>{
            event.preventDefault(); //pour éviter que le click sur le bouton supprimer ne recharge la page        
            let removeId = {"id":panier[a].idCamera, "lens":panier[a].lens};
            console.log("removeId");
            console.log(removeId);
            if (panier[a].id == removeId.id && panier[a].lens == removeId.lens) {
                return panier[a];
            }
            console.log(panier[a]);
            //supprimer du tableau l'élément d'index a et lui seul
            panier.splice(a, 1);
            console.log(panier);
            //on envoie la variable dans le local Storage pour le mettre à jour
            //transformation en format JSON et envoie dans la key "productList" du localStorage
            localStorage.setItem("productList", JSON.stringify(panier));

            //avertir que le produit a été supprimé et rechargement de la page
            alert("Confirmation de la suppression de cet article");
            window.location.href = "cart.html";
            totalCount();
        })
    }   
}

// Prix total du panier;
function totalCount() {
    for (let i in panier) {
        total += panier[i].price * panier[i].quantity;
    }
    console.log(total);
    totalCart.textContent = total  + ' €';
}

const url = 'http://localhost:3000/api/cameras/order';


// Fonction du formulaire et informations récupérées
function form() {
    if (panier == null || panier.length == 0) {
        let disableBtn = document.querySelector('#btn-validation');
        disableBtn.setAttribute('disabled', "");
    } else {
        let disableBtn = document.querySelector('#btn-validation');
        disableBtn.removeAttribute('disabled', "");
        document.forms["commande"].addEventListener("submit", function (e) {
            e.preventDefault();
            let products = [];
            for (i = 0; i < panier.length; i++) {
                let productId = panier[i].idCamera;
                products.push(productId);
            }

            // RegExp pour la validation via JS.
            let valueForm = new FormData(document.getElementById('formulaire-validation'));
            let nameFormat = new RegExp(/^[A-Za-z àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ \s]{1,}/);
            let addressFormat = new RegExp(/[A-Za-z àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ 0-9\s]{5,}/);
            let zipFormat = new RegExp(/[0-9]{5}/);
            let cityFormat = new RegExp(/[A-Za-z àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ\s]{2,}/);
            let emailFormat = new RegExp(/[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/);
            var error_message = document.getElementById("error-message");
            var text;

            if (nameFormat.test(valueForm.get("firstName")) && nameFormat.test(valueForm.get('lastName')) && addressFormat.test(valueForm.get('address')) 
                && zipFormat.test(valueForm.get('zip')) && cityFormat.test(valueForm.get('city')) && emailFormat.test(valueForm.get('email'))) {
                // si le formulaire est bien renseigné pas de message d'erreur
                text = "";
                error_message.innerHTML = text;

                let contact = {
                    firstName: valueForm.get('firstName'),
                    lastName: valueForm.get('lastName'),
                    address: valueForm.get('address'),
                    zip: valueForm.get('zip'),
                    city: valueForm.get('city'),
                    email: valueForm.get('email'),
                };
                console.log(contact); // récupération des informations du formulaire sous forme d'objet
                console.log(products); // récupération des Id des différents produits sous forme de tableau

                const cart = { contact, products };

                sendData(url, cart);
                console.log(url, cart);

                // Si un champ du formulaire est mal renseigné, renvoi d'un message d'erreur
            } else if (nameFormat.test(valueForm.get("firstName")) == false) {
                text = "Merci d'entrer un prénom valide";
                error_message.innerHTML = text;
            } else if (nameFormat.test(valueForm.get("lastName")) == false) {
                text = "Merci d'entrer un nom valide";
                error_message.innerHTML = text;
            } else if (addressFormat.test(valueForm.get('address')) == false) {
                text = "Merci d'entrer une adresse valide";
                error_message.innerHTML = text;
            } else if (zipFormat.test(valueForm.get('zip')) == false) {
                text = "Merci d'entrer un code postal valide";
                error_message.innerHTML = text;
            } else if (cityFormat.test(valueForm.get('city')) == false) {
                text = "Merci d'entrer un nom de ville valide";
                error_message.innerHTML = text;
            } else if (emailFormat.test(valueForm.get('email')) == false) {
                text = "Merci d'entrer une adresse valide";
                error_message.innerHTML = text;
            }
        });
    };
};

form();

// Fonction envoie de données au serveur 
function sendData(url, cart) {
    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(cart)

    }).then(function (response) {
        return response.json();

    }).then(function (data) {
        localStorage.setItem('commande', JSON.stringify(data));
        document.location = 'confirmation.html';
        alert('Votre commande à bien été validée !')

    }).catch(function (error) {
        console.log("Erreur", error);
    })
};