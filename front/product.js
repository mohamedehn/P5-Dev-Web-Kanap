// Récupération de la châine de requête dans l'URL
let params = new URLSearchParams (document.location.search)
let id = params.get("id")

// Récupération de l'ID d'un produit ainsi que le détails de chaque produit
getDetailProduct(id)

function getDetailProduct(productId){
    fetch ('http://localhost:3000/api/products/'+productId)
    .then (productSelection => productSelection.json())
    .then (info =>{
      console.log(info);
        createDetailProduct(info);
    })
      }

// Récupération du détail d'un produit de la page d'accueil sur la page produit.
function createDetailProduct(product){
  const img = document.createElement("img");
  const afficherImg = product.imageUrl;
  img.src = afficherImg;
  let itemImg = document.querySelector(".item__img");
  itemImg.appendChild(img);
  let titleProduct = document.getElementById("title");
  titleProduct.textContent = product.name;
  let descriptionProduct = document.getElementById("description");
  descriptionProduct.textContent = product.description;
  let price = document.getElementById("price")
  price.textContent = product.price
  let couleur = document.getElementById("colors");
  for(choice = 0 ; choice < product.colors.length; choice++){
    let choiceColors = document.createElement("option");
    choiceColors.textContent = product.colors[choice]
    couleur.appendChild(choiceColors);
  }
  
}

// Local Storage ----------------------
const addToCart = document.getElementById('addToCart');

/////////////////////////au click ajout au panier///////////////
if (addToCart != null){
addToCart.addEventListener('click', (e) => {
const valueColor = document.getElementById('colors').value; // récupération de la couleur choisie
const valueQuantity = document.getElementById('quantity').value; // récupération de la quantité choisie

// Contrôle si les choix sont définis et renvoi d'une alerte dans le cas contraire (réalisé avec if et else if afin d'avoir un double contrôle sur la quantité et la couleur). Les deux propriétés doivent être correctement saisies.
if (valueColor == '') {
alert('Veuiller choisir une couleur'); // si couleur non selectionnée on revoir une alerte erreur
} 
else if (valueQuantity <= 0 || valueQuantity > 100) {
alert('Veuillez choisir une quantité entre 1 et 100'); // si quantité mal selectionnée, afin de respecter la tranche de 1 à 100
} 
else{
// On récupère le panier si déjà présent dans le local storage
//let panier = JSON.parse(localStorage.getItem('panier'));

//Ajout du produit choisi dans le local storage avec la variable "choiceProduct"
const choiceProduct = [
  id = id,
  color = valueColor,
  quantity = Number (valueQuantity),
];
 // On place les produits dans le local storage
 localStorage.setItem('panier', JSON.stringify(choiceProduct))
}

// if (productInStorage) {
// //Ensuite on controle si l'article est présent dans le panier afin d'ajouter uniquement la quantité et non le produit une nouvelle fois
// const getProductStorage = productInStorage.find((p) => p.id == choiceProduct.id && p.color == choiceProduct.color);
// // Si le produit déja présent dans le panier
// if (getProductStorage) {
// getProductStorage.quantity = getProductStorage.quantity + choiceProduct.quantity;
// localStorage.setItem('panier',JSON.stringify(productInStorage));
// alert('Le panier est à jour');
// window.location.reload();
// return;
// }
// productInStorage.push(choiceProduct);
// localStorage.setItem('panier', JSON.stringify(productInStorage));
// // Sinon on créer un panier par le biais d'un tableau vide que l'on va incrémenter du produit choisi
// } else {
// productInStorage = [];
// productInStorage.push(choiceProduct);
// localStorage.setItem('panier', JSON.stringify(productInStorage));
// alert("L'article a été ajouté au panier");
// window.location.reload();
// }
//}

// else {

// // Récupération du panier si présent dans le localstorage
// productInStorage = JSON.parse(localStorage.getItem('panier'));

})
};



//--------------------------------------------------


//let panier = localStorage.setItem('panier',JSON.stringify())

// // Ajout d'un produit dans le panier
// function saveProduct(panier){
//   localStorage.setItem("panier", JSON.stringify(panier))
// }

// function getProduct(){
//   let panier = localStorage.getItem("panier")
//   if(panier == null){
//     return []; // on retourne un tableau vide si le panier est vide
//   }else{
//     return JSON.parse(panier)
//   }
// }

// function addProduct(choosenProduct){
//   let panier = getProduct(); // Permet de stocker dans le local storage le produit choisi
//   let foundProduct = panier.find(p => p.id == choosenProduct.id); // On recherche dans le panier si le produit est déjà existant.
//   if(foundProduct != undefined){
//     foundProduct.quantity++ // Si c'est différend de undefined c'est que le produit est présent, alors on ajoute +1
//   }
//   else{   // En revanche si le produit n'est pas présent on le définira à 1
//     choosenProduct.quantity = 1;
//     panier.push(choosenProduct);
//   }
//   saveProduct(panier);
// }

// // Fonction permettant de retirer un produit du panier
// function removeFromePanier (choosenProduct){
//   let panier = getProduct();
//   panier = panier.filter(p => p.id != choosenProduct.id)
// }

// // Fonction pour changer la quantité d'un produit
// function changeQuantity(choosenProduct, quantity){
//   let foundProduct = panier.find(p => p.id == choosenProduct.id); // On recherche dans le panier si le produit est déjà existant.
//   if(foundProduct != undefined){
//     foundProduct.quantity += quantity; // Si c'est différend de undefined c'est que le produit est présent, alors on modifie la quantité 
//     if(foundProduct.quantity <= 0){ // Si la quantité est à 0, la fonction nous permet de retirer du panier le produit
//       removeFromePanier(foundProduct)
//     }
//   } else{
//     saveProduct(panier)
//   }
// }

// // Evènement pour enregistrer le produit et les caractéristiques choisis dans le panier
// let addToCart = document.getElementById("addToCart")

// addToCart.addEventListener("click", () =>{
//   let panier = []
//   let valueCouleur = document.getElementById("colors").value;
//   valueCouleur.addEventListener('select', x =>{
//   if (valueCouleur === ""){
//     alert("Veuillez sélectionner une couleur");
//   }
//   else{
//     const choixCouleur = [
//       id = value._id,
//       colors = valueCouleur,
//       addProduct(choixCouleur),
//     ]
//   }
// })
//   let quantity = document.getElementById("quantity")
//   addProduct(ajouterProduit)
// })

// Evènement pour écouter la couleur choisi
// let couleur = document.getElementById("colors");
// couleur.addEventListener('select', x =>{
//   if (couleur.value === ""){
//     alert("Veuillez sélectionner une couleur");
//   }
//   else{
//     const choixCouleur = [
//       id = productId,
//       couleur = couleur.value,
//       addProduct(choixCouleur),
//     ]
//   }
// })


// let panier = localStorage.setItem('panier',JSON.stringify())
// console.log(panier);

// addToCart.addEventListener('click', function ajoutPanier(addPanier){
//   id = id;
//   quantity = document.getElementById("quantity");
//   quantity = addPanier.quantity;
//   couleurProduit = document.getElementById("colors");
//   couleurProduit = addPanier.colors;
// })
// console.log(ajoutPannier(addPanier));