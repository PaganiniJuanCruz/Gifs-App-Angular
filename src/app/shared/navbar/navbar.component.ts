import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent{

  constructor(
    private gifsService: GifsService
  ) { }

  get historial(){
    return this.gifsService.historial;
  }  
  
  buscar(termino: string){
    this.gifsService.buscarGifs(termino);    
  }

}
