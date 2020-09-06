import { Pipe, PipeTransform } from '@angular/core';
import { Asset } from '../model/asset';

@Pipe({
  name: 'filter',
  pure: false,
})
export class FilterPipe implements PipeTransform {
  transform(value: Asset[], filterText: string): Asset[] {
    filterText = filterText.toLowerCase();
    value = value.filter(
      (v) =>
        v.assetName.toLowerCase().includes(filterText) ||
        v.id.toString().toLowerCase().includes(filterText) ||
        v.type.toLowerCase().includes(filterText) ||
        v.price.toString().toLowerCase().includes(filterText)
    );
    return value;
  }
}
