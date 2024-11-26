function CategorySkeleton() {
  return (
    <div>
      <div>
        <div className="skeleton aspect-square w-full"></div>
        <p>
          <span className="skeleton mt-2 line-clamp-2 h-[40px] w-full text-center text-sm text-black"></span>
        </p>
      </div>
    </div>
  );
}

export default CategorySkeleton;
