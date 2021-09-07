const Frame = ({ id }) => {
  return (
    <iframe
      src={`https://www.youtube.com/embed/${id}?&autoplay=1`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
};

export default Frame;
