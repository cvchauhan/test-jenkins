import { Component, OnInit } from '@angular/core';
import Utils from '../helpers/utils';
import { DashoardService } from './dashoard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  data: any;
  options: any;
  data1: any;
  options1: any;
  lineChartdata: any;
  lineChartoptions: any;
  branchId = null;
  skillIds: any;
  skillsData = [];
  jobData = [];

  constructor(private dashboardService: DashoardService) {}

  ngOnInit(): void {
    this.getLineChartData();
    this.getDashboardSkills();
    this.data = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [540, 325, 702],
          backgroundColor: ['#56d798', '#ff8397', '#6970d5'],
          hoverBackgroundColor: ['#56d798', '#ff8397', '#6970d5'],
        },
      ],
    };

    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: '#6970d5',
          },
        },
      },
    };

    this.data1 = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ['#56d798', '#ff8397', '#6970d5'],
          hoverBackgroundColor: ['#56d798', '#ff8397', '#6970d5'],
        },
      ],
    };

    this.options1 = {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: '#ff8397',
          },
        },
      },
    };
  }

  getLineChartData() {
    let branchId = localStorage.getItem('branchId');
    if (branchId) {
      this.dashboardService.GetDashboardJobs(branchId).subscribe((res: any) => {
        if (res && res.data.length) {
          let obj = res.data[0];
          for (const property in obj) {
            let Filterarr = [];
            if (obj[property] && obj[property].length > 2) {
              for (const element of obj[property]) {
                if (element['Status'] == 'ASSIGNED') {
                  let data = obj[property].find(
                    (x) => x.Status == 'UNACCEPTED'
                  );
                  let appendData = data && data['Jobs'] ? data['Jobs'] : 0;
                  element['Jobs'] = element['Jobs'] + ` (${appendData})`;
                  Filterarr.push(element);
                } else if (element['Status'] == 'UNASSIGNED') {
                  let data = obj[property].find((x) => x.Status == 'REJECTED');
                  let appendData = data && data['Jobs'] ? data['Jobs'] : 0;
                  element['Jobs'] = element['Jobs'] + ` (${appendData})`;
                  Filterarr.push(element);
                } else if (element['Status'] == 'STARTED') {
                  let data = obj[property].find((x) => x.Status == 'DELAYED');
                  let appendData = data && data['Jobs'] ? data['Jobs'] : 0;
                  element['Jobs'] = element['Jobs'] + ` (${appendData})`;
                  Filterarr.push(element);
                } else if (element['Status'] == 'MISSED') {
                  let data = obj[property].find((x) => x.Status == 'SCHEDULED');
                  let appendData = data && data['Jobs'] ? data['Jobs'] : 0;
                  element['Jobs'] = element['Jobs'] + ` (${appendData})`;
                  Filterarr.push(element);
                }
              }
            } else {
              if (obj[property]) {
                for (const element of obj[property]) {
                  Filterarr.push(element);
                }
              } else {
                Filterarr.push([]);
              }
            }
            let finalobj = {
              header: property,
              value: Filterarr,
            };
            this.jobData.push(finalobj);
          }
        }
      });
    }
    this.lineChartdata = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: '#ff8397',
          tension: 0.4,
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: '#22c55e',
          tension: 0.4,
        },
      ],
    };

    this.lineChartoptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: '#ff8397',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#ff8397',
          },
          grid: {
            color: '#ff8397',
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: '#ff8397',
          },
          grid: {
            color: '#ff8397',
            drawBorder: false,
          },
        },
      },
    };
  }

  getDashboardSkills(): void {
    this.branchId = localStorage.getItem('branchId');
    this.skillIds = localStorage.getItem('reqServiceSkill');
    const frDate = Utils.formatDate(new Date());
    const toDate = Utils.formatDate(new Date());
    this.dashboardService
      .GetDashboardSkills(frDate, toDate, this.branchId, this.skillIds)
      .subscribe((res: any) => {
        if (res && res.status == 200) {
          this.skillsData = res['data'];
          console.log('res', this.skillsData);
        }
      });
  }
}
