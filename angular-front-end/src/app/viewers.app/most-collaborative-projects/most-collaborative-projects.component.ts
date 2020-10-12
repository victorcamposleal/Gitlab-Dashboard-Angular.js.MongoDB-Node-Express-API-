import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../api.service';
import { CollaborativeProj } from '../interfaces/collaborative';
import { Chart } from '../interfaces/chart';

@Component({
  selector: 'app-most-collaborative-projects',
  templateUrl: './most-collaborative-projects.component.html',
  styleUrls: ['./most-collaborative-projects.component.css', '../viewers-style.css']
})
export class MostCollaborativeProjectsComponent implements OnInit {
  @Input() backgroundColors: string[];
  @Input() borderColors:string[];
  
  mostCollaborativeProjects: CollaborativeProj[];

  chart:Chart = {
    type: "",
    data: {},
    options: {}
  };

  constructor(private apiService: ApiService) {}

  async newDataAsync() {
    let data = await this.apiService.getDataAsync()
    this.mostCollaborativeProjects = data.data.users.mostCollaboratives
    let names = this.mostCollaborativeProjects.map(project => project.name);  
    let developers = this.mostCollaborativeProjects.map(project => project.developers);
    let chartBackgroundColors = this.backgroundColors.slice(0, this.mostCollaborativeProjects.length); 
    let chartBorderColors = this.borderColors.slice(0, this.mostCollaborativeProjects.length); 

    this.chart = {
      type: 'horizontalBar',
      data: {
        labels: [...names],
        datasets: [
          {
            data: [...developers],
            backgroundColor:  [...chartBackgroundColors],
            borderColor: [...chartBorderColors],
            borderWidth: 2,
            borderSkipped: 'false',
            barPercentage: 1
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: 'white', fontSize: 15, fontFamily: "'Asap', sans-serif", padding: 20
            },
            gridLines: false,
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true, display: false
            }, gridLines: false,
          }]
        }
      }
    };
  }
  
  ngOnInit(): void {
    this.newDataAsync();
  }

}
