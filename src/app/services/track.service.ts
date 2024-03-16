import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable({ providedIn: 'root' })
export class TrackAWBService {
    private readonly API_KEY = "MKm9eBuRPJGTADP3Ina1Vg6wA82FvNGX";
    private trackAndTraceURL = 'https://api-gateway.champ.aero/csp/track-and-trace/v1/airwaybill';

    constructor(
        private http: HttpClient) { }

    getAWB(airlinePrefix: number, serialNumber: number): Observable<any> {
        const headers = new HttpHeaders().set('apikey', this.API_KEY);
        const url = `${this.trackAndTraceURL}?airlinePrefix=${airlinePrefix}&serialNumber=${serialNumber}`;
        return this.http.get<any>(url, { headers });
    }
}
