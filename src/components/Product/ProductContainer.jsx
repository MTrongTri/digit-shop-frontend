// eslint-disable-next-line react/prop-types
function ProductContainer({ children }) {
  return (
    <div className="grid grid-cols-2 gap-3 bg-white md:grid-cols-4 lg:grid-cols-6">
      {children}
    </div>
  );
}

export default ProductContainer;
