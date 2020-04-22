export const ACTIONS = {
  SWITCH_TAB: "SWITCH_TAB",
  SET_MEAN: "SET_MEAN",
  SET_STD: "SET_STD",
};

export const switchTab = (value) => ({
  type: ACTIONS.SWITCH_TAB,
  value,
});

export const setInputValue = (type, value) => ({
  type,
  value,
});
