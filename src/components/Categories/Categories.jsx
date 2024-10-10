import { Link } from "react-router-dom";

function Categories() {
  const a = new Array(8).fill(0);

  return (
    <div className="mt-8 rounded-md bg-white p-4">
      <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
        {a.map((item, index) => (
          <li
            key={index}
            className="p-4 text-white duration-[400ms] hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] md:h-[221px]"
          >
            <Link to="/">
              <div>
                <img
                  className="aspect-square rounded-full p-3"
                  src="https://down-vn.img.susercontent.com/file/31234a27876fb89cd522d7e3db1ba5ca@resize_w320_nl.webp"
                  alt="img category"
                />
                <p>
                  <span className="mt-2 line-clamp-2 h-[40px] w-full text-center text-sm text-black">
                    Điện thoại và phụ kiện
                  </span>
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
