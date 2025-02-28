function CommentSkeleton() {
  return (
    <div>
      <div className="flex items-center">
        <p className="mr-3 inline-flex items-center text-sm font-semibold text-gray-900 dark:text-white">
          <span className="skeleton mr-2 h-[40px] w-[40px] rounded-full"></span>
          <span className="skeleton h-[10px] w-[100px]"></span>
        </p>
        <p className="skeleton h-[10px] w-[100px]"></p>
      </div>

      <div className="ml-[48px] flex gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index} className="skeleton h-[20px] w-[20px]" />
        ))}
      </div>

      <div className="mt-2">
        <p className="skeleton ml-[48px] h-[100px]"></p>
      </div>
    </div>
  );
}

export default CommentSkeleton;
