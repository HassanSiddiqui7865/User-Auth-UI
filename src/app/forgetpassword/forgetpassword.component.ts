// forgetpassword.component.ts

import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css'],
  animations: [
    trigger('slideAnimation', [
      transition('void => *', [
        style({ opacity: 0, transform: 'translateX(100%)' }),
        animate('500ms ease-in-out', style({ opacity: 1, transform: 'translateX(0%)' }))
      ]),
      transition('* => void', [
        animate('500ms ease-in-out', style({ opacity: 0, transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class ForgetpasswordComponent {
  activeSlideIndex: number = 0;
  username:string;
  dummyTrigger: any; // Dummy variable to trigger animation
  loading: boolean = false;
  error: any;

  isUsernameEntered(): boolean {
    return this.activeSlideIndex === 0;
  }

  getUserByusername() {
    // Simulating an asynchronous API call
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.activeSlideIndex++;
      this.dummyTrigger = {}; // Trigger animation by changing the dummy variable
    }, 1000);
  }
}
