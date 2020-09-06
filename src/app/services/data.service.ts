import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Asset } from '../model/asset';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  private createAsset = (assetId, assetType): Asset => {
    return {
      id: assetId,
      assetName:
        assetType === 'Stock'
          ? ['AAPL', 'GOOGL', 'FB', 'TSLA', 'MSFT'][
              Math.floor(Math.random() * 4)
            ]
          : ['EUR', 'USD', 'GBP', 'NIS', 'AUD'][Math.floor(Math.random() * 4)],
      price: Math.random() * 10,
      lastUpdate: Date.now(),
      type: assetType,
    };
  };

  private getAllAssets = (n: number) => {
    const result: Asset[] = [];
    for (let i = 1; i <= n; i++) {
      result.push(this.createAsset(i, 'Stock'));
      result.push(this.createAsset(i + n, 'Currency'));
    }
    return result;
  };

  getAssets(): Observable<Asset[]> {
    return of(
      this.getAllAssets(200).map((val) => {
        setInterval(() => {
          const random = Math.random();
          val.price = random >= 0.5 ? val.price + random : val.price - random;
          val.lastUpdate = Date.now();
        }, 1000);

        return val;
      })
    );
  }
}
