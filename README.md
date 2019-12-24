# StorageLiteService
Library that make using LocalStorage be more easily and simple. This Library covered all exist function of LocalStorage with extra code such as handle error and value to make retriving and storing be simplest as just call then done. all functions is return only true, false and value, so, it's easy to check that call function is success or failed.

Currently, there is available in Web version and Ionic Framework version.

## Requirement
* JavaScript (web)
    - Internet Explorer > 10, Google Chrome > 48–55, Mozilla Firefox > 44–50, Microsoft Edge > 14, Opera > 35–42, Apple Safari > 10, SeaMonkey > 2.24–2.30 or higher with JavaScript ES6 supports, or Framework that support JavaScript ES6.

* Ionic Framework (ionic)
    - Ionic Framework >= 3

* React Native (react-native)
    - React Native >= 0.6

## Usage
- Web version
    - Just do 
```
<script src="storage-lite.service.js"></script>
```
and you're ready to go, use `storagelite` with following available functions. For example

```bash
const result = storagelite._storeData();
```

- Ionic Framework version
    - Just import StorageLiteService into page then declare in constructor and you're set.
```
import { StorageLiteService } from './storage-lite.service' 

export class exampleClass {
  	...

	constructor(private `whatevername`: StorageLiteService) {
    }

    ...
}
```

- React Native version
    - Just do 
```
import { `whatevername` } from './storage-lite' 
```
and use it with `whatevername` as you defined.

## Available functions
- _retriveKeys()
    - Get all available key in LocalStorage.
    ```bash
    storagelite._retriveKeys();
    
    // return: ['searchwords', 'wallet', 'quantity', 'name']
    ```

- _retriveData(key: string)
    - Get value of stored data with key, function will try to check what kind of data then convert it back to type of data that it's ever been.
    ```bash
    storagelite._retriveData('searchwords');
    
    // return: ['shirt', 'boxer']

    storagelite._retriveData('wallet');
    
    // return: 1.23

    storagelite._retriveData('quantity');
    
    // return: 1

    storagelite._retriveData('name');
    
    // return: 'John'
    ```

- _storeData(key: string, value: number, string, boolean, object, array<any>)
    - Save data into LocalStorage, function will try to check what kind of data then convert it into string for storing with right function.
    ```bash
    storagelite._storeData('searchwords', ['shirt', 'boxer']);
    
    // return: true

    storagelite._storeData('wallet', 1.23);
    
    // return: true

    storagelite._storeData('quantity', 1);
    
    // return: true

    storagelite._storeData('name', 'John');
    
    // return: true
    ```

- _removeData(key: string)
    - Remove data from LocalStorage with key.
    ```bash
    storagelite._removeData('name');
    
    // return: true
    ```

- _truncateData()
    - Truncate all available data in LocalStorage.
    ```bash
    storagelite._truncateData();
    
    // return: true
    ```