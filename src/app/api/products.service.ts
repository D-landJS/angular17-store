import { HttpClient } from '@angular/common/http';
import {
  EnvironmentInjector,
  inject,
  Injectable,
  runInInjectionContext,
  signal,
} from '@angular/core';
import { environment } from '@envs/environment.development';
import { Product } from '@shared/models/product.interface';
import { map, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  public products = signal<any>([]);
  private readonly _http = inject(HttpClient);
  private readonly _endPoint = environment.apiUrl;
  private readonly _injector = inject(EnvironmentInjector);

  constructor() {
    this.getProducts();
  }

  getProducts() {
    return this._http
      .get<Product[]>(`${this._endPoint}/products/?sort=desc`)
      .pipe(
        map((products: Product[]) =>
          products.map((product: Product) => ({ ...product, quantity: 1 }))
        ),
        tap((products: Product[]) => this.products.set(products))
      )
      .subscribe();
  }

  getProductById(id: number) {
    return runInInjectionContext(this._injector, () =>
      toSignal<Product>(
        this._http.get<Product>(`${this._endPoint}/products/${id}`)
      )
    );
  }
}
