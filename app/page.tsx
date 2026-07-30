"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  BriefcaseBusiness,
  ArrowRight,
  CircleGauge,
  Eye,
  Gamepad2,
  History,
  LayoutDashboard,
  Lightbulb,
  Library,
  Map,
  Sparkles,
  Target,
  Settings,
  Tags,
  UsersRound,
} from "lucide-react";

function LoginScreen({ onLogin }: { onLogin: (username: string) => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, password, remember }),
      });
      const result = await response.json() as { ok: boolean; message?: string; username?: string };
      if (!response.ok) {
        setError(result.message ?? "Không thể đăng nhập.");
        return;
      }
      onLogin(result.username ?? username.trim().toLowerCase());
    } catch {
      setError("Không thể kết nối tới máy chủ.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <div className="login-backdrop" />
      <div className="login-vignette" />
      <div className="robot-motion" aria-hidden="true">
        <i className="energy-ring ring-one" />
        <i className="energy-ring ring-two" />
        <i className="robot-scan" />
        <i className="robot-core" />
      </div>

      <section className="login-story">
        <div className="login-brand">
          <div className="login-logo"><span>R</span></div>
          <strong>Robo<span>Learn</span></strong>
        </div>
        <div className="story-copy">
          <p className="story-kicker"><i /> LEARNING FOR THE NEXT GENERATION</p>
          <h1>Learn.<br />Build.<br /><em>Master Robotics.</em></h1>
          <p>One workspace to learn AI Perception, Control, Simulation and intelligent systems for Humanoid Robots.</p>
        </div>
        <div className="learning-pillars">
          {[
            ["◉", "AI Perception", "Vision · VLM · VLA"],
            ["⌁", "Control & Simulation", "Dynamics · Planning"],
            ["◇", "3D Vision", "Depth · SLAM · ROS 2"],
            ["✦", "Intelligent Robotics", "Build real systems"],
          ].map((item) => (
            <div key={item[1]}><span>{item[0]}</span><b>{item[1]}</b><small>{item[2]}</small></div>
          ))}
        </div>
        <p className="story-foot"><i /> Empowering the next generation<br />of robotics innovators.</p>
      </section>

      <section className="login-zone">
        <form className="login-card" onSubmit={submit}>
          <div className="login-card-head">
            <span className="secure-chip">● PRIVATE WORKSPACE</span>
            <h2>Welcome back<span>.</span></h2>
            <p>Sign in to continue your robotics learning journey.</p>
          </div>

          <label className="login-field">
            <span>Username</span>
            <div><i className="user-icon" aria-hidden="true" /><input value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Nhập tên đăng nhập" autoComplete="username" aria-label="Username" /></div>
          </label>
          <label className="login-field">
            <span>Password</span>
            <div><i className="lock-icon" aria-hidden="true" /><input type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Nhập mật khẩu" autoComplete="current-password" aria-label="Password" /><button className={`password-eye ${showPassword ? "visible" : ""}`} type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}><span aria-hidden="true" /></button></div>
          </label>

          <div className="login-options">
            <label><button type="button" className={remember ? "checked" : ""} onClick={() => setRemember(!remember)}>{remember ? "✓" : ""}</button> Remember me</label>
            <span>Account managed by owner</span>
          </div>

          {error && <div className="login-error" role="alert">! &nbsp;{error}</div>}
          <button className="sign-in" type="submit" disabled={loading || !username || !password}><span>→</span> {loading ? "Checking..." : "Sign In"} <i>ENTER ↵</i></button>
          <div className="secure-line"><span /><p><b>♢</b> Secure & Private</p><span /></div>

          <div className="login-benefits">
            <div><span>♙</span><p><b>Hands-on Projects</b><small>Real robotics challenges</small></p></div>
            <div><span>♢</span><p><b>Instant Feedback</b><small>Test, evaluate, improve</small></p></div>
            <div><span>▥</span><p><b>Track Progress</b><small>Own your learning path</small></p></div>
          </div>
          <p className="demo-note">Private access · Accounts are issued by the owner only</p>
        </form>
      </section>
      <footer className="login-quote">“The best way to predict the future is to invent it.” <span>— Alan Kay</span></footer>
    </main>
  );
}

const dashboardNav = [
  ["⌂", "Dashboard"],
  ["▣", "Learning"],
  ["⌘", "Roadmap"],
  ["▤", "Projects"],
  ["♧", "Collaboration"],
  ["▧", "Knowledge Vault"],
  ["♢", "Project Tracker"],
  ["⚙", "Settings"],
] as const;

function LegacyRoboDashboard({ username, onLogout }: { username: string; onLogout: () => void }) {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const displayName = username === "phanthethong" ? "Thế Thông" : "Ben Hiệp";
  const firstName = displayName.split(" ").at(-1);
  const heatCells = Array.from({ length: 84 }, (_, index) => (index * 7 + Math.floor(index / 6) * 3) % 5);
  const projects = [
    ["P13 Multi-Camera Fusion", "45%", "robot"],
    ["P14 RGB-D Perception", "30%", "cloud"],
    ["P15 3D Scene Understanding", "15%", "scene"],
    ["P16 Stereo Depth Estimation", "60%", "depth"],
  ];

  return (
    <main className="robo-dashboard">
      <aside className="dash-sidebar">
        <div className="dash-brand"><div className="dash-r">R</div><div><b>RoboLearn</b><small>Learn · Build · Innovate</small></div></div>
        <nav className="dash-nav">
          {dashboardNav.map(([icon, label]) => (
            <button key={label} className={activeNav === label ? "active" : ""} onClick={() => setActiveNav(label)}>
              <span>{icon}</span>{label}
            </button>
          ))}
        </nav>
        <div className="dash-profile">
          <div className="profile-avatar">{displayName.split(" ").map((part) => part[0]).join("")}</div>
          <div><b>{displayName}</b><small>Level 8 · 2,450 XP</small></div>
          <em>PRO</em>
        </div>
        <div className="theme-switch"><span>Theme</span><div><button className="active">☀</button><button>◐</button><button>☾</button></div></div>
        <button className="dash-logout" onClick={onLogout}>↪ Đăng xuất</button>
      </aside>

      <section className="dash-main">
        <header className="dash-header">
          <div><h1>Chào lại, {displayName}! <span>👋</span></h1><p>Hôm nay là một ngày tuyệt vời để học và xây dựng robot!</p></div>
          <div className="header-metrics">
            <button className="track-select"><span>◇</span><small>Current Track</small><b>AI Perception</b><i>⌄</i></button>
            <div className="metric"><b>🔥 18 Days</b><small>Current Streak</small><i>Best: 32 Days</i></div>
            <div className="metric xp"><b>2,450 XP</b><small>Top 23% · +120 XP hôm nay</small><i>▥</i></div>
          </div>
        </header>

        <div className="dash-content">
          <div className="dash-center">
            {activeNav !== "Dashboard" && (
              <div className="section-placeholder"><span>{dashboardNav.find((item) => item[1] === activeNav)?.[0]}</span><h2>{activeNav}</h2><p>Khu vực này đã được cố định trong hệ thống và sẽ được xây dựng ở bước tiếp theo.</p><button onClick={() => setActiveNav("Dashboard")}>← Về Dashboard</button></div>
            )}
            {activeNav === "Dashboard" && <>
              <section className="continue-card">
                <h2>Tiếp tục học</h2>
                <div className="continue-body">
                  <div className="course-thumb" />
                  <div className="course-info"><span>AI Perception</span><h3>P12 Pose Estimation Toolkit</h3><p>Task 3.2 · <b>EPnP Solver</b></p><small>Tiếp tục từ: 3.2 SolvePnP với RANSAC</small><div className="course-progress"><i /><b>65%</b></div><button>▷ &nbsp; Tiếp tục học</button><em>◷ 18 phút ước tính</em></div>
                  <div className="pose-visual"><i /><i /><i /></div>
                </div>
              </section>

              <section className="stat-grid">
                {[
                  ["▣","Tổng bài học","128","↑ 12 so với tuần trước","purple"],
                  ["▤","Bài học hoàn thành","86","↑ 8 so với tuần trước","blue"],
                  ["◇","Project đang làm","4","— không đổi","green"],
                  ["◉","Project hoàn thành","7","↑ 1 so với tuần trước","orange"],
                  ["◷","Thời gian học","56h 30m","↑ 6h so với tuần trước","violet"],
                ].map((item) => <div className={`stat-card ${item[4]}`} key={item[1]}><span>{item[0]}</span><p><small>{item[1]}</small><b>{item[2]}</b><em>{item[3]}</em></p></div>)}
              </section>

              <div className="analytics-grid">
                <section className="dash-card progress-card"><h2>Tiến độ học tập</h2><div className="donut"><b>72%</b><small>Hoàn thành</small></div><ul><li><i className="purple"/>Hoàn thành <b>72%</b></li><li><i className="blue"/>Đang học <b>18%</b></li><li><i className="gray"/>Chưa bắt đầu <b>10%</b></li></ul><button>Xem chi tiết →</button></section>
                <section className="dash-card heatmap-card"><h2>Lịch sử học tập <span>(Heatmap)</span></h2><div className="heat-labels"><span>T2</span><span>T4</span><span>T6</span><span>CN</span></div><div className="heatmap">{heatCells.map((level,index)=><i key={index} className={`l${level}`}/>)}</div><div className="heat-legend">Ít <i/><i className="l2"/><i className="l3"/><i className="l4"/> Nhiều</div></section>
              </div>

              <section className="dash-card recent-projects"><h2>Project gần đây</h2><div className="project-row">{projects.map((project)=><article key={project[0]}><div className={`project-image ${project[2]}`}/><b>{project[0]}</b><div><i style={{width:project[1]}}/><span>{project[1]}</span></div></article>)}<button className="new-project"><span>＋</span>Tạo project mới</button></div></section>
              <section className="quick-row"><h2>Quick Access</h2><div>{[["▶","Resume Learning"],["⌘","Open Workspace"],["▱","Open Project"],["◇","Simulation Lab"],["▣","Knowledge Vault"]].map((item)=><button key={item[1]}><span>{item[0]}</span>{item[1]}</button>)}</div></section>
              <div className="robot-tip"><span>☼</span><p><b>Robotics Tip hôm nay</b>Epipolar Geometry giúp giảm không gian tìm kiếm tương ứng trong bài toán Stereo Matching.</p><button>Đọc thêm →</button></div>
            </>}
          </div>

          <aside className="dash-right">
            <section className="dash-card calendar"><header><h2>Lịch học</h2><b>Tháng 7, 2025</b><span>‹ &nbsp;&nbsp;&nbsp; ›</span></header><div className="week">{["T2","T3","T4","T5","T6","T7","CN"].map(d=><b key={d}>{d}</b>)}</div><div className="days">{Array.from({length:35},(_,i)=>{const day=i-1;return <span key={i} className={day===30?"selected":[8,18,25].includes(day)?"marked":day<1||day>31?"muted":""}>{day<1?30:day>31?day-31:day}</span>})}</div></section>
            <section className="dash-card today"><h2>Hôm nay <span>3 / 5 đã hoàn thành</span></h2>{[["✓","Ôn lại bài 3.2 SolvePnP","done"],["✓","Hoàn thành P13 - Task 2","done"],["✓","Đọc tài liệu Epipolar Geometry","purple"],["○","Review code P12",""],["○","Làm bài tập Stereo Matching",""]].map((t,i)=><div key={i} className={t[2]}><span>{t[0]}</span><p>{t[1]}</p><em>{i===1?"Projects":"AI Perception"}</em></div>)}</section>
            <section className="dash-card ai-coach"><h2>AI Coach</h2><div className="coach-bot"><i/><i/><span/></div><p>Bạn đã dừng học<br/><b>PnP Solver 2 ngày trước.</b><br/>Tiếp tục ngay để duy trì mạch học nhé! 💪</p><button>Tiếp tục học →</button></section>
            <section className="dash-card sim-status"><h2>Simulation Status <button>Xem chi tiết →</button></h2>{[["🛰","Isaac Sim","Ready"],["◈","Gazebo","Installed"],["⠿","ROS2","Running (2 nodes)"],["◉","RViz","Connected"]].map(x=><div key={x[1]}><span>{x[0]}</span><b>{x[1]}</b><i/> <small>{x[2]}</small><button>Mở</button></div>)}</section>
            <section className="dash-card activity"><h2>Hoạt động gần đây</h2>{[["✓","Đã hoàn thành: Distortion Model","+15 XP"],["▶","Đã xem video: Rectification Explained","+10 XP"],["⌘","Code: Calibration Checker","+20 XP"],["★","Hoàn thành bài quiz: Epipolar Constraint","+20 XP"]].map((a,i)=><div key={i}><span>{a[0]}</span><p>{a[1]}<small>{i+2} giờ trước</small></p><b>{a[2]}</b></div>)}</section>
          </aside>
        </div>
      </section>
    </main>
  );
}

type DashboardTheme = "light" | "system" | "dark";

const premiumDashboardNav = [
  { label: "Dashboard", Icon: LayoutDashboard },
  { label: "Learning", Icon: BookOpen },
  { label: "Roadmap", Icon: Map },
  { label: "Projects", Icon: BriefcaseBusiness },
  { label: "Collaboration", Icon: UsersRound },
  { label: "Knowledge Vault", Icon: Library },
  { label: "Project Tracker", Icon: Tags },
  { label: "Settings", Icon: Settings },
] as const;

const perceptionRoadmap = [
  { phase: "Phase 1 · Foundations", caption: "Toán, lập trình và thị giác máy tính nền tảng", stages: [
    ["Programming & Math", "Python, C++, Linux, Linear Algebra"],
    ["Image Processing", "OpenCV, filtering, features, geometry"],
    ["Camera Geometry", "Calibration, projection, distortion"],
    ["Stereo & RGB-D", "Depth, disparity, reconstruction"],
    ["3D Representation", "Point clouds, meshes, coordinate frames"],
  ]},
  { phase: "Phase 2 · Robot Perception", caption: "Hiểu con người, vật thể và không gian 3D", stages: [
    ["Detection & Segmentation", "Objects, instances, semantic scenes"],
    ["Pose & Human Understanding", "6D pose, keypoints, body and hands"],
    ["Multi-Camera Fusion", "Temporal alignment, tracking, sensor fusion"],
    ["SLAM & Localization", "Visual odometry, mapping, loop closure"],
    ["Deep Vision Models", "CNN, Transformer, self-supervised learning"],
  ]},
  { phase: "Phase 3 · VLM → VLA", caption: "Từ nhìn–hiểu ngôn ngữ đến hành động robot", stages: [
    ["Vision Transformers", "ViT, encoders, visual tokens"],
    ["VLM Foundations", "Contrastive learning, grounding, captioning"],
    ["Embodied Reasoning", "Spatial reasoning, memory, affordances"],
    ["VLA & Policy Learning", "Action tokens, imitation, diffusion policy"],
    ["Humanoid Integration", "Real-time pipeline, safety, deployment"],
  ]},
];

const controlRoadmap = [
  { phase: "Phase 1 · Fundamentals", caption: "Cơ học và nền tảng điều khiển robot", stages: [
    ["Robotics Math", "Frames, transforms, Lie groups"],
    ["Robot Kinematics", "FK, IK, Jacobian"],
    ["Robot Dynamics", "Rigid body, inertia, contacts"],
    ["Motion Planning", "Search, sampling, trajectories"],
    ["State Estimation", "Kalman filters, sensor fusion"],
  ]},
  { phase: "Phase 2 · Control & Simulation", caption: "Mô phỏng, điều khiển và chuyển động toàn thân", stages: [
    ["ROS 2 Foundations", "Nodes, topics, TF, lifecycle"],
    ["Simulation Stack", "MuJoCo, Gazebo, Isaac Sim, URDF"],
    ["Optimal Control", "PID, LQR, MPC"],
    ["Whole-Body Control", "QP, constraints, balance"],
    ["Locomotion & Manipulation", "Gait, grasping, contacts"],
  ]},
  { phase: "Phase 3 · Deployment", caption: "Đưa thuật toán từ mô phỏng lên humanoid thật", stages: [
    ["Reinforcement Learning", "Simulation RL, reward design"],
    ["Sim-to-Real", "MuJoCo training, randomization, adaptation"],
    ["Hardware Interfaces", "Sensors, actuators, real-time control"],
    ["System Integration", "Perception-control synchronization"],
    ["Safety & Evaluation", "Testing, fallback, benchmarks"],
  ]},
];

const perceptionLearningModules = [
  ["Computer Vision Foundations", "Images, pixels, filtering, features and OpenCV"],
  ["Camera Geometry", "Projection, calibration, distortion and coordinate frames"],
  ["Stereo & RGB-D Vision", "Disparity, depth and 3D reconstruction"],
  ["3D Perception", "Point clouds, registration and scene understanding"],
  ["Detection, Pose & Tracking", "Objects, humans, 6D pose and temporal tracking"],
  ["Deep Learning for Vision", "CNN, Transformer and self-supervised learning"],
  ["VLM & Embodied Reasoning", "Grounding, visual language and spatial reasoning"],
  ["VLA & Humanoid Integration", "Action policies, imitation and real-time deployment"],
];

const controlLearningModules = [
  ["Robotics Math", "Linear algebra, transforms, Lie groups and numerical methods"],
  ["Robot Kinematics", "Forward/inverse kinematics and Jacobians"],
  ["Robot Dynamics", "Rigid body dynamics, contacts and constraints"],
  ["Planning & State Estimation", "Trajectories, search, Kalman filters and fusion"],
  ["Classical & Optimal Control", "PID, state space, LQR and MPC"],
  ["Whole-Body Motion", "Balance, locomotion and manipulation"],
  ["ROS 2 & Simulation", "ROS 2, MuJoCo, Gazebo, Isaac Sim and URDF"],
  ["RL, Sim-to-Real & Deployment", "Policy learning, adaptation, safety and hardware"],
];

function LearningWorkspace({ onOpenRoadmap }: { onOpenRoadmap: (track: "perception" | "control") => void }) {
  const [track, setTrack] = useState<"perception" | "control">("perception");
  const isPerception = track === "perception";
  const modules = isPerception ? perceptionLearningModules : controlLearningModules;
  const TrackIcon = isPerception ? Eye : Gamepad2;

  return (
    <section className={`learning-workspace learning-${track}`}>
      <header className="learning-header">
        <div><span>LEARNING SPACE</span><h1>Learning <i>›</i> <em>{isPerception ? "AI Perception" : "Control & Simulation"}</em></h1><p>{isPerception ? "Học cách để Humanoid nhìn, hiểu và hành động trong thế giới thực." : "Học mô phỏng, lập kế hoạch và điều khiển chuyển động Humanoid."}</p></div>
        <div className="learning-tabs" role="tablist"><button className={isPerception ? "active" : ""} onClick={() => setTrack("perception")}><Eye size={18}/>AI Perception</button><button className={!isPerception ? "active" : ""} onClick={() => setTrack("control")}><Gamepad2 size={18}/>Control & Simulation</button></div>
      </header>

      <div className="learning-layout">
        <div className="learning-primary">
          <section className="learning-overview">
            <div className="learning-zero-ring"><b>0%</b><span>Chưa bắt đầu</span></div>
            <div className="learning-overview-copy"><span>{isPerception ? "AI PERCEPTION PROGRESS" : "CONTROL & SIMULATION PROGRESS"}</span><h2>Tiến độ học tập</h2><p>Tiến độ sẽ được tính sau khi các bài học đầu tiên được xuất bản.</p><div className="learning-overview-stats"><div><b>0</b><span>Hoàn thành</span></div><div><b>0</b><span>Đang học</span></div><div><b>0 XP</b><span>Đã nhận</span></div></div></div>
          </section>

          <section className="learning-modules">
            <header><div><h2>Các Module</h2><span>{modules.length} modules</span></div><p>Curriculum dự kiến · chưa có bài học được xuất bản</p></header>
            <div className="learning-module-list">
              {modules.map((module, index) => (
                <article key={module[0]}>
                  <div className="module-icon"><TrackIcon size={20}/></div>
                  <div><span>MODULE {String(index + 1).padStart(2, "0")}</span><h3>{module[0]}</h3><p>{module[1]}</p></div>
                  <div className="module-data"><b>0 bài</b><span>Chưa xuất bản</span></div>
                  <div className="module-xp"><b>— XP</b><span>Chưa gán</span></div>
                  <button aria-label={`Mở module ${module[0]}`} disabled><ArrowRight size={17}/></button>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="learning-side">
          <section className="learning-side-card track-about"><header><TrackIcon size={18}/><h3>Giới thiệu lộ trình</h3></header><p>{isPerception ? "Từ thị giác máy tính, không gian 3D và deep learning đến VLM, VLA cho Humanoid." : "Từ cơ học robot và control đến MuJoCo, whole-body motion và triển khai phần cứng."}</p><button onClick={() => onOpenRoadmap(track)}>Xem Roadmap chi tiết <ArrowRight size={15}/></button></section>
          <section className="learning-side-card quick-learning"><header><CircleGauge size={18}/><h3>Thống kê nhanh</h3></header><dl><div><dt>Tổng bài học</dt><dd>0</dd></div><div><dt>Thời gian học</dt><dd>0 phút</dd></div><div><dt>XP hiện tại</dt><dd>0 XP</dd></div><div><dt>Module khả dụng</dt><dd>0 / {modules.length}</dd></div></dl></section>
          <section className="learning-side-card"><header><Lightbulb size={18}/><h3>Gợi ý tiếp theo</h3></header><div className="learning-suggestion"><span>1</span><p><b>{modules[0][0]}</b><small>{modules[0][1]}</small></p></div><button className="disabled-action" disabled>Đang chờ bài học</button></section>
          <section className="learning-side-card"><header><History size={18}/><h3>Hoạt động gần đây</h3></header><div className="learning-empty-activity"><span>○</span><p><b>Chưa có hoạt động</b><small>Hoạt động học và XP sẽ được ghi nhận tại đây.</small></p></div></section>
        </aside>
      </div>
    </section>
  );
}

function RoadmapWorkspace({ initialTrack = "perception" }: { initialTrack?: "perception" | "control" }) {
  const [track, setTrack] = useState<"perception" | "control">(initialTrack);
  const isPerception = track === "perception";
  const phases = isPerception ? perceptionRoadmap : controlRoadmap;
  const TrackIcon = isPerception ? Eye : Gamepad2;

  return (
    <section className={`roadmap-workspace roadmap-${track}`}>
      <header className="roadmap-header">
        <div><span>ROBOLEARN CURRICULUM</span><h1>Roadmap</h1><p>Lộ trình kiến thức từ nền tảng đến hệ thống Humanoid hoàn chỉnh.</p></div>
        <div className="roadmap-summary"><b>0%</b><span>Chưa bắt đầu</span><small>0 / 15 giai đoạn</small></div>
      </header>

      <div className="roadmap-tabs" role="tablist" aria-label="Chọn hướng học">
        <button role="tab" aria-selected={isPerception} className={isPerception ? "active" : ""} onClick={() => setTrack("perception")}><Eye size={19}/> AI Perception → VLM/VLA</button>
        <button role="tab" aria-selected={!isPerception} className={!isPerception ? "active" : ""} onClick={() => setTrack("control")}><Gamepad2 size={19}/> Control & Simulation</button>
      </div>

      <div className="roadmap-body">
        <div className="roadmap-primary">
          <div className="roadmap-intro">
            <div className="roadmap-orb"><TrackIcon size={26}/></div>
            <div><span>{isPerception ? "AI PERCEPTION TRACK" : "CONTROL & SIMULATION TRACK"}</span><h2>{isPerception ? "Humanoid AI Perception → VLM → VLA" : "Humanoid Control, Simulation & Deployment"}</h2><p>{isPerception ? "Xây dựng năng lực để humanoid nhìn, hiểu ngôn ngữ, suy luận về thế giới và chuyển ý định thành hành động." : "Xây dựng nền tảng để mô phỏng, lập kế hoạch, điều khiển chuyển động và triển khai humanoid an toàn."}</p></div>
            <Sparkles size={22}/>
          </div>

          <div className="roadmap-phases">
            {phases.map((phase, phaseIndex) => (
              <section className="roadmap-phase" key={phase.phase}>
                <header><div><span>0{phaseIndex + 1}</span><h2>{phase.phase}</h2></div><p>{phase.caption}</p></header>
                <div className="roadmap-stage-row">
                  {phase.stages.map((stage, stageIndex) => {
                    const number = phaseIndex * 5 + stageIndex + 1;
                    return (
                      <article className="roadmap-stage" key={stage[0]}>
                        <div className="stage-top"><span>{number}</span><small>PLANNED</small></div>
                        <h3>{stage[0]}</h3>
                        <p>{stage[1]}</p>
                        <footer><i><b style={{ width: "0%" }} /></i><span>0%</span></footer>
                        {stageIndex < phase.stages.length - 1 && <ArrowRight className="stage-arrow" size={17} aria-hidden="true"/>}
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          <footer className="roadmap-bottom">
            <div className="roadmap-orb"><TrackIcon size={25}/></div>
            <div><h2>Đầu ra của lộ trình</h2><p>{isPerception ? "Có thể xây pipeline perception đa camera, hiểu cảnh 3D, tích hợp VLM và huấn luyện VLA cho humanoid." : "Có thể mô phỏng, lập kế hoạch, điều khiển toàn thân và triển khai hệ thống trên humanoid thật."}</p></div>
            <div className="roadmap-pill"><b>15</b><span>giai đoạn</span></div>
          </footer>
        </div>

        <aside className="roadmap-side">
          <section className="roadmap-side-card progress-overview">
            <header><CircleGauge size={18}/><h3>Tiến độ tổng thể</h3></header>
            <div className="roadmap-ring"><b>0%</b></div>
            <p><span>Đã hoàn thành</span><b>0 / 15 giai đoạn</b></p>
            <small>Tiến độ sẽ tự cập nhật từ các bài học thật.</small>
          </section>

          <section className="roadmap-side-card">
            <header><History size={18}/><h3>Hoạt động gần đây</h3></header>
            <div className="roadmap-side-empty"><span>○</span><p><b>Chưa có hoạt động</b><small>Lịch sử học Roadmap sẽ xuất hiện tại đây.</small></p></div>
          </section>

          <section className="roadmap-side-card next-stage">
            <header><Lightbulb size={18}/><h3>Gợi ý tiếp theo</h3></header>
            <div className="next-stage-number">1</div>
            <div><b>{phases[0].stages[0][0]}</b><small>{phases[0].stages[0][1]}</small></div>
            <i><b style={{ width: "0%" }}/></i><span>0%</span>
            <button>Khám phá giai đoạn <ArrowRight size={15}/></button>
          </section>

          <section className="roadmap-side-card track-snapshot">
            <header><Target size={18}/><h3>Tổng quan track</h3></header>
            <div><b>3</b><span>Phase</span></div><div><b>15</b><span>Giai đoạn</span></div><div><b>0</b><span>Đã học</span></div>
          </section>

          <section className="roadmap-side-card competency-card">
            <header><TrackIcon size={18}/><h3>Mục tiêu năng lực</h3></header>
            <p>{isPerception ? "Perception 3D · VLM · Embodied reasoning · VLA" : "Dynamics · MuJoCo · Whole-body control · Sim-to-real"}</p>
          </section>
        </aside>
      </div>
    </section>
  );
}

function RoboDashboard({ username, onLogout }: { username: string; onLogout: () => void }) {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [roadmapTrack, setRoadmapTrack] = useState<"perception" | "control">("perception");
  const [profileOpen, setProfileOpen] = useState(false);
  const [theme, setTheme] = useState<DashboardTheme>("system");
  const [monthCursor, setMonthCursor] = useState(() => new Date());
  const [clockHour, setClockHour] = useState(() => new Date().getHours());
  const displayName = username === "phanthethong" ? "Thế Thông" : "Ben Hiệp";
  const initials = displayName.split(" ").map((part) => part[0]).join("");
  const totalXp = 0;
  const xpToday = 0;
  const currentStreak = 0;
  const bestStreak = 0;
  const level = Math.floor(Math.sqrt(totalXp / 100)) + 1;
  const currentLevelFloor = 100 * Math.pow(level - 1, 2);
  const nextLevelXp = 100 * Math.pow(level, 2);
  const levelProgress = Math.round(((totalXp - currentLevelFloor) / (nextLevelXp - currentLevelFloor)) * 100);

  useEffect(() => {
    const saved = window.localStorage.getItem("robolearn-theme") as DashboardTheme | null;
    if (saved === "light" || saved === "dark" || saved === "system") setTheme(saved);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("robolearn-theme", theme);
  }, [theme]);

  useEffect(() => {
    const timer = window.setInterval(() => setClockHour(new Date().getHours()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const resolvedTheme = theme === "system"
    ? (clockHour >= 6 && clockHour < 18 ? "light" : "dark")
    : theme;

  const calendar = useMemo(() => {
    const year = monthCursor.getFullYear();
    const month = monthCursor.getMonth();
    const firstMondayIndex = (new Date(year, month, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const previousMonthDays = new Date(year, month, 0).getDate();
    return Array.from({ length: 42 }, (_, index) => {
      const relativeDay = index - firstMondayIndex + 1;
      if (relativeDay < 1) return { day: previousMonthDays + relativeDay, muted: true, date: new Date(year, month - 1, previousMonthDays + relativeDay) };
      if (relativeDay > daysInMonth) return { day: relativeDay - daysInMonth, muted: true, date: new Date(year, month + 1, relativeDay - daysInMonth) };
      return { day: relativeDay, muted: false, date: new Date(year, month, relativeDay) };
    });
  }, [monthCursor]);

  const today = new Date();
  const isToday = (date: Date) =>
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate();

  const emptyState = (title: string, description: string) => (
    <div className="real-empty-page">
      <div className="empty-orbit">◇</div>
      <h2>{title}</h2>
      <p>{description}</p>
      <span>Chưa có dữ liệu</span>
    </div>
  );

  return (
    <main className={`robo-dashboard real-dashboard theme-${resolvedTheme}`}>
      <aside className="dash-sidebar">
        <div className="dash-brand"><div className="dash-r">R</div><div><b>RoboLearn</b><small>Learn · Build · Innovate</small></div></div>
        <nav className="dash-nav" aria-label="Điều hướng chính">
          {premiumDashboardNav.map(({ Icon, label }) => (
            <button key={label} className={activeNav === label ? "active" : ""} onClick={() => setActiveNav(label)}>
              <span><Icon size={20} strokeWidth={1.8} aria-hidden="true" /></span>{label}
            </button>
          ))}
        </nav>

        <div className="account-area">
          <button className="dash-profile profile-trigger" onClick={() => setProfileOpen((open) => !open)} aria-expanded={profileOpen}>
            <div className="profile-avatar">{initials}</div>
            <div><b>{displayName}</b><small>Level {level} · {totalXp.toLocaleString("vi-VN")} XP</small></div>
            <em>{profileOpen ? "⌃" : "⌄"}</em>
          </button>
          {profileOpen && (
            <div className="profile-menu">
              <button onClick={onLogout}><span>↪</span> Đăng xuất</button>
            </div>
          )}
        </div>

        <div className="theme-switch">
          <span>Giao diện</span>
          <div>
            <button className={theme === "light" ? "active" : ""} onClick={() => setTheme("light")} title="Sáng">☀</button>
            <button className={theme === "system" ? "active" : ""} onClick={() => setTheme("system")} title="Tự động theo thời gian thực">◐</button>
            <button className={theme === "dark" ? "active" : ""} onClick={() => setTheme("dark")} title="Tối">☾</button>
          </div>
        </div>
      </aside>

      <section className={`dash-main ${activeNav !== "Dashboard" ? "module-view" : ""}`}>
        {activeNav === "Dashboard" && (
          <header className="dash-header">
            <div><h1>Welcome, {displayName}! <span>👋</span></h1><p>Không gian học Robotics cá nhân của bạn.</p></div>
            <div className="header-scoreboard">
              <div className="score-card streak-score">
                <span>🔥</span><p><b>{currentStreak} Days</b><small>Current Streak</small></p>
                <i>Best: {bestStreak} Days</i>
              </div>
              <div className="score-card xp-score">
                <p><b>{totalXp.toLocaleString("vi-VN")} XP</b><small>Level {level} · {levelProgress}% đến Level {level + 1}</small></p>
                <div><b>Chưa xếp hạng</b><small>+{xpToday} XP hôm nay</small></div>
                <span className="score-bars"><i/><i/><i/><i/></span>
              </div>
            </div>
          </header>
        )}

        {activeNav === "Learning" ? (
          <LearningWorkspace onOpenRoadmap={(track) => { setRoadmapTrack(track); setActiveNav("Roadmap"); }} />
        ) : activeNav === "Roadmap" ? (
          <RoadmapWorkspace initialTrack={roadmapTrack} />
        ) : activeNav !== "Dashboard" ? (
          <div className="standalone-empty">
            {emptyState(
              activeNav,
              activeNav === "Learning"
                ? "Chưa có giáo trình được xuất bản. Khi bài học đầu tiên được tạo, nội dung sẽ xuất hiện tại đây."
                : `Khu vực ${activeNav} chưa có dữ liệu hoặc chức năng được cấu hình.`
            )}
          </div>
        ) : (
          <div className="dash-content real-content">
            <div className="dash-center">
              <section className="continue-card honest-empty">
                <div className="empty-icon">▷</div>
                <div><span>TIẾP TỤC HỌC</span><h2>Chưa có bài học đang học</h2><p>Bài học gần nhất sẽ xuất hiện ở đây sau khi bạn bắt đầu nội dung đầu tiên trong Learning.</p></div>
                <button onClick={() => setActiveNav("Learning")}>Mở Learning →</button>
                <div className="continue-vision-art" aria-hidden="true" />
              </section>

              <section className="stat-grid honest-stats">
                {[
                  ["▣", "Tổng bài học", "0", "Chưa có giáo trình", "purple"],
                  ["✓", "Bài đã hoàn thành", "0", "Chưa phát sinh", "blue"],
                  ["◇", "Project đang làm", "0", "Chưa có project", "green"],
                  ["◎", "Project hoàn thành", "0", "Chưa phát sinh", "orange"],
                  ["◷", "Thời gian học", "0 phút", "Chưa ghi nhận", "violet"],
                ].map((item) => <div className={`stat-card ${item[4]}`} key={item[1]}><span>{item[0]}</span><p><small>{item[1]}</small><b>{item[2]}</b><em>{item[3]}</em></p></div>)}
              </section>

              <div className="analytics-grid fixed-analytics">
                <section className="dash-card progress-card empty-progress">
                  <h2>Tiến độ học tập</h2>
                  <div className="zero-donut"><b>0%</b><small>Chưa bắt đầu</small></div>
                  <p>Tiến độ sẽ được tính từ số bài hoàn thành trên tổng số bài đã xuất bản.</p>
                </section>
                <section className="dash-card heatmap-card empty-heatmap">
                  <div className="heatmap-month-head">
                    <div><h2>Lịch sử học tập <span>(Heatmap)</span></h2><b>{new Intl.DateTimeFormat("vi-VN", { month: "long", year: "numeric" }).format(monthCursor)}</b></div>
                    <div><button onClick={() => setMonthCursor(new Date(monthCursor.getFullYear(), monthCursor.getMonth() - 1, 1))} aria-label="Xem tháng trước">‹</button><button onClick={() => setMonthCursor(new Date())}>Tháng này</button><button onClick={() => setMonthCursor(new Date(monthCursor.getFullYear(), monthCursor.getMonth() + 1, 1))} aria-label="Xem tháng sau">›</button></div>
                  </div>
                  <div className="heatmap-weekdays">{["T2","T3","T4","T5","T6","T7","CN"].map((day) => <b key={day}>{day}</b>)}</div>
                  <div className="heatmap-month-grid">{calendar.map((cell, index) => <i key={index} className={`${cell.muted ? "outside" : "level-0"} ${isToday(cell.date) ? "today-cell" : ""}`} title={`${new Intl.DateTimeFormat("vi-VN", { dateStyle: "full" }).format(cell.date)} · 0 phút học`}>{!cell.muted && <span>{cell.day}</span>}</i>)}</div>
                  <div className="heatmap-footer"><p>Chưa có phiên học nào được ghi nhận.</p><div className="heatmap-scale"><span>Không học</span><i className="level-0"/><i className="level-1"/><i className="level-2"/><i className="level-3"/><i className="level-4"/><span>Chuyên sâu</span></div></div>
                </section>
              </div>

              <section className="dash-card honest-projects">
                <header><div><h2>Project gần đây</h2><p>Project bạn tạo hoặc mở gần đây sẽ hiển thị tại đây.</p></div><button onClick={() => setActiveNav("Projects")}>Mở Projects →</button></header>
                <div className="empty-project-row"><span>＋</span><b>Chưa có project</b><small>Bắt đầu từ mục Projects khi bạn sẵn sàng.</small></div>
              </section>

              <section className="quick-row real-quick"><h2>Truy cập nhanh</h2><div>
                {[["▣","Learning"],["◇","Projects"],["▧","Knowledge Vault"],["⌘","Roadmap"]].map((item) =>
                  <button key={item[1]} onClick={() => setActiveNav(item[1])}><span>{item[0]}</span>{item[1]}</button>
                )}
              </div></section>
            </div>

            <aside className="dash-right">
              <section className="dash-card calendar real-calendar">
                <header>
                  <h2>Lịch</h2>
                  <b>{new Intl.DateTimeFormat("vi-VN", { month: "long", year: "numeric" }).format(monthCursor)}</b>
                  <div><button onClick={() => setMonthCursor(new Date(monthCursor.getFullYear(), monthCursor.getMonth() - 1, 1))} aria-label="Tháng trước">‹</button><button onClick={() => setMonthCursor(new Date())}>Hôm nay</button><button onClick={() => setMonthCursor(new Date(monthCursor.getFullYear(), monthCursor.getMonth() + 1, 1))} aria-label="Tháng sau">›</button></div>
                </header>
                <div className="week">{["T2","T3","T4","T5","T6","T7","CN"].map((day) => <b key={day}>{day}</b>)}</div>
                <div className="days">{calendar.map((cell, index) => <span key={index} className={`${cell.muted ? "muted" : ""} ${isToday(cell.date) ? "selected" : ""}`}>{cell.day}</span>)}</div>
                <footer>Ngày hiện tại: {new Intl.DateTimeFormat("vi-VN", { dateStyle: "long" }).format(today)}</footer>
              </section>

              <section className="dash-card honest-side-card"><h2>Lịch học hôm nay</h2><div className="side-empty"><span>○</span><p><b>Chưa có lịch học</b><small>Lịch học sẽ lấy từ các bài và deadline thật trong hệ thống.</small></p></div></section>
              <section className="dash-card honest-side-card"><h2>Hoạt động gần đây</h2><div className="side-empty"><span>⌁</span><p><b>Chưa có hoạt động</b><small>Các lần học, chạy code và hoàn thành project sẽ được ghi lại tại đây.</small></p></div></section>
              <section className="dash-card honest-side-card"><h2>Simulation</h2><div className="side-empty"><span>◇</span><p><b>Chưa kết nối</b><small>ROS 2, Gazebo hoặc Isaac Sim chưa được kết nối với website.</small></p></div></section>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}

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
  const [authenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState("levonghiahiep");
  const [checkingSession, setCheckingSession] = useState(true);
  const [tab, setTab] = useState<"lesson" | "notes">("lesson");
  const [bottomTab, setBottomTab] = useState<"tests" | "output">("tests");
  const [running, setRunning] = useState(false);
  const [passed, setPassed] = useState(false);
  const [focus, setFocus] = useState(false);
  const [streak, setStreak] = useState(7);
  const greeting = useMemo(() => (new Date().getHours() < 12 ? "Chào buổi sáng" : "Tiếp tục nào"), []);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("preview") === "login") {
      setAuthenticated(false);
      setCheckingSession(false);
      return;
    }
    fetch("/api/auth/session")
      .then(async (response) => {
        setAuthenticated(response.ok);
        if (response.ok) {
          const data = await response.json() as { username?: string };
          if (data.username) setCurrentUser(data.username);
        }
      })
      .catch(() => setAuthenticated(false))
      .finally(() => setCheckingSession(false));
  }, []);

  const runTests = () => {
    setRunning(true);
    setPassed(false);
    window.setTimeout(() => {
      setRunning(false);
      setPassed(true);
      setStreak((value) => Math.max(value, 7));
    }, 900);
  };

  if (checkingSession) return <main className="auth-loading"><div className="login-logo"><span>R</span></div><p>Securing your workspace...</p></main>;
  if (!authenticated) return <LoginScreen onLogin={(username) => { setCurrentUser(username); setAuthenticated(true); }} />;
  if (authenticated) return <RoboDashboard username={currentUser} onLogout={async () => { await fetch("/api/auth/logout", { method: "POST" }); setAuthenticated(false); }} />;

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
          <button className="avatar" title="Đăng xuất" onClick={async () => { await fetch("/api/auth/logout", { method: "POST" }); setAuthenticated(false); }}>AN</button>
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
