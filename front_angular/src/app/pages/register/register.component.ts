import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { RegisterService, User } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  showPassword = false;
  showConfirm = false;
  passwordStrength = 0;
  passwordColor = 'red';

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private registerService: RegisterService 
    ,private router: Router) {
    this.registerForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });

    // Mettre à jour la force du mot de passe et sa couleur
    this.registerForm.get('password')?.valueChanges.subscribe(value => {
      this.passwordStrength = this.calculateStrength(value);
      this.passwordColor = this.getPasswordColor(this.passwordStrength);
    });
  }

  // Calculer la force du mot de passe
  calculateStrength(password: string): number {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 6) strength += 25;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[@$!%*?&]/.test(password)) strength += 35;
    return Math.min(strength, 100);
  }

  getPasswordColor(strength: number): string {
    if (strength < 40) return 'red';
    if (strength < 70) return 'orange';
    return 'green';
  }

  // Soumettre le formulaire
  onSubmit() {
    if (this.registerForm.invalid) {
      alert("Veuillez remplir tous les champs correctement !");
      return;
    }

    const nom = this.registerForm.get('nom')?.value;
    const prenom = this.registerForm.get('prenom')?.value;
    const date = this.registerForm.get('dateNaissance')?.value;
    const password = this.registerForm.get('password')?.value;
    const confirm = this.registerForm.get('confirmPassword')?.value;

    if (this.passwordStrength < 40) {
      alert("Mot de passe trop faible !");
      return;
    }

    if (password !== confirm) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    // Créer l'utilisateur et l'enregistrer via le service
    const user: User & { role: string } = { nom, prenom, dateNaissance: date, password,role: 'user' };
    this.registerService.saveUser(user);
    this.router.navigate(['/home']);
  }
}
