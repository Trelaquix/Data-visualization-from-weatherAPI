import { Component, Input } from '@angular/core';

@Component({
    selector: 'direct-radiation-chart',
    template: `
      <div style="display: block">
        <canvas baseChart
          [type]="'line'"
          [datasets]="areaChartData"
          [labels]="areaChartLabels"
          [options]="areaChartOptions"
          [plugins]="areaChartPlugins"
          [legend]="areaChartLegend"
        ></canvas>
      </div>
    `,
  })
  export class DirectRadiationChartComponent {
    @Input() areaChartData: any[] = [];
    @Input() areaChartLabels: string[] = [];
    @Input() areaChartOptions: any = {};
    @Input() areaChartPlugins: any = [];
    @Input() areaChartLegend = true;
  }