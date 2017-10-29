import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { API_RAZORPAY } from '../constants';
import { Trip } from '../models/trip.model';
import { environment } from '../../../environments/environment';

declare const Razorpay: any;

@Injectable()
export class PaymentService {

    razorpay: any;

    constructor(private _http: Http) { }

    public initiatePayment(trip: any) {
        let amount: any = (trip.price * 100).toString();
        let this_trip: any = trip;
        let this_http: any = this._http;
        const options = {
            "key": environment.razorpay_api_key,
            "amount": amount,
            "name": "blowhorn",
            "description": "Logistic Services",
            "image": "/static/img/logo.png",
            "prefill": {
                "name": '', //profile_data.name,
                "email": '', //profile_data.email,
                "contact": '', //profile_data.mobile
            },
            "notes" : {
                "booking_id" : this_trip.orderId,
                "booking_key" : this_trip.orderKey,
                'type' : 'booking',
            },

            "handler": function (response) {
                console.log(response);
                //this._http.get(API_ALL_TRIPS).map((resp: any) => {
                let data: any = {
                    'booking_key': this_trip.orderKey,
                    'txn_id': response.razorpay_payment_id,
                    'amount': amount,
                    'type': 'booking'
                };
                console.log(data, this_http);
                this_http.post(API_RAZORPAY, data ).map((resp: any) => {
                    console.log(resp);
                    this_trip.paymentStatus = 'paid';
                    //let data_json: any = JSON.parse(resp);
                    /*
                          if(data_json['status'] == 'True'){
                              $('#status-placeholder').text("Payment Successful");
                              $("#status-placeholder").css("color", "green");
                          }
                          else {
                              $('#status-placeholder').text("Transaction Failed");
                              $("#status-placeholder").css("color", "red");
                          }
                     */
                }).subscribe();
            },
        };

        let razorpay = new Razorpay(options);
        razorpay.open();
    }
}
