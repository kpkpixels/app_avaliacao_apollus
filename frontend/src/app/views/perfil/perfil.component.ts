import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { AxiosService } from '../../services/axios.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent{

  titulo = "Edição de Perfil";

  hide = true;

  userLogin = "";
  senha = "";
  cargo = "";

  constructor(
    private usuarioService: UsuarioService,
    private axiosService: AxiosService,
    private snackBar: MatSnackBar
    ){
      this.getUsuario();
  }

  async getUsuario(){
    try{
      const user = await this.usuarioService.getUsuarioById(parseInt(this.axiosService.getIdUsuarioSessao()!));

      this.userLogin = user.data.userLogin;
      this.cargo = user.data.cargo;
    }
    catch(error: any){
      if (error.response && error.response.data){
        this.onError(error.response.data);
      } else {
        this.onError("Erro ao tentar buscar usuário.");
      }
    }
  }
  async editaUsuario(){
    try {
      await this.usuarioService.atualizaSenhaUsuario({
        id: this.axiosService.getIdUsuarioSessao()!,
        senha: this.senha,
      })
      this.snackBar.open("Usuário editado com sucesso!", 
      "X",
      {
        duration: 5000
      });
    } catch (error: any) {
      if (error.response && error.response.data){
        this.onError(error.response.data);
      }
      else{
        this.onError("Erro ao tentar editar usuário.")
      }
    }
  }
  validaSenha(){
    return this.senha == "" ? true : false;
  }

  onError(errorMsg:string){
    this.snackBar.open(errorMsg, "X", {duration: 5000});
  }
}
