function getPassword(type, inputId) {
  const localPassword =
    window.APP_CONFIG?.NETWORKS?.[type]?.PASSWORD;

  return localPassword || document.getElementById(inputId).value;
}