// import './path/to/name.css';

let serviceWorkerRegistered: boolean = false;

window.app_name = {
  initialize: function () {},
  registerServiceWorker: async function () {
    if (serviceWorkerRegistered) return true;
    const registration = await navigator.serviceWorker.register('./service-worker.js');
    registration.addEventListener('updatefound', function () {
      console.log('Updating');
      const worker = registration.installing || registration.waiting || registration.active;
      if (worker !== null) {
        worker.addEventListener('statechange', function (event: Event) {
          const target = event.target as ServiceWorker;
          const state = target.state;
          if (state === 'activated') {
            console.log('Updated');
          }
        });
      }
    });
    serviceWorkerRegistered = true;
    return true;
  }
};

export default window.app_name;
