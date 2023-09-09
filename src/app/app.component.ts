import { LocalForageService } from './service/local-forage.component';
import { Component, ViewEncapsulation } from '@angular/core';
import { WeatherService } from './service/weather.service';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None // For disabling @angular/material/tabs auto styling to applying custom highlighting style
})
export class AppComponent {
  title = 'weatherAPI';

  constructor(private weatherService: WeatherService, private localForageService: LocalForageService) {}

  // Code to saving data to local storage
  saveDataToLocalStorage(data: any) {
    this.localForageService.setItem('weatherData', data).subscribe(
      () => {
        console.log('Data saved to local storage');
      },
      (error) => {
        console.error('Error saving data:', error);
      }
    );
  }
  
  // Code to retrieve data from local storage
  retrieveDataFromLocalStorage() {
    this.localForageService.getItem('weatherData').subscribe(
      (data) => {
        console.log('Retrieved data:', data);
        this.relativeHumidityData[0].data = data.hourly.relativehumidity_2m; // Populate data for relative humidity
        this.relativeHumidityLabels = data.hourly.time; // Populate label for relative humidity

        this.temperatureData = [ // Populate data for temperature
          { data: data.daily.temperature_2m_min, label: 'Temperature Min (' + data.daily_units.temperature_2m_min + ')' },
          { data: data.daily.temperature_2m_max, label: 'Temperature Max (' + data.daily_units.temperature_2m_max + ')' },
        ];
        this.temperatureLabels = data.daily.time; // Populate label for temperature

        this.directRadiationData[0].data = data.hourly.direct_radiation;
        this.directRadiationLabels = data.hourly.time;
      },
      (error) => {
        console.error('Error retrieving data:', error);
      }
    );
  }

  selectedTab: string = 'relativeHumidity'; // Default tab
  selectedTabIndex = 0;

  onTabChange(event: MatTabChangeEvent): void { // For switching between tabs
    this.selectedTabIndex = event.index;
    const selectedTabLabel = event.tab.textLabel;
    
    switch (selectedTabLabel) {
      case 'Relative Humidity':
        this.selectedTab = 'relativeHumidity'; // Switch to Relative Humidity tab
        break;
      case 'Temperature':
        this.selectedTab = 'temperature'; // Switch to Temperature tab
        break;
      case 'Direct Radiation':
        this.selectedTab = 'directRadiation'; // Switch to Direct Radiation tab
        break;
      default:
        this.selectedTab = 'relativeHumidity'; // Default is set to 'relativeHumidity tab'
    }
    
    const tabElement = document.querySelector('.mat-tab-group>mat-tab[aria-selected="true"]'); // Get the tab element that is currently selected
    tabElement?.classList.add('active'); // Add the active class to the tab element for highlighting rule
  }

  relativeHumidityData = [{ data: [], label: 'Relative Humidity (%)' }]; // Declare relativeHumidityData property
  relativeHumidityLabels = []; // Declare relativeHumidityLabels property
  relativeHumidityOptions = { // Declare relative humidity options for responsive design
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { display: false } },
      y: { ticks: { beginAtZero: true, max: 100 } },
    },
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false
      },
      legend: {
        position: 'top'
      },
      fill: {
        alpha: 0.5
      }
    }
  };

  temperatureData: { data: any[]; label: string }[] = []; // Declare temperatureData Labels property
  temperatureLabels = []; // Declare temperatureLabels property
  temperatureOptions = { // Declare temperature options for responsive design
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { display: false } },
      y: { ticks: { beginAtZero: true, max: 100 } },
    },
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false
      },
      legend: {
        position: 'top'
      },
      fill: {
        alpha: 0.5
      }
    }
  };

  directRadiationData = [{ // Declare directRadiationData property and fill the area under the chart
    data: [],
    label: 'Direct Radiation (W/m²)',
    fill: true,
    tension: 0.5,
    borderColor: 'black',
    backgroundColor: 'rgba(255,0,0,0.3)' 
  }];
  directRadiationLabels = []; // Declare directRadiationLabels property
  directRadiationOptions = { // Declare direct radiation options for responsive design
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        maintainAspectRatio: false,
      x: { grid: { display: false } },
      y: { ticks: { beginAtZero: true, max: 100 } },
    },
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false
      },
      legend: {
        position: 'top'
      },
      fill: {
        alpha: 1,
        fillcolor: 'blue',
        fill: true
      }
    }
  };

  ngOnInit(): void {
    // Parameters for api call for potential future enhancements to allow users to select the location and time period
    const latitude = 1.29;
    const longitude = 103.85;
    const startDate = '2023-01-01';
    const endDate = '2023-01-10';
  
    this.weatherService.getWeatherData( latitude, longitude, startDate, endDate )
      .subscribe((data) => {
        this.saveDataToLocalStorage(data); // Adding data to local indexed database

        this.relativeHumidityData[0].data = data.hourly.relativehumidity_2m; // Populate data for relative humidity
        this.relativeHumidityLabels = data.hourly.time; // Populate label for relative humidity

        this.temperatureData = [ // Populate data for temperature
          { data: data.daily.temperature_2m_min, label: 'Temperature Min (' + data.daily_units.temperature_2m_min + ')' },
          { data: data.daily.temperature_2m_max, label: 'Temperature Max (' + data.daily_units.temperature_2m_max + ')' },
        ];
        this.temperatureLabels = data.daily.time; // Populate label for temperature

        this.directRadiationData[0].data = data.hourly.direct_radiation;
        this.directRadiationLabels = data.hourly.time;
      },(error) => { // Error handling API call fail or not accessible 
        console.error('API call failed:', error);
        this.retrieveDataFromLocalStorage(); // Retrieving data from local storage will be used if available API call fails or there is no internet connection
      });
  }
}
