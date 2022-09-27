// Appel de la fonction de la page confirmation
confirmation()

/*
La fonction permet de récupérer via L'URL l'Id de la commande qui vient d'être réaliser puis d'afficher sur la page confirmation.html, le numéro de la commande qui vient d'être réalisé.
*/
function confirmation(){
    // Récupération de la châine de requête dans l'URL
    let urlOrderId = new URLSearchParams(window.location.search).get("orderId");
    
    //S'il n'y a pas d'orderId dans l'URL alors on affiche un message d'erreur
    if(urlOrderId === null || urlOrderId === ""){
        alert ("Une erreur s'est produite lors de la validation de votre commande. Merci de contacter notre service !");
    }
    //Sinon, on affiche la confirmation de la commande et le numéro de commande
    else{
        let idCommande = document.querySelector("#orderId");
        idCommande.innerText = urlOrderId;
        // On vide le panier une fois la commande passée grâce à localStorage.clear
        localStorage.clear()
    }
}

