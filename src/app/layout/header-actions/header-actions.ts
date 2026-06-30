import { Component, inject } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from "@angular/router";
import { MatBadge } from "@angular/material/badge";
import { EcommerceStore } from '../../../ecommerce-store';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu'
import { MatDivider } from "@angular/material/divider";
import { MatDialog } from '@angular/material/dialog';
import { SignInDialog } from '../../components/sign-in-dialog/sign-in-dialog';
import { SignUpDialog } from '../../components/sign-up-dialog/sign-up-dialog';

@Component({
  selector: 'app-header-actions',
  imports: [MatButton, MatIconButton, MatIcon, RouterLink, MatBadge, MatMenu, MatMenuItem, MatMenuTrigger, MatDivider],
  templateUrl: './header-actions.html',
  styleUrl: './header-actions.scss',
})
export class HeaderActions {

  store = inject(EcommerceStore);
  matDialog = inject(MatDialog)

  openSignInDialog(){
    this.matDialog.open(SignInDialog, {
      disableClose: true
    });
  }

  openSignUpDialog(){
    this.matDialog.open(SignUpDialog, {
      disableClose: true
    });
  }

}
