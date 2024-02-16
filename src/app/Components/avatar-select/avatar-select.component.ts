import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-avatar-select',
  templateUrl: './avatar-select.component.html',
  styleUrls: ['./avatar-select.component.css']
})
export class AvatarSelectComponent {
  constructor(@Inject(MAT_DIALOG_DATA) private data,private dialogRef: MatDialogRef<AvatarSelectComponent>){

  }
  selectedAvatarUrl = this.data.avatarUrl
  avatarList:any[] = [
    {
      imgUrl:"https://octdailops.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10400",
    },
    {
      imgUrl:"https://octdailops.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10401"
    },
    {
      imgUrl:"https://octdailops.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10402"
    },
    {
      imgUrl:"https://octdailops.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10403"
    },
    {
      imgUrl:"https://octdailops.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10404"
    },
    {
      imgUrl:"https://octdailops.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10405"
    },
    {
      imgUrl:"https://octdailops.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10406"
    },
    {
      imgUrl:"https://octdailops.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10407"
    },
    {
      imgUrl:"https://octdailops.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10408"
    },
  ]
  selectAvatar(item:any){
    this.selectedAvatarUrl = item
    this.dialogRef.close(item)
  }
}

