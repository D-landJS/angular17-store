import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@envs/environment.development';
import { Product } from '@shared/models/product.interface';
import { loadStripe } from '@stripe/stripe-js';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CheckoutService {
  private readonly _http = inject(HttpClient);
  private readonly _url = environment.serverUrl;

  onProceedToPay(products: Product[]): any {
    return this._http
      .post(`${this._url}/checkout`, { items: products })
      .pipe(
        map(async (res: any) => {
          const stripe = await loadStripe(environment.stripeApiKey);
          stripe?.redirectToCheckout({ sessionId: res.id });
        })
      )
      .subscribe({
        error: (err) => {
          console.error(`Error: ${err.message}`);
        },
      });
  }
}
