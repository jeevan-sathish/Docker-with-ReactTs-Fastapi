import useCustomApiCall from "./useCustomApiCall";

const App = () => {
  const { data, callApi, error } = useCustomApiCall();

  return (
    <div>
      <button onClick={() => callApi("users")}>Call API</button>

      {data.map((ele, index) => (
        <div key={index}>
          <p>{JSON.stringify(ele)}</p>
          <br />
        </div>
      ))}

      {error && <p>{error}</p>}
    </div>
  );
};

export default App;
