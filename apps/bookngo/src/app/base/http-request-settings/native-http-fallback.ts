import { HttpBackend, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NativeHttpBackend } from './native-http-backend.service';
import { Capacitor } from '@capacitor/core';
import { Injectable } from '@angular/core';

@Injectable()
export class NativeHttpFallback implements HttpBackend {
    constructor(private _cordovaHttpBackend: NativeHttpBackend, private _httpBackend: HttpBackend) {
    }

    public handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {

        if (Capacitor.isNativePlatform()) {
            return this._cordovaHttpBackend.handle(req);
        } else {
            return this._httpBackend.handle(req);
        }
    }
}
