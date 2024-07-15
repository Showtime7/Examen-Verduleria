function initMap() {
    const santiago = { lat: -33.4489, lng: -70.6693 };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: santiago,
    });
    const marker = new google.maps.Marker({
      position: santiago,
      map: map,
    });
}
