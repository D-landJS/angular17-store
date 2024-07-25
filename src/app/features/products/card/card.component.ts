import { CurrencyPipe, SlicePipe } from '@angular/common';
import { Component, EventEmitter, input, Output, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@shared/models/product.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CurrencyPipe, SlicePipe, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export default class CardComponent {
  product = input.required<Product>();
  addToCartEvent = output<Product>();

  onAddToCart() {
    this.addToCartEvent.emit(this.product());
  }
}
