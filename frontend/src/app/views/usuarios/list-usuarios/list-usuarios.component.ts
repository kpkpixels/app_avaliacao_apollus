import { Component, ViewChild } from '@angular/core';
import { FiltroUsuario } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-list-usuarios',
  templateUrl: './list-usuarios.component.html',
  styleUrl: './list-usuarios.component.scss'
})
export class ListUsuariosComponent {

  titulo = "Usuários"
  usuarios = [];

  displayedColumns: string[] = ['id', 'userLogin', 'cargo', 'edicao', 'delete'];

  //#region camposFiltros
    filtroUsuario:FiltroUsuario = {
      "userLogin":"",
      "cargo":""
    }
  //#endregion

  pageSlice = this.usuarios.slice(0, 10);
  
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ){
    this.getUsuariosCadastrados();
  }

  async getUsuariosCadastrados(){
    try {
      const result = await this.usuarioService.getUsuarios();
      this.usuarios = result.data;
      this.pageSlice = this.usuarios.slice(0, 10);
    } catch (error) {
      this.onError("Erro ao carregar usuários.");
    }
  }

  editUsuario(id:Number){
    this.router.navigate(['usuario', 'edit', id], { relativeTo: this.route.parent });
  }
  adicionaNovoUsuario(){
    this.router.navigate(['usuario', 'new'], { relativeTo: this.route.parent });
  }

  async deleteUsuario(id:Number, userLogin:string){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: `Deseja remover o usuário '${userLogin}'?`,
    });

    dialogRef.afterClosed().subscribe(async (result: boolean) => {
      if (result){
        try{
          await this.usuarioService.deleteUsuarioById(id);
          this.getUsuariosCadastrados();
            this.snackBar.open(`Usuário "${userLogin}" deletado com sucesso.`, 
            "X",
              {
                duration: 5000,
                verticalPosition: "top",
                horizontalPosition: "center"
              }
            );
        }
        catch(error){
          this.onError("Erro ao tentar remover usuário.")
        }
      }
    });   
  }

  async filtrarUsuarios(){
    if (this.filtroUsuario.cargo == "") this.filtroUsuario.cargo = undefined;

    try {
      const result = await this.usuarioService.buscaPersonalizada(this.filtroUsuario);
      this.usuarios = result.data;
      this.pageSlice = this.usuarios.slice(0, 10);
    } catch (error) {
      this.onError("Erro ao carregar usuários.");
    }
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


  handlePageEvent(e: PageEvent) {
    const startIndex = e.pageIndex * e.pageSize;
    let endIndex = startIndex + e.pageSize;

    if (endIndex > this.usuarios.length){
      endIndex = this.usuarios.length;
    }
    this.pageSlice = this.usuarios.slice(startIndex, endIndex);
  }
}
