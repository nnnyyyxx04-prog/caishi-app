const STORAGE_KEY = "caishi-web-state-v2";
const LEGACY_KEYS = ["caishi-web-state-v1"];
const DAY_MINUTES = 24 * 60;

const THEMES = [
  {
    id: "morandi-mist",
    name: "晨雾莫兰迪",
    mood: "低饱和、纸感、很安静",
    background: ["#f3ece4", "#e6d9cc"],
    paper: "rgba(255, 250, 245, 0.9)",
    paperStrong: "rgba(255, 252, 248, 0.96)",
    ink: "#2f2723",
    muted: "#7f6f66",
    accent: "#7697a8",
    accentStrong: "#5d7b89",
    danger: "#c46f73",
    neutralSlice: "#dfd7cf",
    palette: ["#8FA8B4", "#C7B8A3", "#D9A6A3", "#B9C49A", "#A18F88"]
  },
  {
    id: "morandi-ceramic",
    name: "陶土莫兰迪",
    mood: "偏暖、奶棕、手账感",
    background: ["#f4ece5", "#d9c9bd"],
    paper: "rgba(255, 249, 244, 0.9)",
    paperStrong: "rgba(255, 252, 248, 0.96)",
    ink: "#342924",
    muted: "#807168",
    accent: "#9a8570",
    accentStrong: "#7e6a57",
    danger: "#bf7073",
    neutralSlice: "#ddd2c7",
    palette: ["#A89B8C", "#C4B7A6", "#8E8274", "#BCB6AE", "#D8C5B1"]
  },
  {
    id: "adventure-candy",
    name: "探险糖果",
    mood: "更轻快，但做过降饱和",
    background: ["#f4efe7", "#e4eef4"],
    paper: "rgba(255, 252, 247, 0.92)",
    paperStrong: "rgba(255, 255, 252, 0.97)",
    ink: "#2c2523",
    muted: "#776c65",
    accent: "#6f94b4",
    accentStrong: "#557b9b",
    danger: "#c96e9e",
    neutralSlice: "#ddd7cf",
    palette: ["#5EA6BE", "#F0B95B", "#7BB49F", "#E88CBD", "#B79DD9"]
  },
  {
    id: "sunset-adventure",
    name: "落日冒险",
    mood: "更有故事感，像手绘地图",
    background: ["#f2ebdf", "#f0dcc6"],
    paper: "rgba(255, 250, 242, 0.9)",
    paperStrong: "rgba(255, 252, 247, 0.97)",
    ink: "#342722",
    muted: "#7e6e63",
    accent: "#8e7e68",
    accentStrong: "#6f5f4f",
    danger: "#a7665d",
    neutralSlice: "#ddd3c8",
    palette: ["#4D7430", "#AB9D8B", "#FF873D", "#9E6657", "#8CBA6C"]
  }
];

const DEFAULT_TASKS = [
  {
    id: "task_math_practice",
    folder: "学习",
    category: "数学",
    action: "做题",
    tags: ["真题", "函数"],
    color: "#8FA8B4",
    repeat: "weekdays",
    createdAt: "2026-04-02T09:00:00"
  },
  {
    id: "task_math_review",
    folder: "学习",
    category: "数学",
    action: "复习",
    tags: ["错题", "笔记"],
    color: "#C7B8A3",
    repeat: "weekly",
    createdAt: "2026-04-02T09:01:00"
  },
  {
    id: "task_chinese_reading",
    folder: "学习",
    category: "语文",
    action: "阅读",
    tags: ["积累"],
    color: "#B9C49A",
    repeat: "daily",
    createdAt: "2026-04-02T09:02:00"
  },
  {
    id: "task_life_bath",
    folder: "生活",
    category: "起居",
    action: "洗澡",
    tags: ["放松"],
    color: "#D9A6A3",
    repeat: "daily",
    createdAt: "2026-04-02T09:03:00"
  }
];

const state = loadState();
const ui = {
  activeView: "today",
  chartMode: "actual",
  searchMode: "plan",
  statsPreset: "week",
  statsStart: "",
  statsEnd: ""
};

const refs = {
  appShell: document.querySelector("#app-shell"),
  activeRibbon: document.querySelector("#active-ribbon"),
  activeRibbonDot: document.querySelector("#active-ribbon-dot"),
  activeRibbonMeta: document.querySelector("#active-ribbon-meta"),
  activeRibbonTask: document.querySelector("#active-ribbon-task"),
  activeRibbonDetail: document.querySelector("#active-ribbon-detail"),
  setTargetButton: document.querySelector("#set-target-button"),
  endSessionButton: document.querySelector("#end-session-button"),
  todayLabel: document.querySelector("#today-label"),
  themeSeal: document.querySelector("#theme-seal"),
  taskSearch: document.querySelector("#task-search"),
  searchSuggestions: document.querySelector("#search-suggestions"),
  openTaskPickerButton: document.querySelector("#open-task-picker-button"),
  todayPlanList: document.querySelector("#today-plan-list"),
  todayTotal: document.querySelector("#today-total"),
  dayPie: document.querySelector("#day-pie"),
  pieCoreLabel: document.querySelector("#pie-core-label"),
  pieCoreTotal: document.querySelector("#pie-core-total"),
  todayLegend: document.querySelector("#today-legend"),
  todayTimeline: document.querySelector("#today-timeline"),
  taskTree: document.querySelector("#task-tree"),
  themeGrid: document.querySelector("#theme-grid"),
  paletteGrid: document.querySelector("#palette-grid"),
  customPaletteInput: document.querySelector("#custom-palette-input"),
  customPalettePreview: document.querySelector("#custom-palette-preview"),
  saveCustomPaletteButton: document.querySelector("#save-custom-palette-button"),
  views: document.querySelectorAll(".view"),
  navItems: document.querySelectorAll(".nav-item"),
  chartModeButtons: document.querySelectorAll("[data-chart-mode]"),
  taskModal: document.querySelector("#task-modal"),
  taskModalKicker: document.querySelector("#task-modal-kicker"),
  taskModalTitle: document.querySelector("#task-modal-title"),
  taskForm: document.querySelector("#task-form"),
  taskColorPicker: document.querySelector("#task-color-picker"),
  entryModal: document.querySelector("#entry-modal"),
  entryModalKicker: document.querySelector("#entry-modal-kicker"),
  entryModalTitle: document.querySelector("#entry-modal-title"),
  entryForm: document.querySelector("#entry-form"),
  entryTaskBanner: document.querySelector("#entry-task-banner"),
  entryCompleteRow: document.querySelector("#entry-complete-row"),
  newTaskButton: document.querySelector("#new-task-button"),
  rangePresets: document.querySelectorAll("[data-range]"),
  statsStartDate: document.querySelector("#stats-start-date"),
  statsEndDate: document.querySelector("#stats-end-date"),
  statsFolderFilter: document.querySelector("#stats-folder-filter"),
  statsCategoryFilter: document.querySelector("#stats-category-filter"),
  statsTaskFilter: document.querySelector("#stats-task-filter"),
  statsTotalDuration: document.querySelector("#stats-total-duration"),
  statsPlanDuration: document.querySelector("#stats-plan-duration"),
  statsCompletionRate: document.querySelector("#stats-completion-rate"),
  statsActiveDays: document.querySelector("#stats-active-days"),
  statsBreakdown: document.querySelector("#stats-breakdown"),
  statsBarChart: document.querySelector("#stats-bar-chart"),
  exportDataButton: document.querySelector("#export-data-button"),
  clearTodayButton: document.querySelector("#clear-today-button")
};

let nowTick = Date.now();

ensureStarterPlans();
bindEvents();
syncStatsDatesFromPreset(ui.statsPreset);
renderAll();
window.setInterval(() => {
  nowTick = Date.now();
  if (state.activeSession) {
    renderActiveRibbon();
    if (ui.activeView === "today" && ui.chartMode === "actual") {
      renderTodayChart();
    }
  }
}, 1000);

function bindEvents() {
  refs.navItems.forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.viewTarget));
  });

  refs.chartModeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      ui.chartMode = button.dataset.chartMode;
      renderTodayChart();
    });
  });

  refs.taskSearch.addEventListener("input", renderSearchSuggestions);
  refs.openTaskPickerButton.addEventListener("click", () => {
    ui.searchMode = "manual";
    refs.taskSearch.focus();
    renderSearchSuggestions();
  });

  refs.searchSuggestions.addEventListener("click", handleSearchSuggestionActions);
  refs.todayPlanList.addEventListener("click", handleTodayPlanActions);
  refs.taskTree.addEventListener("click", handleTaskTreeActions);

  refs.newTaskButton.addEventListener("click", () => openTaskModal());
  refs.taskForm.addEventListener("submit", handleTaskSubmit);
  refs.taskColorPicker.addEventListener("click", handleColorPickerClick);

  refs.entryForm.addEventListener("submit", handleEntrySubmit);
  refs.setTargetButton.addEventListener("click", setActiveTargetTime);
  refs.endSessionButton.addEventListener("click", endActiveSession);

  document.querySelectorAll("[data-close-modal]").forEach((button) => {
    button.addEventListener("click", () => closeModal(button.dataset.closeModal));
  });

  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal(modal.id);
      }
    });
  });

  refs.rangePresets.forEach((button) => {
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

  refs.statsFolderFilter.addEventListener("change", () => {
    populateStatsFilters();
    renderStats();
  });

  refs.statsCategoryFilter.addEventListener("change", () => {
    populateStatsTaskFilter();
    renderStats();
  });

  refs.statsTaskFilter.addEventListener("change", renderStats);
  refs.themeGrid.addEventListener("click", handleThemeGridClick);
  refs.paletteGrid.addEventListener("click", handlePaletteGridClick);
  refs.saveCustomPaletteButton.addEventListener("click", saveCustomPalette);
  refs.exportDataButton.addEventListener("click", exportData);
  refs.clearTodayButton.addEventListener("click", clearTodayData);
}

function loadState() {
  const raw = readStoredState();
  const theme = THEMES[0];
  const normalized = {
    tasks: normalizeTasks(raw?.tasks),
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
  if (!normalized.tasks.length) {
    normalized.tasks = structuredClone(DEFAULT_TASKS);
  }
  return normalized;
}

function ensureStarterPlans() {
  if (state.plans.length || state.entries.length || !state.tasks.length) {
    return;
  }
  const today = dateKey(new Date());
  const templates = [
    { taskId: state.tasks[0]?.id, startTime: "10:00", endTime: "12:00" },
    { taskId: state.tasks[1]?.id, startTime: "14:00", endTime: "15:00" },
    { taskId: state.tasks[2]?.id, startTime: "19:30", endTime: "20:10" },
    { taskId: state.tasks[3]?.id, startTime: "21:10", endTime: "21:35" }
  ].filter((item) => item.taskId);

  templates.forEach((plan) => {
    state.plans.push({
      id: uid("plan"),
      taskId: plan.taskId,
      date: today,
      startTime: plan.startTime,
      endTime: plan.endTime,
      completed: false
    });
  });

  saveState();
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
    id: task.id || `task_legacy_${index}`,
    folder: String(task.folder || task.project || "未分类"),
    category: String(task.category || task.group || "未分类"),
    action: String(task.action || task.title || "未命名任务"),
    tags: Array.isArray(task.tags) ? task.tags.filter(Boolean).map(String) : [],
    color: String(task.color || "#8FA8B4"),
    repeat: String(task.repeat || "none"),
    createdAt: task.createdAt || new Date().toISOString()
  }));
}

function normalizePlans(plans) {
  if (!Array.isArray(plans)) {
    return [];
  }
  return plans.map((plan, index) => ({
    id: plan.id || `plan_legacy_${index}`,
    taskId: String(plan.taskId || ""),
    date: String(plan.date || dateKey(new Date())),
    startTime: String(plan.startTime || "09:00"),
    endTime: String(plan.endTime || "10:00"),
    completed: Boolean(plan.completed)
  })).filter((plan) => plan.taskId);
}

function normalizeEntries(entries) {
  if (!Array.isArray(entries)) {
    return [];
  }
  return entries.map((entry, index) => ({
    id: entry.id || `entry_legacy_${index}`,
    taskId: String(entry.taskId || ""),
    start: entry.start || new Date().toISOString(),
    end: entry.end || new Date().toISOString(),
    source: entry.source || "manual"
  })).filter((entry) => entry.taskId);
}

function normalizeActiveSession(session) {
  if (!session || !session.taskId || !session.start) {
    return null;
  }
  return {
    taskId: String(session.taskId),
    start: session.start,
    targetEnd: session.targetEnd || null,
    planId: session.planId || null
  };
}

function saveState() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getTheme(themeId = state.preferences.themeId) {
  return THEMES.find((theme) => theme.id === themeId) || THEMES[0];
}

function getPaletteCards() {
  const cards = THEMES.map((theme) => ({
    id: theme.id,
    name: theme.name,
    colors: theme.palette,
    note: theme.mood
  }));
  if (state.preferences.customPalette.length) {
    cards.push({
      id: "custom",
      name: state.preferences.customPaletteName || "我的颜色组",
      colors: state.preferences.customPalette,
      note: "用户导入"
    });
  }
  return cards;
}

function getTaskPaletteColors() {
  if (state.preferences.paletteId === "custom" && state.preferences.customPalette.length) {
    return state.preferences.customPalette;
  }
  const match = THEMES.find((theme) => theme.id === state.preferences.paletteId);
  return (match || getTheme()).palette;
}

function applyTheme(theme) {
  document.documentElement.style.setProperty("--bg", theme.background[0]);
  document.documentElement.style.setProperty("--bg-soft", theme.background[1]);
  document.documentElement.style.setProperty("--paper", theme.paper);
  document.documentElement.style.setProperty("--paper-strong", theme.paperStrong);
  document.documentElement.style.setProperty("--ink", theme.ink);
  document.documentElement.style.setProperty("--muted", theme.muted);
  document.documentElement.style.setProperty("--accent", theme.accent);
  document.documentElement.style.setProperty("--accent-strong", theme.accentStrong);
  document.documentElement.style.setProperty("--danger", theme.danger);
  document.documentElement.style.setProperty("--neutral-slice", theme.neutralSlice);
  refs.themeSeal.textContent = theme.name;
}

function renderAll() {
  applyTheme(getTheme());
  renderTodayHeader();
  switchView(ui.activeView, true);
  populateStatsFilters();
  renderSearchSuggestions();
  renderTodayPlans();
  renderTodayChart();
  renderActiveRibbon();
  renderTaskTree();
  renderStats();
  renderSettings();
}

function renderTodayHeader() {
  const now = new Date();
  refs.todayLabel.textContent = `${now.getMonth() + 1}月${now.getDate()}日 ${weekdayLabel(now)}`;
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
    if (view === "stats") {
      renderStats();
    }
    if (view === "tasks") {
      renderTaskTree();
    }
  }
}

function renderSearchSuggestions() {
  const query = refs.taskSearch.value.trim().toLowerCase();
  const tasks = getSortedTasks(query).slice(0, 6);
  const modeCopy = ui.searchMode === "manual" ? "补录这项" : "加入今天";

  if (!query) {
    refs.searchSuggestions.classList.add("hidden");
    refs.searchSuggestions.innerHTML = "";
    return;
  }

  const createAction = `
    <button class="search-result" type="button" data-create-task="${escapeAttr(refs.taskSearch.value.trim())}">
      <div>
        <strong>新建“${escapeHtml(refs.taskSearch.value.trim())}”</strong>
        <div class="tiny-copy">如果任务库没有，就直接补进去。</div>
      </div>
      <span class="repeat-chip">新任务</span>
    </button>
  `;

  refs.searchSuggestions.classList.remove("hidden");
  refs.searchSuggestions.innerHTML = tasks.map((task) => `
    <button class="search-result" type="button" data-select-task="${task.id}">
      <div>
        <strong>${escapeHtml(task.action)}</strong>
        <div class="tiny-copy">${escapeHtml(task.category)} · ${escapeHtml(task.folder)}</div>
      </div>
      <span class="repeat-chip">${modeCopy}</span>
    </button>
  `).join("") + createAction;
}

function renderTodayPlans() {
  const plans = getTodayPlans();
  if (!plans.length) {
    refs.todayPlanList.innerHTML = renderEmptyState("先在上面搜一个任务，把它加入今天。");
    return;
  }

  refs.todayPlanList.innerHTML = plans.map((plan) => {
    const task = findTask(plan.taskId);
    if (!task) {
      return "";
    }
    return `
      <article class="plan-card ${plan.completed ? "completed" : ""}">
        <button class="plan-check" type="button" style="--task-color: ${task.color}" data-toggle-plan="${plan.id}"></button>
        <div class="plan-card-main">
          <div class="plan-topline">
            <span class="time-chip">${escapeHtml(plan.startTime)} - ${escapeHtml(plan.endTime)}</span>
            ${task.repeat !== "none" ? `<span class="repeat-chip">${escapeHtml(formatRepeat(task.repeat))}</span>` : ""}
          </div>
          <div>
            <div class="plan-card-title">${escapeHtml(task.action)}</div>
            <div class="task-subline">${escapeHtml(task.category)}</div>
          </div>
          <div class="plan-actions">
            <button class="mini-button" type="button" data-start-plan="${plan.id}">开始</button>
            <button class="mini-button" type="button" data-manual-plan="${plan.id}">补录</button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function renderTodayChart() {
  refs.chartModeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.chartMode === ui.chartMode);
  });

  const today = dateKey(new Date());
  const segments = ui.chartMode === "actual" ? getEntryClockSegments(today) : getPlanClockSegments(today);
  const totalMinutes = segments.reduce((sum, segment) => sum + Math.max(segment.endMinutes - segment.startMinutes, 0), 0);
  refs.dayPie.style.setProperty("--clock-gradient", buildClockGradient(segments));
  refs.todayTotal.textContent = ui.chartMode === "actual" ? `已记录 ${humanizeMinutes(totalMinutes)}` : `已计划 ${humanizeMinutes(totalMinutes)}`;
  refs.pieCoreLabel.textContent = ui.chartMode === "actual" ? "实际" : "计划";
  refs.pieCoreTotal.textContent = humanizeMinutes(totalMinutes);
  refs.todayLegend.innerHTML = buildLegend(getTaskDurationGroups(segments));

  if (ui.chartMode === "actual") {
    const entries = getEntriesForDate(today).sort((a, b) => new Date(b.start) - new Date(a.start));
    refs.todayTimeline.innerHTML = entries.length
      ? entries.map(renderEntryCard).join("")
      : renderEmptyState("开始记录之后，这里会按时间展开今天的实际轨迹。");
    return;
  }

  const plans = getTodayPlans();
  refs.todayTimeline.innerHTML = plans.length
    ? plans.map(renderPlanEntryCard).join("")
    : renderEmptyState("还没有今天的计划。");
}

function renderActiveRibbon() {
  if (!state.activeSession) {
    refs.activeRibbon.classList.add("hidden");
    refs.appShell.classList.remove("session-live");
    return;
  }

  const task = findTask(state.activeSession.taskId);
  if (!task) {
    refs.activeRibbon.classList.add("hidden");
    refs.appShell.classList.remove("session-live");
    return;
  }

  const duration = nowTick - new Date(state.activeSession.start).getTime();
  refs.activeRibbon.classList.remove("hidden");
  refs.appShell.classList.add("session-live");
  refs.activeRibbonDot.style.background = task.color;
  refs.activeRibbonTask.textContent = task.action;

  if (state.activeSession.targetEnd) {
    const remaining = new Date(state.activeSession.targetEnd).getTime() - nowTick;
    refs.activeRibbonMeta.textContent = remaining >= 0 ? "倒计时" : "已超时";
    refs.activeRibbonDetail.textContent = `${task.category} · ${formatDurationClock(Math.abs(remaining))}`;
  } else {
    refs.activeRibbonMeta.textContent = "进行中";
    refs.activeRibbonDetail.textContent = `${task.category} · ${formatDurationClock(duration)}`;
  }
}

function renderTaskTree() {
  const groups = groupTasksByFolderAndCategory();
  refs.taskTree.innerHTML = groups.length
    ? groups.map(renderFolderBlock).join("")
    : renderEmptyState("任务库还没有内容，先建一个。");
}

function renderStats() {
  setActiveRangePill();
  const range = getStatsRange();
  refs.statsStartDate.value = range.startDate;
  refs.statsEndDate.value = range.endDate;

  const entries = getEntriesWithinRange(range.startDate, range.endDate).filter(matchesStatsFilter);
  const plans = getPlansWithinRange(range.startDate, range.endDate).filter(matchesStatsFilter);
  const totalMinutes = entries.reduce((sum, entry) => sum + entryDurationMinutes(entry), 0);
  const planMinutes = plans.reduce((sum, plan) => sum + planDurationMinutes(plan), 0);
  const completion = planMinutes ? Math.min(Math.round((totalMinutes / planMinutes) * 100), 999) : 0;
  const activeDays = new Set(entries.map((entry) => dateKey(entry.start))).size;

  refs.statsTotalDuration.textContent = humanizeMinutes(totalMinutes);
  refs.statsPlanDuration.textContent = humanizeMinutes(planMinutes);
  refs.statsCompletionRate.textContent = `${completion}%`;
  refs.statsActiveDays.textContent = `${activeDays}天`;
  renderStatsBreakdown(entries);
  renderStatsBars(entries, range.startDate, range.endDate);
}

function renderStatsBreakdown(entries) {
  const groups = new Map();
  entries.forEach((entry) => {
    const task = findTask(entry.taskId);
    if (!task) {
      return;
    }
    const current = groups.get(task.id) || {
      label: `${task.action} · ${task.category}`,
      color: task.color,
      minutes: 0
    };
    current.minutes += entryDurationMinutes(entry);
    groups.set(task.id, current);
  });

  const ordered = [...groups.values()].sort((a, b) => b.minutes - a.minutes);
  const total = ordered.reduce((sum, item) => sum + item.minutes, 0);
  refs.statsBreakdown.innerHTML = ordered.length
    ? ordered.map((item) => `
      <div class="legend-line">
        <div style="display:flex;align-items:center;gap:10px;">
          <span class="legend-dot" style="background:${item.color}"></span>
          <div>
            <strong>${escapeHtml(item.label)}</strong>
            <div class="tiny-copy">${Math.round((item.minutes / total) * 100)}%</div>
          </div>
        </div>
        <span>${humanizeMinutes(item.minutes)}</span>
      </div>
    `).join("")
    : renderEmptyState("这个时间范围还没有可统计的记录。");
}

function renderStatsBars(entries, startDate, endDate) {
  const days = enumerateDateKeys(startDate, endDate);
  const totals = days.map((day) => ({
    day,
    minutes: entries.filter((entry) => dateKey(entry.start) === day).reduce((sum, entry) => sum + entryDurationMinutes(entry), 0)
  }));
  const maxMinutes = Math.max(...totals.map((item) => item.minutes), 1);
  refs.statsBarChart.innerHTML = totals.map((item) => `
    <div class="bar-item">
      <div class="bar-column" style="height:${item.minutes ? Math.max((item.minutes / maxMinutes) * 150, 12) : 12}px"></div>
      <span class="tiny-copy">${formatShortDate(item.day)}</span>
      <strong>${item.minutes ? humanizeMinutes(item.minutes) : "0分"}</strong>
    </div>
  `).join("");
}

function renderSettings() {
  renderThemeGrid();
  renderPaletteGrid();
  refs.customPaletteInput.value = state.preferences.customPalette.join(",");
  refs.customPalettePreview.innerHTML = state.preferences.customPalette.length
    ? state.preferences.customPalette.map((color) => `<span class="preview-swatch" style="--swatch-color:${color}"></span>`).join("")
    : renderInlineHint("还没有导入自定义颜色组。");
}

function renderThemeGrid() {
  refs.themeGrid.innerHTML = THEMES.map((theme) => `
    <button class="theme-card ${theme.id === state.preferences.themeId ? "active" : ""}" type="button" data-theme-id="${theme.id}">
      <div class="task-node-header">
        <strong>${escapeHtml(theme.name)}</strong>
        <span class="tiny-copy">${escapeHtml(theme.mood)}</span>
      </div>
      <div class="theme-preview">
        ${theme.palette.map((color) => `<span class="preview-swatch" style="--swatch-color:${color}"></span>`).join("")}
      </div>
    </button>
  `).join("");
}

function renderPaletteGrid() {
  refs.paletteGrid.innerHTML = getPaletteCards().map((palette) => `
    <button class="palette-card ${palette.id === state.preferences.paletteId ? "active" : ""}" type="button" data-palette-id="${palette.id}">
      <strong>${escapeHtml(palette.name)}</strong>
      <div class="tiny-copy">${escapeHtml(palette.note)}</div>
      <div class="palette-preview">
        ${palette.colors.map((color) => `<span class="preview-swatch" style="--swatch-color:${color}"></span>`).join("")}
      </div>
    </button>
  `).join("");
}

function handleSearchSuggestionActions(event) {
  const taskButton = event.target.closest("[data-select-task]");
  if (taskButton) {
    const taskId = taskButton.dataset.selectTask;
    openEntryModal(taskId, ui.searchMode === "manual" ? "manual" : "plan");
    resetSearchMode();
    return;
  }

  const createButton = event.target.closest("[data-create-task]");
  if (createButton) {
    openTaskModal(null, createButton.dataset.createTask);
  }
}

function handleTodayPlanActions(event) {
  const toggleButton = event.target.closest("[data-toggle-plan]");
  if (toggleButton) {
    togglePlanCompleted(toggleButton.dataset.togglePlan);
    return;
  }

  const startButton = event.target.closest("[data-start-plan]");
  if (startButton) {
    startPlan(startButton.dataset.startPlan);
    return;
  }

  const manualButton = event.target.closest("[data-manual-plan]");
  if (manualButton) {
    const plan = findPlan(manualButton.dataset.manualPlan);
    if (plan) {
      openEntryModal(plan.taskId, "manual", plan.id);
    }
  }
}

function handleTaskTreeActions(event) {
  const addPlanButton = event.target.closest("[data-add-plan-task]");
  if (addPlanButton) {
    openEntryModal(addPlanButton.dataset.addPlanTask, "plan");
    return;
  }

  const startButton = event.target.closest("[data-start-task]");
  if (startButton) {
    startTask(startButton.dataset.startTask);
    return;
  }

  const manualButton = event.target.closest("[data-manual-task]");
  if (manualButton) {
    openEntryModal(manualButton.dataset.manualTask, "manual");
    return;
  }

  const editButton = event.target.closest("[data-edit-task]");
  if (editButton) {
    openTaskModal(editButton.dataset.editTask);
    return;
  }

  const deleteButton = event.target.closest("[data-delete-task]");
  if (deleteButton) {
    deleteTask(deleteButton.dataset.deleteTask);
  }
}

function handleTaskSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const taskId = formData.get("taskId")?.toString() || "";
  const payload = {
    folder: (formData.get("folder") || "").toString().trim() || "未分类",
    category: (formData.get("category") || "").toString().trim(),
    action: (formData.get("action") || "").toString().trim(),
    tags: (formData.get("tags") || "").toString().split(",").map((tag) => tag.trim()).filter(Boolean),
    repeat: (formData.get("repeat") || "none").toString(),
    color: (formData.get("color") || getTaskPaletteColors()[0] || "#8FA8B4").toString()
  };

  if (!payload.category || !payload.action) {
    return;
  }

  if (taskId) {
    const task = findTask(taskId);
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
  closeModal("task-modal");
  renderAll();
}

function handleColorPickerClick(event) {
  const button = event.target.closest("[data-color]");
  if (!button) {
    return;
  }
  refs.taskForm.elements.color.value = button.dataset.color;
  syncTaskColorPicker(button.dataset.color);
}

function handleEntrySubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const taskId = formData.get("taskId")?.toString() || "";
  const planId = formData.get("planId")?.toString() || "";
  const mode = formData.get("mode")?.toString() || "manual";
  const date = formData.get("date")?.toString() || dateKey(new Date());
  const startTime = formData.get("startTime")?.toString() || "";
  const endTime = formData.get("endTime")?.toString() || "";

  if (!taskId || !startTime || !endTime || timeToMinutes(endTime) <= timeToMinutes(startTime)) {
    return;
  }

  if (mode === "plan") {
    state.plans.push({
      id: uid("plan"),
      taskId,
      date,
      startTime,
      endTime,
      completed: Boolean(formData.get("completed"))
    });
  } else {
    state.entries.push({
      id: uid("entry"),
      taskId,
      start: `${date}T${startTime}:00`,
      end: `${date}T${endTime}:00`,
      source: "manual"
    });
    if (planId) {
      const plan = findPlan(planId);
      if (plan && Boolean(formData.get("completed"))) {
        plan.completed = true;
      }
    }
  }

  saveState();
  closeModal("entry-modal");
  resetSearchMode();
  renderAll();
}

function handleThemeGridClick(event) {
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

function handlePaletteGridClick(event) {
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
  renderSettings();
  renderTaskColorPicker(colors[0]);
}

function openTaskModal(taskId = null, prefillAction = "") {
  refs.taskModal.classList.remove("hidden");
  refs.taskForm.reset();
  const palette = getTaskPaletteColors();
  const defaultColor = palette[0] || "#8FA8B4";
  refs.taskForm.elements.color.value = defaultColor;
  renderTaskColorPicker(defaultColor);

  if (taskId) {
    const task = findTask(taskId);
    if (!task) {
      return;
    }
    refs.taskModalKicker.textContent = "编辑任务";
    refs.taskModalTitle.textContent = "改一下任务结构和颜色";
    refs.taskForm.elements.taskId.value = task.id;
    refs.taskForm.elements.folder.value = task.folder;
    refs.taskForm.elements.category.value = task.category;
    refs.taskForm.elements.action.value = task.action;
    refs.taskForm.elements.tags.value = task.tags.join(", ");
    refs.taskForm.elements.repeat.value = task.repeat;
    refs.taskForm.elements.color.value = task.color;
    renderTaskColorPicker(task.color);
    return;
  }

  refs.taskModalKicker.textContent = "新建任务";
  refs.taskModalTitle.textContent = "把一个任务放进任务库";
  refs.taskForm.elements.taskId.value = "";
  if (prefillAction) {
    refs.taskForm.elements.action.value = prefillAction;
  }
}

function renderTaskColorPicker(selectedColor) {
  const colors = getTaskPaletteColors();
  refs.taskColorPicker.innerHTML = colors.map((color) => `
    <button class="swatch-button ${color === selectedColor ? "active" : ""}" type="button" style="--swatch-color:${color}" data-color="${color}"></button>
  `).join("");
}

function syncTaskColorPicker(selectedColor) {
  refs.taskColorPicker.querySelectorAll("[data-color]").forEach((button) => {
    button.classList.toggle("active", button.dataset.color === selectedColor);
  });
}

function openEntryModal(taskId, mode, planId = "") {
  const task = findTask(taskId);
  if (!task) {
    return;
  }

  refs.entryModal.classList.remove("hidden");
  refs.entryForm.reset();
  refs.entryForm.elements.taskId.value = taskId;
  refs.entryForm.elements.planId.value = planId;
  refs.entryForm.elements.mode.value = mode;
  refs.entryForm.elements.date.value = dateKey(new Date());
  refs.entryForm.elements.startTime.value = defaultStartTime();
  refs.entryForm.elements.endTime.value = defaultEndTime();
  refs.entryTaskBanner.innerHTML = `
    <strong>${escapeHtml(task.action)}</strong>
    <div class="task-subline">${escapeHtml(task.category)}</div>
  `;

  if (mode === "plan") {
    refs.entryModalKicker.textContent = "加入今天";
    refs.entryModalTitle.textContent = "给这项任务安排时间";
    refs.entryCompleteRow.classList.remove("hidden");
  } else {
    refs.entryModalKicker.textContent = "补录";
    refs.entryModalTitle.textContent = "补录一段实际时间";
    refs.entryCompleteRow.classList.add("hidden");
  }

  if (planId) {
    const plan = findPlan(planId);
    if (plan) {
      refs.entryForm.elements.date.value = plan.date;
      refs.entryForm.elements.startTime.value = plan.startTime;
      refs.entryForm.elements.endTime.value = plan.endTime;
      refs.entryCompleteRow.classList.remove("hidden");
    }
  }
}

function closeModal(id) {
  const modal = document.querySelector(`#${id}`);
  if (modal) {
    modal.classList.add("hidden");
  }
}

function resetSearchMode() {
  ui.searchMode = "plan";
  refs.taskSearch.value = "";
  refs.searchSuggestions.classList.add("hidden");
  refs.searchSuggestions.innerHTML = "";
}

function startPlan(planId) {
  const plan = findPlan(planId);
  if (!plan) {
    return;
  }
  plan.completed = true;
  startTask(plan.taskId, plan.id, `${plan.date}T${plan.endTime}:00`);
}

function startTask(taskId, planId = null, targetEnd = null) {
  if (state.activeSession && state.activeSession.taskId !== taskId) {
    finalizeActiveSession();
  }

  state.activeSession = {
    taskId,
    start: new Date().toISOString(),
    targetEnd,
    planId
  };
  saveState();
  renderAll();
}

function finalizeActiveSession() {
  if (!state.activeSession) {
    return;
  }
  state.entries.push({
    id: uid("entry"),
    taskId: state.activeSession.taskId,
    start: state.activeSession.start,
    end: new Date().toISOString(),
    source: "timer"
  });
  state.activeSession = null;
}

function endActiveSession() {
  if (!state.activeSession) {
    return;
  }
  finalizeActiveSession();
  saveState();
  renderAll();
}

function setActiveTargetTime() {
  if (!state.activeSession) {
    return;
  }
  const current = state.activeSession.targetEnd ? formatTimeLabel(state.activeSession.targetEnd) : "";
  const value = window.prompt("输入目标结束时间，例如 12:00；留空则清除。", current);
  if (value === null) {
    return;
  }
  const trimmed = value.trim();
  if (!trimmed) {
    state.activeSession.targetEnd = null;
    saveState();
    renderActiveRibbon();
    return;
  }
  if (!/^\d{2}:\d{2}$/.test(trimmed)) {
    return;
  }
  const [hours, minutes] = trimmed.split(":").map(Number);
  if (hours > 23 || minutes > 59) {
    return;
  }
  state.activeSession.targetEnd = `${dateKey(new Date(state.activeSession.start))}T${trimmed}:00`;
  saveState();
  renderActiveRibbon();
}

function togglePlanCompleted(planId) {
  const plan = findPlan(planId);
  if (!plan) {
    return;
  }
  plan.completed = !plan.completed;
  saveState();
  renderTodayPlans();
}

function deleteTask(taskId) {
  state.tasks = state.tasks.filter((task) => task.id !== taskId);
  state.plans = state.plans.filter((plan) => plan.taskId !== taskId);
  state.entries = state.entries.filter((entry) => entry.taskId !== taskId);
  if (state.activeSession?.taskId === taskId) {
    state.activeSession = null;
  }
  saveState();
  renderAll();
}

function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `caishi-data-${dateKey(new Date())}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function clearTodayData() {
  const today = dateKey(new Date());
  state.entries = state.entries.filter((entry) => dateKey(entry.start) !== today);
  state.plans = state.plans.filter((plan) => plan.date !== today);
  if (state.activeSession && dateKey(state.activeSession.start) === today) {
    state.activeSession = null;
  }
  saveState();
  renderAll();
}

function groupTasksByFolderAndCategory() {
  const folders = new Map();
  [...state.tasks]
    .sort((a, b) => `${a.folder}${a.category}${a.action}`.localeCompare(`${b.folder}${b.category}${b.action}`, "zh-CN"))
    .forEach((task) => {
      const folder = folders.get(task.folder) || { name: task.folder, categories: new Map() };
      const category = folder.categories.get(task.category) || { name: task.category, tasks: [] };
      category.tasks.push(task);
      folder.categories.set(task.category, category);
      folders.set(task.folder, folder);
    });

  return [...folders.values()].map((folder) => ({
    ...folder,
    categories: [...folder.categories.values()]
  }));
}

function renderFolderBlock(folder, folderIndex) {
  return `
    <details class="tree-folder" ${folderIndex === 0 ? "open" : ""}>
      <summary>
        <span>${escapeHtml(folder.name)}</span>
        <span class="tiny-copy">${folder.categories.length} 个二级分类</span>
      </summary>
      <div class="tree-folder-body">
        ${folder.categories.map((category, categoryIndex) => `
          <details class="tree-category" ${categoryIndex === 0 ? "open" : ""}>
            <summary>
              <span>${escapeHtml(category.name)}</span>
              <span class="tiny-copy">${category.tasks.length} 项任务</span>
            </summary>
            <div class="tree-category-body">
              ${category.tasks.map((task) => renderTaskRow(task)).join("")}
            </div>
          </details>
        `).join("")}
      </div>
    </details>
  `;
}

function renderTaskRow(task) {
  return `
    <article class="tree-task-row">
      <div class="task-node-header">
        <div style="display:flex;gap:10px;align-items:center;">
          <span class="task-node-dot" style="background:${task.color}"></span>
          <div>
            <strong>${escapeHtml(task.action)}</strong>
            <div class="task-node-meta">${escapeHtml(task.category)} · ${escapeHtml(formatRepeat(task.repeat))}</div>
          </div>
        </div>
      </div>
      <div class="task-row-actions">
        <button class="mini-button" type="button" data-add-plan-task="${task.id}">加入今天</button>
        <button class="mini-button" type="button" data-manual-task="${task.id}">补录</button>
        <button class="mini-button" type="button" data-start-task="${task.id}">开始</button>
        <button class="mini-button" type="button" data-edit-task="${task.id}">编辑</button>
        <button class="mini-button danger-text" type="button" data-delete-task="${task.id}">删除</button>
      </div>
    </article>
  `;
}

function getTodayPlans() {
  const today = dateKey(new Date());
  return state.plans
    .filter((plan) => plan.date === today)
    .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
}

function getEntryClockSegments(day) {
  const entries = getEntriesForDate(day).map((entry) => {
    const task = findTask(entry.taskId);
    const start = new Date(entry.start);
    const end = new Date(entry.end);
    return {
      startMinutes: start.getHours() * 60 + start.getMinutes(),
      endMinutes: end.getHours() * 60 + end.getMinutes(),
      color: task?.color || "#d8d3cb",
      label: task ? `${task.action} · ${task.category}` : "未命名任务"
    };
  });

  if (state.activeSession && dateKey(state.activeSession.start) === day) {
    const task = findTask(state.activeSession.taskId);
    entries.push({
      startMinutes: new Date(state.activeSession.start).getHours() * 60 + new Date(state.activeSession.start).getMinutes(),
      endMinutes: new Date(nowTick).getHours() * 60 + new Date(nowTick).getMinutes(),
      color: task?.color || "#d8d3cb",
      label: task ? `${task.action} · ${task.category}` : "进行中"
    });
  }

  return entries.filter((segment) => segment.endMinutes > segment.startMinutes);
}

function getPlanClockSegments(day) {
  return state.plans
    .filter((plan) => plan.date === day)
    .map((plan) => {
      const task = findTask(plan.taskId);
      return {
        startMinutes: timeToMinutes(plan.startTime),
        endMinutes: timeToMinutes(plan.endTime),
        color: task?.color || "#d8d3cb",
        label: task ? `${task.action} · ${task.category}` : "未命名任务"
      };
    })
    .filter((segment) => segment.endMinutes > segment.startMinutes);
}

function buildClockGradient(segments, neutral = getTheme().neutralSlice) {
  if (!segments.length) {
    return `conic-gradient(from -90deg, ${neutral} 0% 100%)`;
  }
  const sorted = [...segments].sort((a, b) => a.startMinutes - b.startMinutes);
  let cursor = 0;
  const stops = [];
  sorted.forEach((segment) => {
    const start = clamp(segment.startMinutes, 0, DAY_MINUTES);
    const end = clamp(segment.endMinutes, 0, DAY_MINUTES);
    if (start > cursor) {
      stops.push(`${neutral} ${(cursor / DAY_MINUTES) * 100}% ${(start / DAY_MINUTES) * 100}%`);
    }
    stops.push(`${segment.color} ${(start / DAY_MINUTES) * 100}% ${(end / DAY_MINUTES) * 100}%`);
    cursor = Math.max(cursor, end);
  });
  if (cursor < DAY_MINUTES) {
    stops.push(`${neutral} ${(cursor / DAY_MINUTES) * 100}% 100%`);
  }
  return `conic-gradient(from -90deg, ${stops.join(", ")})`;
}

function getTaskDurationGroups(segments) {
  const groups = new Map();
  segments.forEach((segment) => {
    const current = groups.get(segment.label) || {
      label: segment.label,
      color: segment.color,
      minutes: 0
    };
    current.minutes += Math.max(segment.endMinutes - segment.startMinutes, 0);
    groups.set(segment.label, current);
  });
  return [...groups.values()].sort((a, b) => b.minutes - a.minutes);
}

function buildLegend(groups) {
  if (!groups.length) {
    return renderEmptyState("颜色会在你开始安排或记录之后铺满这张时间盘。");
  }
  return groups.map((group) => `
    <div class="legend-line">
      <div style="display:flex;align-items:center;gap:10px;">
        <span class="legend-dot" style="background:${group.color}"></span>
        <strong>${escapeHtml(group.label)}</strong>
      </div>
      <span>${humanizeMinutes(group.minutes)}</span>
    </div>
  `).join("");
}

function renderEntryCard(entry) {
  const task = findTask(entry.taskId);
  if (!task) {
    return "";
  }
  return `
    <article class="entry-card">
      <strong>${escapeHtml(task.action)}</strong>
      <div class="entry-meta">${formatTimeLabel(entry.start)} - ${formatTimeLabel(entry.end)} · ${humanizeMinutes(entryDurationMinutes(entry))}</div>
      <div class="entry-type-chip">${entry.source === "manual" ? "补录" : "计时"}</div>
    </article>
  `;
}

function renderPlanEntryCard(plan) {
  const task = findTask(plan.taskId);
  if (!task) {
    return "";
  }
  return `
    <article class="entry-card">
      <strong>${escapeHtml(task.action)}</strong>
      <div class="entry-meta">${escapeHtml(plan.startTime)} - ${escapeHtml(plan.endTime)} · ${escapeHtml(task.category)}</div>
      <div class="entry-type-chip">${plan.completed ? "已完成" : "待进行"}</div>
    </article>
  `;
}

function getSortedTasks(query) {
  const normalizedQuery = query.trim().toLowerCase();
  return [...state.tasks]
    .filter((task) => {
      if (!normalizedQuery) {
        return true;
      }
      const haystack = `${task.folder} ${task.category} ${task.action} ${task.tags.join(" ")}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    })
    .sort((a, b) => `${a.category}${a.action}`.localeCompare(`${b.category}${b.action}`, "zh-CN"));
}

function populateStatsFilters() {
  const folderValue = refs.statsFolderFilter.value || "all";
  const categoryValue = refs.statsCategoryFilter.value || "all";
  const folders = uniqueValues(state.tasks.map((task) => task.folder));
  refs.statsFolderFilter.innerHTML = buildOptions(["all", ...folders], folderValue, "全部");
  const categories = state.tasks
    .filter((task) => folderValue === "all" || task.folder === folderValue)
    .map((task) => task.category);
  refs.statsCategoryFilter.innerHTML = buildOptions(["all", ...uniqueValues(categories)], categoryValue, "全部");
  populateStatsTaskFilter();
}

function populateStatsTaskFilter() {
  const folderValue = refs.statsFolderFilter.value || "all";
  const categoryValue = refs.statsCategoryFilter.value || "all";
  const currentValue = refs.statsTaskFilter.value || "all";
  const tasks = state.tasks.filter((task) => {
    const folderOk = folderValue === "all" || task.folder === folderValue;
    const categoryOk = categoryValue === "all" || task.category === categoryValue;
    return folderOk && categoryOk;
  });
  refs.statsTaskFilter.innerHTML = `
    <option value="all"${currentValue === "all" ? " selected" : ""}>全部</option>
    ${tasks.map((task) => `<option value="${task.id}"${currentValue === task.id ? " selected" : ""}>${escapeHtml(task.action)}</option>`).join("")}
  `;
}

function matchesStatsFilter(item) {
  const task = findTask(item.taskId);
  if (!task) {
    return false;
  }
  const folderValue = refs.statsFolderFilter.value || "all";
  const categoryValue = refs.statsCategoryFilter.value || "all";
  const taskValue = refs.statsTaskFilter.value || "all";
  return (folderValue === "all" || task.folder === folderValue)
    && (categoryValue === "all" || task.category === categoryValue)
    && (taskValue === "all" || task.id === taskValue);
}

function buildOptions(values, current, allLabel) {
  return values.map((value) => {
    const label = value === "all" ? allLabel : value;
    return `<option value="${escapeAttr(value)}"${value === current ? " selected" : ""}>${escapeHtml(label)}</option>`;
  }).join("");
}

function setActiveRangePill() {
  refs.rangePresets.forEach((button) => {
    button.classList.toggle("active", button.dataset.range === ui.statsPreset);
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
    const day = today.getDay() || 7;
    const monday = new Date(today);
    monday.setDate(today.getDate() - day + 1);
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

function getStatsRange() {
  return {
    startDate: ui.statsStart || dateKey(new Date()),
    endDate: ui.statsEnd || dateKey(new Date())
  };
}

function getEntriesForDate(day) {
  return state.entries.filter((entry) => dateKey(entry.start) === day);
}

function getEntriesWithinRange(startDate, endDate) {
  return state.entries.filter((entry) => {
    const key = dateKey(entry.start);
    return key >= startDate && key <= endDate;
  });
}

function getPlansWithinRange(startDate, endDate) {
  return state.plans.filter((plan) => plan.date >= startDate && plan.date <= endDate);
}

function findTask(taskId) {
  return state.tasks.find((task) => task.id === taskId);
}

function findPlan(planId) {
  return state.plans.find((plan) => plan.id === planId);
}

function entryDurationMinutes(entry) {
  return Math.max(Math.round((new Date(entry.end).getTime() - new Date(entry.start).getTime()) / 60000), 0);
}

function planDurationMinutes(plan) {
  return Math.max(timeToMinutes(plan.endTime) - timeToMinutes(plan.startTime), 0);
}

function parseHexPalette(input) {
  const raw = Array.isArray(input) ? input.join(",") : String(input || "");
  return raw.split(",").map((item) => item.trim().toUpperCase()).filter((item) => /^#([0-9A-F]{6})$/.test(item)).slice(0, 7);
}

function formatRepeat(repeat) {
  return {
    none: "不循环",
    daily: "每天",
    weekdays: "工作日",
    weekly: "每周固定"
  }[repeat] || "不循环";
}

function defaultStartTime() {
  const now = new Date();
  now.setMinutes(Math.floor(now.getMinutes() / 10) * 10, 0, 0);
  return `${pad(now.getHours())}:${pad(now.getMinutes())}`;
}

function defaultEndTime() {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 30);
  return `${pad(now.getHours())}:${pad(now.getMinutes())}`;
}

function formatTimeLabel(value) {
  const date = new Date(value);
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function formatDurationClock(milliseconds) {
  const seconds = Math.max(Math.floor(milliseconds / 1000), 0);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remain = seconds % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(remain)}`;
}

function humanizeMinutes(minutes) {
  if (minutes <= 0) {
    return "0分";
  }
  const hours = Math.floor(minutes / 60);
  const remain = minutes % 60;
  if (!hours) {
    return `${remain}分`;
  }
  if (!remain) {
    return `${hours}小时`;
  }
  return `${hours}小时${remain}分`;
}

function enumerateDateKeys(startDate, endDate) {
  const dates = [];
  const cursor = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  while (cursor <= end) {
    dates.push(dateKey(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return dates;
}

function weekdayLabel(date) {
  return ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"][date.getDay()];
}

function formatShortDate(day) {
  const [, month, date] = day.split("-");
  return `${Number(month)}/${Number(date)}`;
}

function timeToMinutes(value) {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

function dateKey(value) {
  const date = new Date(value);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function uniqueValues(values) {
  return [...new Set(values.filter(Boolean))];
}

function uid(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}_${Date.now().toString(36)}`;
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function renderEmptyState(copy) {
  return `<div class="entry-card"><div class="tiny-copy">${escapeHtml(copy)}</div></div>`;
}

function renderInlineHint(copy) {
  return `<span class="tiny-copy">${escapeHtml(copy)}</span>`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}
