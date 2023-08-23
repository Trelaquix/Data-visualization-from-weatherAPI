import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'https://api.open-meteo.com/v1/forecast';

  constructor(private http: HttpClient) { }

  getWeatherData(latitude: number, longitude: number, startDate: string, endDate: string): Observable<any> {
    const url = `${this.apiUrl}?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&hourly=relativehumidity_2m`;

    return this.http.get(url).pipe(
        tap((data) => {
          console.log(data);
        })
      );
    }
}
