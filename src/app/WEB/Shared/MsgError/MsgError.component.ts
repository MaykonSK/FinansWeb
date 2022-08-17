import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-MsgError',
  templateUrl: './MsgError.component.html',
  styleUrls: ['./MsgError.component.css']
})
export class MsgErrorComponent implements OnInit {

  @Input() mensagem: string = "";

  constructor() { }

  ngOnInit() {
  }

}
