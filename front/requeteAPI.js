// Requête API pour récupérer l'ensemble des produits du site
fetch ("http://localhost:3000/api/products")
.then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    console.log(value);
  })
  .catch(function(err) {
    // Une erreur est survenue
  });

  // Requête API pour affichier les produits sur le site

    fetch ("http://localhost:3000/api/products")
    .then (afficherProduits => afficherProduits.json())
    .then (info => {
        produits.textContent = `Nom : Kanap Sinopé`;
        const img = document.createElement("img");
        const sinope = `http://localhost:3000/images/kanap01.jpeg`;
        img.src = sinope;
        document.getElementById(`produits`).appendChild(img);
        img.style.height = `160px`;
        img.style.width = `160px`;
    }
    )

    let produit = {
      altTxt: "Photo d'un canapé bleu, deux places",
      colors: (3) ['Blue', 'White', 'Black'],
      description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      imageUrl: "http://localhost:3000/images/kanap01.jpeg",
      name: "Kanap Sinopé",
      price: 1849,
      _id: "107fb5b75607497b96722bda5b504926",
    }