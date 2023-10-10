import { Component, OnInit } from '@angular/core';
import { ActivitateRequestDto, ActivitateResponseDto, HartaDto } from '../model/activitate-model';
import { ActivitateService } from '../activitate.service';
 import * as L from 'leaflet';

@Component({
  selector: 'app-harta',
  templateUrl: './harta.component.html',
  styleUrls: ['./harta.component.scss']
})
export class HartaComponent implements OnInit {
  activitati: ActivitateResponseDto [] = [];
  zone: HartaDto[] = [];
  
  private map!: L.Map;


  constructor(private activitateService: ActivitateService) {

   }

  // ngOnInit(): void {
  

  //   this.activitateService.getZone().subscribe( (data) => {
  //     this.zone = data;
  //   });

  //   this.activitateService.findByZonaHarta(zone.denumire).subscribe((data) =>{
  //     this.activitati = data;
  //   });
  // }

  ngOnInit(): void {
    this.activitateService.getZone().subscribe((data) => {
      this.zone = data;

      // Loop through each zone and fetch activities for it
      this.zone.forEach((zone) => {
        this.activitateService.findByZonaHarta(zone.denumire).subscribe((data) => {
          // Check if activities exist for this zone
          if (data.length > 0) {
            this.activitati.push(...data);
          }
        });
      });
    });
  }

  activitatiForZone(zona: HartaDto): ActivitateResponseDto[] {
    return this.activitati.filter(activitate => activitate.zonaHarta.some(zone => zone.denumire === zona.denumire));
  }
  

  
  }

