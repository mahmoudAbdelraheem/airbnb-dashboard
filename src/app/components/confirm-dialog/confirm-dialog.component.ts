import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [BrowserModule, MatDialogModule, MatButtonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
})
export class ConfirmDialogComponent {
  @Output() confirm = new EventEmitter<boolean>();

  onCancel(): void {
    this.confirm.emit(false);
  }

  onConfirm(): void {
    this.confirm.emit(true);
  }
}
