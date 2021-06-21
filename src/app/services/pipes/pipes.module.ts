import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnumPipe } from './enum.pipe';
import { FormatCurrencyPipe } from './format-currency.pipe';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [EnumPipe, FormatCurrencyPipe, FilterPipe],
  imports: [CommonModule],
  exports: [EnumPipe, FilterPipe, FormatCurrencyPipe],
})
export class PipesModule {
  static forRoot(): ModuleWithProviders<PipesModule> {
    return {
      ngModule: PipesModule,
    };
  }
}
