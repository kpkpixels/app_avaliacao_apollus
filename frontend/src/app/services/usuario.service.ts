import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { FiltroUsuario, PerfilUsuario, Usuario } from "../models/usuario.model";
import { AxiosService } from "./axios.service";

@Injectable({
    providedIn:'root'
})
export class UsuarioService{
    
    private url = environment.api;

    constructor (private httpClient: HttpClient, private axiosService: AxiosService){
    }

    getUsuarios(){
        return this.axiosService.request("GET", this.url + "/usuarios", "");
    }
    getUsuarioById(id:Number){
        return this.axiosService.request("GET", `${this.url}/usuario/${id}`, "");
    }
    cadastraUsuario(usuario: Usuario){
        return this.axiosService.request("POST", this.url + "/usuario", usuario);
    }
    editaUsuario(usuario: Usuario){
        return this.axiosService.request("PUT", `${this.url}/usuario`, usuario);
    }
    deleteUsuarioById(id: Number){
        return this.axiosService.request("DELETE", `${this.url}/usuario/${id}`, "");
    }
    buscaPersonalizada(filtro: FiltroUsuario){
        return this.axiosService.request("POST", this.url + "/usuario/buscaPersonalizada", filtro);
    }
    atualizaSenhaUsuario(perfilUsuario: PerfilUsuario){
        return this.axiosService.request("PUT", `${this.url}/usuario/atualizaSenha`, perfilUsuario);
    }
    ehAdmin(){
        return this.axiosService.ehAdmin();
    }
    ehUsuarioAtual(id:string){
        return this.axiosService.ehUsuarioAtual(id);
    }
}