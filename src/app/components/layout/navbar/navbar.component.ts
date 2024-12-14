import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonComponent } from '../../lib/button/button.component';

@Component({
  selector: 'ba-navbar',
  imports: [NgOptimizedImage, ButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  logoUrl = 'https://bizaway.com/wp-content/uploads/2021/09/Logo-Bizaway.svg';
}
