import { Component } from '@angular/core';
import { RelativeHumidityComponent } from './components/relative-humidity.component';
import { WeatherService } from './service/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weatherAPI';
  humidityData = [{ data: [], label: 'Relative Humidity (%)' }]; // Declare the humidityData property as an array
  humidityLabels = []; // Declare the humidityLabels property as an array
  humidityOptions = {
    responsive: true,
    scales: {
      x: { grid: { display: false } }, // Use an object instead of an array
      y: { ticks: { beginAtZero: true, max: 100 } }, // Use an object instead of an array
    },
  };
  
  constructor(private weatherService: WeatherService) {}
  ngOnInit(): void {
    const latitude = 1.29;
    const longitude = 103.85;
    const startDate = '2023-01-01';
    const endDate = '2023-01-10';
  
    this.weatherService.getWeatherData(latitude, longitude, startDate, endDate)
      .subscribe((data) => {
        this.humidityData[0].data = data.hourly.relativehumidity_2m;
        this.humidityLabels = data.hourly.time;

        console.log("humidityData",this.humidityData)
        console.log("humidityLabels",this.humidityLabels)
      });
  }
}
