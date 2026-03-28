const SOURCE_DATA = {
  sourceFile: "Табель-аноним.xlsx",
  modules: [
    "ФУНДАМЕНТ ДАШБОРДА",
    "РАСЧЕТЫ И KPI",
    "ПРОДВИНУТЫЙ ВИЗУАЛ",
    "ДАТА-СТОРИТЕЛЛИНГ",
    "БАЗА ДАННЫХ С CURSOR",
    "ВЕБ-ИНТЕРФЕЙС",
    "БЕЗОПАСНОСТЬ",
    "ФИНАЛЬНЫЙ ПРОЕКТ"
  ],
  students: [
    ["Полина Орлова", [1, 1, 0, 0, 1, 0, 0, 0]],
    ["Даниил Егоров", [1, 1, 0, 1, 1, 1, 1, 1]],
    ["Мария Трофимова", [1, 1, 0, 0, 0, 0, 0, 0]],
    ["Виктор Лебедев", [1, 1, 1, 1, 1, 1, 0, 1]],
    ["София Гусева", [1, 1, 1, 1, 1, 0, 0, 0]],
    ["Илья Белов", [1, 1, 1, 1, 1, 1, 1, 1]],
    ["Екатерина Лукина", [1, 1, 1, 1, 1, 1, 1, 1]],
    ["Глеб Данилов", [1, 1, 1, 1, 0, 0, 0, 0]],
    ["Алиса Фадеева", [1, 1, 1, 1, 1, 1, 1, 1]],
    ["Сергей Комаров", [1, 1, 1, 1, 1, 1, 1, 1]],
    ["Андрей Жуков", [1, 1, 1, 1, 1, 1, 1, 1]],
    ["Ольга Вишневская", [1, 1, 1, 1, 1, 1, 1, 1]],
    ["Роман Дьяков", [1, 1, 1, 0, 0, 0, 0, 0]],
    ["Вероника Крылова", [1, 1, 1, 1, 1, 1, 0, 0]],
    ["Артем Котов", [1, 1, 0, 1, 1, 1, 1, 1]],
    ["Ксения Корнилова", [1, 1, 1, 1, 1, 1, 1, 1]],
    ["Максим Рожков", [1, 1, 1, 1, 1, 1, 1, 1]],
    ["Владимир Сысоев", [1, 1, 1, 1, 0, 0, 0, 0]],
    ["Светлана Панфилова", [1, 1, 1, 1, 1, 1, 1, 1]],
    ["Юлия Логинова", [1, 1, 1, 1, 1, 1, 1, 1]],
    ["Тимофей Соловьев", [1, 1, 1, 1, 1, 1, 1, 0]],
    ["Дарья Селезнёва", [1, 1, 1, 1, 1, 1, 1, 1]],
    ["Алексей Чернов", [1, 1, 1, 0, 0, 0, 0, 0]],
    ["Наталья Карпова", [1, 1, 1, 1, 1, 1, 1, 1]],
    ["Григорий Киселёв", [1, 1, 1, 0, 1, 0, 0, 1]],
    ["Елена Захарова", [1, 1, 1, 1, 1, 1, 0, 0]],
    ["Михаил Мартынов", [1, 1, 1, 1, 1, 0, 1, 1]],
    ["Жанна Куликова", [1, 1, 0, 0, 0, 0, 0, 0]],
    ["Иван Пахомов", [1, 1, 1, 1, 1, 0, 0, 0]],
    ["Леонид Герасимов", [1, 1, 1, 1, 1, 0, 1, 1]],
    ["Татьяна Николаева", [1, 1, 1, 0, 1, 1, 1, 0]]
  ]
};

const STATUS_META = {
  accepted: { label: "Принято", className: "status-accepted" },
  review: { label: "На проверке", className: "status-review" },
  returned: { label: "Возврат", className: "status-returned" },
  todo: { label: "Не отправлено", className: "status-todo" },
  notStarted: { label: "Не начато", className: "status-notStarted" }
};

const MODULE_HINTS = [
  "Проверь структуру дашборда и читаемость главного экрана.",
  "Покажи расчеты KPI и аккуратные подписи к метрикам.",
  "Уточни композицию визуалов и единый стиль графиков.",
  "Сделай историю данных понятной с первого взгляда.",
  "Проверь логику работы с данными и описание связей.",
  "Собери интерфейс так, чтобы сценарий был кликабельным.",
  "Убери уязвимые места и явно подпиши ограничения.",
  "Покажи итоговую ценность проекта и готовый сценарий demo."
];

const COMPACT_MODULE_NAMES = [
  "Фундамент дашборда",
  "Расчеты и KPI",
  "Продвинутый визуал",
  "Дата-сторителлинг",
  "База данных с Cursor",
  "Веб-интерфейс",
  "Безопасность",
  "Финальный проект"
];

const root = document.getElementById("app");
let state = createInitialState();

root.addEventListener("click", handleClick);
root.addEventListener("change", handleChange);

render();

function createInitialState() {
  const students = SOURCE_DATA.students.map((row, index) => buildStudent(row, index));
  return {
    role: null,
    teacherTab: "kanban",
    teacherSort: {
      column: "student",
      direction: "asc"
    },
    selectedStudentId: null,
    studentAuthorized: false,
    studentLoginId: students[0].id,
    studentViewId: null,
    certificateModalId: null,
    students
  };
}

function buildStudent([name, progress], index) {
  const student = {
    id: `student-${index + 1}`,
    name,
    certificateReceived: false,
    modules: SOURCE_DATA.modules.map((title, moduleIndex) => ({
      id: `module-${moduleIndex + 1}`,
      index: moduleIndex,
      shortTitle: `Модуль ${moduleIndex + 1}`,
      title,
      accepted: Boolean(progress[moduleIndex]),
      status: Boolean(progress[moduleIndex]) ? "accepted" : "notStarted",
      comment: ""
    }))
  };

  repairStudentStatuses(student, ["review", "todo", "returned"][index % 3]);
  return student;
}

function repairStudentStatuses(student, currentStatus) {
  const firstOpenIndex = student.modules.findIndex((module) => !module.accepted);

  student.modules.forEach((module, index) => {
    if (module.accepted) {
      module.status = "accepted";
      module.comment = acceptedComment(index);
      return;
    }

    if (firstOpenIndex === -1) {
      module.status = "accepted";
      module.comment = acceptedComment(index);
      return;
    }

    if (index === firstOpenIndex) {
      const resolvedStatus = currentStatus || (module.status !== "notStarted" ? module.status : "todo");
      module.status = resolvedStatus;
      module.comment = currentComment(resolvedStatus, index);
      return;
    }

    module.status = "notStarted";
    module.comment = `Этот шаг пока закрыт. Сначала завершите предыдущий модуль. ${MODULE_HINTS[index]}`;
  });
}

function acceptedComment(index) {
  return `Задание по модулю принято. ${MODULE_HINTS[index]}`;
}

function currentComment(status, index) {
  if (status === "review") {
    return `Работа отправлена и ждёт решения преподавателя. ${MODULE_HINTS[index]}`;
  }

  if (status === "returned") {
    return `Нужна доработка и повторная отправка. ${MODULE_HINTS[index]}`;
  }

  return `Модуль открыт, но решение ещё не отправлено. ${MODULE_HINTS[index]}`;
}

function render() {
  document.body.classList.toggle("teacher-mode", state.role === "teacher");
  document.body.classList.toggle("student-dashboard-mode", state.role === "student" && state.studentAuthorized);

  root.innerHTML = `
    <div class="page-shell ${state.role === "teacher" ? "is-teacher" : ""}">
      ${state.role ? renderWorkspace() : renderStartScreen()}
      ${state.certificateModalId ? renderCertificateModal(getStudent(state.certificateModalId)) : ""}
      ${state.role && state.role !== "teacher" ? `<div class="footer-note">Данные взяты из файла ${escapeHtml(SOURCE_DATA.sourceFile)}. Все изменения живут только в памяти браузера.</div>` : ""}
    </div>
  `;
}

function renderStartScreenLegacy() {
  const completed = state.students.filter(isComplete).length;
  return `
    <section class="hero panel">
      <p class="eyebrow">Учебный LMS-прототип</p>
      <h1>Простой веб-интерфейс для управления обучением по Excel-табелю</h1>
      <p>Это статический проект без базы данных и без backend. Исходный Excel уже превращён в стартовое состояние: 31 студент и 8 учебных модулей.</p>
      <div class="summary-grid">
        <article class="summary-card"><span>Всего студентов</span><strong>${state.students.length}</strong></article>
        <article class="summary-card"><span>Модулей в программе</span><strong>${SOURCE_DATA.modules.length}</strong></article>
        <article class="summary-card"><span>Полностью завершили курс</span><strong>${completed}</strong></article>
      </div>
      <div class="role-grid">
        <button type="button" class="role-card" data-action="set-role" data-role="teacher">
          <strong>Роль 01</strong>
          <h2>Преподаватель</h2>
          <p>Канбан по модулям, таблица студентов, карточка прогресса, отметка сертификатов и действия «Принять» / «Вернуть».</p>
        </button>
        <button type="button" class="role-card" data-action="set-role" data-role="student">
          <strong>Роль 02</strong>
          <h2>Студент</h2>
          <p>Просмотр своего прогресса, статусов модулей, комментариев преподавателя и имитация повторной отправки.</p>
        </button>
      </div>
    </section>
  `;
}

function renderStartScreenProductLegacy() {
  const completed = state.students.filter(isComplete).length;
  return `
    <section class="hero panel">
      <p class="eyebrow">Учебный LMS-прототип</p>
      <h1>LMS-прототип для управления обучением по Excel-табелю</h1>
      <p>Данные взяты из файла Табель-аноним.xlsx. Все изменения живут только в памяти браузера.</p>
      <div class="summary-grid">
        <article class="summary-card"><span>Всего студентов</span><strong>${state.students.length}</strong></article>
        <article class="summary-card"><span>Модулей в программе</span><strong>${SOURCE_DATA.modules.length}</strong></article>
        <article class="summary-card"><span>Полностью завершили курс</span><strong>${completed}</strong></article>
      </div>
      <div class="role-grid">
        <button type="button" class="role-card" data-action="set-role" data-role="teacher">
          <h2>Преподаватель</h2>
          <p>Канбан по модулям, список студентов, проверка работ и управление сертификатами.</p>
        </button>
        <button type="button" class="role-card" data-action="set-role" data-role="student">
          <h2>Студент</h2>
          <p>Личный кабинет студента, статусы модулей, комментарии преподавателя и просмотр сертификата.</p>
        </button>
      </div>
    </section>
  `;
}

function renderWorkspaceLegacy() {
  const isTeacher = state.role === "teacher";
  const teacherMetrics = isTeacher ? getTeacherMetrics() : null;

  return `
    <div class="workspace ${isTeacher ? "workspace-teacher" : ""}">
      <section class="topbar panel ${isTeacher ? "topbar-compact" : ""}">
        <div>
          <p class="eyebrow">${isTeacher ? "Дашборд преподавателя" : "Дашборд студента"}</p>
          <h1>Управление обучением</h1>
          <p>${isTeacher ? "Локальный LMS-прототип по Excel. Канбан показывает первый непринятый модуль каждого студента." : `Прототип собран как обычный сайт на HTML, CSS и JavaScript. Его можно открыть локально через файл ${escapeHtml("index.html")} без базы данных и сложного сервера.`}</p>
        </div>
        <div class="topbar-actions">
          <div class="topbar-control-row">
            <div class="segmented">
              <button type="button" data-action="set-role" data-role="teacher" class="${state.role === "teacher" ? "is-active" : ""}">Преподаватель</button>
              <button type="button" data-action="set-role" data-role="student" class="${state.role === "student" ? "is-active" : ""}">Студент</button>
            </div>
            <button type="button" class="button secondary" data-action="reset-demo">Сбросить демо</button>
          </div>
          ${
            isTeacher
              ? `<div class="teacher-topbar-meta">
                   <div class="teacher-topbar-line">Всего студентов: <strong>${state.students.length}</strong> | Активных: <strong>${teacherMetrics.activeStudents}</strong> | Завершили курс: <strong>${teacherMetrics.certificatesReady}</strong></div>
                   <div class="teacher-topbar-line">На проверке: <strong>${teacherMetrics.reviewCount}</strong> | Не отправлено: <strong>${teacherMetrics.todoCount}</strong> | Возврат: <strong>${teacherMetrics.returnedCount}</strong></div>
                 </div>`
              : ""
          }
        </div>
      </section>
    ${state.role === "teacher" ? renderTeacherMode() : renderStudentFlow()}
    </div>
  `;
}

function renderStudentFlow() {
  if (!state.studentAuthorized) {
    return renderStudentLogin();
  }

  return renderStudentMode();
}

function renderStartScreen() {
  const completed = state.students.filter(isComplete).length;

  return `
    <section class="hero panel">
      <p class="eyebrow">Учебная платформа</p>
      <h1>Система управления учебным процессом</h1>
      <p>Демо-версия. Данные загружены из файла Табель-аноним.xlsx. Изменения сохраняются только в памяти браузера.</p>
      <div class="summary-grid">
        <article class="summary-card"><span>Всего студентов</span><strong>${state.students.length}</strong></article>
        <article class="summary-card"><span>Модулей в программе</span><strong>${SOURCE_DATA.modules.length}</strong></article>
        <article class="summary-card"><span>Полностью завершили курс</span><strong>${completed}</strong></article>
      </div>
      <div class="role-grid">
        <button type="button" class="role-card" data-action="set-role" data-role="teacher">
          <h2>Преподаватель</h2>
          <p>Проверка работ, управление статусами и выпуск сертификатов.</p>
        </button>
        <button type="button" class="role-card" data-action="set-role" data-role="student">
          <h2>Студент</h2>
          <p>Просмотр прогресса, отправка работ и получение сертификата.</p>
        </button>
      </div>
    </section>
  `;
}

function renderWorkspace() {
  const isTeacher = state.role === "teacher";
  const teacherMetrics = isTeacher ? getTeacherMetrics() : null;
  const isStudentLogin = !isTeacher && !state.studentAuthorized;
  const eyebrow = isTeacher ? "Кабинет преподавателя" : "Кабинет студента";
  const heading = isTeacher ? "Управление обучением" : isStudentLogin ? "Вход в систему" : "Учебный прогресс";
  const subtitle = isTeacher
    ? "Канбан показывает первый непринятый модуль каждого студента."
    : isStudentLogin
      ? "Выберите студента и войдите в демо-режим."
      : "Статусы модулей, комментарии преподавателя и сертификат.";

  return `
    <div class="workspace ${isTeacher ? "workspace-teacher" : ""}">
      <section class="topbar panel ${isTeacher ? "topbar-compact" : ""}">
        <div>
          <p class="eyebrow">${eyebrow}</p>
          <h1>${heading}</h1>
          <p>${subtitle}</p>
        </div>
        <div class="topbar-actions">
          <div class="topbar-control-row">
            <div class="segmented">
              <button type="button" data-action="set-role" data-role="teacher" class="${state.role === "teacher" ? "is-active" : ""}">Преподаватель</button>
              <button type="button" data-action="set-role" data-role="student" class="${state.role === "student" ? "is-active" : ""}">Студент</button>
            </div>
            <button type="button" class="button secondary" data-action="reset-demo">Сбросить демо</button>
          </div>
          ${
            isTeacher
              ? `<div class="teacher-topbar-meta">
                   <div class="teacher-topbar-line">Всего студентов: <strong>${state.students.length}</strong> | Активных: <strong>${teacherMetrics.activeStudents}</strong> | Завершили курс: <strong>${teacherMetrics.certificatesReady}</strong></div>
                   <div class="teacher-topbar-line">На проверке: <strong>${teacherMetrics.reviewCount}</strong> | Не отправлено: <strong>${teacherMetrics.todoCount}</strong> | Возврат: <strong>${teacherMetrics.returnedCount}</strong></div>
                 </div>`
              : ""
          }
        </div>
      </section>
    ${state.role === "teacher" ? renderTeacherMode() : renderStudentFlow()}
    </div>
  `;
}

function renderTeacherMode() {
  const selectedStudent = state.selectedStudentId ? getStudent(state.selectedStudentId) : null;
  const teacherHint = getTeacherHint(selectedStudent);
  const isStudentsView = state.teacherTab === "students";
  const layoutClassName = `teacher-layout ${selectedStudent ? "has-sidebar" : "no-sidebar"} ${isStudentsView ? "is-students-view" : ""}`;

  return `
    <section class="teacher-dashboard">
      <section class="toolbar toolbar-compact">
        <div class="segmented">
          <button type="button" data-action="set-teacher-tab" data-tab="kanban" class="${state.teacherTab === "kanban" ? "is-active" : ""}">Канбан</button>
          <button type="button" data-action="set-teacher-tab" data-tab="students" class="${state.teacherTab === "students" ? "is-active" : ""}">Список студентов</button>
        </div>
        <div class="small-text">${teacherHint}</div>
      </section>
      <div class="${layoutClassName}">
        <section class="teacher-main-panel">
          ${state.teacherTab === "kanban" ? renderKanban() : renderStudentsTable()}
        </section>
        ${selectedStudent ? `<aside class="detail-panel panel">${renderTeacherSidebar(selectedStudent)}</aside>` : ""}
      </div>
    </section>
  `;
}

function renderKanban() {
  const columns = SOURCE_DATA.modules.map((title, index) => {
    const students = state.students.filter((student) => {
      const currentModule = getCurrentModule(student);
      return currentModule && currentModule.index === index;
    });
    const completedCount = state.students.filter((student) => student.modules[index].accepted).length;
    const percent = Math.round((completedCount / state.students.length) * 100);
    const statusCounts = students.reduce(
      (accumulator, student) => {
        const status = getCurrentModule(student)?.status;
        if (status && Object.hasOwn(accumulator, status)) {
          accumulator[status] += 1;
        }
        return accumulator;
      },
      { review: 0, todo: 0, returned: 0 }
    );

    return `
      <article class="kanban-column panel">
        <div class="column-header">
          <span class="module-pill">Модуль ${index + 1}</span>
          <h3>${escapeHtml(title)}</h3>
          <div class="column-legend">
            ${renderColumnLegendItem("review", statusCounts.review, "На проверке")}
            ${renderColumnLegendItem("todo", statusCounts.todo, "Не отправлено")}
            ${renderColumnLegendItem("returned", statusCounts.returned, "Возврат")}
          </div>
        </div>
        <div class="kanban-list">
          ${students.length ? students.map(renderKanbanCard).join("") : `<div class="empty-state">Нет активных студентов в этой колонке.</div>`}
        </div>
        <div class="column-footer">
          <span>Активных студентов: ${students.length}</span>
          <span>Пройдено: ${percent}%</span>
        </div>
      </article>
    `;
  });

  return `<div class="kanban-board">${columns.join("")}</div>`;
}

function renderKanbanCard(student) {
  const currentModule = getCurrentModule(student);
  const acceptedCount = countAccepted(student);
  return `
    <button type="button" class="student-card is-${currentModule.status}" data-action="open-student" data-student-id="${student.id}">
      <strong class="student-card-name">${escapeHtml(student.name)}</strong>
      <span class="student-card-trailing">
        <span class="student-card-progress">${acceptedCount}/${SOURCE_DATA.modules.length}</span>
        <span class="student-card-dot ${STATUS_META[currentModule.status].className}" aria-hidden="true"></span>
      </span>
    </button>
  `;
}

function renderStudentsTable() {
  const sortedStudents = getSortedTeacherStudents();
  return `
    <section class="table-panel panel">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>${renderTeacherSortButton("student", "Студент")}</th>
              <th>${renderTeacherSortButton("progress", "Прогресс")}</th>
              <th>${renderTeacherSortButton("status", "Текущий статус")}</th>
              <th>${renderTeacherSortButton("certificate", "Сертификат")}</th>
              <th>${renderTeacherSortButton("actions", "Действия")}</th>
              <th>${renderTeacherSortButton("received", "Получено")}</th>
            </tr>
          </thead>
          <tbody>${sortedStudents.map(renderStudentRow).join("")}</tbody>
        </table>
      </div>
    </section>
  `;
}

function renderStudentRow(student) {
  const currentModule = getCurrentModule(student);
  const percent = progressPercent(student);
  const certificateInfo = getTeacherCertificateInfo(student);
  const actions = isComplete(student)
    ? `<div class="table-actions-cell">
         <button type="button" class="button secondary button-compact" data-action="open-certificate" data-student-id="${student.id}">Открыть сертификат</button>
       </div>`
    : `<span class="muted table-empty-action">Нет действий</span>`;
  const received = isComplete(student)
    ? `<div class="table-received-cell">
         <button type="button" class="button ${student.certificateReceived ? "success" : "secondary"} button-compact" data-action="toggle-certificate" data-student-id="${student.id}">
           ${student.certificateReceived ? "Получено" : "Отметить получено"}
         </button>
       </div>`
    : `<span class="muted table-empty-action">Нет действий</span>`;

  return `
    <tr>
      <td>
        <button type="button" class="ghost-link" data-action="open-student" data-student-id="${student.id}">
          ${escapeHtml(student.name)}
        </button>
      </td>
      <td>
        <div class="progress-bar"><span style="width:${percent}%"></span></div>
        <div class="small-text">${countAccepted(student)}/${SOURCE_DATA.modules.length} модулей, ${percent}%</div>
      </td>
      <td>
        ${
          currentModule
            ? `${renderStatusPill(currentModule.status)}<div class="small-text">${escapeHtml(currentModule.shortTitle)}</div>`
            : `${renderStatusPill("accepted")}<div class="small-text">Курс завершён</div>`
        }
      </td>
      <td><span class="table-cert-status ${certificateInfo.className}">${certificateInfo.label}</span></td>
      <td>${actions}</td>
      <td>${received}</td>
    </tr>
  `;
}

function renderTeacherPlaceholder() {
  return `
    <div class="teacher-sidebar-empty">
      <p class="eyebrow">Карточка студента</p>
      <h2>Карточка закрыта</h2>
      <p>Выберите студента на канбан-доске или в списке студентов, чтобы открыть подробную карточку.</p>
    </div>
  `;
}

function renderTeacherSidebar(student) {
  const currentModule = getCurrentModule(student);
  const currentModuleLabel = currentModule ? currentModule.shortTitle : "Курс завершён";
  const commentValue = currentModule ? currentModule.comment : "Все 8 модулей приняты. Можно открыть сертификат.";

  return `
    <div class="detail-header">
      <div class="detail-header-row">
        <div>
          <p class="eyebrow">Карточка студента</p>
          <h2>${escapeHtml(student.name)}</h2>
          <p class="detail-current-module">Текущий модуль: <strong>${escapeHtml(currentModuleLabel)}</strong></p>
        </div>
        <button type="button" class="button secondary button-compact" data-action="close-student">Закрыть</button>
      </div>
      <div class="small-text">${countAccepted(student)}/${SOURCE_DATA.modules.length} модулей сдано</div>
    </div>
    <div class="detail-scroll">
      <div class="sidebar-status-list">
        ${student.modules.map((module) => renderTeacherStatusRow(module, currentModule)).join("")}
      </div>
      <div class="sidebar-footer">
        <label class="sidebar-comment">
          <span>Комментарий преподавателя</span>
          <textarea
            rows="4"
            class="comment-input"
            data-action="edit-teacher-comment"
            data-student-id="${student.id}"
            data-module-index="${currentModule ? currentModule.index : ""}"
            ${currentModule ? "" : "disabled"}
          >${escapeHtml(commentValue)}</textarea>
        </label>
        ${
          currentModule
            ? `<div class="inline-actions teacher-sidebar-actions">
                <button type="button" class="button primary button-compact" data-action="accept-module" data-student-id="${student.id}" data-module-index="${currentModule.index}">Принять</button>
                <button type="button" class="button danger button-compact" data-action="return-module" data-student-id="${student.id}" data-module-index="${currentModule.index}">Вернуть на доработку</button>
              </div>`
            : `<div class="small-text">Все задания уже приняты. Для этого студента доступны действия с сертификатом в таблице.</div>`
        }
      </div>
    </div>
  `;
}

function renderTeacherStatusRow(module, currentModule) {
  const isCurrent = currentModule && currentModule.id === module.id;
  const moduleLabel = COMPACT_MODULE_NAMES[module.index] || module.title;
  return `
    <div class="sidebar-status-row ${isCurrent ? "is-current" : ""}">
      <div class="sidebar-module-number">${module.index + 1}</div>
      <div class="sidebar-status-label">${escapeHtml(moduleLabel)}</div>
      <span class="sidebar-status-value ${STATUS_META[module.status].className}">${getTeacherStatusLabel(module.status)}</span>
    </div>
  `;
}

function renderStudentLogin() {
  return `
    <section class="student-login panel">
      <div class="student-login-form">
        <label>
          <span>Выберите студента</span>
          <select data-action="select-student-login">
            ${state.students
              .map((item) => `<option value="${item.id}" ${item.id === state.studentLoginId ? "selected" : ""}>${escapeHtml(item.name)}</option>`)
              .join("")}
          </select>
        </label>
        <label>
          <span>Логин</span>
          <input type="text" placeholder="demo@student" autocomplete="username">
        </label>
        <label>
          <span>Пароль</span>
          <input type="password" placeholder="••••••••" autocomplete="current-password">
        </label>
        <button type="button" class="button primary" data-action="student-login">Войти</button>
        <div class="small-text">Демо-режим - просто нажмите Войти</div>
      </div>
    </section>
  `;
}

function renderStudentModeLegacy() {
  const student = getStudent(state.studentViewId);
  const currentModule = getCurrentModule(student);
  const progressText = `${countAccepted(student)}/${SOURCE_DATA.modules.length}`;
  const currentStepText = currentModule ? currentModule.shortTitle : "Курс завершён";
  const currentStatusText = currentModule ? STATUS_META[currentModule.status].label : "Всё принято";
  const teacherCommentText = currentModule ? currentModule.comment : "Сертификат можно получить у преподавателя";

  return `
    <section class="student-picker panel">
      <article class="summary-card student-identity-card">
        <strong class="student-identity-name">${escapeHtml(student.name)}</strong>
        <div class="student-identity-meta">Прогресс: ${progressText}</div>
        <div class="student-identity-meta">Текущий шаг: ${escapeHtml(currentStepText)}</div>
      </article>
      <article class="summary-card student-status-card">
        <span>Статус сейчас</span>
        <strong>${escapeHtml(currentStatusText)}</strong>
      </article>
      <article class="summary-card student-comment-card">
        <span>Комментарий преподавателя</span>
        <strong>${escapeHtml(teacherCommentText)}</strong>
      </article>
    </section>
    <section class="student-modules">
      ${student.modules.map((module) => renderStudentModuleCard(student, module)).join("")}
    </section>
  `;
}

function renderStudentModuleCard(student, module) {
  const currentModule = getCurrentModule(student);
  const isCurrent = currentModule && currentModule.id === module.id;
  const canResubmit = isCurrent && (module.status === "returned" || module.status === "todo");
  const actionLabel = module.status === "returned" ? "Повторно отправить" : "Отправить на проверку";

  return `
    <article class="module-card ${isCurrent ? "is-current" : ""}">
      <div class="module-card-header">
        <div>
          <span class="module-pill">${escapeHtml(module.shortTitle)}</span>
          <h3>${escapeHtml(module.title)}</h3>
        </div>
        ${renderStatusPill(module.status)}
      </div>
      <div class="note-box">
        <strong>Комментарий преподавателя</strong>
        <div class="module-hint">${escapeHtml(module.comment)}</div>
      </div>
      ${
        canResubmit
          ? `<div class="inline-actions">
              <button type="button" class="button primary" data-action="resubmit-module" data-student-id="${student.id}" data-module-index="${module.index}">${actionLabel}</button>
            </div>`
          : isCurrent && module.status === "review"
            ? `<div class="inline-note">Работа уже отправлена и находится на проверке.</div>`
            : ""
      }
    </article>
  `;
}

function renderCertificateModalLegacy(student) {
  return `
    <div class="certificate-modal">
      <button type="button" class="modal-backdrop" data-action="close-certificate" aria-label="Закрыть"></button>
      <div class="modal-card panel">
        <div class="student-card-header">
          <div>
            <p class="eyebrow">Сертификат</p>
            <h3>${escapeHtml(student.name)}</h3>
          </div>
          <div class="inline-actions certificate-modal-actions">
            <button type="button" class="button secondary" data-action="print-certificate">Печать / PDF</button>
            <button type="button" class="button secondary" data-action="close-certificate">Закрыть</button>
          </div>
        </div>
        <div class="certificate-sheet">
          <p class="eyebrow">Подтверждение прохождения</p>
          <h2>Сертификат о завершении курса</h2>
          <div class="certificate-student">${escapeHtml(student.name)}</div>
          <p>Успешно завершил(а) все 8 модулей учебной программы «Управление обучением» в демонстрационной LMS.</p>
          <div class="certificate-meta">
            <span>Источник данных: ${escapeHtml(SOURCE_DATA.sourceFile)}</span>
            <span>Дата просмотра: ${new Intl.DateTimeFormat("ru-RU", { day: "2-digit", month: "long", year: "numeric" }).format(new Date())}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderCertificateModal(student) {
  return `
    <div class="certificate-modal">
      <button type="button" class="modal-backdrop" data-action="close-certificate" aria-label="Закрыть"></button>
      <div class="modal-card panel">
        <div class="student-card-header">
          <div>
            <p class="eyebrow">Сертификат</p>
            <h3>${escapeHtml(student.name)}</h3>
          </div>
          <div class="inline-actions certificate-modal-actions">
            <button type="button" class="button secondary" data-action="print-certificate">Печать / PDF</button>
            <button type="button" class="button secondary" data-action="close-certificate">Закрыть</button>
          </div>
        </div>
        <div class="certificate-sheet">
          <h2>Сертификат о завершении курса</h2>
          <div class="certificate-student">${escapeHtml(student.name)}</div>
          <p>Настоящий сертификат подтверждает успешное завершение учебной программы</p>
          <p>Аналитика данных: от дашборда до итогового проекта</p>
          <div class="certificate-meta">
            <span>Дата выдачи: ${new Intl.DateTimeFormat("ru-RU", { day: "2-digit", month: "long", year: "numeric" }).format(new Date())}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function handleClick(event) {
  const button = event.target.closest("[data-action]");
  if (!button) {
    return;
  }

  const action = button.dataset.action;
  const studentId = button.dataset.studentId;
  const moduleIndex = Number(button.dataset.moduleIndex);

  if (action === "set-role") {
    state.role = button.dataset.role;
  } else if (action === "set-teacher-tab") {
    state.teacherTab = button.dataset.tab;
  } else if (action === "student-login") {
    state.studentViewId = state.studentLoginId;
    state.studentAuthorized = true;
  } else if (action === "sort-teacher-table") {
    const nextColumn = button.dataset.column;
    state.teacherSort = {
      column: nextColumn,
      direction: state.teacherSort.column === nextColumn && state.teacherSort.direction === "asc" ? "desc" : "asc"
    };
  } else if (action === "close-student") {
    state.selectedStudentId = null;
  } else if (action === "open-student") {
    state.selectedStudentId = studentId;
  } else if (action === "accept-module") {
    const student = getStudent(studentId);
    student.modules[moduleIndex].accepted = true;
    repairStudentStatuses(student, "todo");
    state.selectedStudentId = studentId;
  } else if (action === "return-module") {
    repairStudentStatuses(getStudent(studentId), "returned");
    state.selectedStudentId = studentId;
  } else if (action === "resubmit-module") {
    repairStudentStatuses(getStudent(studentId), "review");
    state.studentViewId = studentId;
  } else if (action === "open-certificate") {
    state.certificateModalId = studentId;
  } else if (action === "print-certificate") {
    printCertificate();
    return;
  } else if (action === "close-certificate") {
    state.certificateModalId = null;
  } else if (action === "toggle-certificate") {
    const student = getStudent(studentId);
    student.certificateReceived = !student.certificateReceived;
  } else if (action === "reset-demo") {
    state = createInitialState();
  }

  render();
}

function handleChange(event) {
  if (event.target.dataset.action === "select-student-login") {
    state.studentLoginId = event.target.value;
    render();
    return;
  }

  if (event.target.dataset.action === "select-student") {
    state.studentViewId = event.target.value;
    render();
    return;
  }

  if (event.target.dataset.action === "edit-teacher-comment") {
    const student = getStudent(event.target.dataset.studentId);
    const moduleIndex = Number(event.target.dataset.moduleIndex);
    if (student && Number.isInteger(moduleIndex) && moduleIndex >= 0) {
      student.modules[moduleIndex].comment = event.target.value.trim() || currentComment(student.modules[moduleIndex].status, moduleIndex);
    }
    render();
  }
}

function getStudent(studentId) {
  return state.students.find((student) => student.id === studentId) || state.students[0];
}

function getCurrentModule(student) {
  return student.modules.find((module) => !module.accepted) || null;
}

function countAccepted(student) {
  return student.modules.filter((module) => module.accepted).length;
}

function progressPercent(student) {
  return Math.round((countAccepted(student) / SOURCE_DATA.modules.length) * 100);
}

function isComplete(student) {
  return countAccepted(student) === SOURCE_DATA.modules.length;
}

function renderStatusPill(status) {
  const meta = STATUS_META[status];
  return `<span class="status-pill ${meta.className}">${meta.label}</span>`;
}

function getTeacherStatusLabel(status) {
  if (status === "accepted") {
    return "Сдано";
  }

  if (status === "review") {
    return "На проверке";
  }

  if (status === "returned") {
    return "Возврат";
  }

  return "Не сдано";
}

function getTeacherHint(selectedStudent) {
  return "Кликните по имени студента, чтобы открыть карточку справа.";
}

function renderTeacherSortButton(column, label) {
  const isActive = state.teacherSort.column === column;
  const arrow = isActive ? (state.teacherSort.direction === "asc" ? "▲" : "▼") : "";

  return `
    <button type="button" class="table-sort-button ${isActive ? "is-active" : ""}" data-action="sort-teacher-table" data-column="${column}">
      <span>${label}</span>
      ${arrow ? `<span class="sort-arrow" aria-hidden="true">${arrow}</span>` : ""}
    </button>
  `;
}

function getSortedTeacherStudents() {
  const collator = new Intl.Collator("ru", { sensitivity: "base", numeric: true });
  const { column, direction } = state.teacherSort;
  const factor = direction === "asc" ? 1 : -1;

  return [...state.students].sort((left, right) => {
    let result = 0;

    if (column === "student") {
      result = collator.compare(left.name, right.name);
    } else if (column === "progress") {
      result = countAccepted(left) - countAccepted(right);
    } else if (column === "status") {
      result = collator.compare(getTeacherStatusSortLabel(left), getTeacherStatusSortLabel(right));
    } else if (column === "certificate") {
      result = getTeacherCertificateInfo(left).sortValue - getTeacherCertificateInfo(right).sortValue;
    } else if (column === "actions") {
      result = getTeacherActionsSortValue(left) - getTeacherActionsSortValue(right);
    } else if (column === "received") {
      result = getTeacherReceivedSortValue(left) - getTeacherReceivedSortValue(right);
    }

    if (result === 0) {
      result = collator.compare(left.name, right.name);
    }

    return result * factor;
  });
}

function getTeacherStatusSortLabel(student) {
  const currentModule = getCurrentModule(student);
  return currentModule ? getTeacherStatusLabel(currentModule.status) : "Сдано";
}

function getTeacherCertificateInfo(student) {
  if (!isComplete(student)) {
    return {
      label: "Не готов",
      sortValue: 0,
      className: "is-muted"
    };
  }

  if (student.certificateReceived) {
    return {
      label: "Получен",
      sortValue: 2,
      className: "is-received"
    };
  }

  return {
    label: "Готов",
    sortValue: 1,
    className: "is-ready"
  };
}

function getTeacherActionsSortValue(student) {
  return isComplete(student) ? 1 : 0;
}

function getTeacherReceivedSortValue(student) {
  if (!isComplete(student)) {
    return 0;
  }

  return student.certificateReceived ? 2 : 1;
}

function renderStudentModeCertificateLegacy() {
  const student = getStudent(state.studentViewId);
  const currentModule = getCurrentModule(student);
  const progressText = `${countAccepted(student)}/${SOURCE_DATA.modules.length}`;
  const currentStepText = currentModule ? currentModule.shortTitle : "Курс завершён";
  const isCourseComplete = isComplete(student);
  const statusText = isCourseComplete
    ? "Курс завершён"
    : currentModule
      ? STATUS_META[currentModule.status].label
      : "Всё принято";
  const teacherComment = isCourseComplete
    ? "Все модули приняты. Сертификат доступен для скачивания."
    : currentModule
      ? currentModule.comment
      : "Сертификат можно получить у преподавателя";
  const showCertificateButton = isCourseComplete;

  return `
    <section class="student-picker panel">
      <article class="summary-card student-identity-card">
        <strong class="student-identity-name">${escapeHtml(student.name)}</strong>
        <div class="student-identity-meta">Прогресс: ${progressText}</div>
        <div class="student-identity-meta">Текущий шаг: ${escapeHtml(currentStepText)}</div>
      </article>
      <article class="summary-card student-status-card">
        <span>Статус сейчас</span>
        <strong class="${isCourseComplete ? "status-complete" : ""}">${escapeHtml(statusText)}</strong>
      </article>
      <article class="summary-card student-comment-card">
        <span>Комментарий преподавателя</span>
        <strong>${escapeHtml(teacherComment)}</strong>
        ${
          showCertificateButton
            ? `<button type="button" class="certificate-btn" data-action="open-certificate" data-student-id="${student.id}">Скачать сертификат</button>`
            : ""
        }
      </article>
    </section>
    <section class="student-modules">
      ${student.modules.map((module) => renderStudentModuleCard(student, module)).join("")}
    </section>
  `;
}

function renderStudentMode() {
  const student = getStudent(state.studentViewId);
  const currentModule = getCurrentModule(student);
  const progressText = `${countAccepted(student)}/${SOURCE_DATA.modules.length}`;
  const currentStepText = currentModule ? currentModule.shortTitle : "Курс завершён";
  const isCourseComplete = isComplete(student);
  const statusText = isCourseComplete
    ? "Курс завершён"
    : currentModule
      ? STATUS_META[currentModule.status].label
      : "Всё принято";
  const teacherComment = isCourseComplete
    ? "Все модули приняты. Сертификат доступен."
    : currentModule
      ? currentModule.comment
      : "Сертификат можно получить у преподавателя";

  return `
    <section class="student-picker panel">
      <article class="summary-card student-identity-card">
        <strong class="student-identity-name">${escapeHtml(student.name)}</strong>
        <div class="student-identity-meta">Прогресс: ${progressText}</div>
        <div class="student-identity-meta">Текущий шаг: ${escapeHtml(currentStepText)}</div>
      </article>
      <article class="summary-card student-status-card">
        <span>Статус сейчас</span>
        <strong class="${isCourseComplete ? "status-complete" : ""}">${escapeHtml(statusText)}</strong>
      </article>
      <article class="summary-card student-comment-card">
        <span>Комментарий преподавателя</span>
        <strong>${escapeHtml(teacherComment)}</strong>
      </article>
      <article class="summary-card student-certificate-card">
        <span>Сертификат</span>
        <button
          type="button"
          class="button ${isCourseComplete ? "success" : "secondary"} button-compact"
          data-action="open-certificate"
          data-student-id="${student.id}"
          ${isCourseComplete ? "" : "disabled"}
        >
          Открыть сертификат
        </button>
      </article>
    </section>
    <section class="student-modules">
      ${student.modules.map((module) => renderStudentModuleCard(student, module)).join("")}
    </section>
  `;
}

function printCertificate() {
  const certificateSheet = document.querySelector(".certificate-sheet");
  if (!certificateSheet) {
    return;
  }

  let cleanedUp = false;
  const cleanup = () => {
    if (cleanedUp) {
      return;
    }
    cleanedUp = true;
    document.body.classList.remove("print-certificate-mode");
    window.removeEventListener("afterprint", cleanup);
  };

  document.body.classList.add("print-certificate-mode");
  window.addEventListener("afterprint", cleanup, { once: true });
  window.print();
  window.setTimeout(cleanup, 0);
}

function getTeacherMetrics() {
  const activeStudents = state.students.filter((student) => getCurrentModule(student)).length;
  const reviewCount = state.students.filter((student) => {
    const currentModule = getCurrentModule(student);
    return currentModule && currentModule.status === "review";
  }).length;
  const todoCount = state.students.filter((student) => {
    const currentModule = getCurrentModule(student);
    return currentModule && currentModule.status === "todo";
  }).length;
  const returnedCount = state.students.filter((student) => {
    const currentModule = getCurrentModule(student);
    return currentModule && currentModule.status === "returned";
  }).length;
  const certificatesReady = state.students.filter(isComplete).length;

  return {
    activeStudents,
    reviewCount,
    todoCount,
    returnedCount,
    certificatesReady
  };
}

function renderColumnLegendItem(status, count, label) {
  if (!count) {
    return "";
  }

  return `<span class="column-legend-item ${STATUS_META[status].className}">${label}: ${count}</span>`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
