let monPanier = JSON.parse(localStorage.getItem('panier'));
console.log(monPanier);
detailArticle(monPanier)

// const panier = [
//     {
//         id : Adzdzezefo,
//         color : idjozjeoif,
//         quantity : 1,
//     }
// ]

function detailArticle (monPanier){
    const article = document.createElement('article')
    document.getElementById('cart__items').appendChild(article)
    article.setAttribute('class','cart__item')
    const cartItemImg = document.createElement('div')
    cartItemImg.setAttribute('class', 'cart__item__img')
    document.querySelector('article').appendChild(cartItemImg)
    const img = document.createElement('img')
    img.setAttribute('alt', "Photographie d'un canapé")
    cartItemImg.appendChild(img)
    const cartItemContent = document.createElement('div')
    cartItemContent.setAttribute('class', "cart__item__content")
    article.appendChild(cartItemContent)
    const cartDescription = document.createElement('div')
    cartDescription.setAttribute('class', 'cart__item__content__description')
    cartItemContent.appendChild(cartDescription)
    const h2 = document.createElement('h2')
    cartDescription.appendChild(h2)
    const p = document.createElement(p)
    cartDescription.appendChild(p)
    const itemSettings = document.createElement('div')
    itemSettings.setAttribute('class', 'cart__item__content__settings')
    article.appendChild(itemSettings)
    const itemSettingsQuantity = document.createElement('div')
    itemSettingsQuantity.setAttribute('class', 'cart__item__content__settings__quantity')
    itemSettings.appendChild(itemSettingsQuantity)
    const pQte = document.createElement('p')
    itemSettingsQuantity.appendChild(pQte)
    const input = document.createElement('input')
    input.setAttribute('class', 'itemQuantity')
    const itemDelete = document.createElement('div')
    itemDelete.setAttribute('class', 'cart__item__content__settings__delete')
    itemSettings.appendChild(itemDelete)
    const pDelete = document.createElement('p')
    pDelete.setAttribute('class', 'deleteItem')
    itemDelete.appendChild(pDelete)
}



// const numberOfArticles = localStorage.length

// for (let i = 0 ; i < numberOfArticles ; i++){
//     const item = localStorage.getItem(localStorage.key(i));
//     const itemObject = JSON.parse(item)
//     console.log(itemObject);
// }