import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { WebRequestService } from '../../services/web-request.service';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive,
    FormsModule
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit{
  constructor(private webReq: WebRequestService, private router: Router) {}

  ngOnInit() {
    this.webReq.getUserListener().subscribe(
      (user) => {
        if (user !== null) {
          this.router.navigate(['/']);
        }
      }
    )
  }

  login(form: NgForm) {
    this.webReq.login({
      email: form.value.email,
      password: form.value.password
    })
  }
}
