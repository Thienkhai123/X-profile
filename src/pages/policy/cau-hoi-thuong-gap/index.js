import { Fragment } from 'react'
import Head from 'next/head'
import { Divider } from 'common/presentation'

const FAQSPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Chính sách thanh toán</title>
      </Head>
      <div className="flex-1 bg-white py-10 xl:px-40 md:px-20 px-10 text-neutral">
        <h1 className="font-bold text-xl">CÂU HỎI THƯỜNG GẶP</h1>
        <p className="text-p16 text-neutral mt-4 text-justify">
          CHÀO MỪNG BẠN TỚI TRUNG TÂM TRỢ GIÚP CỦA XPROFILE. TẠI ĐÂY, BẠN CÓ THỂ
          TÌM KIẾM CÁC THÔNG TIN HỮU ÍCH CÓ SẴN. NẾU NHỮNG NỘI DUNG TRÊN VẪN
          CHƯA LÀM BẠN THỎA MÃN, HÃY LIÊN HỆ VỚI CHÚNG TÔI QUA SỐ HOTLINE: 0981
          821 728 HOẶC EMAIL: INFO@XPROFILE.VN
        </p>

        <div className="my-5">
          <Divider />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-p16 text-neutral text-justify">
            Câu 1: Học online là học như thế nào?
          </p>
          <p className="text-p16 text-neutral text-justify">
            Các khóa học trên Xprofile.vn theo dạng video clip được thu sẵn.
            Thời lượng trung bình mỗi khóa là từ 1-4 giờ, được chia nhỏ thành
            các phần có thời lượng từ 8-15 phút. Các bạn có thể học trực tuyến
            trên https://Xprofile.vn/ hoặc tải ứng dụng Xprofile trên Google
            Play & hoặc App Store.
          </p>
          <p className="text-p16 text-neutral text-justify">
            Câu 2: Làm thế nào để tương tác với Giảng viên?
          </p>
          <p className="text-p16 text-neutral text-justify">
            {`Học viên tương tác với Giảng viên thông qua các buổi Zoom Meeting
            hoặc Livestream (Thông tin sẽ được cập nhật chi tiết trong nhóm Học
            Viên Xprofile trên Facebook). Trường hợp bạn không thể tham gia trực
            tiếp Zoom Meeting hoặc Livestream, Xprofile sẽ đưa video ghi hình
            vào mục “Tài liệu tham khảo” của khóa học.`}
          </p>
          <p className="text-p16 text-neutral text-justify">
            Câu 3: Khi nào tôi có thể bắt đầu học?
          </p>
          <p className="text-p16 text-neutral text-justify">
            Sau khi bạn thanh toán thành công, hệ thống sẽ tự động kích hoạt
            khóa học vào tài khoản của bạn. Để tham gia khóa học, bạn cần:
          </p>
          <p className="text-p16 text-neutral text-justify">
            Bước 1: Đăng nhập tài khoản trên https://Xprofile.vn/ hoặc app ứng
            dụng Xprofile trên điện thoại di động/máy tính bảng…
          </p>
          <p className="text-p16 text-neutral text-justify">
            Bước 2: Vào mục “Khóa học của tôi”
          </p>
          <p className="text-p16 text-neutral text-justify">
            Bước 3: Chọn khóa học và bắt đầu.
          </p>
          <p className="text-p16 text-neutral text-justify">
            Câu 4: Học viên có được cấp giấy chứng nhận không?
          </p>
          <p className="text-p16 text-neutral text-justify">
            Bạn sẽ nhận được giấy chứng nhận nếu hoàn thành bài kiểm tra và đạt
            từ 6 điểm trở lên.
          </p>
          <p className="text-p16 text-neutral text-justify">
            Giấy chứng nhận có xếp loại theo điểm số bạn đạt được, cụ thể như
            sau:
          </p>
          <p className="text-p16 text-neutral text-justify">
            Điểm 6 - 6.9: Đạt
          </p>
          <p className="text-p16 text-neutral text-justify">
            Điểm 7 - 7.9: Khá
          </p>
          <p className="text-p16 text-neutral text-justify">
            Điểm 8 - 8.9: Giỏi
          </p>
          <p className="text-p16 text-neutral text-justify">
            Điểm 9 trở lên: Xuất sắc
          </p>
          <p className="text-p16 text-neutral text-justify">
            Câu 5: Quy trình thành toán như thế nào?
          </p>
          <p className="text-p16 text-neutral text-justify">
            Để thành toán các bạn vui long thực hiện các bước sau:
          </p>
          <p className="text-p16 text-neutral text-justify">
            Bước 1: Truy cập
            <span className="text-blue-500">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://xprofile.vn/"
              >
                {' '}
                https://Xprofile.vn/
              </a>
            </span>
          </p>
          <p className="text-p16 text-neutral text-justify">
            Bước 2: Chọn khóa học cần mua
          </p>
          <p className="text-p16 text-neutral text-justify">
            Bước 3: Bấm chọn “MUA NGAY”
          </p>
          <p className="text-p16 text-neutral text-justify">{`Bước 4: Nhập mã giảm giá (nếu có)`}</p>
          <p className="text-p16 text-neutral text-justify">
            Bước 5: Chọn phương thức thanh toán
          </p>
          <p className="text-p16 text-neutral text-justify">
            Bước 6: Tiến hành thanh toán
          </p>
          <p className="text-p16 text-neutral text-justify">
            Câu 6: Các hình thức thanh toán của Xprofile?
          </p>
          <p className="text-p16 text-neutral text-justify">
            Hiện tại Xprofile có 2 hình thức thanh toán:
          </p>
          <p className="text-p16 text-neutral text-justify">
            Thanh toán bằng thẻ tín dụng, ATM
          </p>
          <p className="text-p16 text-neutral text-justify">{`Chuyển khoản ngân hàng (Xprofile khuyến khích bạn thanh toán bằng hình thức này)`}</p>
          <p className="text-p16 text-neutral text-justify">
            Thông tin chuyển khoản
          </p>
          <p className="text-p16 text-neutral text-justify">
            Bạn vui lòng chuyển khoản cho Xprofile theo thông tin sau:
          </p>
          <p className="text-p16 text-neutral text-justify">
            - Số tài khoản: 317540981
          </p>
          <p className="text-p16 text-neutral text-justify">
            - Chủ tài khoản: CÔNG TY CỔ PHẦN CÔNG NGHỆ X-PROFILE
          </p>
          <p className="text-p16 text-neutral text-justify">{`- Ngân hàng: Ngân Hàng Quân Đội (MB Bank)`}</p>
          <p className="text-p16 text-neutral text-justify">
            Nội dung chuyển khoản: HỌ TÊN_SỐ ĐIỆN THOẠI_TÊN KHÓA HỌC
          </p>
          <p className="text-p16 text-neutral text-justify">
            Ví dụ: NGUYỄN VĂN A_0123456789_COMBO9
          </p>
          <p className="text-p16 text-neutral text-justify">
            Câu 7: Nhóm riêng hỗ trợ Học viên là như thế nào?
          </p>
          <p className="text-p16 text-neutral text-justify">
            Khi trở thành học viên của Xprofile, bạn nên tham gia nhóm Học Viên
            trên Facebook. Đây là nơi cập nhật nhanh nhất về thông tin khóa học,
            lịch Zoom Meeting và các chương trình khuyến mãi...Đặc biệt, thành
            viên của của nhóm Học viên Xprofile sẽ được giảm 15% khi mua các
            khóa học bất kỳ của Xprofile.
          </p>
          <p className="text-p16 text-neutral text-justify mt-4">
            Lưu ý: Các bạn vui lòng cung cấp email hoặc số điện thoại đã đăng ký
            tài khoản trong phần câu hỏi để được duyệt vào nhóm nhé!
          </p>
          <p className="text-p16 text-neutral text-justify">
            Câu 8: Tài khoản bị chặn?
          </p>
          <p className="text-p16 text-neutral text-justify">
            Tài khoản Học viên được phép truy cập tối đa 05 trình duyệt. Nếu
            đăng nhập quá số lần quy định, tài khoản của bạn sẽ bị khóa.
          </p>
          <p className="text-p16 text-neutral text-justify">
            Ví dụ: Bạn đăng nhập tài khoản trên Cốc Cốc và Google Chrome thì hệ
            thống sẽ tính là 02 trình duyệt.
          </p>
          <p className="text-p16 text-neutral text-justify">
            Khi bị khóa tài khoản học viên vui lòng liên hệ:
          </p>
          <p className="text-p16 text-neutral text-justify">{`Fanpage: Xprofile - Committed To Your Success`}</p>
          <p className="text-p16 text-neutral text-justify">
            Hoặc Hotline: 0765261579
          </p>
          <p className="text-p16 text-neutral text-justify">
            Lưu ý: Xprofile chỉ hỗ trợ mở khóa 01 lần duy nhất.
          </p>
          <p className="text-p16 text-neutral text-justify">
            Câu 9: Giá khóa học đã bao gồm VAT chưa? Có hỗ trợ xuất hóa đơn
            không?
          </p>
          <p className="text-p16 text-neutral text-justify">
            Giá niêm yết các khóa học của Xprofile đã bao gồm VAT. Cá nhân hoặc
            Doanh nghiệp muốn xuất hóa đơn, vui lòng gửi thông tin về địa chỉ
            mail: info@Xprofile.vn.
          </p>
          <p className="text-p16 text-neutral text-justify">
            Trong email ghi rõ:
          </p>
          <p className="text-p16 text-neutral text-justify">Tên Doanh nghiệp</p>
          <p className="text-p16 text-neutral text-justify">Mã số thuế</p>
          <p className="text-p16 text-neutral text-justify">
            Địa chỉ doanh nghiệp
          </p>
          <p className="text-p16 text-neutral text-justify">
            Thời gian nhận yêu cầu xuất hóa đơn: 01 ngày làm việc kể từ ngày
            khóa học được kích hoạt thành công. Mọi yêu cầu phát sinh sau thời
            gian trên sẽ không được chấp nhận.
          </p>
          <p className="text-p16 text-neutral text-justify">
            Thời gian gửi lại hóa đơn: 03 - 05 ngày làm việc.
          </p>
        </div>
      </div>
    </Fragment>
  )
}

export default FAQSPage
