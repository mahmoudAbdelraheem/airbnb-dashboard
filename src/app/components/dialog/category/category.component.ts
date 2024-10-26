import { Component, EventEmitter, inject, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { SnackbarService } from '../../../services/snackbar.service';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { Firestore } from '@angular/fire/firestore';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import {
  Storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from '@angular/fire/storage';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit {
  onAddCategory = new EventEmitter();
  onEditCategory = new EventEmitter();
  categoryForm: any = FormGroup;
  formBuilder = inject(FormBuilder);
  storage = inject(Storage);
  firestore = inject(Firestore);
  dialogAction: any = 'Add';
  action: any = 'Add';
  responseMessage: any;
  selectedFile: File | null = null;
  isSubmitting: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<CategoryComponent>,
    private snackbar: SnackbarService
  ) {}
  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      label: [null, [Validators.required]],
      description: [null, Validators.required],
      icon: [null, Validators.required],
      image: [null],
    });
    if (this.dialogData.action == 'Edit') {
      this.dialogAction = 'Edit';
      this.action = 'Update';
      this.categoryForm.patchValue(this.dialogData.data);
    }
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    console.log(file);
    if (file) {
      this.selectedFile = file;
    }
  }
  handleSubmit() {
    if (this.dialogAction == 'Edit') {
      this.edit();
    } else {
      this.add();
    }
  }
  async add() {
    if (this.categoryForm.valid) {
      try {
        await this.categoryService
          .add(this.categoryForm.value, this.selectedFile!)
          .then((response) => {
            this.onAddCategory.emit();
          });
        this.categoryForm.reset();
        this.selectedFile = null;
      } catch (error: any) {
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = 'Error when Upload Data';
        }
      }
      this.snackbar.openSnackBar(this.responseMessage, 'error');
    }
  }
  async edit() {
    if (this.categoryForm.valid) {
      try {
        await this.categoryService
          .update(
            this.dialogData.data.id,
            this.categoryForm.value,
            this.selectedFile!
          )
          .then((response) => {
            this.onEditCategory.emit();
          });
        this.categoryForm.reset();
        this.selectedFile = null;
      } catch (error: any) {
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = 'Error when Upload Data';
        }
        this.snackbar.openSnackBar(this.responseMessage, 'error');
      }
    }
  }

  // private resetForm(): void {
  //   this.categoryForm.reset();
  //   this.selectedFile = null;
  //   this.uploadProgress = 0;
  // }
}
