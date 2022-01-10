import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform,
              private statusBar: StatusBar) {

                this.initializeApp();
  }

  private initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#222428');
      this.statusBar.styleLightContent();
    });
  }
}
