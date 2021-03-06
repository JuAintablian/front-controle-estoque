import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type AlertParams = { message: string; type: 'success' | 'error' };

@Component({
  selector: 'ngd-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('display', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translate(-10%,-10%)',
        }),
        animate(
          '100ms',
          style({
            opacity: 1,
            transform: 'translate(0,0)',
          })
        ),
      ]),
      transition(':leave', [
        animate(
          '100ms',
          style({
            opacity: 0,
            transform: 'translate(-10%,-10%)',
          })
        ),
      ]),
    ]),
  ],
})
export class AlertComponent {
  @Input()
  params: AlertParams | null;

  get cssClassName(): string {
    return this.params ? `alert alert--${this.params.type}` : '';
  }

  constructor() {}
}
