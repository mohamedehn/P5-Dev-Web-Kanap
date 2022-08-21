// Requête API pour récupérer l'ensemble des produits du site
fetch ("http://localhost:3000/api/products")
.then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    console.table(value);
  })
  .catch(function(err) {
    // Une erreur est survenue
  });

  // Requête API pour affichier les produits sur le site

    fetch ("http://localhost:3000/api/products")
    .then (afficherProduits => afficherProduits.json())
    .then (info => {
        produits.textContent = `Nom : ${info.name}`;
        const img = document.createElement("img");
        img.src = info.Kanap_Sinopé;
        produits.appendChild (img);
    })
    