import { Component, OnInit } from '@angular/core';
import { IDashboard } from '../../providers/models/dashboard/dashboard.inteface';
import { DashboardService } from '../../providers/services/dashboard.service';

@Component({
    selector: 'rlg-onboarding-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashBoardComponent implements OnInit {
    dashboard: IDashboard[];
    dashboardView: DashboardView[];
    private associateId: string;
    constructor(private dashboardService: DashboardService) {
    }

    ngOnInit(): void {
        this.loadDashboard();
    }

    private loadDashboard(): void {
        this.dashboardService.get()
            .subscribe(dashboard => {
                this.dashboard = dashboard
                this.dash();
            });
    }

    private dash() {
        let unique = Array.from(new Set(this.dashboard.map(item => item.ProjectId + item.TeamId)));

        this.dashboardView = [];
        unique.forEach(item => {
            var dashboard = this.dashboard.filter(
                dashboard => dashboard.ProjectId + dashboard.TeamId === item);

            var completedPercent = Math.round((dashboard.map(c => c.CompletedCount).reduce((a, b) => a + b, 0) / dashboard.map(c => c.Count).reduce((a, b) => a + b, 0)) * 100);
            completedPercent = isNaN(completedPercent) ? 100 : completedPercent;
            var balancePercent = 100 - completedPercent;

            let roles: DashboardRole[] = [];

            dashboard.forEach(item => {
                if (item.RoleName) {
                    let role = new DashboardRole(item.RoleName, item.CompletedCount, item.Count)
                    roles.push(role);
                }
            });

            this.dashboardView.push(new DashboardView(dashboard[0].ProjectName, dashboard[0].TeamName, [completedPercent, balancePercent], roles));
        });
    }

    // Doughnut Chart
    public doughnutChartData: number[] = [45, 55];
    public doughnutChartType: string = 'doughnut';
    public doughnutChartColours: any[] = [{
        backgroundColor: ['#6d3583', '#e6e6ff']
    }];
    public doughnutOptions: any = {
        cutoutPercentage: 80,
        hover: { mode: null },
        tooltips: { enabled: false },
        elements: {
            arc: {
                borderWidth: 0
            }
        }
    };

    public doughnutChartPlugins: any[] = [{
        afterDraw(chart) {
            const ctx = chart.ctx;        
            var txt2 = chart.tooltip._data.datasets[0].data[0] + "%";
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
            const centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
            const fontSizeToUse = 25;
            ctx.font = fontSizeToUse + 'px Arial';
            ctx.fillStyle = '#e2542f';
            ctx.fillText(txt2, centerX, centerY);
        }
    }];

    // events
    public chartClicked(e: any,doughnutChartData: any): void {
        console.log(e);
        console.log(doughnutChartData);
    }
}

export class DashboardView {
    constructor(
        public Project: string,
        public Team: string,
        public DoughnutChartData: number[],
        public Roles: DashboardRole[]
    ) {

    }
}

export class DashboardRole {
    constructor(
        public Role: string,
        public CompletedCount: number,
        public TotalCount: number
    ) {

    }
}