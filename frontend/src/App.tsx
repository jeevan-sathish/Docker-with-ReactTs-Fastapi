import ClickCounter from "./ClickCounter";
import HoverCount from "./HoverCount";

import withWrapper from "./withWrapper";

const EnhancedComponent = withWrapper(ClickCounter);
const HoverCompnet = withWrapper(HoverCount);
const App = () => {
  return (
    <>
      <EnhancedComponent />
      <HoverCompnet />
    </>
  );
};

export default App;
