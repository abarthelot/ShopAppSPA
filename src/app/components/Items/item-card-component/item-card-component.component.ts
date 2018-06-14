import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-card-component',
  templateUrl: './item-card-component.component.html',
  styleUrls: ['./item-card-component.component.css']
})
export class ItemCardComponentComponent implements OnInit {

  @Input() item: any;
  constructor() { }

  ngOnInit() {
  }

}
