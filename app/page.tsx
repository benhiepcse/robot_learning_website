"use client";

import { useMemo, useState } from "react";

const tracks = [
  { icon: "⌁", name: "Nền tảng", meta: "12 bài", progress: 100, color: "#6c63ff" },
  { icon: "◎", name: "Computer Vision", meta: "24 bài", progress: 38, color: "#7c5cff" },
  { icon: "◇", name: "Machine Learning", meta: "18 bài", progress: 0, color: "#ff7a59" },
  { icon: "✦", name: "Deep Learning", meta: "22 bài", progress: 0, color: "#27b99a" },
  { icon: "◉", name: "ROS 2", meta: "20 bài", progress: 0, color: "#3da0ff" },
  { icon: "⌬", name: "Control & Simulation", meta: "26 bài", progress: 0, color: "#f3ad36" },
];

const lessons = [
  { n: 1, title: "Ảnh số là gì?", done: true },
  { n: 2, title: "Đọc và hiển thị ảnh", done: true },
  { n: 3, title: "Pixel & NumPy array", done: true },
  { n: 4, title: "Không gian màu", active: true },
  { n: 5, title: "Cắt và thay đổi kích thước" },
  { n: 6, title: "Lọc nhiễu cơ bản" },
];

const codeLines = [
  { n: 1, html: '<span class="kw">import</span> cv2' },
  { n: 2, html: '<span class="kw">import</span> numpy <span class="kw">as</span> np' },
  { n: 3, html: "" },
  { n: 4, html: '<span class="kw">def</span> <span class="fn">to_grayscale</span>(image):' },
  { n: 5, html: '    <span class="str">"""Chuyển ảnh BGR sang ảnh xám."""</span>' },
  { n: 6, html: "    <span class=\"cm\"># Viết code của bạn tại đây</span>" },
  { n: 7, html: '    gray = cv2.cvtColor(image, <span class="const">cv2.COLOR_BGR2GRAY</span>)' },
  { n: 8, html: "    <span class=\"kw\">return</span> gray" },
  { n: 9, html: "" },
  { n: 10, html: '<span class="cm"># Không thay đổi phần bên dưới</span>' },
  { n: 11, html: 'image = cv2.imread(<span class="str">"robot_arm.jpg"</span>)' },
  { n: 12, html: "result = to_grayscale(image)" },
];

export default function Home() {
  const [tab, setTab] = useState<"lesson" | "notes">("lesson");
  const [bottomTab, setBottomTab] = useState<"tests" | "output">("tests");
  const [running, setRunning] = useState(false);
  const [passed, setPassed] = useState(false);
  const [focus, setFocus] = useState(false);
  const [streak, setStreak] = useState(7);
  const greeting = useMemo(() => (new Date().getHours() < 12 ? "Chào buổi sáng" : "Tiếp tục nào"), []);

  const runTests = () => {
    setRunning(true);
    setPassed(false);
    window.setTimeout(() => {
      setRunning(false);
      setPassed(true);
      setStreak((value) => Math.max(value, 7));
    }, 900);
  };

  return (
    <main className={`app-shell ${focus ? "focus-mode" : ""}`}>
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark"><span>R</span></div>
          <div>
            <strong>ROBOCODE</strong>
            <small>LEARN · BUILD · MOVE</small>
          </div>
        </div>
        <nav className="main-nav" aria-label="Điều hướng chính">
          <button className="active">Học tập</button>
          <button>Lộ trình</button>
          <button>Playground</button>
          <button>Dự án</button>
        </nav>
        <div className="top-actions">
          <button className="search"><span>⌕</span> Tìm bài học... <kbd>⌘ K</kbd></button>
          <div className="streak" title="Chuỗi ngày học"><span>♨</span><b>{streak}</b></div>
          <button className="notification" aria-label="Thông báo">●</button>
          <div className="avatar">AN</div>
        </div>
      </header>

      <aside className="course-sidebar">
        <div className="welcome">
          <small>{greeting}, An</small>
          <strong>Hôm nay cùng tiến thêm<br />một bước nhé.</strong>
          <div className="weekly">
            <div><span>Tiến độ tuần</span><b>4/5 ngày</b></div>
            <div className="weekly-bars">
              {[1, 1, 1, 1, 0, 0, 0].map((v, i) => <i key={i} className={v ? "filled" : ""} />)}
            </div>
          </div>
        </div>

        <div className="sidebar-label">LỘ TRÌNH CỦA BẠN <button>＋</button></div>
        <div className="track-list">
          {tracks.map((track, index) => (
            <button key={track.name} className={`track ${index === 1 ? "active" : ""}`}>
              <span className="track-icon" style={{ background: `${track.color}18`, color: track.color }}>{track.icon}</span>
              <span className="track-copy"><b>{track.name}</b><small>{track.meta}</small></span>
              {track.progress > 0 && <span className="mini-progress"><i style={{ width: `${track.progress}%`, background: track.color }} /></span>}
              <span className="chevron">›</span>
            </button>
          ))}
        </div>
        <div className="robot-card">
          <div className="robot-face"><i /><i /><span /></div>
          <div><strong>Cần một gợi ý?</strong><small>Hỏi Robo bất cứ lúc nào</small></div>
          <button>↗</button>
        </div>
      </aside>

      <section className="workspace">
        <div className="lesson-header">
          <div className="breadcrumbs"><span>Computer Vision</span><i>›</i><span>Chương 1</span><i>›</i><b>Không gian màu</b></div>
          <div className="lesson-actions">
            <button onClick={() => setFocus(!focus)} className={focus ? "selected" : ""}>⌗ &nbsp;Tập trung</button>
            <button>♡ &nbsp;Lưu bài</button>
            <button>•••</button>
          </div>
        </div>

        <div className="lesson-progress">
          <div>
            <span>CHƯƠNG 01</span>
            <strong>Nền tảng xử lý ảnh</strong>
          </div>
          <div className="stepper">
            {lessons.map((lesson) => (
              <button key={lesson.n} className={lesson.active ? "active" : lesson.done ? "done" : ""} title={lesson.title}>
                {lesson.done ? "✓" : lesson.n}
              </button>
            ))}
          </div>
          <div className="chapter-count"><b>4</b> / 6 bài</div>
        </div>

        <div className="content-grid">
          <article className="theory-panel">
            <div className="panel-tabs">
              <button onClick={() => setTab("lesson")} className={tab === "lesson" ? "active" : ""}>Bài học</button>
              <button onClick={() => setTab("notes")} className={tab === "notes" ? "active" : ""}>Ghi chú <span>2</span></button>
            </div>
            {tab === "lesson" ? (
              <div className="theory-scroll">
                <div className="eyebrow"><span>04</span> · 8 PHÚT</div>
                <h1>Chuyển đổi<br /><em>không gian màu</em></h1>
                <p className="lead">Giúp robot nhìn thế giới theo cách phù hợp với từng nhiệm vụ — không phải lúc nào RGB cũng là lựa chọn tốt nhất.</p>

                <div className="concept-card">
                  <div className="color-cubes">
                    <div className="cube rgb"><span>R</span><span>G</span><span>B</span></div>
                    <b>→</b>
                    <div className="cube gray"><span>GRAY</span></div>
                  </div>
                  <div><small>Ý TƯỞNG CỐT LÕI</small><strong>Màu sắc chỉ là một cách biểu diễn dữ liệu.</strong></div>
                </div>

                <h2>Tại sao robot cần ảnh xám?</h2>
                <p>Camera thường trả về ảnh gồm ba kênh màu <code>B, G, R</code>. Nhưng nhiều thuật toán như phát hiện cạnh hay theo dõi đặc trưng chỉ cần <strong>cường độ sáng</strong>.</p>
                <div className="formula">
                  <span>Y</span><b>=</b><code>0.299R + 0.587G + 0.114B</code>
                </div>
                <div className="tip"><span>✦</span><p><b>Mẹo Robotics</b>Ảnh xám giảm lượng dữ liệu còn ⅓, giúp pipeline chạy nhanh hơn trên máy tính nhúng.</p></div>

                <h2>Nhiệm vụ của bạn</h2>
                <p>Hoàn thiện hàm <code>to_grayscale()</code> để chuyển một ảnh BGR thành ảnh xám bằng OpenCV.</p>
                <div className="requirements">
                  <div><span>01</span><p><b>Đúng kích thước</b>Kết quả chỉ còn 2 chiều: height × width</p></div>
                  <div><span>02</span><p><b>Đúng kiểu dữ liệu</b>Giữ nguyên kiểu <code>uint8</code></p></div>
                </div>
              </div>
            ) : (
              <div className="notes">
                <h2>Ghi chú của bạn</h2>
                <textarea defaultValue={"• BGR là thứ tự mặc định của OpenCV.\n\n• Grayscale phù hợp cho Canny và optical flow."} />
                <small>Tự động lưu trên thiết bị này</small>
              </div>
            )}
          </article>

          <section className="coding-panel">
            <div className="editor-toolbar">
              <div className="file-tab"><span>◆</span> solution.py <i>●</i></div>
              <div className="editor-actions">
                <button title="Đặt lại">↶</button>
                <button title="Cài đặt">⚙</button>
                <button className="run" onClick={runTests} disabled={running}>{running ? "ĐANG CHẠY..." : "▶  CHẠY CODE"} <kbd>⌘ ↵</kbd></button>
              </div>
            </div>
            <div className="editor">
              {codeLines.map((line) => (
                <div className={line.n === 7 ? "current-line" : ""} key={line.n}>
                  <span className="line-no">{line.n}</span>
                  <code dangerouslySetInnerHTML={{ __html: line.html || "&nbsp;" }} />
                </div>
              ))}
              <div className="editor-hint"><span>✦</span><div><b>Gợi ý nhanh</b><p>Hãy dùng <code>cv2.cvtColor()</code> với hằng số chuyển đổi phù hợp.</p></div><button>×</button></div>
            </div>

            <div className="results">
              <div className="result-tabs">
                <button onClick={() => setBottomTab("tests")} className={bottomTab === "tests" ? "active" : ""}>Kiểm thử <span>3</span></button>
                <button onClick={() => setBottomTab("output")} className={bottomTab === "output" ? "active" : ""}>Đầu ra</button>
                <div className="result-status">{running ? <><i className="spinner" /> Đang kiểm tra</> : passed ? <><i className="ok">✓</i> 3/3 đã vượt qua</> : "Chưa chạy"}</div>
              </div>
              {bottomTab === "tests" ? (
                <div className="test-list">
                  {[
                    ["Kích thước đầu ra", "shape == (480, 640)", "12 ms"],
                    ["Kiểu dữ liệu", "dtype == np.uint8", "7 ms"],
                    ["Giá trị pixel", "Kết quả chính xác", "15 ms"],
                  ].map((test, i) => (
                    <div className={passed ? "passed" : ""} key={test[0]}>
                      <span>{passed ? "✓" : i + 1}</span><p><b>{test[0]}</b><code>{test[1]}</code></p><small>{passed ? test[2] : "—"}</small>
                    </div>
                  ))}
                </div>
              ) : (
                <pre className="console">{passed ? "Loaded robot_arm.jpg [480 × 640 × 3]\nConverted to grayscale [480 × 640]\n\nProcess finished with exit code 0" : "$ Nhấn “Chạy code” để xem kết quả..."}</pre>
              )}
              <div className="submit-row">
                <span><kbd>⌘</kbd><kbd>↵</kbd> Chạy nhanh</span>
                <button onClick={runTests}>{passed ? "HOÀN THÀNH BÀI ✓" : "KIỂM TRA BÀI LÀM"} <span>→</span></button>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
