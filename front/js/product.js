// Après avoir cliqué sur un produit présent dans la page d'accueil. Nous procédons à la récupération de la châine de requête dans l'URL grâce à URLSearchParams, que l'on va définir dans une variable "Params"
let params = new URLSearchParams (document.location.search)
// Utilisation de Params afin de récupérer l'ID présente dans l'URL
let id = params.get("id")

// Récupération de l'ID d'un produit ainsi que le détails de chaque produit grâce à l'appel de la fonction.
getDetailProduct(id)

function getDetailProduct(productId){
  //Fetch permet de récupérer des ressources à travers le réseau de manière asynchrone. On ajoute le paramètre +productId (correspondant à la variable "id") afin de récupérer uniquement les informations du produit concerné (grâce à Params et id utilisé plus haut)
  fetch ('http://localhost:3000/api/products/'+productId)
  //On retourne les informations du produit concerné au format JSON
  .then (productSelection => productSelection.json())
  .then (info =>{
    //console.log(info); - ce log permet de vérifier dans la console toutes les informations relatives au produit affiché
    //on appelle ensuite la fonction qui permet de créer le détail d'un produit et ainsi afficher dans le DOM toutes les informations nécessaire
    createDetailProduct(info);
  })
}

// Récupération du détail d'un produit de la page d'accueil sur la page produit avec création des éléments HTML et des informations récupéré depuis l'API. On insère un paramètre 'product'
function createDetailProduct(product){
  // Affichage de l'image (récupération depuis l'API et insértion dans la DIV présente dans le html)
  const img = document.createElement("img");
  const afficherImg = product.imageUrl;
  img.src = afficherImg;
  let itemImg = document.querySelector(".item__img");
  itemImg.appendChild(img);
  
  // Affichage du titre (on récupérer la balise html existante et on injecte le titre présent dans l'API)
  let titleProduct = document.getElementById("title");
  titleProduct.textContent = product.name;
  
  // Affichage de la description
  let descriptionProduct = document.getElementById("description");
  descriptionProduct.textContent = product.description;
  
  // Affichage du prix
  let price = document.getElementById("price")
  price.textContent = product.price
  
  // Affichage de la couleur avec une boucle for afin de proposer les différentes options possible. On définit une valeur 0 à choice et on parcours l'intégralité des couleurs présentes
  let couleur = document.getElementById("colors");
  for(choice = 0 ; choice < product.colors.length; choice++){
    let choiceColors = document.createElement("option");
    choiceColors.textContent = product.colors[choice]
    couleur.appendChild(choiceColors);
  }
}

/* Local Storage ---------------------- 
Ici on va s'occuper d'envoyer les informations dans le localStorage via le bouton "Ajouter au Panier"
Pour commencer on récupère le bouton avec getElementById
*/
const addToCart = document.getElementById('addToCart');
//On ajoute un évènement au clique "Ajouter au panier" ------------------
addToCart.addEventListener('click', () => {
  const valueColor = document.getElementById('colors').value; // récupération de la couleur choisie
  let valueQuantity = JSON.parse(document.getElementById('quantity').value); // récupération de la quantité choisie
  
  // Contrôle si les choix sont définis et renvoi d'une alerte dans le cas contraire (réalisé avec if et else if afin d'avoir un double contrôle sur la quantité et la couleur). Les deux propriétés doivent être correctement saisies, sinon on renvoi une alerte avec un message d'erreur.
  if (valueColor == '') {
    alert('Veuiller choisir une couleur'); // si couleur non selectionnée on renvoit une alerte avec le message précisé.
  } 
  else if (valueQuantity <= 0 || valueQuantity > 100 || !Number.isInteger(valueQuantity)) {
    alert('Veuillez choisir une quantité entre 1 et 100'); // si quantité mal selectionnée, afin de respecter la tranche de 1 à 100 (cela rend impossible de sélectionner une valeur négative). On bloque les virgules grâce à Number.isInteger, en mettant son contraire avec "!".
  } 
  else{
    //Si les conditions sont respectés, on ajoute l'article choisi dans le local storage avec la variable "article" et en récupérer l'id, la couleur choisie et la quantité
    let article = {
      id : id,
      color : valueColor,
      quantity : Number(valueQuantity),
    };
    // On récupère le panier si déjà présent dans le local storage en définissant une variable "panier"
    let panier = JSON.parse(localStorage.getItem('panier'))
    
    // Si le panier n'est pas vide, on va vérifier les ID présents et les couleurs afin d'incrémenter la quantité à défaut nous ajouterons l'article dans le panier
    if (panier != null) {  
      //console.log('Ici nous avons la valeur de :', article, panier);
      // On déclare une variable avec false (Flag), qui va nous permettre de valider ou non notre condition.
      let flag = false;
      // on déclare une variable où la quantité d'un produit serait supérieur à 100, dans ce cas la on renvoi un false également
      let quantityGreater100 = false;
      // à l'aide de map on va parcourir l'ensemble des éléments présent dans le panier (localStorage) et ainsi créer et retourner un nouveau tableau qui comprendra le resultat de la fonction ci-dessous pour chaque élément du tableau
      panier = panier.map((element)=>{
        // condition avec if afin de retrouver dans le panier si le produit existe déjà sur la base de sa couleur et de son id
        if(element.id === article.id && element.color === article.color){
          // le flag ici nous permet de déclarer un seconde condition
          flag = true
          // seconde condition qui permet de vérifier si la quantité présente + celle ajouté est supérieur à 100.
          if(article.quantity + element.quantity > 100){
            // si tel est le cas on renvoi l'élément sans changement
            quantityGreater100 = true
            return element
          }
          // si la quantité présente + ajouté est inférieur à 100, on incrémente
          element.quantity = article.quantity + element.quantity
          return element;
        }else{
          // si aucune correspondance on renvoi l'élément sans changement
          return element
        }
      })
      // on place le/les produits dans le localStorage
      localStorage.setItem("panier", JSON.stringify(panier));
      // on définit ensuite une alerte qui prévient le client qu'on ne peu pas ajouter son produit car la quantité totale dépasse 100 (entre la quantité présente et celle que l'on veut ajouter)
      if (quantityGreater100){
        alert("La quantité du produit existante dans le panier est supérieur à 100, merci de modifier votre quantité");
      }else{
        // sinon on lorsque l'article est ajouté on le confirme avec ce message
        alert("L'article a bien été ajouté au panier")
      }
      // condition inverse de flag que nous avions déclaré sur false. C'est-à-dire que si l'article n'existe pas dans le panier on l'ajoute tout simplement
      if(!flag) {
        //console.log("L'article n'existe pas dans le panier"); -- ce log permet de vérifier dans la console notre condition.
        panier.push(article);
        localStorage.setItem("panier", JSON.stringify(panier));
      }
    }else { //S'il n'y a pas d'articles dans le local storage on crée un tableau vide auquel nous ajouterons l'article choisie.
      panier = [];
      panier.push(article);
      localStorage.setItem("panier", JSON.stringify(panier));
      console.log(panier);
      alert("L'article a bien été ajouté au panier")
    }
  }
});

