import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view-element',
  templateUrl: './view-element.component.html',
  styleUrls: ['./view-element.component.css']
})
export class ViewElementComponent implements OnInit {
  @Input() title: string;
  @Input() value: string;
  constructor() { }

  ngOnInit() {
  }

}
