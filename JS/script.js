import Etudiant from "./Etudiants.js";

// filter sitting
let filter = {
    "by": "id",
    "desc": false
}

let spans = document.querySelectorAll('.filter');

spans.forEach((el) => {
    el.addEventListener('click', function () {
        spans.forEach((el)=>{
            el.children[0].innerHTML = '';
        })
        if (filter.by === el.dataset.column){
            filter.desc = !filter.desc;
        }else{
            filter.by = el.dataset.column
            filter.desc = false;
        }
        this.children[0].innerHTML = !filter.desc ? ` <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down text-primary ml-2" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
      </svg>` : ` <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up text-primary ml-2" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
    </svg>`;
    afichageTousEtudiant();
    });
})


// function afficher les listes des etudiants
async function afichageTousEtudiant() {
    let response = await Etudiant.getAllEtudiants().then(_ => _);
    response.sort((a, b) => {
        if (filter.desc) {
            return b[filter.by].toString().localeCompare(a[filter.by].toString());
        }
        return a[filter.by].toString().localeCompare(b[filter.by].toString());
    });

    let html = '';
    response.forEach(element => {
        let age = new Date().getFullYear() - new Date(element.dateNaissance).getFullYear();
        html += `
        <tr>
        <td>${element.id}</td>
        <td>${element.nom}</td>
        <td>${element.prenom}</td>
        <td>${age}</td>
        <td class="${Etudiant.colorNote(element.note)}">${element.note}</td>
        <td><button class="btn btn-danger btn-sm" onclick="deleteEtudiant(${element.id})">Supprimer</button></td>
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

// chnage le theme

document.getElementById('flexSwitchCheckChecked').addEventListener('click', () => {
    document.body.classList.toggle('bg-dark')
    document.body.classList.toggle('text-light')
})


//supprimer etudiant
window.deleteEtudiant = (id) => {
    document.querySelector('.alert').classList.remove('d-none');
    document.querySelector('.container').style.display = "none";
    document.querySelector('#oui').addEventListener('click', () => {
        Etudiant.deleteEtudiant(id);
    });
    document.querySelector('#non').addEventListener('click', () => {
        document.querySelector('.alert').classList.add('d-none');
        document.querySelector('.container').style.display = "block";
    });
    afichageTousEtudiant();
}
// confirmation de la supprission


