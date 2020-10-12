import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../api.service';
import { IssuesCreated } from '../interfaces/issuesCreated';
import { Chart } from '../interfaces/chart';

@Component({
  selector: 'app-best-closing-ratio',
  templateUrl: './best-closing-ratio.component.html',
  styleUrls: ['./best-closing-ratio.component.css', '../viewers-style.css']
})
export class BestClosingRatioComponent implements OnInit {
  @Input() backgroundColors: string[];
  @Input() borderColors:string[];
  
  bestClosingRatio: IssuesCreated[];
  dataNames:string[];
  issuesRatio: any[];
  
  chart:Chart = {
    type: "",
    data: {},
    options: {}
  };

  constructor(private apiService: ApiService) {}

  async newDataAsync() {
    let data = await this.apiService.getDataAsync();
    this.bestClosingRatio = data.data.issues.bestClosingRatio;   
    this.issuesRatio = this.bestClosingRatio.map(values => ({name : values.name, value: (values.datos.statistics.counts.closed / values.datos.statistics.counts.all).toFixed(2) }));
    let projectNames = this.bestClosingRatio.map(data =>  data.name);
    let ratioValues = this.bestClosingRatio.map(data => (data.datos.statistics.counts.closed / data.datos.statistics.counts.all).toFixed(2));  
    let chartBackgroundColors = this.backgroundColors.slice(0, this.bestClosingRatio.length); 
    let chartBorderColors = this.borderColors.slice(0, this.bestClosingRatio.length); 
    
    this.chart = {
      type: 'bar',
      data: {
        labels: [...projectNames],
        datasets: [
          {
            data: [...ratioValues],
            backgroundColor: [...chartBackgroundColors],
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
          xAxes: [{
            ticks: {
              fontColor: 'white', fontSize: 15, fontFamily: "'Asap', sans-serif", padding: 20
            },
            gridLines: false,
          }],
          yAxes: [{
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
