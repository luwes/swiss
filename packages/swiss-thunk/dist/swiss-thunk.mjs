function createThunkMiddleware(extraArgument) {
  return ({ render }) => next => html => {
    if (typeof html === 'function') {
      return html(render, extraArgument);
    }

    return next(html);
  };
}

const thunk = createThunkMiddleware();

export default thunk;
export { createThunkMiddleware };
