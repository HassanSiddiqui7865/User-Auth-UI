
import { Component, ElementRef, EventEmitter, Inject, NgZone, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
//import { SaleService } from 'src/app/appServices/sale.service';
// import { DataSharingService } from 'src/app/services/data-sharing.service';
// import { MessageService } from 'src/app/services/message.service';
import { UserService } from '../Services/Users/user.service';
// import { VonageService } from 'src/app/services/vonage.service';
// import { LinkUnknownNumberComponent } from './link-unknown-number/link-unknown-number.component';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
declare function VonageJWtSetting(token: any, phone: any, loginUserName: any): any;

@Component({
  selector: 'app-dialer',
  templateUrl: './dialer.component.html',
  styleUrls: ['./dialer.component.css']
})
export class DialerComponent {

  // constructor( 
  //   //private saleService: SaleService,
  //  // private dataSharingService: DataSharingService,
  //   private router: Router,
  //   public dialog: MatDialog,
  // //  private msg: MessageService,
  //  // private vonageService: VonageService,
  //   @Inject(MAT_DIALOG_DATA) private dialogdata: any,
  //   private dialogRef: MatDialogRef<DialerComponent>, private toastr: ToastrService
  // ) {

  // }

  // @Output() eventEmit: EventEmitter<any> = new EventEmitter();
  // subscription: any;
  // msgSubscribe: Subscription;
  // newPhoneNumber: any = '';
   phonenumber: any = '';
  // myTextBox: HTMLInputElement;
  // caretPos: number = 0;
  // IsVonageIncoming: boolean = false;
  // IsVonageDialPad: boolean = true;
  // FormId: any = '';
   IsPopUp: boolean = false;
   message: any = '';
  // loginUserName: any = '';

  // ngOnDestroy() {
  //   if (this.subscription) {
  //     this.subscription.unsubscribe();
  //   }
  // }

  // // ngOnInit(): void {
  // //   window['angularComponentReferenceTextCall'] = { component: this, zone: this.ngZone, loadAngularFunction: (data: any) => this.angularFunctionCalled(data), };

  // //   var lm_login_token: any = localStorage.getItem('_lm_login_token');
  // //   this.loginUserName = JSON.parse(lm_login_token).Username;

  // //   this.subscription = this.dataSharingService.getMessage().subscribe((data: any) => {
  // //     if (data) {
  // //       if (data?.message.msgtype === 'justCall') {
  // //         this.SettingOpen('open');
  // //         this.FormId = data?.message?.FormId;
  // //         this.phonenumber = data?.message.JustCallPrimaryPhone;
  // //         this.SetVonageToken(this.phonenumber);
  // //       }
  // //     }
  // //   });

  // //   this.myTextBox = document.getElementById('phone-number') as HTMLInputElement;

  // //   if (this.dialogdata && this.dialogdata?.type == 'popup') {
  // //     this.IsPopUp = true;
  // //   }

  // //   if (this.dialogdata && this.dialogdata?.phone && this.dialogdata?.phone != '') {
  // //     this.IsPopUp = true;
  // //     this.SetVonageToken(this.phonenumber);
  // //   }
  // //   else if (this.dialogdata && this.dialogdata?.Id && this.dialogdata?.Id != '') {
  // //     this.IsPopUp = true;
  // //     this.SetVonageToken();
  // //     this.FormId = this.dialogdata?.Id;
  // //   }
  // //   else {
  // //     this.SetVonageToken();
  // //   }
  // // }

  // call() {
  //   this.message = '';
  //   if (this.phonenumber.trim() == '' || this.phonenumber.trim().length < 10)
  //     this.message = 'Please enter a valid phone number!';
  //   else
  //     this.SetVonageToken(this.phonenumber.trim());
  // }

  // // angularFunctionCalled(data: any) {
  // //   console.log('data==>', data);
  // //   if (data.callDirection == 'inbound' && (data.callStatus == "rejected" || data.callStatus == "completed")) {
  // //     this.msg.sendMessage({ 'type': 'communication_update' });
  // //     this.reloadCurrentRoute();
  // //     this.phonenumber = data.From;

  // //     if (data?.loginUserName && data?.loginUserName == this.loginUserName)
  // //       this.openPopupForLinkUnknownNumber();
  // //   }
  // //   else if (this.FormId == '' && data.callDirection == 'outbound' && data.callStatus == "completed") {
  // //     this.msg.sendMessage({ 'type': 'communication_update' });
  // //     if (data?.loginUserName && data?.loginUserName == this.loginUserName)
  // //       this.openPopupForLinkUnknownNumber();
  // //   }

  // //   this.SettingOpen(data.type);
  // // }

  // // reloadCurrentRoute() {
  // //   const el_IsVonageIncoming = document.getElementById('IsVonageIncoming');
  // //   const el_IsVonageDialPad = document.getElementById('IsVonageDialPad');

  // //   if (el_IsVonageIncoming != null && el_IsVonageDialPad != null) {
  // //     el_IsVonageDialPad.style.display = 'block';
  // //     el_IsVonageIncoming.style.display = 'none';
  // //     this.SetVonageToken();
  // //   }
  // // }

  // getphone() {
  //   this.newPhoneNumber = this.phonenumber;
  //   console.log('newPhoneNumber==>', this.newPhoneNumber);
  // }

  // // linkCall() {
  // //   if (this.FormId && this.FormId != '') {
  // //     this.vonageService.LinkPhoneNumber(this.FormId, this.phonenumber).subscribe((d: any) => {

  // //     });
  // //   }
  // // }

  // // openPopupForLinkUnknownNumber() {
  // //   this.phonenumber = this.phonenumber.replace('+1', '');
  // //   this.vonageService.IsUnknownPhoneNumber(this.phonenumber.trim()).subscribe((d: any) => {

  // //     if (d && d?.status) {
  // //       const dialogRef = this.dialog.open(LinkUnknownNumberComponent, {
  // //         data: {
  // //           search: this.phonenumber
  // //         },
  // //         width: '38%',
  // //         disableClose: true
  // //       });
  // //       dialogRef.afterClosed().subscribe((d: any) => {

  // //       });
  // //     }
  // //   });
  // // }

  // // SetVonageToken(phone: any = '') {
  // //   if (phone && phone != '') {
  // //     this.SettingOpen('open');
  // //     this.linkCall();
  // //   }

  // //   this.authService.GetVonageUser().subscribe(a => {
  // //     if (a && a['VonageUser'] != null) {
  // //       var VonageUserJwt = a['VonageUser']['UserJwt'];
  // //       localStorage.setItem('VonageUserJwt', VonageUserJwt);
  // //       VonageJWtSetting(VonageUserJwt, phone, this.loginUserName);
  // //     }
  // //   });
  // // }

  // SettingOpen(type: any) {
  //   this.eventEmit.emit({ type: type });
  // }

  dialnumber(str: any) {
    let currentValue: any = this.phonenumber;
    let cursor = this.getCursor();
    let patchedValue = currentValue.substr(0, cursor[0]) + str + currentValue.substr(cursor[1]);
    this.phonenumber = patchedValue;
  }

  getCursor() {
    let cursor: any = document.getElementById('phone-number');
    let start = cursor.selectionStart;
    let end = cursor.selectionEnd;
    return [start, end];
  }

  // clear() {
  //   let currentValue: any = this.phonenumber;
  //   let cursor = this.getCursor();
  //   let patchedValueStart = currentValue.substr(0, cursor[0]);
  //   let newpatchedValueStart = patchedValueStart.substr(0, patchedValueStart.length - 1);
  //   let patchedValueEnd = newpatchedValueStart + currentValue.substr(cursor[1]);
  //   this.phonenumber = patchedValueEnd;
  //   setTimeout(() => {
  //     this.myTextBox.focus();
  //     //this.myTextBox.setSelectionRange(2, 1);
  //   }, 0);
  // }
}

