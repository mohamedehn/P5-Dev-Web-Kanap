// Appelle de la fonction permettant de récupérer depuis l'API l'ensemble des produits
getAllProduct();

//Requête API pour récupérer l'ensemble des produits du site
function getAllProduct (){
  //Fetch permet de récupérer des ressources à travers le réseau de manière asynchrone
  fetch ('http://localhost:3000/api/products')
  // On retourne ensuite la réponse que l'on va convertir au format JSON.
  .then(function(response) {
    return response.json();
  })
  // On appelle ensuite la fonction qui nous permet de créer et d'insérer dans le DOM les produits
  .then(function(value) {
    createProduct(value)
  })
}

/*
Fonction qui permet d'insérer les différents produits dans le DOM de la page d'accueil. On crée une boucle avec for afin de parcourir l'ensemble des éléments de la liste des produits que l'on va passer en paramètre (listeDesProduits).
Ainsi pour chaque élément on va construire chaque partie de la page index.html et y intégrer les informations (id, name)
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




