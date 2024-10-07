import Head from 'next/head'
import { Fragment } from 'react'
import Image from 'next/image'

const PolicyVNPAYPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Hướng dẫn thanh toán VNPAY</title>
      </Head>
      <div className="flex-1 bg-white py-10 xl:px-40 md:px-20 px-10">
        <h1 className="font-bold text-xl text-center">
          HƯỚNG DẪN THANH TOÁN VNPAY TRÊN WEBSITE
        </h1>

        <p className="text-p16 text-grey-1 mt-4 text-justify">
          {`Cổng thanh toán VNPAY là giải pháp thanh toán do Công ty Cổ phần Giải
          pháp Thanh toán Việt Nam (VNPAY) phát triển. Khách hàng sử dụng
          thẻ/tài khoản ngân hàng, tính năng QR Pay/VNPAY-QR được tích hợp sẵn
          trên ứng dụng Mobile Banking của các ngân hàng hoặc Ví điện tử liên
          kết để thanh toán các giao dịch và nhập mã giảm giá (nếu có)`}
        </p>

        <p className="font-bold text-lg mt-8 text-center">
          Quét mã VNPAY-QR trên 35+ Ứng dụng Mobile Banking và 15+ Ví điện tử
          liên kết
        </p>

        <div className="w-full xl:h-[630px] md:h-[450px] h-[300px] relative mt-4">
          <Image
            alt="img-3"
            src="/images/vnpay/image3.png"
            quality={100}
            objectFit="contain"
            layout="fill"
          />
        </div>

        <p className="font-bold text-lg mt-8 text-center">
          40+ Thẻ ATM/nội địa/tài khoản ngân hàng
        </p>

        <div className="w-full xl:h-[400px] md:h-[300px] h-[200px] relative mt-4">
          <Image
            alt="img-4"
            src="/images/vnpay/image4.png"
            quality={100}
            objectFit="contain"
            layout="fill"
          />
        </div>

        <p className="font-bold text-lg mt-8 text-center">
          4 Thẻ thanh toán quốc tế
        </p>

        <div className="w-full xl:h-[80px] md:h-[60px] h-[40px] relative mt-4">
          <Image
            alt="img-1"
            src="/images/vnpay/image1.png"
            quality={100}
            objectFit="contain"
            layout="fill"
          />
        </div>

        <p className="font-bold text-lg mt-8 text-center">
          Các phương thức thanh toán qua VNPAY
        </p>

        <div className="w-full xl:h-[500px] md:h-[350px] h-[250px] relative mt-4">
          <Image
            alt="img-6"
            src="/images/vnpay/image6.png"
            quality={100}
            objectFit="contain"
            layout="fill"
          />
        </div>

        <p className="font-bold text-lg mt-8">
          {`1. Phương thức thanh toán qua “Ứng dụng thanh toán hỗ trợ VNPAY-QR”`}
        </p>

        <p className="text-p16 text-grey-1 mt-4 text-justify">
          <strong>Bước 1:</strong>
          {` Quý khách lựa chọn sản phẩm, dịch vụ và chọn
          Thanh toán ngay hoặc Đặt hàng Tại trang thanh toán, vui lòng kiểm tra
          lại sản phẩm đã đặt, điền đầy đủ thông tin người nhận hàng, chọn
          phương thức thanh toán VNPAY và nhấn nút “Đặt hàng ngay”.`}
        </p>

        <p className="text-p16 text-grey-1 mt-4 text-justify">
          <strong>Bước 2:</strong>
          {` Màn hình thanh toán chuyển sang giao diện cổng thanh toán VNPAY. Chọn phương thức  “Ứng dụng thanh toán hỗ trợ VNPAY-QR”`}
        </p>

        <p className="text-p16 text-grey-1 mt-4 text-justify">
          <strong>Bước 3:</strong>
          {`  Hệ thống hiển thị mã QR cùng với số tiền cần thanh toán, Quý khách
          kiểm tra lại số tiền này. Sử dụng ứng dụng ngân hàng (theo danh sách
          liệt kê), chọn `}
          <span className="font-bold">{`“Quét Mã”`}</span>
          {` và tiến hành quét mã QR trên màn hình thanh
          toán website`}
          <br />
          <span className="italic">{`*Lưu ý: Mã QR có hiệu lực trong 15 phút Để quá trình
          thanh toán thành công, khách hàng vui lòng tham khảo trước các điều
          kiện và thao tác quét mã trên điện thoại để sẵn sàng, tránh sự cố hết
          thời gian ảnh hưởng đến thanh toán và mã khuyến mại của quý khách.`}</span>
        </p>

        <p className="text-p16 text-grey-1 mt-4 text-justify">
          <strong>Bước 4:</strong>
          {` Kiểm tra thông tin, nhập mã giảm giá (nếu có) và hoàn tất thanh toán
          Khi thực hiện thanh toán hoàn tất Quý khách sẽ nhận được thông báo xác
          nhận đơn hàng đặt hàng thành công tại website`}
        </p>

        <div className="w-full xl:h-[400px] md:h-[300px] h-[200px] relative mt-4">
          <Image
            alt="img-5"
            src="/images/vnpay/image5.png"
            quality={100}
            objectFit="contain"
            layout="fill"
          />
        </div>

        <p className="font-bold text-lg mt-8">
          {`2. Phương thức thanh toán qua “Thẻ nội địa và tài khoản ngân hàng”`}
        </p>

        <p className="text-p16 text-grey-1 mt-4 text-justify">
          <strong>Bước 1:</strong>
          {` Quý khách lựa chọn sản phẩm, dịch vụ và chọn Thanh toán ngay hoặc Đặt
          hàng Tại trang thanh toán, vui lòng kiểm tra lại sản phẩm đã đặt, điền
          đầy đủ thông tin người nhận hàng, chọn phương thức thanh toán VNPAY và
          nhấn nút “Đặt hàng ngay”.`}
        </p>

        <p className="text-p16 text-grey-1 mt-4 text-justify">
          <strong>Bước 2:</strong>
          {` Màn hình thanh toán chuyển sang giao diện cổng thanh toán VNPAY. Chọn
          phương thức “Thẻ nội địa và tài khoản ngân hàng” và chọn ngân hàng
          muốn thanh toán thẻ trong danh sách`}
        </p>

        <p className="text-p16 text-grey-1 mt-4 text-justify">
          <strong>Bước 3:</strong>
          {` Quý khách vui lòng thực hiện nhập các thông tin thẻ/tài khoản theo yêu
          cầu và chọn “Tiếp tục”. Mã OTP sẽ được gửi về điện thoại đăng ký, nhập
          mã OTP để hoàn tất giao dịch`}
          <br />
          <span className="italic">
            *Lưu ý: Giao dịch sẽ hết hạn sau 15 phút
          </span>
        </p>

        <p className="text-p16 text-grey-1 mt-4 text-justify">
          <strong>Bước 4:</strong>
          {` Khi thực hiện thanh toán hoàn tất Quý khách sẽ nhận được thông báo xác
          nhận đơn hàng đặt hàng thành công tại website`}
        </p>

        <div className="w-full xl:h-[400px] md:h-[300px] h-[200px] relative mt-4">
          <Image
            alt="img-2"
            src="/images/vnpay/image2.png"
            quality={100}
            objectFit="contain"
            layout="fill"
          />
        </div>

        <p className="font-bold text-lg mt-8">
          {`3. Phương thức thanh toán qua “Thẻ thanh toán quốc tế (Visa, MasterCard, JCB, UnionPay)”`}
        </p>

        <p className="text-p16 text-grey-1 text-justify">
          {`Tương tự như phương thức thanh toán “Thẻ nội địa và tài khoản ngân hàng”`}
        </p>

        <p className="font-bold text-lg mt-8">
          {`4. Phương thức thanh toán qua “Ví điện tử VNPAY”`}
        </p>

        <p className="text-p16 text-grey-1 text-justify">
          {`Tương tự như phương thức thanh toán “Ứng dụng thanh toán hỗ trợ VNPAY-QR`}
        </p>

        <p className="font-bold text-base mt-8">{`---------------------`}</p>
        <p className="font-bold text-lg mt-2">KÊNH HỖ TRỢ VNPAY</p>
        <p className="text-p16 text-grey-1 text-justify mt-2">
          {`- Tổng đài: *3388 hoặc 1900 55 55 77`}
        </p>
        <p className="text-p16 text-grey-1 text-justify mt-1">
          {`- Zalo OA: `}
          <span className="text-button-2">
            <a
              href="https://zalo.me/4134983655549474109"
              target="_blank"
              rel="noopener noreferrer"
            >{`zalo.me/4134983655549474109`}</a>
          </span>
        </p>
        <p className="text-p16 text-grey-1 text-justify mt-1">
          {`- Email: `}
          <span className="text-button-2">
            <a href="mailto:hotro@vnpay.vn">{`hotro@vnpay.vn`}</a>
          </span>
        </p>
        <p className="text-p16 text-grey-1 text-justify mt-1">
          {`- Fanpage: `}
          <span className="text-button-2">
            <a
              href="https://www.facebook.com/VNPAYQR.vn"
              target="_blank"
              rel="noopener noreferrer"
            >{`facebook.com/VNPAYQR.vn`}</a>
          </span>
        </p>
      </div>
    </Fragment>
  )
}

export default PolicyVNPAYPage
