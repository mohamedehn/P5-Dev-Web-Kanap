
getAllProduct();

/* 
Requête API pour récupérer l'ensemble des produits du site
*/
function getAllProduct (){
  fetch ('http://localhost:3000/api/products')
  .then(function(response) {
      return response.json();
  })
  .then(function(value) {
    createProduct(value)
  })
}

/*
Fonction qui permet d'insérer les différents produits dans le DOM de la page d'accueil
*/
function createProduct (listeDesProduits){
        for (element of listeDesProduits) {
            const a = document.createElement("a");
            document.getElementById(`items`).appendChild(a);
            a.href = "product.html?id="+element._id;
            const article = document.createElement("article");
            a.appendChild(article);
            const productName = document.createElement("h3");
            article.appendChild(productName);
            productName.setAttribute('id','name');
            document.getElementById("name");
            productName.textContent = element.name;
            const img = document.createElement("img");
            const afficherImg = element.imageUrl;
            img.src = afficherImg;
            article.appendChild(img);
            const description = document.createElement("p");
            description.textContent = element.description;
            article.appendChild(description);
          }
        }
  

 

      