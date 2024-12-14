import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-ba-navbar',
  imports: [NgOptimizedImage],
  templateUrl: './ba-navbar.component.html',
  styleUrl: './ba-navbar.component.css',
})
export class BaNavbarComponent {
  logoUrl = 'https://bizaway.com/wp-content/uploads/2021/09/Logo-Bizaway.svg';
}
