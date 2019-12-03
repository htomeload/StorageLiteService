# StorageLiteService
Library that make using LocalStorage be more easily and simple. This Library covered all exist function of LocalStorage with extra code such as handle error and value to make retriving and storing be simplest as just call then done.

Currently, there is available in Web version and Ionic Framework version.

## Usage
- Web version
Just do 
```
<script src="storage-lite.service.js"></script>
```
and you're ready to go, use `storagelite` with following available functions. For example

```bash
const result = storagelite._storeData();
```

- Ionic Framework version
Just import StorageLiteService into page then declare in constructor and you're set.

## Available functions
- _retriveKeys()
Get all available key in LocalStorage.

- _retriveData(key: string)
Get value of stored data with key, function will try to check what kind of data then convert it back to type of data that it's ever been.

- _storeData(key: string, value: number, string, boolean, object, array<any>)
Save data into LocalStorage, function will try to check what kind of data then convert it into string for storing with right function.

- _removeData(key: string)
Remove data from LocalStorage with key.

- _truncateData()
Truncate all available data in LocalStorage.