import { Component, OnInit } from '@angular/core';
import { log } from 'console';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular14-real-time-app';
  address: string = '';
  lat: number = -33.4791745;
  lng: number = -70.6004407;
  zoom: number = 8;
  center: google.maps.LatLngLiteral = { lat: this.lat, lng: this.lng };
  markers: { lat: number; lng: number }[] = []; // Lista de marcadores


  constructor(private socket: Socket) {}
  ngOnInit() {

    this.socket.on('newLocation', (data: { lat: number; lng: number }) => {
      this.addMarker(-33.4791745, -70.6004407);
    console.log('markers', this.markers)
    });
  }

  searchAddress() {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: this.address }, (results, status) => {
      if (status === 'OK') {
        this.lat = results && results[0].geometry.location.lat() || 0;
        this.lng = results && results[0].geometry.location.lng() || 0;
        this.center = { lat: this.lat, lng: this.lng };
        this.zoom = 13;

        this.socket.emit('newLocation', { lat: this.lat, lng: this.lng });
        this.addMarker(this.lat, this.lng);
      } else {
        alert('No se pudo encontrar la dirección: ' + status);
      }
    });
  }
  addMarker(lat: number, lng: number) {
    this.markers.push({ lat, lng });
  }
}
