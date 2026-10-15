import { useState } from "react";

const withWrapper = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => {
  return function EnhancedComponent(props: P) {
    const [count, setCount] = useState(0);

    const increment = () => {
      setCount((prev) => prev + 1);
    };

    return <WrappedComponent count={count} increment={increment} {...props} />;
  };
};

export default withWrapper;
