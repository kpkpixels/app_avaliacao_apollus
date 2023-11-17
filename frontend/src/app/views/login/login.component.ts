import { Component, EventEmitter, Output } from '@angular/core';
import { AxiosService } from '../../services/axios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  hide = true;

  usuario: string = "";
  senha: string = "";
  
	constructor(private axiosService: AxiosService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    ) { }

	showComponent(componentToShow: string): void {
  }

	onLogin(): void {
		this.axiosService.request(
		    "POST",
		    "/api/auth/login",
		    {
		        login: this.usuario,
		        password: this.senha
		    }).then(
		    response => {
		        this.axiosService.setAuthToken(response.data.token, response.data.role, response.data.id);
            this.router.navigate([''], { relativeTo: this.route.parent });
		    }).catch(
		    error => {
		        this.axiosService.setAuthToken(null, "", "");    
            this.snackBar.open("Usuário ou senha incorretos!", "X", {duration: 5000});
		    }
		);
	}
}
