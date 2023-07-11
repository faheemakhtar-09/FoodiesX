import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }
  displayBlock = false;

  toggleDisplay() {
    console.log("Jo");
    
    this.displayBlock = !this.displayBlock;
  }
  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }
}
