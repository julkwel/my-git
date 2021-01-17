import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'range'
})

export class RangePipe implements PipeTransform {
    transform(length: number, perPage: number): any {
        return [];
    }
}