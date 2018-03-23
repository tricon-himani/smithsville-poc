import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
    name: 'formatCell'
})
export class FormatCellPipe implements PipeTransform {
    constructor (
        private currencyPipe: CurrencyPipe
    ) { }

    transform(value: any, format: string) {
        if ( value === undefined || value === 0) {
            return '';
        }
        if ( format === 'default' ) {
            if ( Array.isArray(value) ) {
                if ( typeof value[0] !== 'object' ) {
                    return value.join(', ');
                } else {
                    return value.map( obj => {
                        return obj.name;
                    }).join(', ');
                }
            }
            if ( typeof value === 'object') {
                return value.name;
            }
        }
        if (format === 'currency') {
            // no decimal but comma in currency
            return this.currencyPipe.transform(value, 'INR', 'symbol-narrow', '1.0-0');
        }
        return value;
    }
}
