import { Component, OnChanges, Input, 
  Output, EventEmitter } from '@angular/core';

@Component ({
  selector: 'ai-star',
  templateUrl : `app/shared/star.component.html`,
  styleUrls: ['app/shared/star.component.css']
})

export class StarComponent implements OnChanges {
  starWidth: number;
  // rating value will come as input from container Component
  @Input() rating: number;
  // output property that will communite back with container component
  @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();

  onClick() {
    // fire back/emit data to whatever is subscribed in container component
    this.ratingClicked.emit(`The rating ${this.rating} was clicked!`);
  }

  // called when data in any property is changed
  ngOnChanges(): void{
    this.starWidth = this.rating * 86 / 5;
  }
}