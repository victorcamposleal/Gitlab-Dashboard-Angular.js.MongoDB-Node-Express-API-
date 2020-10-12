import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../api.service';
import { Commits } from '../interfaces/commits';
import { Chart } from '../interfaces/chart';


@Component({
  selector: 'app-most-commits-last-week',
  templateUrl: './most-commits-last-week.component.html',
  styleUrls: ['./most-commits-last-week.component.css', '../viewers-style.css']
})
export class MostCommitsLastWeekComponent implements OnInit {
  @Input() backgroundColors: string[];
  @Input() borderColors:string[];

  commitsLastWeek: Commits[];

  chart:Chart = {
    type: "",
    data: {},
    options: {}
  };

  constructor(private apiService: ApiService) {}

  async newDataAsync() {
    let data = await this.apiService.getDataAsync()
    this.commitsLastWeek = data.data.commits
    if(this.commitsLastWeek.length > 5){
      this.commitsLastWeek= this.commitsLastWeek.slice(0,5);
    }
    let dataNames = this.commitsLastWeek.map(values => values.name);
    let dataCommits = this.commitsLastWeek.map(values => values.commits);
    let chartBackgroundColors = this.backgroundColors.slice(0, this.commitsLastWeek.length); 
    let chartBorderColors = this.borderColors.slice(0, this.commitsLastWeek.length); 

    this.chart = {
      type: 'horizontalBar',
      data: {
        labels: [...dataNames],
        datasets: [
          {
            data: [...dataCommits],
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