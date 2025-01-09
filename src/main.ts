import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

function loadGoogleMapsApi(): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as any).google) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      console.log('Google Maps API cargada correctamente.');
      resolve();
    };

    script.onerror = () => {
      console.error('Error al cargar Google Maps API.');
      reject(new Error('Error al cargar Google Maps API.'));
    };

    // Agregar el script al <head>
    document.head.appendChild(script);
  });
}

// Cargar Google Maps API antes de inicializar Angular
loadGoogleMapsApi()
  .then(() => {
    // Inicializar Angular después de cargar el script
    platformBrowserDynamic()
      .bootstrapModule(AppModule)
      .catch((err) => console.error(err));
  })
  .catch((err) => {
    console.error('Error al cargar la aplicación:', err);
  });
