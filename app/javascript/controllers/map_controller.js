import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="map"
export default class extends Controller {
  static values = { latitude: Number, longitude: Number,name: String }

  connect() {
    let latitude = this.latitudeValue
    let longitude = this.longitudeValue
    let name = this.nameValue
    if(this.latitudeValue === null || this.longitudeValue === null) {
      latitude = 51.505
      longitude = -0.09
    }
    this.map = L.map('map').setView([latitude, longitude], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    L.marker([latitude, longitude]).addTo(this.map)
      .bindPopup(name)
      .openPopup();
    
  }
}
