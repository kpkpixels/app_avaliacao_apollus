import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrl: './edit-usuario.component.scss'
})
export class EditUsuarioComponent implements OnInit{
  titulo = "Edição de Usuários";

  id = "";
  userLogin = "";
  senha = "";
  cargo = "";

  hide = true;

  constructor(
    private usuarioService: UsuarioService, 
    private router: Router, 
    private route: ActivatedRoute,    
    private snackBar: MatSnackBar,
    private dialog: MatDialog
    ){
  }
  
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.id = routeParams.get('id') ?? "";

    if (!this.verificaAdmin() || this.verificaUsuarioAtual(this.id)) {
      this.voltarParaListagem();
      this.snackBar.open("Acesso Negado", "X", {duration: 5000});
    }

    if (this.id) this.getUsuario();
  }

  validaAcao(){
    if (this.id){
      this.editaUsuario();
    }
    else{
      this.cadastrarUsuario();
    }
  }

  async getUsuario(){
    try{
      const user = await this.usuarioService.getUsuarioById(parseInt(this.id));

      this.id = user.data.id!.toString();
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

  async cadastrarUsuario() {
    if (this.validaInputs() > 0) {
      return;
    }
  
    try {
      const user = await this.usuarioService.cadastraUsuario({
        userLogin: this.userLogin,
        senha: this.senha,
        cargo: this.cargo
      });
  
      this.router.navigate(['usuario', 'edit', user.data.id], { relativeTo: this.route.parent });
  
      this.snackBar.open("Usuário cadastrado com sucesso!", "X", {
        duration: 5000
      });
    } catch (error: any) {
      if (error.response && error.response.data){
        this.onError(error.response.data);
      }else {
        this.onError("Erro ao tentar cadastrar usuário.");
      }
    }
  }

  async editaUsuario(){
    if (this.validaInputs() > 0){
      return;
    }
    try {
      await this.usuarioService.editaUsuario({
        id: Number(this.id), 
        userLogin: this.userLogin, 
        senha: this.senha ? this.senha : "", 
        cargo: this.cargo
      })
      this.router.navigate(['usuario', 'edit', this.id], { relativeTo: this.route.parent });
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
  deleteUsuario(){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: `Deseja remover o usuário '${this.userLogin}'?`,
    });

    dialogRef.afterClosed().subscribe(async (result: boolean) => {
      if (result){
        try{
          await this.usuarioService.deleteUsuarioById(Number(this.id));
          this.voltarParaListagem();
            this.snackBar.open(`Usuário "${this.userLogin}" deletado com sucesso.`, 
            "X",
              {
                duration: 5000,
                verticalPosition: "top",
                horizontalPosition: "center"
              }
            );
        }
        catch(error: any){          
          this.onError("Erro ao tentar remover usuário.")
        }
      }
    });       
  }
  validaInputs(){
    let contErros = 0;
    if (this.userLogin == ""){
      contErros++;
    }
    if (this.senha == "" && !this.id){
      contErros++;
    }
    if (this.cargo == ""){
      contErros++;
    }
    return contErros;
  }

  validaNomeUsuario(){
    return this.userLogin == "" ? "Informe um nome de usuário!" : "";
  }
  validaSenha(){
    return this.senha == "" && !this.id ? "Informe uma senha!" : "";
  }
  validaCargo(){
    return this.cargo == "" ? "Informe um cargo!" : "";
  }

  voltarParaListagem(){
    this.router.navigate(['usuario', 'list'], { relativeTo: this.route.parent });
  }

  onError(errorMsg:string){
    this.snackBar.open(errorMsg, "X", {duration: 5000});
  }
  verificaAdmin(){
    return this.usuarioService.ehAdmin();
  }
  verificaUsuarioAtual(id:string){
    return this.usuarioService.ehUsuarioAtual(id);
  }

  alterada(){
    if (this.senha.length > 0 && this.id){
      return "Senha (alterada)";
    }
    else{
      return "Senha";
    }
  }
}
