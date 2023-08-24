import { Injectable } from '@angular/core';
import * as localforage from 'localforage';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalForageService {

  constructor() {
    localforage.config({
      driver: localforage.INDEXEDDB, // You can also choose other drivers like WebSQL or localStorage
      name: 'weatherDB',
      version: 1.0,
      storeName: 'weatherStore', // Change this to a meaningful name
    });
  }

  setItem(key: string, value: any): Observable<any> {
    return from(localforage.setItem(key, value));
  }

  getItem(key: string): Observable<any> {
    return from(localforage.getItem(key));
  }

  removeItem(key: string): Observable<any> {
    return from(localforage.removeItem(key));
  }

  clear(): Observable<void> {
    return from(localforage.clear());
  }

  keys(): Observable<string[]> {
    return from(localforage.keys());
  }
}
