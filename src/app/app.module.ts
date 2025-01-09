import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';

const config: SocketIoConfig = { url: 'http://localhost:3000' };

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    GoogleMapsModule,
    FormsModule,
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
