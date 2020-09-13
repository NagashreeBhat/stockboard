import {
  Component,
  OnInit,
  Input,
  OnChanges,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { DataService } from '../services/data.service';
import { Asset, Column } from '../model/asset';
import { Observable } from 'rxjs';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
@Component({
  selector: 'app-stocks-table',
  templateUrl: './assetTable.component.html',
  styles: [
    `
      .fa-custom {
        font-size: 1.5em;
      }
    `,
  ],
})
export class AssetTableComponent implements OnInit {
  assets: Asset[];
  filterText = '';
  data$: Observable<Asset[]>;

  dataRefresher: any;
  refreshcomponent: boolean = false;
  columns: Column[] = [
    {
      name: 'ID',
      value: 'id',
    },
    {
      name: 'ASSET',
      value: 'assetName',
    },
    {
      name: 'PRICE',
      value: 'price',
    },
    {
      name: 'LAST UPDATE',
      value: 'lastUpdate',
    },
    {
      name: 'TYPE',
      value: 'type',
    },
  ];
  private isAscendingSort: boolean = false;
  data: any;
  date: any;
  public now: Date = new Date();

  constructor(
    private dataService: DataService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    //debugger;
    this.date = new Date();
    //console.log('Date', this.date);

    this.updateData();
    this.refresh();
  }

  // sorting based on columns
  sortByColumnName(col: string): void {
    //debugger;
    switch (col) {
      case 'id':
      case 'price':
      case 'lastUpdate':
        if (!this.isAscendingSort) {
          this.assets = this.assets.sort((a, b) => b[col] - a[col]);
          this.isAscendingSort = true;
        } else {
          this.isAscendingSort = false;
          this.assets = this.assets.sort((a, b) => a[col] - b[col]);
        }
        break;
      default:
        // default field is string

        if (!this.isAscendingSort) {
          this.assets = this.assets.sort((a, b) =>
            a[col].localeCompare(b[col])
          );
          this.isAscendingSort = true;
        } else {
          this.isAscendingSort = false;
          this.assets = this.assets.sort((a, b) =>
            b[col].localeCompare(a[col])
          );
        }
        break;
    }
  }

  // save to local storage and move favorites to top
  saveAsFavorite(assetId: string): void {
    localStorage.setItem(assetId, assetId);
    //this.moveFavoritesToTop();
  }

  // remove from local storage
  removeAsFavorite(assetId: string): void {
    localStorage.removeItem(assetId);
    this.moveFavoritesToTop();
  }


  getFavorite(): Asset[] {
    // return Object.keys(localStorage).sort((a, b) => Number(a) - Number(b));
    let favoriteAsset: Asset[] = [];
    Object.keys(localStorage).forEach(element => {
      let result: Asset = this.assets.filter(fav => fav.id === +element)[0];
      favoriteAsset.push(result);
    });
    return favoriteAsset;
  }
  // if favorites in UI already in local storage, show option to remove as favorite
  checkIfExistInFavorite(assetId: string): string {
    return localStorage.getItem(assetId);
  }

  private moveFavoritesToTop(): void {
    //debugger;
    // find favorites from local storage
    const favoritesFromLocalStorage = new Set(Object.keys(localStorage));
    // filter favorites from assets
    const favorites = this.assets.filter((aseet) =>
      favoritesFromLocalStorage.has(aseet.id.toString())
    );
    this.assets = this.assets.filter(
      (aseet) => !favoritesFromLocalStorage.has(aseet.id.toString())
    );
    favorites.forEach((f) => this.assets.unshift(f)); // move favorites to top of the list
  }

  updateData() {
    this.dataService.getAssets().subscribe(
      (response) => {
        // console.log('response' + JSON.stringify(response));

        // get assets from data service
        this.assets = response;

        this.moveFavoritesToTop();
      },
      (error) => {
        console.log(`error in getting assets ${error}`);
      }
    );
  }

  refresh() {
    this.ref.detectChanges();
  }

  priceUpdate(newItem) {
    return this.data.id === this;
  }
}
