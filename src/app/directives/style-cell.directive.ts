
import { Directive, ElementRef,
    Input, Renderer, OnInit } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[styleCell]'
})
export class StyleCellDirective implements OnInit {

    @Input() styleCell: string;
    constructor(
        private el: ElementRef,
        private renderer: Renderer) { }

    ngOnInit() {
        if (typeof this.styleCell === 'boolean') {
            this.renderer.setElementStyle(
                    this.el.nativeElement,
                    'position',
                    'relative');
        } else if (typeof this.styleCell === 'number') {
            this.renderer.setElementStyle(
                    this.el.nativeElement,
                    'text-align',
                    'right');
        }
    }
}
