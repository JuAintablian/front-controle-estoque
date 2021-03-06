import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PAYMENT_METHOD, PRODUCTS } from '@app/mocks';
import { HotToastService } from '@ngneat/hot-toast';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ngd-sales-create-edit',
  templateUrl: './sales-create-edit.component.html',
  styleUrls: ['./sales-create-edit.component.scss'],
})
export class SalesCreateEditComponent implements OnInit {
  salesFormGroup: FormGroup;
  productsList = PRODUCTS;
  paymentMethods = PAYMENT_METHOD;
  removeProductDisabled$$ = new BehaviorSubject<boolean>(true);

  get products() {
    return this.salesFormGroup.get('products') as FormArray;
  }

  constructor(private router: Router, private toastService: HotToastService) {
    this.initializeForm();
  }

  ngOnInit(): void {}

  selectedItem({ value }: SelectedProduct, group: AbstractControl) {
    const categoryID = this.productsList.find((c) => c.id === value)
      ?.categoryID;
    group.patchValue({ category: categoryID });
  }

  addProduct() {
    this.products.push(this.createProduct());
    this.removeProductDisabled$$.next(false);
  }

  deleteProduct(index: number) {
    const canRemove = this.products.length > 1;

    if (canRemove) {
      this.products.removeAt(index);
      this.toastService.success('removido com sucesso!');
    }
    const canDisableButton = this.products.length === 1;
    this.removeProductDisabled$$.next(canDisableButton);
  }

  save() {
    if (this.salesFormGroup.invalid) {
      return;
    }

    const sale = {
      ...{ date: new Date() },
      ...this.salesFormGroup.value,
      ...{ total: this.getTotalQuantity() },
    };

    this.toastService.success('Venda adicionada com sucesso!');

    this.salesFormGroup.reset();
    this.initializeForm();
  }

  private initializeForm() {
    this.salesFormGroup = new FormGroup({
      products: new FormArray([this.createProduct()]),
      paymentForm: new FormControl(null, [Validators.required]),
    });
  }

  private getTotalQuantity(): number {
    return this.products.controls
      .map(({ value: controls }) => controls)
      .reduce((acc, cur) => (acc = acc + cur.quantity), 0);
  }

  private createProduct(): FormGroup {
    return new FormGroup({
      product: new FormControl(null, [Validators.required]),
      category: new FormControl(null, [Validators.required]),
      quantity: new FormControl(null, [Validators.required, Validators.min(1)]),
    });
  }
}

interface SelectedProduct {
  value: number;
}
