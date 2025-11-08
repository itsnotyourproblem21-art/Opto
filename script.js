const STORAGE_KEY = "oat_rc_sample_exam_user_state_v1";

const PASSAGES = {
  epigenetics: {
    title: "Passage 1",
    content: [
      "(1) For decades, biologists believed that DNA sequence alone determined an organism's traits. This view, known as genetic determinism, has since given way to a more nuanced understanding: that environmental factors can regulate how genes are expressed without altering the underlying DNA code. This process is called epigenetics, meaning \"above genetics,\" and it has transformed modern biology by revealing that identical genetic sequences can lead to vastly different outcomes depending on which genes are turned on or off. Researchers now know that the environment, nutrition, and even early developmental experiences can leave molecular marks that influence health and disease risk throughout life.",
      "(2) The foundation of epigenetic regulation lies in chemical modifications to DNA and the histone proteins around which it is wrapped. The most well-known of these modifications is DNA methylation, where methyl groups attach to cytosine bases, typically silencing the associated gene. Histone acetylation, on the other hand, tends to loosen chromatin structure, promoting transcriptional activity. Together, these molecular marks form a dynamic \"epigenetic code\" that determines the accessibility of genes for transcription.",
      "(3) One of the most striking examples of epigenetics is the Agouti mouse. These mice are genetically identical, but their coat color and health outcomes vary dramatically based on their mother's diet during gestation. A diet rich in methyl donors (like folic acid) leads to increased DNA methylation of the Agouti gene, resulting in brown, healthy pups. A diet deficient in these nutrients fails to silence the gene, leading to yellow, obese pups prone to diabetes and cancer. This demonstrates a direct, heritable link between a specific environmental input (nutrition) and long-term gene expression.",
      "(4) The clinical implications of epigenetic research are vast. Since epigenetic changes are reversible, unlike DNA mutations, they represent promising targets for new therapeutic drugs, particularly in oncology. Drugs known as HDAC inhibitors (Histone Deacetylase inhibitors) and DNMT inhibitors (DNA Methyltransferase inhibitors) are currently in clinical trials to reactivate silenced tumor suppressor genes or modify the expression profile of cancer cells.",
      "(5) Furthermore, the field of behavioral epigenetics explores how external stressors and experiences, such as early life trauma or enriched environments, can affect gene expression in the brain. These changes, mediated by modifications to neural chromatin structure, may help explain individual differences in vulnerability to mental health disorders like depression and PTSD, providing a molecular link between nature and nurture that extends beyond simple Mendelian inheritance.",
      "(6) In summary, epigenetics moves beyond the simple one-way street of DNA controlling life to reveal a complex, dynamic interplay where the environment constantly shapes gene function. This paradigm shift offers new avenues for understanding, diagnosing, and treating a wide array of human diseases, cementing its role as one of the most exciting frontiers in biological science today."
    ]
  }
};

const QUESTIONS = [
  {
    passageId: "epigenetics",
    stem: "According to the passage, histone acetylation tends to",
    c: [
      "tighten chromatin structure",
      "prevent transcription",
      "loosen chromatin structure, promoting transcriptional activity",
      "cause DNA damage"
    ],
    a: 2
  },
  {
    passageId: "epigenetics",
    stem: "The main idea of the first paragraph is to",
    c: [
      "define genetic determinism as the accepted modern view",
      "introduce epigenetics as a process modifying DNA sequence",
      "explain that environment and experiences can regulate gene expression",
      "list the specific molecular marks that influence health"
    ],
    a: 2
  },
  {
    passageId: "epigenetics",
    stem: "Which of the following processes is described as 'typically silencing the associated gene'?",
    c: ["Histone acetylation", "DNA methylation", "Transcriptional activity", "Genetic determinism"],
    a: 1
  },
  {
    passageId: "epigenetics",
    stem: "The Agouti mouse example primarily illustrates",
    c: [
      "the process of histone acetylation",
      "that identical genetic sequences always lead to the same outcome",
      "that genetic determinism is the most accurate model for coat color",
      "a direct link between maternal nutrition and epigenetic gene regulation"
    ],
    a: 3
  },
  {
    passageId: "epigenetics",
    stem: "The author's tone in this passage can best be described as",
    c: ["skeptical and critical", "informal and humorous", "informative and objective", "argumentative and biased"],
    a: 2
  },
  {
    passageId: "epigenetics",
    stem: "The term 'epigenetic code' in paragraph 2 refers to the",
    c: [
      "sequence of DNA nucleotides",
      "combination of molecular marks that regulate gene accessibility",
      "set of all genes in an organism's genome",
      "specific diet of an Agouti mouse's mother"
    ],
    a: 1
  }
];

const pad = (n) => String(n).padStart(2, "0");
const fmtMMSS = (seconds) => `${pad(Math.max(0, Math.floor(seconds / 60)))}:${pad(Math.max(0, seconds % 60))}`;

const root = document.getElementById("rc-app");

let state = {
  current: 0,
  answers: {},
  marked: {},
  view: "intro",
  delayOn: true,
  accom: false,
  timeLeft: null
};

let delayHandles = [];
let timerHandle = null;

function cloneState(value) {
  return {
    ...value,
    answers: { ...value.answers },
    marked: { ...value.marked }
  };
}

function loadProgress() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      if (parsed.answers && typeof parsed.answers === "object") {
        state.answers = parsed.answers;
      }
      if (parsed.marked && typeof parsed.marked === "object") {
        state.marked = parsed.marked;
      }
    }
  } catch (error) {
    console.error("Failed to load saved progress", error);
  }
}

function saveProgress() {
  try {
    const payload = {
      answers: state.answers,
      marked: state.marked
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (error) {
    console.error("Failed to save progress", error);
  }
}

function clearDelays() {
  delayHandles.forEach((handle) => window.clearTimeout(handle));
  delayHandles = [];
}

function scheduleAction(callback) {
  if (!state.delayOn) {
    callback();
    return;
  }
  const handle = window.setTimeout(() => {
    callback();
    delayHandles = delayHandles.filter((id) => id !== handle);
  }, 2000);
  delayHandles.push(handle);
}

function scheduleTick() {
  if (timerHandle) {
    window.clearTimeout(timerHandle);
    timerHandle = null;
  }

  if (state.view !== "test" || typeof state.timeLeft !== "number") {
    return;
  }

  if (state.timeLeft <= 0) {
    if (state.view !== "results") {
      updateState((prev) => {
        const next = cloneState(prev);
        next.timeLeft = 0;
        next.view = "results";
        return next;
      });
    }
    return;
  }

  timerHandle = window.setTimeout(() => {
    if (state.view !== "test") {
      return;
    }
    updateState((prev) => {
      const next = cloneState(prev);
      if (typeof next.timeLeft === "number") {
        next.timeLeft = Math.max(0, next.timeLeft - 1);
        if (next.timeLeft === 0) {
          next.view = "results";
        }
      }
      return next;
    });
  }, 1000);
}

function updateState(updater) {
  const previous = state;
  const nextState =
    typeof updater === "function"
      ? updater(cloneState(state))
      : {
          ...cloneState(state),
          ...updater
        };

  if (!nextState) {
    return;
  }

  const answersChanged = previous.answers !== nextState.answers;
  const markedChanged = previous.marked !== nextState.marked;

  state = nextState;

  if (answersChanged || markedChanged) {
    saveProgress();
  }

  render();
  scheduleTick();
}

function calcScore() {
  let correct = 0;
  QUESTIONS.forEach((question, index) => {
    if (state.answers[index] === question.a) {
      correct += 1;
    }
  });
  return { correct, total: QUESTIONS.length };
}

function startExam() {
  clearDelays();
  const base = 60 * 10;
  const startingTime = state.accom ? Math.floor(base * 1.5) : base;
  updateState((prev) => {
    const next = cloneState(prev);
    next.current = 0;
    next.view = "test";
    next.timeLeft = startingTime;
    return next;
  });
}

function goToQuestion(targetIndex) {
  if (targetIndex < 0 || targetIndex >= QUESTIONS.length) {
    return;
  }
  clearDelays();
  scheduleAction(() => {
    updateState((prev) => {
      const next = cloneState(prev);
      next.current = targetIndex;
      next.view = "test";
      return next;
    });
  });
}

function go(delta) {
  const target = Math.max(0, Math.min(state.current + delta, QUESTIONS.length - 1));
  if (target === state.current) {
    return;
  }
  goToQuestion(target);
}

function openReview() {
  clearDelays();
  scheduleAction(() => {
    updateState((prev) => {
      const next = cloneState(prev);
      next.view = "review";
      return next;
    });
  });
}

function finishOrAdvance() {
  clearDelays();
  const isLastQuestion = state.current >= QUESTIONS.length - 1;
  scheduleAction(() => {
    if (isLastQuestion) {
      updateState((prev) => {
        const next = cloneState(prev);
        next.view = "results";
        next.timeLeft = typeof next.timeLeft === "number" ? next.timeLeft : 0;
        return next;
      });
      return;
    }
    updateState((prev) => {
      const next = cloneState(prev);
      next.current = Math.min(QUESTIONS.length - 1, next.current + 1);
      return next;
    });
  });
}

function toggleMark(index) {
  updateState((prev) => {
    const next = cloneState(prev);
    const currentlyMarked = !!next.marked[index];
    if (currentlyMarked) {
      delete next.marked[index];
    } else {
      next.marked[index] = true;
    }
    return next;
  });
}

function chooseAnswer(questionIndex, choiceIndex) {
  updateState((prev) => {
    const next = cloneState(prev);
    next.answers[questionIndex] = choiceIndex;
    return next;
  });
}

function resetToIntro() {
  clearDelays();
  if (timerHandle) {
    window.clearTimeout(timerHandle);
    timerHandle = null;
  }
  updateState((prev) => {
    const next = cloneState(prev);
    next.view = "intro";
    next.timeLeft = null;
    return next;
  });
}

function el(tag, props = {}, ...children) {
  const element = document.createElement(tag);
  const {
    className,
    text,
    html,
    attrs,
    dataset,
    onClick,
    onChange,
    onInput,
    ...rest
  } = props;

  if (className) {
    element.className = className;
  }

  if (text !== undefined) {
    element.textContent = text;
  }

  if (html !== undefined) {
    element.innerHTML = html;
  }

  if (attrs) {
    Object.entries(attrs).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }

  if (dataset) {
    Object.entries(dataset).forEach(([key, value]) => {
      element.dataset[key] = value;
    });
  }

  if (typeof onClick === "function") {
    element.addEventListener("click", onClick);
  }

  if (typeof onChange === "function") {
    element.addEventListener("change", onChange);
  }

  if (typeof onInput === "function") {
    element.addEventListener("input", onInput);
  }

  Object.entries(rest).forEach(([key, value]) => {
    if (key in element && value !== undefined) {
      element[key] = value;
    }
  });

  children.forEach((child) => {
    if (child === null || child === undefined) {
      return;
    }
    element.appendChild(
      typeof child === "string" ? document.createTextNode(child) : child
    );
  });

  return element;
}

function renderIntro() {
  const shell = el("div", { className: "rc-shell" });
  const topbar = el(
    "div",
    { className: "rc-topbar" },
    el("button", { className: "rc-topbar__button", attrs: { "aria-label": "Close" } }, "×"),
    el(
      "div",
      { className: "rc-topbar__title" },
      el("div", { className: "rc-topbar__title-main", text: "Bootcamp.com | OAT" }),
      el("div", { className: "rc-topbar__title-sub", text: "Reading Comprehension Test 1" })
    ),
    el("div", { className: "rc-topbar__time", html: "&nbsp;" })
  );

  const delayToggle = el(
    "button",
    {
      className: "rc-toggle",
      dataset: { active: state.delayOn ? "true" : "false" },
      attrs: { type: "button", "aria-pressed": String(state.delayOn) },
      onClick: () => {
        updateState({ delayOn: !state.delayOn });
      }
    },
    el("span", { className: "rc-toggle__thumb" })
  );

  const accomToggle = el(
    "button",
    {
      className: "rc-toggle",
      dataset: { active: state.accom ? "true" : "false" },
      attrs: { type: "button", "aria-pressed": String(state.accom) },
      onClick: () => {
        updateState({ accom: !state.accom });
      }
    },
    el("span", { className: "rc-toggle__thumb" })
  );

  const bodyInner = el(
    "div",
    { className: "rc-body__inner" },
    el(
      "div",
      { style: "width: 100%;" },
      el(
        "div",
        { className: "rc-intro-card" },
        el(
          "h2",
          { text: "This is Reading Comprehension Test 1. Read this before starting:" }
        ),
        el(
          "ol",
          {},
          el("li", { text: `You have 10 minutes to finish ${QUESTIONS.length} questions.` }),
          el("li", { text: "You can review questions before ending the section." }),
          el("li", { text: "Your score analysis appears after finishing." })
        ),
        el("p", { text: "Click NEXT to continue." })
      ),
      el("h3", { className: "rc-section-heading", text: "Test Settings" }),
      el(
        "div",
        { className: "rc-settings-list" },
        el(
          "div",
          { className: "rc-setting" },
          delayToggle,
          el(
            "div",
            { html: '<span class="font-semibold">Prometric Delay:</span> Adds a ~2 second delay on navigation and review.' }
          )
        ),
        el(
          "div",
          { className: "rc-setting" },
          accomToggle,
          el(
            "div",
            { html: '<span class="font-semibold">Time Accommodations:</span> 1.5x time if enabled.' }
          )
        )
      )
    )
  );

  const body = el("div", { className: "rc-body" }, bodyInner);

  const footer = el(
    "div",
    { className: "rc-footer-bar" },
    el(
      "button",
      {
        className: "rc-button",
        attrs: { type: "button" },
        onClick: startExam
      },
      "NEXT"
    )
  );

  shell.append(topbar, body, footer);
  return shell;
}

function renderTest() {
  const question = QUESTIONS[state.current];
  const passage = question.passageId ? PASSAGES[question.passageId] : null;
  const shell = el("div", { className: "rc-shell" });

  const topbar = el(
    "div",
    { className: "rc-topbar" },
    el("div", { className: "rc-topbar__title-main", text: `Question ${state.current + 1} of ${QUESTIONS.length}` }),
    el("div", { className: "rc-topbar__title-sub", text: "Reading Comprehension — Sample" }),
    el("div", {
      className: "rc-topbar__time",
      text: `Time remaining: ${state.timeLeft !== null ? fmtMMSS(state.timeLeft) : "--:--"}`
    })
  );

  const choices = el("div", { className: "rc-choice-list" });

  question.c.forEach((choice, index) => {
    const label = el("label", { className: "rc-choice" });
    const input = el("input", {
      type: "radio",
      name: `question-${state.current}`,
      checked: state.answers[state.current] === index,
      onChange: () => chooseAnswer(state.current, index)
    });
    const span = el("span", { text: `${String.fromCharCode(65 + index)}. ${choice}` });
    label.append(input, span);
    choices.appendChild(label);
  });

  const questionCard = el(
    "div",
    { className: "rc-test-card" },
    state.marked[state.current]
      ? el("span", { className: "rc-marked-flag", text: "MARKED" })
      : null,
    el("div", { className: "rc-question-stem", text: question.stem }),
    choices,
    passage
      ? el(
          "div",
          { className: "rc-passage" },
          el("div", { className: "rc-passage__title", text: passage.title }),
          el(
            "div",
            { className: "rc-passage__content" },
            ...passage.content.map((paragraph) => el("p", { text: paragraph }))
          )
        )
      : null,
    el("p", { className: "rc-instruction", text: "Click NEXT to continue." })
  );

  const body = el("div", { className: "rc-body rc-body--test" }, el("div", { className: "rc-test-area" }, questionCard));

  const previousButton = el(
    "button",
    {
      className: "rc-button rc-button--secondary",
      attrs: { type: "button" },
      disabled: state.current === 0,
      onClick: () => go(-1)
    },
    "PREVIOUS"
  );

  const nextButton = el(
    "button",
    {
      className: "rc-button",
      attrs: { type: "button" },
      onClick: finishOrAdvance
    },
    state.current < QUESTIONS.length - 1 ? "NEXT" : "END SECTION"
  );

  const markButton = el(
    "button",
    {
      className: state.marked[state.current]
        ? "rc-button rc-button--mark rc-button--marked"
        : "rc-button rc-button--mark",
      attrs: { type: "button" },
      onClick: () => toggleMark(state.current)
    },
    "MARK"
  );

  const reviewButton = el(
    "button",
    {
      className: "rc-button rc-button--secondary",
      attrs: { type: "button" },
      onClick: openReview
    },
    "REVIEW"
  );

  const bottomBar = el(
    "div",
    { className: "rc-bottom-bar" },
    el("div", { className: "rc-bottom-group" }, previousButton),
    el("div", {}, nextButton),
    el("div", { className: "rc-bottom-group" }, markButton, reviewButton)
  );

  shell.append(topbar, body, bottomBar);
  return shell;
}

function renderReview() {
  const shell = el("div", { className: "rc-shell" });
  const topbar = el(
    "div",
    { className: "rc-topbar" },
    el("button", { className: "rc-topbar__button", attrs: { "aria-label": "Close" } }, "×"),
    el(
      "div",
      { className: "rc-topbar__title" },
      el("div", { className: "rc-topbar__title-main", text: "Bootcamp.com | OAT" }),
      el("div", { className: "rc-topbar__title-sub", text: "Review Questions" })
    ),
    el("div", {
      className: "rc-topbar__time",
      text: `Time remaining: ${fmtMMSS(state.timeLeft ?? 0)}`
    })
  );

  const rows = QUESTIONS.map((_, index) => ({
    index,
    name: `Question ${index + 1}`,
    isMarked: !!state.marked[index],
    isDone: state.answers[index] !== undefined,
    isSkipped: state.answers[index] === undefined
  }));

  const reviewList = el("div", { className: "rc-review-list" });
  rows.forEach((row) => {
    const button = el(
      "button",
      { className: "rc-review-row", attrs: { type: "button" } },
      el(
        "div",
        { className: "rc-review-cell" },
        el(
          "svg",
          {
            attrs: {
              width: "14",
              height: "14",
              viewBox: "0 0 24 24",
              "aria-hidden": "true"
            }
          },
          el("path", {
            attrs: {
              fill: "currentColor",
              d: "M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm8 1v5h5"
            }
          })
        ),
        el("span", { text: row.name })
      ),
      el("div", { className: "rc-review-cell", text: row.isMarked ? "Yes" : "" }),
      el("div", { className: "rc-review-cell", text: row.isDone ? "Yes" : "" }),
      el("div", { className: "rc-review-cell", text: row.isSkipped ? "Yes" : "" })
    );
    button.addEventListener("click", () => goToQuestion(row.index));
    reviewList.appendChild(button);
  });

  const table = el(
    "div",
    { className: "rc-review-table" },
    el(
      "div",
      { className: "rc-review-header" },
      el("div", { text: "Name" }),
      el("div", { text: "Marked" }),
      el("div", { text: "Completed" }),
      el("div", { text: "Skipped" })
    ),
    reviewList
  );

  const body = el(
    "div",
    { className: "rc-body" },
    el("div", { className: "rc-review-container" }, table)
  );

  const findFirstIndex = (predicate) => {
    const match = rows.find(predicate);
    return match ? match.index : null;
  };

  const reviewMarked = el(
    "button",
    {
      className: "rc-button",
      attrs: { type: "button" },
      onClick: () => {
        const index = findFirstIndex((row) => row.isMarked);
        if (index !== null) {
          goToQuestion(index);
        }
      }
    },
    "REVIEW MARKED"
  );

  const reviewAll = el(
    "button",
    {
      className: "rc-button",
      attrs: { type: "button" },
      onClick: () => goToQuestion(0)
    },
    "REVIEW ALL"
  );

  const reviewIncomplete = el(
    "button",
    {
      className: "rc-button",
      attrs: { type: "button" },
      onClick: () => {
        const index = findFirstIndex((row) => !row.isDone);
        if (index !== null) {
          goToQuestion(index);
        }
      }
    },
    "REVIEW INCOMPLETE"
  );

  const endButton = el(
    "button",
    {
      className: "rc-button",
      attrs: { type: "button" },
      onClick: () => updateState({ view: "results" })
    },
    "END"
  );

  const footer = el(
    "div",
    { className: "rc-review-actions" },
    el("div", { className: "rc-review-buttons" }, reviewMarked, reviewAll, reviewIncomplete),
    endButton
  );

  shell.append(topbar, body, footer);
  return shell;
}

function renderResults() {
  const { correct, total } = calcScore();
  const container = el(
    "div",
    { className: "rc-results" },
    el("h1", { text: "Results" }),
    el("p", { text: `Score: ${correct} / ${total} (${Math.round((correct / total) * 100)}%).` })
  );

  QUESTIONS.forEach((question, index) => {
    const selected = state.answers[index];
    const correctAnswer = question.a;
    const isCorrect = selected === correctAnswer;

    const item = el(
      "div",
      {
        className: isCorrect ? "rc-result-item" : "rc-result-item rc-result-item--incorrect"
      },
      el("div", { className: "rc-result-stem", text: `${index + 1}. ${question.stem}` })
    );

    const list = el("ul", { className: "rc-result-choices" });
    question.c.forEach((choice, choiceIndex) => {
      let suffix = "";
      if (choiceIndex === correctAnswer) {
        suffix += " (correct)";
      }
      if (selected === choiceIndex && choiceIndex !== correctAnswer) {
        suffix += " (your answer)";
      }
      const listItem = el("li", {
        text: `${String.fromCharCode(65 + choiceIndex)}. ${choice}${suffix}`,
        className: choiceIndex === correctAnswer ? "font-semibold" : ""
      });
      list.appendChild(listItem);
    });

    item.appendChild(list);

    if (state.marked[index]) {
      item.appendChild(el("div", { className: "rc-mark-tag", text: "MARKED" }));
    }

    container.appendChild(item);
  });

  container.appendChild(
    el(
      "button",
      {
        className: "rc-button",
        attrs: { type: "button" },
        onClick: resetToIntro
      },
      "Back to Start"
    )
  );

  return container;
}

function render() {
  if (!root) {
    return;
  }
  root.innerHTML = "";

  let view;
  switch (state.view) {
    case "intro":
      view = renderIntro();
      break;
    case "test":
      view = renderTest();
      break;
    case "review":
      view = renderReview();
      break;
    case "results":
      view = renderResults();
      break;
    default:
      view = renderIntro();
  }

  root.appendChild(view);
}

function init() {
  loadProgress();
  render();
  scheduleTick();
}

if (root) {
  init();
}
