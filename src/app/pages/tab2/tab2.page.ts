import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment, IonInfiniteScroll } from '@ionic/angular';
import { Article } from 'src/app/interfaces/interfaces';
import { NoticasService } from 'src/app/services/noticas.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment, { static: true }) segment: IonSegment;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  noticias: Article[] = [];

  constructor(private noticasService: NoticasService) {}

  ngOnInit() {
    this.segment.value = this.categorias[0];
    this.cargarNoticias(this.segment.value );
  }

  cambioCategoria(event) {
    this.noticias = [];
    this.cargarNoticias(event.detail.value);
  }

  cargarNoticias(categoria: string, event?) {
      this.noticasService.getTopHeadLinesCategoria(categoria)
      .subscribe( resp => {

        this.infiniteScroll.disabled = false;

        if( resp.articles.length === 0) {
          this.infiniteScroll.disabled = true;
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

  loadData(event) {
    this.cargarNoticias( this.segment.value, event );
  }

}
