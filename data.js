// ============================================================
// data.js — Escape Room: Giải cứu Alpha Corp
// Dữ liệu 10 phòng + Intro + Ending
// KHÔNG rút gọn nội dung. Giữ nguyên văn từ kịch bản.
// ============================================================

const INTRO_DATA = {
  title: "Escape Room: Giải cứu Alpha Corp",
  subtitle: "Chương 3: Giá trị thặng dư trong nền kinh tế thị trường",
  description: `<p>Bạn là thành viên của nhóm phân tích khủng hoảng tài chính. Alpha Corp đang đứng trước nguy cơ đình trệ toàn bộ dự án khu đô thị ven biển.</p>
<p>Tập đoàn đã vay ngân hàng <strong>10.000 tỷ đồng</strong> để mua đất, thuê máy móc và công nhân xây dựng 3 tòa tháp. Tuy nhiên, thị trường bất động sản bất ngờ đóng băng. Người dân không có đủ khả năng mua nhà, khiến các tòa tháp không bán được.</p>
<p>Nhiệm vụ của bạn là đi qua từng phòng, phân tích quá trình vận động của tư bản và tìm ra điểm khiến Alpha Corp bị mắc kẹt.</p>`,
  formula: "T → H … SX … H' → T'",
  formulaExplanation: `<ul>
<li><strong>T</strong>: Tiền</li>
<li><strong>H</strong>: Hàng hóa đầu vào, gồm tư liệu sản xuất và sức lao động</li>
<li><strong>SX</strong>: Quá trình sản xuất</li>
<li><strong>H'</strong>: Hàng hóa mới sau sản xuất, có chứa giá trị thặng dư</li>
<li><strong>T'</strong>: Tiền thu về sau khi bán hàng hóa, lớn hơn tiền ban đầu</li>
</ul>
<p>Nhà tư bản bắt đầu bằng tiền, dùng tiền để mua tư liệu sản xuất và sức lao động, đưa vào quá trình sản xuất để tạo ra hàng hóa mới. Sau đó, hàng hóa phải được bán ra thị trường để thu về số tiền lớn hơn ban đầu. Nếu một khâu bị tắc, toàn bộ quá trình tuần hoàn tư bản sẽ bị gián đoạn.</p>`,
  buttonText: "Bắt đầu giải cứu"
};

const ENDING_DATA = {
  title: "Giải cứu hoàn tất",
  description: `<p>Bạn đã hoàn thành hành trình Escape Room và xác định được nguyên nhân Alpha Corp rơi vào khủng hoảng.</p>
<p>Công thức tuần hoàn tư bản là:</p>`,
  formula: "T → H … SX … H' → T'",
  analysis: `<p>Alpha Corp đã vận động được từ <strong>T</strong> đến <strong>H</strong>, từ <strong>H</strong> vào <strong>SX</strong>, từ <strong>SX</strong> tạo ra <strong>H'</strong>. Tuy nhiên, công ty thất bại ở bước <strong class="text-danger">H' → T'</strong> vì không bán được bất động sản.</p>`,
  conclusion: `<p><strong>Kết luận thuyết trình:</strong></p>
<p>Trường hợp Alpha Corp cho thấy: trong nền kinh tế thị trường, việc tạo ra hàng hóa chưa đủ để bảo đảm lợi nhuận. Doanh nghiệp còn phải bán được hàng hóa để thu hồi tiền và tiếp tục chu kỳ sản xuất.</p>
<p>Nếu hàng hóa không bán được, tư bản sẽ bị đóng băng, giá trị thặng dư không được hiện thực hóa và doanh nghiệp có thể rơi vào khủng hoảng.</p>`
};

const ROOMS = [
  // ============================================================
  // PHÒNG 1: Nguồn gốc của giá trị thặng dư
  // ============================================================
  {
    id: 1,
    title: "Nguồn gốc của giá trị thặng dư",
    objective: "Giúp người chơi hiểu giá trị thặng dư bắt nguồn từ sức lao động của công nhân.",
    theoryTitle: "Lý thuyết thuyết trình",
    theoryContent: `<p>Theo C. Mác, giá trị thặng dư là phần giá trị mới do người lao động tạo ra vượt quá giá trị sức lao động của họ và bị nhà tư bản chiếm hữu không công.</p>
<p>Trong quá trình sản xuất, người lao động bán sức lao động cho nhà tư bản. Nhà tư bản trả tiền lương tương ứng với giá trị sức lao động. Tuy nhiên, trong thời gian lao động, công nhân tạo ra giá trị lớn hơn tiền lương được trả.</p>
<p>Khoản chênh lệch giữa giá trị công nhân tạo ra và tiền lương công nhân nhận được chính là giá trị thặng dư.</p>
<p><strong>Tóm tắt ngắn:</strong></p>
<ul>
<li>Công nhân bán sức lao động.</li>
<li>Nhà tư bản trả tiền lương.</li>
<li>Công nhân tạo ra giá trị lớn hơn tiền lương.</li>
<li>Phần chênh lệch là giá trị thặng dư.</li>
</ul>`,
    caseTitle: "Áp dụng vào Alpha Corp",
    caseContent: `<p>Trong dự án khu đô thị ven biển, Alpha Corp thuê hàng nghìn công nhân xây dựng. Công nhân nhận tiền lương theo hợp đồng lao động.</p>
<p>Trong quá trình thi công, công nhân tạo ra giá trị mới thông qua việc xây dựng các tòa tháp. Phần giá trị mới vượt quá chi phí tiền lương trở thành nguồn gốc của giá trị thặng dư mà Alpha Corp kỳ vọng thu được khi bán căn hộ.</p>
<p><strong>Kết luận:</strong> Nguồn gốc của giá trị thặng dư trong dự án Alpha Corp xuất phát từ sức lao động của công nhân xây dựng, chứ không phải từ máy móc hay tiền vốn.</p>`,
    formula: null,
    question: "Nguồn gốc của giá trị thặng dư trong dự án Alpha Corp là gì?",
    options: [
      "Tiền vay ngân hàng",
      "Máy móc xây dựng",
      "Sức lao động của công nhân",
      "Vị trí ven biển của dự án"
    ],
    correctAnswer: 2,
    explanation: "Giá trị thặng dư bắt nguồn từ phần giá trị mới do công nhân tạo ra vượt quá giá trị sức lao động mà họ được trả dưới dạng tiền lương."
  },

  // ============================================================
  // PHÒNG 2: Bản chất của giá trị thặng dư
  // ============================================================
  {
    id: 2,
    title: "Bản chất của giá trị thặng dư",
    objective: "Giúp người chơi hiểu bản chất của giá trị thặng dư là lao động không được trả công.",
    theoryTitle: "Lý thuyết thuyết trình",
    theoryContent: `<p>Theo C. Mác, bản chất của giá trị thặng dư là phần lao động không được trả công của người lao động.</p>
<p>Trong ngày lao động của công nhân có thể chia thành hai phần:</p>
<ul>
<li>Một phần thời gian lao động dùng để tạo ra giá trị tương ứng với tiền lương.</li>
<li>Phần thời gian còn lại tạo ra giá trị thặng dư cho nhà tư bản.</li>
</ul>
<p>Đây là cơ sở hình thành lợi nhuận trong nền kinh tế tư bản chủ nghĩa.</p>
<p>Nói cách khác, nhà tư bản trả lương cho sức lao động, nhưng giá trị mà người lao động tạo ra trong quá trình sản xuất lớn hơn số tiền lương đó.</p>`,
    caseTitle: "Áp dụng vào Alpha Corp",
    caseContent: `<p>Trong quá trình xây dựng, công nhân tạo ra giá trị mới cho các công trình. Alpha Corp thanh toán tiền lương theo hợp đồng.</p>
<p>Tuy nhiên, giá trị tạo ra từ công trình hoàn thành lớn hơn tổng tiền lương đã trả. Khoản chênh lệch này chính là cơ sở để doanh nghiệp thu lợi nhuận sau khi bán sản phẩm bất động sản.</p>
<p><strong>Kết luận:</strong> Giá trị thặng dư mà Alpha Corp mong muốn thu được bắt nguồn từ phần giá trị mới do người lao động tạo ra vượt quá giá trị sức lao động của họ.</p>`,
    formula: null,
    question: "Theo C. Mác, bản chất của giá trị thặng dư là gì?",
    options: [
      "Phần lao động không được trả công",
      "Tiền lãi ngân hàng",
      "Giá trị của máy móc",
      "Giá trị của đất đai"
    ],
    correctAnswer: 0,
    explanation: "Bản chất của giá trị thặng dư là phần lao động công nhân đã bỏ ra nhưng không được trả công tương ứng, và phần đó bị nhà tư bản chiếm hữu."
  },

  // ============================================================
  // PHÒNG 3: Các phương pháp sản xuất giá trị thặng dư
  // ============================================================
  {
    id: 3,
    title: "Các phương pháp sản xuất giá trị thặng dư",
    objective: "Giúp người chơi hiểu hai phương pháp tạo ra giá trị thặng dư: tuyệt đối và tương đối.",
    theoryTitle: "Lý thuyết thuyết trình",
    theoryContent: `<p>C. Mác chỉ ra hai phương pháp cơ bản để sản xuất giá trị thặng dư.</p>
<p><strong>Thứ nhất là giá trị thặng dư tuyệt đối.</strong> Phương pháp này được tạo ra bằng cách kéo dài thời gian lao động trong khi tiền lương không tăng tương ứng.</p>
<p>Ví dụ: công nhân làm thêm giờ, tăng ca, kéo dài ngày lao động.</p>
<p><strong>Thứ hai là giá trị thặng dư tương đối.</strong> Phương pháp này được tạo ra bằng cách nâng cao năng suất lao động, làm giảm thời gian lao động tất yếu và tăng thời gian lao động thặng dư.</p>
<p>Ví dụ: dùng máy móc hiện đại, công nghệ mới, phần mềm quản lý để tăng năng suất.</p>
<p><strong>Tóm tắt:</strong></p>
<ul>
<li>Giá trị thặng dư tuyệt đối: tăng thời gian làm việc.</li>
<li>Giá trị thặng dư tương đối: tăng năng suất lao động.</li>
</ul>`,
    caseTitle: "Áp dụng vào Alpha Corp",
    caseContent: `<p>Alpha Corp có thể sử dụng cả hai phương pháp.</p>
<p><strong>Với giá trị thặng dư tuyệt đối,</strong> Alpha Corp yêu cầu công nhân tăng ca, làm việc ngoài giờ hoặc thi công liên tục để đẩy nhanh tiến độ xây dựng.</p>
<p><strong>Với giá trị thặng dư tương đối,</strong> Alpha Corp đầu tư máy móc hiện đại, công nghệ BIM và phần mềm quản lý xây dựng. Nhờ đó, năng suất lao động tăng lên, chi phí giảm xuống và lợi nhuận kỳ vọng tăng lên.</p>
<p><strong>Kết luận:</strong> Alpha Corp sử dụng kết hợp cả hai phương pháp nhằm tối đa hóa giá trị thặng dư trong quá trình xây dựng dự án.</p>`,
    formula: null,
    question: "Alpha Corp đầu tư máy móc hiện đại và công nghệ BIM để tăng năng suất lao động. Đây là phương pháp nào?",
    options: [
      "Giá trị thặng dư tuyệt đối",
      "Giá trị thặng dư tương đối",
      "Địa tô tư bản chủ nghĩa",
      "Lợi tức ngân hàng"
    ],
    correctAnswer: 1,
    explanation: "Khi doanh nghiệp dùng máy móc và công nghệ để tăng năng suất lao động, đó là phương pháp sản xuất giá trị thặng dư tương đối."
  },

  // ============================================================
  // PHÒNG 4: Bản chất của tích lũy tư bản
  // ============================================================
  {
    id: 4,
    title: "Bản chất của tích lũy tư bản",
    objective: "Giúp người chơi hiểu tích lũy tư bản là biến một phần giá trị thặng dư thành tư bản phụ thêm để mở rộng sản xuất.",
    theoryTitle: "Lý thuyết thuyết trình",
    theoryContent: `<p>Tái sản xuất là quá trình sản xuất được lặp đi lặp lại liên tục. Có hai loại tái sản xuất.</p>
<p><strong>Tái sản xuất giản đơn</strong> là quá trình sản xuất lặp lại với quy mô như cũ, toàn bộ giá trị thặng dư được dùng cho tiêu dùng cá nhân.</p>
<p><strong>Tái sản xuất mở rộng</strong> là quá trình sản xuất lặp lại với quy mô lớn hơn, trong đó nhà tư bản biến một phần giá trị thặng dư thành tư bản phụ thêm để tiếp tục đầu tư.</p>
<p>Vì vậy, <strong>tích lũy tư bản</strong> là quá trình biến một phần giá trị thặng dư thành tư bản phụ thêm nhằm mở rộng sản xuất.</p>
<p>Nguồn gốc của tích lũy tư bản chính là giá trị thặng dư do người lao động tạo ra.</p>`,
    caseTitle: "Áp dụng vào Alpha Corp",
    caseContent: `<p>Alpha Corp vay 10.000 tỷ đồng để xây dựng 3 tòa tháp. Mục tiêu của doanh nghiệp là bán căn hộ để thu lợi nhuận, sau đó dùng một phần lợi nhuận để trả nợ, tái đầu tư và mở rộng dự án.</p>
<p>Tuy nhiên, thị trường đóng băng khiến hàng hóa bất động sản không bán được. Tư bản bị kẹt ở hình thái hàng hóa H'. Alpha Corp không có tiền mặt để trả nợ, trả lương và tiếp tục tái sản xuất.</p>
<p><strong>Kết luận:</strong> Tích lũy tư bản chỉ thành công khi hàng hóa được tiêu thụ và giá trị thặng dư được thực hiện thành tiền.</p>`,
    formula: "T → H … SX … H' → T'",
    question: "Tích lũy tư bản là gì?",
    options: [
      "Giữ nguyên toàn bộ lợi nhuận để tiêu dùng cá nhân",
      "Biến một phần giá trị thặng dư thành tư bản phụ thêm để mở rộng sản xuất",
      "Vay tiền ngân hàng để trả lương công nhân",
      "Bán toàn bộ tài sản của doanh nghiệp"
    ],
    correctAnswer: 1,
    explanation: "Tích lũy tư bản là quá trình dùng một phần giá trị thặng dư để tiếp tục đầu tư, làm cho sản xuất được mở rộng hơn."
  },

  // ============================================================
  // PHÒNG 5: Quy mô tích lũy tư bản
  // ============================================================
  {
    id: 5,
    title: "Quy mô tích lũy tư bản",
    objective: "Giúp người chơi hiểu những nhân tố ảnh hưởng đến quy mô tích lũy tư bản.",
    theoryTitle: "Lý thuyết thuyết trình",
    theoryContent: `<p>Quy mô tích lũy tư bản phụ thuộc vào khối lượng giá trị thặng dư.</p>
<p><strong>Công thức:</strong></p>
<p class="formula-inline">M = m' × V</p>
<p>Trong đó:</p>
<ul>
<li><strong>M</strong> là khối lượng giá trị thặng dư.</li>
<li><strong>m'</strong> là tỷ suất giá trị thặng dư.</li>
<li><strong>V</strong> là tư bản khả biến, tức phần tư bản dùng để thuê lao động.</li>
</ul>
<p>Những nhân tố ảnh hưởng đến quy mô tích lũy gồm:</p>
<ul>
<li>Trình độ khai thác sức lao động.</li>
<li>Năng suất lao động xã hội.</li>
<li>Hiệu quả sử dụng máy móc, thiết bị.</li>
<li>Đại lượng tư bản ứng trước.</li>
</ul>
<p>Khi tư bản ứng trước càng lớn, doanh nghiệp càng có khả năng mở rộng quy mô. Nhưng nếu thị trường gặp khủng hoảng, số vốn lớn cũng có thể trở thành gánh nặng.</p>`,
    caseTitle: "Áp dụng vào Alpha Corp",
    caseContent: `<p>Alpha Corp ứng trước số vốn khổng lồ <strong>10.000 tỷ đồng</strong> để đầu tư quy mô lớn.</p>
<p>Khi thị trường thuận lợi, vốn lớn có thể giúp doanh nghiệp xây dựng dự án lớn và thu lợi nhuận lớn. Tuy nhiên, khi thị trường đóng băng, vốn vay lớn trở thành gánh nặng tài chính.</p>
<p>Alpha Corp phải chịu lãi vay, chi phí cố định, chi phí duy trì dự án và áp lực trả nợ ngân hàng.</p>
<p><strong>Kết luận:</strong> Vốn ứng trước lớn là "con dao hai lưỡi". Nó có thể thúc đẩy tích lũy nhanh, nhưng cũng dễ đẩy doanh nghiệp vào khủng hoảng nếu tư bản bị ứ đọng.</p>`,
    formula: null,
    question: "Vì sao khoản vay 10.000 tỷ đồng có thể trở thành gánh nặng cho Alpha Corp?",
    options: [
      "Vì vốn lớn luôn làm doanh nghiệp lỗ",
      "Vì khi không bán được hàng hóa, doanh nghiệp vẫn phải trả lãi và chịu chi phí cố định",
      "Vì công nhân không tạo ra giá trị mới",
      "Vì máy móc không thuộc tư bản"
    ],
    correctAnswer: 1,
    explanation: "Vốn ứng trước lớn có thể giúp doanh nghiệp mở rộng nhanh, nhưng nếu hàng hóa không bán được thì vốn bị ứ đọng và doanh nghiệp vẫn phải gánh chi phí tài chính."
  },

  // ============================================================
  // PHÒNG 6: Hệ quả của tích lũy tư bản
  // ============================================================
  {
    id: 6,
    title: "Hệ quả của tích lũy tư bản",
    objective: "Giúp người chơi hiểu các hệ quả chính của tích lũy tư bản.",
    theoryTitle: "Lý thuyết thuyết trình",
    theoryContent: `<p>Tích lũy tư bản tạo ra một số hệ quả chính.</p>
<p><strong>Thứ nhất,</strong> tích lũy làm tăng cấu tạo hữu cơ của tư bản. Nghĩa là phần tư bản bất biến như máy móc, nhà xưởng, nguyên vật liệu tăng nhanh hơn phần tư bản khả biến dùng để thuê lao động.</p>
<p><strong>Thứ hai,</strong> tích lũy làm tăng tích tụ và tập trung tư bản. Doanh nghiệp có lợi nhuận sẽ tiếp tục mở rộng quy mô hoặc mua bán, sáp nhập với doanh nghiệp khác để tăng sức mạnh thị trường.</p>
<p><strong>Thứ ba,</strong> tích lũy làm tăng chênh lệch giữa nhà tư bản và người lao động. Nhà tư bản ngày càng nắm nhiều tư liệu sản xuất và lợi nhuận, còn người lao động chủ yếu sống bằng tiền lương.</p>`,
    caseTitle: "Áp dụng vào Alpha Corp",
    caseContent: `<p>Alpha Corp huy động <strong>10.000 tỷ đồng</strong>, cho thấy mức độ tập trung tư bản cao.</p>
<p>Phần lớn vốn được đổ vào đất đai, công trình, máy móc và vật liệu xây dựng. Điều này thể hiện tư bản bất biến chiếm tỷ trọng lớn.</p>
<p>Khi thị trường khủng hoảng, tài sản vẫn thuộc về doanh nghiệp, nhưng công nhân có thể bị chậm lương, mất việc hoặc giảm thu nhập. Điều đó thể hiện sự bấp bênh của lao động làm thuê.</p>
<p><strong>Kết luận:</strong> Tích lũy giúp doanh nghiệp mở rộng quy mô, nhưng nếu tắc nghẽn tiêu thụ sẽ gây ứ đọng vốn, đình trệ sản xuất và ảnh hưởng trực tiếp đến người lao động.</p>`,
    formula: null,
    question: "Hệ quả nào thể hiện rõ trong tình huống Alpha Corp?",
    options: [
      "Vốn tập trung lớn vào đất đai, công trình và dự án bất động sản",
      "Doanh nghiệp không cần người lao động",
      "Hàng hóa luôn bán được ngay sau sản xuất",
      "Không có sự chênh lệch giữa doanh nghiệp và công nhân"
    ],
    correctAnswer: 0,
    explanation: "Alpha Corp huy động vốn lớn và đổ vào dự án bất động sản, thể hiện tích tụ, tập trung tư bản và sự gia tăng tư bản bất biến."
  },

  // ============================================================
  // PHÒNG 7: Lợi nhuận
  // ============================================================
  {
    id: 7,
    title: "Lợi nhuận",
    objective: "Giúp người chơi hiểu lợi nhuận là hình thức biểu hiện bên ngoài của giá trị thặng dư.",
    theoryTitle: "Lý thuyết thuyết trình",
    theoryContent: `<p>Theo C. Mác, trong nền kinh tế thị trường tư bản chủ nghĩa, giá trị thặng dư sau khi được tạo ra trong quá trình sản xuất sẽ biểu hiện ra bên ngoài dưới hình thức lợi nhuận.</p>
<p><strong>Công thức:</strong></p>
<p class="formula-inline">Giá trị hàng hóa = Chi phí sản xuất + Lợi nhuận</p>
<p>Nhà tư bản thường không nhìn thấy giá trị thặng dư như một phần lao động không được trả công của công nhân. Họ nhìn thấy nó dưới dạng khoản tiền chênh lệch giữa doanh thu bán hàng và tổng chi phí bỏ ra.</p>
<p>Nói cách khác:</p>
<ul>
<li>Người lao động tạo ra giá trị mới trong quá trình sản xuất.</li>
<li>Nhà tư bản trả tiền lương cho sức lao động.</li>
<li>Sau khi bán sản phẩm, phần giá trị còn lại sau khi trừ chi phí trở thành lợi nhuận.</li>
</ul>`,
    caseTitle: "Áp dụng vào Alpha Corp",
    caseContent: `<p>Alpha Corp vay ngân hàng 10.000 tỷ đồng. Công ty dùng vốn để mua đất, thuê máy móc, thuê nhân công và xây dựng 3 tòa tháp.</p>
<p>Nếu thị trường thuận lợi, ví dụ tổng chi phí xây dựng là 10.000 tỷ đồng và bán căn hộ thu về 15.000 tỷ đồng, thì khoản chênh lệch <strong>5.000 tỷ đồng</strong> chính là nguồn lợi nhuận mà Alpha Corp thu được.</p>
<p>Tuy nhiên, trong tình huống thị trường đóng băng, 3 tòa tháp không bán được. Giá trị mới tạo ra chưa được thực hiện trên thị trường. Alpha Corp không thu được lợi nhuận để trả lãi ngân hàng và tiếp tục sản xuất.</p>
<p><strong>Kết luận:</strong> Lợi nhuận của Alpha Corp là hình thức biểu hiện bên ngoài của giá trị thặng dư. Nhưng để giá trị thặng dư trở thành lợi nhuận, sản phẩm phải được bán trên thị trường.</p>`,
    formula: "T → H … SX … H' → T'",
    question: "Trong tình huống Alpha Corp, vì sao giá trị thặng dư chưa trở thành lợi nhuận?",
    options: [
      "Vì công nhân không làm việc",
      "Vì Alpha Corp không bán được căn hộ",
      "Vì không có tư liệu sản xuất",
      "Vì ngân hàng không cho vay"
    ],
    correctAnswer: 1,
    explanation: "Giá trị thặng dư chỉ trở thành lợi nhuận khi hàng hóa được bán ra thị trường. Alpha Corp không bán được căn hộ nên chưa thu được lợi nhuận."
  },

  // ============================================================
  // PHÒNG 8: Lợi tức
  // ============================================================
  {
    id: 8,
    title: "Lợi tức",
    objective: "Giúp người chơi hiểu lợi tức là phần lợi nhuận mà nhà tư bản đi vay phải trả cho chủ sở hữu vốn.",
    theoryTitle: "Lý thuyết thuyết trình",
    theoryContent: `<p>Trong nền kinh tế thị trường, nhiều nhà tư bản sử dụng vốn vay để mở rộng sản xuất.</p>
<p>Khi đó:</p>
<ul>
<li>Người cho vay cung cấp tư bản tiền tệ.</li>
<li>Người đi vay sử dụng vốn để sản xuất kinh doanh.</li>
<li>Một phần giá trị thặng dư thu được được chia cho người cho vay dưới dạng lợi tức.</li>
</ul>
<p><strong>Lợi tức</strong> là phần lợi nhuận mà nhà tư bản đi vay phải trả cho chủ sở hữu vốn.</p>
<p>Có thể hiểu đơn giản: doanh nghiệp vay tiền để kinh doanh. Nếu kinh doanh có lời, doanh nghiệp phải trích một phần lợi nhuận để trả lãi cho người cho vay.</p>`,
    caseTitle: "Áp dụng vào Alpha Corp",
    caseContent: `<p>Alpha Corp vay ngân hàng <strong>10.000 tỷ đồng</strong>. Khoản vay này trở thành nguồn vốn để mua đất, xây dựng dự án, thuê lao động và mua nguyên vật liệu.</p>
<p>Nếu dự án thành công, Alpha Corp bán được căn hộ, thu được lợi nhuận và dùng một phần lợi nhuận để trả lãi ngân hàng.</p>
<p>Tuy nhiên, khi thị trường đóng băng, Alpha Corp không bán được sản phẩm, không tạo ra dòng tiền và không có khả năng trả lãi. Điều này khiến quá trình tuần hoàn tư bản bị gián đoạn.</p>
<p><strong>Kết luận:</strong> Trong trường hợp Alpha Corp, lợi tức ngân hàng chính là phần giá trị được trích ra từ lợi nhuận mà doanh nghiệp kỳ vọng tạo ra trong tương lai.</p>`,
    formula: null,
    question: "Lợi tức trong tình huống Alpha Corp là gì?",
    options: [
      "Tiền lương trả cho công nhân",
      "Tiền lãi Alpha Corp phải trả cho ngân hàng",
      "Giá trị của căn hộ chưa bán",
      "Chi phí mua vật liệu xây dựng"
    ],
    correctAnswer: 1,
    explanation: "Alpha Corp vay vốn từ ngân hàng nên phải trả lãi. Khoản lãi đó chính là lợi tức mà người đi vay phải trả cho chủ sở hữu vốn."
  },

  // ============================================================
  // PHÒNG 9: Địa tô tư bản chủ nghĩa
  // ============================================================
  {
    id: 9,
    title: "Địa tô tư bản chủ nghĩa",
    objective: "Giúp người chơi hiểu trong lĩnh vực đất đai, giá trị thặng dư có thể biểu hiện thành địa tô.",
    theoryTitle: "Lý thuyết thuyết trình",
    theoryContent: `<p>Trong lĩnh vực đất đai, giá trị thặng dư có thể biểu hiện thành địa tô.</p>
<p><strong>Địa tô</strong> là phần giá trị mà nhà tư bản kinh doanh trên đất phải trả cho chủ sở hữu đất do quyền sở hữu đất.</p>
<p>Đối với lĩnh vực bất động sản, đất đai là một yếu tố đặc biệt vì:</p>
<ul>
<li>Nguồn cung đất có giới hạn.</li>
<li>Vị trí đất tạo ra giá trị khác nhau.</li>
<li>Giá trị bất động sản phụ thuộc lớn vào quyền sử dụng đất.</li>
</ul>
<p>Có thể hiểu đơn giản: cùng một công trình, nhưng nếu nằm ở vị trí đẹp, gần biển, gần trung tâm hoặc có khả năng khai thác thương mại cao thì giá bán sẽ cao hơn.</p>`,
    caseTitle: "Áp dụng vào Alpha Corp",
    caseContent: `<p>Alpha Corp đầu tư vào khu đô thị ven biển. Giá trị dự án không chỉ đến từ công sức xây dựng của công nhân, máy móc và nguyên vật liệu, mà còn đến từ vị trí ven biển, quyền sử dụng đất và khả năng khai thác thương mại.</p>
<p>Nếu dự án thành công, giá bán căn hộ có thể cao hơn nhiều so với chi phí xây dựng nhờ lợi thế vị trí đất ven biển.</p>
<p><strong>Kết luận:</strong> Trong bất động sản, giá trị thặng dư có thể biểu hiện thông qua lợi ích thu được từ việc khai thác đất đai và vị trí dự án.</p>`,
    formula: null,
    question: "Yếu tố nào làm cho dự án Alpha Corp có thể bán giá cao hơn ngoài chi phí xây dựng?",
    options: [
      "Vị trí ven biển và quyền sử dụng đất",
      "Số lượng công nhân nghỉ việc",
      "Việc không bán được căn hộ",
      "Khoản nợ ngân hàng"
    ],
    correctAnswer: 0,
    explanation: "Trong bất động sản, vị trí đất và quyền sử dụng đất có ảnh hưởng lớn đến giá trị dự án. Đây là cơ sở để giải thích địa tô tư bản chủ nghĩa."
  },

  // ============================================================
  // PHÒNG 10: Điểm mắc kẹt của Alpha Corp trong tuần hoàn tư bản
  // ============================================================
  {
    id: 10,
    title: "Điểm mắc kẹt của Alpha Corp trong tuần hoàn tư bản",
    objective: "Giúp người chơi tổng hợp toàn bộ vấn đề và xác định Alpha Corp bị mắc kẹt ở giai đoạn H' → T'.",
    theoryTitle: "Lý thuyết thuyết trình",
    theoryContent: `<p>Tư bản chỉ vận động bình thường khi nó liên tục chuyển hóa qua các hình thái:</p>
<p>Tư bản tiền tệ → tư bản sản xuất → tư bản hàng hóa → tư bản tiền tệ lớn hơn ban đầu.</p>
<p><strong>Công thức đầy đủ:</strong></p>
<p class="formula-highlight">T → H … SX … H' → T'</p>
<p>Trong đó:</p>
<ul>
<li><strong>T</strong> là tiền ban đầu.</li>
<li><strong>H</strong> là hàng hóa đầu vào.</li>
<li><strong>SX</strong> là quá trình sản xuất.</li>
<li><strong>H'</strong> là hàng hóa mới có chứa giá trị thặng dư.</li>
<li><strong>T'</strong> là tiền thu về sau khi bán hàng hóa.</li>
</ul>
<p>Nếu hàng hóa H' không bán được, tư bản bị mắc kẹt ở hình thái hàng hóa. Khi đó, doanh nghiệp có tài sản nhưng thiếu tiền mặt, không thu hồi được vốn, không trả được nợ và không thể tiếp tục chu kỳ sản xuất mới.</p>
<p>Giá trị thặng dư chỉ thật sự trở thành lợi nhuận khi hàng hóa được bán thành công trên thị trường.</p>`,
    caseTitle: "Áp dụng vào Alpha Corp",
    caseContent: `<p>Alpha Corp đã đi qua các giai đoạn:</p>
<ul>
<li><strong>T:</strong> Vay ngân hàng 10.000 tỷ đồng.</li>
<li><strong>H:</strong> Dùng tiền mua đất, thuê máy móc, mua vật liệu và thuê công nhân.</li>
<li><strong>SX:</strong> Tổ chức xây dựng 3 tòa tháp.</li>
<li><strong>H':</strong> Tạo ra sản phẩm bất động sản là các tòa tháp, căn hộ chờ bán.</li>
</ul>
<p>Tuy nhiên, Alpha Corp bị mắc kẹt ở giai đoạn:</p>
<p class="formula-highlight text-danger">H' → T'</p>
<p>Nguyên nhân là thị trường bất động sản đóng băng, người dân không có đủ khả năng mua nhà, tín dụng bị siết chặt và lãi suất tăng cao. Vì vậy, Alpha Corp không bán được căn hộ, không thu hồi được tiền và không có khả năng trả lãi ngân hàng.</p>
<p><strong>Kết luận:</strong> Alpha Corp không thiếu tài sản, nhưng thiếu khả năng chuyển tài sản thành tiền. Đây là nguyên nhân khiến tư bản bị mắc kẹt và quá trình tuần hoàn tư bản bị đứt gãy.</p>`,
    formula: "T → H … SX … H' → T'",
    question: "Alpha Corp bị mắc kẹt ở giai đoạn nào trong tuần hoàn tư bản?",
    options: [
      "T → H",
      "H … SX",
      "SX → H'",
      "H' → T'"
    ],
    correctAnswer: 3,
    explanation: "Alpha Corp đã có hàng hóa bất động sản nhưng không bán được. Vì vậy, công ty không thể chuyển H' thành T'. Đây là điểm đứt gãy chính trong tuần hoàn tư bản."
  }
];
