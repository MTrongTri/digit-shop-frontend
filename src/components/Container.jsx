// eslint-disable-next-line react/prop-types
function Container({ children }) {
  return (
    <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-20">
      {children}
    </div>
  );
}

export default Container;
