import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-MsgSuccess',
  templateUrl: './MsgSuccess.component.html',
  styleUrls: ['./MsgSuccess.component.css']
})
export class MsgSuccessComponent implements OnInit {

  @Input() mensagem: string = "";

  constructor() { }

  ngOnInit() {
  }

}
