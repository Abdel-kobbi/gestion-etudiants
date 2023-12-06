import Etudiant from "./Etudiants.js";


// function afficher les listes des etudiants
let afichageTousEtudiant = async function () {
    let response = await Etudiant.getAllEtudiants().then(_ => _);
    let html = ''
    response.forEach(element => {
        let age = new Date().getFullYear() - new Date(element.dateNaissance).getFullYear();
        html += `
        <tr>
        <td>${element.id}</td>
        <td>${element.nom}</td>
        <td>${element.prenom}</td>
        <td>${age}</td>
        <td>${element.note}</td>
        <td class="text text-center"><button class="btn btn-danger btn-sm">Supprimer</button></td>
        </tr>
        `;
    });
    document.querySelector('.liste-etudiants').innerHTML = html;
}

afichageTousEtudiant();


// function refrech table
document.querySelector('#refresh').addEventListener('click', afichageTousEtudiant);

// function validation des donnée;

function validation(nom, prenom, d_n, note) {
    let err = [];
    let inputs = [...arguments];
    inputs.forEach((el) => {
        el.nextElementSibling.classList.add('d-none');
        el.classList.remove('border-danger');
    })
    if (nom.value === "") {
        err.push(nom);
    }
    if (prenom.value === '') {
        err.push(prenom);
    }
    if (d_n.value === '') {
        err.push(d_n);
    }
    if (note.value === "" || (+note.value < 0 && +note.value > 20)) {
        err.push(note);
    }
    if (err.length !== 0) {
        err.forEach((el) => {
            el.nextElementSibling.classList.remove('d-none');
            el.classList.add('border-danger');
        })
        return false;
    }
    return true;
}

// add etudiant

const addEtudiant = () => {
    let [nom, prenom, d_n, note] = document.querySelectorAll('#nom, #prenom, #d-n, #note');
    console.log(validation(nom, prenom, d_n, note))
    if (validation(nom, prenom, d_n, note)) {
        nom = nom.value.toUpperCase();
        prenom = prenom.value.slice(0, 1).toUpperCase() + prenom.value.slice(1).toLowerCase();
        d_n = d_n.value;
        note = note.value;
        let newEtudiant = new Etudiant(nom, prenom, d_n, note);
        newEtudiant.addEtudiant();
    };
}

document.querySelector('#add').addEventListener('click', addEtudiant);