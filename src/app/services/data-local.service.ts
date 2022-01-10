import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

   constructor(private storage: Storage,
               public toastController: ToastController) {
    this.storage.create();
    this.cargarFavoritos();
  }

  async presentToast(message: string) {


    const toast = await this.toastController.create({
      message,
      duration: 1500,
      mode: 'ios',
      color: 'dark',
      cssClass: 'ion-text-center',
      position:'middle'
    });
    toast.present();
  }

   async guardarNoticias(noticia: Article) {
    const existe = this.noticias.find(noti => noti.title === noticia.title);

    if(!existe) {
      this.noticias.unshift(noticia);
      // eslint-disable-next-line no-underscore-dangle
      //this.storage.set('favoritos', this.noticias);
       await this.storage.set('favoritos', this.noticias);
       this.presentToast('Agregado a favorito');

    }
    else {
      this.presentToast('Ya se encuentra en favoritos');
    }
  }

  async cargarFavoritos() {
    const favoritos = await this.storage.get('favoritos');

    if (favoritos) {
      this.noticias = favoritos;
     }
     else {
      this.noticias = [];
     }
  }

  borrarNoticia(noticia: Article) {
    //Este linea de codigo regresa un nuevo arreglo sin la noticia a borrar
    this.noticias = this.noticias.filter(noti => noti.title !== noticia.title);
    this.presentToast('Borrado de favoritos');
    this.storage.set('favoritos', this.noticias);
  }

}
