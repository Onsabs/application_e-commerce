import { Injectable } from '@angular/core';

export interface User {
  nom: string;
  prenom: string;
  dateNaissance: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private storageKey = 'user';

  constructor() { }

  // Enregistrer un utilisateur
  saveUser(user: User): void {
    localStorage.setItem(this.storageKey, JSON.stringify(user));
  }

}
