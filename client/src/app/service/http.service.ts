import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

   constructor(private http: HttpClient) { }

   readonly api = 'http://localhost:3000/'
   readonly adminApi = 'http://localhost:3000/admin/'

   private getHeaders(token: string) {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      })
    };
  }
    signup(signupData: any) {
    return this.http.post(this.api  + 'signup', signupData);
  }
  login(loginData:any){
    return this.http.post(this.api + 'login' , loginData)
  }
   getUserInfo(userId: string, token: string): Observable<any> {
      const headers = this.getHeaders(token); 
      return this.http.get(`${this.api}user/:${userId}`, headers);
   }
  getAllUser(){
    return this.http.get(`${this.adminApi}userDetails`)
  }
  deleteUser(userid:any){
    return this.http.delete(`${this.adminApi}delete/:${userid}`)
  }
  addUser(newUserData:any){
    return this.http.post(`${this.adminApi}addUser`,newUserData)
  }
  uploadProfile(formData:any,userid:any){
  return this.http.post(`${this.api}upload-profile-image`, formData,userid)
  }
  editUser(userId: string, userData: any): Observable<any> {
    console.log(this.adminApi,"admin api")
  return this.http.post(`${this.adminApi}edituser/:${userId}`, userData);
  }
  editProfile(userId:string,userData:any):Observable<any>{
    return this.http.post(`${this.api}editprofile/:${userId}`,userData)
  }
}
