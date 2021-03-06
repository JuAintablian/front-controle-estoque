import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PAYMENT_METHOD } from '@app/mocks';
import { PaymentMethod } from '@app/models';
import { HotToastService } from '@ngneat/hot-toast';
import { of } from 'rxjs';

@Component({
  templateUrl: './payment-method-create-edit.component.html',
  styleUrls: ['./payment-method-create-edit.component.scss'],
})
export class PaymentMethodCreateEditComponent implements OnInit {
  form: FormGroup;
  id: number;

  private currentAction: 'create' | 'update' = 'create';
  private actions = {
    create: this.createPaymentMethod,
    update: this.updatePaymentMethod,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastService: HotToastService
  ) {}

  ngOnInit(): void {
    this.createForm();
    (this.id = +this.route.snapshot.params.id) && this.load();
  }

  createForm() {
    this.form = new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  load() {
    this.currentAction = 'update';
    of(PAYMENT_METHOD.find((item) => item.id === this.id)).subscribe(
      (paymentMethod: PaymentMethod | undefined) => {
        if (!paymentMethod) {
          throw new Error('Forma de pagamento não foi localizada');
        }
        const { id, description } = paymentMethod;
        this.form.patchValue({ id, description });
      }
    );
  }

  createPaymentMethod() {
    console.log('Created successfully');
  }

  updatePaymentMethod() {
    console.log('Update successfully');
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const callActionFn = this.actions[this.currentAction];
    callActionFn();
    this.toastService.success('Salvo com sucesso!');
    this.goBack();
  }

  goBack() {
    this.router.navigate(['/cadastros/formas-pagamento']);
  }
}
