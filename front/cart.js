let monPanier = JSON.parse(localStorage.getItem('panier'));
 
//Si le client clique quand même sur le bouton commander, on lui rappelle que le panier est vide avec un message pop-up
 boutonCommander = document.getElementById('order')
 boutonCommander.addEventListener("click", ()=>{
    if (ifBasketEmpty()){
        alert("Votre panier est vide !");
     }else{
        if (!checkValueFirstName || !checkValueLastName || !checkValueAddress || !checkValueCity || !checkValueEmail){
            alert("Merci de renseigner tous les champs du formulaire")
        }else{
            // Appelle de la fonction permettant de passer la commande
            postOrder()
        }
    }
 });

// Création d'un panier sous forme d'array vide 
let contenuPanier = []
showListBasket()

//_________Affichage des produits du LocalStorage_________
/*
*/
function showListBasket(){ 
    fetch("http://localhost:3000/api/products")
    .then(reponse => reponse.json())
    .then(data => {
        console.log(data)
        let totalPrice = 0 // On définit le prix total
        let totalQuantity = 0 // On définit la quantité total
// on récupère la couleur, la quantité et l'id de tous les produits contenus dans le localstorage et on les met dans des variables. Pour ce faire on créer une boucle for afin d'atteindre tous les produits présent dans le localstorage
        for(let i = 0; i < monPanier.length; i++){
            let colorPanier = monPanier[i].color;
            let idPanier = monPanier[i].id;
            let quantityPanier = monPanier[i].quantity;
            totalQuantity += quantityPanier;
//on ne récupère que les données des canapés dont _id (de l'api) correspondent à l'id dans le localStorage
            const contenuPanier = data.find((element) => element._id === idPanier);

// Récupération du prix de chaque produit que l'on met dans une variable priceProductPanier
            priceProductPanier = contenuPanier.price;
            totalPrice += priceProductPanier;
//----Création ci-dessous des éléments html manquants de la page cart.html, dans la <section id="cart__items"> avec les informations des produits stockés dans le localstorage----

            const cartProduct = document.getElementById("cart__items");
//-------------------------Création de la balise article avec comme classe cart__item----------
            let article = document.createElement('article');
            article.setAttribute("class","cart__item");
            article.setAttribute("data-id",`${idPanier}`);
            article.setAttribute("data-color",`${colorPanier}`);
            cartProduct.appendChild(article);
//----------------------------------Création de la div avec pour classe cart__item__img------------
            let divImg = document.createElement('div');
            divImg.setAttribute("class", "cart__item__img");
            article.appendChild(divImg);
//--------------------------Création de la balise image qui contiendra la photo de chaque canapé------------
            let img = document.createElement('img');
            img.setAttribute("src", contenuPanier.imageUrl);
            img.setAttribute("alt", contenuPanier.altTxt);
            divImg.appendChild(img);
//--------------------------------Création de la div avec pour classe cart__item__content---------------
            let divContent = document.createElement('div');
            divContent.setAttribute("class", "cart__item__content");
            article.appendChild(divContent);   

//----------------------------Création de la div avec pour classe cart__item__content__description------------
            let divContentDescription = document.createElement('div');
            divContentDescription.setAttribute("class", "cart__item__content__description");
            divContent.appendChild(divContentDescription);

//-------------------Création d'une balise titre h2 qui indique le nom du produit choisi par l'utilisateur--------------
            let h2 = document.createElement('h2');
            h2.innerText = contenuPanier.name;
            divContentDescription.appendChild(h2);

//--------------------Création d'une balise p qui indique la couleur choisie par l'utilisateur-------------
            let pColor = document.createElement('p');
            pColor.innerText = colorPanier;
            divContentDescription.appendChild(pColor);

//--------------------------Création d'une balise p qui indique le prix du canapé----------
            let pPrice = document.createElement('p');
            pPrice.innerText = contenuPanier.price + " €";
            divContentDescription.appendChild(pPrice);

//------------------------Création de la div avec pour classe cart__item__content__settings------
            let divContentSettings = document.createElement('div');
            divContentSettings.setAttribute("class", "cart__item__content__settings");
            divContent.appendChild(divContentSettings);

//--------------------Création de la div avec pour classe cart__item__content__settings__quantity----------
            let divContentSettingsQuantity = document.createElement('div');
            divContentSettingsQuantity.setAttribute("class", "cart__item__content__settings__quantity");
            divContentSettings.appendChild(divContentSettingsQuantity);

//----------------Création d'une balise p qui indique le texte "Qté :"--------
            let pQuantity = document.createElement('p');
            pQuantity.innerText = "Qté :";
            divContentSettingsQuantity.appendChild(pQuantity);

//------------Création d'une balise input avec la classe "itemQuantity" qui permet de modifier la quantité-------
            let pInput = document.createElement('input');
            pInput.setAttribute("type", "number");
            pInput.setAttribute("class", "itemQuantity");
            pInput.setAttribute("name", "itemQuantity");
            pInput.setAttribute("min", "1");
            pInput.setAttribute("max", "100");
            pInput.setAttribute("value", `${quantityPanier}`);
            divContentSettingsQuantity.appendChild(pInput);

//------------------Création de la div avec pour classe cart__item__content__settings__delete--------
            let divContentSettingsDelete = document.createElement('div');
            divContentSettingsDelete.setAttribute("class", "cart__item__content__settings__delete");
            divContentSettings.appendChild(divContentSettingsDelete);

//------------------------Création d'une balise p qui indique le prix du canapé----------
            let pDelete = document.createElement('p');
            pDelete.setAttribute("class", "deleteItem");
            pDelete.innerText = "Supprimer";
            divContentSettingsDelete.appendChild(pDelete);
    }
    let prixTotal = document.querySelector('#totalPrice')
    prixTotal.textContent = totalPrice;

    let totalQuantite = document.querySelector('#totalQuantity')
    totalQuantite.textContent = totalQuantity;
}) 
}

//--------------Si le panier est vide (le localStorage est vide ou le tableau qu'il contient est vide), on affiche "Le panier est vide"--
function ifBasketEmpty(){
    return (monPanier === null || monPanier.length === 0)
}

// Fonction permettant de passer la commande

function postOrder (){
    let infoUser = {
        firstName : inputFirstName.value,
        lastName : inputLastName.value,
        address : inputAddress.value,
        city : inputCity.value,
        email : inputEmail.value
    }
    let order = {
        contact : infoUser,
        products : JSON.parse(localStorage.getItem('panier')).map(element =>element.id)
    }
    fetch("http://localhost:3000/api/products/order",{
        method : 'POST',
        headers : {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body : JSON.stringify(order)
    })
    .then(response => response.json())
    .then((info) =>{
        window.location.href = "confirmation.html?orderId="+info.orderId
    }).catch(erreur => console.log(erreur))
}

//___________________________________Contrôle des infos avec Regex et Récupération des données du formulaire____________________________________
    
//Création des expressions régulières pour contrôler les infos entrées par l'utilisateur
let textRegex = new RegExp("^[^.?!:;,/\\/_-]([. '-]?[a-zA-Zàâäéèêëïîôöùûüç])+[^.?!:;,/\\/_-]$");
let addressRegex = new RegExp("^[^.?!:;,/\\/_-]([, .:;'-]?[0-9a-zA-Zàâäéèêëïîôöùûüç])+[^.?!:;,/\\/_-]$");
let emailRegex = new RegExp("^[^. ?!:;,/\\/_-]([._-]?[a-z0-9])+[^.?!: ;,/\\/_-][@][a-z0-9]+[.][a-z][a-z]+$");

//Récupération du formulaire client et mise en variable
let inputFirstName = document.getElementById('firstName');
let inputLastName = document.getElementById('lastName');
let inputAddress = document.getElementById('address');
let inputCity = document.getElementById('city');
let inputEmail = document.getElementById('email');
//Déclaration des variables pour vérifier la bonne valeur des champs du formulaire
let checkValueFirstName;
let checkValueLastName;
let checkValueAddress;
let checkValueCity;
let checkValueEmail;  
// Ecoute du contenu du champ "prénom", Vérification du prénom et affichage d'un message si celui-ci n'est pas correct
inputFirstName.addEventListener('change', function() {
    let firstNameErrorMsg = inputFirstName.nextElementSibling;
    checkValueFirstName = textRegex.test(inputFirstName.value);
    if (checkValueFirstName) {
        firstNameErrorMsg.innerText = '';
        errorFormulaireFirstName = false;
    } 
    else {
        firstNameErrorMsg.innerText = 'Veuillez indiquer un prénom.';
        errorFormulaireFirstName = true;
        }
    });

// Ecoute du contenu du champ "nom", Vérification du nom et affichage d'un message si celui-ci n'est pas correct
inputLastName.addEventListener('change', function() {
    let lastNameErrorMsg = inputLastName.nextElementSibling;
    checkValueLastName = textRegex.test(inputLastName.value);
    if (checkValueLastName) {
        lastNameErrorMsg.innerText = '';
        errorFormulaireLastName = false;
    }
    else {
        lastNameErrorMsg.innerText = 'Veuillez indiquer un nom de famille.';
        errorFormulaireLastName = true;
        }
    });

// Ecoute du contenu du champ "adresse", Vérification de l'adresse et affichage d'un message si celle-ci n'est pas correcte
inputAddress.addEventListener('change', function() {
    let addressErrorMsg = inputAddress.nextElementSibling;
    checkValueAddress = addressRegex.test(inputAddress.value);
    if (checkValueAddress) {
        addressErrorMsg.innerText = '';
        errorFormulaireAddress = false;
    }
    else {
        addressErrorMsg.innerText = 'Veuillez indiquer une adresse.';
        errorFormulaireAddress = true;
        }
    });

// Ecoute du contenu du champ "ville", Vérification de la ville et affichage d'un message si celle-ci n'est pas correcte
inputCity.addEventListener('change', function() {
    let cityErrorMsg = inputCity.nextElementSibling;
    checkValueCity = textRegex.test(inputCity.value);
    if (checkValueCity) {
        cityErrorMsg.innerText = '';
        errorFormulaireCity = false;
    } else {
        cityErrorMsg.innerText = 'Veuillez indiquer le nom d\'une ville.';
        errorFormulaireCity = true;
        }
    });

// Ecoute du contenu du champ "email", Vérification de l'email et affichage d'un message si celui-ci n'est pas correct
inputEmail.addEventListener('change', function() {
    let emailErrorMsg = inputEmail.nextElementSibling;
    checkValueEmail = emailRegex.test(inputEmail.value);
    if (checkValueEmail) {
        emailErrorMsg.innerText = '';
        errorFormulaireEmail = false;
    }
    else {
        emailErrorMsg.innerText = 'Veuillez renseigner un email correct.';
        errorFormulaireEmail = true;
        }
    });

// Ecoute du bouton "supprimer"
pDelete.addEventListener('click', () => {
    
})