import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { TotalIssues } from '../interfaces/totalIssues';
import { Chart } from '../interfaces/chart';

@Component({
  selector: 'app-total-issues',
  templateUrl: './total-issues.component.html',
  styleUrls: ['./total-issues.component.css', '../viewers-style.css']
})

export class TotalIssuesComponent implements OnInit {
  
  totalIssues:TotalIssues={
    totalIssues:0,
    issuesOpened:0,
    issuesClosed:0,
    closingRatio:0
  }

  chart:Chart = {
    type: "",
    data: {},
    options: {}
  };

  constructor(private apiService: ApiService) {}

  async newDataAsync() {
    let data = await this.apiService.getDataAsync()
    this.totalIssues = data.data.issues.totalStat
    this.chart = {
      type: 'pie',
      data: {
        labels: [this.totalIssues.issuesOpened, this.totalIssues.issuesClosed],
        datasets: [{
          fillOpacity: .5,
          data: [this.totalIssues.issuesOpened, this.totalIssues.issuesClosed],
          backgroundColor: [
            'rgb(231, 75, 77)',
            'rgb(133, 220, 89)'
          ],
          borderColor: [
            'white',
            'white'
          ],
          borderWidth: 2
        }]
      },
      options: {
        legend : {
          display: false
        }      
      }
    };
  }

  ngOnInit(): void {
    this.newDataAsync();
  }

}
