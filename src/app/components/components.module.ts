import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticiasComponent } from './noticias/noticias.component';
import { NoticiaComponent } from './noticia/noticia.component';



@NgModule({
  declarations: [
    NoticiasComponent,
    NoticiaComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[
    NoticiasComponent,
  ]
})
export class ComponentsModule { }
