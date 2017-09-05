// >> http-post-service
import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable as RxObservable } from "rxjs/Observable";
import "rxjs/add/operator/map";



@Injectable()
export class MyHttpPostService {
    private serverUrl = "https://fcm.googleapis.com/fcm/send";

    constructor(private http: Http) { }

    postData(data: any) {
        console.log("POST");
        console.log("Data"+data);
        let options = this.createRequestOptions();
        return this.http.post(this.serverUrl, data, options)
            .map(res => res.json());

        // var headers = {
        //     'Authorization': 'key=YOUR-SERVER-KEY',
        //     'Content-Type': 'application/json'
        // };
        
        // var dataString = {
        //   "notification": {
        //     "title": "Portugal vs. Denmark",
        //     "body": "5 to 1",
        //     "icon": "firebase-logo.png",
        //     "click_action": "http://localhost:8081"
        //   },
        //   "to": "DEVICE_REGISTRATION_TOKEN"
        // };
        
        // var options = {
        //     url: 'https://fcm.googleapis.com/fcm/send',
        //     method: 'POST',
        //     headers: headers,
        //     body: dataString
        // };
        
        // function callback(error, response, body) {
        //     if (!error && response.statusCode == 200) {
        //         console.log(body);
        //     }
        // }
        
        // request(options, callback);

    }

    private createRequestOptions() {
        let headers = new Headers();
        headers.append("Authorization", "key=AAAAhbsxMHI:APA91bGfBpwM-gxUBkWV0Rodt2RPgUAV43fk1Rm77hK2LOZaNhB7vw2mf9-vqbiTwVp-P03vfzwBI6bREfqMbRsbSS4PnUkFvO2xMgm6bs7BiGolCxytABKjAevSfz2b9cyVIhIq6xlk");
        headers.append("Content-Type", "application/json");
        let options = new RequestOptions({ headers: headers });
        console.log("Options--"+options);
        return options;
    }
}
// << http-post-service





