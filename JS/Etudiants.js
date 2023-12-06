import { API } from "./API.js"
export default class Etudiant {
    constructor(nom, prenom, dateNaissance, note) {
        this.nom = nom;
        this.prenom = prenom;
        this.dateNaissance = dateNaissance;
        this.note = note;
    }

    static async getAllEtudiants() {
        const DATA = await fetch(API);
        const ETUDIANTS = DATA.json();
        return ETUDIANTS;
    }

    async addEtudiant() {
        let data  = {
            nom: this.nom,
            prenom: this.prenom,
            dateNaissance: this.dateNaissance,
            note: this.note
        }
        const ADD = await fetch(API, { method: "POST", 
                                        body: JSON.stringify(data),
                                        headers: {
                                            "Content-Type": "Application/json"
                                        }})
        
        console.log(ADD);
        return ADD;
    }
    static colorNote(note){
        return note >= 10 ? "bg-success" : "bg-danger";
    }
}