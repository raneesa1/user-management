import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import jwt_decode from 'jwt-decode'; 
import { CookieService } from 'ngx-cookie-service';



@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {


   private readonly JWT_TOKEN_KEY = 'jwt_token';

   constructor(
    private httpService: HttpService,
    private cookieService: CookieService
  ) { }

  login(credentials: { email: string, password: string }) {
    return this.httpService.login(credentials);
  }

  storeToken(token: string) {
    this.cookieService.set(this.JWT_TOKEN_KEY, token);
  }

  getToken(): any {
    return this.cookieService.get(this.JWT_TOKEN_KEY) || null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    this.cookieService.delete(this.JWT_TOKEN_KEY);
  }

  getUserIdFromToken(token: string): any  {
    try {
      const payloadBase64 = token.split('.')[1];
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);
      return payload.user.id;
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  getUserRole(token: string): any {
    if (token) {
      try {
        const payloadBase64 = token.split('.')[1];
        const payloadJson = atob(payloadBase64);
        const payload = JSON.parse(payloadJson);
        return payload.user.role;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }
  get isLogged(){
    if(this.cookieService.get(this.JWT_TOKEN_KEY)){
      return true
    }
    return false
   }


}
