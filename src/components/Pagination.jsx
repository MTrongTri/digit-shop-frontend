import { GrPrevious, GrNext } from "react-icons/gr";
import ReactPaginate from "react-paginate";

// eslint-disable-next-line react/prop-types
function Pagination({ totalPage, currentPage, setCurrentPage }) {
  return (
    <div>
      <ReactPaginate
        breakLabel={<button>...</button>}
        previousLabel={
          <button
            disabled={currentPage == 0}
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:bg-transparent disabled:text-black disabled:opacity-20"
          >
            <GrPrevious />
          </button>
        }
        nextLabel={
          <button
            disabled={currentPage === totalPage - 1}
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:bg-transparent disabled:text-black disabled:opacity-20"
          >
            <GrNext />
          </button>
        }
        onPageChange={({ selected }) => setCurrentPage(selected)}
        pageRangeDisplayed={2}
        pageCount={totalPage}
        initialPage={currentPage}
        renderOnZeroPageCount={null}
        containerClassName="flex gap-2 items-center"
        pageLinkClassName="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary hover:text-white"
        activeClassName="rounded-full bg-primary text-white"
      />
    </div>
  );
}

export default Pagination;
