import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {

  constructor() {
    axios.defaults.baseURL = 'http://localhost:8080';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
  }

  getAuthToken(): string | null {
    return window.localStorage.getItem("auth_token");
  }
  getIdUsuarioSessao(): string | null{
    return window.localStorage.getItem("id_sessao");
  }
  getRoleUsuarioSessao(): string | null{
    return window.localStorage.getItem("role_sessao");
  }

  setAuthToken(token: string | null, role: string, id: string): void {
    if (token !== null) {
      window.localStorage.setItem("auth_token", token);
      window.localStorage.setItem("role_sessao", role);
      window.localStorage.setItem("id_sessao", id);
    } else {
      window.localStorage.removeItem("auth_token");
      window.localStorage.removeItem("role_sessao");
      window.localStorage.removeItem("id_sessao");
    }
  }


  request(method: string, url: string, data: any): Promise<any> {
      let headers: any = {};

      if (this.getAuthToken() !== null) {
          headers = {"Authorization": "Bearer " + this.getAuthToken()};
      }

      return axios({
          method: method,
          url: url,
          data: data,
          headers: headers
      });
  }


  ehAdmin(): boolean {
    return this.getRoleUsuarioSessao() === 'ADMIN';
  }
  ehUsuarioAtual(id: string): boolean{
    return this.getIdUsuarioSessao() === id;
  }
}