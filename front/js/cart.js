 //Si le client clique quand même sur le bouton commander alors que le panier est vide, on lui rappelle que le panier est vide avec un message pop-up. Pour ce faire on ajoute un évènement clique sur le bouton commander
 boutonCommander = document.getElementById('order')
 boutonCommander.addEventListener("click", ()=>{
     // Condition avec if et appel d'une fonction ifBasketEmpty (si le panier est vide) + message d'alerte le cas échéant
    if (ifBasketEmpty()){
        alert("Votre panier est vide !");
        // Sinon on vérifie que tous les champs sont renseignés
    }else{
        // On vérifie que tous les champs sont correctement renseignés avec une condition et l'inverse des variables permettant de confirmer la bonne complétude des informations + déclenchement d'une alerte le cas contraire  - sinon (else) on passe la commande
        if (!checkValueFirstName || !checkValueLastName || !checkValueAddress || !checkValueCity || !checkValueEmail){
            alert("Merci de renseigner tous les champs du formulaire")
        }else{
            // Appelle de la fonction permettant de passer la commande
            postOrder()
        }
    }
});

// Création d'un panier sous forme d'array vide et appelle de la fonction permettant d'afficher dans le DOM de la page panier les produits présents dans le local storage
let contenuPanier = []
showListBasket()

//_________Affichage des produits du LocalStorage_________
/*
*/
function showListBasket(){
    // On récupère le panier stocké dans le localStorage 
    let monPanier = JSON.parse(localStorage.getItem('panier'));
    // Boucle avec while qui permet de supprimer tous les enfants dans le DOM lors de l'écoute du bouton supprimer sur un produit issu du panier (indiqué plus loin dans la fonction).
    const myNode = document.querySelector("#cart__items");
    while (myNode && myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    // On récupère les informations depuis l'API du backend
    fetch("http://localhost:3000/api/products")
    // On transforme la répons en format JSON
    .then(reponse => reponse.json())
    .then(data => {
        console.log(data)
        let totalPrice = 0 // On définit le prix total de départ à 0
        let totalQuantity = 0 // On définit la quantité total de départ à 0
        // On récupère la couleur, la quantité et l'id de tous les produits contenus dans le localstorage et on les met dans des variables. Pour ce faire on créer une boucle for afin d'atteindre tous les produits présent dans le localstorage
        for(let i = 0; i < monPanier.length; i++){
            let colorPanier = monPanier[i].color;
            let idPanier = monPanier[i].id;
            let quantityPanier = monPanier[i].quantity;
            // On additione dans totalQuantity toutes les quantités présentes dans le panier.
            totalQuantity += quantityPanier;
            // On ne récupère que les données des canapés dont _id (de l'api) correspondent à l'id dans le localStorage. Data.find correspond à l'ensemble des produits issu du serveur. L'élément permet ensuite de n'afficher que les produits déjà présent dans le localstorage.
            const contenuPanier = data.find((element) => element._id === idPanier);
            
            // On additionne à totalPrice, le prix de chaque produit présent dans le localstorage multiplié par la quantité de produits.
            totalPrice += contenuPanier.price * quantityPanier;
            
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
            
            //------------Création d'une balise input avec la classe "itemQuantity" qui permet de modifier la quantité + ajout de l'écoute permettant de modifier la quantité en récupérant la couleur et l'ID afin de modifier le local storage grâce à "change".
            let pInput = document.createElement('input');
            pInput.setAttribute("type", "number");
            pInput.setAttribute("class", "itemQuantity");
            pInput.setAttribute("name", "itemQuantity");
            pInput.setAttribute("min", "1");
            pInput.setAttribute("max", "100");
            pInput.setAttribute("value", `${quantityPanier}`);
            // Ecoute de l'input en cas de changement de la quantité à l'aide d'une fonction modifyQuantity
            pInput.addEventListener("change", ($event) =>{
                modifyQuantity($event, idPanier, colorPanier)
            })
            divContentSettingsQuantity.appendChild(pInput);
            
            //------------------Création de la div avec pour classe cart__item__content__settings__delete--------
            let divContentSettingsDelete = document.createElement('div');
            divContentSettingsDelete.setAttribute("class", "cart__item__content__settings__delete");
            divContentSettings.appendChild(divContentSettingsDelete);
            
            //-----------Création d'une balise p qui permet de supprimer l'article + ajout de l'écoute (on récupère l'ID et la couleur du produit et on la supprime du local storage)----------
            let pDelete = document.createElement('p');
            pDelete.setAttribute("class", "deleteItem");
            pDelete.innerText = "Supprimer";
            // Ecoute du bouton supprimer avec en paramètre l'idPanier et colorPanier afin de supprimer du localStorage le produit concerné.
            pDelete.addEventListener("click", () =>{
                deleteProduct(idPanier, colorPanier)
            }); 
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
    // Objet permettant de collecter les valeurs renseignées dans les champs du formulaire
    let infoUser = {
        firstName : inputFirstName.value,
        lastName : inputLastName.value,
        address : inputAddress.value,
        city : inputCity.value,
        email : inputEmail.value
    }
    // Déclaration d'un objet contenant en contact les informations collectés avec l'objet "infoUser" et les produits du panier avec "products"
    let order = {
        contact : infoUser,
        products : JSON.parse(localStorage.getItem('panier')).map(element =>element.id) // Utilisation de map pour parcourir tout les produits de l'API et ne récupérer que ceux ayant le même id que les éléments du panier. On les stocks dans "products"
    }
    // On indique la méthode d'envoi des données et on les envois à l'API
    fetch("http://localhost:3000/api/products/order",{
    method : 'POST',
    headers : {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body : JSON.stringify(order)
})
.then(response => response.json())
// On redirige vers la page de confirmation de commande en passant l'orderId (numéro de commande) dans l'URL (que nous utiliserons ensuite dans la page confirmation.js)
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

//Fonction Suppression d'un article du panier--------------------------------------------------

function deleteProduct(idProduct, colorProduct) {
    //console.log("L'id du produit a supprimé est:",idProduct, "La couleur du produit a supprimé est :", colorProduct);
    // On récupère les informations présents dans le panier
    let monPanier = JSON.parse(localStorage.getItem('panier'));
    
    //Je parcours et je supprime ce qui est présent dans ma condition. Ce qui créer un nouveau tableau avec les produits que l'ont veut conserver, pour ce faire nous utiliserons forEach
    let newBasket = [];
    monPanier.forEach((element)=>{
        // On vérifie que chaque élément que l'on veut conserver ont un id et une couleur différente de celle sur laquelle nous avons cliqué sur le bouton "supprimer".
        if((element && (element.id != idProduct)) || (element && (element.color != colorProduct)))
        newBasket.push (element) 
    })
    // On supprimer tout ce qu'il y a dans le localstorage et on charge ensuite le nouveau tableau avec les articles que l'on conserve, ensuite on fait appel à notre fonction permettant de montrer les articles présents dans la panier.
    localStorage.clear();
    localStorage.setItem("panier", JSON.stringify(newBasket));
    showListBasket()
}

// Fonction pour modifier la quantité d'un article présent dans le panier avec comme paramètre $event, l'id et la couleur de l'article ------
function modifyQuantity($event, idPanier, colorPanier){
    //console.log('Ecoute de la fonction modifyQuantity, la valeur est : ',$event.target.value, $event);
    //console.log('Ecoute de id et color : ', idPanier, colorPanier);
    const quantity = JSON.parse($event.target.value)
    // On vérifie que la quantité modifié est bien comprise entre 1 et 100. Si ce n'est pas le cas on affiche un message d'erreur et on réactualise le panier avec la fonction showlistBasket
    if (quantity <= 0 || quantity > 100 || !Number.isInteger(quantity)) {
        alert('Veuillez choisir une quantité entre 1 et 100'); // si quantité mal selectionnée, afin de respecter la tranche de 1 à 100
        showListBasket();
    }else{
        //Ajout de l'article choisi dans le local storage avec la variable "article"
        let article = {
            id : idPanier,
            color : colorPanier,
            quantity : Number(quantity),
        };
        // On récupère le panier si déjà présent dans le local storage
        let panier = JSON.parse(localStorage.getItem('panier'))
        let quantityGreater100 = false;
        //à l'aide de map on va parcourir l'ensemble des éléments présent dans le panier (localStorage) et ainsi créer et retourner un nouveau tableau qui comprendra le resultat de la fonction ci-dessous pour chaque élément du tableau
        panier = panier.map((element)=>{
            if(element.id === article.id && element.color === article.color){
                if(article.quantity > 100){
                    quantityGreater100 = true
                    return element
                }
                element.quantity = article.quantity
                return element;
            }else{
                return element
            }
        })
        localStorage.setItem("panier", JSON.stringify(panier));
        if (quantityGreater100){
            alert("La quantité du produit existante dans le panier est supérieur à 100, merci de modifier votre quantité");
        }
        showListBasket();
    }
}



