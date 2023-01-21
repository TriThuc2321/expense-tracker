const getUId = () => Date.now().toString(36) + Math.random().toString(36);

export { getUId };
