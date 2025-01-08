import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';  // Importa FormsModule



const config: SocketIoConfig = { url: 'https://stage.allrideapp.com/tech_interview', options: {
  query: { room: 'diegodelajara'},
  transports: ['websocket']
} };


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [BrowserModule, SocketIoModule.forRoot(config), GoogleMapsModule, FormsModule],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
