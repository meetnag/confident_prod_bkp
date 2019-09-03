import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  uri = '';
  private api = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public getJsonOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return httpOptions;
  }

  public setOptions(body: any) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: body
    };
    return options;
  }

  /**
       * @name extractData
       * @function extracts the data from the response
       * @returns response
       * @param response from the server
       */

  public extractData(res: Response) {
    const body = res;
    return body || {};
  }

  public apiCaller(type: string, url: string, data?: any, blob?: any): any {
    this.uri = this.api + url;

    if (type === 'get') {
      return this.get(this.uri);
    } else if (type === 'get' && blob) {
      return this.getBlob(this.uri);
    } else {
      return this.post(this.uri, data);
    }

  }

  private post(url: string, data: any): any {
    return this.http.post(url, data, { headers: this.getHeaders() });
  }
  private get(url: string): any {
    return this.http.get(url, { headers: this.getHeaders() });
  }
  private getBlob(url: string): any {
    return this.http.get(url, { headers: this.getHeaders(), responseType: "blob" });
  }
  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    return headers;
  }

}
