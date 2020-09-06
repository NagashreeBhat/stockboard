# Stock Board

This code creates 400 random assets, 200 currencies and 200 stocks (just the types are iterating, no real assets) id 1-400 Creates a stream from those 400 assets that fires 1 updates per secound for each asset:

price are changed for each update by -1 to 1 and with the current timestamp, the rest remains the same


## Guidelines

The code is runnable on Chrome , with simple steps `npm install` then run the project with `npm start`

Stack: Angular 10.10, ES6/ES7, Typescript


## Model 

```typescript
   interface Asset {
	    id: number
	    assetName: string; // "USD", Samsung Electronics Co Ltd : "SSNLF"
	    price: number; // asset current price relative to USD
	    lastUpdate: number; // unix timestamp
	    type: "Currency" | "Stock"; // asset type Currency (e.g. USD, EUR...) or Stock (Samsung, Google)
      }  
```

## To run the code

Run `ng serve` or `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` or `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## The following is created in the app using the above stream:

1. A table with all of the assets
2. Sorting each one of the model fields
3. Filter/ Search based on model fields
4. Favorites button to select favorite asset
5. Favorite persists to localstorage
6. Favorites  pins to the top of the table

![alt text](https://github.com/NagashreeBhat/stockboard/blob/master/ScreenCapture/Favorites.png?raw=true)
