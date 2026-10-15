type Props = {
  count: number;
  increment: () => void;
};

const HoverCount = ({ count, increment }: Props) => {
  return <button onMouseOver={increment}>HoverCount {count} time</button>;
};

export default HoverCount;
