import {
  Injectable
} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {
  Observable
} from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {
    // exclude urls
    const excludedUrl = [`${environment.apiHost}/login`, `${environment.apiHost}/countries` ];

    if (excludedUrl.some(url => url === request.url)) {
      console.log('Excluded request: ' + request.url);
      return next.handle(request);
    } else {
      request = request.clone({
        setHeaders: {
          'X-Access-Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1ODI0MjQ4NjM0ODksInVzZXIiOjEsImVtYWlsIjoiZGllZ29mLmNvcm5lam9AZ21haWwuY29tIn0.fKHT39eU-UCiKE0ql9OIcry7ilFM4Of11cAhBF0VUp8',
          'Content-Type': 'application/json'
        }
      });
    }

    return next.handle(request);
  }
}
