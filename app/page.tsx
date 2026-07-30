"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  BookOpen,
  BriefcaseBusiness,
  ArrowRight,
  CircleGauge,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Activity,
  Anchor,
  Bell,
  Bot,
  Box,
  Boxes,
  BrainCircuit,
  Cable,
  Camera,
  Code2,
  Cog,
  Combine,
  Compass,
  ChartNoAxesCombined,
  Cpu,
  Database,
  Cloud,
  Eye,
  FolderOpen,
  FlaskConical,
  Footprints,
  Gamepad2,
  GraduationCap,
  History,
  Hash,
  Image,
  Info,
  LayoutDashboard,
  Layers3,
  List,
  Lightbulb,
  Library,
  Map,
  MoreVertical,
  Monitor,
  Moon,
  Calculator,
  FileCode2,
  Gauge,
  GitBranch,
  Hand,
  HandMetal,
  HardHat,
  MessageSquareText,
  MessageCircle,
  Microchip,
  MonitorCog,
  Move3d,
  Navigation,
  Network,
  Orbit,
  Palette,
  PanelLeftClose,
  PanelLeftOpen,
  PencilLine,
  PersonStanding,
  Plus,
  Radar,
  Repeat2,
  RadioTower,
  Ruler,
  Rocket,
  Star,
  Pin,
  Paperclip,
  Send,
  Smile,
  Reply,
  Link2,
  FileText,
  X,
  AtSign,
  CheckSquare2,
  Archive,
  RotateCcw,
  Route,
  Search,
  Scale,
  ScanSearch,
  ShieldCheck,
  Sigma,
  SlidersHorizontal,
  Sparkles,
  Target,
  Settings,
  Save,
  Sun,
  Trash2,
  TestTube2,
  UsersRound,
  Waves,
  Waypoints,
  Workflow,
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
  { label: "Settings", Icon: Settings },
] as const;

const perceptionRoadmap = [
  { phase: "Phase 1 · Engineering Foundations", caption: "Lập trình, toán học và kỹ năng xây dựng hệ thống perception", stages: [
    ["Programming for Perception", "Python, C++, Modern C++, NumPy, OpenCV and PyTorch tooling"],
    ["Mathematical Foundations", "Linear algebra, calculus, probability, optimization, SO(3) and SE(3)"],
    ["Software Engineering", "Linux, Git, CMake, Docker, testing, debugging, profiling and reproducibility"],
  ]},
  { phase: "Phase 2 · Computer Vision & Cameras", caption: "Xử lý ảnh, mô hình camera, chiều sâu và biểu diễn không gian", stages: [
    ["Computer Vision Fundamentals", "Images, color spaces, convolution, morphology and classical vision"],
    ["Image Processing & Features", "Filtering, edges, corners, descriptors, matching, optical flow and OpenCV"],
    ["Camera Geometry & Calibration", "Projection, intrinsics, extrinsics, distortion, epipolar geometry and calibration"],
    ["Depth & Stereo Camera", "Stereo matching, disparity, RGB-D, depth sensors and 3D reconstruction"],
    ["3D Geometry & Representation", "Coordinate frames, point clouds, voxels, meshes and transformations"],
  ]},
  { phase: "Phase 3 · Machine & Deep Learning", caption: "Dữ liệu, mô hình học máy và nhận thức thị giác hiện đại", stages: [
    ["Data, Datasets & Evaluation", "Collection, annotation, augmentation, splits, metrics, bias and experiment tracking"],
    ["Machine Learning", "Regression, classification, clustering, dimensionality reduction and model validation"],
    ["Deep Learning", "Neural networks, CNNs, optimization, regularization, transfer and self-supervised learning"],
    ["Detection & Segmentation", "Object detection, semantic, instance and panoptic segmentation"],
    ["Tracking & Temporal Vision", "Single/multi-object tracking, optical flow, video understanding and temporal models"],
    ["Pose & Human Understanding", "2D/3D keypoints, 6D pose, body, hand and human motion understanding"],
  ]},
  { phase: "Phase 4 · Language, Transformers & Multimodal AI", caption: "Từ ngôn ngữ tự nhiên đến mô hình kết hợp thị giác–ngôn ngữ", stages: [
    ["Natural Language Processing", "Tokenization, embeddings, sequence modeling, text representation and evaluation"],
    ["Transformers", "Attention, encoder-decoder, positional encoding, ViT and multimodal transformers"],
    ["Large Language Models", "Pretraining, instruction tuning, prompting, retrieval and efficient adaptation"],
    ["Multimodal Learning", "Contrastive learning, joint embeddings, alignment, fusion and cross-modal reasoning"],
    ["Vision-Language Models", "Captioning, VQA, grounding, referring expressions and open-vocabulary perception"],
  ]},
  { phase: "Phase 5 · Robotics Perception", caption: "Đưa nhận thức 2D/3D vào hệ thống robot đa cảm biến", stages: [
    ["Robotics Foundations", "Frames, kinematics basics, robot sensors, timing and perception-control interfaces"],
    ["3D Perception", "Point cloud processing, registration, 3D detection, scene understanding and reconstruction"],
    ["Sensor Fusion", "Camera-IMU-LiDAR fusion, synchronization, calibration, Bayesian filtering and uncertainty"],
    ["SLAM & Localization", "Visual odometry, mapping, loop closure, pose graphs and localization"],
    ["ROS 2 & Simulation", "ROS 2, TF2, sensor messages, rosbag, RViz2, Gazebo, Isaac Sim and digital twins"],
  ]},
  { phase: "Phase 6 · Embodied AI, VLA & Deployment", caption: "Từ nhận thức đa phương thức đến chính sách hành động trên humanoid", stages: [
    ["Reinforcement Learning", "MDP, value and policy methods, PPO, SAC, model-based and safe RL"],
    ["Imitation & Policy Learning", "Behavior cloning, offline RL, diffusion policy, demonstrations and action prediction"],
    ["Vision-Language-Action", "Action tokens, embodied reasoning, affordances, memory and language-conditioned control"],
    ["Humanoid Integration & Deployment", "Real-time inference, optimization, edge deployment, monitoring, safety and evaluation"],
  ]},
];

const controlRoadmap = [
  { phase: "Phase 1 · Foundations & Robot Mechanics", caption: "Nền tảng lập trình, toán học, cơ học và mô hình robot", stages: [
    ["Programming & Development Tools", "Linux, Python, C++, Modern C++"],
    ["Mathematical Foundations", "Linear algebra, calculus, differential equations, probability, SO(3), SE(3)"],
    ["Classical Mechanics", "Newton laws, forces, torque, work, energy, momentum, conservation"],
    ["Rigid Body Dynamics", "Rigid motion, inertia tensor, COM, COP, quaternion, transformations"],
    ["Robot Kinematics", "DOF, frames, DH, FK, IK, Jacobians, singularities, redundancy"],
    ["Robot Dynamics", "Newton-Euler, Lagrange, RNEA, CRBA, ABA, forward & inverse dynamics"],
    ["Contact & Floating-Base Dynamics", "Contacts, friction cones, constrained and centroidal dynamics, impacts"],
    ["Numerical Methods & Optimization", "Integration, differentiation, convex optimization, QP and sparse solvers"],
  ]},
  { phase: "Phase 2 · Control & State Estimation", caption: "Điều khiển từ cổ điển đến hiện đại và ước lượng trạng thái robot", stages: [
    ["Control Theory Fundamentals", "Open/closed loop, stability, transfer functions, Laplace, Bode, Nyquist"],
    ["Classical Controllers", "P, PI, PD, PID, cascade PID, gain scheduling, anti-windup"],
    ["State Space Control", "Controllability, observability, pole placement, observers, Kalman filters"],
    ["Modern Control", "LQR, LQG, MPC, optimal, robust, adaptive, H∞ and μ-synthesis"],
    ["Nonlinear Control", "Feedback linearization, computed torque, sliding mode, backstepping, NMPC"],
    ["State Estimation & Sensor Fusion", "Bayesian estimation, EKF, UKF, particle filters, base pose and contact estimation"],
  ]},
  { phase: "Phase 3 · Whole-Body Motion & Interaction", caption: "Điều khiển lực, chuyển động toàn thân, locomotion và thao tác", stages: [
    ["Force Control", "Position, velocity, torque, impedance, admittance and hybrid force control"],
    ["Whole Body Control", "Operational space, task priority, null-space, contact optimization, hierarchical QP"],
    ["Motion Planning", "Configuration space, A*, RRT, PRM, trajectory optimization and contact planning"],
    ["Motion Generation", "Trajectories, cubic/quintic polynomials, minimum jerk, Bézier, splines, time scaling"],
    ["Humanoid Locomotion", "Gait, footsteps, balance, ZMP, capture point, DCM and preview control"],
    ["Manipulation & Grasping", "Grasp planning, force closure, bimanual and dexterous manipulation, visual servoing"],
  ]},
  { phase: "Phase 4 · Hardware, Real-Time & Identification", caption: "Cơ cấu chấp hành, hệ nhúng thời gian thực, cảm biến và nhận dạng hệ thống", stages: [
    ["Motor Control", "DC, BLDC, PMSM, servo, FOC, SVPWM, encoders, current sensing and drivers"],
    ["Embedded & Real-Time Systems", "STM32, FreeRTOS, PREEMPT_RT, interrupts, DMA, latency, jitter and communication"],
    ["Sensors & Calibration", "Encoders, IMU, force/torque, pressure, cameras, LiDAR and sensor calibration"],
    ["System Identification", "Motor, friction, inertia and actuator identification; dynamic model validation"],
  ]},
  { phase: "Phase 5 · Modeling, Simulation & ROS 2", caption: "Mô hình hóa robot, mô phỏng vật lý và tích hợp middleware", stages: [
    ["Robot Modeling", "URDF, SDF, MJCF, CAD integration, mass properties, collision and visual models"],
    ["Simulation", "MATLAB, Simulink, MuJoCo, Gazebo, Isaac Sim/Gym/Lab, Drake, Pinocchio, Webots"],
    ["ROS 2", "ros2_control, controller manager, hardware interfaces, TF2, URDF, Xacro, MoveIt2, RViz2"],
  ]},
  { phase: "Phase 6 · Learning-Based Control & Transfer", caption: "Học chính sách điều khiển và chuyển từ mô phỏng sang robot thật", stages: [
    ["Reinforcement Learning", "MDP, PPO, SAC, imitation, offline, model-based and safe reinforcement learning"],
    ["Sim-to-Real", "Domain randomization, dynamics adaptation, latency modeling, HIL and reality-gap evaluation"],
  ]},
  { phase: "Phase 7 · Safety, Verification & Engineering", caption: "Xác minh, triển khai và vận hành hệ thống humanoid đáng tin cậy", stages: [
    ["Safety & Reliability", "Joint/torque limits, collision and fault detection, E-stop, thermal protection"],
    ["Verification & Deployment", "SIL, PIL, HIL, benchmarking, regression tests, telemetry and fault injection"],
    ["Software Engineering", "Linux, Git, CMake, testing, profiling, debugging, real-time and multithreading"],
  ]},
];

const perceptionModuleIcons = [
  Code2, Sigma, GitBranch,
  Eye, Image, Camera, Box, Layers3,
  Database, ChartNoAxesCombined, BrainCircuit, ScanSearch, Target, RadioTower,
  MessageSquareText, Network, Cpu, Boxes, Bot,
  Cog, Move3d, Activity, Navigation, Workflow,
  Sparkles, Hand, Waypoints, Rocket,
];

const controlModuleIcons = [
  FileCode2, Sigma, Scale, Orbit, Waypoints, Cog, Anchor, Calculator,
  Network, SlidersHorizontal, Move3d, BrainCircuit, Waves, Radar,
  Hand, PersonStanding, Compass, Route, Footprints, HandMetal,
  Gauge, Microchip, Activity, FlaskConical,
  Ruler, MonitorCog, Workflow,
  Bot, Repeat2,
  ShieldCheck, TestTube2, GitBranch,
];

function getModuleIcon(track: "perception" | "control", index: number) {
  return (track === "perception" ? perceptionModuleIcons : controlModuleIcons)[index];
}

type LessonKind = "Coding" | "Robotics" | "Control" | "ROS2" | "Simulation" | "Quiz";
type CurriculumModule = { track: "perception" | "control"; phase: string; title: string; description: string; moduleNumber: number };

const chapterThemes = [
  "Nền tảng và thuật ngữ cốt lõi",
  "Mô hình, phương pháp và công cụ",
  "Phân tích và triển khai hệ thống",
  "Thực hành, kiểm thử và đánh giá",
  "Tích hợp vào Humanoid Robot",
];
const lessonThemes = [
  "Tổng quan và mục tiêu", "Khái niệm nền tảng", "Mô hình toán học", "Kiến trúc hệ thống", "Công cụ và môi trường",
  "Quy trình triển khai", "Thực hành có hướng dẫn", "Kiểm thử và đánh giá", "Tích hợp ROS 2", "Bài tổng kết chương",
];

function lessonKind(track: "perception" | "control", chapterIndex: number, lessonIndex: number): LessonKind {
  const perceptionKinds: LessonKind[] = ["Robotics", "Coding", "Quiz", "Simulation", "ROS2", "Control"];
  const controlKinds: LessonKind[] = ["Robotics", "Control", "Simulation", "Coding", "ROS2", "Quiz"];
  return (track === "perception" ? perceptionKinds : controlKinds)[(chapterIndex + lessonIndex) % 6];
}

function lessonWorkspaceName(kind: LessonKind) {
  if (kind === "Robotics") return null;
  if (kind === "Control") return "Control Workspace";
  if (kind === "ROS2") return "ROS2 Workspace";
  if (kind === "Quiz") return "Quiz";
  return "Coding Playground";
}

function CodingPlaygroundWorkspace({ kind, module, lessonTitle, onBack }: { kind: "Coding" | "Simulation"; module: CurriculumModule; lessonTitle: string; onBack: () => void }) {
  const isSimulation = kind === "Simulation";
  const storageKey = `robolearn-draft-${module.track}-${module.moduleNumber}-${kind.toLowerCase()}`;
  const starter = isSimulation
    ? `import numpy as np\n\nclass HumanoidSimulation:\n    def __init__(self, dt: float = 0.01):\n        self.dt = dt\n        self.state = np.zeros(3)\n\n    def step(self, command):\n        # TODO: cập nhật trạng thái mô phỏng\n        return self.state\n`
    : `def solve(sample):\n    \"\"\"Implement the lesson pipeline.\"\"\"\n    # TODO: transform the input and return a result\n    result = sample\n    return result\n`;
  const [code, setCode] = useState(starter);
  const [caseIndex, setCaseIndex] = useState(0);
  const [checkResult, setCheckResult] = useState<{ ok: boolean; lines: string[] } | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const draft = window.localStorage.getItem(storageKey);
    if (draft) setCode(draft);
  }, [storageKey]);

  const runChecks = () => {
    const checks = isSimulation
      ? [
          ["Có lớp mô phỏng", /class\s+\w+Simulation/.test(code)],
          ["Có phương thức step", /def\s+step\s*\(/.test(code)],
          ["Có giá trị trả về", /\breturn\b/.test(code)],
        ] as const
      : [
          ["Có hàm xử lý", /def\s+\w+\s*\(/.test(code)],
          ["Có giá trị trả về", /\breturn\b/.test(code)],
          ["Không còn TODO", !/TODO/.test(code)],
        ] as const;
    setCheckResult({ ok: checks.every((item) => item[1]), lines: checks.map(([label, ok]) => `${ok ? "✓" : "○"} ${label}`) });
  };

  const saveDraft = () => {
    window.localStorage.setItem(storageKey, code);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };

  return (
    <section className={`coding-playground coding-playground-${module.track}`}>
      <header className="coding-playground-header">
        <button onClick={onBack}><PanelLeftOpen size={18}/> Quay lại bài học</button>
        <div><span>{isSimulation ? "SIMULATION EXERCISE" : "CODING EXERCISE"}</span><h1>{lessonTitle}</h1><p>{module.title} · Python 3 · Bản nháp lưu trên thiết bị</p></div>
        <div className="playground-header-actions"><button onClick={() => { setCode(starter); setCheckResult(null); }}><RotateCcw size={16}/> Đặt lại</button><button onClick={saveDraft}><Save size={16}/>{saved ? "Đã lưu" : "Lưu bản nháp"}</button></div>
      </header>
      <div className="coding-playground-grid">
        <aside className="challenge-panel">
          <span>{isSimulation ? "SIMULATION" : "CODING"} · MEDIUM</span><h2>{isSimulation ? "Xây dựng bước mô phỏng tối thiểu" : "Hoàn thiện pipeline xử lý mẫu"}</h2>
          <p>{isSimulation ? "Hoàn thiện lớp mô phỏng để nhận command, cập nhật state và trả về trạng thái mới sau một bước thời gian." : "Hoàn thiện hàm xử lý để nhận dữ liệu đầu vào, thực hiện biến đổi cần thiết và trả về kết quả có thể kiểm thử."}</p>
          <h3>Yêu cầu</h3><ul>{isSimulation ? <><li>Giữ timestep xác định.</li><li>Có phương thức <code>step(command)</code>.</li><li>Trả về state sau mỗi bước.</li></> : <><li>Giữ chữ ký hàm rõ ràng.</li><li>Không thay đổi dữ liệu đầu vào ngoài ý muốn.</li><li>Trả về kết quả từ hàm.</li></>}</ul>
          <div className="challenge-example"><b>Ví dụ đầu vào</b><code>{isSimulation ? "command = [0.1, 0.0, -0.1]" : "sample = {\"value\": 1}"}</code><b>Kết quả mong đợi</b><code>{isSimulation ? "state: ndarray(3,)" : "result is not None"}</code></div>
          <div className="runtime-notice"><Info size={17}/><p><b>Chưa có Python runtime</b>Phiên bản này chỉ kiểm tra cấu trúc code trong trình duyệt, không giả lập kết quả thực thi.</p></div>
        </aside>
        <main className="code-editor-panel">
          <header><div><Code2 size={17}/><b>main.py</b><span>Python 3</span></div><small>{code.split("\n").length} dòng</small></header>
          <div className="code-editor-body"><pre aria-hidden="true">{code.split("\n").map((_, index) => `${index + 1}\n`)}</pre><textarea aria-label="Python code editor" spellCheck={false} value={code} onChange={(event) => { setCode(event.target.value); setCheckResult(null); }}/></div>
          <footer><span>UTF-8 · Spaces: 4</span><button onClick={runChecks}><TestTube2 size={17}/> Chạy kiểm tra</button></footer>
        </main>
        <aside className="testcase-panel">
          <header><TestTube2 size={17}/><h2>Testcase</h2></header>
          <nav>{[1,2,3].map((item, index) => <button key={item} className={caseIndex === index ? "active" : ""} onClick={() => setCaseIndex(index)}>Case {item}</button>)}</nav>
          <section><h3>Input</h3><pre>{isSimulation ? `dt = ${[0.01,0.02,0.005][caseIndex]}\ncommand = [${caseIndex}, 0, ${-caseIndex}]` : `sample = { "value": ${caseIndex + 1} }`}</pre></section>
          <section><h3>Kiểm tra cấu trúc</h3>{checkResult ? <div className={checkResult.ok ? "check-output pass" : "check-output"}>{checkResult.lines.map((line) => <p key={line}>{line}</p>)}<b>{checkResult.ok ? "Đạt kiểm tra tĩnh" : "Cần hoàn thiện thêm"}</b></div> : <div className="testcase-empty">Nhấn “Chạy kiểm tra” để phân tích cấu trúc bản nháp.</div>}</section>
          <section><h3>Trạng thái runtime</h3><dl><div><dt>Python execution</dt><dd>Chưa kết nối</dd></div><div><dt>Simulation engine</dt><dd>{isSimulation ? "Chưa kết nối" : "Không yêu cầu"}</dd></div><div><dt>Submission</dt><dd>Chưa có backend</dd></div></dl></section>
        </aside>
      </div>
    </section>
  );
}

function ControlPlot({ type, kp, ki, kd, zeta, wn }: { type: "magnitude" | "phase"; kp: number; ki: number; kd: number; zeta: number; wn: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const width = Math.max(520, canvas.clientWidth);
    const height = Math.max(210, canvas.clientHeight);
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);
    const pad = { left: 48, right: 18, top: 20, bottom: 30 };
    const plotW = width - pad.left - pad.right;
    const plotH = height - pad.top - pad.bottom;
    const yMin = type === "magnitude" ? -80 : -270;
    const yMax = type === "magnitude" ? 50 : 90;
    ctx.strokeStyle = "rgba(128,145,170,.14)";
    ctx.lineWidth = 1;
    ctx.font = "10px system-ui";
    ctx.fillStyle = "#758198";
    for (let i = 0; i <= 5; i++) {
      const y = pad.top + plotH * i / 5;
      ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(width - pad.right, y); ctx.stroke();
      ctx.fillText(String(Math.round(yMax - (yMax - yMin) * i / 5)), 8, y + 3);
    }
    for (let i = 0; i <= 4; i++) {
      const x = pad.left + plotW * i / 4;
      ctx.beginPath(); ctx.moveTo(x, pad.top); ctx.lineTo(x, height - pad.bottom); ctx.stroke();
      ctx.fillText(`10${["⁻²","⁻¹","⁰","¹","²"][i]}`, x - 9, height - 10);
    }
    const points = Array.from({ length: 180 }, (_, index) => {
      const logW = -2 + index / 179 * 4;
      const w = Math.pow(10, logW);
      const controllerRe = kp;
      const controllerIm = kd * w - ki / Math.max(w, 1e-6);
      const denRe = wn * wn - w * w;
      const denIm = 2 * zeta * wn * w;
      const denNorm = denRe * denRe + denIm * denIm;
      const re = wn * wn * (controllerRe * denRe + controllerIm * denIm) / denNorm;
      const im = wn * wn * (controllerIm * denRe - controllerRe * denIm) / denNorm;
      const value = type === "magnitude" ? 20 * Math.log10(Math.max(1e-8, Math.hypot(re, im))) : Math.atan2(im, re) * 180 / Math.PI;
      return { x: pad.left + index / 179 * plotW, y: pad.top + (yMax - Math.max(yMin, Math.min(yMax, value))) / (yMax - yMin) * plotH };
    });
    const gradient = ctx.createLinearGradient(pad.left, 0, width - pad.right, 0);
    gradient.addColorStop(0, "#3b82f6"); gradient.addColorStop(.55, "#8b5cf6"); gradient.addColorStop(1, "#2bd17f");
    ctx.strokeStyle = gradient; ctx.lineWidth = 2;
    ctx.beginPath();
    points.forEach((point, index) => index ? ctx.lineTo(point.x, point.y) : ctx.moveTo(point.x, point.y));
    ctx.stroke();
    ctx.fillStyle = "#8692a7";
    ctx.fillText(type === "magnitude" ? "Magnitude (dB)" : "Phase (deg)", pad.left, 12);
    ctx.fillText("Frequency (rad/s)", width / 2 - 40, height - 10);
  }, [type, kp, ki, kd, zeta, wn]);
  return <canvas ref={canvasRef} />;
}

function ControlWorkspace({ module, lessonTitle, onBack }: { module: CurriculumModule; lessonTitle: string; onBack: () => void }) {
  const [kp, setKp] = useState(2.5);
  const [ki, setKi] = useState(1.2);
  const [kd, setKd] = useState(0.35);
  const [zeta, setZeta] = useState(0.7);
  const [wn, setWn] = useState(2);
  const [history, setHistory] = useState<Array<{ time: string; kp: number; ki: number; kd: number }>>([]);
  const gainEstimate = Math.max(0, 20 * Math.log10(1 + kp + ki + kd)).toFixed(1);
  const phaseEstimate = Math.max(0, Math.min(89, 35 + zeta * 28 - kd * 4)).toFixed(1);
  const bandwidth = (wn * Math.sqrt(1 + kp / 3)).toFixed(2);
  const controlValue = (label: string, value: number, setter: (value: number) => void, min: number, max: number, step: number) => (
    <label className="control-slider"><span>{label}<b>{value.toFixed(2)}</b></span><input type="range" min={min} max={max} step={step} value={value} onChange={(event) => setter(Number(event.target.value))}/></label>
  );

  return (
    <section className="control-workspace">
      <header className="control-workspace-header">
        <button onClick={onBack}><PanelLeftOpen size={18}/> Quay lại bài học</button>
        <div><span>CONTROL WORKSPACE</span><h1>{lessonTitle}</h1><p>{module.title} · Mô hình bậc hai · Cập nhật trực tiếp trên trình duyệt</p></div>
        <div className="control-live-state"><i/><p><b>Mô hình đang hoạt động</b><span>Biểu đồ dùng phép tính tần số thực từ tham số hiện tại.</span></p></div>
      </header>
      <div className="control-workspace-grid">
        <aside className="control-parameters">
          <section><span>01</span><h2>Chọn mô hình hệ thống</h2><label className="control-select"><small>Plant G(s)</small><select><option>Second-order system</option></select></label><div className="transfer-function">G(s) = ωₙ² / (s² + 2ζωₙs + ωₙ²)</div>{controlValue("ζ · Damping ratio", zeta, setZeta, .1, 2, .05)}{controlValue("ωₙ · Natural frequency", wn, setWn, .5, 10, .1)}</section>
          <section><span>02</span><h2>Thiết lập PID</h2>{controlValue("Kp · Proportional", kp, setKp, 0, 10, .05)}{controlValue("Ki · Integral", ki, setKi, 0, 6, .05)}{controlValue("Kd · Derivative", kd, setKd, 0, 3, .01)}<button className="save-experiment" onClick={() => setHistory((items) => [{ time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }), kp, ki, kd }, ...items].slice(0, 5))}><Save size={17}/> Lưu lần thử</button></section>
          <section className="control-display"><span>03</span><h2>Hiển thị</h2><label><input type="checkbox" defaultChecked/> Magnitude plot</label><label><input type="checkbox" defaultChecked/> Phase plot</label><label><input type="checkbox" defaultChecked/> Frequency grid</label></section>
        </aside>
        <main className="control-visualization">
          <section className="control-chart-card"><header><div><b>Bode Plot · Magnitude</b><span>PID × Second-order plant</span></div><em>Calculated</em></header><ControlPlot type="magnitude" kp={kp} ki={ki} kd={kd} zeta={zeta} wn={wn}/></section>
          <section className="control-chart-card"><header><div><b>Bode Plot · Phase</b><span>Open-loop frequency response</span></div><em>Calculated</em></header><ControlPlot type="phase" kp={kp} ki={ki} kd={kd} zeta={zeta} wn={wn}/></section>
          <div className="control-bottom-grid"><section><h3>Thông số ước lượng</h3><dl><div><dt>Gain indicator</dt><dd>{gainEstimate} dB</dd></div><div><dt>Phase indicator</dt><dd>{phaseEstimate}°</dd></div><div><dt>Bandwidth estimate</dt><dd>{bandwidth} rad/s</dd></div></dl><small>Các chỉ số này là ước lượng giao diện, chưa thay thế phép phân tích control chuyên dụng.</small></section><section className="control-block-diagram"><h3>Sơ đồ khối kín</h3><div><span>R(s)</span><b>Σ</b><em>PID<br/><small>Kp + Ki/s + Kds</small></em><i>G(s)<br/><small>Second order</small></i><span>Y(s)</span></div></section></div>
        </main>
        <aside className="control-insights">
          <section><header><Target size={17}/><h2>Mục tiêu thiết kế</h2></header><label><input type="checkbox" checked={Number(gainEstimate) > 6} readOnly/> Gain indicator &gt; 6 dB</label><label><input type="checkbox" checked={Number(phaseEstimate) > 45} readOnly/> Phase indicator &gt; 45°</label><label><input type="checkbox" checked={Number(bandwidth) > 2} readOnly/> Bandwidth &gt; 2 rad/s</label></section>
          <section className="control-guidance"><header><Lightbulb size={17}/><h2>Gợi ý</h2></header><p>Tăng Kp để tăng phản ứng, Ki để giảm sai số tĩnh và Kd để tăng damping. Mỗi thay đổi đều cập nhật hai đồ thị ngay lập tức.</p></section>
          <section><header><History size={17}/><h2>Lịch sử thử nghiệm</h2></header>{history.length ? history.map((item, index) => <div className="control-history-item" key={`${item.time}-${index}`}><b>{item.time}</b><span>Kp {item.kp.toFixed(2)} · Ki {item.ki.toFixed(2)} · Kd {item.kd.toFixed(2)}</span></div>) : <div className="control-history-empty">Chưa có lần thử nào được lưu.</div>}</section>
          <section className="control-runtime-status"><header><Info size={17}/><h2>Trạng thái hệ thống</h2></header><dl><div><dt>Tính Bode plot</dt><dd>Trong trình duyệt</dd></div><div><dt>Control backend</dt><dd>Chưa kết nối</dd></div><div><dt>Robot hardware</dt><dd>Chưa kết nối</dd></div></dl></section>
        </aside>
      </div>
    </section>
  );
}

function ModuleLearningWorkspace({ module, onBack }: { module: CurriculumModule; onBack: () => void }) {
  const [openChapter, setOpenChapter] = useState(0);
  const [activeLesson, setActiveLesson] = useState({ chapter: 0, lesson: 0 });
  const [lessonTab, setLessonTab] = useState<"content" | "example">("content");
  const [openedWorkspace, setOpenedWorkspace] = useState<string | null>(null);
  const chapters = chapterThemes.map((theme, chapterIndex) => ({
    title: `Chương ${chapterIndex + 1}: ${theme}`,
    lessons: lessonThemes.map((lesson, lessonIndex) => ({ title: `${lesson}: ${module.title}`, kind: lessonKind(module.track, chapterIndex, lessonIndex) })),
  }));
  const selected = chapters[activeLesson.chapter].lessons[activeLesson.lesson];
  const workspaceName = lessonWorkspaceName(selected.kind);

  if (openedWorkspace === "Coding Playground" && (selected.kind === "Coding" || selected.kind === "Simulation")) {
    return <CodingPlaygroundWorkspace kind={selected.kind} module={module} lessonTitle={selected.title} onBack={() => setOpenedWorkspace(null)} />;
  }
  if (openedWorkspace === "Control Workspace" && selected.kind === "Control") {
    return <ControlWorkspace module={module} lessonTitle={selected.title} onBack={() => setOpenedWorkspace(null)} />;
  }

  if (openedWorkspace) return (
    <section className={`module-learning-workspace module-tool-placeholder module-learning-${module.track}`}>
      <button onClick={() => setOpenedWorkspace(null)}><PanelLeftOpen size={18}/> Quay lại bài học</button>
      <div><span>WORKSPACE PLACEHOLDER</span><h1>{openedWorkspace}</h1><p>Workspace này đã được nối với bài <b>{selected.title}</b>, nhưng công cụ chức năng sẽ được xây dựng ở giai đoạn tiếp theo.</p><dl><div><dt>Loại bài</dt><dd>{selected.kind}</dd></div><div><dt>Module</dt><dd>{module.title}</dd></div><div><dt>Trạng thái</dt><dd>Chưa triển khai</dd></div></dl></div>
    </section>
  );

  return (
    <section className={`module-learning-workspace module-learning-${module.track}`}>
      <header className="module-learning-header">
        <button onClick={onBack} className="module-back"><PanelLeftOpen size={18}/> Tất cả module</button>
        <div><span>{module.track === "perception" ? "AI PERCEPTION TRACK" : "CONTROL & SIMULATION TRACK"}</span><h1>{module.title}</h1><p>{module.phase} · Module {String(module.moduleNumber).padStart(2, "0")}</p></div>
        <div className="module-draft-status"><b>Khung chương trình</b><span>Chưa xuất bản · 5 chương · 50 bài mẫu</span></div>
      </header>
      <div className="module-learning-grid">
        <aside className="module-chapter-rail">
          <div className="module-rail-intro"><b>Nội dung module</b><span>0 / 50 bài đã xuất bản</span></div>
          {chapters.map((chapter, chapterIndex) => (
            <section className="module-chapter" key={chapter.title}>
              <button className="module-chapter-toggle" onClick={() => setOpenChapter(openChapter === chapterIndex ? -1 : chapterIndex)}>
                <span><b>{chapter.title}</b><small>10 bài mẫu · Chưa xuất bản</small></span>
                {openChapter === chapterIndex ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
              </button>
              {openChapter === chapterIndex && <div className="module-lesson-list">
                {chapter.lessons.map((lesson, lessonIndex) => (
                  <button key={`${chapterIndex}-${lessonIndex}`} className={activeLesson.chapter === chapterIndex && activeLesson.lesson === lessonIndex ? "active" : ""} onClick={() => setActiveLesson({ chapter: chapterIndex, lesson: lessonIndex })}>
                    <span>{lessonIndex + 1}</span><p><b>{lesson.title}</b><small>Khung nội dung</small></p><em className={`lesson-kind kind-${lesson.kind.toLowerCase()}`}>{lesson.kind}</em>
                  </button>
                ))}
              </div>}
            </section>
          ))}
        </aside>
        <main className="module-lesson-stage">
          <div className="lesson-breadcrumb">Learning <i>›</i> {module.title} <i>›</i> Chương {activeLesson.chapter + 1}</div>
          <header><div><span>Bài {activeLesson.lesson + 1}</span><h2>{selected.title}</h2></div><em className={`lesson-kind kind-${selected.kind.toLowerCase()}`}>{selected.kind}</em></header>
          <nav><button className={lessonTab === "content" ? "active" : ""} onClick={() => setLessonTab("content")}>Nội dung</button><button className={lessonTab === "example" ? "active" : ""} onClick={() => setLessonTab("example")}>Ví dụ</button></nav>
          {lessonTab === "content" ? <section className="lesson-sample-content">
            <span>NỘI DUNG MINH HỌA · CHƯA XUẤT BẢN</span>
            <h3>1. Mục tiêu của bài học</h3>
            <p>Bài học giới thiệu cách đặt <b>{selected.title.toLowerCase()}</b> trong toàn bộ pipeline của module <b>{module.title}</b>. Người học cần xác định dữ liệu đầu vào, kết quả đầu ra và mối liên hệ của thành phần này với hệ thống Humanoid Robot.</p>
            <div className="lesson-callout"><Info size={18}/><p><b>Điểm cần ghi nhớ</b> Một thành phần chỉ có ý nghĩa khi giao diện dữ liệu, giả định vận hành và tiêu chí kiểm thử của nó được mô tả rõ ràng.</p></div>
            <h3>2. Quy trình tiếp cận</h3>
            <ol><li>Xác định vấn đề và yêu cầu kỹ thuật.</li><li>Thiết kế mô hình hoặc thuật toán tối thiểu.</li><li>Kiểm thử bằng dữ liệu và điều kiện có thể lặp lại.</li><li>Đánh giá sai số trước khi tích hợp vào hệ thống lớn hơn.</li></ol>
            <p className="lesson-sample-note">Đây là nội dung mẫu để kiểm tra bố cục. Nội dung chuyên môn hoàn chỉnh sẽ thay thế phần này khi dữ liệu của chương được cung cấp.</p>
            {workspaceName && <button className="lesson-workspace-link" onClick={() => setOpenedWorkspace(workspaceName)}>{workspaceName} <ArrowRight size={17}/></button>}
          </section> : <section className="lesson-example-content">
            <span>VÍ DỤ MINH HỌA</span><h3>Pipeline tối thiểu</h3><pre><code>{`input = load_sample()\nmodel = configure_${selected.kind.toLowerCase()}()\nresult = model.run(input)\nvalidate(result)`}</code></pre><p>Ví dụ chỉ minh họa cấu trúc luồng xử lý; chưa phải mã nguồn thực thi của bài học.</p>
            {workspaceName && <button className="lesson-workspace-link" onClick={() => setOpenedWorkspace(workspaceName)}>{workspaceName} <ArrowRight size={17}/></button>}
          </section>}
        </main>
        <aside className="module-context-panel">
          <section><header><Info size={17}/><h3>Thông tin bài học</h3></header><dl><div><dt>Phân loại</dt><dd><em className={`lesson-kind kind-${selected.kind.toLowerCase()}`}>{selected.kind}</em></dd></div><div><dt>Tiến độ</dt><dd>Chưa bắt đầu</dd></div><div><dt>Thời lượng</dt><dd>Chưa xác định</dd></div><div><dt>XP</dt><dd>Chưa thiết lập</dd></div></dl></section>
          <section><header><FileText size={17}/><h3>Tài liệu liên quan</h3></header><div className="module-honest-empty">Chưa có tài liệu được tải lên.</div></section>
          <section><header><PencilLine size={17}/><h3>Ghi chú</h3></header><div className="module-honest-empty">Chưa có ghi chú cho bài học này.</div></section>
        </aside>
      </div>
    </section>
  );
}

function LearningWorkspace({ onOpenRoadmap, initialModule = null, onModuleClosed }: { onOpenRoadmap: (track: "perception" | "control") => void; initialModule?: CurriculumModule | null; onModuleClosed?: () => void }) {
  const [track, setTrack] = useState<"perception" | "control">(initialModule?.track ?? "perception");
  const [selectedModule, setSelectedModule] = useState<CurriculumModule | null>(initialModule);
  const isPerception = track === "perception";
  const phases = isPerception ? perceptionRoadmap : controlRoadmap;
  const modules = phases.flatMap((phase, phaseIndex) =>
    phase.stages.map((stage, stageIndex) => ({
      phase: phase.phase,
      phaseCaption: phase.caption,
      phaseIndex,
      stageIndex,
      title: stage[0],
      description: stage[1],
    })),
  );
  const phaseCount = phases.length;
  const moduleCount = modules.length;
  const TrackIcon = isPerception ? Eye : Gamepad2;

  if (selectedModule) return <ModuleLearningWorkspace module={selectedModule} onBack={() => { setSelectedModule(null); onModuleClosed?.(); }} />;

  return (
    <section className={`learning-workspace learning-v2 learning-${track}`}>
      <header className="learning-header">
        <div><span>LEARNING SPACE</span><h1>Learning <i>›</i> <em>{isPerception ? "AI Perception" : "Control & Simulation"}</em></h1><p>{isPerception ? "Lộ trình học toàn diện về AI Perception cho Humanoid Robot." : "Lộ trình học toàn diện về điều khiển, mô phỏng và lập trình robot."}</p></div>
        <div className="learning-tabs" role="tablist"><button className={isPerception ? "active" : ""} onClick={() => setTrack("perception")}><Eye size={18}/>AI Perception</button><button className={!isPerception ? "active" : ""} onClick={() => setTrack("control")}><Gamepad2 size={18}/>Control & Simulation</button></div>
      </header>

      <div className="learning-v2-top">
        <section className="learning-overview">
          <div className="learning-zero-ring"><b>0%</b><span>Hoàn thành</span></div>
          <div className="learning-overview-copy"><span>{isPerception ? "AI PERCEPTION PROGRESS" : "CONTROL & SIMULATION PROGRESS"}</span><h2>Tiến độ tổng thể <strong>0%</strong></h2><div className="learning-progress-track"><i /></div><p>Chưa có bài học nào được xuất bản.</p><div className="learning-overview-stats"><div><b>0</b><span>Hoàn thành</span></div><div><b>0</b><span>Đang học</span></div><div><b>0</b><span>Chưa bắt đầu</span></div><div><b>0 XP</b><span>XP đạt được</span></div></div></div>
        </section>
        <section className="learning-v2-card learning-route-card"><header><TrackIcon size={18}/><h3>Giới thiệu lộ trình</h3></header><p>{isPerception ? "Từ nền tảng thị giác máy tính, hình học 3D và deep learning đến VLM, VLA cho Humanoid." : "Từ Linux, Python, C++ và cơ học robot đến control, embedded, simulation, ROS 2 và triển khai humanoid."}</p><div className="curriculum-count"><b>{phaseCount}</b><span>phases</span><b>{moduleCount}</b><span>modules</span></div><button onClick={() => onOpenRoadmap(track)}>Xem Roadmap chi tiết <ArrowRight size={15}/></button></section>
        <section className="learning-v2-card learning-quick-card"><header><CircleGauge size={18}/><h3>Thống kê nhanh</h3></header><dl><div><dt>Module trong lộ trình</dt><dd>{moduleCount}</dd></div><div><dt>Bài học đã xuất bản</dt><dd>0</dd></div><div><dt>Tổng thời gian học</dt><dd>0 phút</dd></div><div><dt>XP hiện tại</dt><dd>0 XP</dd></div></dl></section>
      </div>

      <div className="learning-v2-body">
        <section className="learning-modules">
          <header><div><h2>Các Module</h2><span>{phaseCount} phases · {moduleCount} modules</span></div></header>
          <div className="learning-phase-list">
            {phases.map((phase, phaseIndex) => (
              <section className="learning-phase" key={phase.phase}>
                <header><div><span>{phase.phase}</span></div><small>{phase.stages.length} modules</small></header>
                <div className="learning-module-list">
                  {phase.stages.map((stage, stageIndex) => {
                    const moduleNumber = phases.slice(0, phaseIndex).reduce((total, item) => total + item.stages.length, 0) + stageIndex + 1;
                    const ModuleIcon = getModuleIcon(track, moduleNumber - 1);
                    return <article key={stage[0]} className="openable-module" onClick={() => setSelectedModule({ track, phase: phase.phase, title: stage[0], description: stage[1], moduleNumber })}>
                      <div className="module-icon"><ModuleIcon size={19}/></div>
                      <div><span>MODULE {String(moduleNumber).padStart(2, "0")}</span><h3>{stage[0]}</h3><p>{stage[1]}</p></div>
                      <div className="module-data"><b>50 bài mẫu</b><span>Chưa xuất bản</span></div>
                      <div className="module-progress"><i /><b>0%</b></div>
                      <button aria-label={`Mở module ${stage[0]}`} onClick={(event) => { event.stopPropagation(); setSelectedModule({ track, phase: phase.phase, title: stage[0], description: stage[1], moduleNumber }); }}><ArrowRight size={17}/></button>
                    </article>;
                  })}
                </div>
              </section>
            ))}
          </div>
        </section>

        <aside className="learning-v2-side">
          <section className="learning-v2-card"><header><CheckCircle2 size={18}/><h3>Nhiệm vụ hôm nay</h3><span className="empty-badge">0 nhiệm vụ</span></header><div className="learning-empty-state"><b>Chưa có nhiệm vụ</b><p>Nhiệm vụ sẽ xuất hiện khi bài học đầu tiên được phát hành.</p></div><button className="disabled-action" disabled>Chưa thể bắt đầu</button></section>
          <section className="learning-v2-card learning-next-card"><header><Lightbulb size={18}/><h3>Gợi ý tiếp theo</h3></header><div className="learning-suggestion"><span><TrackIcon size={18}/></span><p><small>MODULE 01</small><b>{modules[0].title}</b><small>{modules[0].description}</small></p></div><button onClick={() => onOpenRoadmap(track)}>Xem trong Roadmap <ArrowRight size={14}/></button></section>
          <section className="learning-v2-card"><header><History size={18}/><h3>Hoạt động gần đây</h3></header><div className="learning-empty-activity"><span>○</span><p><b>Chưa có hoạt động</b><small>Hoạt động học và XP sẽ được ghi nhận tại đây.</small></p></div></section>
        </aside>
      </div>
    </section>
  );
}

function RoadmapWorkspace({ initialTrack = "perception", onOpenModule }: { initialTrack?: "perception" | "control"; onOpenModule?: (module: CurriculumModule) => void }) {
  const [track, setTrack] = useState<"perception" | "control">(initialTrack);
  const isPerception = track === "perception";
  const phases = isPerception ? perceptionRoadmap : controlRoadmap;
  const moduleCount = phases.reduce((total, phase) => total + phase.stages.length, 0);
  const phaseCount = phases.length;
  const TrackIcon = isPerception ? Eye : Gamepad2;

  return (
    <section className={`roadmap-workspace roadmap-${track}`}>
      <div className="roadmap-galaxy" aria-hidden="true" />
      <header className="roadmap-header">
        <div><span>ROBOLEARN CURRICULUM</span><h1>Roadmap</h1><p>Lộ trình kiến thức từ nền tảng đến hệ thống Humanoid hoàn chỉnh.</p></div>
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
                <header><div><span>0{phaseIndex + 1}</span><h2>{phase.phase}</h2></div></header>
                <div className="roadmap-stage-row">
                  {phase.stages.map((stage, stageIndex) => {
                    const number = phases.slice(0, phaseIndex).reduce((total, item) => total + item.stages.length, 0) + stageIndex + 1;
                    const ModuleIcon = getModuleIcon(track, number - 1);
                    return (
                      <article className="roadmap-stage roadmap-stage-openable" key={stage[0]} onClick={() => onOpenModule?.({ track, phase: phase.phase, title: stage[0], description: stage[1], moduleNumber: number })}>
                        <div className="stage-top"><span><ModuleIcon size={16}/></span><b>{String(number).padStart(2, "0")}</b><small>PLANNED</small></div>
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
            <div className="roadmap-pill"><b>{moduleCount}</b><span>giai đoạn</span></div>
          </footer>
        </div>

        <aside className="roadmap-side">
          <section className="roadmap-side-card progress-overview">
            <header><CircleGauge size={18}/><h3>Tiến độ tổng thể</h3></header>
            <div className="roadmap-ring"><b>0%</b></div>
            <p><span>Đã hoàn thành</span><b>0 / {moduleCount} giai đoạn</b></p>
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
            <button onClick={() => onOpenModule?.({ track, phase: phases[0].phase, title: phases[0].stages[0][0], description: phases[0].stages[0][1], moduleNumber: 1 })}>Khám phá module <ArrowRight size={15}/></button>
          </section>

          <section className="roadmap-side-card track-snapshot">
            <header><Target size={18}/><h3>Tổng quan track</h3></header>
            <div><b>{phaseCount}</b><span>Phase</span></div><div><b>{moduleCount}</b><span>Giai đoạn</span></div><div><b>0</b><span>Đã học</span></div>
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

type RoboProject = {
  id: string;
  title: string;
  description: string;
  track: string;
  technologies: string[];
  difficulty: "Dễ" | "Trung bình" | "Khó" | "Rất khó";
  priority?: "Thấp" | "Trung bình" | "Cao";
  module?: string;
  topics?: string[];
  teamMember?: string;
  deadline?: string;
  favorite?: boolean;
  pinned?: boolean;
  archived?: boolean;
  taskCount?: number;
  progress: number;
  createdAt: string;
  updatedAt: string;
};

const projectTracks = ["AI Perception", "3D Vision", "VLM & VLA", "Control", "Simulation", "Humanoid"];
const projectTopics = [...new Set(
  [...perceptionRoadmap, ...controlRoadmap].flatMap((phase) => phase.stages.map((stage) => stage[0]))
)];

const projectStatus = (project: RoboProject) => project.progress === 100 ? "Hoàn thành" : project.progress > 0 ? "Đang làm" : "Chưa bắt đầu";

function ProjectsWorkspace() {
  const [projects, setProjects] = useState<RoboProject[]>([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest");
  const [topicsExpanded, setTopicsExpanded] = useState(false);
  const [topicFilter, setTopicFilter] = useState("Tất cả chủ đề");
  const [quickFilter, setQuickFilter] = useState("All");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showCreate, setShowCreate] = useState(false);
  const [draft, setDraft] = useState({ title: "", description: "", track: "AI Perception", technologies: "Python, OpenCV", difficulty: "Trung bình" as RoboProject["difficulty"], priority: "Trung bình" as NonNullable<RoboProject["priority"]>, module: "Computer Vision", topics: "Image Processing, Camera Geometry", teamMember: "", deadline: "" });

  useEffect(() => {
    const stored = window.localStorage.getItem("robolearn-projects");
    if (stored) {
      try { setProjects(JSON.parse(stored)); } catch { /* keep empty state */ }
    }
  }, []);

  const persist = (next: RoboProject[]) => {
    setProjects(next);
    window.localStorage.setItem("robolearn-projects", JSON.stringify(next));
  };

  const visibleProjects = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const result = projects.filter((project) => {
      const projectTopicSet = [project.module, ...(project.topics ?? []), ...project.technologies].filter(Boolean);
      const matchesTopic = topicFilter === "Tất cả chủ đề" || projectTopicSet.includes(topicFilter);
      const matchesQuery = !normalized || `${project.title} ${project.description} ${project.track} ${projectTopicSet.join(" ")}`.toLowerCase().includes(normalized);
      const recentlyUpdated = Date.now() - new Date(project.updatedAt).getTime() <= 7 * 86400000;
      const matchesQuick = quickFilter === "Favorites" ? project.favorite && !project.archived : quickFilter === "Recently Opened" ? recentlyUpdated && !project.archived : quickFilter === "Pinned" ? project.pinned && !project.archived : quickFilter === "Archived" ? project.archived : !project.archived;
      return matchesTopic && matchesQuery && matchesQuick;
    });
    return [...result].sort((a, b) => {
      if (sort === "progress") return b.progress - a.progress;
      if (sort === "name") return a.title.localeCompare(b.title);
      if (sort === "oldest") return a.createdAt.localeCompare(b.createdAt);
      if (sort === "status") return projectStatus(a).localeCompare(projectStatus(b));
      if (sort === "deadline") return (a.deadline || "9999").localeCompare(b.deadline || "9999");
      return b.updatedAt.localeCompare(a.updatedAt);
    });
  }, [projects, topicFilter, quickFilter, query, sort]);

  const topicCounts = useMemo(() => projectTopics.map((topic) => ({
    topic,
    count: projects.filter((project) => project.module === topic || project.topics?.includes(topic) || project.technologies.includes(topic)).length,
  })), [projects]);

  const createProject = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!draft.title.trim()) return;
    const now = new Date().toISOString();
    const project: RoboProject = {
      id: crypto.randomUUID(),
      title: draft.title.trim(),
      description: draft.description.trim(),
      track: draft.track,
      technologies: draft.technologies.split(",").map((item) => item.trim()).filter(Boolean),
      difficulty: draft.difficulty,
      priority: draft.priority,
      module: draft.module,
      topics: draft.topics.split(",").map((item) => item.trim()).filter(Boolean),
      teamMember: draft.teamMember.trim(),
      deadline: draft.deadline,
      progress: 0,
      createdAt: now,
      updatedAt: now,
    };
    persist([project, ...projects]);
    setDraft({ title: "", description: "", track: "AI Perception", technologies: "Python, OpenCV", difficulty: "Trung bình", priority: "Trung bình", module: "Computer Vision", topics: "Image Processing, Camera Geometry", teamMember: "", deadline: "" });
    setShowCreate(false);
  };

  const updateProgress = (project: RoboProject, change: number) => {
    persist(projects.map((item) => item.id === project.id ? { ...item, progress: Math.min(100, Math.max(0, item.progress + change)), updatedAt: new Date().toISOString() } : item));
  };

  const toggleProjectMeta = (project: RoboProject, field: "favorite" | "pinned" | "archived") => {
    persist(projects.map((item) => item.id === project.id ? { ...item, [field]: !item[field], updatedAt: new Date().toISOString() } : item));
  };

  const deleteProject = (project: RoboProject) => {
    if (!window.confirm(`Xóa project "${project.title}"?`)) return;
    persist(projects.filter((item) => item.id !== project.id));
  };

  const exportProjects = () => {
    const blob = new Blob([JSON.stringify({ version: 1, projects }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "robolearn-projects.json";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const importProjects = async (file?: File) => {
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      const incoming = Array.isArray(parsed) ? parsed : parsed.projects;
      if (!Array.isArray(incoming)) throw new Error("Invalid project file");
      persist(incoming);
    } catch {
      window.alert("File project không hợp lệ.");
    }
  };

  const completed = projects.filter((project) => project.progress === 100).length;
  const active = projects.filter((project) => project.progress > 0 && project.progress < 100).length;
  const planned = projects.filter((project) => project.progress === 0).length;
  const totalTasks = projects.reduce((sum, project) => sum + (project.taskCount ?? 0), 0);
  const averageProgress = projects.length ? Math.round(projects.reduce((sum, project) => sum + project.progress, 0) / projects.length) : 0;
  const upcomingDeadline = projects.filter((project) => project.deadline && !project.archived && project.progress < 100).sort((a, b) => (a.deadline ?? "").localeCompare(b.deadline ?? ""))[0];
  const activeModule = projects.find((project) => project.progress > 0 && project.progress < 100)?.module;

  return (
    <section className="projects-workspace">
      <header className="projects-header">
        <div><span>BUILD · APPLY · SHIP</span><h1>Projects <em>Overview</em></h1><p>Biến kiến thức Robotics thành những hệ thống có thể chạy, đo lường và cải tiến.</p></div>
        <div className="projects-header-actions"><label className="project-search"><Search size={17}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Tìm kiếm project..." /></label><button className="new-project-button" onClick={() => setShowCreate(true)}><Plus size={18}/> New Project</button></div>
      </header>

      <div className="project-kpi-strip">
        <div><BriefcaseBusiness size={18}/><p><b>{projects.filter((project) => !project.archived).length}</b><span>Projects</span></p></div>
        <div><CheckCircle2 size={18}/><p><b>{totalTasks}</b><span>Tasks</span></p></div>
        <div><CircleGauge size={18}/><p><b>{averageProgress}%</b><span>Progress</span></p></div>
        <div><Activity size={18}/><p><b>{active}</b><span>Active</span></p></div>
      </div>

      <div className="project-filters">
        <button className={topicFilter === "Tất cả chủ đề" ? "active" : ""} onClick={() => setTopicFilter("Tất cả chủ đề")}>Tất cả</button>
        {projectTopics.slice(0, 4).map((topic) => <button className={topicFilter === topic ? "active" : ""} onClick={() => setTopicFilter(topic)} key={topic}>{topic}</button>)}
        <button className="topic-expand" aria-expanded={topicsExpanded} onClick={() => setTopicsExpanded((value) => !value)}>{topicsExpanded ? <>Collapse <ChevronUp size={15}/></> : <>Expand <ChevronDown size={15}/></>}</button>
      </div>
      {topicsExpanded && <div className="project-topic-panel">
        <button className={topicFilter === "Tất cả chủ đề" ? "active" : ""} onClick={() => setTopicFilter("Tất cả chủ đề")}>Tất cả chủ đề <span>{projects.length}</span></button>
        {topicCounts.map(({ topic, count }) => <button className={topicFilter === topic ? "active" : ""} onClick={() => setTopicFilter(topic)} key={topic}>{topic} <span>{count}</span></button>)}
        <button className="topic-collapse" onClick={() => setTopicsExpanded(false)}>Collapse <ChevronUp size={15}/></button>
      </div>}
      <div className="project-quick-filters">
        {["All", "Favorites", "Recently Opened", "Pinned", "Archived"].map((item) => <button className={quickFilter === item ? "active" : ""} onClick={() => setQuickFilter(item)} key={item}>{item === "Favorites" && "★ "}{item}</button>)}
      </div>

      <div className="projects-layout">
        <main className="projects-main">
          <div className="projects-toolbar"><h2>{topicFilter !== "Tất cả chủ đề" ? topicFilter : "Tất cả project"} <span>({visibleProjects.length})</span></h2><div><span className="sort-label">Sort</span><select value={sort} onChange={(e) => setSort(e.target.value)}><option value="newest">Newest</option><option value="oldest">Oldest</option><option value="name">Name A–Z</option><option value="progress">Progress</option><option value="status">Status</option><option value="deadline">Deadline</option></select><button className={view === "grid" ? "active" : ""} onClick={() => setView("grid")}><LayoutDashboard size={17}/></button><button className={view === "list" ? "active" : ""} onClick={() => setView("list")}><List size={17}/></button></div></div>
          {visibleProjects.length === 0 ? (
            <div className="projects-empty"><div className="project-empty-icon"><BriefcaseBusiness size={30}/></div><h2>{projects.length ? "Không tìm thấy project phù hợp" : "Start your first robotics project"}</h2><p>{projects.length ? "Thử đổi chủ đề, quick filter hoặc từ khóa tìm kiếm." : "Biến một module trong Learning thành hệ thống có thể chạy, kiểm thử và cải tiến."}</p><div className="empty-project-metrics"><span><b>0</b>Project</span><span><b>0</b>Task</span><span><b>0%</b>Progress</span></div>{!projects.length && <button onClick={() => setShowCreate(true)}><Plus size={17}/> Tạo project đầu tiên</button>}</div>
          ) : (
            <div className={`project-collection ${view}`}>
              {visibleProjects.map((project, index) => (
                <article className="project-card" key={project.id}>
                  <div className={`project-art art-${index % 6}`}><span>{project.track}</span><div className="project-nodes"><i/><i/><i/><i/></div></div>
                  <div className="project-card-body"><header><h3>{project.title}</h3><div className="project-card-actions"><button className={project.favorite ? "selected" : ""} aria-label={`Favorite ${project.title}`} onClick={() => toggleProjectMeta(project,"favorite")}><Star size={15}/></button><button className={project.pinned ? "selected" : ""} aria-label={`Pin ${project.title}`} onClick={() => toggleProjectMeta(project,"pinned")}><Pin size={15}/></button><button aria-label={`Archive ${project.title}`} onClick={() => toggleProjectMeta(project,"archived")}><Archive size={15}/></button><button aria-label={`Xóa ${project.title}`} onClick={() => deleteProject(project)}><Trash2 size={15}/></button></div></header><p>{project.description || "Chưa có mô tả."}</p><div className="project-progress"><i><b style={{ width: `${project.progress}%` }}/></i><strong>{project.progress}%</strong></div><div className="project-tags">{[project.module,...(project.topics ?? []),...project.technologies].filter(Boolean).slice(0, 5).map((tag) => <span key={tag}>{tag}</span>)}</div><footer><span>{project.difficulty}</span><small>{projectStatus(project)}</small><div><button onClick={() => updateProgress(project, -10)}>−10</button><button onClick={() => updateProgress(project, 10)}>+10</button></div></footer></div>
                </article>
              ))}
            </div>
          )}
        </main>

        <aside className="projects-side">
          <section className="projects-side-card project-summary"><h3>Tổng quan dự án</h3><div className="project-donut" style={{ background: `conic-gradient(#36d57c 0 ${completed / Math.max(1, projects.length) * 100}%,#8154ed 0 ${(completed + active) / Math.max(1, projects.length) * 100}%,#283246 0)` }}><b>{projects.length}</b><span>Dự án</span></div><dl><div><dt><i className="green"/>Hoàn thành</dt><dd>{completed}</dd></div><div><dt><i className="purple"/>Đang làm</dt><dd>{active}</dd></div><div><dt><i/>Chưa bắt đầu</dt><dd>{planned}</dd></div></dl></section>
          <section className="projects-side-card project-pulse"><h3>Workspace Pulse</h3><dl><div><dt>Upcoming Deadline</dt><dd>{upcomingDeadline?.deadline ? new Intl.DateTimeFormat("vi-VN",{day:"2-digit",month:"short"}).format(new Date(upcomingDeadline.deadline)) : "Chưa có"}</dd></div><div><dt>Current Sprint</dt><dd>{active ? `${active} active` : "Chưa bắt đầu"}</dd></div><div><dt>Active Module</dt><dd>{activeModule ?? "Chưa chọn"}</dd></div><div><dt>Hours Learned</dt><dd>0 giờ</dd></div></dl></section>
          <section className="projects-side-card"><h3>Dự án gần đây</h3>{projects.length ? projects.slice(0, 3).map((project) => <div className="recent-project" key={project.id}><span>{project.title.slice(0,1)}</span><p><b>{project.title}</b><small>{project.track} · {project.progress}%</small></p></div>) : <div className="side-project-empty">Chưa có hoạt động project.</div>}</section>
          <section className="projects-side-card project-tools"><h3>Công cụ nhanh</h3><button onClick={() => setShowCreate(true)}><Plus size={16}/> Tạo Project mới</button><label><span>⇧</span> Import Project<input type="file" accept=".json,application/json" onChange={(e) => importProjects(e.target.files?.[0])}/></label><button onClick={exportProjects} disabled={!projects.length}><span>⇩</span> Export Projects</button></section>
        </aside>
      </div>

      {showCreate && <div className="project-modal-backdrop" onMouseDown={() => setShowCreate(false)}><form className="project-modal project-modal-large" onSubmit={createProject} onMouseDown={(e) => e.stopPropagation()}><header><div><span>NEW ROBOTICS PROJECT</span><h2>Tạo Project</h2></div><button type="button" onClick={() => setShowCreate(false)}>×</button></header><label>Tên project<input autoFocus value={draft.title} onChange={(e) => setDraft({...draft,title:e.target.value})} placeholder="Ví dụ: Stereo Depth Pipeline" required /></label><label>Mô tả<textarea value={draft.description} onChange={(e) => setDraft({...draft,description:e.target.value})} placeholder="Mục tiêu và kết quả cần đạt..." /></label><div className="project-form-grid"><label>Track<select value={draft.track} onChange={(e) => setDraft({...draft,track:e.target.value})}>{projectTracks.map((track) => <option key={track}>{track}</option>)}</select></label><label>Module<select value={draft.module} onChange={(e) => setDraft({...draft,module:e.target.value})}>{projectTopics.map((topic) => <option key={topic}>{topic}</option>)}</select></label><label>Độ khó<select value={draft.difficulty} onChange={(e) => setDraft({...draft,difficulty:e.target.value as RoboProject["difficulty"]})}><option>Dễ</option><option>Trung bình</option><option>Khó</option><option>Rất khó</option></select></label><label>Ưu tiên<select value={draft.priority} onChange={(e) => setDraft({...draft,priority:e.target.value as NonNullable<RoboProject["priority"]>})}><option>Thấp</option><option>Trung bình</option><option>Cao</option></select></label><label>Thành viên<input value={draft.teamMember} onChange={(e) => setDraft({...draft,teamMember:e.target.value})} placeholder="Để trống nếu làm cá nhân" /></label><label>Deadline<input type="date" value={draft.deadline} onChange={(e) => setDraft({...draft,deadline:e.target.value})} /></label></div><label>Topic tags<input value={draft.topics} onChange={(e) => setDraft({...draft,topics:e.target.value})} placeholder="Stereo Vision, Depth Estimation" /><small>Project có thể thuộc nhiều chủ đề; phân tách bằng dấu phẩy.</small></label><label>Technologies<input value={draft.technologies} onChange={(e) => setDraft({...draft,technologies:e.target.value})} placeholder="Python, OpenCV, ROS2" /><small>Phân tách bằng dấu phẩy.</small></label><footer><button type="button" onClick={() => setShowCreate(false)}>Hủy</button><button type="submit"><Plus size={16}/> Tạo Project</button></footer></form></div>}
    </section>
  );
}

type CollaborationAttachment = { id?: string; name: string; size: string | number; type: string; url?: string };
type CollaborationChannel = { id: string; name: string; label?: string; description: string; createdBy?: string; createdAt?: number };
type CollaborationMember = { username: string; name: string; online: boolean; lastSeenAt: number; channel?: string | null };
type CollaborationMessage = {
  id: string;
  channel: string;
  author: string;
  text: string;
  createdAt: string;
  replyTo?: string;
  pinned?: boolean;
  reactions?: Record<string, string[]>;
  attachments?: CollaborationAttachment[];
  projectId?: string;
};

const collaborationChannels = [
  { id: "general", label: "General", description: "Thông báo và trao đổi chung" },
  { id: "ai-perception", label: "AI Perception", description: "Computer Vision, VLM, VLA và 3D Perception" },
  { id: "control-simulation", label: "Control & Simulation", description: "Control, ROS2, MuJoCo và Isaac Sim" },
  { id: "project-discussion", label: "Project Discussion", description: "Review tiến độ và phối hợp project" },
  { id: "ideas", label: "Ideas & Research", description: "Ý tưởng, paper và thử nghiệm mới" },
];

const collaborationMembers = [
  { username: "levonghiahiep", name: "Ben Hiệp", initials: "BH" },
  { username: "phanthethong", name: "Thế Thông", initials: "TT" },
];

function CollaborationWorkspace({ username, displayName }: { username: string; displayName: string }) {
  const [channel, setChannel] = useState("general");
  const [channels, setChannels] = useState<CollaborationChannel[]>(collaborationChannels.map((item) => ({ ...item, name: item.label })));
  const [members, setMembers] = useState<CollaborationMember[]>(collaborationMembers.map((item) => ({ username: item.username, name: item.name, online: item.username === username, lastSeenAt: item.username === username ? Date.now() : 0 })));
  const [messages, setMessages] = useState<CollaborationMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const [replyTo, setReplyTo] = useState<CollaborationMessage | null>(null);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [showPins, setShowPins] = useState(false);
  const [projects, setProjects] = useState<RoboProject[]>([]);
  const [activeProject, setActiveProject] = useState("");
  const [detailView, setDetailView] = useState<"members" | "files" | "links" | null>(null);
  const [showCreateChannel, setShowCreateChannel] = useState(false);
  const [newChannel, setNewChannel] = useState({ name: "", description: "" });
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMentionPicker, setShowMentionPicker] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [channelMenu, setChannelMenu] = useState<{ x: number; y: number; channel: CollaborationChannel } | null>(null);

  useEffect(() => {
    const storedProjects = localStorage.getItem("robolearn-projects");
    if (storedProjects) {
      try { setProjects(JSON.parse(storedProjects)); } catch { /* keep empty projects */ }
    }
  }, []);

  const applySnapshot = (payload: { channels?: CollaborationChannel[]; messages?: CollaborationMessage[]; members?: CollaborationMember[] }) => {
    if (payload.channels) setChannels(payload.channels);
    if (payload.messages) setMessages(payload.messages);
    if (payload.members) setMembers(payload.members);
  };

  const refreshCollaboration = async (silent = true) => {
    try {
      const response = await fetch(`/api/collaboration?channel=${encodeURIComponent(channel)}`, { cache: "no-store" });
      if (!response.ok) throw new Error("Không thể tải workspace.");
      applySnapshot(await response.json());
      if (!silent) setNotice("");
    } catch {
      if (!silent) setNotice("Mất kết nối Collaboration. Hãy thử tải lại.");
    }
  };

  useEffect(() => {
    void refreshCollaboration(false);
    const timer = window.setInterval(() => void refreshCollaboration(true), 5000);
    const onVisible = () => { if (!document.hidden) void refreshCollaboration(true); };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [channel]);

  const channelInfo = channels.find((item) => item.id === channel) ?? channels[0] ?? { id: "general", name: "General", description: "" };
  const channelMessages = messages
    .filter((message) => message.channel === channel)
    .filter((message) => !query || `${message.author} ${message.text} ${(message.attachments ?? []).map((file) => file.name).join(" ")}`.toLowerCase().includes(query.toLowerCase()));
  const pinnedMessages = messages.filter((message) => message.channel === channel && message.pinned);
  const currentProject = projects.find((project) => project.id === activeProject) ?? projects.find((project) => project.progress > 0 && project.progress < 100);
  const otherMember = members.find((member) => member.username !== username) ?? { username: "phanthethong", name: "Thế Thông", online: false, lastSeenAt: 0 };

  const submitMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!draft.trim() && !attachments.length) return;
    setBusy(true);
    const form = new FormData();
    form.set("channelId", channel);
    form.set("text", draft.trim());
    if (replyTo) form.set("replyTo", replyTo.id);
    if (activeProject) form.set("projectId", activeProject);
    attachments.forEach((file) => form.append("files", file));
    try {
      const response = await fetch("/api/collaboration", { method: "POST", body: form });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.message);
      applySnapshot(payload);
      setDraft("");
      setAttachments([]);
      setReplyTo(null);
      setNotice("");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Không thể gửi tin nhắn.");
    } finally { setBusy(false); }
  };

  const attachFiles = (files?: FileList | null) => {
    if (!files?.length) return;
    const selected = Array.from(files).filter((file) => file.size <= 25 * 1024 * 1024);
    setAttachments((current) => [...current, ...selected].slice(0, 5));
  };

  const collaborationAction = async (action: string, data: Record<string, unknown> = {}) => {
    const response = await fetch("/api/collaboration", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action, channelId: channel, ...data }) });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.message ?? "Thao tác thất bại.");
    applySnapshot(payload);
    return payload;
  };

  const react = async (message: CollaborationMessage, emoji: string) => {
    try { await collaborationAction("react", { messageId: message.id, emoji }); } catch (error) { setNotice(error instanceof Error ? error.message : "Không thể thả cảm xúc."); }
  };

  const togglePin = async (message: CollaborationMessage) => {
    try { await collaborationAction("togglePin", { messageId: message.id }); } catch (error) { setNotice(error instanceof Error ? error.message : "Không thể ghim tin nhắn."); }
  };

  const createChannel = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    try {
      const payload = await collaborationAction("createChannel", newChannel);
      setChannel(payload.channelId);
      setNewChannel({ name: "", description: "" });
      setShowCreateChannel(false);
    } catch (error) { setNotice(error instanceof Error ? error.message : "Không thể tạo kênh."); }
    finally { setBusy(false); }
  };

  const deleteChannel = async () => {
    if (!confirm(`Xóa kênh #${channelInfo.name} và toàn bộ lịch sử?`)) return;
    try {
      await collaborationAction("deleteChannel", { channelId: channel });
      setChannel("general");
    } catch (error) { setNotice(error instanceof Error ? error.message : "Không thể xóa kênh."); }
  };

  const renameChannel = async (target: CollaborationChannel) => {
    const name = prompt("Tên mới của kênh", target.name)?.trim();
    if (!name || name === target.name) return;
    try { await collaborationAction("renameChannel", { channelId: target.id, name }); }
    catch (error) { setNotice(error instanceof Error ? error.message : "Không thể đổi tên kênh."); }
  };

  const authorName = (author: string) => members.find((member) => member.username === author)?.name ?? collaborationMembers.find((member) => member.username === author)?.name ?? author;
  const initialsFor = (author: string) => collaborationMembers.find((member) => member.username === author)?.initials ?? author.slice(0, 2).toUpperCase();

  return (
    <div className={`collaboration-workspace ${detailsOpen ? "" : "details-collapsed"}`}>
      <aside className="collab-rail">
        <header><div><span>TEAM SPACE</span><h1>Collaboration</h1></div><button aria-label="Tạo kênh" onClick={() => setShowCreateChannel(true)}><Plus size={17}/></button></header>
        <section>
          <div className="collab-section-title"><b>Kênh</b><small>{channels.length}</small></div>
          <nav>{channels.filter((item) => !item.id.startsWith("dm-")).map((item) => <button key={item.id} className={channel === item.id ? "active" : ""} onContextMenu={(event) => { event.preventDefault(); setChannelMenu({ x: event.clientX, y: event.clientY, channel: item }); }} onClick={() => { setChannel(item.id); setShowPins(false); setDetailView(null); }}><Hash size={16}/><span>{item.name}</span>{messages.some((message) => message.channel === item.id && message.author !== username) && <i/>}</button>)}</nav>
        </section>
        <section className="collab-direct">
          <div className="collab-section-title"><b>Tin nhắn trực tiếp</b><small>2</small></div>
          {members.filter((member) => member.username !== username).map((member) => <button key={member.username} className={channel === "dm-team" ? "active" : ""} onClick={() => { setChannel("dm-team"); setShowPins(false); setDetailView(null); }}><span className="member-avatar">{initialsFor(member.username)}</span><p><b>{member.name}</b><small>{member.online ? "Đang hoạt động" : member.lastSeenAt ? `Hoạt động ${new Intl.RelativeTimeFormat("vi", { numeric: "auto" }).format(-Math.max(1, Math.round((Date.now() - member.lastSeenAt) / 60000)), "minute")}` : "Chưa trực tuyến"}</small></p><i className={member.online ? "" : "offline"}/></button>)}
        </section>
        <div className="collab-sprint"><header><span>Current Sprint</span><b>{currentProject ? `${currentProject.progress}%` : "0%"}</b></header><i><b style={{ width: `${currentProject?.progress ?? 0}%` }}/></i><p>{currentProject?.title ?? "Chưa chọn project"}</p></div>
      </aside>

      <section className="collab-chat">
        <header className="collab-chat-head">
          <div><h2><Hash size={20}/>{channelInfo.name}</h2><p>{channelInfo.description}</p></div>
          <div className="collab-head-actions"><label><Search size={16}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm trong hội thoại..." /></label><button className={showPins ? "active" : ""} onClick={() => { setShowPins((value) => !value); setShowNotifications(false); }} title="Tin đã ghim"><Pin size={17}/>{pinnedMessages.length > 0 && <span>{pinnedMessages.length}</span>}</button><button className={showNotifications ? "active" : ""} onClick={() => { setShowNotifications((value) => !value); setShowPins(false); }} title="Thông báo"><Bell size={17}/>{messages.filter((message) => message.author !== username).length > 0 && <span>{messages.filter((message) => message.author !== username).length}</span>}</button><button onClick={() => setDetailsOpen((value) => !value)} title="Chi tiết kênh"><Info size={17}/></button></div>
        </header>

        {showPins && <div className="collab-pinned-panel"><header><b><Pin size={15}/> Tin nhắn đã ghim</b><button onClick={() => setShowPins(false)}><X size={15}/></button></header>{pinnedMessages.length ? pinnedMessages.map((message) => <button key={message.id} onClick={() => setShowPins(false)}><b>{authorName(message.author)}</b><span>{message.text || message.attachments?.[0]?.name}</span></button>) : <p>Chưa có tin nhắn được ghim.</p>}</div>}
        {showNotifications && <div className="collab-pinned-panel collab-notifications"><header><b><Bell size={15}/> Hoạt động mới</b><button onClick={() => setShowNotifications(false)}><X size={15}/></button></header>{messages.filter((message) => message.author !== username).slice(-8).reverse().map((message) => <button key={message.id} onClick={() => { setChannel(message.channel); setShowNotifications(false); }}><b>{authorName(message.author)} · {channels.find((item) => item.id === message.channel)?.name}</b><span>{message.text || message.attachments?.[0]?.name}</span></button>)}{!messages.some((message) => message.author !== username) && <p>Chưa có hoạt động mới.</p>}</div>}

        <div className="collab-message-list">
          {!channelMessages.length ? <div className="collab-welcome"><span><MessageCircle size={30}/></span><h2>Bắt đầu #{channelInfo.name}</h2><p>Trao đổi ý tưởng, gửi code, tài liệu và liên kết project với {otherMember.name}.</p><div><b>0</b> tin nhắn · <b>{members.filter((member) => member.online).length}</b> thành viên đang hoạt động</div></div> :
          channelMessages.map((message) => {
            const replied = messages.find((item) => item.id === message.replyTo);
            const linkedProject = projects.find((project) => project.id === message.projectId);
            return <article className="collab-message" key={message.id}>
              <div className="message-avatar">{initialsFor(message.author)}</div>
              <div className="message-content">
                {replied && <button className="message-reply-context" onClick={() => setReplyTo(replied)}><Reply size={12}/><b>{authorName(replied.author)}</b><span>{replied.text.slice(0, 90)}</span></button>}
                <header><b>{authorName(message.author)}</b>{message.author === username && <em>Bạn</em>}<time>{new Intl.DateTimeFormat("vi-VN", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit" }).format(new Date(message.createdAt))}</time>{message.pinned && <Pin size={12}/>}</header>
                {message.text && <p>{message.text}</p>}
                {!!message.attachments?.length && <div className="message-files">{message.attachments.map((file, index) => <a href={file.url} download={file.name} key={`${file.name}-${index}`}><span>{file.type.startsWith("image") ? <Image size={18}/> : file.type.startsWith("video") ? <MessageSquareText size={18}/> : file.name.match(/\.(py|cpp|c|js|ts|tsx)$/i) ? <FileCode2 size={18}/> : <FileText size={18}/>}</span><p><b>{file.name}</b><small>{typeof file.size === "number" ? (file.size < 1024 * 1024 ? `${Math.ceil(file.size / 1024)} KB` : `${(file.size / 1024 / 1024).toFixed(1)} MB`) : file.size}</small></p></a>)}</div>}
                {linkedProject && <div className="message-project"><BriefcaseBusiness size={16}/><p><small>Linked Project</small><b>{linkedProject.title}</b></p><span>{linkedProject.progress}%</span></div>}
                <div className="message-reactions">{Object.entries(message.reactions ?? {}).filter(([, users]) => users.length).map(([emoji, users]) => <button className={users.includes(username) ? "active" : ""} key={emoji} onClick={() => react(message, emoji)}>{emoji} {users.length}</button>)}</div>
              </div>
              <div className="message-hover-actions"><button onClick={() => react(message, "👍")} title="Thích">👍</button><button onClick={() => react(message, "🔥")} title="Tuyệt">🔥</button><button onClick={() => setReplyTo(message)} title="Phản hồi"><Reply size={15}/></button><button onClick={() => togglePin(message)} title="Ghim"><Pin size={15}/></button><button onClick={() => collaborationAction("deleteMessage", { messageId: message.id }).catch((error) => setNotice(error.message))} title="Xóa"><Trash2 size={15}/></button></div>
            </article>;
          })}
        </div>

        <form className="collab-composer" onSubmit={submitMessage}>
          {replyTo && <div className="composer-reply"><Reply size={14}/><span>Đang trả lời <b>{authorName(replyTo.author)}</b>: {replyTo.text.slice(0, 80)}</span><button type="button" onClick={() => setReplyTo(null)}><X size={14}/></button></div>}
          {!!attachments.length && <div className="composer-files">{attachments.map((file, index) => <span key={`${file.name}-${index}`}><FileText size={14}/>{file.name}<button type="button" onClick={() => setAttachments((items) => items.filter((_, itemIndex) => itemIndex !== index))}><X size={12}/></button></span>)}</div>}
          {projects.length > 0 && <label className="composer-project"><BriefcaseBusiness size={14}/><select value={activeProject} onChange={(event) => setActiveProject(event.target.value)}><option value="">Không gắn project</option>{projects.filter((project) => !project.archived).map((project) => <option value={project.id} key={project.id}>{project.title}</option>)}</select></label>}
          <div><label className="attach-button"><Paperclip size={18}/><input type="file" multiple onChange={(event) => attachFiles(event.target.files)}/></label><textarea rows={1} value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); event.currentTarget.form?.requestSubmit(); } }} placeholder={`Nhắn tin #${channelInfo.name}`} /><button type="button" className={showMentionPicker ? "active" : ""} title="Nhắc thành viên" onClick={() => { setShowMentionPicker((value) => !value); setShowEmojiPicker(false); }}><AtSign size={18}/></button><button type="button" className={showEmojiPicker ? "active" : ""} title="Thả cảm xúc" onClick={() => { setShowEmojiPicker((value) => !value); setShowMentionPicker(false); }}><Smile size={18}/></button><button className="send-button" type="submit" disabled={busy || (!draft.trim() && !attachments.length)}><Send size={17}/></button></div>
          {showMentionPicker && <div className="mention-picker"><b>Nhắc thành viên</b>{members.filter((member) => member.username !== username).map((member) => <button type="button" key={member.username} onClick={() => { setDraft((value) => `${value}@${member.name} `); setShowMentionPicker(false); }}><span className="member-avatar">{initialsFor(member.username)}</span><p><b>{member.name}</b><small>{member.online ? "Online" : "Offline"}</small></p></button>)}</div>}
          {showEmojiPicker && <div className="emoji-picker"><header><b>Emoji</b><button type="button" onClick={() => setShowEmojiPicker(false)}><X size={14}/></button></header><div>{["😀","😂","😍","🥳","😎","🤖","👀","👍","👏","🙌","🔥","✨","💜","💡","✅","🚀","🧠","⚙️","📌","🎯","🐍","💻","📚","🦾"].map((emoji) => <button type="button" key={emoji} onClick={() => { setDraft((value) => `${value}${emoji}`); setShowEmojiPicker(false); }}>{emoji}</button>)}</div></div>}
          {notice && <div className="collab-notice">{notice}<button type="button" onClick={() => setNotice("")}><X size={13}/></button></div>}
        </form>
      </section>

      {detailsOpen && <aside className="collab-details">
        <header><h2>Chi tiết kênh</h2><button onClick={() => setDetailsOpen(false)}><X size={18}/></button></header>
        <section className="channel-profile"><span><Hash size={22}/></span><h3>{channelInfo.name}</h3><p>{channelInfo.description}</p><small>Tạo bởi {authorName(channelInfo.createdBy ?? "levonghiahiep")} · Workspace riêng tư</small>{!["general","ai-perception","control-simulation","project-discussion","ideas","dm-team"].includes(channel) && <button className="delete-channel" onClick={deleteChannel}><Trash2 size={14}/> Xóa kênh</button>}</section>
        <section className="detail-links"><button onClick={() => setDetailView(detailView === "members" ? null : "members")} className={detailView === "members" ? "active" : ""}><UsersRound size={17}/><span>Thành viên</span><b>2</b></button><button onClick={() => setShowPins(true)}><Pin size={17}/><span>Pinned messages</span><b>{pinnedMessages.length}</b></button><button onClick={() => setDetailView(detailView === "files" ? null : "files")} className={detailView === "files" ? "active" : ""}><FileText size={17}/><span>File & media</span><b>{messages.filter((message) => message.channel === channel).reduce((sum, message) => sum + (message.attachments?.length ?? 0), 0)}</b></button><button onClick={() => setDetailView(detailView === "links" ? null : "links")} className={detailView === "links" ? "active" : ""}><Link2 size={17}/><span>Links</span><b>{messages.filter((message) => message.channel === channel && /https?:\/\//.test(message.text)).length}</b></button></section>
        {detailView === "files" ? <section className="detail-browser"><header><h3>File & media</h3><button onClick={() => setDetailView(null)}><X size={14}/></button></header>{channelMessages.flatMap((message) => message.attachments ?? []).length ? channelMessages.flatMap((message) => message.attachments ?? []).map((file, index) => <a href={file.url} download={file.name} key={`${file.name}-${index}`}><FileText size={15}/><span>{file.name}</span><small>{typeof file.size === "number" ? `${Math.ceil(file.size / 1024)} KB` : file.size}</small></a>) : <p>Chưa có file trong kênh này.</p>}</section> : detailView === "links" ? <section className="detail-browser"><header><h3>Links</h3><button onClick={() => setDetailView(null)}><X size={14}/></button></header>{channelMessages.flatMap((message) => message.text.match(/https?:\/\/[^\s]+/g) ?? []).length ? channelMessages.flatMap((message) => message.text.match(/https?:\/\/[^\s]+/g) ?? []).map((url, index) => <a href={url} target="_blank" rel="noreferrer" key={`${url}-${index}`}><Link2 size={15}/><span>{url}</span></a>) : <p>Chưa có liên kết trong kênh này.</p>}</section> : <section className="detail-members"><h3>Thành viên — 2</h3>{members.map((member) => <div key={member.username}><span className="member-avatar">{initialsFor(member.username)}</span><p><b>{member.name}</b><small><i className={member.online ? "" : "offline"}/> {member.online ? "Online" : member.lastSeenAt ? `Hoạt động lần cuối ${new Date(member.lastSeenAt).toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"})}` : "Chưa trực tuyến"} {member.username === username ? "· Bạn" : ""}</small></p>{member.username === "levonghiahiep" && <em>Owner</em>}</div>)}</section>}
        <section className="active-work"><h3><CheckSquare2 size={17}/> Active Work</h3>{currentProject ? <><b>{currentProject.title}</b><p>{currentProject.description || "Project Robotics đang thực hiện."}</p><div><i><b style={{ width: `${currentProject.progress}%` }}/></i><span>{currentProject.progress}%</span></div><small>{currentProject.taskCount ?? 0} tasks · {currentProject.technologies.slice(0, 2).join(" · ")}</small></> : <div className="detail-empty">Project đang thực hiện sẽ xuất hiện tại đây.</div>}</section>
        <section className="collab-activity"><h3>Hoạt động mới</h3><p><Activity size={15}/> {messages.length ? `${messages.length} tin nhắn trong workspace` : "Chưa có hoạt động mới"}</p><p><UsersRound size={15}/> {members.filter((member) => member.online).length} thành viên trực tuyến</p></section>
      </aside>}
      {showCreateChannel && <div className="collab-modal-backdrop" onMouseDown={() => setShowCreateChannel(false)}><form className="collab-channel-modal" onSubmit={createChannel} onMouseDown={(event) => event.stopPropagation()}><header><div><span>NEW CHANNEL</span><h2>Tạo kênh thảo luận</h2></div><button type="button" onClick={() => setShowCreateChannel(false)}><X size={18}/></button></header><label>Tên kênh<input autoFocus required maxLength={40} value={newChannel.name} onChange={(event) => setNewChannel({ ...newChannel, name: event.target.value })} placeholder="Ví dụ: Humanoid Locomotion"/></label><label>Mô tả<textarea maxLength={160} value={newChannel.description} onChange={(event) => setNewChannel({ ...newChannel, description: event.target.value })} placeholder="Kênh này dùng để trao đổi nội dung gì?"/></label><footer><button type="button" onClick={() => setShowCreateChannel(false)}>Hủy</button><button type="submit" disabled={busy || !newChannel.name.trim()}><Plus size={15}/> Tạo kênh</button></footer></form></div>}
      {channelMenu && <div className="channel-context-backdrop" onMouseDown={() => setChannelMenu(null)}><div className="channel-context-menu" style={{ left: Math.min(channelMenu.x, window.innerWidth - 270), top: Math.min(channelMenu.y, window.innerHeight - 470) }} onMouseDown={(event) => event.stopPropagation()}><header><Hash size={16}/><b>{channelMenu.channel.name}</b></header><button onClick={() => setChannelMenu(null)}>Mark as Read</button><hr/><button onClick={() => { navigator.clipboard.writeText(`${location.origin}/?channel=${channelMenu.channel.id}`); setChannelMenu(null); }}>Copy Link</button><button onClick={() => { navigator.clipboard.writeText(channelMenu.channel.id); setChannelMenu(null); }}>Copy Channel ID</button><button onClick={() => setChannelMenu(null)}>Pin Channel to Top</button><hr/><button onClick={() => setChannelMenu(null)}>Mute Channel</button><button onClick={() => setChannelMenu(null)}>Notification Settings</button><hr/><button onClick={() => { void renameChannel(channelMenu.channel); setChannelMenu(null); }}>Rename Channel</button>{!["general","ai-perception","control-simulation","project-discussion","ideas","dm-team"].includes(channelMenu.channel.id) && <button className="danger" onClick={() => { setChannel(channelMenu.channel.id); setChannelMenu(null); window.setTimeout(() => void deleteChannel(), 0); }}>Delete Channel</button>}</div></div>}
    </div>
  );
}

type RoboLearnSettings = {
  language: "vi" | "en";
  fontSize: number;
  startupPage: string;
  defaultTrack: "perception" | "control";
  difficulty: string;
  dailyGoal: number;
  learningTips: boolean;
  autoComplete: boolean;
  dailyReminder: boolean;
  xpAlerts: boolean;
  editorLanguage: string;
  editorFont: string;
  tabSize: number;
  wordWrap: boolean;
  autoSave: boolean;
  linting: boolean;
  markdownPreview: boolean;
  mathRendering: boolean;
  mermaid: boolean;
  spellCheck: boolean;
  notifications: boolean;
  achievementAlerts: boolean;
  projectAlerts: boolean;
  collaborationAlerts: boolean;
  projectPath: string;
  vaultPath: string;
  datasetPath: string;
  modelPath: string;
  simulationPath: string;
  exportFormat: string;
  autoClean: boolean;
  keepCache: boolean;
  localBackup: boolean;
};

const defaultRoboLearnSettings: RoboLearnSettings = {
  language: "vi",
  fontSize: 100,
  startupPage: "Dashboard",
  defaultTrack: "perception",
  difficulty: "Beginner",
  dailyGoal: 30,
  learningTips: true,
  autoComplete: false,
  dailyReminder: true,
  xpAlerts: true,
  editorLanguage: "Python",
  editorFont: "JetBrains Mono",
  tabSize: 4,
  wordWrap: true,
  autoSave: true,
  linting: true,
  markdownPreview: true,
  mathRendering: true,
  mermaid: true,
  spellCheck: false,
  notifications: true,
  achievementAlerts: true,
  projectAlerts: true,
  collaborationAlerts: true,
  projectPath: "D:\\RoboLearn\\Projects",
  vaultPath: "D:\\RoboLearn\\Knowledge",
  datasetPath: "D:\\RoboLearn\\Datasets",
  modelPath: "D:\\RoboLearn\\Models",
  simulationPath: "D:\\RoboLearn\\Simulation",
  exportFormat: "PDF",
  autoClean: true,
  keepCache: true,
  localBackup: true,
};

function SettingsToggle({ checked, onChange, label }: { checked: boolean; onChange: (value: boolean) => void; label: string }) {
  return <button type="button" role="switch" aria-checked={checked} aria-label={label} className={`settings-toggle ${checked ? "on" : ""}`} onClick={() => onChange(!checked)}><i /></button>;
}

function SettingsWorkspace({
  displayName,
  username,
  theme,
  onThemeChange,
}: {
  displayName: string;
  username: string;
  theme: DashboardTheme;
  onThemeChange: (theme: DashboardTheme) => void;
}) {
  const tabs = ["General", "Learning", "Editor & Markdown", "Notifications", "Paths", "Backup & Sync", "About"] as const;
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("General");
  const [settings, setSettings] = useState<RoboLearnSettings>(defaultRoboLearnSettings);
  const [saved, setSaved] = useState(false);
  const [lastBackup, setLastBackup] = useState<string | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem("robolearn-settings");
    const backup = window.localStorage.getItem("robolearn-settings-backup-time");
    if (stored) {
      try { setSettings({ ...defaultRoboLearnSettings, ...JSON.parse(stored) }); } catch { /* keep safe defaults */ }
    }
    if (backup) setLastBackup(backup);
  }, []);

  const update = <K extends keyof RoboLearnSettings>(key: K, value: RoboLearnSettings[K]) => {
    setSettings((current) => ({ ...current, [key]: value }));
    setSaved(false);
  };

  const saveSettings = () => {
    window.localStorage.setItem("robolearn-settings", JSON.stringify(settings));
    document.documentElement.style.setProperty("--robolearn-font-scale", String(settings.fontSize / 100));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };

  const exportSettings = () => {
    const blob = new Blob([JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), settings }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "robolearn-settings.json";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const createBackup = () => {
    const timestamp = new Date().toISOString();
    window.localStorage.setItem("robolearn-settings-backup", JSON.stringify(settings));
    window.localStorage.setItem("robolearn-settings-backup-time", timestamp);
    setLastBackup(timestamp);
  };

  const restoreBackup = () => {
    const backup = window.localStorage.getItem("robolearn-settings-backup");
    if (backup) setSettings({ ...defaultRoboLearnSettings, ...JSON.parse(backup) });
  };

  const resetSettings = () => {
    if (!window.confirm("Đặt lại toàn bộ tùy chọn về mặc định?")) return;
    setSettings(defaultRoboLearnSettings);
    onThemeChange("system");
    window.localStorage.removeItem("robolearn-settings");
  };

  const toggleRow = (title: string, description: string, key: keyof RoboLearnSettings) => (
    <div className="settings-row toggle-row"><div><b>{title}</b><small>{description}</small></div><SettingsToggle checked={Boolean(settings[key])} label={title} onChange={(value) => update(key, value as never)} /></div>
  );

  const selectRow = (title: string, key: keyof RoboLearnSettings, options: Array<[string, string]>) => (
    <label className="settings-row"><span>{title}</span><select value={String(settings[key])} onChange={(event) => update(key, event.target.value as never)}>{options.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
  );

  return (
    <section className="settings-workspace">
      <header className="settings-hero"><div className="settings-title-icon"><Settings size={25}/></div><div><span>PERSONAL WORKSPACE</span><h1>Settings</h1><p>Tùy chỉnh RoboLearn theo cách bạn học, viết code và xây dựng robot.</p></div><div className="settings-save-state">{saved ? "✓ Đã lưu" : "Thay đổi được lưu trên thiết bị này"}</div></header>
      <nav className="settings-tabs" aria-label="Settings sections">{tabs.map((tab) => <button className={activeTab === tab ? "active" : ""} onClick={() => setActiveTab(tab)} key={tab}>{tab}</button>)}</nav>

      {activeTab === "General" && <div className="settings-grid">
        <section className="settings-card profile-settings"><header><Info size={18}/><h2>Profile</h2></header><div className="settings-profile-avatar">{displayName.split(" ").map((part) => part[0]).join("")}</div><label><span>Display name</span><input value={displayName} readOnly /></label><label><span>Username</span><input value={username} readOnly /></label><label><span>Role</span><input value="Student" readOnly /></label><small>Tài khoản được chủ sở hữu hệ thống quản lý trực tiếp.</small></section>
        <section className="settings-card"><header><Palette size={18}/><h2>Appearance</h2></header><span className="settings-label">Theme</span><div className="theme-choice"><button className={theme === "dark" ? "active" : ""} onClick={() => onThemeChange("dark")}><Moon size={20}/>Dark</button><button className={theme === "light" ? "active" : ""} onClick={() => onThemeChange("light")}><Sun size={20}/>Light</button><button className={theme === "system" ? "active" : ""} onClick={() => onThemeChange("system")}><Monitor size={20}/>System</button></div>{selectRow("Language", "language", [["vi","Tiếng Việt"],["en","English"]])}<label className="settings-row range-row"><span>Font size <b>{settings.fontSize}%</b></span><input type="range" min="90" max="115" step="5" value={settings.fontSize} onChange={(event) => update("fontSize", Number(event.target.value))} /></label>{selectRow("Startup page", "startupPage", [["Dashboard","Dashboard"],["Learning","Learning"],["Roadmap","Roadmap"]])}</section>
        <section className="settings-card"><header><FolderOpen size={18}/><h2>Workspace & Files</h2></header><label className="settings-row path-input"><span>Project folder</span><input value={settings.projectPath} onChange={(event) => update("projectPath", event.target.value)} /></label>{selectRow("Default export format", "exportFormat", [["PDF","PDF"],["Markdown","Markdown"],["JSON","JSON"]])}{toggleRow("Auto clean build files", "Tự dọn file build tạm sau khi hoàn tất.", "autoClean")}{toggleRow("Keep simulation cache", "Giữ cache để tăng tốc lần chạy tiếp theo.", "keepCache")}</section>
        <section className="settings-card"><header><Cloud size={18}/><h2>Privacy & Storage</h2></header><div className="settings-notice"><b>Private workspace</b><p>Thiết lập hiện được lưu cục bộ trong trình duyệt. Không có dữ liệu giả về CPU, RAM hoặc dung lượng.</p></div>{toggleRow("Local backup", "Cho phép tạo bản sao cấu hình trên thiết bị.", "localBackup")}<div className="settings-row"><span>Account access</span><b>Owner-managed</b></div><div className="settings-row"><span>Session</span><b>Private</b></div></section>
      </div>}

      {activeTab === "Learning" && <div className="settings-grid settings-grid-three">
        <section className="settings-card"><header><GraduationCap size={18}/><h2>Learning Preferences</h2></header>{selectRow("Default learning track", "defaultTrack", [["perception","AI Perception"],["control","Control & Simulation"]])}{selectRow("Default difficulty", "difficulty", [["Beginner","Beginner"],["Intermediate","Intermediate"],["Advanced","Advanced"]])}<label className="settings-row"><span>Daily goal</span><select value={settings.dailyGoal} onChange={(e) => update("dailyGoal", Number(e.target.value))}><option value={15}>15 phút</option><option value={30}>30 phút</option><option value={60}>60 phút</option><option value={90}>90 phút</option></select></label></section>
        <section className="settings-card"><header><Lightbulb size={18}/><h2>Learning Assistance</h2></header>{toggleRow("Show learning tips", "Hiển thị gợi ý trong bài học và project.", "learningTips")}{toggleRow("Auto mark lesson complete", "Chỉ hoàn thành khi tất cả testcase đã đạt.", "autoComplete")}{toggleRow("Daily goal reminder", "Nhắc khi mục tiêu ngày chưa hoàn thành.", "dailyReminder")}{toggleRow("XP notifications", "Hiển thị XP sau bài học hoặc task.", "xpAlerts")}</section>
        <section className="settings-card"><header><Target size={18}/><h2>Progress Rules</h2></header><div className="settings-notice"><b>Tiến độ dựa trên dữ liệu thật</b><p>Module chỉ tăng tiến độ khi bài học hoặc task tương ứng thực sự hoàn thành.</p></div><div className="settings-row"><span>Learning progress</span><b>0%</b></div><div className="settings-row"><span>Current XP</span><b>0 XP</b></div><div className="settings-row"><span>Current streak</span><b>0 days</b></div></section>
      </div>}

      {activeTab === "Editor & Markdown" && <div className="settings-grid settings-grid-three">
        <section className="settings-card"><header><PencilLine size={18}/><h2>Code Editor</h2></header>{selectRow("Default language", "editorLanguage", [["Python","Python"],["C++","C++"],["C","C"],["Bash","Bash"]])}{selectRow("Editor font", "editorFont", [["JetBrains Mono","JetBrains Mono"],["Geist Mono","Geist Mono"],["Fira Code","Fira Code"]])}<label className="settings-row"><span>Tab size</span><select value={settings.tabSize} onChange={(e) => update("tabSize", Number(e.target.value))}><option value={2}>2 spaces</option><option value={4}>4 spaces</option><option value={8}>8 spaces</option></select></label>{toggleRow("Word wrap", "Ngắt dòng dài trong editor.", "wordWrap")}{toggleRow("Auto-save", "Tự động lưu nội dung đang soạn.", "autoSave")}{toggleRow("Code linting", "Kiểm tra lỗi cú pháp khi viết code.", "linting")}</section>
        <section className="settings-card"><header><FileCode2 size={18}/><h2>Markdown</h2></header>{toggleRow("Live preview", "Xem trước Markdown trong thời gian thực.", "markdownPreview")}{toggleRow("Math rendering", "Hiển thị công thức LaTeX/KaTeX.", "mathRendering")}{toggleRow("Mermaid diagrams", "Hiển thị sơ đồ Mermaid trong ghi chú.", "mermaid")}{toggleRow("Spell check", "Kiểm tra chính tả nội dung ghi chú.", "spellCheck")}</section>
        <section className="settings-card editor-preview"><header><Code2 size={18}/><h2>Preview</h2></header><pre><span>def</span> control(robot):{"\n"}    <i># RoboLearn editor</i>{"\n"}    robot.step()</pre><div className="markdown-sample"><b>Markdown Preview</b><p>Equations, diagrams and robotics notes appear here.</p><code>τ = M(q)q̈ + C(q,q̇)q̇ + g(q)</code></div></section>
      </div>}

      {activeTab === "Notifications" && <div className="settings-grid settings-grid-three">
        <section className="settings-card"><header><Bell size={18}/><h2>Notification Center</h2></header>{toggleRow("Enable notifications", "Bật thông báo trong RoboLearn.", "notifications")}{toggleRow("Achievements & XP", "Thông báo thành tích, level và XP.", "achievementAlerts")}{toggleRow("Project updates", "Nhắc deadline và thay đổi task.", "projectAlerts")}{toggleRow("Collaboration", "Thông báo lời mời và phản hồi nhóm.", "collaborationAlerts")}</section>
        <section className="settings-card"><header><GraduationCap size={18}/><h2>Learning Reminders</h2></header>{toggleRow("Daily learning reminder", "Nhắc mục tiêu học tập mỗi ngày.", "dailyReminder")}{toggleRow("Learning tips", "Gợi ý nội dung nên học tiếp.", "learningTips")}{toggleRow("XP summary", "Hiển thị XP nhận được sau mỗi hoạt động.", "xpAlerts")}</section>
        <section className="settings-card"><header><Info size={18}/><h2>Delivery</h2></header><div className="settings-notice"><b>In-app only</b><p>Website hiện chỉ gửi thông báo bên trong ứng dụng. Email và push notification chưa được kết nối nên không hiển thị như đã hoạt động.</p></div></section>
      </div>}

      {activeTab === "Paths" && <div className="settings-grid settings-grid-two">
        <section className="settings-card"><header><FolderOpen size={18}/><h2>Workspace Paths</h2></header>{([["Project folder","projectPath"],["Knowledge Vault","vaultPath"],["Datasets","datasetPath"],["Model cache","modelPath"],["Simulation assets","simulationPath"]] as Array<[string, keyof RoboLearnSettings]>).map(([label,key]) => <label className="path-field" key={key}><span>{label}</span><input value={String(settings[key])} onChange={(e) => update(key, e.target.value as never)} /></label>)}</section>
        <section className="settings-card"><header><Info size={18}/><h2>Path Behavior</h2></header><div className="settings-notice"><b>Desktop workspace paths</b><p>Các đường dẫn này là tùy chọn cấu hình. Trình duyệt không tự ý truy cập file trên máy tính; quyền truy cập chỉ được yêu cầu khi bạn chủ động mở hoặc nhập file.</p></div>{toggleRow("Auto clean build files", "Dọn artifact tạm sau build.", "autoClean")}{toggleRow("Keep simulation cache", "Giữ cache MuJoCo/Gazebo/Isaac để tải nhanh.", "keepCache")}</section>
      </div>}

      {activeTab === "Backup & Sync" && <div className="settings-grid settings-grid-three">
        <section className="settings-card"><header><Save size={18}/><h2>Local Backup</h2></header><p className="settings-copy">Tạo một snapshot cấu hình ngay trong trình duyệt này.</p><button className="settings-primary" onClick={createBackup}>Tạo backup ngay</button><div className="settings-row"><span>Backup gần nhất</span><b>{lastBackup ? new Date(lastBackup).toLocaleString("vi-VN") : "Chưa có"}</b></div>{lastBackup && <button className="settings-secondary" onClick={restoreBackup}>Khôi phục backup</button>}</section>
        <section className="settings-card"><header><Cloud size={18}/><h2>Sync Status</h2></header><div className="settings-notice"><b>Cloud sync chưa kết nối</b><p>Cấu hình hiện chỉ tồn tại trên thiết bị này. RoboLearn sẽ không giả lập trạng thái đồng bộ khi chưa có backend.</p></div></section>
        <section className="settings-card"><header><FileCode2 size={18}/><h2>Export & Reset</h2></header><button className="settings-secondary" onClick={exportSettings}>Export settings (.json)</button><button className="settings-danger" onClick={resetSettings}><RotateCcw size={15}/> Reset all settings</button></section>
      </div>}

      {activeTab === "About" && <div className="settings-grid settings-grid-two">
        <section className="settings-card about-product"><div className="dash-r">R</div><h2>RoboLearn</h2><p>Private robotics learning workspace for Humanoid AI Perception, Control and Simulation.</p><dl><div><dt>Version</dt><dd>0.32</dd></div><div><dt>Access</dt><dd>Private</dd></div><div><dt>Curriculum</dt><dd>AI Perception · Control & Simulation</dd></div></dl></section>
        <section className="settings-card"><header><Info size={18}/><h2>Platform Information</h2></header><div className="settings-notice"><b>Honest system state</b><p>RoboLearn chỉ hiển thị dữ liệu học tập, backup và kết nối đã thực sự tồn tại. Các chỉ số hệ thống không được giả lập.</p></div><div className="settings-row"><span>Authentication</span><b>Owner-managed accounts</b></div><div className="settings-row"><span>Registration</span><b>Disabled</b></div><div className="settings-row"><span>Theme</span><b>{theme}</b></div></section>
      </div>}

      <footer className="settings-actions"><button className="settings-secondary" onClick={exportSettings}>Export settings</button><button className="settings-primary" onClick={saveSettings}>{saved ? "Đã lưu" : "Lưu thay đổi"}</button></footer>
    </section>
  );
}

function RoboDashboard({ username, onLogout }: { username: string; onLogout: () => void }) {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [roadmapTrack, setRoadmapTrack] = useState<"perception" | "control">("perception");
  const [selectedLearningModule, setSelectedLearningModule] = useState<CurriculumModule | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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
    <main className={`robo-dashboard real-dashboard theme-${resolvedTheme} ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      <aside className="dash-sidebar">
        <button className="sidebar-collapse-button" onClick={() => setSidebarCollapsed((value) => !value)} title={sidebarCollapsed ? "Mở sidebar" : "Thu gọn sidebar"}>{sidebarCollapsed ? <PanelLeftOpen size={18}/> : <PanelLeftClose size={18}/>}</button>
        <div className="dash-brand"><div className="dash-r">R</div><div><b>RoboLearn</b><small>Learn · Build · Innovate</small></div></div>
        <nav className="dash-nav" aria-label="Điều hướng chính">
          {premiumDashboardNav.map(({ Icon, label }) => (
            <button
              key={label}
              className={activeNav === label ? "active" : ""}
              onClick={() => setActiveNav(label)}
              aria-label={label}
              title={sidebarCollapsed ? label : undefined}
            >
              <span><Icon size={20} strokeWidth={1.8} aria-hidden="true" /></span>
              <span className="dash-nav-label">{label}</span>
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
          <LearningWorkspace initialModule={selectedLearningModule} onModuleClosed={() => setSelectedLearningModule(null)} onOpenRoadmap={(track) => { setRoadmapTrack(track); setActiveNav("Roadmap"); }} />
        ) : activeNav === "Roadmap" ? (
          <RoadmapWorkspace initialTrack={roadmapTrack} onOpenModule={(module) => { setSelectedLearningModule(module); setActiveNav("Learning"); }} />
        ) : activeNav === "Projects" ? (
          <ProjectsWorkspace />
        ) : activeNav === "Collaboration" ? (
          <CollaborationWorkspace username={username} displayName={displayName} />
        ) : activeNav === "Settings" ? (
          <SettingsWorkspace displayName={displayName} username={username} theme={theme} onThemeChange={setTheme} />
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
                {[
                  { label: "Learning", icon: BookOpen },
                  { label: "Projects", icon: BriefcaseBusiness },
                  { label: "Knowledge Vault", icon: Library },
                  { label: "Roadmap", icon: Map },
                ].map(({ label, icon: QuickIcon }) =>
                  <button key={label} onClick={() => setActiveNav(label)}><span><QuickIcon size={19}/></span>{label}</button>
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
