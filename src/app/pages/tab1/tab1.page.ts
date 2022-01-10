import { Component, OnInit, ViewChild } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { NoticasService } from '../../services/noticas.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias: Article[] = [];

  constructor(private noticiasServices: NoticasService) {}

  ngOnInit() {
    this.cargarNoticias();
  }

  loadData(event) {
    this.cargarNoticias(event);
  }

  cargarNoticias(event?) {
    this.noticiasServices.getTopHeadLines().subscribe( (resp) => {

        if( resp.articles.length === 0) {
          event.target.disabled = true;
          event.target.complete();
          return;
        }

         //Sin los puntos seria un arreglo, pero con los tres puntos trae de manera independiente cada uno de los
         //articulos del arreglo
         this.noticias.push(...resp.articles);

         if(event) {
          event.target.complete();
         }
    });
  }

}
