import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface AuthResponse {
  message: string;
  email: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  nom: string;
  prenom: string;
  dateNaissance: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.baseUrl}/register`,
      data
    );
  }

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.baseUrl}/login`,
      data
    ).pipe(
      tap((response) => {
        localStorage.setItem('email', response.email);
        localStorage.setItem('role', response.role);
      })
    );
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('email') !== null;
  }

  logout(): void {
    localStorage.removeItem('email');
    localStorage.removeItem('role');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getEmail(): string | null {
    return localStorage.getItem('email');
  }
}