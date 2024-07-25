import { Component, inject } from '@angular/core';
import CardComponent from './card/card.component';
import { ProductsService } from '@api/products.service';
import { Product } from '@shared/models/product.interface';
import { CartStore } from '@shared/store/shopping-cart.store';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export default class ProductsComponent {
  private readonly productSvc = inject(ProductsService);
  public products = this.productSvc.products;
  cartStore = inject(CartStore);

  onAddToCart(product: Product): void {
    this.cartStore.addToCart(product);
  }
}
