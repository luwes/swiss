export const UpdateMixin = () => (element) => {
  let changedProps = {};
  let updatePromise;
  let hasRequestedUpdate;
  let getProp = element.getProp;

  enqueueUpdate(); // Initital update.

  function requestUpdate(name, oldValue) {
    if (getProp(name) == oldValue) return;

    changedProps[name] = oldValue;

    if (!hasRequestedUpdate) {
      hasRequestedUpdate = true;
      updatePromise = enqueueUpdate();
    }
    return updatePromise;
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
    requestUpdate,
  };
};
