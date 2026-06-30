import { Component, inject } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose } from "@angular/material/dialog";
import { MatIconButton, MatButton } from "@angular/material/button";
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatPrefix } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { EcommerceStore } from '../../../ecommerce-store';
import { DialogRef } from '@angular/cdk/dialog';
import { SignUpParams } from '../../models/user';
import { SignInDialog } from '../sign-in-dialog/sign-in-dialog';

@Component({
  selector: 'app-sign-up-dialog',
  imports: [MatIcon, MatDialogClose, MatIconButton, ReactiveFormsModule, MatFormField, MatInput, MatPrefix, MatButton],
  templateUrl: './sign-up-dialog.html',
  styleUrl: './sign-up-dialog.scss',
})
export class SignUpDialog {

  fb = inject(NonNullableFormBuilder);
  store = inject(EcommerceStore);
  dialogRef = inject(DialogRef);
  data = inject<{ checkout: boolean }>(MAT_DIALOG_DATA);
  matDialog = inject(MatDialog)

  signUpForm = this.fb.group({
    name: ['Jhon D', Validators.required],
    email: ['jhond@test.com', Validators.required],
    password: ['test123', Validators.required],
    confirmPassword: ['test123', Validators.required]
  });

  signUp(){

    if(!this.signUpForm.valid){
      this.signUpForm.markAsTouched();
      return;
    }

    const { name, email, password } = this.signUpForm.value;
    this.store.signUp({
      name, email, password, dialogId: this.dialogRef.id, checkout: this.data?.checkout
    } as SignUpParams)
  }

  openSignInDialog(){
    this.dialogRef.close();
    this.matDialog.open(SignInDialog, {
      disableClose: true,
      data: {
        checkout: this.data?.checkout
      }
    })
  }
}
