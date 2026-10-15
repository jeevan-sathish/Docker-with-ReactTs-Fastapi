type CounterProp = {
  count: number;
  increment: () => void;
};
const ClickCounter = ({ count, increment }: CounterProp) => {
  return (
    <div>
      <button onClick={increment}>count {count}</button>
    </div>
  );
};

export default ClickCounter;
