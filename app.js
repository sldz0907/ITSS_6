import { createElement } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { SocialFeed } from "./src/SocialFeed.jsx";
import { SocialFeedLayout } from "./src/SocialFeedLayout.tsx";
import "./src/sqb-tokens.css";
import "./styles.css";

"use strict";

const icons = {
  book: '<path d="M12 7v13M3 5c3-1 6-.5 9 2 3-2.5 6-3 9-2v13c-3-1-6-.5-9 2-3-2.5-6-3-9-2z"/>',
  home: '<path d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 21v-7h6v7"/>',
  list: '<rect x="4" y="4" width="16" height="17" rx="2"/><path d="M9 4V2m6 2V2M8 10l1 1 2-2m2 1h4m-9 6 1 1 2-2m2 1h4"/>',
  chat: '<path d="M20 11a7.9 7.9 0 0 1-8 8H4l1.5-4A8 8 0 1 1 20 11Z"/><path d="M8 11h.01m4 0h.01m4 0h.01"/>',
  arrow: '<path d="M4 12h15m-6-6 6 6-6 6"/>',
  back: '<path d="M20 12H5m6-6-6 6 6 6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  spark: '<path d="M12 2c0 6 4 10 10 10-6 0-10 4-10 10 0-6-4-10-10-10 6 0 10-4 10-10Z"/>',
  bars: '<path d="M3 3v18h18M8 16v-3m5 3V9m5 7V6"/>',
  people: '<circle cx="9" cy="8" r="3"/><path d="M3 20v-2a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v2M16 5a3 3 0 0 1 0 6m5 9v-2a5 5 0 0 0-3-4.6"/>',
  download: '<path d="M12 3v12m-4-4 4 4 4-4M4 16v4h16v-4"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  send: '<path d="m3 4 18 8-18 8 3-8zM6 12h15"/>',
};

function icon(name) {
  return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;
}

const mentors = [
  { id: "linh", name: "Ngọc Linh", initials: "NL", color: "mint", role: "Kỹ năng học tập" },
  { id: "huy", name: "Đức Huy", initials: "DH", color: "sky", role: "Quản lý thời gian" },
];

const resources = [
  {
    id: "active-recall", topic: "Phương pháp học", title: "Học ít hơn, nhớ lâu hơn",
    method: "Active Recall", subtitle: "3 bước thực hành Active Recall", time: "5 phút đọc", mentor: "linh",
    intro: "Bạn vừa đọc xong một chương nhưng hôm sau lại quên gần hết? Hãy thử tự nhớ lại kiến thức bằng vài câu hỏi ngắn.",
    steps: ["Đọc một phần ngắn và viết ra 3 câu hỏi về ý chính.", "Đóng tài liệu và trả lời từng câu bằng lời của bạn.", "Đối chiếu câu trả lời, ghi lại phần còn thiếu và thử lại vào ngày mai."],
    task: "Thử Active Recall với một bài đã học",
  },
  {
    id: "pomodoro", topic: "Quản lý thời gian", title: "Tập trung trong 25 phút",
    method: "Pomodoro", subtitle: "Một cách chia nhỏ buổi học", time: "4 phút đọc", mentor: "huy",
    intro: "Khi khó bắt đầu, hãy thu nhỏ mục tiêu thành một phiên tập trung cho đúng một việc.",
    steps: ["Chọn một việc có thể bắt đầu ngay.", "Đặt hẹn giờ 25 phút, tắt thông báo và chỉ làm việc đã chọn.", "Nghỉ 5 phút rồi quyết định có tiếp tục phiên mới hay không."],
    task: "Hoàn thành một phiên Pomodoro 25 phút",
  },
  {
    id: "first-step", topic: "Động lực học tập", title: "Bắt đầu bằng 5 phút",
    method: "Quy tắc 5 phút", subtitle: "Một bước nhỏ để bắt nhịp", time: "3 phút đọc", mentor: "linh",
    intro: "Nếu mục tiêu hôm nay có vẻ quá lớn, hãy thử chọn một việc bạn làm được trong 5 phút.",
    steps: ["Viết ra việc đang khiến bạn ngại bắt đầu.", "Chọn bước đầu tiên thật cụ thể, chẳng hạn làm một câu hoặc đọc một trang.", "Đặt hẹn giờ 5 phút và bắt đầu. Khi hết giờ, ghi lại bước tiếp theo."],
    task: "Dành 5 phút cho bước đầu tiên của một việc khó",
  },
];

const initialState = {
  tasks: [
    { id: "week", text: "Đặt mục tiêu học tập trong tuần", done: true },
    { id: "review", text: "Ôn lại ghi chú của buổi học gần nhất", done: false },
    { id: "practice", text: "Dành 25 phút làm bài tập thực hành", done: false },
  ],
  threads: [{
    id: "focus", title: "Làm sao để tập trung khi tự học ở nhà?",
    problem: "Mình thường mở điện thoại giữa chừng khi đang ôn bài. Mọi người có cách nào giúp duy trì sự tập trung không?",
    author: "Khánh Vy", initials: "KV", color: "peach", mentor: "huy", resource: "pomodoro",
    messages: [{
      text: "Thử chọn một nhiệm vụ nhỏ, để điện thoại ngoài tầm tay và đặt hẹn giờ 25 phút. Sau phiên đầu tiên, ghi lại điều đã làm bạn mất tập trung để điều chỉnh nhé.",
    }],
  }],
};

const storageKey = "cung-hoc-mvp-v1";
let storageAvailable = true;
let state = structuredClone(initialState);
try {
  const stored = JSON.parse(localStorage.getItem(storageKey));
  if (stored && Array.isArray(stored.tasks) && Array.isArray(stored.threads)) state = stored;
} catch {
  storageAvailable = false;
}

const workspace = createRoot(document.querySelector("#workspace"));
flushSync(() => workspace.render(createElement(SocialFeedLayout)));
const main = document.querySelector("#main");
let feedRoot;
const topNav = document.querySelector("#top-nav");
const sidebar = document.querySelector("#sidebar");
const context = document.querySelector("#context");
const toast = document.querySelector("#toast");
const me = { name: "Minh Anh", initials: "MA", color: "lilac" };
const navigation = [
  { page: "home", icon: "home", label: "Khám phá" },
  { page: "plan", icon: "list", label: "Kế hoạch" },
  { page: "ask", icon: "chat", label: "Hỏi mentor" },
];
let toastTimer;

function escapeText(value = "") {
  const characters = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return String(value).replace(/[&<>"']/g, character => characters[character]);
}

function save() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
    storageAvailable = true;
  } catch {
    storageAvailable = false;
  }
}

function notify(message) {
  toast.textContent = storageAvailable ? message : `${message} Dữ liệu chỉ lưu trong phiên này.`;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 3600);
}

function avatar(person) {
  return `<span class="avatar ${escapeText(person.color)}" aria-hidden="true">${escapeText(person.initials)}</span>`;
}

function mentorFor(id) {
  return mentors.find(mentor => mentor.id === id) ?? mentors[0];
}

function resourceFor(id) {
  return resources.find(resource => resource.id === id);
}

function link(href, label, symbol, variant = "") {
  return `<a class="button ${variant}" href="${href}">${symbol ? icon(symbol) : ""}${label}</a>`;
}

function back(href, label) {
  return `<a class="back" href="${href}">${icon("back")}${label}</a>`;
}

function badge(label, variant = "") {
  return `<span class="badge ${variant}">${escapeText(label)}</span>`;
}

function renderNav(page, filter) {
  const section = { resource: "home", thread: "home", result: "home" }[page] ?? page;
  const navLink = (item, className) => {
    const active = item.page === section;
    return `<a class="${className}${active ? " active" : ""}" href="#${item.page}"${active ? ' aria-current="page"' : ""}>${icon(item.icon)}${item.label}</a>`;
  };
  topNav.innerHTML = navigation.map(item => navLink(item, "top-link")).join("");
  const colors = ["#3a8c77", "#6c6acf", "#c66f2c"];
  sidebar.innerHTML = `
    <div class="side-profile">${avatar(me)}<div><strong>Minh Anh</strong><span class="muted small">Tài khoản mẫu</span></div></div>
    <p class="side-label">Lối tắt</p>
    <nav aria-label="Không gian của bạn">${navigation.map(item => navLink(item, "side-link")).join("")}<a class="side-link${filter === "mine" ? " active" : ""}" href="#home/mine">${icon("people")} Vướng mắc của tôi</a></nav>
    <hr class="side-divider">
    <p class="side-label">Chủ đề học tập</p>
    <nav aria-label="Chủ đề học tập">${resources.map((resource, index) => `
      <a class="side-link${filter === resource.id ? " active" : ""}" href="#home/${resource.id}"${filter === resource.id ? ' aria-current="true"' : ""}>
        <span class="topic-dot" style="--topic-color:${colors[index]}"></span>${resource.topic}
      </a>`).join("")}</nav>`;
}

function progress() {
  const done = state.tasks.filter(task => task.done).length;
  const total = state.tasks.length;
  const percent = total ? Math.round(done / total * 100) : 0;
  return `<div class="progress-info"><span class="muted small">${done}/${total} mục hoàn thành</span><strong>${percent}%</strong></div>
    <div class="progress-track" role="progressbar" aria-label="Tiến độ kế hoạch" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100">
      <div class="progress-fill" style="width:${percent}%"></div>
    </div>`;
}

function renderContext() {
  context.innerHTML = `
    <section class="card widget">
      <div class="widget-title"><span class="tile-icon">${icon("bars")}</span><h2>Tiến độ của bạn</h2></div>
      ${progress()}
      ${link("#plan", "Mở kế hoạch", "arrow", "soft full")}
    </section>
    <section class="card widget">
      <div class="widget-title"><span class="tile-icon green">${icon("people")}</span><h2>Mentor đồng hành</h2></div>
      <div class="mentors">${mentors.map(mentor => `<a class="person" href="#ask/mentor/${mentor.id}">
        ${avatar(mentor)}<div><strong>${mentor.name}</strong><span class="muted small">${mentor.role}</span></div>
      </a>`).join("")}</div>
      ${link("#ask", "Đặt câu hỏi", "chat", "outline full")}
    </section>
    `;
}

function resourcePost(resource) {
  const mentor = mentorFor(resource.mentor);
  return {
    person: mentor,
    meta: `Mentor · ${mentor.role}`,
    label: "Tài liệu",
    tone: "green",
    text: resource.intro,
    attachment: resource,
    href: `#resource/${resource.id}`,
    count: resource.time,
    action: "Xem tài liệu",
  };
}

function threadPost(thread) {
  const shared = thread.result?.shared;
  return {
    person: { ...thread, name: thread.author },
    meta: shared ? "Kinh nghiệm học tập" : "Cộng đồng hỏi đáp",
    label: shared ? "Kết quả" : thread.result ? "Đã giải quyết" : "Hỏi đáp",
    tone: thread.result ? "green" : "orange",
    title: thread.title,
    text: shared ? thread.result.summary : thread.problem,
    href: `#thread/${encodeURIComponent(thread.id)}`,
    count: `${thread.messages.length} phản hồi`,
    action: "Xem trao đổi",
  };
}

function searchable(value) {
  return value.toLocaleLowerCase("vi").normalize("NFD").replace(/\p{M}/gu, "").replaceAll("đ", "d");
}

const feedFilters = [["", "Tất cả"], ["resources", "Tài liệu"], ["questions", "Hỏi đáp"], ["mine", "Của tôi"]];

function feedUrl(filter, query = "") {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  return `#home${filter ? `/${filter}` : ""}${query ? `?${params}` : ""}`;
}

function feedProps(filter, query) {
  const chosen = resourceFor(filter);
  const terms = searchable(query).split(/\s+/).filter(Boolean);
  const matches = fields => {
    const text = searchable(fields.join(" "));
    return terms.every(term => text.includes(term));
  };
  const resourcePosts = (chosen ? [chosen] : resources)
    .filter(resource => matches([resource.title, resource.method, resource.topic, resource.intro]))
    .map(resourcePost);
  const threads = state.threads.filter(thread => matches([
    thread.title, thread.problem, thread.author, thread.result?.shared ? thread.result.summary : "",
  ]));
  let posts;
  if (chosen || filter === "resources") posts = resourcePosts;
  else if (filter === "questions") posts = threads.map(threadPost);
  else if (filter === "mine") posts = threads.filter(thread => thread.author === me.name).map(threadPost);
  else posts = [
    ...threads.filter(thread => thread.id !== "focus").map(threadPost),
    ...resourcePosts.slice(0, 1),
    ...threads.filter(thread => thread.id === "focus").map(threadPost),
    ...resourcePosts.slice(1),
  ];
  return {
    title: chosen ? chosen.topic : "Bảng tin học tập",
    user: me,
    query,
    filter,
    filters: feedFilters.map(([id, label]) => ({ id, label, href: feedUrl(id, query) })),
    clearUrl: feedUrl(filter),
    posts,
  };
}

function resourceDetail(resource) {
  const added = state.tasks.some(task => task.id === resource.id);
  return `${back("#home/resources", "Tất cả tài liệu")}
    <section class="card section stack">
      <div class="page-head">${badge(resource.topic, "green")}<h1>${resource.method}</h1><p>${resource.intro}</p></div>
      <div><h2>Cách thực hiện</h2><ol class="steps">${resource.steps.map(step => `<li>${step}</li>`).join("")}</ol></div>
      <div class="actions section-divider">
        ${added ? link("#plan", "Đã thêm · Mở kế hoạch", "check", "soft") : `<button class="button" type="button" data-add-resource="${resource.id}">${icon("plus")} Áp dụng vào kế hoạch</button>`}
        <button class="button outline" type="button" data-download="${resource.id}">${icon("download")} Tải tài liệu</button>
      </div>
    </section>`;
}

function plan(editId) {
  const editing = state.tasks.find(task => task.id === editId);
  return `<section class="card section stack">
    <div class="page-head">${badge("Tiến độ cá nhân")}<h1>Kế hoạch của tôi</h1><p>Chia nhỏ việc học và đánh dấu từng bước bạn đã hoàn thành.</p></div>
    ${progress()}
    <div><h2>Việc cần làm</h2>
      ${state.tasks.map(task => `<div class="task-row">
        <label class="task${task.done ? " done" : ""}">
          <input type="checkbox" data-task="${escapeText(task.id)}"${task.done ? " checked" : ""}><span>${escapeText(task.text)}</span>
        </label>
        <a class="task-edit" href="#plan/${encodeURIComponent(task.id)}" aria-label="Sửa mục tiêu ${escapeText(task.text)}">Sửa</a>
      </div>`).join("")}
    </div>
    <form class="task-form" id="task-form"${editing ? ` data-edit-id="${escapeText(editing.id)}"` : ""}>
      <input name="task" aria-label="${editing ? "Sửa mục tiêu" : "Mục tiêu mới"}" placeholder="Viết một mục tiêu nhỏ..." required maxlength="150" value="${escapeText(editing?.text)}">
      ${editing ? `<button class="button" type="submit">Lưu</button>${link("#plan", "Hủy", "", "outline")}`
        : `<button class="button" type="submit">${icon("plus")} Thêm</button>`}
    </form>
    <div class="actions section-divider">
      ${link("#ask/plan", "Hỏi mentor về kế hoạch", "chat", "soft")}
      ${link("#home/resources", "Xem tài liệu gợi ý", "book", "outline")}
      ${link("#home/mine", "Vướng mắc của tôi", "chat", "outline")}
    </div>
  </section>`;
}

function ask(origin, id) {
  const fromPlan = origin === "plan";
  return `${back(fromPlan ? "#plan" : "#home", fromPlan ? "Kế hoạch của tôi" : "Về bảng tin")}
    <section class="card section stack">
      <div class="page-head">${badge("Kết nối mentor", "orange")}<h1>Đăng vướng mắc</h1><p>Mô tả bước bạn đang mắc để mentor có thể gợi ý việc tiếp theo.</p></div>
      <p class="notice">Bản MVP hiển thị phản hồi mẫu theo chủ đề của mentor bạn chọn.</p>
      <form id="ask-form" class="stack">
        <label class="field"><span>Tiêu đề</span><input name="title" placeholder="Mình khó tập trung khi ôn bài" required maxlength="110"></label>
        <label class="field"><span>Bạn đang gặp khó khăn gì?</span><textarea name="problem" placeholder="Bạn đã thử làm gì và đang vướng ở bước nào?" required maxlength="1400"></textarea></label>
        <label class="field"><span>Chọn mentor</span><select name="mentor">
          ${mentors.map(mentor => `<option value="${mentor.id}"${origin === "mentor" && id === mentor.id ? " selected" : ""}>${mentor.name} · ${mentor.role}</option>`).join("")}
        </select></label>
        <div class="actions">
          <button class="button" type="submit">${icon("send")} Đăng và xem phản hồi</button>
          ${link(fromPlan ? "#plan" : "#home", "Hủy", "", "outline")}
        </div>
      </form>
    </section>`;
}

function message(person, content, mine = false) {
  return `<div class="message${mine ? " mine" : ""}">${avatar(person)}<div class="message-body"><strong>${escapeText(person.name)}</strong><p>${escapeText(content)}</p></div></div>`;
}

function discussion(thread) {
  const mentor = mentorFor(thread.mentor);
  const resource = resourceFor(thread.resource);
  return `${back("#home/questions", "Về bảng tin hỏi đáp")}
    <section class="card section stack">
      <div class="page-head">
        ${thread.result ? badge("Đã giải quyết", "green") : badge("Đang trao đổi", "orange")}
        <h1>${escapeText(thread.title)}</h1><p>Trao đổi cùng mentor ${mentor.name}</p>
      </div>
      ${message({ ...thread, name: thread.author }, thread.problem, thread.author === me.name)}
      <div class="stack section-divider" id="messages" aria-label="Phản hồi">
        ${thread.messages.map(item => message(item.mine ? me : { ...mentor, name: `${mentor.name} · Phản hồi mẫu` }, item.text, item.mine)).join("")}
      </div>
      ${resource ? `<div class="actions">${link(`#resource/${resource.id}`, "Xem tài liệu gợi ý", "book", "soft")}</div>` : ""}
      ${thread.result ? `<div class="notice success">
        <strong>Kết quả · ${thread.result.rating}/5</strong><p>${escapeText(thread.result.summary)}</p>
      </div>${link("#plan", "Về kế hoạch của tôi", "list", "soft")}` : `
        <form id="reply-form" class="stack section-divider" data-id="${escapeText(thread.id)}">
          <label class="field"><span>Phản hồi của bạn</span><textarea name="reply" placeholder="Viết câu hỏi tiếp theo hoặc chia sẻ điều bạn đã thử..." required maxlength="1400"></textarea></label>
          <div class="actions"><button class="button" type="submit">${icon("send")} Gửi phản hồi</button></div>
        </form>
        ${thread.author === me.name ? `<div class="actions">${link(`#result/${encodeURIComponent(thread.id)}`, "Đã giải quyết · Ghi nhận kết quả", "check", "outline")}</div>` : ""}
      `}
    </section>`;
}

function result(thread) {
  const href = `#thread/${encodeURIComponent(thread.id)}`;
  if (thread.result || thread.author !== me.name) return discussion(thread);
  return `${back(href, "Quay lại cuộc trao đổi")}
    <section class="card section stack">
      <div class="page-head">${badge("Tổng kết", "green")}<h1>Ghi nhận kết quả</h1><p>${escapeText(thread.title)}</p></div>
      <form id="result-form" class="stack" data-id="${escapeText(thread.id)}">
        <label class="field"><span>Bạn đã rút ra điều gì?</span><textarea name="summary" placeholder="Ghi lại cách đã giúp bạn giải quyết vướng mắc..." required maxlength="1000"></textarea></label>
        <label class="field"><span>Đánh giá mức độ hữu ích</span><select name="rating" required>
          <option value="">Chọn đánh giá</option>
          <option value="5">5 · Rất hữu ích</option><option value="4">4 · Hữu ích</option><option value="3">3 · Khá hữu ích</option>
          <option value="2">2 · Ít hữu ích</option><option value="1">1 · Chưa hữu ích</option>
        </select></label>
        <label class="field"><span>Bước tiếp theo trong kế hoạch <small class="muted">(tùy chọn)</small></span><input name="next" maxlength="150" placeholder="Thử Pomodoro trong buổi học tối nay"></label>
        <label class="task"><input type="checkbox" name="shared"><span>Chia sẻ kết quả lên bảng tin mẫu</span></label>
        <div class="actions">
          <button class="button" type="submit">${icon("check")} Lưu kết quả và cập nhật kế hoạch</button>
          ${link(href, "Quay lại trao đổi", "", "outline")}
        </div>
      </form>
    </section>`;
}

function render(focus = false) {
  const [path, params] = location.hash.slice(1).split("?", 2);
  const [page = "home", id = "", extra = ""] = path.split("/");
  const query = (new URLSearchParams(params).get("q") ?? "").trim().slice(0, 120);
  const thread = state.threads.find(item => item.id === id);
  const resource = resourceFor(id);
  const filter = page === "home" && (resource || feedFilters.some(([value]) => value === id)) ? id : "";
  let activePage = page;
  let content;
  switch (page) {
    case "plan": content = plan(id); break;
    case "ask": content = ask(id, extra); break;
    case "resource": content = resource && resourceDetail(resource); break;
    case "thread": content = thread && discussion(thread); break;
    case "result": content = thread && result(thread); break;
    default: activePage = "home";
  }
  if (activePage !== "home" && !content) {
    content = `<section class="card section stack"><h1>Không tìm thấy nội dung</h1><div>${link("#home", "Về bảng tin", "home", "soft")}</div></section>`;
  }
  renderNav(activePage, filter);
  renderContext();
  if (activePage === "home") {
    if (!feedRoot) {
      main.replaceChildren();
      feedRoot = createRoot(main);
    }
    flushSync(() => feedRoot.render(createElement(SocialFeed, feedProps(filter, query))));
  } else {
    if (feedRoot) {
      feedRoot.unmount();
      feedRoot = undefined;
    }
    main.innerHTML = content;
  }
  document.title = `${main.querySelector("h1").textContent} · Cùng Học`;
  if (focus) {
    window.scrollTo(0, 0);
    const editing = main.querySelector("#task-form[data-edit-id] input");
    (editing ?? main).focus({ preventScroll: !editing });
  }
}

function getText(form, data, name) {
  const text = String(data.get(name) ?? "").trim();
  if (!text) {
    const field = form.elements[name];
    field.setCustomValidity("Vui lòng nhập nội dung.");
    field.reportValidity();
  }
  return text;
}

function newId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

main.addEventListener("input", event => {
  if (typeof event.target.setCustomValidity === "function") event.target.setCustomValidity("");
});

main.addEventListener("click", event => {
  const button = event.target.closest("button[data-add-resource], button[data-download]");
  if (!button) return;
  const resource = resourceFor(button.dataset.addResource ?? button.dataset.download);
  if (!resource) return;
  if (button.hasAttribute("data-add-resource")) {
    if (!state.tasks.some(task => task.id === resource.id)) {
      state.tasks.push({ id: resource.id, text: resource.task, done: false });
      save();
      notify("Đã thêm vào kế hoạch của bạn.");
    }
    location.hash = "#plan";
    return;
  }
  const documentText = `# ${resource.method}\n\n${resource.intro}\n\n${resource.steps.map((step, index) => `${index + 1}. ${step}`).join("\n")}\n`;
  const url = URL.createObjectURL(new Blob([documentText], { type: "text/markdown;charset=utf-8" }));
  const download = document.createElement("a");
  download.href = url;
  download.download = `${resource.id}.md`;
  document.body.append(download);
  download.click();
  download.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});

main.addEventListener("change", event => {
  const input = event.target;
  const task = state.tasks.find(item => item.id === input.dataset.task);
  if (!task) return;
  task.done = input.checked;
  save();
  input.closest(".task").classList.toggle("done", task.done);
  const info = main.querySelector(".progress-info");
  info.nextElementSibling.remove();
  info.outerHTML = progress();
  renderContext();
  if (!storageAvailable) notify("Đã cập nhật tiến độ.");
});

main.addEventListener("submit", event => {
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  if (form.id === "search-form") {
    location.hash = feedUrl(form.dataset.filter, String(data.get("query")).trim());
    return;
  }
  if (form.id === "task-form") {
    const task = getText(form, data, "task");
    if (!task) return;
    const editing = state.tasks.find(item => item.id === form.dataset.editId);
    if (editing) {
      editing.text = task;
      save();
      location.hash = "#plan";
      notify("Đã cập nhật mục tiêu.");
      return;
    }
    state.tasks.push({ id: newId(), text: task, done: false });
    save();
    render();
    document.querySelector('#task-form input').focus();
    notify("Đã thêm mục tiêu.");
    return;
  }
  if (form.id === "ask-form") {
    const title = getText(form, data, "title");
    if (!title) return;
    const problem = getText(form, data, "problem");
    if (!problem) return;
    const mentor = mentorFor(data.get("mentor"));
    const resource = resources.find(item => item.mentor === mentor.id);
    const id = newId();
    state.threads.unshift({
      id, title, problem, author: me.name, initials: me.initials, color: me.color,
      mentor: mentor.id, resource: resource.id,
      messages: [{ text: `Bạn có thể thử bước đầu tiên trong tài liệu ${resource.method}. ${resource.steps[0]} Sau đó, hãy chia sẻ điều bạn quan sát được.` }],
    });
    save();
    location.hash = `#thread/${id}`;
    notify("Đã đăng vướng mắc trong bản mẫu.");
    return;
  }
  const thread = state.threads.find(item => item.id === form.dataset.id);
  if (!thread || thread.result) return;
  if (form.id === "reply-form") {
    const reply = getText(form, data, "reply");
    if (!reply) return;
    thread.messages.push({ text: reply, mine: true });
    save();
    render();
    document.querySelector('#reply-form textarea').focus();
    notify("Đã lưu phản hồi trong bản mẫu.");
    return;
  }
  if (form.id === "result-form" && thread.author === me.name) {
    const summary = getText(form, data, "summary");
    if (!summary) return;
    const next = String(data.get("next") ?? "").trim();
    thread.result = { summary, rating: Number(data.get("rating")), shared: data.has("shared") };
    if (next) state.tasks.push({ id: newId(), text: next, done: false });
    save();
    location.hash = "#plan";
    notify(next ? "Đã lưu kết quả và thêm bước tiếp theo." : "Đã lưu kết quả trao đổi.");
  }
});

document.querySelectorAll("[data-icon]").forEach(element => {
  element.innerHTML = icon(element.dataset.icon);
});
window.addEventListener("hashchange", () => render(true));
render();
