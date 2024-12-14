import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'ba-navbar',
  imports: [NgOptimizedImage],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class BaNavbarComponent {
  logoUrl = 'https://bizaway.com/wp-content/uploads/2021/09/Logo-Bizaway.svg';
}
