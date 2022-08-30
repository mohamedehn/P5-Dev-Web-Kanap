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

let panier = localStorage.setItem('panier',JSON.stringify([2,3,4,5]))
console.log(panier);
