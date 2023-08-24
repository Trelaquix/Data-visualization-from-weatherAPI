import { Component, Input } from '@angular/core';

@Component({
  selector: 'temperature-chart',
  template: `
    <div style="display: block">
      <canvas baseChart
      [type]="'line'"
        [datasets]="lineChartData"
        [labels]="lineChartLabels"
        [options]="lineChartOptions"
        [legend]="lineChartLegend"
        ></canvas>
    </div>
  `,
})
export class TemperatureChartComponent {
  @Input() lineChartData: any[] = [];
  @Input() lineChartLabels: string[] = [];
  @Input() lineChartOptions: any = {};
  @Input() lineChartLegend = true;
}
