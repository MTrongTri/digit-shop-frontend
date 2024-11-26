import { FaHeadphones, FaLaptop, FaTabletAlt } from "react-icons/fa";
import { GiSmartphone } from "react-icons/gi";
import { TbDevicesPc } from "react-icons/tb";
import { FiWatch } from "react-icons/fi";
import { Link } from "react-router-dom";

const NavItems = [
  {
    name: "Laptop",
    link: null,
    to: "/products/laptop",
    icon: <FaLaptop className="size-5" />,
  },
  {
    name: "Điện thoại",
    link: null,
    to: "/products/laptop",
    icon: <GiSmartphone className="size-5" />,
  },
  {
    name: "Tablet",
    link: null,
    to: "/products/laptop",
    icon: <FaTabletAlt className="size-5" />,
  },

  {
    name: "PC",
    link: null,
    to: "/products/laptop",
    icon: <TbDevicesPc className="size-5" />,
  },
  {
    name: "Tai nghe",
    link: null,
    to: "/products/laptop",
    icon: <FaHeadphones className="size-5" />,
  },
  {
    name: "Đồng hồ",
    link: null,
    to: "/products/laptop",
    icon: <FiWatch className="size-5" />,
  },
];

function NavBar() {
  return (
    <div className="mt-6 hidden pb-2 md:block">
      <ul className="flex items-center justify-center gap-8">
        {NavItems.map((item, index) => (
          <li key={index}>
            {item.link ? (
              <a className="flex items-center gap-2" href={item.link}>
                {item.icon}
                {item.name}
              </a>
            ) : (
              <Link className="flex items-center gap-2" to={item.to}>
                {item.icon}
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NavBar;
