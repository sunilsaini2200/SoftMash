
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_BASE_URL } from 'src/app/SoftMash-Api';

export interface IUploadResponse {
  path: string;
}

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, private toastr: ToastrService, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    this.http = http;
    this.baseUrl = baseUrl ? baseUrl : "";
  }

  post(file: File): Observable<string> {
    let url_ = this.baseUrl + "/api/File/upload";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = new FormData();
    if (file !== null && file !== undefined)
      content_.append("file", file, file.name);
    return this.http
      .post(url_, content_)
        .pipe(map((v: IUploadResponse) => {            
        return v.path;
      }));
  }
}
