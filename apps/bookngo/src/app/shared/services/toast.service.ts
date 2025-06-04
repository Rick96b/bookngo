import { Injectable } from '@angular/core';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private readonly alertService: TuiAlertService) {}

  show(message: string, type: TuiNotification = TuiNotification.Info, options: { label?: string; autoClose?: boolean } = {}) {
    this.alertService.open(message, {
      label: options.label,
      status: type,
      autoClose: options.autoClose ?? true,
    }).subscribe();
  }

  success(message: string, label?: string) {
    this.show(message, TuiNotification.Success, { label });
  }

  error(message: string, label?: string) {
    this.show(message, TuiNotification.Error, { label });
  }

  warning(message: string, label?: string) {
    this.show(message, TuiNotification.Warning, { label });
  }

  info(message: string, label?: string) {
    this.show(message, TuiNotification.Info, { label });
  }
} 