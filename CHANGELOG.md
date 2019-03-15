# Change Log

This project adheres to [Semantic Versioning](http://semver.org/).

## 0.14.0 - 2019-03-15

### Added

- Added `swiss-hooks` also as `swiss-element/hooks`
- Added `swiss-core` and added `swiss-element/core`, this standalone package makes it easy to create a custom element without classes but with the composition pattern. It's tiny 700 bytes gzipped.

## 0.13.0 - 2019-03-15

### Changed

- Added the `core` folder and moved the `hooks` folder in `swiss-element`.

## 0.12.0 - 2019-02-18

### Changed

- Improved the middleware enhancer for the new `swiss-logger` middleware.

## 0.11.0 - 2019-02-18

### Changed

- Improved the default renderer:

  - The dom will only be updated if the old html is not the same as the newly generated html.
  - If it is a string `root.innerHTML` is used, else the root is cleared and the nodes are appended.

## 0.10.1 - 2019-02-16

### Changed

- Bumped version because yarnpkg.com wasn't showing the new version :(

## 0.10.0 - 2019-02-16

### Changed (BREAKING CHANGES)

- Separated hook logic into `swiss-hooks`. The hooks can no longer be imported from `swiss-element`, this to keep the library lean and less opiniated. The primary goal for swiss element is to provide functional custom elements (no classes, no this keyword)

## 0.9.1 - 2019-02-12

### Changed

- Simplify effect hook logic

## 0.9.0 - 2019-02-10

### Removed

- Removed automatic assigning free tag name saving some bytes.

## 0.8.0 - 2019-02-09

### Changed

- Change `requestUpdate` to just `update`
- Add `useLayoutEffect` hook

## 0.7.0 - 2019-02-08

### Added

- Added `shadow` option

### Fixed

- Fixed `useEffect` hook

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
