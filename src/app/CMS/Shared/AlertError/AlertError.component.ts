import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-AlertError',
  templateUrl: './AlertError.component.html',
  styleUrls: ['./AlertError.component.css']
})
export class AlertErrorComponent implements OnInit {

  @Input() mensagem: string = "";

  constructor() { }

  ngOnInit() {
  }

}
