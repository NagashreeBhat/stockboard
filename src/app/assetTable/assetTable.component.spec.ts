import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { AssetTableComponent } from './assetTable.component';
import { FilterPipe } from '../pipe/filter.pipe';
import { FormsModule } from '@angular/forms';

describe('AssetTableComponent', () => {
  let component: AssetTableComponent;
  let fixture: ComponentFixture<AssetTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AssetTableComponent, FilterPipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create table', () => {
    expect(component).toBeTruthy();
  });

  it('should verify favorites are pinned to top', () => {
    component.saveAsFavorite('23');
    expect(component.assets[0].id).toEqual(23);
  });

  // it('should sort assets by ID', () => {
  //   component.sortByColumnName('id');
  //   expect(component.assets[0].id).toEqual(1);
  // });

  it('should sort assets by name', () => {
    component.sortByColumnName('assetName');
    expect(component.assets[0].assetName).toEqual('AAPL');
  });

  it('should sort assets by type', () => {
    component.sortByColumnName('type');
    expect(component.assets[0].type).toEqual('Currency');
  });

  it('should filter by asset name (EUR)', fakeAsync(() => {
    component.filterText = 'EUR';
    fixture.detectChanges();
    tick(100);
    const compiled = fixture.nativeElement;
    expect(
      compiled.querySelector(
        'table#stocks-currency-table tr:first-child td:nth-child(3)'
      ).textContent
    ).toContain('EUR');
  }));

  it('should filter by asset type (Stock)', fakeAsync(() => {
    component.filterText = 'Stock';
    fixture.detectChanges();
    tick(100);
    const compiled = fixture.nativeElement;
    expect(
      compiled.querySelector(
        'table#stocks-currency-table tr:first-child td:nth-child(6)'
      ).textContent
    ).toContain('Stock');
  }));
});
