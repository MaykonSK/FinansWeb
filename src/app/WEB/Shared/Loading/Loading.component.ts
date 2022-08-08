import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-Loading',
  templateUrl: './Loading.component.html',
  styleUrls: ['./Loading.component.css']
})
export class LoadingComponent implements OnInit {

  @Input() Loading: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
