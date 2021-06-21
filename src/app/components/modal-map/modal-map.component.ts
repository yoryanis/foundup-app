import * as Mapboxgl from 'mapbox-gl';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-map',
  templateUrl: './modal-map.component.html',
  styleUrls: ['./modal-map.component.scss'],
})
export class ModalMapComponent implements OnInit {
  private map!: mapboxgl.Map;
  public submit: boolean = true;
  public coordinatesLng?: any;
  public coordinatesLat?: any;

  constructor(
    public dialogRef: MatDialogRef<ModalMapComponent>,
    @Inject(MAT_DIALOG_DATA) public dataReport: any
  ) {}

  ngOnInit(): void {
    let lng = this.dataReport.longitude
      ? this.dataReport.longitude
      : -74.8279586;
    let lat = this.dataReport.latitude ? this.dataReport.latitude : 11.0041905;

    (Mapboxgl as any).accessToken = environment.apiKeyMapbox;
    this.map = new Mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [lng, lat],
      zoom: 13.33,
    });

    this.marketMap(lng, lat);

    // Add zoom and rotation controls to the map.
    this.map.addControl(new Mapboxgl.NavigationControl());
  }

  public marketMap(lng: number, lat: number) {
    const marker = new Mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat([lng, lat])
      .addTo(this.map);

    marker.on('dragend', () => {
      this.coordinatesLng = marker.getLngLat().lng;
      this.coordinatesLat = marker.getLngLat().lat;
      this.coordinatesLng ? (this.submit = false) : (this.submit = true);
    });
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public onSubmit() {
    this.dialogRef.close({
      lat: this.coordinatesLat,
      lng: this.coordinatesLng,
    });
  }
}
