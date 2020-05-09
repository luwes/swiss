
export const updatingElement = () => element => {
  let changedProps = {};
  let updatePromise = Promise.resolve();
  let hasRequestedUpdate;
  let getProp = element.getProp;


  function requestUpdate(name, oldValue) {
    if (getProp(name) == oldValue) return;

    changedProps[name] = oldValue;

    if (!hasRequestedUpdate) {
      hasRequestedUpdate = true;
      updatePromise = enqueueUpdate();
    }
  }

  async function enqueueUpdate() {
    await updatePromise;

    element.update && element.update(changedProps);

    changedProps = {};
    hasRequestedUpdate = false;
  }

  return {
    requestUpdate
  };
};
