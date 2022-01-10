import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadLines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUlr = environment.apiUlr;

const headers = new HttpHeaders({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'X-Api-Key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticasService {

  headLinesPages = 0;
  categoriaActual = '';
  categoriaPage = 0;

  constructor(private http: HttpClient) { }

  getTopHeadLines() {
    this.headLinesPages++;
    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=us&page=${this.headLinesPages}`);

  // eslint-disable-next-line max-len
  // return this.http.get<RespuestaTopHeadLines>(`https://newsapi.org/v2/top-headlines?country=us&apiKey=c2c31f68a3f242ddb7872ba51a0f0bab`);
}

  getTopHeadLinesCategoria(categoria: string) {

    if(this.categoriaActual === categoria) {
      this.categoriaPage ++;
    }
    else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }

    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=us&category=${ categoria }&page=${this.categoriaPage}`);

  // eslint-disable-next-line max-len
  // return this.http.get(`https://newsapi.org/v2/top-headlines?country=us&category=${ categoria }&apiKey=c2c31f68a3f242ddb7872ba51a0f0bab`);

  }

  private ejecutarQuery<T>(query: string) {

    query = apiUlr + query;
    return this.http.get<T>(query, { headers });
  }

}
