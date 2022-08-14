import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-AlertSuccess',
  templateUrl: './AlertSuccess.component.html',
  styleUrls: ['./AlertSuccess.component.css']
})
export class AlertSuccessComponent implements OnInit {

  @Input() mensagem: string = "";

  constructor() { }

  ngOnInit() {
  }

}
