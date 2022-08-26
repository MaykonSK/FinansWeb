import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-Load',
  templateUrl: './Load.component.html',
  styleUrls: ['./Load.component.css']
})
export class LoadComponent implements OnInit {

  @Input() Loading: string | null;

  constructor() { }

  ngOnInit() {

  }

}
