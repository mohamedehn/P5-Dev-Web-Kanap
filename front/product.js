// Récupération de la châine de requête dans l'URL
let params = new URLSearchParams (document.location.search)
let id = params.get("id")

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
  let imgProduct = document.getElementsByClassName("item__img");
  const afficherImgProduct = product.imageUrl;
  imgProduct.src = afficherImgProduct;
  let titleProduct = document.getElementById("title");
  titleProduct.textContent = product.name;
  let descriptionProduct = document.getElementById("description");
  descriptionProduct.textContent = product.description;
}

let panier = localStorage.setItem('panier',JSON.stringify([2,3,4,5]))
console.log(panier);