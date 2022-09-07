let monPanier = JSON.parse(localStorage.getItem('panier'));
console.log(monPanier);

// Création d'un panier sous forme d'array vide 
let contenuPanier = []

//_________Affichage des produits du LocalStorage_________

//--------------Si le panier est vide (le localStorage est vide ou le tableau qu'il contient est vide), on affiche "Le panier est vide"--
if(monPanier === null || monPanier.length === 0){
    //Si le client clique quand même sur le bouton commander, on lui rappelle que le panier est vide avec un message pop-up
    boutonCommander = document.getElementById('order')
    boutonCommander.addEventListener("click", ()=>{
        alert("Votre panier est vide !");
    });
}
else{
fetch("http://localhost:3000/api/products")
    .then(reponse => reponse.json())
    .then(data => {
        console.log(data)

// on récupère la couleur, la quantité et l'id de tous les produits contenus dans le localstorage et on les met dans des variables. Pour ce faire on créer une boucle for afin d'atteindre tous les produits présent dans le localstorage
        for(let i = 0; i < monPanier.length; i++){
            let colorPanier = monPanier[i].color;
            let idPanier = monPanier[i].id;
            quantityPanier = monPanier[i].quantity;
      
//on ne récupère que les données des canapés dont _id (de l'api) correspondent à l'id dans le localStorage
            const contenuPanier = data.find((element) => element._id === idPanier);

// Récupération du prix de chaque produit que l'on met dans une variable priceProductPanier
            priceProductPanier = contenuPanier.price;

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
    }}) 
}



// const panier = [
// {
//     id : id,
//     color : localStorage.color,
//     quantity : localStorage.quantity,
// }
// ]
