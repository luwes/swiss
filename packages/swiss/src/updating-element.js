
export const updatingElement = () => element => {
  let changedProps = {};
  let updatePromise;
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

    if (element.update) {
      element.update(changedProps);
    }

    changedProps = {};
    hasRequestedUpdate = false;
  }

  return {
    requestUpdate
  };
};
