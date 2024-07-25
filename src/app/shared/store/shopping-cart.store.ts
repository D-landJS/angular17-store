import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Product } from '@shared/models/product.interface';
import { ToastrService } from 'ngx-toastr';

export interface CartStore {
  products: Product[];
  totalAmount: number;
  productsCount: number;
}

const initialState: CartStore = {
  products: [],
  totalAmount: 0,
  productsCount: 0,
};

export const CartStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ products }) => ({
    productsCount: computed(() => calculateProductCount(products())),
    totalAmount: computed(() => calculateTotalAmount(products())),
  })),
  withMethods(({ products, ...store }, toastScv = inject(ToastrService)) => ({
    addToCart(product: Product) {
      const isProductInCart = products().find(
        (item: Product) => item.id === product.id
      );
      if (isProductInCart) {
        isProductInCart.quantity += 1;
        isProductInCart.subtotal =
          isProductInCart.price * isProductInCart.quantity;
        patchState(store, {
          products: [...products()],
        });
      } else {
        patchState(store, {
          products: [...products(), product],
        });
        toastScv.success('Product added to cart', 'Success');
      }
    },
    removeFromCart(id: number) {
      const updateProducts = products().filter((product) => product.id !== id);
      patchState(store, { products: updateProducts });
      toastScv.info('Product removed from cart', 'Success');
    },
    clearCart() {
      patchState(store, initialState);
      toastScv.info('Cart cleared', 'Success');
    },
  }))
);

function calculateTotalAmount(products: Product[]): number {
  return products.reduce(
    (totalAmount, product) => totalAmount + product.price * product.quantity,
    0
  );
}

function calculateProductCount(products: Product[]): number {
  return products.reduce(
    (productsCount, product) => productsCount + product.quantity,
    0
  );
}
