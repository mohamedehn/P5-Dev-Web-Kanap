let myColour = '#aa'; 
var mySecondcolour = ['#aaa','#bbb'];
const myConstant = 50;

let myObject = {
    price:12,
    quantity:50,
    description:'produit de qualité',
    name:'chaussure'
}

let myArrayObject = [
    {
    price:12,
    quantity:50,
    description:'produit de qualité',
    name:'chaussure'
},
{
    price:12,
    quantity:50,
    description:'produit de qualité',
    name:'chaussure'
},
{
    price:12,
    quantity:50,
    description:'produit de qualité',
    name:'chaussure'
},
]

// Test console LOG
console.log('ma première couleur est :', myColour);
console.log('mes deux couleurs sont :', mySecondcolour);
console.log('ma première couleur est :', mySecondcolour[0]);
console.log('ma première couleur est :', mySecondcolour.length);
console.log('détail objet:', myObject);
console.log('description du produit:', myObject.description);
console.log('description du produit:', myArrayObject[0].description);

// Calculer somme totale des quantités dans le magasin

function quantiteTotalDesProduitsDansLeMagasin(){
    let quantiteTotal = 0
    for (element of myArrayObject){
         quantiteTotal = quantiteTotal + element.quantity
    }
    return quantiteTotal
}

 console.log('la quantité total des produits dans le magasin est de :',quantiteTotalDesProduitsDansLeMagasin());

// Somme d'un tableau de 20 éléments avec for

const arrayTest = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
let sumArray = 0

for (num of arrayTest){
    sumArray +=num
}

console.log('somme totale des valeur du tableau',sumArray);

// Somme d'un tableau de 20 éléments avec reduce

const sumArrayBis = arrayTest.reduce((acc, x) => {
    return acc + x
})

console.log('somme totale des valeur du tableau', sumArrayBis);

// Somme d'un tableau de 20 éléments avec function et for

let sumArray2 = 0

function sumArrayFunction (){
    for (element of arrayTest){
        sumArray2 += element
        // autre façon : sumArray2 = sumArray2 + element
    }
    return sumArray2
}

console.log(sumArrayFunction());

// Fonction qui permet de calculer la somme des 500 premiers nombres entiers avec function + variable

let premierTerme = 1
let dernierTerme = 500
let sum = (premierTerme+dernierTerme)*dernierTerme/2

console.log(sum);

function CinqCent (){
    somme2 = (premierTerme+dernierTerme)*dernierTerme/2
    return somme2
}

console.log(CinqCent());

// Fonction permettant de calculer la factorielle d'un nombre

function fact(){
    let facto = 1
    for (let i = 2; i < 5 + 1; i++) {
      facto = facto * i;
    }
    return facto
  }
  console.log('le résultat de la factorielle est', fact());

  //Fonction qui permet de créer les éléments dans une page html : (titre, zone de recherche, un lien)
  
function premierePageHtml(){
    let b = document.body;
    let titrePrincipal = document.createElement('h1');
    titrePrincipal.textContent = 'Bienvenue sur le site de Kanap';
    let zoneDeRecherche = document.createElement ('input');
    zoneDeRecherche.textContent = 'Rechercher un produit';
    let lienVersAcceuil = document.createElement ('a');
    lienVersAcceuil.textContent = "Retourner à l'accueil";
}
console.log();

let parametreTableau = [1,2,3]

function additionnerUnTableauAvecParametres(tableau){
    let sommeDuTableau = 0;
    for(numberTableau of tableau){
        sommeDuTableau += numberTableau;
    } 
    console.log(parametreTableau);
    return sommeDuTableau;
}

console.log(additionnerUnTableauAvecParametres(parametreTableau));