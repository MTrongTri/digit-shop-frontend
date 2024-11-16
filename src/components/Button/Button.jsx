/* eslint-disable react/prop-types */
import clsx from "clsx";
import { Link } from "react-router-dom";

function Button({ type, to, link, onClick, className, children, ...props }) {
  const classes = clsx(
    className,
    "float-end rounded-md bg-primary px-6 py-2 text-white",
  );

  if (to) {
    return (
      <Link to={to} {...props} className={classes}>
        {children}
      </Link>
    );
  }

  if (link) {
    return (
      <a href={link} {...props} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} {...props} className={classes}>
      {children}
    </button>
  );
}

export default Button;
