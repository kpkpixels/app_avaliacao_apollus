import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AxiosService } from '../../../services/axios.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

  constructor (private router: Router, 
    private route: ActivatedRoute,
    private axiosService: AxiosService
    ){

    }

    goTo(url:string){
      this.router.navigate([url], { relativeTo: this.route.parent });
    }
    
    logout(){
      this.axiosService.setAuthToken(null, "", "");   
      this.router.navigate(['/login'], { relativeTo: this.route.parent });
    }
    verificaAdmin(){
      return this.axiosService.ehAdmin();
    }
}
