//"bdd" de départ
let livre1 = {titre : "Une vie comme ça", auteur: "Yves Simon", parution: "2022"};
let livre2 = {titre : "Symphony 4 LTS", auteur: "Etiennne Langlet, Bilal Amani", parution: "2021"};
let livre3 = {titre : "Programmer avec MySql", auteur: "Christian Soutou", parution: "2021"};
let livre4 = {titre : "Scrum Méthodes Agiles", auteur: "David Chaplin", parution: "2021"};

let livres = new Array(livre1, livre2, livre3, livre4);

//querySelectors
// let tableau = document.querySelector('.tableau');
let emplacement = document.querySelector('.emplacement');
let ajout = document.querySelector('.ajout');

let formAdd = document.querySelector('#formAdd');
let formUp= document.querySelector('#formUp');


let btnSuppr = new Array();
let btnModif = new Array();

//remplissage de la page à l'ouverture
afficher();

// Affichage des livres entre les categories et le btn ajouter
function afficher(){
    for(let livre of livres){
        creerRang(livre);
    };
    
}

//creation d'un rang dans l'affichage
function creerRang(livre){
    let row = document.createElement('div');
    row.classList.add("rang");
    
    // recherche des propriétés d'un livre
    for(let prop in livre){
        let cell = document.createElement('div');
        cell.classList.add("cell");
        cell.innerText = livre[prop];
        row.appendChild(cell);
    }
    
    // création de la dernière cellule avec ses boutons
    let lastcell = document.createElement('div');
    lastcell.classList.add("cell");
    
    let btn1 = document.createElement('button');
    btn1.classList.add("bouttons", "btn1");
    btn1.innerText = "Modifier";
    
    let btn2 = document.createElement('button');
    btn2.classList.add("bouttons", "btn2");
    btn2.innerHTML = 'Supprimer';
    
    lastcell.appendChild(btn1);
    lastcell.appendChild(btn2);
    
    // ajout de la dernière cellule dans le rang
    row.appendChild(lastcell);
    // ajout du rang dans le tableau
    emplacement.appendChild(row);

    majBtn(btn1, btn2)
}


// affichage du formulaire de création
ajout.addEventListener('click', (e) => {
    e.preventDefault();
    if(formAdd.classList.contains("hidden")){
        formAdd.classList.remove("hidden");
    }else{
        formAdd.classList.add("hidden");
    }
});

//affichage du formulaire de modification
function afficherFormup(ref){
    // affichage
    if(formUp.classList.contains("hidden")){
        formUp.classList.remove("hidden");
    }else{
        formUp.classList.add("hidden");
    }

    // remplissage
    for(let livre of livres){
        if (livre['titre'] == ref){
            formUp.titre.value = livre['titre'];
            formUp.auteur.value = livre['auteur'];
            formUp.parution.value = livre['parution'];
            formUp.ref.value = ref;
        }
    }
}





// création d'un nouveau livre
formAdd.addEventListener('submit', function nouveauLivre(e){
    e.preventDefault();
    // obtention des inputs
    let title = document.getElementById('titre').value;
    let author = document.getElementById('auteur').value;
    let annee = document.getElementById('parution').value;
    // création de l'objet
    let newLivre = {titre : title, auteur: author, publication : annee};
    livres.push(newLivre);
    creerRang(newLivre);
});


//maj index des boutons
function majBtn(btn1, btn2){
    let ref = btn1.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;

    //boutons "supprimer"
    btnSuppr.push(btn2);
    btn2.addEventListener('click', () => {
        supprimer(ref);
    })

    
    //bouton "modifier"
    btnModif.push(btn1);
    btn1.addEventListener('click', () => {
        afficherFormup(ref);
    })
};


// Suppression d'un livre
function supprimer(ref){

    //dans l'affichage
    for (let i = 0; i < emplacement.childElementCount; i++){
        let rang = emplacement.childNodes[i];
        if (rang.childNodes[0].innerHTML == ref){
            emplacement.removeChild(rang);
        }
    }
    
    
    //dans l'array
    for(let livre of livres){
        if (livre['titre'] == ref){
            livres.splice((livres.indexOf(livre)), 1);
        }
    }

    // console.log(ref);
}

// Modification d'un Livre
formUp.addEventListener('submit', function modifierLivre(e){
    e.preventDefault();
    // obtention des inputs
    let title = document.getElementById('titreUp').value;
    let author = document.getElementById('auteurUp').value;
    let annee = document.getElementById('parutionUp').value;
    let ref = document.getElementById('ref').value;

    supprimer(ref);
    // création de l'objet
    let newLivre = {titre : title, auteur: author, publication : annee};
    // console.log(newLivre);
    livres.push(newLivre);
    creerRang(newLivre);
});
