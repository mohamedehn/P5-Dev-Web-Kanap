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
/////////////////////////Au click "ajout au panier" ///////////////
addToCart.addEventListener('click', () => {
const valueColor = document.getElementById('colors').value; // récupération de la couleur choisie
let valueQuantity = document.getElementById('quantity').value; // récupération de la quantité choisie

// Contrôle si les choix sont définis et renvoi d'une alerte dans le cas contraire (réalisé avec if et else if afin d'avoir un double contrôle sur la quantité et la couleur). Les deux propriétés doivent être correctement saisies.
if (valueColor == '') {
alert('Veuiller choisir une couleur'); // si couleur non selectionnée on revoir une alerte erreur
} 
else if (valueQuantity <= 0 || valueQuantity > 100) {
alert('Veuillez choisir une quantité entre 1 et 100'); // si quantité mal selectionnée, afin de respecter la tranche de 1 à 100
} 
else{
//Ajout de l'article choisi dans le local storage avec la variable "article"
let article = {
  id : id,
  color : valueColor,
  quantity : Number (valueQuantity),
};
alert("L'article a bien été ajouté au panier")
// On récupère le panier si déjà présent dans le local storage
let panier = JSON.parse(localStorage.getItem('panier'))

// Si le panier n'est pas vide, on va vérifier les ID présents et les couleurs afin d'incrémenter la quantité à défaut nous ajouterons l'article dans le panier
if (panier != null) {  
  console.log('Ici nous avons la valeur de :', article, panier);
  let flag = false;
  panier = panier.map((element)=>{
    if(element.id === article.id && element.color === article.color){
      element.quantity = article.quantity + element.quantity
      flag = true
      return element;
    }else{
      return element
    }
  })
  localStorage.setItem("panier", JSON.stringify(panier));
  if(!flag) {
    console.log("L'article n'existe pas dans le panier");
    panier.push(article);
    localStorage.setItem("panier", JSON.stringify(panier));
  }
}
//S'il n'y a pas d'articles dans le local storage on crée un tableau vide auquel nous ajouterons l'article.
else {
  panier = [];
  panier.push(article);
  localStorage.setItem("panier", JSON.stringify(panier));
  console.log(panier);
  alert("L'article a bien été ajouté au panier")
}

//window.location.href = "cart.html" --> lien vers le panier
}
});

