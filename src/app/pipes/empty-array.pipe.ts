import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'emptyArray'
})
export class EmptyArrayPipe implements PipeTransform {
    transform(value, size: number) {
        return new Array(size).fill(0);
    }
}
