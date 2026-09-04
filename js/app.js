(function () {
  const LETTERS = ["A", "B", "C", "D", "E"];
  const COURSE_KEY = "transpetro-2026-course";
  const TOPIC_KEY = "transpetro-2026-progress-v2";
  const ATTEMPTS_KEY = "transpetro-2026-test-attempts";
  const THEME_KEY = "transpetro-2026-theme";
  const QSTATE_KEY = "transpetro-2026-qstate";
  const CESGRANRIO = "https://www.cesgranrio.org.br/concurso/transpetro/";

  let selectedCourse = null;
  let pendingCourse = null;
  let progressByCourse = {};
  let gabAnswers = {};
  let attempts = [];
  let allTopics = [];
  let qState = { fav: {}, rev: {}, lastWrong: {}, idx: 0, pick: null, confirmed: false };
  let moduleFilter = "all";
  let qOnlyReview = false;
  let qOnlyFav = false;
  let toastTimer = null;

  const container = document.getElementById("topics-container");

  function $(id) { return document.getElementById(id); }

  async function persistGet(key) {
    try {
      if (window.storage && window.storage.get) {
        const res = await window.storage.get(key, false);
        if (res && res.value) return res.value;
      }
    } catch (e) {}
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }

  async function persistSet(key, value) {
    try { if (window.storage && window.storage.set) await window.storage.set(key, value, false); } catch (e) {}
    try { localStorage.setItem(key, value); } catch (e) {}
  }

  function toast(msg) {
    const el = $("toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("show"); }, 2200);
  }

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const label = $("theme-label");
    if (label) label.textContent = theme === "dark" ? "Modo claro" : "Modo escuro";
  }

  async function toggleTheme() {
    const next = currentTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
    await persistSet(THEME_KEY, next);
  }

  function goToTab(id) {
    const btn = document.querySelector('.nav-btn[data-tab="' + id + '"]');
    if (btn) btn.click();
  }

  function closeSidebar() {
    $("sidebar").classList.remove("open");
    $("overlay").classList.remove("show");
  }

  function setActiveTab(id) {
    const target = $(id);
    const current = document.querySelector("section.view.active");
    document.querySelectorAll(".nav-btn").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-tab") === id);
    });
    document.querySelectorAll(".bottom-nav button").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-tab") === id);
    });
    if (!target || target === current) return;
    if (current) current.classList.remove("active");
    target.classList.add("active");
    closeSidebar();
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (id === "modulos") renderModules();
    if (id === "questoes") renderQuestion();
  }

  function renderEnfaseList() {
    Object.keys(window.ENFASE_LISTS).forEach(function (catId) {
      const panel = $(catId);
      if (!panel) return;
      panel.innerHTML = "";
      const grid = document.createElement("div");
      grid.className = "course-card-grid";
      window.ENFASE_LISTS[catId].forEach(function (pair) {
        const label = pair[0];
        const key = pair[1];
        const isSel = key === selectedCourse;
        const data = window.getCourseData(key);
        const card = document.createElement("div");
        card.className = "course-pick" + (isSel ? " selected" : "");
        card.innerHTML =
          '<span class="pick-name">' + label + "</span>" +
          '<div class="pick-meta">' + (data && data.groups ? data.groups.length + " blocos de estudo" : "Trilha disponível") + (isSel ? " · curso ativo" : "") + "</div>" +
          '<button class="want-btn ' + (isSel ? "selected" : "") + '" data-course="' + key + '" type="button">' +
          (isSel ? "Curso selecionado" : "Essa daqui que eu quero") + "</button>";
        card.querySelector(".want-btn").addEventListener("click", function (ev) {
          ev.stopPropagation();
          confirmCourse(key);
        });
        card.addEventListener("click", function (ev) {
          if (ev.target.closest(".want-btn")) return;
          pendingCourse = key;
          confirmCourse(key);
        });
        grid.appendChild(card);
      });
      panel.appendChild(grid);
    });
    renderPickerHint();
  }

  function renderPickerHint() {
    const hint = $("course-picker-hint");
    if (!hint) return;
    const data = selectedCourse ? window.getCourseData(selectedCourse) : null;
    if (data) {
      hint.className = "hint alert success";
      hint.innerHTML = "<strong>" + data.name + "</strong> está selecionada. A trilha, as aulas, as provas e os gabaritos já foram desenhados para essa graduação.";
    } else {
      hint.className = "hint alert warning";
      hint.textContent = 'Nenhum curso confirmado ainda. Clique no curso da sua graduação e em "Essa daqui que eu quero".';
    }
  }

  function renderQuickChips() {
    const row = $("quick-course-chips");
    if (!row) return;
    row.innerHTML = "";
    window.QUICK_CHIPS.forEach(function (key) {
      const data = window.getCourseData(key);
      if (!data) return;
      const chip = document.createElement("button");
      chip.className = "course-chip" + (key === selectedCourse ? " active" : "");
      chip.type = "button";
      chip.textContent = data.name;
      chip.addEventListener("click", function () { confirmCourse(key, { stay: true }); });
      row.appendChild(chip);
    });
  }

  async function confirmCourse(key, opts) {
    selectedCourse = key;
    pendingCourse = key;
    qState.idx = 0;
    qState.pick = null;
    qState.confirmed = false;
    await persistSet(COURSE_KEY, key);
    refreshCourseUI();
    toast("Curso confirmado");
    if (!opts || !opts.stay) goToTab("trilha");
  }

  function refreshCourseUI() {
    renderQuickChips();
    renderEnfaseList();
    renderTrilha();
    renderPainelCourseCard();
    renderTestesCourseCard();
    renderHeaderCourse();
    fillGabExamSelect();
    renderModules();
    fillQuestionFilter();
    renderQuestion();
  }

  function renderHeaderCourse() {
    const el = $("header-course-name");
    const data = selectedCourse ? window.getCourseData(selectedCourse) : null;
    if (el) el.textContent = data ? data.name : "Nenhum curso selecionado";
  }

  function renderPainelCourseCard() {
    const data = selectedCourse ? window.getCourseData(selectedCourse) : null;
    const btn = $("painel-go-course");
    if (!data) {
      $("painel-course-title").textContent = "Nenhum curso selecionado";
      $("painel-course-text").textContent = "Escolha a graduação (ex.: Engenharia Mecânica). A plataforma desenha a trilha, as aulas e os gabaritos daquela ênfase.";
      if (btn) btn.textContent = "Escolher meu curso";
      return;
    }
    $("painel-course-title").textContent = "Curso ativo: " + data.name;
    $("painel-course-text").textContent = "Sua trilha, as aulas e os gabaritos de " + data.name + " já estão prontos. Clique em Sua trilha para estudar o conteúdo dessa graduação.";
    if (btn) btn.textContent = "Ver minha trilha";
  }

  function examButtons(data) {
    const parts = [];
    if (data.provaUrl) parts.push('<a href="' + data.provaUrl + '" class="exam-link" target="_blank" rel="noopener">Prova</a>');
    else if (data.examUrl) parts.push('<a href="' + data.examUrl + '" class="exam-link" target="_blank" rel="noopener">Prova</a>');
    parts.push('<a href="' + (data.gabaritoUrl || CESGRANRIO) + '" class="exam-link" target="_blank" rel="noopener">Gabarito</a>');
    if (data.examUrl) parts.push('<a href="' + data.examUrl + '" class="exam-link" target="_blank" rel="noopener">Questoes</a>');
    return parts.join("");
  }

  function renderTestesCourseCard() {
    const data = selectedCourse ? window.getCourseData(selectedCourse) : null;
    const cardWrap = $("testes-course-card");
    if (!data) {
      $("testes-course-name").textContent = "—";
      $("testes-course-meta").textContent = "Selecione um curso para ver prova e gabarito da sua ênfase.";
      cardWrap.innerHTML = '<div class="exam-card"><div class="exam-info"><h4>Nenhum curso selecionado</h4><p>Vá em Escolher curso e confirme a graduação.</p></div></div>';
      return;
    }
    $("testes-course-name").textContent = data.name;
    $("testes-course-meta").textContent = data.provaUrl || data.gabaritoUrl || data.examUrl
      ? "Prova e gabarito do concurso anterior da Cesgranrio (mesma ênfase, quando disponível)."
      : "Ainda sem caderno específico verificado — use o site da Cesgranrio e o conferidor abaixo.";
    cardWrap.innerHTML =
      '<div class="exam-card featured">' +
      '<div class="exam-info"><h4>' + data.name + " — Cesgranrio 2023</h4><p>Caderno de prova, gabarito oficial e questões para treino</p></div>" +
      '<div class="exam-links">' + examButtons(data) + "</div></div>";
  }

  function renderTrilha() {
    const data = selectedCourse ? window.getCourseData(selectedCourse) : null;
    if (!data) {
      $("trilha-course-name").textContent = "Nenhum curso selecionado";
      container.innerHTML = '<div class="hint">Clique na aba <strong>Escolher curso</strong>, selecione a graduação (ex.: Engenharia Mecânica) e confirme em <strong>Essa daqui que eu quero</strong>. A trilha dessa ênfase aparece aqui.</div>';
      allTopics = [];
      $("total-done").textContent = "0";
      $("total-count").textContent = "0";
      $("total-pct-trilha").textContent = "0%";
      $("progress-fill").style.width = "0%";
      updateDashboard(0, 0, 0, null);
      return;
    }
    $("trilha-course-name").textContent = data.name;
    container.innerHTML = "";
    allTopics = [];
    data.groups.forEach(function (group, gi) {
      const groupDiv = document.createElement("div");
      groupDiv.className = "card topic-group";
      const groupTitle = document.createElement("h3");
      groupTitle.innerHTML = group.group + ' <span class="topic-count"><span data-count="' + gi + '">0</span>/' + group.items.length + "</span>";
      groupDiv.appendChild(groupTitle);
      const track = document.createElement("div");
      track.className = "bar";
      track.style.margin = "8px 0 12px";
      track.innerHTML = '<i data-bar="' + gi + '"></i>';
      groupDiv.appendChild(track);
      const v = group.video;
      const videoUrl = v.id ? "https://www.youtube.com/watch?v=" + v.id : v.url;
      const videoCard = document.createElement("a");
      videoCard.href = videoUrl;
      videoCard.target = "_blank";
      videoCard.rel = "noopener";
      videoCard.className = "video-card";
      videoCard.innerHTML =
        '<div class="thumb">' + (v.id ? '<img src="https://img.youtube.com/vi/' + v.id + '/mqdefault.jpg" alt="">' : "") + '<span class="play"></span></div>' +
        '<div><div class="video-title">' + v.title + '</div><div class="meta">Assistir aula completa</div></div>';
      groupDiv.appendChild(videoCard);
      const list = document.createElement("ul");
      list.className = "topic-list";
      group.items.forEach(function (item, ii) {
        const li = document.createElement("li");
        li.className = "topic-item";
        const id = "topic-" + gi + "-" + ii;
        li.innerHTML = '<input type="checkbox" id="' + id + '" data-gi="' + gi + '" data-ii="' + ii + '"><label for="' + id + '">' + item + "</label>";
        list.appendChild(li);
        allTopics.push({ gi: gi, ii: ii, element: li });
      });
      groupDiv.appendChild(list);
      container.appendChild(groupDiv);
    });
    applyProgress();
  }

  function applyProgress() {
    const courseProgress = progressByCourse[selectedCourse] || {};
    let totalDone = 0;
    const totalCount = allTopics.length;
    allTopics.forEach(function (t) {
      const key = t.gi + "-" + t.ii;
      const isDone = !!courseProgress[key];
      const input = t.element.querySelector('input[type="checkbox"]');
      if (input) input.checked = isDone;
      t.element.classList.toggle("done", isDone);
      if (isDone) totalDone++;
    });
    const data = window.getCourseData(selectedCourse);
    if (data) {
      data.groups.forEach(function (group, gi) {
        let groupDone = 0;
        group.items.forEach(function (_, ii) { if (courseProgress[gi + "-" + ii]) groupDone++; });
        const counter = document.querySelector('[data-count="' + gi + '"]');
        if (counter) counter.textContent = groupDone;
        const bar = document.querySelector('[data-bar="' + gi + '"]');
        if (bar) bar.style.width = (group.items.length ? Math.round((groupDone / group.items.length) * 100) : 0) + "%";
      });
    }
    const pct = totalCount ? Math.round((totalDone / totalCount) * 100) : 0;
    $("total-done").textContent = totalDone;
    $("total-count").textContent = totalCount;
    $("total-pct-trilha").textContent = pct + "%";
    $("progress-fill").style.width = pct + "%";
    updateDashboard(totalDone, totalCount, pct, data);
    renderModules();
  }

  function updateDashboard(totalDone, totalCount, pct, data) {
    const ring = $("dash-ring");
    const label = $("dash-ring-label");
    const seg = $("dash-seg");
    const topics = $("dash-topics");
    const trend = $("dash-topics-trend");
    const hint = $("dash-course-hint");
    const list = $("dash-progress-list");
    if (ring) { ring.style.setProperty("--p", String(pct)); ring.setAttribute("data-pct", pct + "%"); }
    if (label) label.textContent = totalCount ? totalDone + " de " + totalCount + " tópicos" : "0 de 0 tópicos";
    if (seg) seg.style.width = pct + "%";
    if (topics) topics.textContent = String(totalDone);
    if (trend) trend.textContent = totalCount ? pct + "% da trilha" : "Comece pela trilha";
    if (hint) hint.textContent = data ? data.name + " · continue a trilha para subir o percentual." : "Selecione um curso para desenhar sua trilha.";
    if (list && data && selectedCourse) {
      list.innerHTML = data.groups.slice(0, 5).map(function (group, gi) {
        const courseProgress = progressByCourse[selectedCourse] || {};
        let done = 0;
        group.items.forEach(function (_, ii) { if (courseProgress[gi + "-" + ii]) done++; });
        const gPct = group.items.length ? Math.round((done / group.items.length) * 100) : 0;
        return '<div class="prog-row"><div class="prog-top"><span>' + group.group + "</span><span>" + gPct + '%</span></div><div class="bar"><i style="width:' + gPct + '%"></i></div></div>';
      }).join("");
    } else if (list) {
      list.innerHTML = "";
    }
  }

  async function saveProgress() {
    await persistSet(TOPIC_KEY, JSON.stringify(progressByCourse));
  }

  function groupStats(gi, group) {
    const courseProgress = progressByCourse[selectedCourse] || {};
    let done = 0;
    group.items.forEach(function (_, ii) { if (courseProgress[gi + "-" + ii]) done++; });
    const total = group.items.length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    let status = "idle";
    let statusLabel = "Não iniciado";
    if (pct === 100) { status = "done"; statusLabel = "Concluído"; }
    else if (pct > 0) { status = "run"; statusLabel = "Em andamento"; }
    if (qState.lastWrong && qState.lastWrong[gi] && status !== "idle") {
      status = "rev";
      statusLabel = "Revisão necessária";
    }
    return { done: done, total: total, pct: pct, status: status, statusLabel: statusLabel };
  }

  function renderModules() {
    const grid = $("modules-grid");
    if (!grid) return;
    const data = selectedCourse ? window.getCourseData(selectedCourse) : null;
    if (!data) {
      grid.innerHTML = '<div class="empty">Confirme um curso para ver os módulos da trilha.</div>';
      return;
    }
    const cards = [];
    data.groups.forEach(function (group, gi) {
      const st = groupStats(gi, group);
      if (moduleFilter !== "all" && st.status !== moduleFilter) return;
      const qCount = questionsForGroup(gi, group).length;
      cards.push(
        '<article class="card module" data-gi="' + gi + '">' +
        '<div class="module-top"><h3>' + group.group + '</h3><span class="badge ' + st.status + '">' + st.statusLabel + "</span></div>" +
        '<p>' + qCount + " questões de treino · " + st.done + "/" + st.total + " tópicos</p>" +
        '<div class="bar"><i style="width:' + st.pct + '%"></i></div>' +
        '<div class="meta">' + st.pct + "% concluído</div>" +
        '<button class="btn" type="button" data-continue="' + gi + '">Continuar estudando</button>' +
        "</article>"
      );
    });
    grid.innerHTML = cards.length ? cards.join("") : '<div class="empty">Nenhum módulo neste filtro.</div>';
    grid.querySelectorAll("[data-continue]").forEach(function (btn) {
      btn.addEventListener("click", function (ev) {
        ev.stopPropagation();
        goToTab("trilha");
        const target = document.querySelectorAll(".topic-group")[parseInt(btn.getAttribute("data-continue"), 10)];
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function questionsForGroup(gi, group) {
    const bank = window.questionsForCourse(selectedCourse) || [];
    const name = (group.group || "").toLowerCase();
    const hits = bank.filter(function (q) {
      return name.indexOf((q.cat || "").toLowerCase()) !== -1 || (q.cat || "").toLowerCase().indexOf(name.split(" ")[0]) !== -1;
    });
    return hits;
  }

  function listExams() {
    const list = [];
    const data = selectedCourse ? window.getCourseData(selectedCourse) : null;
    if (data) {
      list.push({
        id: "curso-" + selectedCourse,
        name: data.name + " (seu curso)",
        total: 70,
        provaUrl: data.provaUrl,
        gabaritoUrl: data.gabaritoUrl,
        examUrl: data.examUrl
      });
    }
    window.EXTRA_EXAMS.forEach(function (ex) {
      if (!list.some(function (x) { return x.name.indexOf(ex.name.split(" —")[0]) !== -1 && x.id !== "curso-" + selectedCourse; })) {
        list.push(ex);
      }
    });
    return list;
  }

  function fillGabExamSelect() {
    const sel = $("gab-exam");
    if (!sel) return;
    const current = sel.value;
    sel.innerHTML = "";
    listExams().forEach(function (ex) {
      const opt = document.createElement("option");
      opt.value = ex.id;
      opt.textContent = ex.name + " (" + ex.total + " questões)";
      opt.dataset.total = String(ex.total);
      sel.appendChild(opt);
    });
    if ([].some.call(sel.options, function (o) { return o.value === current; })) sel.value = current;
    renderGabGrid();
  }

  function currentExam() {
    const id = $("gab-exam").value;
    return listExams().find(function (e) { return e.id === id; }) || listExams()[0];
  }

  function renderGabGrid() {
    const exam = currentExam();
    const wrap = $("gab-grid");
    wrap.innerHTML = "";
    if (!exam) return;
    if (!gabAnswers[exam.id]) gabAnswers[exam.id] = {};
    for (let i = 1; i <= exam.total; i++) {
      const cell = document.createElement("div");
      cell.className = "gab-q";
      cell.dataset.n = String(i);
      const chosen = gabAnswers[exam.id][i] || "";
      cell.innerHTML = '<span class="n">' + i + '</span><div class="gab-opts">' +
        LETTERS.map(function (L) { return '<button type="button" data-l="' + L + '" class="' + (chosen === L ? "on" : "") + '">' + L + "</button>"; }).join("") +
        "</div>";
      wrap.appendChild(cell);
    }
  }

  function parseOfficial(str) {
    return (str || "").toUpperCase().replace(/[^A-E]/g, "").split("");
  }

  function conferirGabarito() {
    const exam = currentExam();
    if (!exam) return;
    const official = parseOfficial($("gab-official-input").value);
    const result = $("gab-result");
    const officialBox = $("gab-official");
    if (!official.length) {
      result.className = "result-box show";
      result.innerHTML = "Cole o gabarito oficial (letras A–E) no campo acima. Abra o PDF do gabarito se ainda não tiver as letras.";
      return;
    }
    officialBox.textContent = official.map(function (L, i) { return ((i % 10 === 0) ? (i + 1) + ":" : "") + L; }).join(" ");
    let ok = 0, blank = 0, bad = 0;
    document.querySelectorAll("#gab-grid .gab-q").forEach(function (cell) {
      const n = parseInt(cell.dataset.n, 10);
      const mine = gabAnswers[exam.id][n] || "";
      const right = official[n - 1] || "";
      cell.classList.remove("ok", "bad");
      if (!mine) { blank++; return; }
      if (right && mine === right) { cell.classList.add("ok"); ok++; }
      else { cell.classList.add("bad"); bad++; }
    });
    const answered = ok + bad;
    const pct = answered ? Math.round((ok / exam.total) * 100) : 0;
    result.className = "result-box show";
    result.innerHTML = "<strong>" + ok + "</strong> acertos · <strong>" + bad + "</strong> erros · <strong>" + blank + "</strong> em branco · " + pct + "% do total (" + exam.total + " questões).";
  }

  function filteredQuestions() {
    let list = window.questionsForCourse(selectedCourse) || [];
    const cat = $("q-filter") ? $("q-filter").value : "all";
    if (cat && cat !== "all") list = list.filter(function (q) { return q.cat === cat; });
    if (qOnlyReview) list = list.filter(function (q) { return qState.rev[q.id]; });
    if (qOnlyFav) list = list.filter(function (q) { return qState.fav[q.id]; });
    return list;
  }

  function fillQuestionFilter() {
    const sel = $("q-filter");
    if (!sel) return;
    const list = window.questionsForCourse(selectedCourse) || [];
    const cats = [];
    list.forEach(function (q) { if (cats.indexOf(q.cat) === -1) cats.push(q.cat); });
    const prev = sel.value;
    sel.innerHTML = '<option value="all">Todas as categorias</option>' + cats.map(function (c) {
      return '<option value="' + c + '">' + c + "</option>";
    }).join("");
    if ([].some.call(sel.options, function (o) { return o.value === prev; })) sel.value = prev;
  }

  function renderQuestion() {
    const list = filteredQuestions();
    const stem = $("q-stem");
    const opts = $("q-opts");
    const feedback = $("q-feedback");
    const explain = $("q-explain");
    if (!list.length) {
      $("q-number").textContent = "Questão —";
      $("q-cat").textContent = "—";
      stem.textContent = selectedCourse
        ? "Nenhuma questão neste filtro. Desmarque revisão/favoritas ou escolha outra categoria."
        : "Selecione um curso para carregar as questões da trilha.";
      opts.innerHTML = "";
      feedback.hidden = true;
      explain.classList.remove("show");
      return;
    }
    if (qState.idx >= list.length) qState.idx = 0;
    if (qState.idx < 0) qState.idx = list.length - 1;
    const q = list[qState.idx];
    $("q-number").textContent = "Questão " + (qState.idx + 1) + " de " + list.length;
    $("q-cat").textContent = q.cat;
    stem.textContent = q.stem;
    opts.innerHTML = q.options.map(function (text, i) {
      const L = LETTERS[i];
      let cls = "opt";
      if (qState.pick === L) cls += " on";
      if (qState.confirmed && qState.pick) {
        if (L === q.answer) cls += " ok";
        else if (L === qState.pick && L !== q.answer) cls += " bad";
      }
      return '<button class="' + cls + '" type="button" data-l="' + L + '"><strong>' + L + "</strong> · " + text + "</button>";
    }).join("");
    if (qState.confirmed && qState.pick) {
      const ok = qState.pick === q.answer;
      feedback.hidden = false;
      feedback.className = "q-feedback " + (ok ? "ok" : "bad");
      feedback.textContent = ok ? "Acertou" : "Errou · gabarito de treino: " + q.answer;
      explain.textContent = q.explain;
      explain.classList.add("show");
    } else {
      feedback.hidden = true;
      explain.classList.remove("show");
    }
    $("q-fav").classList.toggle("on", !!qState.fav[q.id]);
    $("q-fav").setAttribute("aria-pressed", qState.fav[q.id] ? "true" : "false");
    $("q-rev").classList.toggle("on", !!qState.rev[q.id]);
    $("q-rev").setAttribute("aria-pressed", qState.rev[q.id] ? "true" : "false");
  }

  async function saveQState() {
    await persistSet(QSTATE_KEY, JSON.stringify({ fav: qState.fav, rev: qState.rev, lastWrong: qState.lastWrong }));
  }

  function currentQ() {
    const list = filteredQuestions();
    return list[qState.idx] || null;
  }

  function renderAttempts() {
    const listEl = $("attempt-list");
    const emptyEl = $("attempt-empty");
    listEl.innerHTML = "";
    if (attempts.length === 0) {
      emptyEl.style.display = "block";
    } else {
      emptyEl.style.display = "none";
      attempts.slice().reverse().forEach(function (a) {
        const pct = Math.round((a.correct / a.total) * 100);
        const passed = pct >= 50;
        const li = document.createElement("li");
        li.className = "attempt-item";
        li.innerHTML =
          "<div><div class=\"attempt-name\">" + a.exam + "</div><div class=\"attempt-date\">" + a.date + "</div></div>" +
          '<div class="attempt-score"><span class="score-pct" style="color:' + (passed ? "var(--ok)" : "var(--err)") + '">' +
          a.correct + "/" + a.total + " · " + pct + '%</span><span class="badge ' + (passed ? "pass" : "fail") + '">' +
          (passed ? "Aprovado" : "Abaixo") + "</span></div>";
        listEl.appendChild(li);
      });
    }
    const total = attempts.length;
    const avgPct = total ? Math.round(attempts.reduce(function (s, a) { return s + (a.correct / a.total) * 100; }, 0) / total) : null;
    const bestPct = total ? Math.round(Math.max.apply(null, attempts.map(function (a) { return (a.correct / a.total) * 100; }))) : null;
    const approvedCount = attempts.filter(function (a) { return (a.correct / a.total) * 100 >= 50; }).length;
    const approvalRate = total ? Math.round((approvedCount / total) * 100) : null;
    $("stat-total-attempts").textContent = total;
    $("stat-avg-pct").textContent = avgPct !== null ? avgPct + "%" : "—";
    $("stat-best-pct").textContent = bestPct !== null ? bestPct + "%" : "—";
    $("stat-approval-rate").textContent = approvalRate !== null ? approvalRate + "%" : "—";
    const dAttempts = $("stat-total-attempts-dash");
    const dAvg = $("stat-avg-pct-dash");
    const dBest = $("stat-best-pct-dash");
    const dRate = $("stat-approval-rate-dash");
    if (dAttempts) dAttempts.textContent = total;
    if (dAvg) dAvg.textContent = avgPct !== null ? avgPct + "%" : "—";
    if (dBest) dBest.textContent = bestPct !== null ? bestPct + "%" : "—";
    if (dRate) dRate.textContent = approvalRate !== null ? "Taxa de aprovação " + approvalRate + "%" : "Taxa de aprovação —";
    renderChart();
  }

  function renderChart() {
    const chart = $("dash-chart");
    const hint = $("dash-chart-hint");
    if (!chart) return;
    if (attempts.length < 2) {
      chart.hidden = true;
      if (hint) hint.textContent = "Registre tentativas para ver o gráfico.";
      return;
    }
    chart.hidden = false;
    if (hint) hint.textContent = "Percentual de acerto por tentativa (mais recente à direita).";
    const last = attempts.slice(-8);
    const max = 100;
    chart.innerHTML = last.map(function (a) {
      const pct = Math.max(4, Math.round((a.correct / a.total) * 100));
      return "<b style=\"height:" + (pct / max * 100) + '%" title="' + a.exam + " · " + pct + '%"></b>';
    }).join("");
  }

  async function saveAttempts() {
    await persistSet(ATTEMPTS_KEY, JSON.stringify(attempts));
  }

  function bindEvents() {
    document.querySelectorAll(".nav-btn, .bottom-nav button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const id = btn.getAttribute("data-tab");
        if (id) setActiveTab(id);
      });
    });

    document.querySelectorAll(".cat-tab").forEach(function (tab) {
      tab.addEventListener("click", function () {
        const parent = tab.parentElement;
        parent.querySelectorAll(".cat-tab").forEach(function (t) { t.classList.remove("active"); });
        document.querySelectorAll(".cat-panel").forEach(function (p) { p.classList.remove("active"); });
        tab.classList.add("active");
        $(tab.dataset.cat).classList.add("active");
      });
    });

    $("header-change-course").addEventListener("click", function () { goToTab("cursos"); });
    $("painel-go-course").addEventListener("click", function () { goToTab(selectedCourse ? "trilha" : "cursos"); });
    $("painel-go-tests").addEventListener("click", function () { goToTab("testes"); });
    $("theme-toggle").addEventListener("click", toggleTheme);
    $("menu-btn").addEventListener("click", function () {
      $("sidebar").classList.add("open");
      $("overlay").classList.add("show");
    });
    $("overlay").addEventListener("click", closeSidebar);

    container.addEventListener("change", function (e) {
      if (e.target.matches('input[type="checkbox"]')) {
        if (!selectedCourse) return;
        if (!progressByCourse[selectedCourse]) progressByCourse[selectedCourse] = {};
        progressByCourse[selectedCourse][e.target.dataset.gi + "-" + e.target.dataset.ii] = e.target.checked;
        applyProgress();
        saveProgress();
      }
    });

    $("gab-grid").addEventListener("click", function (e) {
      const btn = e.target.closest("button[data-l]");
      if (!btn) return;
      const exam = currentExam();
      if (!exam) return;
      const cell = btn.closest(".gab-q");
      const n = parseInt(cell.dataset.n, 10);
      const letter = btn.dataset.l;
      if (!gabAnswers[exam.id]) gabAnswers[exam.id] = {};
      gabAnswers[exam.id][n] = gabAnswers[exam.id][n] === letter ? "" : letter;
      cell.querySelectorAll("button").forEach(function (b) {
        b.classList.toggle("on", b.dataset.l === gabAnswers[exam.id][n]);
      });
      cell.classList.remove("ok", "bad");
    });
    $("gab-exam").addEventListener("change", function () {
      $("gab-result").classList.remove("show");
      renderGabGrid();
    });
    $("gab-check").addEventListener("click", conferirGabarito);
    $("gab-show").addEventListener("click", function () {
      const exam = currentExam();
      $("gab-official-wrap").style.display = "block";
      if (exam && exam.gabaritoUrl) window.open(exam.gabaritoUrl, "_blank", "noopener");
      else if (exam && exam.examUrl) window.open(exam.examUrl, "_blank", "noopener");
      else window.open(CESGRANRIO, "_blank", "noopener");
    });
    $("gab-clear").addEventListener("click", function () {
      const exam = currentExam();
      if (exam) gabAnswers[exam.id] = {};
      $("gab-result").classList.remove("show");
      $("gab-official-input").value = "";
      renderGabGrid();
    });
    $("gab-official-input").addEventListener("input", function () {
      const letters = parseOfficial($("gab-official-input").value);
      $("gab-official").textContent = letters.length
        ? letters.map(function (L, i) { return (i % 10 === 0 ? (i + 1) + ":" + L : L); }).join(" ")
        : "Abra o PDF do gabarito, copie as letras e cole acima.";
    });

    $("log-submit").addEventListener("click", function () {
      const examSelect = $("log-exam");
      let exam = examSelect.value;
      if (exam === "Prova da minha ênfase selecionada") {
        const d = selectedCourse ? window.getCourseData(selectedCourse) : null;
        exam = d ? d.name + " (prova antiga)" : "Prova da ênfase selecionada";
      }
      const correctInput = $("log-correct");
      const totalInput = $("log-total");
      let correct = parseInt(correctInput.value, 10);
      let total = parseInt(totalInput.value, 10) || parseInt(examSelect.selectedOptions[0].dataset.total, 10);
      if (isNaN(correct) || correct < 0 || !total || total <= 0 || correct > total) {
        correctInput.style.borderColor = "var(--err)";
        return;
      }
      correctInput.style.borderColor = "";
      const dateStr = new Date().toLocaleDateString("pt-BR");
      attempts.push({ exam: exam, correct: correct, total: total, date: dateStr });
      saveAttempts();
      renderAttempts();
      correctInput.value = "";
      totalInput.value = "";
      toast("Tentativa registrada");
    });
    $("log-exam").addEventListener("change", function (e) {
      $("log-total").value = e.target.selectedOptions[0].dataset.total;
    });
    $("log-total").value = $("log-exam").selectedOptions[0].dataset.total;

    document.getElementById("module-filters").addEventListener("click", function (e) {
      const chip = e.target.closest("[data-filter]");
      if (!chip) return;
      moduleFilter = chip.getAttribute("data-filter");
      document.querySelectorAll("#module-filters .chip").forEach(function (c) {
        c.classList.toggle("active", c === chip);
      });
      renderModules();
    });

    $("q-opts").addEventListener("click", function (e) {
      const btn = e.target.closest(".opt");
      if (!btn || qState.confirmed) return;
      qState.pick = btn.getAttribute("data-l");
      renderQuestion();
    });
    $("q-confirm").addEventListener("click", function () {
      const q = currentQ();
      if (!q || !qState.pick) { toast("Selecione uma alternativa"); return; }
      qState.confirmed = true;
      if (qState.pick !== q.answer) qState.lastWrong[q.id] = true;
      else delete qState.lastWrong[q.id];
      saveQState();
      renderQuestion();
    });
    $("q-next").addEventListener("click", function () {
      qState.idx += 1;
      qState.pick = null;
      qState.confirmed = false;
      renderQuestion();
    });
    $("q-prev").addEventListener("click", function () {
      qState.idx -= 1;
      qState.pick = null;
      qState.confirmed = false;
      renderQuestion();
    });
    $("q-fav").addEventListener("click", function () {
      const q = currentQ();
      if (!q) return;
      qState.fav[q.id] = !qState.fav[q.id];
      saveQState();
      renderQuestion();
    });
    $("q-rev").addEventListener("click", function () {
      const q = currentQ();
      if (!q) return;
      qState.rev[q.id] = !qState.rev[q.id];
      saveQState();
      renderQuestion();
    });
    $("q-filter").addEventListener("change", function () {
      qState.idx = 0;
      qState.pick = null;
      qState.confirmed = false;
      renderQuestion();
    });
    $("q-only-review").addEventListener("click", function () {
      qOnlyReview = !qOnlyReview;
      $("q-only-review").classList.toggle("on", qOnlyReview);
      qState.idx = 0;
      qState.pick = null;
      qState.confirmed = false;
      renderQuestion();
    });
    $("q-only-fav").addEventListener("click", function () {
      qOnlyFav = !qOnlyFav;
      $("q-only-fav").classList.toggle("on", qOnlyFav);
      qState.idx = 0;
      qState.pick = null;
      qState.confirmed = false;
      renderQuestion();
    });

    document.addEventListener("keydown", function (e) {
      const qView = $("questoes");
      if (!qView || !qView.classList.contains("active")) return;
      const t = e.target;
      if (t && (t.tagName === "INPUT" || t.tagName === "SELECT" || t.tagName === "TEXTAREA")) return;
      const map = { Digit1: "A", Digit2: "B", Digit3: "C", Digit4: "D", Digit5: "E", Numpad1: "A", Numpad2: "B", Numpad3: "C", Numpad4: "D", Numpad5: "E" };
      if (map[e.code] && !qState.confirmed) {
        qState.pick = map[e.code];
        renderQuestion();
      }
      if (e.key === "Enter") $("q-confirm").click();
      if (e.key === "ArrowRight") $("q-next").click();
      if (e.key === "ArrowLeft") $("q-prev").click();
    });
  }

  async function bootstrap() {
    applyTheme(currentTheme());
    try {
      const savedTheme = await persistGet(THEME_KEY);
      if (savedTheme === "dark" || savedTheme === "light") applyTheme(savedTheme);
    } catch (e) {}
    try {
      const savedCourse = await persistGet(COURSE_KEY);
      if (savedCourse) selectedCourse = savedCourse;
    } catch (e) {}
    try {
      const savedProgress = await persistGet(TOPIC_KEY);
      if (savedProgress) progressByCourse = JSON.parse(savedProgress);
    } catch (e) {}
    try {
      const raw = await persistGet(ATTEMPTS_KEY);
      if (raw) attempts = JSON.parse(raw);
    } catch (e) { attempts = []; }
    try {
      const qs = await persistGet(QSTATE_KEY);
      if (qs) {
        const parsed = JSON.parse(qs);
        qState.fav = parsed.fav || {};
        qState.rev = parsed.rev || {};
        qState.lastWrong = parsed.lastWrong || {};
      }
    } catch (e) {}
    const examDate = new Date("2026-11-29T00:00:00");
    const diff = Math.ceil((examDate - new Date()) / 86400000);
    $("days-left").textContent = diff > 0 ? diff : 0;
    bindEvents();
    refreshCourseUI();
    renderAttempts();
  }

  bootstrap();
})();
