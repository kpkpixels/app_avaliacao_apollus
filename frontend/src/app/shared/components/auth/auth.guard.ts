import { Injectable } from '@angular/core';
import { AxiosService } from '../../../services/axios.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private axiosService: AxiosService, private router: Router, private snackBar: MatSnackBar,) {}

  canActivate(): boolean {
    if (this.axiosService.getAuthToken()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      this.snackBar.open("Acesso Negado", "X", {duration: 5000});
      return false;
    }
  }
}