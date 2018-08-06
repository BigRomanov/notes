import { Component, OnInit, Input } from '@angular/core';

import { Alert, AlertType } from '../models/alert';
import { AlertService } from '../services/alert.service';

@Component({
    selector: 'alert',
    templateUrl: './alert.component.html',
})

export class AlertComponent {
    @Input() id: string;

    alerts: Alert[] = [];

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.alertService.getAlert(this.id).subscribe((alert: Alert) => {
            console.log("New alert", alert);
            if (!alert.message) {
                // clear alerts when an empty alert is received
                this.alerts = [];
                return;
            }

            // add alert to array
            this.alerts.push(alert);
            console.log(this.alerts);
        });
    }

    removeAlert(alert: Alert) {
        console.log("removeAlert", this.alerts);
        this.alerts = this.alerts.filter(x => x !== alert);
    }

    cssClass(alert: Alert) {
        if (!alert) {
            return;
        }

        // return css class based on alert type
        switch (alert.type) {
            case AlertType.Success:
                return 'alert alert-success';
            case AlertType.Error:
                return 'alert alert-danger';
            case AlertType.Info:
                return 'alert alert-info';
            case AlertType.Warning:
                return 'alert alert-warning';
        }
    }
}