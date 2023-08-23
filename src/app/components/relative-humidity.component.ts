import { Component, Input } from '@angular/core';

@Component({
    selector: 'relative-humidity-chart',
    template: `
      <div style="display: block">
        <canvas baseChart
          [type]="'bar'"
          [datasets]="barChartData"
          [labels]="barChartLabels"
          [options]="barChartOptions"
          [plugins]="barChartPlugins"
          [legend]="barChartLegend"
        ></canvas>
      </div>
    `,
  })
  export class RelativeHumidityComponent {
    @Input() barChartData: any[] = [];
    @Input() barChartLabels: string[] = [];
    @Input() barChartOptions: any = {};
    @Input() barChartPlugins: any = [];
    @Input() barChartLegend = true;
  }