# ms.macro

[![Dependency Status](https://img.shields.io/david/knpwrs/ms.macro.svg)](https://david-dm.org/knpwrs/ms.macro)
[![devDependency Status](https://img.shields.io/david/dev/knpwrs/ms.macro.svg)](https://david-dm.org/knpwrs/ms.macro#info=devDependencies)
[![Greenkeeper badge](https://badges.greenkeeper.io/knpwrs/ms.macro.svg)](https://greenkeeper.io/)
[![Build Status](https://img.shields.io/travis/knpwrs/ms.macro.svg)](https://travis-ci.org/knpwrs/ms.macro)
[![Npm Version](https://img.shields.io/npm/v/ms.macro.svg)](https://www.npmjs.com/package/ms.macro)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Badges](https://img.shields.io/badge/badges-7-orange.svg)](http://shields.io/)

Convert various time formats to milliseconds at build time in Babel.

## Usage

Simply install and configure [`babel-plugin-macros`] and then use `ms.macro`
the same way you use [`ms`].

## Example

Given the following input:

```js
import ms from 'ms.macro';

const ONE_DAY = ms('1 day');
const TWO_DAYS = ms('2 days');
```

Babel will produce the following output:

```js
const ONE_DAY = 86400000;
const TWO_DAYS = 172800000;
```

It also works as a tagged template literal:

```js
const ONE_DAY = ms`1 day`;
const TWO_DAYS = ms`2 days`;
```

That will produce the same output as the function version.

## FAQ

### What are the advantages of running `ms` as a macro?

The two main advantages of running `ms` as a macro are that there are no
runtime dependencies and any errors (such as mistakenly calling`ms('1 da')`
instead of `ms('1 day')`) become build-time errors rather than run-time errors.

### Are there any disadvantages of running `ms` as a macro?

This macro only supports the single string-argument signature of [`ms`], i.e.,
passing a single string and getting back a number. This is because when you are
converting a number of milliseconds to an equivalent string representation you
are typically using calculated values not available at build-time. If you want
to convert a number of milliseconds to an equivalent string representation you
should use the [`ms`] package directly. If you want to use both packages
together, you can give the imported values different names:

```js
import ms from 'ms';
import msm from './ms.macro';

const ONE_DAY = msm('1 day');
const str = ms(172800000);
```

That will result in the following output:

```js
import ms from 'ms';

const ONE_DAY = 86400000;
const str = ms(172800000);
```

## License

**MIT**

[`babel-plugin-macros`]: https://github.com/kentcdodds/babel-plugin-macros "babel-plugin-macros"
[`ms`]: https://github.com/zeit/ms "ms"
