import React from "react";
import "./App.css";
import { useDebouncedCallback } from "use-debounce";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Header from "./Header";
import MeanStdInput from "./MeanStdInput";
import Plot from "./Plot";
import { ACTIONS, switchTab, setInputValue } from "./actions";
import { generateNormalDist } from "./utils";

const initialState = {
  activeTab: 0,
  mean: 0,
  STD: 0.4,
  points: generateNormalDist(0, 0.4),
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SWITCH_TAB:
      return { ...state, activeTab: action.value };
    case ACTIONS.SET_MEAN:
      return {
        ...state,
        mean: action.value,
        points: generateNormalDist(Number(action.value), state.STD),
      };
    case ACTIONS.SET_STD:
      return {
        ...state,
        STD: action.value,
        points: Number(action.value)
          ? generateNormalDist(state.mean, Number(action.value))
          : state.points,
      };
    default:
      throw new Error();
  }
};

function TabPanel(props) {
  const { children, value, index } = props;

  return <div> {value === index && <Box p={3}>{children}</Box>}</div>;
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const handleTabChange = (event, newValue) => {
    dispatch(switchTab(newValue));
  };

  const [debouncedCallback] = useDebouncedCallback((type, value) => {
    if (!value || (Number(value) <= 0 && type === ACTIONS.SET_STD)) {
      return;
    }
    dispatch(setInputValue(type, Number(value)));
  }, 500);

  return (
    <div className="App">
      <Header title="Normal Distribution" />
      <Plot points={state.points} mean={state.mean} STD={state.STD} />
      <Tabs value={state.activeTab} onChange={handleTabChange}>
        <Tab label="Mean/STD" />
        <Tab label="Min/Max" />
      </Tabs>
      <TabPanel value={state.activeTab} index={0}>
        <MeanStdInput values={state} onChange={debouncedCallback} />
      </TabPanel>
      <TabPanel value={state.activeTab} index={1}>
        Feature is in develop
      </TabPanel>
    </div>
  );
}

export default App;
