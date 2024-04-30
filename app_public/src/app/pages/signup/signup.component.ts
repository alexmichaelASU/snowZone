import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { WebRequestService } from '../../services/web-request.service';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive,
    FormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private webReq: WebRequestService, private router: Router) {}

  ngOnInit() {
    this.webReq.getUserListener().subscribe(
      (user) => {
        if (user !== null) {
            this.router.navigate(['/']);
        }
      })
  }

  register(form: NgForm) {
    this.webReq.register({
      user: {email: form.value.email, name: form.value.name},
      password: form.value.password
    });
}}
