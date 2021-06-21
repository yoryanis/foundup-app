import { Pipe, PipeTransform } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  @BlockUI() blockUI!: NgBlockUI;

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length <= 3) return value;

    

    const results = [];
    for (const report of value) {
      if (
        report?.accessory.name.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        report?.accessory.lost_place.toLowerCase().indexOf(arg.toLowerCase()) >
          -1 ||
        report?.userOwner.name.toLowerCase().indexOf(arg.toLowerCase()) > -1
      ) {
        if (arg.length > 3) this.blockUI.start('Buscando coincidencias...');
        results.push(report);
      }
    }

    this.blockUI.stop();

    return results;
  }
}
