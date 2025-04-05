export default function ({ app }, inject) {
  if (process.client) {
    inject("loadGoogleMaps", () => {
      return new Promise((resolve, reject) => {
        if (typeof google !== "undefined" && google.maps) {
          resolve(google);
          return;
        }

        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLEMAP_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve(google);
        script.onerror = (error) => reject(error);

        document.head.appendChild(script);
      });
    });
  }
}
