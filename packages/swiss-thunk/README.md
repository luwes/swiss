### Swiss Thunk

Swiss Thunk middleware allows you to write components that return a function instead of a render fragment. The thunk can be used to delay the render of a component, or to render only if a certain condition is met. The inner function receives the element method `render` as a parameter.
