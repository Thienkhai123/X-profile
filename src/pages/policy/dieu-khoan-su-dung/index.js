import { Fragment } from 'react'
import Head from 'next/head'
import { Divider } from 'common/presentation'

const TermsOfUsePage = () => {
  return (
    <Fragment>
      <Head>
        <title>Điều khoản sử dụng</title>
      </Head>
      <div className="flex-1 bg-white py-10 xl:px-40 md:px-20 px-10 text-neutral">
        <h1 className="font-bold text-xl">ĐIỀU KHOẢN SỬ DỤNG</h1>

        <p className="text-p16 text-neutral mt-4 text-justify">
          THỎA THUẬN NGƯỜI DÙNG NÀY ÁP DỤNG CHO MỌI KHÁCH TRUY CẬP VÀ SỬ DỤNG
          DỊCH VỤ CỦA CHÚNG TÔI. XIN VUI LÒNG ĐỌC KỸ THỎA THUẬN NÀY ĐỂ NẮM RÕ VỀ
          VIỆC GIẢI QUYẾT NHỮNG KHIẾU NẠI GIỮA BẠN VÀ CHÚNG TÔI THAY VÌ VIỆC TỐ
          TỤNG.
        </p>

        <div className="my-5">
          <Divider />
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-bold text-lg">Chính sách riêng tư</p>

          <p className="text-p16 text-neutral text-justify">
            Chính sách riêng tư của chúng tôi được lồng ghép với thỏa thuận
            người dùng. Xin vui lòng đọc kĩ phần này để biết thêm các chi tiết
            liên quan tới việc thu thập, sử dụng và công bố thông tin cá nhân
            của bạn.
          </p>

          <p className="text-p16 text-neutral text-justify">
            Những tính năng và dịch vụ dành cho mỗi cá nhân
          </p>

          <p className="text-p16 text-neutral text-justify">
            Khi sử dụng dịch vụ trên trang web của chúng tôi, bạn sẽ nhận được
            những hướng dẫn và quy định liên quan đến từng dịch vụ, lời đề nghị
            và các tính năng cụ thể theo từng giai đoạn. Mọi hướng dẫn như vậy
            đều được lồng ghép với thỏa thuận người dùng. Vui lòng kiểm tra lại
            những điều khoản ngoài liên quan đến dịch vụ được cung cấp bởi các
            bên đối tác của chúng tôi trước khi sử dụng.
          </p>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <p className="font-bold text-lg">Sửa đổi</p>
          <p className="text-p16 text-neutral text-justify">
            {`Chúng tôi có thể thay đổi, xóa hoặc thêm vào các điều khoản trong
            thỏa thuận này tại bất cứ thời điểm nào. Những thay đổi này sẽ có
            hiệu lực đối với những người dùng hiện tại theo thứ tự như sau: (i)
            30 ngày sau khi chúng tôi thông báo về những thay đổi, không kể
            thông qua trang web, ứng dụng trên điện thoại, gửi qua địa chỉ
            e-mail hay dưới bất kì hình thức nào khác; hoặc (ii) khi bạn lựa
            chọn đồng ý với những thay đổi hoặc một phiên bản mới của thỏa thuận
            này có kèm sửa đổi. Nếu bạn gửi một thông báo thể hiện sự không đồng
            ý với thay đổi được đề xuất hoặc từ chối chấp nhận thay đổi, chúng
            tôi có thể (tùy ý) cho phép bạn tiếp tục sử dụng các dịch vụ trên
            trang web cũng như ứng dụng trên điện thoại hoặc không`}
          </p>
          <p className="text-p16 text-neutral text-justify">
            Điều kiện cho phép sử dụng dịch vụ
          </p>
          <p className="text-p16 text-neutral text-justify">
            Bạn chỉ có thể sử dụng được những dịch vụ do chúng tôi cung cấp sau
            khi đã hoàn tất việc đăng ký tài khoản, đồng ý với những quy định do
            chúng tôi đưa ra, lựa chọn khóa học phù hợp và thanh toán học phí.
          </p>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <p className="font-bold text-lg">Các quyền sở hữu</p>
          <p className="text-p16 text-neutral text-justify">
            Dịch vụ, trang web và ứng dụng điện thoại đều được sở hữu và vận
            hành bởi chúng tôi. Mọi videos, nội dung, giao diện trực quan, thông
            tin, đồ họa, thiết kế, biên tập, mã máy tính, sản phẩm, phần mềm,
            các dịch vụ và những thành phần khác trên trang web và ứng dụng điện
            thoại đều có bản quyền thuộc về tác giả Việt Nam, bằng sáng chế,
            luật thương hiệu, các công ước quốc tế, tất cả những tài sản trí tuệ
            cùng với các quyền sở hữu có liên quan và pháp luật hiện hành. Trừ
            khi được cho phép bởi chúng tôi, bạn không được bán, cấp phép, phân
            phối, sao chép, sửa đổi, công bố công khai, lan truyền, xuất bản,
            chỉnh sửa, điều chỉnh, tạo ra các sản phẩm bắt nguồn từ, hoặc sử
            dụng trái phép các tài liệu của chúng tôi.
          </p>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <p className="font-bold text-lg">Dữ liệu tài khoản</p>
          <p className="text-p16 text-neutral text-justify">
            {`Để sử dụng được những dịch vụ do chúng tôi cung cấp, người dùng cần
            đăng ký và tạo một tài khoản thông qua trang web hoặc ứng dụng trên
            điện thoại. Việc đăng ký bao gồm: (i) tạo một tên người dùng và mật
            khẩu duy nhất; (ii) cung cấp địa chỉ e-mail và (iii) số điện thoại.
            Xin lưu ý rằng chúng tôi không có quyền tiếp cận thông tin về thẻ
            dùng để thanh toán của bạn và đảm bảo rằng mọi thông tin được cung
            cấp là chính xác, cập nhật và hoàn chỉnh. Những thông tin này sẽ
            được chúng tôi giữ nguyên, bảo mật và chỉ thay đổi khi bạn mong
            muốn.`}
          </p>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <p className="font-bold text-lg">Mật khẩu</p>
          <p className="text-p16 text-neutral text-justify">
            Bạn sẽ được yêu cầu nhập một mật khẩu khi đăng ký tài khoản. Lưu ý
            hãy giữ bí mật thông tin về mật khẩu vì bạn sẽ chịu trách nhiệm với
            toàn bộ việc thanh toán học phí và những hoạt động dưới tài khoản
            của mình, trừ trường hợp bạn có chủ ý chuyển nhượng tài khoản cho
            một người học khác. Xin vui lòng liên hệ với chúng tôi ngay sau khi
            phát hiện tài khoản không đăng nhập được hoặc đã bị trộm, chỉ trừ
            trường hợp tài khoản của bạn bị vô hiệu do đã vi phạm một trong
            những điều khoản sử dụng của chúng tôi
          </p>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <p className="font-bold text-lg">Phương thức giao khóa học </p>
          <p className="text-p16 text-neutral text-justify">
            Giới hạn địa lý: không giới hạn. Sau khi thanh toán thành công,
            Khách hàng sẽ nhận được email thông báo đơn hàng xác nhận thanh toán
            thành công và hướng dẫn tham gia học tại Xprofile. Khách hàng có thể
            vào học ngày sau khi thanh toán xong.
          </p>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <p className="font-bold text-lg">Phủ nhận/Không bảo đảm</p>
          <p className="text-p16 text-neutral text-justify">
            Chúng tôi và những đối tác hoặc các bên thứ ba cam kết sẽ cố gắng
            mang đến cho người dùng những sản phẩm tốt nhất nhưng không đảm bảo
            các dịch vụ đưa ra không xảy ra rủi ro hoặc những lỗi được báo cáo
            sẽ được xử lí ngay sau đó. Mọi vấn đề phát sinh trong quá trình học
            xin vui lòng thông báo cho chúng tôi để giải quyết trong thời gian
            sớm nhất có thể.
          </p>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <p className="font-bold text-lg">Chính sách hoàn tiền</p>
          <p className="text-p16 text-neutral text-justify">
            Xprofile có trách nhiệm đảm bảo chất lượng bài giảng, khóa học và hỗ
            trợ điều chỉnh khi nhận được phản hồi từ Khách hàng. Khách hàng nên
            liên hệ trực tiếp đến Bộ phận hỗ trợ trực tuyến để được hỗ trợ những
            thông tin hữu ích về khóa học, chính sách đảm bảo khóa học trên
            website.
          </p>
          <p className="text-p16 text-neutral text-justify">
            Nếu có bất cứ sự không hài lòng nào về nội dung khóa học bị sai
            lệch, học viên đều có thể được hoàn học phí. Điều kiện để hoàn học
            phí như sau:
          </p>

          <ol className="text-p16 text-neutral list-decimal pl-8 flex flex-col gap-2">
            <li>
              Thời gian yêu cầu hoàn tiền chưa quá 7 ngày kể từ khi thanh toán
            </li>
            <li>Thời lượng học chưa vượt quá 30%</li>
          </ol>

          <p className="text-p16 text-neutral text-justify">
            Để tiến hành phản hồi và nhận lại học phí, quý khách vui lòng gửi
            email đến{' '}
            <span className="text-blue-500">
              <a href="mailto:info@xprofile.vn">info@xprofile.vn</a>
            </span>
            cùng với thông tin tài khoản trên xprofile.vn
          </p>

          <p className="text-p16 text-neutral text-justify">Lưu ý:</p>

          <ol className="text-p16 text-neutral list-decimal pl-8 flex flex-col gap-2">
            <li>
              {`Số tiền quý khách nhận được sẽ trừ đi phí thanh toán (nếu có) và phí chuyển khoản (nếu có)`}
            </li>
            <li>
              Quý khách sẽ nhận lại học phí trong vòng 10 - 15 ngày làm việc kể
              từ lúc gửi yêu cầu hoàn học phí.
            </li>
          </ol>

          <p className="text-p16 text-neutral text-justify">
            Quy trình giải quyết tranh chấp, khiếu nại Xprofile
          </p>
          <p className="text-p16 text-neutral text-justify">
            Xprofile luôn có trách nhiệm tiếp nhận và xử lý khiếu nại của học
            viên/khách hàng liên quan đến giao dịch tại sàn thương mại điện tử
            xprofile.vn. Khi phát sinh các khiếu nại, tranh chấp, Xprofile đề
            cao giải pháp thương lượng, hòa giải giữa các bên nhằm duy trì mối
            quan hệ, sự tin cậy của Khách hàng vào chất lượng dịch vụ của
            Xprofile.vn.
          </p>
          <p className="text-p16 text-neutral text-justify">
            Quy trình khiếu nại thực hiện theo các bước sau:
          </p>
          <p className="text-p16 text-neutral text-justify">
            Bước 1: Học viên/khách hàng khiếu nại về hàng hóa, dịch vụ của Nhà
            Bán Hàng mua trên sàn thương mại điện tử xprofile.vn thực hiện qua:
          </p>

          <ol className="text-p16 text-neutral list-disc pl-8 flex flex-col gap-2">
            <li>
              Gửi thư điện tử đến địa chỉ email:
              <span className="text-blue-500">
                <a href="mailto:info@xprofile.vn">info@xprofile.vn</a>
              </span>
              ; hoặc
            </li>
            <li>Gọi điện đến Hotline 0765261579 ; hoặc</li>
            <li>
              Người mua gửi khiếu nại tại địa chỉ: CÔNG TY CỔ PHẦN CÔNG NGHỆ
              X-PROFILE 28 Đường số 5, Khu đô thị Him Lam, Phường Tân Hưng, Quận
              7, Thành phố Hồ Chí Minh, Việt Nam
            </li>
          </ol>

          <p className="text-p16 text-neutral text-justify">
            Bước 2: Bộ phận Chăm Sóc Khách Hàng của Xprofile..vn sẽ tiếp nhận
            các khiếu nại, liên hệ làm rõ các yêu cầu của học viên/khách hàng
            trong thời gian sớm nhất có thể và không quá 07 ngày làm việc, kể từ
            ngày nhận được yêu cầu. Tùy theo tính chất và mức độ của sự việc,
            Xprofile sẽ có những biện pháp cụ thể để hỗ trợ học viên/khách hàng
            giải quyết khiếu nại, tranh chấp.
          </p>
          <p className="text-p16 text-neutral text-justify">
            Bước 3: Xprofile có thể yêu cầu học viên/khách hàng và/hoặc Nhà Bán
            Hàng cung cấp các thông tin, bằng chứng liên quan đến giao dịch, sản
            phẩm để xác minh, làm rõ vụ việc và có hướng xử lý thích hợp.
          </p>
          <p className="text-p16 text-neutral text-justify">
            {`Bước 4: Trong trường hợp Xprofile đã nỗ lực giải quyết khiếu nại,
          tranh chấp nhưng sự việc vượt quá khả năng và thẩm quyền của Xprofile,
          Xprofile sẽ yêu cầu học viên/khách hàng đưa vụ việc ra cơ quan Nhà
          nước có thẩm quyền giải quyết theo quy định của pháp luật. Xprofile
          tôn trọng và nghiêm túc thực hiện các quy định của pháp luật về bảo vệ
          quyền lợi của học viên/khách hàng (người tiêu dùng). Vì vậy, đề nghị
          các Nhà Bán Hàng trên sàn TMĐT Xprofile..vn cung cấp đầy đủ, chính
          xác, trung thực và chi tiết các thông tin liên quan đến sản phẩm. Mọi
          hành vi lừa đảo, gian lận trong kinh doanh đều bị lên án và phải chịu
          hoàn toàn trách nhiệm trước pháp luật.`}
          </p>
          <p className="text-p16 text-neutral text-justify">
            {`Các bên bao gồm Nhà Bán Hàng – người bán, Khách hàng – người mua có
          vai trò quan trọng và có trách nhiệm trong việc tích cực giải quyết sự
          việc. Nhà Bán Hàng cần có trách nhiệm cung cấp văn bản, tài liệu, giấy
          tờ, và các chứng cứ khác để chứng minh, làm rõ thông tin liên quan đến
          sự việc đang gây mâu thuẫn cho học viên/khách hàng. Khi được yêu cầu,
          Xprofile sẽ cung cấp những thông tin liên quan đến Người mua và Người
          bán nếu được Người mua hoặc Người bán đó (liên quan đến tranh chấp)
          đồng ý hoặc trong phạm vi được luật pháp cho phép.`}
          </p>
          <p className="text-p16 text-neutral text-justify">
            Trong trường hợp giao dịch phát sinh khiếu nại, tranh chấp mà được
            xác định lỗi thuộc về Người bán, Xprofile sẽ có biện pháp cảnh cáo,
            khóa tài khoản hoặc chuyển cho cơ quan Nhà nước có thẩm quyền xử lý
            tùy theo mức độ của sai phạm. Xprofile sẽ chấm dứt và gỡ bỏ toàn bộ
            tin bài về sản phẩm của Người bán đó trên Xprofile.vn đồng thời yêu
            cầu Người bán bồi thường cho học viên/khách hàng thỏa đáng trên cơ
            sở thỏa thuận với học viên/khách hàng.
          </p>
          <p className="text-p16 text-neutral text-justify">
            Trường hợp Xprofile và các bên đã nỗ lực giải quyết qua hình thức
            thương lượng, thỏa thuận mà vẫn không thể giải quyết được mâu thuẫn
            phát sinh từ giao dịch giữa học viên/khách hàng và Nhà bán hàng, thì
            một trong hai bên học viên/khách hàng và Nhà bán hàng sẽ có thể đưa
            vụ việc đến cơ quan Nhà nước có thẩm quyền giải quyết nhằm đảm bảo
            lợi ích hợp pháp của các bên.
          </p>
          <p className="text-p16 text-neutral text-justify">
            Bất kỳ tranh cãi, khiếu nại hoặc tranh chấp phát sinh từ hoặc liên
            quan đến giao dịch tại Website hoặc các Quy định và Điều kiện này
            đều sẽ được giải quyết bằng hình thức thương lượng, hòa giải, trọng
            tài và/hoặc Tòa án theo Luật Bảo vệ quyền lợi người tiêu dùng năm
            2010, tại Chương 4 về Giải quyết tranh chấp giữa người tiêu dùng và
            tổ chức, cá nhân kinh doanh hàng hóa, dịch vụ.
          </p>
        </div>
      </div>
    </Fragment>
  )
}

export default TermsOfUsePage
