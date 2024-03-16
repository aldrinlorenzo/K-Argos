import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PandoraIntelligenceService {
  private baseUrl = 'https://waybills.cargointelligence.pandoraintelligence.com/api/investigations';
  private secretToken: string = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjVBMTg0Njg3REVDRUMyOUFFNzY4QjkzQzExRTg0RDE2NDZBNjYzMjhSUzI1NiIsInR5cCI6ImF0K2p3dCIsIng1dCI6IldoaEdoOTdPd3BybmFMazhFZWhORmthbVl5ZyJ9.eyJuYmYiOjE3MTA1ODgyMjEsImV4cCI6MTcxMDU5MTgyMSwiaXNzIjoiaHR0cHM6Ly9zdHMuYXBwLnBhbmRvcmFpbnRlbGxpZ2VuY2UuY29tL2NoYW1wIiwiYXVkIjpbImNhcmdvaW50ZWxsaWdlbmNlLkRlZmF1bHQuU3dhZ2dlciIsImNhcmdvaW50ZWxsaWdlbmNlLkRlZmF1bHQuV2F5QmlsbCJdLCJjbGllbnRfaWQiOiJjaGFtcC5EZWZhdWx0LkhhY2thdGhvbiIsInRlbmFudF9pZCI6IjIzOWIxMmMxLTA4YTktNGRmOS1hNDFmLWQxOWY1NTM5ZTdlZiIsInRlbmFudF9uYW1lIjoiY2hhbXAiLCJ0ZW5hbnRfZGlzcGxheV9uYW1lIjoiQ0hBTVAiLCJpYXQiOjE3MTA1ODgyMjEsInNjb3BlIjpbImNhcmdvaW50ZWxsaWdlbmNlLkRlZmF1bHQuU3dhZ2dlci5mdWxsY29udHJvbCIsImNhcmdvaW50ZWxsaWdlbmNlLkRlZmF1bHQuV2F5QmlsbC5mdWxsY29udHJvbCJdfQ.Tbdg_qMw5lqQwwY_280VYmlNZojs_Vfke42eoHUgpSZpbozmgBTQcS0PvwvCk6ibZlQ33aPbpPT7-Txp6LhB1tFTFVk3HBeO0t6eBz3T5SPbCEF8e3pfsYAIlpDJ71cQ1oaeh6tSodec2O1Z4YPsvGIRh8u3VrPOC2BbJXIr_p2F9pjmaXheS7Y9oK0dFsx1eIVDoQYK47GXmG8-hJQLwe-koArKSHX2s2TUA_Mm6-E-2UBlDEABxuu9uGKDlYSJqVwnc5EbDq35P1Ada8jrXKc-fxAcdhop6uJIh13lWRFojOoIyXtdR8i7a00EH4-K0cOLyh2tb8-n_PNkKEAZBg';
  constructor(private http: HttpClient) { }

  getInvestigationStatus(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}?caseId=` + id);
  }

  uploadInvestigationItem(id: string): Observable<any> {
    // build the xml for this item
    var xml = '';
    return this.http.post(`${this.baseUrl}/house-waybill`, xml);
  }

}
