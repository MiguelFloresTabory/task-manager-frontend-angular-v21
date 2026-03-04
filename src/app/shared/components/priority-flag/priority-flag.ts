import { Component, computed, input } from '@angular/core';
import { PriorityEnum } from '../../enums/priority.enum';
import { NgClass } from '@angular/common';

@Component({
  selector: 'priority-flag',
  imports: [NgClass],
  templateUrl: './priority-flag.html'
})
export class PriorityFlag {
 priority = input.required<PriorityEnum>();
 namePriority(){
   switch (this.priority()) {
     case PriorityEnum.HIGH:
       return 'HIGHT PRIORITY';
     case PriorityEnum.MEDIUM:
       return 'MEDIUM PRIORITY';
     case PriorityEnum.LOW:
       return 'LOW PRIORITY';
   }
 }
 powerPriority = computed( () => {
  return {
    'bg-red-900/50 text-red-200': (this.priority() === PriorityEnum.HIGH),
    'bg-yellow-900/50 text-yellow-200': (this.priority() === PriorityEnum.MEDIUM),
    'bg-blue-900/50 text-blue-200': (this.priority() === PriorityEnum.LOW)
  }
 });

 //bg-red-900/50  text-red-200   -> high
  
}
