const STORAGE_KEY = "caishi-web-state-v3";
const LEGACY_KEYS = ["caishi-web-state-v2", "caishi-web-state-v1"];

const THEMES = [
  {
    id: "powder-blue",
    name: "奶油蓝晨",
    mood: "像参考图那种轻软蓝白调",
    background: ["#f6f1eb", "#efe8df"],
    surface: "rgba(255, 251, 246, 0.92)",
    surfaceStrong: "rgba(255, 253, 250, 0.98)",
    ink: "#263c79",
    inkSoft: "#6e7996",
    accent: "#3b82ff",
    accentStrong: "#2d64d9",
    warning: "#ffd766",
    warningStrong: "#ffbb38",
    orange: "#ff9642",
    orangeStrong: "#ff7a2b",
    danger: "#f4795b",
    success: "#65c28e",
    palette: ["#AFC7FF", "#FFD978", "#F6B9A9", "#8BC2A2", "#7FA3FF"]
  },
  {
    id: "morandi-paper",
    name: "雾纸莫兰迪",
    mood: "低饱和、软纸感、适合长时间看",
    background: ["#f2ebe4", "#e7ddd2"],
    surface: "rgba(255, 250, 245, 0.92)",
    surfaceStrong: "rgba(255, 252, 248, 0.98)",
    ink: "#384565",
    inkSoft: "#7d7d90",
    accent: "#6f96c6",
    accentStrong: "#547aa9",
    warning: "#e8c97d",
    warningStrong: "#cda64d",
    orange: "#d88f6a",
    orangeStrong: "#bf7450",
    danger: "#c7726c",
    success: "#7da489",
    palette: ["#B7C9D9", "#E2B7A0", "#A4A37A", "#D8CFC4", "#8E9CAF"]
  },
  {
    id: "adventure-candy",
    name: "探险糖果",
    mood: "参考探险活宝，但降了一点饱和",
    background: ["#f4efe7", "#e4ecf4"],
    surface: "rgba(255, 252, 247, 0.92)",
    surfaceStrong: "rgba(255, 255, 252, 0.98)",
    ink: "#29416b",
    inkSoft: "#6f7b93",
    accent: "#4f8de6",
    accentStrong: "#356dbf",
    warning: "#ffd56c",
    warningStrong: "#f5b233",
    orange: "#ff9b57",
    orangeStrong: "#f17d36",
    danger: "#e67782",
    success: "#70bf9d",
    palette: ["#7FB4FF", "#FFD36E", "#8CC5B0", "#F1A8C3", "#AFA0F5"]
  },
  {
    id: "sunset-room",
    name: "落日房间",
    mood: "更暖一点，像傍晚写字台",
    background: ["#f5eee6", "#ecdacb"],
    surface: "rgba(255, 250, 244, 0.92)",
    surfaceStrong: "rgba(255, 252, 248, 0.98)",
    ink: "#433c61",
    inkSoft: "#7d7283",
    accent: "#7a8fd9",
    accentStrong: "#5b70b8",
    warning: "#f4ce75",
    warningStrong: "#dcad43",
    orange: "#ec9864",
    orangeStrong: "#d8733d",
    danger: "#d77e73",
    success: "#8fb48a",
    palette: ["#B8C5FF", "#F4CF7E", "#E7A287", "#99B594", "#B6A3D8"]
  }
];

const DEFAULT_TEMPLATES = [
  {
    id: "task_math_practice",
    folder: "学习",
    category: "数学",
    action: "做题",
    color: "#7FA3FF",
    createdAt: "2026-04-02T09:00:00"
  },
  {
    id: "task_math_review",
    folder: "学习",
    category: "数学",
    action: "复习",
    color: "#AFC7FF",
    createdAt: "2026-04-02T09:05:00"
  },
  {
    id: "task_chinese_read",
    folder: "学习",
    category: "语文",
    action: "阅读",
    color: "#FFD978",
    createdAt: "2026-04-02T09:10:00"
  },
  {
    id: "task_life_bath",
    folder: "生活",
    category: "起居",
    action: "洗澡",
    color: "#F6B9A9",
    createdAt: "2026-04-02T09:15:00"
  }
];

const state = loadState();
const ui = {
  activeView: "home",
  statsPreset: "week",
  statsStart: "",
  statsEnd: "",
  categoryTarget: "create",
  categoryStep: "folder",
  categoryFolder: "",
  categoryCategory: "",
  returnSheetId: "create-sheet"
};

const refs = {
  todayLabel: document.querySelector("#today-label"),
  focusTimer: document.querySelector("#focus-timer"),
  nextTrack: document.querySelector("#next-track"),
  nextDots: document.querySelector("#next-dots"),
  overdueGroup: document.querySelector("#overdue-group"),
  overdueList: document.querySelector("#overdue-list"),
  todayList: document.querySelector("#today-list"),
  flexibleList: document.querySelector("#flexible-list"),
  completedCount: document.querySelector("#completed-count"),
  completedList: document.querySelector("#completed-list"),
  taskTree: document.querySelector("#task-tree"),
  statsSummary: document.querySelector("#stats-summary"),
  statsBreakdown: document.querySelector("#stats-breakdown"),
  rangeButtons: document.querySelectorAll("[data-range]"),
  statsStartDate: document.querySelector("#stats-start-date"),
  statsEndDate: document.querySelector("#stats-end-date"),
  themeGrid: document.querySelector("#theme-grid"),
  paletteGrid: document.querySelector("#palette-grid"),
  customPaletteInput: document.querySelector("#custom-palette-input"),
  customPalettePreview: document.querySelector("#custom-palette-preview"),
  saveCustomPaletteButton: document.querySelector("#save-custom-palette-button"),
  navItems: document.querySelectorAll(".nav-item"),
  views: document.querySelectorAll(".view"),
  taskNameSuggestions: document.querySelector("#task-name-suggestions"),
  openActionSheet: document.querySelector("#open-action-sheet"),
  openTemplateSheet: document.querySelector("#open-template-sheet"),
  createForm: document.querySelector("#create-form"),
  quickForm: document.querySelector("#quick-form"),
  logForm: document.querySelector("#log-form"),
  startForm: document.querySelector("#start-form"),
  templateForm: document.querySelector("#template-form"),
  createCategoryValue: document.querySelector("#create-category-value"),
  logCategoryValue: document.querySelector("#log-category-value"),
  startCategoryValue: document.querySelector("#start-category-value"),
  createCategoryButton: document.querySelector("#create-category-button"),
  logCategoryButton: document.querySelector("#log-category-button"),
  startCategoryButton: document.querySelector("#start-category-button"),
  categoryPath: document.querySelector("#category-path"),
  categoryList: document.querySelector("#category-list"),
  categoryBackButton: document.querySelector("#category-back-button"),
  categoryClearButton: document.querySelector("#category-clear-button"),
  templateColorPicker: document.querySelector("#template-color-picker"),
  templateSheetKicker: document.querySelector("#template-sheet-kicker"),
  templateSheetTitle: document.querySelector("#template-sheet-title")
};

let nowTick = Date.now();

hydrateState();
ensureStarterData();
syncStatsDatesFromPreset(ui.statsPreset);
bindEvents();
renderAll();

window.setInterval(() => {
  nowTick = Date.now();
  renderFocusTimer();
  if (ui.activeView === "home") {
    renderHome();
  }
}, 1000);

function bindEvents() {
  refs.navItems.forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.viewTarget));
  });

  refs.openActionSheet.addEventListener("click", () => openSheet("action-sheet"));
  refs.openTemplateSheet.addEventListener("click", () => openTemplateForm());

  document.querySelectorAll("[data-close-sheet]").forEach((button) => {
    button.addEventListener("click", () => closeSheet(button.dataset.closeSheet));
  });

  document.querySelectorAll("[data-open-sheet]").forEach((button) => {
    button.addEventListener("click", () => handleOpenSheet(button.dataset.openSheet));
  });

  refs.createCategoryButton.addEventListener("click", () => openCategorySheet("create", "create-sheet"));
  refs.logCategoryButton.addEventListener("click", () => openCategorySheet("log", "log-sheet"));
  refs.startCategoryButton.addEventListener("click", () => openCategorySheet("start", "start-sheet"));

  refs.categoryBackButton.addEventListener("click", handleCategoryBack);
  refs.categoryClearButton.addEventListener("click", clearCategorySelection);
  refs.categoryList.addEventListener("click", handleCategoryListClick);

  refs.createForm.addEventListener("submit", handleCreateSubmit);
  refs.quickForm.addEventListener("submit", handleQuickSubmit);
  refs.logForm.addEventListener("submit", handleLogSubmit);
  refs.startForm.addEventListener("submit", handleStartSubmit);
  refs.templateForm.addEventListener("submit", handleTemplateSubmit);
  refs.templateColorPicker.addEventListener("click", handleTemplateColorClick);

  refs.nextTrack.addEventListener("click", handleTodoAction);
  refs.overdueList.addEventListener("click", handleTodoAction);
  refs.todayList.addEventListener("click", handleTodoAction);
  refs.flexibleList.addEventListener("click", handleTodoAction);
  refs.focusTimer.addEventListener("click", handleFocusTimerActions);
  refs.taskTree.addEventListener("click", handleTaskTreeActions);

  refs.rangeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      ui.statsPreset = button.dataset.range;
      syncStatsDatesFromPreset(ui.statsPreset);
      renderStats();
    });
  });

  refs.statsStartDate.addEventListener("change", () => {
    ui.statsPreset = "custom";
    ui.statsStart = refs.statsStartDate.value;
    renderStats();
  });

  refs.statsEndDate.addEventListener("change", () => {
    ui.statsPreset = "custom";
    ui.statsEnd = refs.statsEndDate.value;
    renderStats();
  });

  refs.themeGrid.addEventListener("click", handleThemeClick);
  refs.paletteGrid.addEventListener("click", handlePaletteClick);
  refs.saveCustomPaletteButton.addEventListener("click", saveCustomPalette);
}

function loadState() {
  const raw = readStoredState();
  const theme = THEMES[0];
  const tasks = normalizeTasks(raw?.tasks);
  return {
    tasks: tasks.length ? tasks : structuredClone(DEFAULT_TEMPLATES),
    plans: normalizePlans(raw?.plans),
    entries: normalizeEntries(raw?.entries),
    activeSession: normalizeActiveSession(raw?.activeSession),
    preferences: {
      themeId: raw?.preferences?.themeId || theme.id,
      paletteId: raw?.preferences?.paletteId || theme.id,
      customPalette: parseHexPalette((raw?.preferences?.customPalette || []).join(",")),
      customPaletteName: raw?.preferences?.customPaletteName || "我的颜色组"
    }
  };
}

function readStoredState() {
  const keys = [STORAGE_KEY, ...LEGACY_KEYS];
  for (const key of keys) {
    const stored = window.localStorage.getItem(key);
    if (!stored) {
      continue;
    }
    try {
      return JSON.parse(stored);
    } catch (error) {
      continue;
    }
  }
  return null;
}

function normalizeTasks(tasks) {
  if (!Array.isArray(tasks)) {
    return [];
  }
  return tasks.map((task, index) => ({
    id: String(task.id || `task_${index}`),
    folder: String(task.folder || task.project || "未分类"),
    category: String(task.category || task.group || "未分类"),
    action: String(task.action || task.title || "未命名"),
    color: String(task.color || "#AFC7FF"),
    createdAt: task.createdAt || new Date().toISOString()
  }));
}

function normalizePlans(plans) {
  if (!Array.isArray(plans)) {
    return [];
  }
  return plans.map((plan, index) => {
    const startTime = typeof plan.startTime === "string" ? plan.startTime : "";
    const durationMinutes = parseMinutes(plan.durationMinutes);
    const endTime = typeof plan.endTime === "string" ? plan.endTime : "";
    const derivedDuration = durationMinutes || deriveDurationMinutes(startTime, endTime);
    return {
      id: String(plan.id || `plan_${index}`),
      title: String(plan.title || plan.name || ""),
      taskId: plan.taskId ? String(plan.taskId) : "",
      date: String(plan.date || dateKey(new Date())),
      startTime,
      durationMinutes: derivedDuration,
      important: Boolean(plan.important),
      completed: Boolean(plan.completed),
      createdAt: String(plan.createdAt || new Date().toISOString())
    };
  });
}

function normalizeEntries(entries) {
  if (!Array.isArray(entries)) {
    return [];
  }
  return entries.map((entry, index) => ({
    id: String(entry.id || `entry_${index}`),
    title: String(entry.title || ""),
    taskId: entry.taskId ? String(entry.taskId) : "",
    planId: entry.planId ? String(entry.planId) : "",
    start: entry.start || new Date().toISOString(),
    end: entry.end || new Date().toISOString(),
    source: String(entry.source || "manual")
  }));
}

function normalizeActiveSession(session) {
  if (!session) {
    return null;
  }
  if (Array.isArray(session.segments) && session.segments.length) {
    return {
      title: String(session.title || ""),
      taskId: session.taskId ? String(session.taskId) : "",
      planId: session.planId ? String(session.planId) : "",
      pausedAt: session.pausedAt || null,
      segments: session.segments.map((segment) => ({
        start: segment.start,
        end: segment.end || null
      }))
    };
  }
  if (session.start) {
    return {
      title: String(session.title || ""),
      taskId: session.taskId ? String(session.taskId) : "",
      planId: session.planId ? String(session.planId) : "",
      pausedAt: null,
      segments: [{ start: session.start, end: null }]
    };
  }
  return null;
}

function hydrateState() {
  state.plans.forEach((plan) => {
    if (!plan.title) {
      plan.title = taskDisplayName(plan.taskId) || "未命名任务";
    }
  });

  state.entries.forEach((entry) => {
    if (!entry.title) {
      entry.title = taskDisplayName(entry.taskId) || "未命名任务";
    }
  });

  if (state.activeSession && !state.activeSession.title) {
    state.activeSession.title = taskDisplayName(state.activeSession.taskId) || "进行中";
  }
}

function ensureStarterData() {
  if (state.plans.length || state.entries.length) {
    return;
  }

  const today = dateKey(new Date());
  const nowMinutes = currentMinutes();
  const overdueTime = minutesToTime(clamp(roundToFive(nowMinutes - 90), 360, 1320));
  const soonTime = minutesToTime(clamp(roundToFive(nowMinutes + 30), 360, 1320));
  const laterTime = minutesToTime(clamp(roundToFive(nowMinutes + 120), 360, 1320));

  state.plans.push(
    createPlan({
      title: "语文阅读",
      taskId: state.tasks.find((task) => task.id === "task_chinese_read")?.id || "",
      date: today,
      startTime: overdueTime,
      durationMinutes: 30,
      important: false
    }),
    createPlan({
      title: "数学做题",
      taskId: state.tasks.find((task) => task.id === "task_math_practice")?.id || "",
      date: today,
      startTime: soonTime,
      durationMinutes: 60,
      important: false
    }),
    createPlan({
      title: "数学复习",
      taskId: state.tasks.find((task) => task.id === "task_math_review")?.id || "",
      date: today,
      startTime: laterTime,
      durationMinutes: 45,
      important: true
    }),
    createPlan({
      title: "填写问卷",
      taskId: "",
      date: today,
      startTime: "",
      durationMinutes: 5,
      important: true
    })
  );

  saveState();
}

function saveState() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function renderAll() {
  applyTheme(getTheme());
  renderTodayLabel();
  renderSuggestionList();
  renderFocusTimer();
  renderHome();
  renderTaskLibrary();
  renderStats();
  renderSettings();
  switchView(ui.activeView, true);
}

function applyTheme(theme) {
  document.documentElement.style.setProperty("--bg", theme.background[0]);
  document.documentElement.style.setProperty("--bg-soft", theme.background[1]);
  document.documentElement.style.setProperty("--surface", theme.surface);
  document.documentElement.style.setProperty("--surface-strong", theme.surfaceStrong);
  document.documentElement.style.setProperty("--ink", theme.ink);
  document.documentElement.style.setProperty("--ink-soft", theme.inkSoft);
  document.documentElement.style.setProperty("--accent", theme.accent);
  document.documentElement.style.setProperty("--accent-strong", theme.accentStrong);
  document.documentElement.style.setProperty("--warning", theme.warning);
  document.documentElement.style.setProperty("--warning-strong", theme.warningStrong);
  document.documentElement.style.setProperty("--orange", theme.orange);
  document.documentElement.style.setProperty("--orange-strong", theme.orangeStrong);
  document.documentElement.style.setProperty("--danger", theme.danger);
  document.documentElement.style.setProperty("--success", theme.success);
}

function renderTodayLabel() {
  const now = new Date();
  refs.todayLabel.textContent = `${now.getMonth() + 1}月${now.getDate()}日 ${weekdayLabel(now)}`;
}

function renderSuggestionList() {
  const suggestions = uniqueValues([
    ...state.plans.map((plan) => plan.title),
    ...state.entries.map((entry) => entry.title),
    ...state.tasks.map((task) => task.action)
  ].filter(Boolean));

  refs.taskNameSuggestions.innerHTML = suggestions.map((value) => (
    `<option value="${escapeAttr(value)}"></option>`
  )).join("");
}

function renderFocusTimer() {
  const session = state.activeSession;
  if (!session) {
    refs.focusTimer.classList.add("idle");
    refs.focusTimer.innerHTML = `
      <div class="timer-row">
        <div class="timer-copy">
          <span>固定计时器</span>
          <strong>还没有正在进行的任务</strong>
        </div>
        <div class="timer-actions">
          <button class="timer-button" type="button" data-open-sheet="start-sheet">Start</button>
        </div>
      </div>
      <div class="timer-progress" style="--progress:0.24"></div>
    `;
    return;
  }

  refs.focusTimer.classList.remove("idle");
  const elapsedMs = sessionElapsedMs(session);
  const plan = session.planId ? findPlan(session.planId) : null;
  const linkedTask = session.taskId ? findTask(session.taskId) : null;
  const plannedMinutes = planDurationMinutes(plan);
  const progress = plannedMinutes ? clamp(elapsedMs / (plannedMinutes * 60 * 1000), 0, 1) : 0.38;
  const status = isSessionPaused(session) ? "Paused" : "Now";
  const secondary = linkedTask ? linkedTask.category : "临时任务";

  refs.focusTimer.innerHTML = `
    <div class="timer-row">
      <div class="timer-copy">
        <span>${status} · ${escapeHtml(secondary)}</span>
        <strong>${escapeHtml(session.title)}</strong>
      </div>
      <div class="timer-clock">${formatDurationClock(elapsedMs)}</div>
    </div>
    <div class="timer-progress" style="--progress:${progress.toFixed(3)}"></div>
    <div class="timer-row">
      <div class="timer-copy">
        <span>${plannedMinutes ? `目标 ${humanizeMinutes(plannedMinutes)}` : "没有预设时长"}</span>
      </div>
      <div class="timer-actions">
        <button class="timer-button" type="button" data-pause-session="${isSessionPaused(session) ? "resume" : "pause"}">
          ${isSessionPaused(session) ? "继续" : "暂停"}
        </button>
        <button class="stop-button" type="button" data-stop-session="true">结束</button>
      </div>
    </div>
  `;
}

function renderHome() {
  const buckets = getTodayBuckets();
  const nextItems = getNextItems();

  refs.nextTrack.innerHTML = nextItems.length
    ? nextItems.map(renderNextCard).join("")
    : renderEmptyState("先点右下角的 +，把今天的任务排进去。");

  refs.nextDots.innerHTML = nextItems.length
    ? nextItems.map((_, index) => `<span class="${index === 0 ? "active" : ""}"></span>`).join("")
    : "";

  refs.overdueGroup.classList.toggle("hidden", !buckets.overdue.length);
  refs.overdueList.innerHTML = renderTodoList(buckets.overdue, "overdue");
  refs.todayList.innerHTML = renderTodoList(buckets.today, "today");
  refs.flexibleList.innerHTML = renderTodoList(buckets.flexible, "flexible");

  const completedItems = getCompletedItems();
  refs.completedCount.textContent = String(completedItems.length);
  refs.completedList.innerHTML = completedItems.length
    ? completedItems.map(renderCompletedCard).join("")
    : renderEmptyState("完成的任务会折叠收在这里。");
}

function renderTodoList(items, group) {
  if (!items.length) {
    if (group === "today") {
      return renderEmptyState("今天还没有排上具体时间的任务。");
    }
    if (group === "flexible") {
      return renderEmptyState("没有无时间任务，时间线会更清爽。");
    }
    return "";
  }
  return items.map((plan) => renderTodoRow(plan, group)).join("");
}

function renderNextCard(plan) {
  const status = getPlanStatus(plan);
  const task = plan.taskId ? findTask(plan.taskId) : null;
  const timeLabel = plan.startTime || "Flexible";
  const tag = shortTag(plan);
  const extra = plan.important ? '<span class="status-chip">⭐ Important</span>' : "";
  const actionLabel = isPlanRunning(plan) ? "继续看" : "Start";

  return `
    <article class="next-card status-${status}">
      <div class="next-topline">
        <span class="next-time">${escapeHtml(timeLabel)}</span>
        ${extra}
      </div>
      <div>
        <p class="next-title">${escapeHtml(plan.title)}</p>
        <div class="todo-meta">
          <span class="tag">${escapeHtml(tag)}</span>
          ${task ? `<span class="tag">${escapeHtml(task.action)}</span>` : ""}
        </div>
      </div>
      <div class="next-actions">
        <button class="inline-button primary" type="button" data-start-plan="${plan.id}">${actionLabel}</button>
        <button class="inline-button soft" type="button" data-complete-plan="${plan.id}">完成</button>
      </div>
    </article>
  `;
}

function renderTodoRow(plan, group) {
  const running = isPlanRunning(plan);
  const timeLabel = group === "flexible" ? "Any time" : (plan.startTime || "Any time");
  const tag = shortTag(plan);
  const duration = planDurationMinutes(plan);
  const statusLabel = group === "flexible"
    ? (duration ? `${duration} min` : "插空做")
    : (duration ? `${duration} min` : "未设时长");

  return `
    <article class="todo-row ${group === "overdue" ? "is-overdue" : ""} ${running ? "is-running" : ""}">
      <div class="todo-main">
        <span class="todo-time">${escapeHtml(timeLabel)}</span>
        <div>
          <p class="todo-title">${escapeHtml(plan.title)}</p>
          <div class="todo-meta">
            <span class="tag">${escapeHtml(tag)}</span>
            ${plan.important ? '<span class="status-chip">⭐ Important</span>' : ""}
          </div>
        </div>
      </div>
      <div class="todo-trailing">
        <span class="task-meta">${escapeHtml(statusLabel)}</span>
        <div class="todo-actions">
          <button class="inline-button ${group === "overdue" ? "warning" : "primary"}" type="button" data-start-plan="${plan.id}">
            ${running ? "Running" : "Start"}
          </button>
          <button class="inline-button soft" type="button" data-complete-plan="${plan.id}">Done</button>
        </div>
      </div>
    </article>
  `;
}

function renderCompletedCard(item) {
  return `
    <article class="completed-card">
      <div class="todo-main">
        <div>
          <p class="todo-title">${escapeHtml(item.title)}</p>
          <div class="todo-meta">
            <span class="tag">${escapeHtml(item.tag)}</span>
          </div>
        </div>
        <span class="task-meta">${escapeHtml(item.meta)}</span>
      </div>
    </article>
  `;
}

function renderTaskLibrary() {
  const groups = groupTemplates();
  refs.taskTree.innerHTML = groups.length
    ? groups.map((group, index) => renderTemplateGroup(group, index)).join("")
    : renderEmptyState("还没有模板，先新建一个。");
}

function renderTemplateGroup(group, groupIndex) {
  return `
    <details class="template-group" ${groupIndex === 0 ? "open" : ""}>
      <summary>
        <span>${escapeHtml(group.folder)}</span>
        <span class="task-meta">${group.categories.length} 个二级分类</span>
      </summary>
      ${group.categories.map((category, categoryIndex) => `
        <details class="template-category" ${categoryIndex === 0 ? "open" : ""}>
          <summary>
            <span>${escapeHtml(category.name)}</span>
            <span class="task-meta">${category.tasks.length} 个三级分类</span>
          </summary>
          ${category.tasks.map((task) => `
            <div class="template-row">
              <div class="template-row-head">
                <div class="breakdown-stack">
                  <span class="breakdown-dot" style="--swatch-color:${task.color}"></span>
                  <strong>${escapeHtml(task.action)}</strong>
                </div>
                <span class="task-meta">${escapeHtml(task.category)}</span>
              </div>
              <div class="template-actions">
                <button class="mini-pill" type="button" data-edit-template="${task.id}">编辑</button>
                <button class="mini-pill danger" type="button" data-delete-template="${task.id}">删除</button>
              </div>
            </div>
          `).join("")}
        </details>
      `).join("")}
    </details>
  `;
}

function renderStats() {
  refs.rangeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.range === ui.statsPreset);
  });

  refs.statsStartDate.value = ui.statsStart;
  refs.statsEndDate.value = ui.statsEnd;

  const entries = getEntriesWithinRange(ui.statsStart, ui.statsEnd);
  const totalMinutes = entries.reduce((sum, entry) => sum + entryDurationMinutes(entry), 0);
  const activeDays = new Set(entries.map((entry) => dateKey(entry.start))).size;
  const categoryCount = new Set(entries.map((entry) => shortTag(entry))).size;

  refs.statsSummary.innerHTML = `
    <article class="summary-card">
      <p class="summary-label">实际时长</p>
      <strong>${humanizeMinutes(totalMinutes)}</strong>
    </article>
    <article class="summary-card">
      <p class="summary-label">记录次数</p>
      <strong>${entries.length}</strong>
    </article>
    <article class="summary-card">
      <p class="summary-label">活跃天数</p>
      <strong>${activeDays}</strong>
    </article>
    <article class="summary-card">
      <p class="summary-label">涉及分类</p>
      <strong>${categoryCount}</strong>
    </article>
  `;

  renderStatsBreakdown(entries);
}

function renderStatsBreakdown(entries) {
  const groups = new Map();
  entries.forEach((entry) => {
    const key = entry.taskId || entry.title;
    const task = entry.taskId ? findTask(entry.taskId) : null;
    const current = groups.get(key) || {
      label: entry.title,
      note: task ? `${task.folder} / ${task.category} / ${task.action}` : "临时记录",
      color: task?.color || getTaskPaletteColors()[0] || "#AFC7FF",
      minutes: 0
    };
    current.minutes += entryDurationMinutes(entry);
    groups.set(key, current);
  });

  const ordered = [...groups.values()].sort((a, b) => b.minutes - a.minutes);
  refs.statsBreakdown.innerHTML = ordered.length
    ? ordered.map((item) => `
      <article class="breakdown-row">
        <div class="breakdown-stack">
          <span class="breakdown-dot" style="--swatch-color:${item.color}"></span>
          <div>
            <strong>${escapeHtml(item.label)}</strong>
            <p class="stats-note">${escapeHtml(item.note)}</p>
          </div>
        </div>
        <strong>${humanizeMinutes(item.minutes)}</strong>
      </article>
    `).join("")
    : renderEmptyState("这个时间范围还没有记录。");
}

function renderSettings() {
  refs.themeGrid.innerHTML = THEMES.map((theme) => `
    <button class="theme-card ${theme.id === state.preferences.themeId ? "active" : ""}" type="button" data-theme-id="${theme.id}">
      <strong>${escapeHtml(theme.name)}</strong>
      <p class="helper-copy">${escapeHtml(theme.mood)}</p>
      <div class="theme-preview">
        ${theme.palette.map((color) => `<span class="swatch" style="--swatch-color:${color}"></span>`).join("")}
      </div>
    </button>
  `).join("");

  refs.paletteGrid.innerHTML = getPaletteCards().map((palette) => `
    <button class="palette-card ${palette.id === state.preferences.paletteId ? "active" : ""}" type="button" data-palette-id="${palette.id}">
      <strong>${escapeHtml(palette.name)}</strong>
      <p class="helper-copy">${escapeHtml(palette.note)}</p>
      <div class="palette-strip">
        ${palette.colors.map((color) => `<span class="palette-chip" style="--swatch-color:${color}"></span>`).join("")}
      </div>
    </button>
  `).join("");

  refs.customPaletteInput.value = state.preferences.customPalette.join(",");
  refs.customPalettePreview.innerHTML = state.preferences.customPalette.length
    ? state.preferences.customPalette.map((color) => `<span class="palette-chip" style="--swatch-color:${color}"></span>`).join("")
    : renderEmptyState("还没有导入自定义颜色组。");
}

function switchView(view, quiet = false) {
  ui.activeView = view;
  refs.views.forEach((section) => {
    section.classList.toggle("active", section.dataset.view === view);
  });
  refs.navItems.forEach((button) => {
    button.classList.toggle("active", button.dataset.viewTarget === view);
  });
  if (!quiet) {
    if (view === "home") {
      renderHome();
    }
    if (view === "tasks") {
      renderTaskLibrary();
    }
    if (view === "stats") {
      renderStats();
    }
    if (view === "settings") {
      renderSettings();
    }
  }
}

function handleOpenSheet(sheetId) {
  if (sheetId === "create-sheet") {
    resetCreateForm();
  }
  if (sheetId === "quick-sheet") {
    refs.quickForm.reset();
  }
  if (sheetId === "log-sheet") {
    resetLogForm();
  }
  if (sheetId === "start-sheet") {
    resetStartForm();
  }
  closeSheet("action-sheet");
  openSheet(sheetId);
}

function openSheet(id) {
  const layer = document.querySelector(`#${id}`);
  if (layer) {
    layer.classList.remove("hidden");
  }
}

function closeSheet(id) {
  const layer = document.querySelector(`#${id}`);
  if (layer) {
    layer.classList.add("hidden");
  }
}

function resetCreateForm() {
  refs.createForm.reset();
  refs.createForm.elements.taskId.value = "";
  refs.createCategoryValue.textContent = "可选";
}

function resetLogForm() {
  refs.logForm.reset();
  refs.logForm.elements.taskId.value = "";
  refs.logForm.elements.date.value = dateKey(new Date());
  refs.logForm.elements.startTime.value = defaultStartTime();
  refs.logForm.elements.endTime.value = defaultEndTime();
  refs.logCategoryValue.textContent = "可选";
}

function resetStartForm() {
  refs.startForm.reset();
  refs.startForm.elements.taskId.value = "";
  refs.startCategoryValue.textContent = "可选";
}

function openCategorySheet(target, returnSheetId) {
  ui.categoryTarget = target;
  ui.returnSheetId = returnSheetId;
  ui.categoryStep = "folder";
  ui.categoryFolder = "";
  ui.categoryCategory = "";
  renderCategorySheet();
  closeSheet(returnSheetId);
  openSheet("category-sheet");
}

function renderCategorySheet() {
  const tasks = [...state.tasks].sort((a, b) => (
    `${a.folder}${a.category}${a.action}`.localeCompare(`${b.folder}${b.category}${b.action}`, "zh-CN")
  ));

  if (ui.categoryStep === "folder") {
    const folders = uniqueValues(tasks.map((task) => task.folder));
    refs.categoryPath.textContent = "先选一级分类";
    refs.categoryList.innerHTML = folders.map((folder) => (
      `<button class="category-item" type="button" data-category-folder="${escapeAttr(folder)}">
        <strong>${escapeHtml(folder)}</strong><span>›</span>
      </button>`
    )).join("");
    return;
  }

  if (ui.categoryStep === "category") {
    const categories = uniqueValues(tasks
      .filter((task) => task.folder === ui.categoryFolder)
      .map((task) => task.category));
    refs.categoryPath.textContent = `${ui.categoryFolder}`;
    refs.categoryList.innerHTML = categories.map((category) => (
      `<button class="category-item" type="button" data-category-name="${escapeAttr(category)}">
        <strong>${escapeHtml(category)}</strong><span>›</span>
      </button>`
    )).join("");
    return;
  }

  refs.categoryPath.textContent = `${ui.categoryFolder} / ${ui.categoryCategory}`;
  refs.categoryList.innerHTML = tasks
    .filter((task) => task.folder === ui.categoryFolder && task.category === ui.categoryCategory)
    .map((task) => `
      <button class="category-item" type="button" data-category-task="${task.id}">
        <strong>${escapeHtml(task.action)}</strong>
        <span class="tag">${escapeHtml(task.category)}</span>
      </button>
    `).join("");
}

function handleCategoryBack() {
  if (ui.categoryStep === "action") {
    ui.categoryStep = "category";
    renderCategorySheet();
    return;
  }
  if (ui.categoryStep === "category") {
    ui.categoryStep = "folder";
    ui.categoryFolder = "";
    renderCategorySheet();
  }
}

function clearCategorySelection() {
  applyCategorySelection("");
}

function handleCategoryListClick(event) {
  const folderButton = event.target.closest("[data-category-folder]");
  if (folderButton) {
    ui.categoryFolder = folderButton.dataset.categoryFolder;
    ui.categoryStep = "category";
    renderCategorySheet();
    return;
  }

  const categoryButton = event.target.closest("[data-category-name]");
  if (categoryButton) {
    ui.categoryCategory = categoryButton.dataset.categoryName;
    ui.categoryStep = "action";
    renderCategorySheet();
    return;
  }

  const taskButton = event.target.closest("[data-category-task]");
  if (taskButton) {
    applyCategorySelection(taskButton.dataset.categoryTask);
  }
}

function applyCategorySelection(taskId) {
  const targetForm = refs[`${ui.categoryTarget}Form`];
  const targetValue = refs[`${ui.categoryTarget}CategoryValue`];
  if (!targetForm || !targetValue) {
    return;
  }

  targetForm.elements.taskId.value = taskId || "";
  if (!taskId) {
    targetValue.textContent = "可选";
  } else {
    const task = findTask(taskId);
    targetValue.textContent = task ? `${task.folder} / ${task.category} / ${task.action}` : "可选";
    if (task && !targetForm.elements.title.value.trim()) {
      targetForm.elements.title.value = task.action;
    }
  }

  closeSheet("category-sheet");
  openSheet(ui.returnSheetId);
}

function handleCreateSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const title = String(formData.get("title") || "").trim();
  if (!title) {
    return;
  }

  state.plans.unshift(createPlan({
    title,
    taskId: String(formData.get("taskId") || ""),
    date: dateKey(new Date()),
    startTime: String(formData.get("startTime") || ""),
    durationMinutes: parseMinutes(formData.get("durationMinutes")),
    important: Boolean(formData.get("important"))
  }));

  saveState();
  closeSheet("create-sheet");
  renderAll();
}

function handleQuickSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const title = String(formData.get("title") || "").trim();
  if (!title) {
    return;
  }

  const plan = createPlan({
    title,
    taskId: "",
    date: dateKey(new Date()),
    startTime: "",
    durationMinutes: null,
    important: false
  });

  state.plans.unshift(plan);
  startSession({
    title: plan.title,
    taskId: plan.taskId,
    planId: plan.id
  });

  closeSheet("quick-sheet");
  renderAll();
}

function handleLogSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const title = String(formData.get("title") || "").trim();
  const date = String(formData.get("date") || dateKey(new Date()));
  const startTime = String(formData.get("startTime") || "");
  const endTime = String(formData.get("endTime") || "");
  if (!title || !startTime || !endTime || timeToMinutes(endTime) <= timeToMinutes(startTime)) {
    return;
  }

  state.entries.unshift({
    id: uid("entry"),
    title,
    taskId: String(formData.get("taskId") || ""),
    planId: "",
    start: `${date}T${startTime}:00`,
    end: `${date}T${endTime}:00`,
    source: "manual"
  });

  saveState();
  closeSheet("log-sheet");
  renderAll();
}

function handleStartSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const title = String(formData.get("title") || "").trim();
  if (!title) {
    return;
  }

  const plan = createPlan({
    title,
    taskId: String(formData.get("taskId") || ""),
    date: dateKey(new Date()),
    startTime: "",
    durationMinutes: null,
    important: false
  });

  state.plans.unshift(plan);
  startSession({
    title: plan.title,
    taskId: plan.taskId,
    planId: plan.id
  });

  closeSheet("start-sheet");
  renderAll();
}

function openTemplateForm(taskId = "") {
  refs.templateForm.reset();
  refs.templateForm.elements.templateId.value = "";
  refs.templateSheetKicker.textContent = "Task Template";
  refs.templateSheetTitle.textContent = "新建一个分类模板";
  const defaultColor = getTaskPaletteColors()[0] || "#AFC7FF";
  refs.templateForm.dataset.selectedColor = defaultColor;
  renderTemplateColorPicker(defaultColor);

  if (taskId) {
    const task = findTask(taskId);
    if (!task) {
      return;
    }
    refs.templateSheetKicker.textContent = "Edit Template";
    refs.templateSheetTitle.textContent = "改一下这条分类模板";
    refs.templateForm.elements.templateId.value = task.id;
    refs.templateForm.elements.folder.value = task.folder;
    refs.templateForm.elements.category.value = task.category;
    refs.templateForm.elements.action.value = task.action;
    refs.templateForm.dataset.selectedColor = task.color;
    renderTemplateColorPicker(task.color);
  }

  openSheet("template-sheet");
}

function renderTemplateColorPicker(selectedColor) {
  refs.templateColorPicker.innerHTML = getTaskPaletteColors().map((color) => `
    <button class="palette-button ${selectedColor === color ? "active" : ""}" type="button" style="--swatch-color:${color}" data-template-color="${color}"></button>
  `).join("");
}

function handleTemplateColorClick(event) {
  const button = event.target.closest("[data-template-color]");
  if (!button) {
    return;
  }
  refs.templateForm.dataset.selectedColor = button.dataset.templateColor;
  renderTemplateColorPicker(button.dataset.templateColor);
}

function handleTemplateSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const templateId = String(formData.get("templateId") || "");
  const payload = {
    folder: String(formData.get("folder") || "").trim(),
    category: String(formData.get("category") || "").trim(),
    action: String(formData.get("action") || "").trim(),
    color: refs.templateForm.dataset.selectedColor || getTaskPaletteColors()[0] || "#AFC7FF"
  };

  if (!payload.folder || !payload.category || !payload.action) {
    return;
  }

  if (templateId) {
    const task = findTask(templateId);
    if (task) {
      Object.assign(task, payload);
    }
  } else {
    state.tasks.unshift({
      id: uid("task"),
      ...payload,
      createdAt: new Date().toISOString()
    });
  }

  saveState();
  closeSheet("template-sheet");
  renderAll();
}

function handleTodoAction(event) {
  const startButton = event.target.closest("[data-start-plan]");
  if (startButton) {
    startPlan(startButton.dataset.startPlan);
    return;
  }

  const completeButton = event.target.closest("[data-complete-plan]");
  if (completeButton) {
    togglePlanCompleted(completeButton.dataset.completePlan);
  }
}

function handleFocusTimerActions(event) {
  const openSheetButton = event.target.closest("[data-open-sheet]");
  if (openSheetButton) {
    handleOpenSheet(openSheetButton.dataset.openSheet);
    return;
  }

  const pauseButton = event.target.closest("[data-pause-session]");
  if (pauseButton) {
    toggleSessionPause();
    return;
  }

  const stopButton = event.target.closest("[data-stop-session]");
  if (stopButton) {
    stopSession();
  }
}

function handleTaskTreeActions(event) {
  const editButton = event.target.closest("[data-edit-template]");
  if (editButton) {
    openTemplateForm(editButton.dataset.editTemplate);
    return;
  }

  const deleteButton = event.target.closest("[data-delete-template]");
  if (deleteButton) {
    deleteTemplate(deleteButton.dataset.deleteTemplate);
  }
}

function handleThemeClick(event) {
  const button = event.target.closest("[data-theme-id]");
  if (!button) {
    return;
  }
  state.preferences.themeId = button.dataset.themeId;
  if (!state.preferences.paletteId || state.preferences.paletteId === "custom") {
    state.preferences.paletteId = button.dataset.themeId;
  }
  saveState();
  renderAll();
}

function handlePaletteClick(event) {
  const button = event.target.closest("[data-palette-id]");
  if (!button) {
    return;
  }
  state.preferences.paletteId = button.dataset.paletteId;
  saveState();
  renderAll();
}

function saveCustomPalette() {
  const colors = parseHexPalette(refs.customPaletteInput.value);
  if (colors.length < 4) {
    return;
  }
  state.preferences.customPalette = colors;
  state.preferences.paletteId = "custom";
  saveState();
  renderAll();
}

function startPlan(planId) {
  const plan = findPlan(planId);
  if (!plan) {
    return;
  }

  if (state.activeSession?.planId === plan.id) {
    if (isSessionPaused(state.activeSession)) {
      toggleSessionPause();
    }
    return;
  }

  startSession({
    title: plan.title,
    taskId: plan.taskId,
    planId: plan.id
  });
  renderAll();
}

function startSession({ title, taskId = "", planId = "" }) {
  if (state.activeSession) {
    stopSession(false);
  }

  state.activeSession = {
    title,
    taskId,
    planId,
    pausedAt: null,
    segments: [{ start: new Date().toISOString(), end: null }]
  };

  saveState();
}

function toggleSessionPause() {
  const session = state.activeSession;
  if (!session) {
    return;
  }

  if (isSessionPaused(session)) {
    session.pausedAt = null;
    session.segments.push({ start: new Date().toISOString(), end: null });
  } else {
    closeOpenSegment(session);
    session.pausedAt = new Date().toISOString();
  }

  saveState();
  renderFocusTimer();
}

function stopSession(shouldRender = true) {
  const session = state.activeSession;
  if (!session) {
    return;
  }

  closeOpenSegment(session);

  session.segments.forEach((segment) => {
    if (!segment.end || new Date(segment.end).getTime() <= new Date(segment.start).getTime()) {
      return;
    }
    state.entries.unshift({
      id: uid("entry"),
      title: session.title,
      taskId: session.taskId,
      planId: session.planId,
      start: segment.start,
      end: segment.end,
      source: "timer"
    });
  });

  if (session.planId) {
    const plan = findPlan(session.planId);
    if (plan) {
      plan.completed = true;
    }
  }

  state.activeSession = null;
  saveState();
  if (shouldRender) {
    renderAll();
  }
}

function closeOpenSegment(session) {
  const last = session.segments[session.segments.length - 1];
  if (last && !last.end) {
    last.end = new Date().toISOString();
  }
}

function togglePlanCompleted(planId) {
  const plan = findPlan(planId);
  if (!plan) {
    return;
  }
  plan.completed = !plan.completed;
  saveState();
  renderHome();
}

function deleteTemplate(taskId) {
  const task = findTask(taskId);
  if (!task) {
    return;
  }

  const confirmed = window.confirm(`删除模板“${task.action}”？已有的时间记录会保留标题，但不再关联这个模板。`);
  if (!confirmed) {
    return;
  }

  state.tasks = state.tasks.filter((item) => item.id !== taskId);
  state.plans.forEach((plan) => {
    if (plan.taskId === taskId) {
      plan.taskId = "";
    }
  });
  state.entries.forEach((entry) => {
    if (entry.taskId === taskId) {
      entry.taskId = "";
    }
  });
  if (state.activeSession?.taskId === taskId) {
    state.activeSession.taskId = "";
  }
  saveState();
  renderAll();
}

function getTodayBuckets() {
  const plans = getTodayPlans();
  const nowMinutes = currentMinutes();

  const overdue = [];
  const today = [];
  const flexible = [];

  plans.filter((plan) => !plan.completed).forEach((plan) => {
    if (!plan.startTime) {
      flexible.push(plan);
      return;
    }
    if (!isPlanRunning(plan) && timeToMinutes(plan.startTime) < nowMinutes) {
      overdue.push(plan);
      return;
    }
    today.push(plan);
  });

  return {
    overdue,
    today,
    flexible: flexible.sort((a, b) => Number(b.important) - Number(a.important) || createdTime(a) - createdTime(b))
  };
}

function getCompletedItems() {
  const today = dateKey(new Date());
  const planned = getTodayPlans()
    .filter((plan) => plan.completed)
    .map((plan) => ({
      id: `plan-${plan.id}`,
      title: plan.title,
      tag: shortTag(plan),
      meta: plan.startTime ? `${plan.startTime}${planDurationMinutes(plan) ? ` · ${planDurationMinutes(plan)} min` : ""}` : "已完成"
    }));

  const standaloneEntries = state.entries
    .filter((entry) => dateKey(entry.start) === today && !entry.planId)
    .map((entry) => ({
      id: `entry-${entry.id}`,
      title: entry.title,
      tag: shortTag(entry),
      meta: `${formatTime(entry.start)} - ${formatTime(entry.end)}`
    }));

  return [...planned, ...standaloneEntries];
}

function getNextItems(limit = 5) {
  const todayPlans = getTodayPlans().filter((plan) => !plan.completed);
  if (!todayPlans.length) {
    return [];
  }

  const running = todayPlans.find((plan) => isPlanRunning(plan));
  const timed = todayPlans
    .filter((plan) => plan.startTime && !isPlanRunning(plan))
    .sort((a, b) => {
      const aDistance = Math.abs(timeToMinutes(a.startTime) - currentMinutes());
      const bDistance = Math.abs(timeToMinutes(b.startTime) - currentMinutes());
      if (aDistance !== bDistance) {
        return aDistance - bDistance;
      }
      return comparePlans(a, b);
    });

  const important = todayPlans
    .filter((plan) => plan.important && !isPlanRunning(plan))
    .sort(comparePlans);

  const flexible = todayPlans
    .filter((plan) => !plan.startTime && !isPlanRunning(plan))
    .sort((a, b) => Number(b.important) - Number(a.important) || createdTime(a) - createdTime(b));

  const ordered = dedupeById([
    ...(running ? [running] : []),
    ...timed,
    ...important,
    ...flexible
  ]);

  return ordered.slice(0, limit);
}

function getTodayPlans() {
  const today = dateKey(new Date());
  return state.plans
    .filter((plan) => plan.date === today)
    .sort(comparePlans);
}

function comparePlans(a, b) {
  const aHasTime = Boolean(a.startTime);
  const bHasTime = Boolean(b.startTime);
  if (aHasTime !== bHasTime) {
    return aHasTime ? -1 : 1;
  }
  if (aHasTime && bHasTime) {
    const startDiff = timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
    if (startDiff !== 0) {
      return startDiff;
    }
  }
  return createdTime(a) - createdTime(b);
}

function getEntriesWithinRange(startDate, endDate) {
  return state.entries.filter((entry) => {
    const day = dateKey(entry.start);
    return day >= startDate && day <= endDate;
  });
}

function syncStatsDatesFromPreset(preset) {
  const today = new Date();
  if (preset === "day") {
    ui.statsStart = dateKey(today);
    ui.statsEnd = dateKey(today);
    return;
  }

  if (preset === "week") {
    const weekday = today.getDay() || 7;
    const monday = new Date(today);
    monday.setDate(today.getDate() - weekday + 1);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    ui.statsStart = dateKey(monday);
    ui.statsEnd = dateKey(sunday);
    return;
  }

  if (preset === "month") {
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    ui.statsStart = dateKey(start);
    ui.statsEnd = dateKey(end);
    return;
  }

  if (!ui.statsStart || !ui.statsEnd) {
    ui.statsStart = dateKey(today);
    ui.statsEnd = dateKey(today);
  }
}

function getPaletteCards() {
  const cards = THEMES.map((theme) => ({
    id: theme.id,
    name: theme.name,
    note: theme.mood,
    colors: theme.palette
  }));
  if (state.preferences.customPalette.length) {
    cards.push({
      id: "custom",
      name: state.preferences.customPaletteName,
      note: "用户导入",
      colors: state.preferences.customPalette
    });
  }
  return cards;
}

function getTheme(id = state.preferences.themeId) {
  return THEMES.find((theme) => theme.id === id) || THEMES[0];
}

function getTaskPaletteColors() {
  if (state.preferences.paletteId === "custom" && state.preferences.customPalette.length) {
    return state.preferences.customPalette;
  }
  const theme = THEMES.find((item) => item.id === state.preferences.paletteId);
  return (theme || getTheme()).palette;
}

function groupTemplates() {
  const folders = new Map();
  [...state.tasks]
    .sort((a, b) => `${a.folder}${a.category}${a.action}`.localeCompare(`${b.folder}${b.category}${b.action}`, "zh-CN"))
    .forEach((task) => {
      const folder = folders.get(task.folder) || { folder: task.folder, categories: new Map() };
      const category = folder.categories.get(task.category) || { name: task.category, tasks: [] };
      category.tasks.push(task);
      folder.categories.set(task.category, category);
      folders.set(task.folder, folder);
    });

  return [...folders.values()].map((folder) => ({
    folder: folder.folder,
    categories: [...folder.categories.values()]
  }));
}

function createPlan({ title, taskId, date, startTime, durationMinutes, important }) {
  return {
    id: uid("plan"),
    title,
    taskId,
    date,
    startTime,
    durationMinutes: durationMinutes || null,
    important: Boolean(important),
    completed: false,
    createdAt: new Date().toISOString()
  };
}

function findTask(taskId) {
  return state.tasks.find((task) => task.id === taskId) || null;
}

function findPlan(planId) {
  return state.plans.find((plan) => plan.id === planId) || null;
}

function isPlanRunning(plan) {
  return Boolean(state.activeSession && state.activeSession.planId === plan.id);
}

function getPlanStatus(plan) {
  if (isPlanRunning(plan)) {
    return "running";
  }
  if (!plan.startTime) {
    return "flexible";
  }
  if (!plan.completed && timeToMinutes(plan.startTime) < currentMinutes()) {
    return "overdue";
  }
  return "today";
}

function taskDisplayName(taskId) {
  const task = findTask(taskId);
  return task ? task.action : "";
}

function shortTag(item) {
  if (!item) {
    return "未分类";
  }
  const task = item.taskId ? findTask(item.taskId) : null;
  if (task) {
    return task.category || task.action;
  }
  return "临时";
}

function sessionElapsedMs(session) {
  return session.segments.reduce((sum, segment) => {
    const start = new Date(segment.start).getTime();
    const end = segment.end ? new Date(segment.end).getTime() : nowTick;
    return sum + Math.max(end - start, 0);
  }, 0);
}

function isSessionPaused(session) {
  const last = session.segments[session.segments.length - 1];
  return Boolean(session.pausedAt || (last && last.end));
}

function entryDurationMinutes(entry) {
  return Math.max(Math.round((new Date(entry.end).getTime() - new Date(entry.start).getTime()) / 60000), 0);
}

function planDurationMinutes(plan) {
  if (!plan) {
    return null;
  }
  return parseMinutes(plan.durationMinutes);
}

function createdTime(item) {
  return new Date(item.createdAt || item.start || 0).getTime();
}

function deriveDurationMinutes(startTime, endTime) {
  if (!startTime || !endTime) {
    return null;
  }
  const diff = timeToMinutes(endTime) - timeToMinutes(startTime);
  return diff > 0 ? diff : null;
}

function parseMinutes(value) {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) {
    return null;
  }
  return Math.round(number);
}

function timeToMinutes(value) {
  if (!value || !/^\d{2}:\d{2}$/.test(value)) {
    return 0;
  }
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

function minutesToTime(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function currentMinutes() {
  const now = new Date(nowTick);
  return now.getHours() * 60 + now.getMinutes();
}

function roundToFive(minutes) {
  return Math.round(minutes / 5) * 5;
}

function defaultStartTime() {
  return minutesToTime(roundToFive(currentMinutes()));
}

function defaultEndTime() {
  return minutesToTime(roundToFive(currentMinutes() + 30));
}

function dateKey(value) {
  const date = value instanceof Date ? value : new Date(value);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function formatTime(value) {
  const date = new Date(value);
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

function formatDurationClock(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds].map((unit) => String(unit).padStart(2, "0")).join(":");
}

function humanizeMinutes(minutes) {
  const value = Math.max(Math.round(minutes || 0), 0);
  if (value < 60) {
    return `${value}分`;
  }
  const hours = Math.floor(value / 60);
  const rest = value % 60;
  return rest ? `${hours}小时 ${rest}分` : `${hours}小时`;
}

function weekdayLabel(date) {
  return ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"][date.getDay()];
}

function uniqueValues(values) {
  return [...new Set(values)];
}

function dedupeById(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (!item || seen.has(item.id)) {
      return false;
    }
    seen.add(item.id);
    return true;
  });
}

function parseHexPalette(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter((item) => /^#?[0-9a-fA-F]{6}$/.test(item))
    .map((item) => item.startsWith("#") ? item.toUpperCase() : `#${item.toUpperCase()}`);
}

function renderEmptyState(copy) {
  return `<div class="empty-state">${escapeHtml(copy)}</div>`;
}

function uid(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}
