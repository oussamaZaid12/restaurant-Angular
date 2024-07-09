import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuService } from '../services/menu.service';
import { Menu } from '../models/menu.model';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {
  menus: Menu[] = [];
  showModal: boolean = false;
  isEdit: boolean = false;
  currentMenu: Menu = { id: 0, title: '', price: 0, image: '' };
  selectedFile: File | null = null;
  menuForm!: FormGroup;
  submitted = false;

  constructor(private menuService: MenuService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getMenus();
    this.initializeForm();
  }

  initializeForm() {
    this.menuForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(15)]],
      price: [0, [Validators.required, Validators.min(5)]],
      image: [null]
    });
  }

  get f() {
    return this.menuForm.controls;
  }

  getMenus(): void {
    this.menuService.getMenus().subscribe((data: Menu[]) => {
      this.menus = data;
    });
  }

  openAddMenuModal(): void {
    this.isEdit = false;
    this.submitted = false;
    this.currentMenu = { id: 0, title: '', price: 0, image: '' };
    this.selectedFile = null;
    this.menuForm.reset();
    this.menuForm.get('image')?.setValidators([Validators.required]); // Set image as required for add
    this.menuForm.get('image')?.updateValueAndValidity();
    this.showModal = true;
  }

  openEditMenuModal(menu: Menu): void {
    this.isEdit = true;
    this.submitted = false;
    this.currentMenu = { ...menu };
    this.selectedFile = null; // Reset selected file when opening the edit modal
    this.menuForm.patchValue({
      title: menu.title,
      price: menu.price,
      image: null // Reset image in form, handle file input separately
    });
    this.menuForm.get('image')?.clearValidators(); // Clear validators for edit
    this.menuForm.get('image')?.updateValueAndValidity();
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.menuForm.patchValue({ image: file });
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.menuForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('menu', JSON.stringify(this.menuForm.value));
    if (this.selectedFile) {
      formData.append('imageFile', this.selectedFile);
    }

    if (this.isEdit) {
      this.menuService.updateMenu(this.currentMenu.id, formData).subscribe(() => {
        this.getMenus();
        this.closeModal();
      });
    } else {
      this.menuService.createMenu(formData).subscribe(() => {
        this.getMenus();
        this.closeModal();
      });
    }
  }

  confirmDelete(id: number): void {
    const confirmed = confirm('Are you sure you want to delete this menu?');
    if (confirmed) {
      this.deleteMenu(id);
    }
  }

  deleteMenu(id: number): void {
    this.menuService.deleteMenu(id).subscribe(() => {
      this.getMenus();
    });
  }
}
