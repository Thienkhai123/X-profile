import { Fragment } from 'react'
import Head from 'next/head'
import { Divider } from 'common/presentation'

const PrivacyPolicyPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Chính sách bảo mật</title>
      </Head>
      <div className="flex-1 bg-white py-10 xl:px-40 md:px-20 px-10 text-neutral">
        <h1 className="font-bold text-xl">CHÍNH SÁCH RIÊNG TƯ</h1>
        <p className="text-p16 text-neutral mt-4 text-justify">
          CHÚNG TÔI BIẾT BẠN LUÔN QUAN TÂM VỀ VIỆC NHỮNG THÔNG TIN CÁ NHÂN ĐƯỢC
          SỬ DỤNG VÀ CHIA SẺ RA SAO CŨNG NHƯ ĐÁNH GIÁ CAO SỰ TIN TƯỞNG CỦA CÁC
          BẠN, DO VẬY, CHÚNG TÔI SẼ THỰC HIỆN ĐIỀU NÀY MỘT CÁCH CẨN THẬN VÀ HỢP
          LÍ NHẤT CÓ THỂ.
        </p>

        <div className="my-5">
          <Divider />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-p16 text-neutral text-justify">
            Mục đích và phạm vi thu thập
          </p>
          <p className="text-p16 text-neutral text-justify">
            Mục đích ban đầu của chúng tôi trong việc thu thập thông tin cá nhân
            là để cung cấp cho học viên/khách hàng trải nghiệm an toàn, mượt mà,
            hiệu quả và được cá nhân hóa. Điều này cho phép chúng tôi cung cấp
            những dịch vụ và tiện ích đáp ứng được nhu cầu của bạn cũng như tùy
            chỉnh các dịch vụ giúp cho trải nghiệm của bạn trở nên dễ dàng và
            tuyệt vời hơn. Bạn có thể duyệt các phần của trang web mà không cần
            cung cấp cho chúng tôi các thông tin cá nhân mang tính định danh.
            Chúng tôi chỉ thu thập các thông tin cá nhân được bạn tự nguyện cung
            cấp thông qua việc đăng ký trên trang web cũng như trên ứng dụng
            điện thoại trong các trường hợp sử dụng nhất định. Bạn có thể chọn
            không cung cấp cho chúng tôi một số thông tin nhất định nhưng điều
            này sẽ khiến bạn không tận dụng được hết các tính năng và chức năng
            của trang web cũng như ứng dụng. Chúng tôi sử dụng các thông tin cá
            nhân để cung cấp trang web và ứng dụng tới học viên/khách hàng cũng
            như phát triển việc phân tích, tổng hợp dữ liệu để cải thiện sản
            phẩm. Bạn sẽ không còn vô danh với chúng tôi một khi cung cấp những
            thông tin cá nhân của mình.
          </p>
          <p className="text-p16 text-neutral text-justify">
            {`Ngoài những mục đích sử dụng cụ thể được phác thảo bên dưới, chúng
            tôi thường sử dụng các thông tin cá nhân thu thập được cho những mục
            đích sau: Tạo và duy trì tài khoản học viên/khách hàng; Cung cấp cho
            học viên/khách hàng các tính năng và chức năng của trang web và ứng
            dụng; Cá nhân hóa nội dung cung cấp cho học viên/khách hàng dựa trên
            tính cách và sở thích; Cải thiện trang web, ứng dụng cũng như các
            sản phẩm và dịch vụ khác; Khắc phục các sự cố, đưa ra các thông báo
            bắt buộc, thực thi Quy định đối với học viên/khách hàng (VD: trường
            hợp cần bảo vệ quyền sở hữu trí tuệ của một bên thứ ba hoặc các
            quyền sở hữu), thông báo cho học viên/khách hàng về những thay đổi
            trong các chính sách hoặc thỏa thuận có ảnh hưởng tới việc sử dụng
            trang web hoặc ứng dụng.`}
          </p>
          <p className="text-p16 text-neutral text-justify">
            {`Trong quá trình đăng ký, bạn sẽ phải cung cấp những thông tin liên
            lạc trung thực theo đúng Quy định dành cho học viên/khách hàng của
            chúng tôi, bao gồm: (1) một tên tài khoản và mật khẩu duy nhất, (2)
            địa chỉ email của bạn, (3) đất nước nơi bạn cư trú, (4) sở thích
            ngôn ngữ và (5) giới tính của bạn. Chúng tôi sử dụng những thông tin
            này để tạo tài khoản cho bạn trên trang website cũng như trên ứng
            dụng điện thoại, liên hệ với bạn về những dịch vụ được bạn quan tâm
            và cung cấp những trải nghiệm phù hợp nhất dựa trên sự ưu tiên của
            bạn (VD: thông tin về đất nước nơi bạn cư trú giúp chúng tôi cung
            cấp cho bạn một giáo viên đang làm việc trong múi giờ tương ứng).`}
          </p>
          <p className="text-p16 text-neutral text-justify">
            Phạm vi sử dụng thông tin
          </p>
          <p className="text-p16 text-neutral text-justify">
            {`Với mục đích mang đến trải nghiệm tốt nhất cho học viên/khách hàng,
            chúng tôi sẽ thu thập dữ liệu về việc sử dụng trang web và ứng dụng
            của bạn, bao gồm (nhưng không giới hạn) ở những điều sau đây: (1)
            thời gian tiết học, (2) những tính năng của trang web được bạn sử
            dụng, (3) thời điểm bạn truy cập trang web, ứng dụng điện thoại và
            các tính năng liên quan.`}
          </p>
          <p className="text-p16 text-neutral text-justify">
            Chúng tôi có thể sử dụng những thông tin trên đây như đã nêu ở Chính
            sách riêng tư này. Chúng tôi sử dụng thông tin bạn cung cấp để:
          </p>
          <p className="text-p16 text-neutral text-justify">
            - Cung cấp thông tin các khóa học đến bạn;
          </p>
          <p className="text-p16 text-neutral text-justify">
            - Gửi các thông báo về các hoạt động trao đổi thông tin giữa Chúng
            tôi và bạn;
          </p>
          <p className="text-p16 text-neutral text-justify">
            - Ngăn ngừa các hoạt động phá hủy tài khoản học viên/khách hàng của
            bạn hoặc các hoạt động giả mạo học viên/khách hàng;
          </p>
          <p className="text-p16 text-neutral text-justify">
            - Liên lạc và giải quyết với bạn trong những trường hợp đặc biệt;
          </p>
          <p className="text-p16 text-neutral text-justify">
            - Không sử dụng thông tin cá nhân của bạn ngoài mục đích xác nhận và
            liên hệ có liên quan đến khóa học, hoạt động tại Xprofile.vn;
          </p>
          <p className="text-p16 text-neutral text-justify">
            - Trong trường hợp có yêu cầu của pháp luật: Chúng tôi có trách
            nhiệm hợp tác cung cấp thông tin cá nhân của bạn khi có yêu cầu từ
            cơ quan tư pháp bao gồm: Viện kiểm sát, tòa án, cơ quan công an điều
            tra liên quan đến hành vi vi phạm pháp luật nào đó của bạn. Ngoài
            ra, không ai có quyền xâm phạm vào thông tin cá nhân của bạn.
          </p>
          <p className="text-p16 text-neutral text-justify">
            Thời gian lưu trữ thông tin
          </p>
          <p className="text-p16 text-neutral text-justify">
            Dữ liệu cá nhân của bạn sẽ được lưu trữ cho đến khi có yêu cầu hủy
            bỏ. Còn lại trong mọi trường hợp thông tin cá nhân thành viên sẽ
            được bảo mật trên máy chủ của Xprofile.vn.
          </p>
          <p className="text-p16 text-neutral text-justify">
            Điều kiện về việc chia sẻ thông tin học viên/khách hàng
          </p>
          <p className="text-p16 text-neutral text-justify">
            - Thông tin không định danh: Chúng tôi có thể chia sẻ thông tin tổng
            hợp về cơ sở học viên/khách hàng tới các bên quảng cáo hiện tại và
            đối tác kinh doanh tiềm năng. Tuy nhiên, những thông tin này sẽ
            không giúp xác định bất cứ học viên/khách hàng cụ thể nào
          </p>
          <p className="text-p16 text-neutral text-justify">
            - Học viên/khách hàng khác: Nếu bạn liên lạc với những học
            viên/khách hàng của trang web hay ứng dụng điện thoại khác, những
            học viên/khách hàng này sẽ có thể có được tên tài khoản của bạn cũng
            như bất cứ thông tin cá nhân nào bạn lựa chọn chia sẻ với họ.
          </p>
          <p className="text-p16 text-neutral text-justify">
            {`- Giáo viên: Nếu bạn tham gia vào một tiết học hoặc trong bất kì
            liên lạc nào với giáo viên, những giáo viên này sẽ nhận được tên tài
            khoản của bạn cũng như những thông tin cá nhân nào bạn đã chia sẻ
            trong tiết học. Các giáo viên có thể bao gồm bất cứ thông tin nào
            được bạn cung cấp ở trong mục ghi chú (xem mục “Ghi chú của giáo
            viên” ở phía trên).`}
          </p>
          <p className="text-p16 text-neutral text-justify">
            {`- Các đối tác kinh doanh: Chúng tôi có thể cung cấp những thông tin
            không mang tính định danh cho một bên thứ ba theo như thỏa thuận
            kinh doanh với họ, bao gồm (nhưng không giới hạn) việc phối hợp cung
            cấp một sản phẩm hoặc dịch vụ cho học viên/khách hàng hoặc tạo ra
            khả năng tương tác giữa các sản phẩm và dịch vụ của chúng tôi và các
            sản phẩm và dịch vụ của các bên đối tác.`}
          </p>
          <p className="text-p16 text-neutral text-justify">
            - Nhà cung cấp dịch vụ: Chúng tôi có thể sử dụng các nhà thầu và các
            bên cung cấp dịch vụ thứ ba có liên quan tới trang web và ứng dụng
            trên điện thoại. Khi những nhà thầu hoặc nhà cung cấp dịch vụ tiếp
            cận được với những thông tin cá nhân của bạn, họ đều được yêu cầu
            phải bảo mật chúng theo phương thức nhất quán với Chính sách riêng
            tư này, VD: không sử dụng các thông tin đó cho bất kì mục đích nào
            ngoài việc tiến hành cung cấp các dịch vụ cho chúng tôi. Chúng tôi
            có quyền công bố thông tin cá nhân của học viên/khách hàng hoặc bất
            cứ thông nào khác được luật yêu cầu hoặc khi chúng tôi nhận thấy sự
            công bố đó là cần thiết để bảo vệ quyền lợi của bạn hoặc của chúng
            tôi.
          </p>
          <p className="text-p16 text-neutral text-justify">
            Địa chỉ của đơn vị thu thập và quản lý thông tin cá nhân
          </p>
          <p className="text-p16 text-neutral text-justify">
            CÔNG TY CỔ PHẦN CÔNG NGHỆ X-PROFILE
          </p>
          <p className="text-p16 text-neutral text-justify">
            Trụ sở: 28 Đường số 5, Khu đô thị Him Lam, Phường Tân Hưng, Quận 7,
            Thành phố Hồ Chí Minh, Việt Nam
          </p>
          <p className="text-p16 text-neutral text-justify">
            Email: info@Xprofile.vn
          </p>
          <p className="text-p16 text-neutral text-justify">
            Số điện thoại: 0765261579
          </p>
          <p className="text-p16 text-neutral text-justify">
            Phương tiện và công cụ để học viên/khách hàng tiếp cận và chỉnh sửa
            dữ liệu cá nhân của mình
          </p>
          <p className="text-p16 text-neutral text-justify">
            - Bạn có quyền tự kiểm tra, cập nhật, điều chỉnh thông tin cá nhân
            của mình bằng cách đăng nhập vào tài khoản và chỉnh sửa thông tin cá
            nhân hoặc yêu cầu Xprofile.vn thực hiện việc này
          </p>
          <p className="text-p16 text-neutral text-justify">
            - Bạn có quyền gửi khiếu nại về việc lộ thông tin các nhân cho bên
            thứ 3 đến Bộ phận tiếp nhận khách hàng của Xprofile.vn. Khi tiếp
            nhận những phản hồi này, Xprofile.vn sẽ xác nhận lại thông tin, phải
            có trách nhiệm trả lời lý do và hướng dẫn bạn khôi phục và bảo mật
            lại thông tin.
          </p>
          <p className="text-p16 text-neutral text-justify">
            Email : info@Xprofile.vn.
          </p>
          <p className="text-p16 text-neutral text-justify">
            Những thay đổi về Chính sách riêng tư
          </p>
          <p className="text-p16 text-neutral text-justify">
            Nếu quyết định thay đổi Chính sách riêng tư của mình, chúng tôi sẽ
            công bố những thay đổi đó trong phần Chính sách riêng tư này và tại
            một số nơi thích hợp khác để bạn có thể biết được những loại thông
            tin chúng tôi thu thập, cách chúng tôi sử dụng chúng và những trường
            hợp chúng được công khai. Chúng tôi có quyền điều chỉnh Chính sách
            riêng tư này tại bất kì thời điểm nào và những thay đổi sẽ được áp
            dụng với thông tin bạn cung cấp hoặc những hoạt động của bạn trên
            trang web hoặc ứng dụng ngay sau khi thay đổi được công bố, vì vậy
            hãy thường xuyên xem lại chính sách này. Nếu chúng tôi đưa ra những
            thay đổi có ảnh hưởng tới việc sử dụng sản phẩm hoặc công bố thông
            tin cá nhân đã thu thập trước đó, chúng tôi sẽ liên hệ với bạn thông
            qua email hoặc thông báo trên trang web và ứng dụng để có được sự
            chấp thuận của bạn giúp những thay đổi trong Chính sách riêng tư
            được áp dụng một cách nghiêm túc.
          </p>
          <p className="text-p16 text-neutral text-justify">
            Cam kết bảo mật thông tin học viên/khách hàng
          </p>
          <p className="text-p16 text-neutral text-justify">
            Thông tin cá nhân của học viên/khách hàng trên Xprofile.vn được
            Xprofile.vn cam kết bảo mật tuyệt đối theo chính sách bảo vệ thông
            tin cá nhân của Xprofile.vn. Việc thu thập và sử dụng thông tin của
            mỗi thành viên chỉ được thực hiện khi có sự đồng ý của học
            viên/khách hàng đó trừ những trường hợp pháp luật có quy định khác.
          </p>
          <p className="text-p16 text-neutral text-justify">
            Không sử dụng, không chuyển giao, cung cấp hay tiết lộ cho bên thứ 3
            nào về thông tin cá nhân của thành viên khi không có sự cho phép
            đồng ý từ thành viên.
          </p>
          <p className="text-p16 text-neutral text-justify">
            Trong trường hợp máy chủ lưu trữ thông tin bị hacker tấn công dẫn
            đến mất mát dữ liệu cá nhân thành viên, Xprofile.vn. sẽ có trách
            nhiệm thông báo vụ việc cho cơ quan chức năng kiểm tra xử lý kịp
            thời và thông báo cho thành viên được biết.
          </p>
          <p className="text-p16 text-neutral text-justify">
            Bảo mật tuyệt đối mọi thông tin giao dịch của Thành viên tại khu vực
            dữ liệu trung tâm an toàn cấp 1 của Xprofile.vn
          </p>
          <p className="text-p16 text-neutral text-justify">
            Ban quản lý Xprofile.vn. yêu cầu các cá nhân khi đăng ký là thành
            viên, phải cung cấp đầy đủ thông tin cá nhân có liên quan như: Họ và
            tên, địa chỉ liên lạc, email, số chứng minh nhân dân, điện thoại...,
            và chịu trách nhiệm về tính pháp lý của những thông tin trên. Ban
            quản lý Xprofile.vn . không chịu trách nhiệm cũng như không giải
            quyết mọi khiếu nại có liên quan đến quyền lợi của Thành viên đó nếu
            xét thấy tất cả thông tin cá nhân của thành viên đó cung cấp khi
            đăng ký ban đầu là không chính xác.
          </p>
          <p className="text-p16 text-neutral text-justify"></p>
          <p className="text-p16 text-neutral text-justify"></p>
        </div>
      </div>
    </Fragment>
  )
}

export default PrivacyPolicyPage
