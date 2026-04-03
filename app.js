const STORAGE_KEY = "caishi-web-state-v3";
const LEGACY_KEYS = ["caishi-web-state-v2", "caishi-web-state-v1"];

const THEMES = [
  {
    id: "powder-blue",
    name: "奶油蓝晨",
    mood: "像参考图那种柔和的蓝白色，适合做首页主视觉",
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
    mood: "浣庨ケ鍜屻€佽蒋绾告劅銆侀€傚悎闀挎椂闂寸湅",
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
    name: "鎺㈤櫓绯栨灉",
    mood: "参考探险活宝，但降低了一点饱和度，更适合长时间使用",
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
    name: "钀芥棩鎴块棿",
    mood: "鏇存殩涓€鐐癸紝鍍忓倣鏅氬啓瀛楀彴",
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

const TEXT_REPAIRS = new Map([
  ["瀛︿範", "学习"],
  ["鐢熸椿", "生活"],
  ["鏁板", "数学"],
  ["璇枃", "语文"],
  ["璧峰眳", "起居"],
  ["鍋氶", "做题"],
  ["澶嶀範", "复习"],
  ["闃呰", "阅读"],
  ["娲楁尽", "洗澡"],
  ["鏁板鍋氶", "数学做题"],
  ["鏁板澶嶀範", "数学复习"],
  ["璇枃闃呰", "语文阅读"],
  ["濉啓闂嵎", "填写问卷"]
]);

const DEFAULT_TEMPLATES = [
  {
    id: "task_math_practice",
    folder: "学习",
    category: "数学",
    action: "做题",
    color: "#7FA3FF",
    defaultDurationMinutes: 60,
    createdAt: "2026-04-02T09:00:00"
  },
  {
    id: "task_math_review",
    folder: "学习",
    category: "数学",
    action: "复习",
    color: "#AFC7FF",
    defaultDurationMinutes: 45,
    createdAt: "2026-04-02T09:05:00"
  },
  {
    id: "task_chinese_read",
    folder: "学习",
    category: "语文",
    action: "阅读",
    color: "#FFD978",
    defaultDurationMinutes: 30,
    createdAt: "2026-04-02T09:10:00"
  },
  {
    id: "task_life_bath",
    folder: "生活",
    category: "起居",
    action: "洗澡",
    color: "#F6B9A9",
    defaultDurationMinutes: 20,
    createdAt: "2026-04-02T09:15:00"
  }
];

const state = loadState();
const ui = {
  activeView: "home",
  statsPreset: "day",
  statsStart: "",
  statsEnd: "",
  statsMode: "category",
  statsSelectedKey: "",
  categoryTarget: "create",
  categoryStep: "folder",
  categoryFolder: "",
  categoryCategory: "",
  returnSheetId: "create-sheet",
  createSheetExpanded: false,
  taskEditMode: false,
  focusTaskId: "",
  focusCategoryKey: "",
  focusFolderName: "",
  homeMenuPlanId: ""
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
  statsDonutWrap: document.querySelector("#stats-donut-wrap"),
  statsDonut: document.querySelector("#stats-donut"),
  statsTotalDuration: document.querySelector("#stats-total-duration"),
  statsTotalLabel: document.querySelector("#stats-total-label"),
  statsCallout: document.querySelector("#stats-callout"),
  rangeButtons: document.querySelectorAll("[data-range]"),
  statsModeButtons: document.querySelectorAll("[data-stats-mode]"),
  statsStartDate: document.querySelector("#stats-start-date"),
  statsEndDate: document.querySelector("#stats-end-date"),
  statsCustomRange: document.querySelector("#stats-custom-range"),
  statsCategoryFilter: document.querySelector("#stats-category-filter"),
  statsTaskFilter: document.querySelector("#stats-task-filter"),
  statsDetailList: document.querySelector("#stats-detail-list"),
  statsTrendChart: document.querySelector("#stats-trend-chart"),
  navItems: document.querySelectorAll(".nav-item"),
  views: document.querySelectorAll(".view"),
  taskNameSuggestions: document.querySelector("#task-name-suggestions"),
  openActionSheet: document.querySelector("#open-action-sheet"),
  openTemplateSheet: document.querySelector("#open-template-sheet"),
  createSheetPanel: document.querySelector("#create-sheet-panel"),
  createSheetHandle: document.querySelector("#create-sheet-handle"),
  createForm: document.querySelector("#create-form"),
  quickForm: document.querySelector("#quick-form"),
  logForm: document.querySelector("#log-form"),
  startForm: document.querySelector("#start-form"),
  templateForm: document.querySelector("#template-form"),
  createColorPicker: document.querySelector("#create-color-picker"),
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
  toggleTaskEdit: document.querySelector("#toggle-task-edit"),
  templateColorPicker: document.querySelector("#template-color-picker"),
  templateSheetKicker: document.querySelector("#template-sheet-kicker"),
  templateSheetTitle: document.querySelector("#template-sheet-title"),
  homeTaskSheetTitle: document.querySelector("#home-task-sheet-title"),
  homeTaskEditButton: document.querySelector("#home-task-edit-button"),
  homeTaskCategoryButton: document.querySelector("#home-task-category-button")
};

let nowTick = Date.now();

hydrateState();
ensureStarterData();
syncCategoryColors();
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
  refs.createColorPicker.addEventListener("click", handleCreateColorClick);
  refs.quickForm.addEventListener("submit", handleQuickSubmit);
  refs.logForm.addEventListener("submit", handleLogSubmit);
  refs.startForm.addEventListener("submit", handleStartSubmit);
  refs.templateForm.addEventListener("submit", handleTemplateSubmit);
  refs.templateColorPicker.addEventListener("click", handleTemplateColorClick);
  refs.createSheetHandle.addEventListener("click", () => setCreateSheetExpanded(!ui.createSheetExpanded));
  refs.createSheetHandle.addEventListener("pointerdown", handleCreateSheetDragStart);
  refs.createForm.addEventListener("focusin", () => setCreateSheetExpanded(true));

  refs.nextTrack.addEventListener("click", handleTodoAction);
  refs.nextTrack.addEventListener("scroll", syncNextDots);
  refs.overdueList.addEventListener("click", handleTodoAction);
  refs.todayList.addEventListener("click", handleTodoAction);
  refs.flexibleList.addEventListener("click", handleTodoAction);
  bindHomeLongPress(refs.nextTrack);
  bindHomeLongPress(refs.overdueList);
  bindHomeLongPress(refs.todayList);
  bindHomeLongPress(refs.flexibleList);
  refs.focusTimer.addEventListener("click", handleFocusTimerActions);
  refs.taskTree.addEventListener("click", handleTaskTreeActions);
  refs.toggleTaskEdit.addEventListener("click", toggleTaskEditMode);
  refs.homeTaskEditButton.addEventListener("click", jumpFromHomeTaskMenuToEdit);
  refs.homeTaskCategoryButton.addEventListener("click", jumpFromHomeTaskMenuToCategory);

  refs.rangeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      ui.statsPreset = button.dataset.range;
      syncStatsDatesFromPreset(ui.statsPreset);
      renderStats();
    });
  });

  refs.statsModeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      ui.statsMode = button.dataset.statsMode;
      ui.statsSelectedKey = "";
      renderStats();
    });
  });

  refs.statsCategoryFilter.addEventListener("change", () => {
    populateStatsTaskFilter();
    ui.statsSelectedKey = "";
    renderStats();
  });

  refs.statsTaskFilter.addEventListener("change", () => {
    ui.statsSelectedKey = "";
    renderStats();
  });

  refs.statsDetailList.addEventListener("click", handleStatsDetailClick);
  refs.statsDonut.addEventListener("click", handleStatsDonutClick);

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
    folder: repairKnownText(String(task.folder || task.project || "未分类")),
    category: repairKnownText(String(task.category || task.group || "未分类")),
    action: repairKnownText(String(task.action || task.title || "未命名")),
    color: String(task.color || "#AFC7FF"),
    defaultDurationMinutes: parseMinutes(task.defaultDurationMinutes),
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
      title: repairKnownText(String(plan.title || plan.name || "")),
      taskId: plan.taskId ? String(plan.taskId) : "",
      date: String(plan.date || dateKey(new Date())),
      startTime,
      durationMinutes: derivedDuration,
      color: String(plan.color || ""),
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
    title: repairKnownText(String(entry.title || "")),
    taskId: entry.taskId ? String(entry.taskId) : "",
    planId: entry.planId ? String(entry.planId) : "",
    color: String(entry.color || ""),
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
      title: repairKnownText(String(session.title || "")),
      taskId: session.taskId ? String(session.taskId) : "",
      planId: session.planId ? String(session.planId) : "",
      color: String(session.color || ""),
      pausedAt: session.pausedAt || null,
      segments: session.segments.map((segment) => ({
        start: segment.start,
        end: segment.end || null
      }))
    };
  }
  if (session.start) {
    return {
      title: repairKnownText(String(session.title || "")),
      taskId: session.taskId ? String(session.taskId) : "",
      planId: session.planId ? String(session.planId) : "",
      color: String(session.color || ""),
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
  refs.todayLabel.textContent = `${now.getMonth() + 1}月${now.getDate()}日 · ${weekdayLabel(now)}`;
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
    refs.focusTimer.style.removeProperty("--task-color");
    refs.focusTimer.innerHTML = `
      <div class="timer-row primary">
        <div class="timer-inline-copy">
          <span class="timer-kicker">Now</span>
          <span class="timer-title">还没有正在进行的任务</span>
        </div>
        <div class="timer-clock">00:00:00</div>
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
  const title = linkedTask ? linkedTask.action : session.title;
  refs.focusTimer.style.setProperty("--task-color", getItemColor(session));

  refs.focusTimer.innerHTML = `
    <div class="timer-row primary">
      <div class="timer-inline-copy">
        <span class="timer-kicker">${status}</span>
        <span class="timer-title">${escapeHtml(title)}</span>
      </div>
      <div class="timer-clock">${formatDurationClock(elapsedMs)}</div>
      <div class="timer-actions">
        <button class="timer-button" type="button" data-pause-session="${isSessionPaused(session) ? "resume" : "pause"}">
          ${isSessionPaused(session) ? "继续" : "暂停"}
        </button>
        <button class="stop-button" type="button" data-stop-session="true">结束</button>
      </div>
    </div>
    <div class="timer-row">
      <div class="timer-copy">
          <span>${escapeHtml(secondary)} · ${plannedMinutes ? `目标 ${humanizeMinutes(plannedMinutes)}` : "没有预设时长"}</span>
      </div>
    </div>
    <div class="timer-progress" style="--progress:${progress.toFixed(3)}"></div>
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
  syncNextDots();

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
  const extra = plan.important ? '<span class="status-chip">猸?Important</span>' : "";
  const actionLabel = isPlanRunning(plan) ? "继续" : "Start";
  const color = getItemColor(plan);
  const title = task ? task.action : plan.title;

  return `
    <article class="next-card status-${status}" data-home-plan="${plan.id}" style="${buildNextCardStyle(color)}">
      <div class="next-topline">
        <span class="next-time">${escapeHtml(timeLabel)}</span>
        ${extra}
      </div>
      <div>
        <p class="next-title">${escapeHtml(title)}</p>
        <div class="todo-meta">
          <span class="tag">${escapeHtml(tag)}</span>
          ${task ? `<span class="tag">${escapeHtml(task.action)}</span>` : ""}
        </div>
      </div>
      <div class="next-actions">
        <button class="inline-button primary" type="button" data-start-plan="${plan.id}">${actionLabel}</button>
        <button class="inline-button soft" type="button" data-complete-plan="${plan.id}">瀹屾垚</button>
      </div>
    </article>
  `;
}

function renderTodoRow(plan, group) {
  const running = isPlanRunning(plan);
  const timeLabel = group === "flexible" ? "Any time" : (plan.startTime || "Any time");
  const tag = shortTag(plan);
  const duration = planDurationMinutes(plan);
  const task = plan.taskId ? findTask(plan.taskId) : null;
  const title = task ? task.action : plan.title;
  const statusLabel = group === "flexible"
    ? (duration ? `${duration} min` : "插空做")
    : (duration ? `${duration} min` : "未设时长");

  return `
    <article class="todo-row ${group === "overdue" ? "is-overdue" : ""} ${running ? "is-running" : ""}" data-home-plan="${plan.id}">
      <div class="todo-main">
        <span class="todo-time">${escapeHtml(timeLabel)}</span>
        <div>
          <p class="todo-title">${escapeHtml(title)}</p>
          <div class="todo-meta">
            <span class="tag">${escapeHtml(tag)}</span>
            ${plan.important ? '<span class="status-chip">猸?Important</span>' : ""}
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
  const title = item.taskId ? (findTask(item.taskId)?.action || item.title) : item.title;
  return `
    <article class="completed-card">
      <div class="todo-main">
        <div>
          <p class="todo-title">${escapeHtml(title)}</p>
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
  refs.toggleTaskEdit.textContent = ui.taskEditMode ? "Done" : "Edit";
  refs.taskTree.innerHTML = groups.length
    ? groups.map((group, index) => renderFolderBlock(group, index)).join("")
    : renderEmptyState("还没有任务模板，先新建一个。");
  focusTasksLocationIfNeeded();
}

function renderFolderBlock(group, groupIndex) {
  const folderFocused = ui.focusFolderName && ui.focusFolderName === group.folder;
  return `
    <details class="folder-block ${folderFocused ? "is-focused" : ""}" ${groupIndex === 0 || folderFocused ? "open" : ""} data-folder-row="${escapeAttr(group.folder)}">
      <summary class="folder-row">
        <div class="folder-name">
          <span class="folder-icon">${escapeHtml(folderIcon(group.folder))}</span>
          <span>${escapeHtml(group.folder)}</span>
        </div>
        <div class="folder-actions">
          ${ui.taskEditMode ? `
            <button class="row-action" type="button" data-folder-rename="${escapeAttr(group.folder)}">Rename</button>
            <button class="row-action danger" type="button" data-folder-delete="${escapeAttr(group.folder)}">Delete</button>
          ` : `<span class="task-meta">${group.categories.length} categories</span>`}
        </div>
      </summary>
      <div class="category-stack">
        ${group.categories.map((category, categoryIndex) => renderCategoryBlock(group.folder, category, categoryIndex)).join("")}
      </div>
    </details>
  `;
}

function renderCategoryBlock(folder, category, categoryIndex) {
  const categoryKey = buildCategoryKey(folder, category.name);
  const focused = ui.focusCategoryKey === categoryKey;
  const color = getCategoryColor(folder, category.name);
  return `
    <details class="category-block ${focused ? "is-focused" : ""}" ${categoryIndex === 0 || focused ? "open" : ""} data-category-row="${escapeAttr(categoryKey)}">
      <summary class="category-row">
        <div class="category-main">
          <span class="chevron">▸</span>
          <span class="category-color" style="--swatch-color:${color}"></span>
          <span>${escapeHtml(category.name)}</span>
        </div>
        <div class="category-actions">
          ${ui.taskEditMode ? `
            <button class="row-action" type="button" data-category-rename="${escapeAttr(folder)}" data-category-name="${escapeAttr(category.name)}">Rename</button>
            <button class="row-action danger" type="button" data-category-delete="${escapeAttr(folder)}" data-category-name="${escapeAttr(category.name)}">Delete</button>
          ` : `<span class="task-meta">${category.tasks.length} tasks</span>`}
        </div>
      </summary>
      <div class="category-tools">
        ${ui.taskEditMode ? `
          <div class="category-palette">
            ${getTaskPaletteColors().map((swatch) => `
              <button class="color-mini ${swatch === color ? "active" : ""}" type="button" style="--swatch-color:${swatch}" data-category-color="${swatch}" data-category-folder="${escapeAttr(folder)}" data-category-name="${escapeAttr(category.name)}"></button>
            `).join("")}
          </div>
        ` : ""}
        <div class="template-list">
          ${category.tasks.map((task) => renderTaskTemplateRow(task)).join("")}
        </div>
      </div>
    </details>
  `;
}

function renderTaskTemplateRow(task) {
  const focused = ui.focusTaskId === task.id;
  const color = getCategoryColor(task.folder, task.category);
  return `
    <div class="template-pill-row ${focused ? "is-focused" : ""}" data-task-row="${task.id}">
      <div class="template-pill">
        <span class="template-dot" style="--swatch-color:${color}"></span>
        <span>${escapeHtml(task.action)}</span>
      </div>
      <div class="template-actions">
        ${ui.taskEditMode ? `
          <button class="row-action" type="button" data-task-edit="${task.id}">Edit</button>
          <button class="row-action" type="button" data-task-duration="${task.id}">Time</button>
          <button class="row-action danger" type="button" data-task-delete="${task.id}">Delete</button>
        ` : `${task.defaultDurationMinutes ? `<span class="template-duration">${task.defaultDurationMinutes} min</span>` : `<span class="task-meta">Template</span>`}`}
      </div>
    </div>
  `;
}

function renderStats() {
  refs.rangeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.range === ui.statsPreset);
  });
  refs.statsModeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.statsMode === ui.statsMode);
  });
  refs.statsCustomRange.classList.toggle("hidden", ui.statsPreset !== "custom");
  refs.statsStartDate.value = ui.statsStart;
  refs.statsEndDate.value = ui.statsEnd;

  const entries = getEntriesWithinRange(ui.statsStart, ui.statsEnd);
  populateStatsFilters(entries);
  const rows = buildStatsRows(entries);
  const totalMinutes = rows.reduce((sum, row) => sum + row.minutes, 0);

  refs.statsTotalDuration.textContent = formatStatsDuration(totalMinutes);
  refs.statsTotalLabel.textContent = statsRangeLabel(ui.statsPreset);

  renderStatsDonut(rows, totalMinutes);
  renderStatsDetails(rows, totalMinutes);
  renderStatsTrend(entries);
}

function populateStatsFilters(entries) {
  const categoryOptions = getStatsCategoryOptions(entries);
  const currentCategory = refs.statsCategoryFilter.value || "all";
  refs.statsCategoryFilter.innerHTML = [
    `<option value="all">All Categories</option>`,
    ...categoryOptions.map((item) => `<option value="${escapeAttr(item.value)}">${escapeHtml(item.label)}</option>`)
  ].join("");
  refs.statsCategoryFilter.value = categoryOptions.some((item) => item.value === currentCategory) ? currentCategory : "all";
  populateStatsTaskFilter(entries);
}

function populateStatsTaskFilter(entries = getEntriesWithinRange(ui.statsStart, ui.statsEnd)) {
  const taskOptions = getStatsTaskOptions(entries, refs.statsCategoryFilter.value || "all");
  const currentTask = refs.statsTaskFilter.value || "all";
  refs.statsTaskFilter.innerHTML = [
    `<option value="all">All Tasks</option>`,
    ...taskOptions.map((item) => `<option value="${escapeAttr(item.value)}">${escapeHtml(item.label)}</option>`)
  ].join("");
  refs.statsTaskFilter.value = taskOptions.some((item) => item.value === currentTask) ? currentTask : "all";
}

function buildStatsRows(entries) {
  const filteredEntries = filterEntriesForStats(entries);
  const groups = new Map();

  filteredEntries.forEach((entry) => {
    const meta = getEntryStatsMeta(entry);
    const key = ui.statsMode === "task" ? meta.taskKey : meta.categoryKey;
    const label = ui.statsMode === "task" ? meta.taskLabel : meta.categoryLabel;
    const note = ui.statsMode === "task" ? meta.categoryLabel : meta.folderLabel;
    const current = groups.get(key) || {
      key,
      label,
      note,
      color: meta.color,
      minutes: 0,
      count: 0
    };
    current.minutes += entryDurationMinutes(entry);
    current.count += 1;
    groups.set(key, current);
  });

  const rows = [...groups.values()].sort((a, b) => b.minutes - a.minutes || a.label.localeCompare(b.label, "zh-CN"));
  if (ui.statsSelectedKey && !rows.some((row) => row.key === ui.statsSelectedKey)) {
    ui.statsSelectedKey = "";
  }
  return rows;
}

function renderStatsDonut(rows, totalMinutes) {
  const circumference = 2 * Math.PI * 82;
  const center = 120;
  let offset = 0;

  const segments = rows.map((row) => {
    const fraction = totalMinutes ? row.minutes / totalMinutes : 0;
    const length = circumference * fraction;
    const isActive = ui.statsSelectedKey === row.key;
    const muted = ui.statsSelectedKey && !isActive;
    const startAngle = -90 + (offset / circumference) * 360;
    const sweep = fraction * 360;
    const midAngle = startAngle + sweep / 2;
    const markup = `
      <circle
        class="stats-segment ${isActive ? "is-active" : ""} ${muted ? "is-muted" : ""}"
        cx="${center}"
        cy="${center}"
        r="82"
        stroke="${row.color}"
        data-stats-key="${escapeAttr(row.key)}"
        data-mid-angle="${midAngle.toFixed(2)}"
        stroke-dasharray="${length} ${circumference}"
        stroke-dashoffset="${-offset}"
      ></circle>
    `;
    offset += length;
    return markup;
  }).join("");

  refs.statsDonut.innerHTML = `
    <g transform="rotate(-90 120 120)">
      <circle class="stats-track" cx="${center}" cy="${center}" r="82"></circle>
      ${segments}
    </g>
  `;

  if (!rows.length || !totalMinutes || !ui.statsSelectedKey) {
    refs.statsCallout.classList.add("hidden");
    refs.statsCallout.innerHTML = "";
    refs.statsCallout.style.left = "";
    refs.statsCallout.style.top = "";
    return;
  }

  const activeRow = rows.find((row) => row.key === ui.statsSelectedKey);
  const activeSegment = refs.statsDonut.querySelector(`[data-stats-key="${escapeSelector(ui.statsSelectedKey)}"]`);
  if (!activeRow || !activeSegment) {
    refs.statsCallout.classList.add("hidden");
    return;
  }

  const angle = Number(activeSegment.dataset.midAngle || 0);
  const radians = (angle * Math.PI) / 180;
  const radius = 112;
  const left = clamp(((center + Math.cos(radians) * radius) / 240) * 100, 18, 82);
  const top = clamp(((center + Math.sin(radians) * radius) / 240) * 100, 18, 82);
  const percent = totalMinutes ? Math.round((activeRow.minutes / totalMinutes) * 100) : 0;

  refs.statsCallout.classList.remove("hidden");
  refs.statsCallout.style.left = `${left}%`;
  refs.statsCallout.style.top = `${top}%`;
  refs.statsCallout.innerHTML = `
    <strong>${escapeHtml(activeRow.label)}</strong>
    <span>${formatStatsDuration(activeRow.minutes)} · ${percent}%</span>
  `;
}

function renderStatsDetails(rows, totalMinutes) {
  refs.statsDetailList.innerHTML = rows.length
    ? rows.map((row) => {
      const percent = totalMinutes ? Math.round((row.minutes / totalMinutes) * 100) : 0;
      return `
        <button class="stats-detail-row ${ui.statsSelectedKey === row.key ? "is-active" : ""}" type="button" data-stats-row="${escapeAttr(row.key)}">
          <span class="stats-detail-left">
            <span class="breakdown-dot" style="--swatch-color:${row.color}"></span>
            <span>
              <strong>${escapeHtml(row.label)}</strong>
              ${row.note ? `<span class="stats-detail-note">${escapeHtml(row.note)}</span>` : ""}
            </span>
          </span>
          <span class="stats-detail-right">
            <strong>${formatStatsDuration(row.minutes)}</strong>
            <span>${percent}%</span>
          </span>
        </button>
      `;
    }).join("")
    : renderEmptyState("这个时间范围还没有记录。");
}

function renderStatsTrend(entries) {
  const filteredEntries = filterEntriesForStats(entries);
  const endDate = new Date(`${ui.statsEnd}T12:00:00`);
  const days = [];

  for (let index = 6; index >= 0; index -= 1) {
    const day = new Date(endDate);
    day.setDate(endDate.getDate() - index);
    const key = dateKey(day);
    const minutes = filteredEntries
      .filter((entry) => dateKey(entry.start) === key)
      .reduce((sum, entry) => sum + entryDurationMinutes(entry), 0);
    days.push({ key, label: shortWeekday(day), minutes });
  }

  const maxMinutes = Math.max(...days.map((day) => day.minutes), 1);
  refs.statsTrendChart.innerHTML = days.map((day) => `
    <div class="trend-bar">
      <strong>${day.minutes ? formatStatsDuration(day.minutes) : "0m"}</strong>
      <div class="trend-bar-fill" style="height:${Math.max(12, Math.round((day.minutes / maxMinutes) * 100))}%"></div>
      <span>${escapeHtml(day.label)}</span>
    </div>
  `).join("");
}

function getStatsCategoryOptions(entries) {
  const map = new Map();
  state.tasks.forEach((task) => {
    const key = buildCategoryKey(task.folder, task.category);
    if (!map.has(key)) {
      map.set(key, { value: key, label: task.category });
    }
  });

  entries.forEach((entry) => {
    const meta = getEntryStatsMeta(entry);
    if (!map.has(meta.categoryKey)) {
      map.set(meta.categoryKey, { value: meta.categoryKey, label: meta.categoryLabel });
    }
  });

  return [...map.values()].sort((a, b) => a.label.localeCompare(b.label, "zh-CN"));
}

function getStatsTaskOptions(entries, categoryFilter) {
  const map = new Map();

  state.tasks.forEach((task) => {
    const key = `task:${task.id}`;
    const categoryKey = buildCategoryKey(task.folder, task.category);
    if (categoryFilter !== "all" && categoryFilter !== categoryKey) {
      return;
    }
    map.set(key, { value: key, label: task.action });
  });

  entries.forEach((entry) => {
    const meta = getEntryStatsMeta(entry);
    if (categoryFilter !== "all" && categoryFilter !== meta.categoryKey) {
      return;
    }
    if (!map.has(meta.taskKey)) {
      map.set(meta.taskKey, { value: meta.taskKey, label: meta.taskLabel });
    }
  });

  return [...map.values()].sort((a, b) => a.label.localeCompare(b.label, "zh-CN"));
}

function filterEntriesForStats(entries) {
  const categoryFilter = refs.statsCategoryFilter.value || "all";
  const taskFilter = refs.statsTaskFilter.value || "all";
  return entries.filter((entry) => {
    const meta = getEntryStatsMeta(entry);
    const categoryMatch = categoryFilter === "all" || meta.categoryKey === categoryFilter;
    const taskMatch = taskFilter === "all" || meta.taskKey === taskFilter;
    return categoryMatch && taskMatch;
  });
}

function getEntryStatsMeta(entry) {
  const task = entry.taskId ? findTask(entry.taskId) : null;
  if (task) {
    return {
      folderLabel: task.folder,
      categoryLabel: task.category,
      taskLabel: task.action,
      categoryKey: buildCategoryKey(task.folder, task.category),
      taskKey: `task:${task.id}`,
      color: getCategoryColor(task.folder, task.category)
    };
  }

  return {
    folderLabel: "No Folder",
    categoryLabel: "No Category",
    taskLabel: entry.title || "Untitled",
    categoryKey: "category:none",
    taskKey: `temp:${entry.title || entry.id}`,
    color: entry.color || getTaskPaletteColors()[0] || "#AFC7FF"
  };
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
  if (id === "create-sheet") {
    window.setTimeout(() => setCreateSheetExpanded(false), 0);
  }
}

function closeSheet(id) {
  const layer = document.querySelector(`#${id}`);
  if (layer) {
    layer.classList.add("hidden");
  }
  if (id === "create-sheet") {
    setCreateSheetExpanded(false);
  }
}

function resetCreateForm() {
  refs.createForm.reset();
  refs.createForm.elements.taskId.value = "";
  refs.createCategoryValue.textContent = "可选";
  const defaultColor = getTaskPaletteColors()[0] || "#AFC7FF";
  refs.createForm.dataset.selectedColor = defaultColor;
  renderCreateColorPicker(defaultColor);
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
        <strong>${escapeHtml(folder)}</strong><span>鈥?/span>
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
        <strong>${escapeHtml(category)}</strong><span>鈥?/span>
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
    if (task && ui.categoryTarget === "create") {
      refs.createForm.dataset.selectedColor = task.color;
      renderCreateColorPicker(task.color);
    }
  }

  closeSheet("category-sheet");
  openSheet(ui.returnSheetId);
}

function renderCreateColorPicker(selectedColor) {
  refs.createColorPicker.innerHTML = getTaskPaletteColors().map((color) => `
    <button class="palette-button ${selectedColor === color ? "active" : ""}" type="button" style="--swatch-color:${color}" data-create-color="${color}"></button>
  `).join("");
}

function handleCreateColorClick(event) {
  const button = event.target.closest("[data-create-color]");
  if (!button) {
    return;
  }
  refs.createForm.dataset.selectedColor = button.dataset.createColor;
  renderCreateColorPicker(button.dataset.createColor);
}

function setCreateSheetExpanded(expanded) {
  ui.createSheetExpanded = expanded;
  refs.createSheetPanel.classList.toggle("expanded", expanded);
}

function handleCreateSheetDragStart(event) {
  const startY = event.clientY;
  const startExpanded = ui.createSheetExpanded;

  const handleMove = (moveEvent) => {
    const deltaY = moveEvent.clientY - startY;
    if (deltaY < -40 && !startExpanded) {
      setCreateSheetExpanded(true);
    }
    if (deltaY > 40 && startExpanded) {
      setCreateSheetExpanded(false);
    }
  };

  const handleUp = () => {
    window.removeEventListener("pointermove", handleMove);
    window.removeEventListener("pointerup", handleUp);
  };

  window.addEventListener("pointermove", handleMove);
  window.addEventListener("pointerup", handleUp);
}

function handleCreateSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const title = String(formData.get("title") || "").trim();
  const taskId = String(formData.get("taskId") || "");
  const task = taskId ? findTask(taskId) : null;
  if (!title) {
    return;
  }

  state.plans.unshift(createPlan({
    title,
    taskId,
    date: dateKey(new Date()),
    startTime: String(formData.get("startTime") || ""),
    durationMinutes: parseMinutes(formData.get("durationMinutes")) || task?.defaultDurationMinutes || null,
    color: task ? getCategoryColor(task.folder, task.category) : (refs.createForm.dataset.selectedColor || getTaskPaletteColors()[0] || "#AFC7FF"),
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
    color: getTaskPaletteColors()[0] || "#AFC7FF",
    important: false
  });

  state.plans.unshift(plan);
  startSession({
    title: plan.title,
    taskId: plan.taskId,
    planId: plan.id,
    color: plan.color
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
    color: getTaskColorByTaskId(String(formData.get("taskId") || "")),
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
  const taskId = String(formData.get("taskId") || "");
  const task = taskId ? findTask(taskId) : null;
  if (!title) {
    return;
  }

  const plan = createPlan({
    title,
    taskId,
    date: dateKey(new Date()),
    startTime: "",
    durationMinutes: task?.defaultDurationMinutes || null,
    color: task ? getCategoryColor(task.folder, task.category) : "",
    important: false
  });

  state.plans.unshift(plan);
  startSession({
    title: plan.title,
    taskId: plan.taskId,
    planId: plan.id,
    color: plan.color
  });

  closeSheet("start-sheet");
  renderAll();
}

function openTemplateForm(taskId = "") {
  refs.templateForm.reset();
  refs.templateForm.elements.templateId.value = "";
  refs.templateSheetKicker.textContent = "Task Template";
  refs.templateSheetTitle.textContent = "新建一个分类 / 模板";
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
    refs.templateForm.elements.defaultDurationMinutes.value = task.defaultDurationMinutes || "";
    const categoryColor = getCategoryColor(task.folder, task.category);
    refs.templateForm.dataset.selectedColor = categoryColor;
    renderTemplateColorPicker(categoryColor);
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
  const folder = String(formData.get("folder") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const action = String(formData.get("action") || "").trim();
  const defaultDurationMinutes = parseMinutes(formData.get("defaultDurationMinutes"));
  const color = refs.templateForm.dataset.selectedColor || getTaskPaletteColors()[0] || "#AFC7FF";
  const payload = {
    folder,
    category,
    action,
    color,
    defaultDurationMinutes
  };

  if (!payload.folder || !payload.category || !payload.action) {
    return;
  }

  if (templateId) {
    const task = findTask(templateId);
    if (task) {
      Object.assign(task, payload);
      setCategoryColor(payload.folder, payload.category, color);
    }
  } else {
    const inheritedColor = hasCategory(payload.folder, payload.category)
      ? getCategoryColor(payload.folder, payload.category)
      : color;
    state.tasks.unshift({
      id: uid("task"),
      ...payload,
      color: inheritedColor,
      createdAt: new Date().toISOString()
    });
    setCategoryColor(payload.folder, payload.category, inheritedColor);
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

function syncNextDots() {
  const dots = refs.nextDots.querySelectorAll("span");
  if (!dots.length) {
    return;
  }
  const card = refs.nextTrack.querySelector(".next-card");
  const width = card?.offsetWidth || refs.nextTrack.clientWidth || 1;
  const gap = 12;
  const index = Math.min(
    dots.length - 1,
    Math.max(0, Math.round(refs.nextTrack.scrollLeft / (width + gap)))
  );
  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === index);
  });
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

function bindHomeLongPress(container) {
  let pressTimer = 0;
  let startX = 0;
  let startY = 0;

  const clearPress = () => {
    if (pressTimer) {
      window.clearTimeout(pressTimer);
      pressTimer = 0;
    }
  };

  container.addEventListener("pointerdown", (event) => {
    if (event.button && event.button !== 0) {
      return;
    }
    if (event.target.closest("button")) {
      return;
    }
    const item = event.target.closest("[data-home-plan]");
    if (!item) {
      return;
    }
    const plan = findPlan(item.dataset.homePlan);
    if (!plan || !plan.taskId) {
      return;
    }

    startX = event.clientX;
    startY = event.clientY;
    clearPress();
    pressTimer = window.setTimeout(() => {
      openHomeTaskMenu(plan.id);
      pressTimer = 0;
    }, 420);
  });

  container.addEventListener("pointermove", (event) => {
    if (!pressTimer) {
      return;
    }
    if (Math.abs(event.clientX - startX) > 12 || Math.abs(event.clientY - startY) > 12) {
      clearPress();
    }
  });

  ["pointerup", "pointercancel", "pointerleave", "scroll"].forEach((eventName) => {
    container.addEventListener(eventName, clearPress, { passive: true });
  });
}

function openHomeTaskMenu(planId) {
  const plan = findPlan(planId);
  if (!plan || !plan.taskId) {
    return;
  }
  const task = findTask(plan.taskId);
  ui.homeMenuPlanId = plan.id;
  refs.homeTaskSheetTitle.textContent = task ? `${task.category} / ${task.action}` : plan.title;
  openSheet("home-task-sheet");
}

function toggleTaskEditMode() {
  ui.taskEditMode = !ui.taskEditMode;
  renderTaskLibrary();
}

function jumpFromHomeTaskMenuToEdit() {
  const plan = findPlan(ui.homeMenuPlanId);
  const task = plan?.taskId ? findTask(plan.taskId) : null;
  if (!task) {
    return;
  }
  ui.taskEditMode = true;
  ui.focusFolderName = task.folder;
  ui.focusCategoryKey = buildCategoryKey(task.folder, task.category);
  ui.focusTaskId = task.id;
  closeSheet("home-task-sheet");
  switchView("tasks");
  openTemplateForm(task.id);
}

function jumpFromHomeTaskMenuToCategory() {
  const plan = findPlan(ui.homeMenuPlanId);
  const task = plan?.taskId ? findTask(plan.taskId) : null;
  if (!task) {
    return;
  }
  ui.taskEditMode = true;
  ui.focusFolderName = task.folder;
  ui.focusCategoryKey = buildCategoryKey(task.folder, task.category);
  ui.focusTaskId = task.id;
  closeSheet("home-task-sheet");
  switchView("tasks");
}

function handleStatsDetailClick(event) {
  const row = event.target.closest("[data-stats-row]");
  if (!row) {
    return;
  }
  const key = row.dataset.statsRow;
  ui.statsSelectedKey = ui.statsSelectedKey === key ? "" : key;
  renderStats();
}

function handleStatsDonutClick(event) {
  const segment = event.target.closest("[data-stats-key]");
  if (!segment) {
    ui.statsSelectedKey = "";
    renderStats();
    return;
  }
  const key = segment.dataset.statsKey;
  ui.statsSelectedKey = ui.statsSelectedKey === key ? "" : key;
  renderStats();
}

function handleTaskTreeActions(event) {
  const folderRename = event.target.closest("[data-folder-rename]");
  if (folderRename) {
    renameFolder(folderRename.dataset.folderRename);
    return;
  }

  const folderDelete = event.target.closest("[data-folder-delete]");
  if (folderDelete) {
    deleteFolder(folderDelete.dataset.folderDelete);
    return;
  }

  const categoryRename = event.target.closest("[data-category-rename]");
  if (categoryRename) {
    renameCategory(categoryRename.dataset.categoryRename, categoryRename.dataset.categoryName);
    return;
  }

  const categoryDelete = event.target.closest("[data-category-delete]");
  if (categoryDelete) {
    deleteCategory(categoryDelete.dataset.categoryDelete, categoryDelete.dataset.categoryName);
    return;
  }

  const categoryColor = event.target.closest("[data-category-color]");
  if (categoryColor) {
    setCategoryColor(categoryColor.dataset.categoryFolder, categoryColor.dataset.categoryName, categoryColor.dataset.categoryColor);
    saveState();
    renderAll();
    return;
  }

  const taskEdit = event.target.closest("[data-task-edit]");
  if (taskEdit) {
    ui.focusTaskId = taskEdit.dataset.taskEdit;
    openTemplateForm(taskEdit.dataset.taskEdit);
    return;
  }

  const taskDuration = event.target.closest("[data-task-duration]");
  if (taskDuration) {
    updateTaskDuration(taskDuration.dataset.taskDuration);
    return;
  }

  const taskDelete = event.target.closest("[data-task-delete]");
  if (taskDelete) {
    deleteTemplate(taskDelete.dataset.taskDelete);
  }
}

function renameFolder(folder) {
  const nextName = window.prompt("重命名一级分类", folder)?.trim();
  if (!nextName || nextName === folder) {
    return;
  }
  state.tasks.forEach((task) => {
    if (task.folder === folder) {
      task.folder = nextName;
    }
  });
  if (ui.focusFolderName === folder) {
    ui.focusFolderName = nextName;
  }
  if (ui.focusCategoryKey.startsWith(`${folder}::`)) {
    ui.focusCategoryKey = ui.focusCategoryKey.replace(`${folder}::`, `${nextName}::`);
  }
  saveState();
  renderAll();
}

function deleteFolder(folder) {
  const ids = state.tasks.filter((task) => task.folder === folder).map((task) => task.id);
  if (!ids.length) {
    return;
  }
  if (!window.confirm(`删除一级分类“${folder}”？里面的模板会一起删除。`)) {
    return;
  }
  state.tasks = state.tasks.filter((task) => task.folder !== folder);
  clearTaskReferences(ids);
  saveState();
  renderAll();
}

function renameCategory(folder, category) {
  const nextName = window.prompt("重命名二级分类", category)?.trim();
  if (!nextName || nextName === category) {
    return;
  }
  const color = getCategoryColor(folder, category);
  state.tasks.forEach((task) => {
    if (task.folder === folder && task.category === category) {
      task.category = nextName;
      task.color = color;
    }
  });
  if (ui.focusCategoryKey === buildCategoryKey(folder, category)) {
    ui.focusCategoryKey = buildCategoryKey(folder, nextName);
  }
  saveState();
  renderAll();
}

function deleteCategory(folder, category) {
  const ids = state.tasks
    .filter((task) => task.folder === folder && task.category === category)
    .map((task) => task.id);
  if (!ids.length) {
    return;
  }
  if (!window.confirm(`删除二级分类“${category}”？里面的模板会一起删除。`)) {
    return;
  }
  state.tasks = state.tasks.filter((task) => !(task.folder === folder && task.category === category));
  clearTaskReferences(ids);
  saveState();
  renderAll();
}

function updateTaskDuration(taskId) {
  const task = findTask(taskId);
  if (!task) {
    return;
  }
  const nextValue = window.prompt("默认时长（分钟）", task.defaultDurationMinutes || "");
  if (nextValue === null) {
    return;
  }
  task.defaultDurationMinutes = parseMinutes(nextValue);
  saveState();
  renderTaskLibrary();
}

function clearTaskReferences(taskIds) {
  const taskSet = new Set(taskIds);
  state.plans.forEach((plan) => {
    if (taskSet.has(plan.taskId)) {
      plan.taskId = "";
    }
  });
  state.entries.forEach((entry) => {
    if (taskSet.has(entry.taskId)) {
      entry.taskId = "";
    }
  });
  if (state.activeSession && taskSet.has(state.activeSession.taskId)) {
    state.activeSession.taskId = "";
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
    planId: plan.id,
    color: getItemColor(plan)
  });
  renderAll();
}

function startSession({ title, taskId = "", planId = "", color = "" }) {
  if (state.activeSession) {
    stopSession(false);
  }

  state.activeSession = {
    title,
    taskId,
    planId,
    color,
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
      color: getItemColor(session),
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

  const confirmed = window.confirm(`删除模板“${task.action}”？已有记录会保留标题，但不再关联这个模板。`);
  if (!confirmed) {
    return;
  }

  state.tasks = state.tasks.filter((item) => item.id !== taskId);
  clearTaskReferences([taskId]);
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
      taskId: plan.taskId,
      tag: shortTag(plan),
      meta: plan.startTime ? `${plan.startTime}${planDurationMinutes(plan) ? ` · ${planDurationMinutes(plan)} min` : ""}` : "已完成"
    }));

  const standaloneEntries = state.entries
    .filter((entry) => dateKey(entry.start) === today && !entry.planId)
    .map((entry) => ({
      id: `entry-${entry.id}`,
      title: entry.title,
      taskId: entry.taskId,
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
  const persistedEntries = state.entries.filter((entry) => {
    const day = dateKey(entry.start);
    return day >= startDate && day <= endDate;
  });

  if (!state.activeSession) {
    return persistedEntries;
  }

  const liveEntries = state.activeSession.segments
    .map((segment, index) => {
      const end = segment.end || new Date(nowTick).toISOString();
      if (new Date(end).getTime() <= new Date(segment.start).getTime()) {
        return null;
      }
      const day = dateKey(segment.start);
      if (day < startDate || day > endDate) {
        return null;
      }
      return {
        id: `live_${index}`,
        title: state.activeSession.title,
        taskId: state.activeSession.taskId,
        planId: state.activeSession.planId,
        color: state.activeSession.color,
        start: segment.start,
        end,
        source: "live"
      };
    })
    .filter(Boolean);

  return [...persistedEntries, ...liveEntries];
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

function formatStatsDuration(minutes) {
  const rounded = Math.max(Math.round(minutes || 0), 0);
  const hours = Math.floor(rounded / 60);
  const rest = rounded % 60;
  if (!hours) {
    return `${rounded}m`;
  }
  return rest ? `${hours}h ${rest}m` : `${hours}h`;
}

function statsRangeLabel(preset) {
  if (preset === "day") {
    return "Tracked today";
  }
  if (preset === "week") {
    return "Tracked this week";
  }
  if (preset === "month") {
    return "Tracked this month";
  }
  return "Tracked in range";
}

function shortWeekday(date) {
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()];
}

function escapeSelector(value) {
  if (window.CSS && typeof window.CSS.escape === "function") {
    return window.CSS.escape(String(value));
  }
  return String(value).replaceAll("\"", "\\\"");
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
      note: "鐢ㄦ埛瀵煎叆",
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

function buildCategoryKey(folder, category) {
  return `${folder}::${category}`;
}

function hasCategory(folder, category) {
  return state.tasks.some((task) => task.folder === folder && task.category === category);
}

function getCategoryColor(folder, category) {
  const task = state.tasks.find((item) => item.folder === folder && item.category === category);
  return task?.color || getTaskPaletteColors()[0] || "#AFC7FF";
}

function setCategoryColor(folder, category, color) {
  state.tasks.forEach((task) => {
    if (task.folder === folder && task.category === category) {
      task.color = color;
    }
  });
}

function syncCategoryColors() {
  const palette = getTaskPaletteColors();
  const categories = new Map();
  let changed = false;

  state.tasks.forEach((task, index) => {
    const key = buildCategoryKey(task.folder, task.category);
    if (!categories.has(key)) {
      categories.set(key, task.color || palette[index % palette.length] || "#AFC7FF");
    }
  });

  state.tasks.forEach((task) => {
    const key = buildCategoryKey(task.folder, task.category);
    const color = categories.get(key) || palette[0] || "#AFC7FF";
    if (task.color !== color) {
      task.color = color;
      changed = true;
    }
  });

  if (changed) {
    saveState();
  }
}

function folderIcon(folder) {
  const lower = String(folder || "").toLowerCase();
  if (lower.includes("学") || lower.includes("study")) {
    return "📘";
  }
  if (lower.includes("生") || lower.includes("life")) {
    return "🏠";
  }
  if (lower.includes("工") || lower.includes("work")) {
    return "💼";
  }
  return "📁";
}

function focusTasksLocationIfNeeded() {
  if (ui.activeView !== "tasks") {
    return;
  }

  const selectors = [
    ui.focusTaskId ? `[data-task-row="${escapeSelector(ui.focusTaskId)}"]` : "",
    ui.focusCategoryKey ? `[data-category-row="${escapeSelector(ui.focusCategoryKey)}"]` : "",
    ui.focusFolderName ? `[data-folder-row="${escapeSelector(ui.focusFolderName)}"]` : ""
  ].filter(Boolean);

  const target = selectors
    .map((selector) => refs.taskTree.querySelector(selector))
    .find(Boolean);

  if (target) {
    window.requestAnimationFrame(() => {
      target.scrollIntoView({ block: "center", behavior: "smooth" });
    });
  }
}

function createPlan({ title, taskId, date, startTime, durationMinutes, important, color = "" }) {
  return {
    id: uid("plan"),
    title,
    taskId,
    date,
    startTime,
    durationMinutes: durationMinutes || null,
    color,
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

function getTaskColorByTaskId(taskId) {
  const task = findTask(taskId);
  return task ? getCategoryColor(task.folder, task.category) : "";
}

function getItemColor(item) {
  if (!item) {
    return getTaskPaletteColors()[0] || "#AFC7FF";
  }
  if (item.taskId) {
    return getTaskColorByTaskId(item.taskId) || getTaskPaletteColors()[0] || "#AFC7FF";
  }
  if (item.color) {
    return item.color;
  }
  return getTaskPaletteColors()[0] || "#AFC7FF";
}

function buildNextCardStyle(color) {
  const strong = hexToRgba(color, 0.24);
  const soft = hexToRgba(color, 0.12);
  return `background:linear-gradient(135deg, ${strong}, ${soft});border-color:${hexToRgba(color, 0.22)};`;
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
    return `${value}分钟`;
  }
  const hours = Math.floor(value / 60);
  const rest = value % 60;
  return rest ? `${hours}小时 ${rest}分钟` : `${hours}小时`;
}

function weekdayLabel(date) {
  return ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"][date.getDay()];
}

function uniqueValues(values) {
  return [...new Set(values)];
}

function repairKnownText(value) {
  let text = String(value || "");
  TEXT_REPAIRS.forEach((replacement, source) => {
    text = text.replaceAll(source, replacement);
  });
  return text;
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

function hexToRgba(hex, alpha) {
  const normalized = String(hex || "").replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) {
    return `rgba(175, 199, 255, ${alpha})`;
  }
  const red = Number.parseInt(normalized.slice(0, 2), 16);
  const green = Number.parseInt(normalized.slice(2, 4), 16);
  const blue = Number.parseInt(normalized.slice(4, 6), 16);
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
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



