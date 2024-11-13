function TableSkeleton() {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>
                <div className="skeleton h-[20px] w-full"></div>
              </th>
              <th>
                <div className="skeleton h-[20px] w-full"></div>
              </th>
              <th>
                <div className="skeleton h-[20px] w-full"></div>
              </th>
              <th>
                <div className="skeleton h-[20px] w-full"></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 4 }).map((_, index) => (
              <tr key={index}>
                <th>
                  <div className="skeleton h-[20px] w-full"></div>
                </th>
                <td>
                  <div className="skeleton h-[20px] w-full"></div>
                </td>
                <td>
                  <div className="skeleton h-[20px] w-full"></div>
                </td>
                <td>
                  <div className="skeleton h-[20px] w-full"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableSkeleton;
