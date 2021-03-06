import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Action, ActionEvent } from '@app/models';

@Component({
  selector: 'ngd-generic-list',
  templateUrl: './generic-list.component.html',
  styleUrls: ['./generic-list.component.scss'],
})
export class GenericListComponent<T> {
  @Input() hasDefaultActions = true;
  @Input() hasActions = true;
  @Input() tableData: T[];
  @Output() actionEvent = new EventEmitter<ActionEvent<T>>();

  readonly defaultActions: Action[] = [
    {
      buttonText: 'Editar',
      eventName: 'edit',
      iconName: 'edit',
    },
    {
      buttonText: 'Deletar',
      eventName: 'delete',
      iconName: 'delete',
    },
  ];

  @Input()
  set itemsDisplayedColumns(items: any) {
    this._itemsDisplayedColumns = {
      ...items,
      ...(this.hasActions && { actions: items.actions ?? 'Ações' }),
    };
  }
  get itemsDisplayedColumns() {
    return this._itemsDisplayedColumns;
  }

  @Input()
  set actions(items: Action[]) {
    this._actions = items;
  }
  get actions(): Action[] {
    const actions = [
      ...((this.hasDefaultActions && this.defaultActions) || []),
      ...(this._actions || []),
    ];
    return actions;
  }

  get columnsWithoutActions(): string[] {
    return this.objectKeys(this.itemsDisplayedColumns).filter(
      (c) => c !== 'actions'
    );
  }

  objectKeys = Object.keys;

  private _actions: Action[] = [];
  private _itemsDisplayedColumns: any;
}
