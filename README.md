# Stock Board

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.0.

The code creates 400 random assets, 200 currencies and 200 stocks (just the types is iterating, no need real assets) id 1-400 Creates a stream from those 400 assets that fires 1 updates per secound for each asset:

price must be changed each update by -1 to 1 and with the current timestamp, the rest will stay the same


## Guidelines

You will have to submit this task with git (you can use Github or Bitbucket). After you are finishing make sure the code is pushed and send an email/skype with a link.

The code should be runnable on Chrome (don't warry about the rest), NPM start or something simple for run it.

Stack: React, Redux, Rxjs (or similar lib), ES6/ES7 or Typescript

We are looking for best practices, maintainability, knowledge general programming skills/abilities

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
1. Show a table with all of the assets
2. Allow to sort for each one of the model fields
3. Allow to filter for each one of the model fields
4. Add to favorites button
5. Favorite persists to localstorage
6. Favorites  pins to the top of the table

![alt text](https://github.com/NagashreeBhat/stockboard/blob/master/ScreenCapture/Favorites.png?raw=true)


