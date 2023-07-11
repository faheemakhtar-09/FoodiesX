import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/login.service';
import { AuthServService } from '../shared/auth-serv.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private loginService: LoginService, private authservice:AuthServService , private router:Router) { }

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
  logout(){
    this.loginService.logout();
    this.router.navigate(['/login']);

  }
}
