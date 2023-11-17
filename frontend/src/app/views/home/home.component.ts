import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AxiosService } from '../../services/axios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private axiosService: AxiosService
    ){
  }
  
  goTo(url:string){
    this.router.navigate([url], { relativeTo: this.route.parent });
  }

  verificaAdmin(){
    return this.axiosService.ehAdmin();
  }
}
