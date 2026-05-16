import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.registerForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });

    this.registerForm.get('password')?.valueChanges.subscribe(value => {
      this.passwordStrength = this.calculateStrength(value);
      this.passwordColor = this.getPasswordColor(this.passwordStrength);
    });
  }

  
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

 
  onSubmit() {

    if (this.registerForm.invalid) {
      alert("Veuillez remplir tous les champs correctement !");
      return;
    }

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

    const user = {
      nom: this.registerForm.get('nom')?.value,
      prenom: this.registerForm.get('prenom')?.value,
      dateNaissance: this.registerForm.get('dateNaissance')?.value,
      email: this.registerForm.get('email')?.value,
      password: password
    };

    
    this.authService.register(user).subscribe({
      next: (res) => {
        console.log("SUCCESS:", res);
        alert(res.message);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        alert(err.error.message || "Erreur lors de l'inscription");
      }
    });
  }
}