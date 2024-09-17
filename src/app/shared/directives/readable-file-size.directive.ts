import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  standalone:true,
  selector: '[appReadableFileSize]'
})
export class ReadableFileSizeDirective implements OnChanges {
  @Input('appReadableFileSize') fileSize!: number; // Input in bytes

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    this.el.nativeElement.innerText = this.formatFileSize(this.fileSize);
  }

  private formatFileSize(bytes: number): string {
    if (bytes === 0) {
      return '0 KB';
    }
    
    const labels = ['TB', 'GB', 'MB', 'KB'];
    const sizes = [1024**4, 1024**3, 1024*1024, 1024]

    for (let i = 0;i < sizes.length;i++){
      if (bytes >= sizes[i]){
        return `${(bytes/sizes[i]).toFixed(1)} ${labels[i]}` 
      }
    }
    
    return `${bytes} bytes`;
  }
}
