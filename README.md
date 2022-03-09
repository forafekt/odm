# ODM (Object Data Mutate) [![NPM Version][npm-image]][npm-url]
[npm-image]: https://img.shields.io/npm/v/@forafekt/odm.svg
[npm-url]: https://npmjs.org/package/@forafekt/odm

## Description
ODM (Object Data Mutate). Easily manipulate array objects.

## Install
```bash
npm install @forafekt/odm
```
or
```bash
yarn add @forafekt/odm
```

## Usage
```js
const data = users.rows;
const mutate = {
    debug: true, // Show log in console or terminal
    insertIndex: true, // Insert index to response
    fromObject: true, // {id: 'user_id'} would return {id: 9}
    keyValues: {
        id: 'user_id',
        stuff: {
            wallet: data => data.wallet,
            link: 'website',
            name: 'first_name',
        },
        username: data => data.username,
        profile: data => data.stuff, // Use data from other keyValues,
    },
}
const res = odm(data, mutate);
```

## Options
| Option      	| Default 	| Desc                                                      	|
|-------------	|---------	|-----------------------------------------------------------	|
| debug       	| false   	| Show response in console or terminal                      	|
| insertIndex 	| false   	| Add object index to objects in array                      	|
| fromObject  	| false   	| Access field in default array and assign value to new key 	|
| keyValues   	| {}      	| Add any key:value to manipulate inside array              	|

## TODO
* Update docs
* Complete build and src tests
* Add CI


## License
[MIT](http://vjpr.mit-license.org)