import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  currentTime = moment().format("MM/DD/YYYY hh:mm A");
  title = 'myApp';
  
}
