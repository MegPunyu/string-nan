# StringNaN
A tiny tool to convert between string and NaN[].

## Features
Converts a string and a NaN Array to each other.

## Installation
```shell
npm install string-nan
```

## Usage
```javascript
import StringNaN from "string-nan";

const str = "meg";

const nans = StringNaN.toNaNs(str);

console.log(nans);  // [ NaN, NaN, NaN ]

console.log(StringNaN.toString(nans));     // meg
console.log(StringNaN.toString(nans[0]));  // m

nans.reverse();

console.log(StringNaN.toString(nans));  // gem
```
