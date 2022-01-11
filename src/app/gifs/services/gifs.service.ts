import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gif.interface';


@Injectable({
  providedIn: 'root'
})
export class GifsService {
  
  private apiKey: string = 'n8Z8DHf2WQxMotk7ltyJEXJ00CDqu0BF';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor(
    private httpClient: HttpClient
  ){
    //GUARDO LOS GIFS EN EL LOCAL STORAGE
    if ( localStorage.getItem('historial') ){
      this._historial = JSON.parse( localStorage.getItem('historial')! );
    }
    if( localStorage.getItem('resultados')){
      this.resultados = JSON.parse( localStorage.getItem('resultados')! );
    }

  }

  buscarGifs( query: string = '' ){
    query = query.trim().toLowerCase();

    if( !this._historial.includes( query ) ){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem( 'historial', JSON.stringify(this._historial) );
      
    }
    
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    console.log(params.toString());
    

    this.httpClient.get<SearchGifsResponse>(`${ this.serviceUrl}/search`, { params })
      .subscribe( (response ) => {
        console.log(response.data);
        this.resultados = response.data;
        localStorage.setItem( 'resultados', JSON.stringify(this.resultados) );
      })
    
  }

}
