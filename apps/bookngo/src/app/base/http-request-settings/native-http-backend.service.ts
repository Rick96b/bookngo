import { Injectable } from '@angular/core';
import {
    HttpBackend,
    HttpErrorResponse,
    HttpEvent,
    HttpHeaders,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { CapacitorHttp, HttpResponse as CapacitorHttpResponse } from '@capacitor/core';
import { HttpOptions } from '@capacitor/core/types/core-plugins';

@Injectable()
export class NativeHttpBackend implements HttpBackend {
    public handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {

        return new Observable((observer: Observer<HttpEvent<any>>): void => {
            const fireResponse: (response: { body: string; status: number; headers: any; }) => void =
                (response: { body: string; status: number; headers: any; }): void => {

                    const ok: boolean = response.status >= 200 && response.status < 300;

                    const body: any = response.body;

                    if (ok) {
                        observer.next(
                            new HttpResponse({
                                body,
                                headers: new HttpHeaders(response.headers),
                                status: response.status
                            })
                        );
                        observer.complete();
                    } else {
                        observer.error(
                            new HttpErrorResponse({
                                error: body,
                                headers: new HttpHeaders(response.headers),
                                status: response.status
                            })
                        );
                    }

                };

            const options: HttpOptions = {
                url: req.url,
                method: req.method,
                data: { ...req.body },
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            };

            CapacitorHttp.request(options).then((response: CapacitorHttpResponse): void => {
                fireResponse({
                    body: response.data,
                    status: response.status,
                    headers: response.headers
                });
            }).catch((error) => {
                fireResponse({
                    body: error.error,
                    status: error.status || 599,
                    headers: error.headers
                });
            });
        });
    }
}
