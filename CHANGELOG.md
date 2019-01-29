# Change Log

This project adheres to [Semantic Versioning](http://semver.org/).

## 0.6.0 - 2019-01-29

### Added

- Added `useContext` and `useElement` hooks.

## 0.5.1 - 2019-01-27

### Changed

- Pass old html to renderer functions.
- Upgraded augmentor dependency.

## 0.5.0 - 2019-01-23

### Changed

- Made hooks and propsToAttrs default enhancers.
- Fixed `useEffect` hook

## 0.4.0 - 2019-01-22

### Added

- Added `observedAttributes` array short argument syntax.

## 0.3.0 - 2019-01-21

### Changed

- Made `renderer` enhancer a little more forgiving in the type signature of the
  passed `render` function.
- The `createElement` function passed to the enhancers will now actually return
  the created instance of the custom element.

## 0.2.2 - 2019-01-20

### Changed

- Removed some utility exports, only `compose` is really necessary.

## 0.2.1 - 2019-01-19

### Changed

- Fixed constructor so elements can be initiated without the `new` keyword.
  e.g. `const counter = element('s-counter', Counter, renderer(render))();`

## 0.2.0 - 2019-01-19

### Changed

- Changed element to include customElements.define

## 0.1.0 - 2019-01-17

### Fixed

- Made the `applyMiddleware` enhancer properly work.

## 0.0.3 - 2019-01-17

### Changed

- Upgraded augmentor dependency and build tools

## 0.0.2 - 2019-01-17

### Fixed

- Fixed hooks augmentor initialization #3

## 0.0.1 - 2019-01-16

### Added

- First release
