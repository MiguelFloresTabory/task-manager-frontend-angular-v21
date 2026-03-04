import { NgClass } from '@angular/common';

import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'priority-filter',
  imports: [NgClass],
  templateUrl: './priority.html',
})
export class Priority {
  name = input.required<string>();  
   value = input.required<string>(); 
  isclicked = signal<boolean>(false);  
  newPriority = output<string>();
  handleClick(){
      this.isclicked.update(value => !value);
      this.newPriority.emit(this.value());
  }
}
