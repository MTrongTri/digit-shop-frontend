import Container from "@/components/Container";

import { FaFacebook, FaYoutube } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";

function Footer() {
  return (
    <footer className="mt-8 border-t-2 border-gray-200 bg-white">
      <Container>
        <div className="grid grid-cols-2 gap-2 px-4 py-6 md:grid-cols-4">
          <div>
            <h3 className="font-semibold">Hỗ trợ khách hàng</h3>
            <ul className="mt-2 flex flex-col gap-2">
              <li className="text-xs">
                Hotline: 1900-6035 (1000 đ/phút, 8-21h kể cả T7, CN)
              </li>
              <li className="text-xs">Các câu hỏi thường gặp</li>
              <li className="text-xs">Gửi yêu cầu hỗ trợ</li>
              <li className="text-xs">Hướng dẫn đặt hàng</li>
              <li className="text-xs">Hướng dẫn trả góp</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Về Digit Shop</h3>
            <ul className="mt-2 flex flex-col gap-2">
              <li className="text-xs">Giới thiệu Digit Shop</li>
              <li className="text-xs">Tuyển dụng</li>
              <li className="text-xs">Chính sách bảo mật thanh toán</li>
              <li className="text-xs">Chính sách bảo mật thông tin cá nhân</li>
              <li className="text-xs">Chính sách giải quyết khiếu nại</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Thông tin khác</h3>
            <ul className="mt-2 flex flex-col gap-2">
              <li className="text-xs">Tích điểm Quà tặng VIP</li>
              <li className="text-xs">Lịch sử mua hàng</li>
              <li className="text-xs">In hóa đơn điện tử</li>
              <li className="text-xs">Cảnh báo giả mạo</li>
              <li className="text-xs">24h công nghệ</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Kết nối với chúng tôi</h3>
            <ul className="mt-2 flex flex-col gap-2">
              <li className="flex items-center gap-1 text-xs">
                <FaFacebook className="text-base text-[#1877F2]" />
                <span>Facebook</span>
              </li>
              <li className="flex items-center gap-1 text-xs">
                <FaYoutube className="text-base text-[#FF0000]" />
                <span>Youtube</span>
              </li>
              <li className="flex items-center gap-1 text-xs">
                <AiFillTikTok className="text-base" />
                <span>Tiltok</span>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
