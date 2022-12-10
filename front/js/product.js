//Utilisiation de searchParams pour obtenir l'url à partir de l'id

const params = (new URL(document.location)).searchParams
const id = params.get('id')
console.log(id)

//utilisation de fetch afin d'importer la variable de l'id obtenue avec searchParams

fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => {
        return response.json()
    })
    .then((res) => {
        console.log("les kanap", res)
        return pageProduit(res)
    })

    function pageProduit(product) {

    //sélection de l'id pour donner un parent à l'image  
    const itemImg = document.querySelector(".item__img")

    //variable pour créer une image et entégrer l'url et alt
    const image = document.createElement("img")
    itemImg.appendChild(image)
    image.src = product.imageUrl    
    image.alt = product.altTxt
    
    //variable pour afficher le nom du produit

    //séléction direct de l'id title pour lier le nom du produit aux données du tableau
    const nameProduit = document.querySelector("#title")
    nameProduit.textContent = product.nameProduit

    //variable prix
    let prixKanap = product.price

    //séléction direct de l'id prix pour le lier aux données prix du produit
    const prixProduit = document.querySelector("#price")
    prixProduit.textContent = prixKanap

    //variable pour intégrer la description
    let description = product.description

    //séléction de l'id description pour le lier aux données pour la description produit
    const paraDescription = document.querySelector("#description")
    paraDescription.textContent = description

    //variable couleur pour le selecteur 
    let couleur = product.colors

    //séléction de l'id colors et création de la balise option pour le lier aux données dans le but d'afficher plusieurs couleurs
    const choixCouleur = document.querySelector("#colors")
    if (choixCouleur != null) {
        couleur.forEach((couleur) => {
            const option = document.createElement("option")
            option.value = couleur
            option.textContent = couleur
            choixCouleur.appendChild(option)
        })
    }

    //variable pour écouter les évènements 'ajouter au panier'
    const bouton = document.querySelector("#addToCart")
    if (bouton !=null) {
        bouton.addEventListener("click", () => {
            const colors = document.querySelector("#colors").value
            const quantite = document.querySelector("#quantity").value;

            if (colors == null || colors === "" || quantite == null || quantite == 0 || quantite >= 101) {
                alert("Veuillez choisir une couleur et une quantité inférieur à 101.");
                return bouton;
            }
            //let addId = `${id}` + ":" + colors;
            let objet = {
              "id": `${id}`/*params.get('id')*/,
              "color": colors,
              "quantite": parseInt(quantite)
            };
            let cart = JSON.parse(localStorage.getItem('cart'));
            if (cart === null) {
                cart = [];
                cart.push(objet);
                localStorage.setItem('cart', JSON.stringify(cart));
            }
            else{
                let findResult = cart.find(kanap => kanap.id == objet.id && kanap.color == objet.color)
                if 
                (findResult){console.log(findResult, 'objet retrouvé')
                let result = objet.quantite + findResult.quantite;
                findResult.quantite = result
                console.log(result, 'quantité finale')
                localStorage.setItem('cart', JSON.stringify(cart));                   
                }
                else{
                console.log(findResult, 'objet non  retrouvé')
                cart.push(objet);
                    localStorage.setItem('cart', JSON.stringify(cart));
                }
            }
            
            console.log(cart)
            //redirection vers le pannier
           /*document*/window.location.href = "cart.html"
        });
    }
}

  

