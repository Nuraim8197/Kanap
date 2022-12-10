// utilisation de fetch pour appeler l'API

fetch("http://localhost:3000/api/products/")
  .then((response) => {
    return response.json();
  })
  .then((kanap) => {
    console.log(kanap)
    return produitAccueil(kanap);
  });

//création d'une fonction pour récupérer les données en commentaire dans index.html

function produitAccueil(array) {
  //création d'une boucle pour les données de chaques produits
  array.forEach((element) => {
    const id = element._id;

    // variable pour alt et href
    const aHref = document.createElement("a");
    aHref.href = "./product.html?id=" + id;

    // variable article
    const article = document.createElement("article");

    // détail de l'image
    const image = document.createElement("img");
    image.src = element.imageUrl;
    image.alt = element.altTxt + " , " + element.name;

    // détail h3
    const h3 = document.createElement("h3");
    h3.classList.add("productName");
    h3.textContent = element.name;

    // détail p
    const p = document.createElement("p");
    p.classList.add("productDescription");
    p.textContent = element.description;

    // appel de la fonction afin de montrer les enfants du parent #Items
    createTagElement(aHref, article, image, h3, p);
  });
}

//Fonction permettant de donner des enfants au parent #items afin de le rendre visible dans le code html

function createTagElement(aHref, article, image, h3, p) {
  const items = document.querySelector("#items");
  if (items != null) {
    items.appendChild(aHref);
    aHref.appendChild(article);
    article.appendChild(image);
    article.appendChild(h3);
    article.appendChild(p);
  }
}
