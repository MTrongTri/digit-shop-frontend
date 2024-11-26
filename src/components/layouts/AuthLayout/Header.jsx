import Container from "@/components/Container";
import { images } from "@/constants";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="w-full bg-[#fff] py-2 font-roboto">
      <Container>
        <div className="flex items-center justify-between">
          <div>
            <Link to="/">
              <img
                className="h-[48px] w-[48px] rounded-full"
                src={images.Logo}
                alt="logo"
              />
            </Link>
          </div>
          <div>
            <Link to="/" className="hover:text-primary">
              Bạn cần giúp đỡ?
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header;
