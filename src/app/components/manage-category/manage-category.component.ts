import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
import { SnackbarService } from '../../services/snackbar.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CategoryComponent } from '../dialog/category/category.component';

@Component({
  selector: 'app-manage-category',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatIconModule, CategoryComponent],
  templateUrl: './manage-category.component.html',
  styleUrl: './manage-category.component.scss',
})
export class ManageCategoryComponent implements OnInit {
  displayedColumn: string[] = ['name','nameAr', 'description', 'image', 'edit'];
  dataSource: any;
  responseMessage: any;
  isDialogOpen = false;
  airbnbToDelete: string | null = null;
  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private dialog: MatDialog,
    private snackbarService: SnackbarService
  ) {}
  ngOnInit(): void {
    this.tableDate();
  }
  openDeleteDialog(id: string): void {
    this.airbnbToDelete = id;
    this.isDialogOpen = true;
  }
  tableDate() {
    this.categoryService.getCategories().subscribe(
      (response: any) => {
        console.log(response);
        this.dataSource = new MatTableDataSource(response);
      },
      (error: any) => {
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = 'Try Again';
        }
        this.snackbarService.openSnackBar(this.responseMessage, 'error');
      }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  handleAddAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add',
    };
    dialogConfig.width = '850px';
    const dialogRef = this.dialog.open(CategoryComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAddCategory.subscribe(
      (response) => {
        this.tableDate();
      }
    );
  }
  async handleDelete(confirmed: boolean) {
    if (confirmed && this.airbnbToDelete) {
      try {
        this.categoryService.delete(this.airbnbToDelete);
        console.log(
          `Airbnb with ID: ${this.airbnbToDelete} deleted successfully`
        );
      } catch (error) {
        console.error('Error deleting Airbnb:', error);
      }
    } else {
      console.log('Deletion canceled');
    }

    this.isDialogOpen = false;
    this.airbnbToDelete = null;
  }

  // handleDeleteAction(value: any) {
  //   this.categoryService.delete(value.id);
  // }
  handleEditAction(value: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data: value,
    };
    dialogConfig.width = '850px';
    const dialogRef = this.dialog.open(CategoryComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onEditCategory.subscribe(
      (respose) => {
        this.tableDate();
      }
    );
  }
}
