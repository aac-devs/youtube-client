const DetailsView = (props) => {
  return (
    <div>
      <h1>Details View {props.videoSelected}</h1>
      <button type="button" onClick={props.onBackToHome}>
        Back to Home
      </button>
    </div>
  );
};

export default DetailsView;
