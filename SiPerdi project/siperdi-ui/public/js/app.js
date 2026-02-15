const modal = document.getElementById("auth-modal");
const openButtons = document.querySelectorAll("[data-open-auth]");
const closeButtons = document.querySelectorAll("[data-close-auth]");
const tabButtons = document.querySelectorAll("[data-auth-tab]");
const panels = document.querySelectorAll("[data-auth-panel]");
const loanModal = document.getElementById("loan-modal");
const loanOpenButtons = document.querySelectorAll("[data-open-loan]");
const loanCloseButtons = document.querySelectorAll("[data-close-loan]");
const loginForm = document.querySelector('[data-form="login"]');
const loginIdentifierLabel = document.querySelector("[data-login-label]");
const loginIdentifierInput = document.querySelector("[data-login-input]");
const signupForm = document.querySelector('[data-form="signup"]');
const resetForm = document.querySelector('[data-form="reset"]');
const loginMessage = document.querySelector('[data-message="login"]');
const signupMessage = document.querySelector('[data-message="signup"]');
const resetMessage = document.querySelector('[data-message="reset"]');
const sessionBoxes = document.querySelectorAll("[data-session]");
const sessionNames = document.querySelectorAll("[data-session-name]");
const logoutButtons = document.querySelectorAll("[data-logout]");
const authSections = document.querySelectorAll("[data-requires-auth]");
const studentHiddenElements = document.querySelectorAll("[data-student-hidden]");
const adminHiddenElements = document.querySelectorAll("[data-admin-hidden]");
const authOnlyElements = document.querySelectorAll("[data-auth-only]");
const profilePhotos = document.querySelectorAll("[data-profile-photo]");
const profileUploads = document.querySelectorAll("[data-profile-upload]");
const profileMessages = document.querySelectorAll('[data-message="profile"]');
const profileFields = document.querySelectorAll("[data-profile]");
const profileStats = document.querySelectorAll("[data-profile-stat]");
const themeOptions = document.querySelectorAll("[data-theme-option]");
const themeStatus = document.querySelector("[data-theme-status]");
const deleteAccountButton = document.querySelector("[data-delete-account]");
const loanForm = document.querySelector("[data-loan-form]");
const loanList = document.querySelector("[data-loan-list]");
const loanEmpty = document.querySelector("[data-loan-empty]");
const loanMessage = document.querySelector('[data-message="loan"]');
const loanListMessage = document.querySelector('[data-message="loan-list"]');
const loanActive = document.querySelector("[data-loan-active]");
const loanDue = document.querySelector("[data-loan-due]");
const nextDue = document.querySelector("[data-next-due]");
const totalFine = document.querySelector("[data-total-fine]");
const historyList = document.querySelector("[data-history-list]");
const historyEmpty = document.querySelector("[data-history-empty]");
const switchButtons = document.querySelectorAll("[data-auth-switch]");
const heroLoanList = document.querySelector("[data-hero-loan-list]");
const heroEmpty = document.querySelector("[data-hero-empty]");
const heroStatusTitle = document.querySelector("[data-status-title]");
const heroStatusMeta = document.querySelector("[data-status-meta]");
const heroAccount = document.querySelector("[data-status-account]");
const studentTotal = document.querySelector("[data-student-total]");
const studentDue = document.querySelector("[data-student-due]");
const studentFine = document.querySelector("[data-student-fine]");
const studentNotices = document.querySelector("[data-student-notices]");
const studentEmpty = document.querySelector("[data-student-empty]");
const adminStudents = document.querySelector("[data-admin-students]");
const adminTotalLoans = document.querySelector("[data-admin-total-loans]");
const adminActive = document.querySelector("[data-admin-active]");
const adminDue = document.querySelector("[data-admin-due]");
const adminOverdue = document.querySelector("[data-admin-overdue]");
const adminFine = document.querySelector("[data-admin-fine]");
const adminStudentsList = document.querySelector("[data-admin-students-list]");
const adminStudentsEmpty = document.querySelector("[data-admin-students-empty]");
const adminLoansList = document.querySelector("[data-admin-loans-list]");
const adminLoansEmpty = document.querySelector("[data-admin-loans-empty]");
const adminFinesList = document.querySelector("[data-admin-fines-list]");
const adminFinesEmpty = document.querySelector("[data-admin-fines-empty]");
const adminReturns = document.querySelector("[data-admin-returns]");
const adminReturnsEmpty = document.querySelector("[data-admin-returns-empty]");
const adminSection = document.querySelector("[data-admin-only]");
const adminLink = document.querySelector("[data-admin-only-link]");
const adminDownload = document.querySelector("[data-admin-download]");
const scrollButtons = document.querySelectorAll("[data-scroll-target]");
const roleSwitchers = document.querySelectorAll("[data-role-switch]");
const roleLabels = document.querySelectorAll("[data-role-label]");
const roleDescs = document.querySelectorAll("[data-role-desc]");
const roleFields = document.querySelectorAll("[data-role-fields]");
const catalogSection = document.querySelector("#katalog");
const catalogSearch = document.querySelector("[data-catalog-search]");
const catalogCount = document.querySelector("[data-catalog-count]");
const catalogEmpty = document.querySelector("[data-catalog-empty]");

const STORAGE_KEY = "siperdi_users";
const SESSION_KEY = "siperdi_session";
const LOAN_KEY = "siperdi_loans";
const FINE_PER_DAY = 1000;
const ADMIN_CODE = "024";
const THEME_KEY = "siperdi_theme";
const THEME_OPTIONS = ["default", "light", "dark"];

const createLoanId = () => {
  return `LN${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
};

const normalizeLoanData = (data) => {
  const normalized = data && typeof data === "object" ? data : {};
  let updated = false;

  Object.values(normalized).forEach((loans) => {
    if (!Array.isArray(loans)) return;
    loans.forEach((loan) => {
      if (!loan.id) {
        loan.id = createLoanId();
        updated = true;
      }
      if (!loan.returnStatus) {
        loan.returnStatus = "none";
        updated = true;
      }
    });
  });

  return { data: normalized, updated };
};

const getUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (error) {
    return [];
  }
};

const saveUsers = (users) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

const getSession = () => {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch (error) {
    return null;
  }
};

const setSession = (user) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
};

const clearSession = () => {
  localStorage.removeItem(SESSION_KEY);
};

const getLoans = () => {
  try {
    const raw = JSON.parse(localStorage.getItem(LOAN_KEY)) || {};
    const { data, updated } = normalizeLoanData(raw);
    if (updated) {
      localStorage.setItem(LOAN_KEY, JSON.stringify(data));
    }
    return data;
  } catch (error) {
    return {};
  }
};

const saveLoans = (loans) => {
  localStorage.setItem(LOAN_KEY, JSON.stringify(loans));
};

const getUserLoans = (session) => {
  if (!session) return [];
  const allLoans = getLoans();
  return allLoans[session.email] || [];
};

const parseDate = (value) => {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const formatISODate = (date) => {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const calculateDueDate = (tanggal, durasi) => {
  const startDate = parseDate(tanggal);
  if (!startDate) return null;
  const dueDate = new Date(startDate);
  dueDate.setDate(dueDate.getDate() + Number(durasi || 14));
  return dueDate;
};

const formatDate = (date) => {
  if (!date) return "-";
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatCurrency = (amount) => {
  return `Rp ${amount.toLocaleString("id-ID")}`;
};

const getUserByEmail = (email) => {
  return getUsers().find((user) => user.email === email);
};

const updateUser = (email, updates) => {
  const users = getUsers();
  const index = users.findIndex((user) => user.email === email);
  if (index === -1) return null;
  users[index] = { ...users[index], ...updates };
  saveUsers(users);
  return users[index];
};

const isLoanReturned = (loan) => (loan.returnStatus || "none") === "approved";

const buildLoanMeta = (loan) => {
  const startDate = parseDate(loan.tanggal);
  const dueDate = loan.dueDate ? parseDate(loan.dueDate) : calculateDueDate(loan.tanggal, loan.durasi);
  if (!startDate || !dueDate) return null;

  const returnStatus = loan.returnStatus || "none";
  const returnDate = loan.returnedAt ? parseDate(loan.returnedAt) : null;
  const effectiveDate = returnStatus === "approved" && returnDate ? returnDate : new Date();
  const diffMs = dueDate - effectiveDate;
  const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  let statusLabel = "Aktif";
  let badgeClass = "success";
  if (returnStatus === "approved") {
    statusLabel = "Dikembalikan";
    badgeClass = "neutral";
  } else if (returnStatus === "pending") {
    statusLabel = "Menunggu Persetujuan";
    badgeClass = "warn";
  } else if (daysLeft < 0) {
    statusLabel = "Terlambat";
    badgeClass = "danger";
  } else if (daysLeft <= 3) {
    statusLabel = "Jatuh Tempo";
    badgeClass = "warn";
  }

  return { startDate, dueDate, daysLeft, statusLabel, badgeClass, returnStatus, returnDate };
};

const buildReturnAction = (loan, meta) => {
  if (meta.returnStatus === "approved") {
    return `<span class="badge neutral">Dikembalikan</span>`;
  }
  if (meta.returnStatus === "pending") {
    return `<span class="badge warn">Menunggu</span>`;
  }
  return `<button class="btn tiny" data-return-request data-loan-id="${loan.id}">Konfirmasi Pengembalian</button>`;
};

const toCsv = (rows) => {
  return rows
    .map((row) =>
      row
        .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
        .join(",")
    )
    .join("\n");
};

const setMessage = (el, text, type) => {
  if (!el) return;
  el.textContent = text || "";
  el.className = "form-message";
  if (text) {
    el.classList.add("show");
    if (type) el.classList.add(type);
  }
};

const setLoanListMessage = (text, type) => {
  setMessage(loanListMessage || loanMessage, text, type);
};

const setProfileMessage = (text, type) => {
  if (!profileMessages.length) return;
  profileMessages.forEach((message) => {
    setMessage(message, text, type);
  });
};

const clearMessages = () => {
  setMessage(loginMessage, "");
  setMessage(signupMessage, "");
  setMessage(resetMessage, "");
};

const applyTheme = (theme, options = {}) => {
  const normalized = THEME_OPTIONS.includes(theme) ? theme : "default";
  if (normalized === "default") {
    document.body.removeAttribute("data-theme");
  } else {
    document.body.setAttribute("data-theme", normalized);
  }

  themeOptions.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.themeOption === normalized);
  });

  if (themeStatus) {
    const labels = { default: "Default", light: "Terang", dark: "Gelap" };
    themeStatus.textContent = `Tema aktif: ${labels[normalized] || "Default"}.`;
  }

  if (options.persist) {
    localStorage.setItem(THEME_KEY, normalized);
  }
  return normalized;
};

const syncThemeForSession = (user) => {
  const role = user?.role || null;
  const isStudent = role === "student";
  const stored = isStudent ? localStorage.getItem(THEME_KEY) : null;
  const targetTheme = THEME_OPTIONS.includes(stored) ? stored : "default";
  applyTheme(isStudent ? targetTheme : "default", { persist: false });

  themeOptions.forEach((btn) => {
    const disabled = !isStudent;
    btn.disabled = disabled;
    btn.classList.toggle("disabled", disabled);
  });
};

const renderSession = (user) => {
  const loggedIn = Boolean(user);
  const isAdmin = user?.role === "admin";
  const isStudent = user?.role === "student";
  sessionBoxes.forEach((box) => {
    box.classList.toggle("active", loggedIn);
  });
  sessionNames.forEach((label) => {
    const roleLabel = user?.role === "admin" ? "Admin" : "Siswa";
    label.textContent = loggedIn ? `Halo, ${roleLabel}` : "Halo, Siswa";
  });
  openButtons.forEach((btn) => {
    if (!btn.hasAttribute("data-hide-when-auth")) return;
    btn.style.display = loggedIn ? "none" : "inline-flex";
  });
  if (adminLink) {
    adminLink.classList.toggle("hidden", !loggedIn || user?.role !== "admin");
  }
  authOnlyElements.forEach((element) => {
    element.classList.toggle("hidden", !loggedIn);
  });
  studentHiddenElements.forEach((element) => {
    element.classList.toggle("hidden", isStudent);
  });
  adminHiddenElements.forEach((element) => {
    element.classList.toggle("hidden", isAdmin);
  });
  syncThemeForSession(user);
};

const renderGuards = (user) => {
  const locked = !user;
  authSections.forEach((section) => {
    section.classList.toggle("locked", locked);
  });
};

const buildProfileStats = (user) => {
  if (!user) return null;
  const userLoans = getUserLoans(user);
  let dueCount = 0;
  let fineTotal = 0;

  userLoans.forEach((loan) => {
    const meta = buildLoanMeta(loan);
    if (!meta) return;
    if (meta.returnStatus === "approved") return;
    if (meta.daysLeft <= 3) {
      dueCount += 1;
    }
    if (meta.daysLeft < 0) {
      fineTotal += Math.abs(meta.daysLeft) * FINE_PER_DAY;
    }
  });

  return { total: userLoans.length, due: dueCount, fine: fineTotal };
};

const renderProfile = (user) => {
  const currentUser = user ? getUserByEmail(user.email) : null;
  profileFields.forEach((field) => {
    const key = field.dataset.profile;
    if (!currentUser) {
      field.textContent = "-";
      return;
    }
    if (key === "nis") {
      field.textContent = currentUser.nis || currentUser.nisn || "-";
      return;
    }
    if (key === "role") {
      field.textContent = currentUser.role === "admin" ? "Admin" : "Siswa";
      return;
    }
    field.textContent = currentUser[key] || "-";
  });
  profilePhotos.forEach((photo) => {
    photo.src = currentUser?.photo || "img/avatar.svg";
  });

  const stats = buildProfileStats(currentUser);
  profileStats.forEach((field) => {
    const key = field.dataset.profileStat;
    if (!stats) {
      field.textContent = key === "fine" ? formatCurrency(0) : "0";
      return;
    }
    if (key === "fine") {
      field.textContent = formatCurrency(stats.fine);
      return;
    }
    if (key === "due") {
      field.textContent = String(stats.due);
      return;
    }
    field.textContent = String(stats.total);
  });

  setProfileMessage("");
};

const setupCatalogSearch = () => {
  if (!catalogSearch || !catalogSection) return;
  const listItems = Array.from(catalogSection.querySelectorAll(".catalog-list li"));
  const tableRows = Array.from(catalogSection.querySelectorAll(".table-row"));
  const catalogCards = Array.from(catalogSection.querySelectorAll(".catalog-card"));

  const getTitle = (element) => {
    if (element.classList.contains("table-row")) {
      return Array.from(element.querySelectorAll("span"))
        .map((span) => span.textContent)
        .join(" ");
    }
    return element.textContent || "";
  };

  const updateCatalogView = () => {
    const query = catalogSearch.value.trim().toLowerCase();
    let visibleCount = 0;

    listItems.forEach((item) => {
      const match = !query || getTitle(item).toLowerCase().includes(query);
      item.classList.toggle("hidden", !match);
      if (match) visibleCount += 1;
    });

    tableRows.forEach((row) => {
      const match = !query || getTitle(row).toLowerCase().includes(query);
      row.classList.toggle("hidden", !match);
      if (match) visibleCount += 1;
    });

    catalogCards.forEach((card) => {
      const visibleItems = card.querySelectorAll("li:not(.hidden)").length;
      card.classList.toggle("hidden", Boolean(query) && visibleItems === 0);
    });

    if (catalogCount) {
      catalogCount.textContent = query
        ? `Menampilkan ${visibleCount} buku.`
        : "Menampilkan semua buku.";
    }
    if (catalogEmpty) {
      catalogEmpty.classList.toggle("show", Boolean(query) && visibleCount === 0);
    }
  };

  catalogSearch.addEventListener("input", updateCatalogView);
  updateCatalogView();
};

const renderLoans = (user) => {
  if (!loanList || !loanEmpty) return;

  const userLoans = user ? getUserLoans(user) : [];
  loanList.innerHTML = "";

  if (!user) {
    loanEmpty.classList.add("show");
    if (loanActive) loanActive.textContent = "0";
    if (loanDue) loanDue.textContent = "0";
    if (totalFine) totalFine.textContent = formatCurrency(0);
    if (nextDue) {
      nextDue.className = "notice";
      nextDue.textContent = "Login untuk melihat notifikasi.";
    }
    renderHeroLoans(null, []);
    renderStudentDashboard(null, []);
    return;
  }

  let dueSoonCount = 0;
  let totalFineValue = 0;
  let nextLoan = null;
  let activeCount = 0;

  userLoans.forEach((loan) => {
    const meta = buildLoanMeta(loan);
    if (!meta) return;

    if (meta.returnStatus !== "approved") {
      activeCount += 1;
      if (!nextLoan || meta.dueDate < nextLoan.dueDate) {
        nextLoan = { loan, ...meta };
      }

      if (meta.daysLeft >= 0 && meta.daysLeft <= 3) {
        dueSoonCount += 1;
      }

      if (meta.daysLeft < 0) {
        totalFineValue += Math.abs(meta.daysLeft) * FINE_PER_DAY;
      }
    }

    const row = document.createElement("div");
    row.className = "table-row";
    const actionHtml = buildReturnAction(loan, meta);
    row.innerHTML = `
      <span>${loan.judul}</span>
      <span>${formatDate(meta.startDate)}</span>
      <span>${formatDate(meta.dueDate)}</span>
      <span class="badge ${meta.badgeClass}">${meta.statusLabel}</span>
      <span class="loan-action">${actionHtml}</span>
    `;
    loanList.appendChild(row);
  });

  loanEmpty.classList.toggle("show", userLoans.length === 0);
  if (loanActive) loanActive.textContent = String(activeCount);
  if (loanDue) loanDue.textContent = String(dueSoonCount);
  if (totalFine) totalFine.textContent = formatCurrency(totalFineValue);

  if (nextDue) {
    nextDue.className = "notice";
    if (!nextLoan) {
      nextDue.textContent = "Belum ada peminjaman aktif.";
    } else if (nextLoan.daysLeft < 0) {
      nextDue.classList.add("danger");
      nextDue.textContent = `${nextLoan.loan.judul} terlambat ${Math.abs(nextLoan.daysLeft)} hari.`;
    } else if (nextLoan.daysLeft <= 3) {
      nextDue.classList.add("warn");
      nextDue.textContent = `${nextLoan.loan.judul} jatuh tempo ${formatDate(nextLoan.dueDate)} (sisa ${nextLoan.daysLeft} hari).`;
    } else {
      nextDue.textContent = `${nextLoan.loan.judul} jatuh tempo ${formatDate(nextLoan.dueDate)} (sisa ${nextLoan.daysLeft} hari).`;
    }
  }

  renderHeroLoans(user, userLoans);
  renderStudentDashboard(user, userLoans, {
    dueSoonCount,
    totalFineValue,
    nextLoan,
  });
};

const renderHistory = (user, userLoans) => {
  if (!historyList || !historyEmpty) return;

  if (!user) {
    historyList.innerHTML = "";
    historyEmpty.classList.add("show");
    return;
  }

  const sorted = [...userLoans].sort((a, b) => {
    return String(b.tanggal || "").localeCompare(String(a.tanggal || ""));
  });

  historyList.innerHTML = "";
  sorted.forEach((loan) => {
    const meta = buildLoanMeta(loan);
    if (!meta) return;
    const returnLabel =
      meta.returnStatus === "approved" && meta.returnDate
        ? formatDate(meta.returnDate)
        : meta.returnStatus === "pending"
          ? "Menunggu Persetujuan"
          : formatDate(meta.dueDate);

    const item = document.createElement("div");
    item.className = "history-item";
    item.innerHTML = `
      <strong>${loan.judul}</strong>
      <span class="history-meta">Pinjam: ${formatDate(meta.startDate)} | Kembali: ${returnLabel}</span>
      <span class="badge ${meta.badgeClass}">${meta.statusLabel}</span>
    `;
    historyList.appendChild(item);
  });

  historyEmpty.classList.toggle("show", sorted.length === 0);
};

const renderHeroLoans = (user, userLoans) => {
  if (!heroLoanList || !heroEmpty) return;

  heroLoanList.innerHTML = "";

  if (!user) {
    if (heroAccount) heroAccount.textContent = "Akun: -";
    if (heroStatusTitle) heroStatusTitle.textContent = "Belum Login";
    if (heroStatusMeta) heroStatusMeta.textContent = "Silakan login untuk melihat status peminjaman.";
    heroEmpty.classList.add("show");
    return;
  }

  const currentUser = getUserByEmail(user.email);
  if (heroAccount) {
    const kelas = currentUser?.class_name || currentUser?.kelas || "-";
    heroAccount.textContent =
      user.role === "admin" ? `Akun: Admin` : `Akun: ${currentUser?.name || "Siswa"} - ${kelas}`;
  }

  if (user.role === "admin") {
    heroLoanList.innerHTML = "";
    if (heroStatusTitle) heroStatusTitle.textContent = "Mode Admin";
    if (heroStatusMeta) heroStatusMeta.textContent = "Akses dashboard admin untuk audit peminjaman.";
    heroEmpty.classList.add("show");
    return;
  }

  const activeLoans = userLoans.filter((loan) => !isLoanReturned(loan));
  const activeCount = activeLoans.length;
  let dueSoonCount = 0;

  const items = activeLoans.slice(0, 3).map((loan) => {
    const meta = buildLoanMeta(loan);
    if (!meta) return null;
    if (meta.daysLeft >= 0 && meta.daysLeft <= 3) {
      dueSoonCount += 1;
    }
    const label =
      meta.returnStatus === "pending"
        ? "Menunggu Persetujuan"
        : meta.daysLeft < 0
          ? `Terlambat ${Math.abs(meta.daysLeft)} hari`
          : `${meta.daysLeft} hari`;
    return `
      <div class="loan-item">
        <div>
          <p class="loan-title">${loan.judul}</p>
          <p class="loan-meta">Pinjam: ${formatDate(meta.startDate)} - Kembali: ${formatDate(meta.dueDate)}</p>
        </div>
        <span class="badge ${meta.badgeClass}">${label}</span>
      </div>
    `;
  });

  heroLoanList.innerHTML = items.filter(Boolean).join("");

  if (heroStatusTitle) {
    heroStatusTitle.textContent = activeCount > 0 ? "Sedang Dipinjam" : "Tidak Ada Peminjaman";
  }
  if (heroStatusMeta) {
    heroStatusMeta.textContent =
      activeCount > 0
        ? `${activeCount} buku aktif - ${dueSoonCount} jatuh tempo`
        : "Belum ada buku dipinjam.";
  }

  heroEmpty.classList.toggle("show", activeCount === 0);
};

const renderStudentDashboard = (user, userLoans, summary = {}) => {
  if (!studentTotal || !studentDue || !studentFine || !studentNotices || !studentEmpty) return;

  if (!user) {
    studentTotal.textContent = "0";
    studentDue.textContent = "0";
    studentFine.textContent = formatCurrency(0);
    studentNotices.innerHTML = "";
    studentEmpty.classList.add("show");
    return;
  }

  if (user.role === "admin") {
    studentTotal.textContent = "0";
    studentDue.textContent = "0";
    studentFine.textContent = formatCurrency(0);
    studentNotices.innerHTML = "";
    studentEmpty.classList.add("show");
    return;
  }

  const activeLoans = userLoans.filter((loan) => !isLoanReturned(loan));
  const pendingReturns = userLoans.filter((loan) => loan.returnStatus === "pending");
  const total = activeLoans.length;
  const dueSoonCount = summary.dueSoonCount || 0;
  const totalFineValue = summary.totalFineValue || 0;
  studentTotal.textContent = String(total);
  studentDue.textContent = String(dueSoonCount);
  studentFine.textContent = formatCurrency(totalFineValue);

  studentNotices.innerHTML = "";
  pendingReturns.forEach((loan) => {
    const notice = document.createElement("div");
    notice.className = "notice warn";
    notice.innerHTML = `
      <span class="badge warn">Menunggu</span>
      <p>Pengembalian ${loan.judul} menunggu persetujuan petugas perpustakaan.</p>
    `;
    studentNotices.appendChild(notice);
  });
  if (summary.nextLoan) {
    const notice = document.createElement("div");
    notice.className = "notice";
    if (summary.nextLoan.daysLeft < 0) notice.classList.add("danger");
    if (summary.nextLoan.daysLeft >= 0 && summary.nextLoan.daysLeft <= 3) notice.classList.add("warn");
    notice.innerHTML = `
      <span class="badge ${summary.nextLoan.badgeClass}">${summary.nextLoan.statusLabel}</span>
      <p>${summary.nextLoan.loan.judul} jatuh tempo ${formatDate(summary.nextLoan.dueDate)}.</p>
    `;
    studentNotices.appendChild(notice);
  }

  studentEmpty.classList.toggle("show", studentNotices.children.length === 0);
};

const renderAdminDashboard = (session) => {
  if (!adminStudents || !adminTotalLoans || !adminActive || !adminDue || !adminOverdue || !adminFine || !adminStudentsList || !adminStudentsEmpty || !adminLoansList || !adminLoansEmpty) {
    return;
  }

  const isAdmin = session?.role === "admin";
  if (adminSection) {
    adminSection.classList.toggle("hidden", !isAdmin);
  }
  if (!isAdmin) {
    return;
  }

  const users = getUsers();
  const allLoans = getLoans();
  const all = Object.entries(allLoans).flatMap(([email, loans]) =>
    loans.map((loan) => ({ ...loan, email }))
  );

  const studentCount = users.filter((u) => (u.role || "student") === "student").length;
  adminStudents.textContent = String(studentCount);
  adminTotalLoans.textContent = String(all.length);

  let activeCount = 0;
  let dueSoonCount = 0;
  let overdueCount = 0;
  let fineTotal = 0;

  const enriched = all.map((loan) => {
    const meta = buildLoanMeta(loan);
    if (!meta) return null;
    if (meta.returnStatus !== "approved") {
      activeCount += 1;
      if (meta.daysLeft >= 0 && meta.daysLeft <= 3) dueSoonCount += 1;
      if (meta.daysLeft < 0) {
        overdueCount += 1;
        fineTotal += Math.abs(meta.daysLeft) * FINE_PER_DAY;
      }
    }
    return { loan, meta };
  }).filter(Boolean);

  adminActive.textContent = String(activeCount);
  adminDue.textContent = String(dueSoonCount);
  adminOverdue.textContent = String(overdueCount);
  adminFine.textContent = formatCurrency(fineTotal);

  const students = users.filter((u) => (u.role || "student") === "student");
  const studentRows = students
    .map((student) => {
      const studentLoans = allLoans[student.email] || [];
      const activeLoans = studentLoans.filter((loan) => !isLoanReturned(loan)).length;
      let statusLabel = "Belum Meminjam";
      let badgeClass = "warn";
      if (activeLoans > 0) {
        statusLabel = "Aktif";
        badgeClass = "success";
      } else if (studentLoans.length > 0) {
        statusLabel = "Pernah Meminjam";
        badgeClass = "neutral";
      }
      return {
        name: student.name || "Siswa",
        nis: student.nis || student.nisn || "-",
        kelas: student.kelas || "-",
        totalLoans: studentLoans.length,
        statusLabel,
        badgeClass,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name, "id-ID"));

  adminStudentsList.innerHTML = studentRows
    .map(
      (student) => `
        <div class="table-row">
          <span>${student.name}</span>
          <span>${student.nis}</span>
          <span>${student.kelas}</span>
          <span>${student.totalLoans}</span>
          <span class="badge ${student.badgeClass}">${student.statusLabel}</span>
        </div>
      `
    )
    .join("");
  adminStudentsEmpty.classList.toggle("show", studentRows.length === 0);

  const recentLoans = enriched
    .sort((a, b) => b.meta.startDate - a.meta.startDate)
    .slice(0, 8);

  adminLoansList.innerHTML = recentLoans
    .map((item) => {
      const user = getUserByEmail(item.loan.email);
      const name = user ? user.name : item.loan.email;
      return `
        <div class="table-row">
          <span>${name}</span>
          <span>${item.loan.judul}</span>
          <span>${formatDate(item.meta.startDate)}</span>
          <span>${formatDate(item.meta.dueDate)}</span>
          <span class="badge ${item.meta.badgeClass}">${item.meta.statusLabel}</span>
        </div>
      `;
    })
    .join("");
  adminLoansEmpty.classList.toggle("show", recentLoans.length === 0);
  if (adminFinesList) {
    const fineRows = students
      .map((student) => {
        const studentLoans = allLoans[student.email] || [];
        let dueCount = 0;
        let overdueCount = 0;
        let fineValue = 0;

        studentLoans.forEach((loan) => {
          const meta = buildLoanMeta(loan);
          if (!meta || meta.returnStatus === "approved") return;
          if (meta.daysLeft >= 0 && meta.daysLeft <= 3) {
            dueCount += 1;
          }
          if (meta.daysLeft < 0) {
            overdueCount += 1;
            fineValue += Math.abs(meta.daysLeft) * FINE_PER_DAY;
          }
        });

        const statusLabel = fineValue > 0 ? "Belum Lunas" : "Lunas";
        const badgeClass = fineValue > 0 ? "danger" : "success";

        return {
          name: student.name || "Siswa",
          nis: student.nis || student.nisn || "-",
          dueCount,
          overdueCount,
          fineValue,
          statusLabel,
          badgeClass,
        };
      })
      .sort((a, b) => {
        const aScore = a.overdueCount + a.dueCount;
        const bScore = b.overdueCount + b.dueCount;
        return bScore - aScore || a.name.localeCompare(b.name, "id-ID");
      });

    adminFinesList.innerHTML = fineRows
      .map(
        (item) => `
        <div class="table-row">
          <span>${item.name}</span>
          <span>${item.nis}</span>
          <span>${item.dueCount}</span>
          <span>${item.overdueCount}</span>
          <span>${formatCurrency(item.fineValue)}</span>
          <span class="badge ${item.badgeClass}">${item.statusLabel}</span>
        </div>
      `
      )
      .join("");

    if (adminFinesEmpty) {
      adminFinesEmpty.classList.toggle("show", fineRows.length === 0);
    }
  }

  if (adminReturns) {
    const pending = enriched.filter((item) => item.meta.returnStatus === "pending");
    adminReturns.innerHTML = pending
      .map((item) => {
        const user = getUserByEmail(item.loan.email);
        const name = user ? user.name : item.loan.email;
        const requestDate = item.loan.returnRequestedAt ? parseDate(item.loan.returnRequestedAt) : null;
        return `
          <div class="admin-item">
            <strong>${item.loan.judul}</strong>
            <span class="admin-meta">${name} - Diminta: ${formatDate(requestDate)} | Pinjam: ${formatDate(item.meta.startDate)}</span>
            <div class="admin-item-actions">
              <span class="badge warn">Menunggu Persetujuan</span>
              <button class="btn tiny" data-approve-return data-loan-id="${item.loan.id}" data-loan-email="${item.loan.email}">Setujui</button>
            </div>
          </div>
        `;
      })
      .join("");
    if (adminReturnsEmpty) {
      adminReturnsEmpty.classList.toggle("show", pending.length === 0);
    }
  }
};

const setAuthRole = (role) => {
  roleSwitchers.forEach((switcher) => {
    const buttons = switcher.querySelectorAll(".role-btn");
    buttons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.role === role);
    });
  });

  roleLabels.forEach((label) => {
    label.textContent = role === "admin" ? " Admin" : " Siswa";
  });

  roleDescs.forEach((desc) => {
    desc.textContent =
      role === "admin"
        ? "Gunakan email admin perpustakaan dan kata sandi."
        : "Gunakan NIS dan kata sandi.";
  });

  if (loginIdentifierLabel) {
    loginIdentifierLabel.textContent = role === "admin" ? "Email" : "NIS";
  }
  if (loginIdentifierInput) {
    if (role === "admin") {
      loginIdentifierInput.type = "email";
      loginIdentifierInput.placeholder = "nama@sekolah.id";
      loginIdentifierInput.removeAttribute("inputmode");
    } else {
      loginIdentifierInput.type = "text";
      loginIdentifierInput.placeholder = "123456";
      loginIdentifierInput.setAttribute("inputmode", "numeric");
    }
  }

  roleFields.forEach((field) => {
    field.classList.toggle("hidden", field.dataset.roleFields !== role);
  });

  if (loginForm?.elements["role"]) loginForm.elements["role"].value = role;
  if (signupForm?.elements["role"]) signupForm.elements["role"].value = role;
};

const renderAll = () => {
  const session = getSession();
  const userLoans = getUserLoans(session);
  renderSession(session);
  renderGuards(session);
  renderProfile(session);
  renderLoans(session);
  renderHistory(session, userLoans);
  renderAdminDashboard(session);
};

const openModal = (mode) => {
  clearMessages();
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");

  let targetTab = "login";
  let role = null;

  if (mode === "login-admin") {
    targetTab = "login";
    role = "admin";
  } else if (mode === "signup-admin") {
    targetTab = "signup";
    role = "admin";
  } else if (mode === "signup-student") {
    targetTab = "signup";
    role = "student";
  } else if (mode === "reset") {
    targetTab = "reset";
  } else {
    targetTab = "login";
    role = "student";
  }

  if (role) setAuthRole(role);
  setTab(targetTab);
};

const closeModal = () => {
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
};

const openLoanModal = () => {
  if (!loanModal) return;
  const session = getSession();
  if (!session) {
    openModal("login");
    return;
  }
  closeModal();
  setMessage(loanMessage, "");
  loanModal.classList.add("active");
  loanModal.setAttribute("aria-hidden", "false");
};

const closeLoanModal = () => {
  if (!loanModal) return;
  loanModal.classList.remove("active");
  loanModal.setAttribute("aria-hidden", "true");
};

const setTab = (mode) => {
  tabButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.authTab === mode);
  });
  panels.forEach((panel) => {
    panel.classList.toggle("hidden", panel.dataset.authPanel !== mode);
  });
};

document.addEventListener("click", (event) => {
  const openAuthButton = event.target.closest("[data-open-auth]");
  if (openAuthButton) {
    event.preventDefault();
    closeLoanModal();
    openModal(openAuthButton.dataset.openAuth);
    return;
  }

  const openLoanButton = event.target.closest("[data-open-loan]");
  if (openLoanButton) {
    event.preventDefault();
    openLoanModal();
    return;
  }

  const closeAuthButton = event.target.closest("[data-close-auth]");
  if (closeAuthButton) {
    event.preventDefault();
    closeModal();
    return;
  }

  const closeLoanButton = event.target.closest("[data-close-loan]");
  if (closeLoanButton) {
    event.preventDefault();
    closeLoanModal();
    return;
  }

  const tabButton = event.target.closest("[data-auth-tab]");
  if (tabButton) {
    event.preventDefault();
    setTab(tabButton.dataset.authTab);
    return;
  }

  const authSwitchButton = event.target.closest("[data-auth-switch]");
  if (authSwitchButton) {
    event.preventDefault();
    setTab(authSwitchButton.dataset.authSwitch);
    return;
  }

  const roleButton = event.target.closest("[data-role-switch] .role-btn");
  if (roleButton) {
    event.preventDefault();
    setAuthRole(roleButton.dataset.role);
    return;
  }

  const scrollButton = event.target.closest("[data-scroll-target]");
  if (scrollButton) {
    event.preventDefault();
    const session = getSession();
    const targetSelector =
      session?.role === "admin" && scrollButton.dataset.scrollTarget === "#peminjaman"
        ? "#admin-dashboard"
        : scrollButton.dataset.scrollTarget;
    const target = document.querySelector(targetSelector);
    if (!session) {
      openModal("login");
      return;
    }
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return;
  }
});

if (themeOptions.length) {
  themeOptions.forEach((btn) => {
    btn.addEventListener("click", () => {
      const session = getSession();
      if (!session) {
        openModal("login");
        return;
      }
      if (session.role !== "student") {
        return;
      }
      const selected = btn.dataset.themeOption || "default";
      applyTheme(selected, { persist: true });
    });
  });
}
if (loanList) {
  loanList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-return-request]");
    if (!button) return;
    const session = getSession();
    if (!session) {
      openModal("login");
      return;
    }
    if (session.role === "admin") {
      setLoanListMessage("Admin tidak dapat mengajukan pengembalian.", "error");
      return;
    }
    const loanId = button.dataset.loanId;
    const allLoans = getLoans();
    const userLoans = allLoans[session.email] || [];
    const loan = userLoans.find((item) => item.id === loanId);
    if (!loan) return;
    if (loan.returnStatus === "pending") {
      setLoanListMessage("Pengembalian sudah menunggu persetujuan.", "error");
      return;
    }
    if (loan.returnStatus === "approved") {
      setLoanListMessage("Buku sudah dikembalikan.", "success");
      return;
    }
    loan.returnStatus = "pending";
    loan.returnRequestedAt = formatISODate(new Date());
    saveLoans(allLoans);
    setLoanListMessage("Permintaan pengembalian dikirim ke petugas perpustakaan.", "success");
    renderAll();
  });
}

if (adminReturns) {
  adminReturns.addEventListener("click", (event) => {
    const button = event.target.closest("[data-approve-return]");
    if (!button) return;
    const session = getSession();
    if (!session || session.role !== "admin") {
      openModal("login-admin");
      return;
    }
    const loanId = button.dataset.loanId;
    const email = button.dataset.loanEmail;
    const allLoans = getLoans();
    const userLoans = allLoans[email] || [];
    const loan = userLoans.find((item) => item.id === loanId);
    if (!loan) return;
    loan.returnStatus = "approved";
    loan.returnedAt = formatISODate(new Date());
    saveLoans(allLoans);
    renderAll();
  });
}

if (adminDownload) {
  adminDownload.addEventListener("click", () => {
    const session = getSession();
    if (!session || session.role !== "admin") {
      openModal("login-admin");
      return;
    }

    const users = getUsers();
    const allLoans = getLoans();
    const rows = [
      [
        "Nama",
        "Email",
        "Judul Buku",
        "Tanggal Pinjam",
        "Tanggal Kembali",
        "Status",
        "Status Pengembalian",
        "Tanggal Dikembalikan",
        "Sisa Hari",
        "Denda",
      ],
    ];

    Object.entries(allLoans).forEach(([email, loans]) => {
      const user = users.find((u) => u.email === email);
      loans.forEach((loan) => {
        const meta = buildLoanMeta(loan);
        if (!meta) return;
        const fine = meta.daysLeft < 0 ? Math.abs(meta.daysLeft) * FINE_PER_DAY : 0;
        const returnStatus = loan.returnStatus || "none";
        const returnLabel =
          returnStatus === "approved"
            ? "Dikembalikan"
            : returnStatus === "pending"
              ? "Menunggu Persetujuan"
              : "Belum Diajukan";
        const returnDate = loan.returnedAt ? formatDate(parseDate(loan.returnedAt)) : "-";
        rows.push([
          user?.name || "Siswa",
          email,
          loan.judul,
          formatDate(meta.startDate),
          formatDate(meta.dueDate),
          meta.statusLabel,
          returnLabel,
          returnDate,
          meta.daysLeft,
          fine,
        ]);
      });
    });

    const csv = toCsv(rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "laporan_peminjaman_siperdi.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
    closeLoanModal();
  }
});

if (signupForm) {
  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const role = signupForm.elements["role"]?.value || "student";
    const name = signupForm.elements["name"]?.value.trim();
    const nis = signupForm.elements["nis"]?.value.trim();
    const kelas = signupForm.elements["kelas"]?.value.trim();
    const email = signupForm.elements["email"]?.value.trim().toLowerCase();
    const password = signupForm.elements["password"]?.value;
    const adminCode = signupForm.elements["admin_code"]?.value.trim();

    if (!name || !email || !password) {
      setMessage(signupMessage, "Nama, email, dan kata sandi wajib diisi.", "error");
      return;
    }
    if (role === "student" && (!nis || !kelas)) {
      setMessage(signupMessage, "NIS dan kelas wajib diisi untuk siswa.", "error");
      return;
    }
    if (role === "admin" && adminCode !== ADMIN_CODE) {
      setMessage(signupMessage, "Kode admin tidak valid.", "error");
      return;
    }
    if (password.length < 8) {
      setMessage(signupMessage, "Kata sandi minimal 8 karakter.", "error");
      return;
    }

    const users = getUsers();
    const exists = users.some((user) => user.email === email || (role === "student" && (user.nis === nis || user.nisn === nis)));
    if (exists) {
      setMessage(signupMessage, "Email atau NIS sudah terdaftar.", "error");
      return;
    }

    const newUser = {
      name,
      nis: role === "student" ? nis : null,
      kelas: role === "student" ? kelas : null,
      email,
      password,
      role,
    };
    users.push(newUser);
    saveUsers(users);

    signupForm.reset();
    setMessage(signupMessage, "Akun berhasil dibuat. Silakan login.", "success");
  });
}

if (resetForm) {
  resetForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = resetForm.elements["email"]?.value.trim().toLowerCase();
    const password = resetForm.elements["password"]?.value;
    const confirm = resetForm.elements["password_confirm"]?.value;

    if (!email || !password || !confirm) {
      setMessage(resetMessage, "Lengkapi email dan password baru.", "error");
      return;
    }
    if (password.length < 8) {
      setMessage(resetMessage, "Password minimal 8 karakter.", "error");
      return;
    }
    if (password !== confirm) {
      setMessage(resetMessage, "Konfirmasi password tidak cocok.", "error");
      return;
    }

    const users = getUsers();
    const index = users.findIndex((user) => user.email === email);
    if (index === -1) {
      setMessage(resetMessage, "Email belum terdaftar.", "error");
      return;
    }

    users[index] = { ...users[index], password };
    saveUsers(users);
    resetForm.reset();
    setMessage(resetMessage, "Password berhasil diubah. Silakan login.", "success");
    if (loginForm) {
      const loginRole = loginForm.elements["role"]?.value || "student";
      if (loginRole === "admin") {
        loginForm.elements["email"].value = email;
      }
    }
    setTab("login");
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const role = loginForm.elements["role"]?.value || "student";
    const identifier = loginForm.elements["email"]?.value.trim();
    const password = loginForm.elements["password"]?.value;

    if (!identifier || !password) {
      setMessage(
        loginMessage,
        role === "admin" ? "Masukkan email dan kata sandi." : "Masukkan NIS dan kata sandi.",
        "error"
      );
      return;
    }

    const users = getUsers();
    if (users.length === 0) {
      setMessage(loginMessage, "Belum ada akun terdaftar. Silakan sign up terlebih dahulu.", "error");
      return;
    }

    let existingUser = null;
    if (role === "admin") {
      const email = identifier.toLowerCase();
      existingUser = users.find((item) => item.email === email);
      if (!existingUser) {
        setMessage(loginMessage, "Email belum terdaftar. Silakan sign up terlebih dahulu.", "error");
        return;
      }
    } else {
      existingUser = users.find((item) => item.nis === identifier || item.nisn === identifier);
      if (!existingUser) {
        setMessage(loginMessage, "NIS belum terdaftar. Silakan sign up terlebih dahulu.", "error");
        return;
      }
    }

    const userRole = existingUser.role || "student";
    if (userRole !== role) {
      setMessage(loginMessage, `Akun ini terdaftar sebagai ${userRole === "admin" ? "Admin" : "Siswa"}.`, "error");
      return;
    }

    if (existingUser.password !== password) {
      setMessage(loginMessage, "Kata sandi salah. Coba lagi.", "error");
      return;
    }

    setSession({ name: existingUser.name, email: existingUser.email, role: userRole });
    renderAll();
    setMessage(loginMessage, "Login berhasil. Selamat datang!", "success");
    loginForm.reset();
    closeModal();
  });
}

if (profileUploads.length) {
  profileUploads.forEach((input) => {
    input.addEventListener("change", (event) => {
      const session = getSession();
      if (!session) {
        openModal("login");
        return;
      }

      const file = event.target.files[0];
      if (!file) return;
      if (file.size > 2 * 1024 * 1024) {
        setProfileMessage("Ukuran foto maksimal 2MB.", "error");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        updateUser(session.email, { photo: reader.result });
        renderProfile(session);
        setProfileMessage("Foto profil berhasil diperbarui.", "success");
      };
      reader.readAsDataURL(file);
    });
  });
}
    const file = event.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setProfileMessage("Ukuran foto maksimal 2MB.", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      updateUser(session.email, { photo: reader.result });
      renderProfile(session);
      setProfileMessage("Foto profil berhasil diperbarui.", "success");
    };
    reader.readAsDataURL(file);
  });
}

if (deleteAccountButton) {
  deleteAccountButton.addEventListener("click", () => {
    const session = getSession();
    if (!session) {
      openModal("login");
      return;
    }
    if (session.role === "admin") {
      setProfileMessage("Akun admin tidak dapat dihapus di sini.", "error");
      return;
    }

    const confirmed = window.confirm(
      "Yakin hapus akun? Semua data peminjaman akan dihapus permanen."
    );
    if (!confirmed) return;

    const users = getUsers().filter((user) => user.email !== session.email);
    saveUsers(users);

    const allLoans = getLoans();
    delete allLoans[session.email];
    saveLoans(allLoans);

    clearSession();
    renderAll();
  });
}

if (loanForm) {
  const today = formatISODate(new Date());
  loanForm.elements["tanggal"].value = today;

  const updateDuePreview = () => {
    const tanggal = loanForm.elements["tanggal"]?.value;
    const durasi = loanForm.elements["durasi"]?.value;
    const dueDate = calculateDueDate(tanggal, durasi);
    if (loanForm.elements["kembali"]) {
      loanForm.elements["kembali"].value = formatISODate(dueDate);
    }
  };

  updateDuePreview();
  loanForm.elements["tanggal"]?.addEventListener("change", updateDuePreview);
  loanForm.elements["durasi"]?.addEventListener("input", updateDuePreview);

  loanForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const session = getSession();
    if (!session) {
      openModal("login");
      return;
    }

    const judul = loanForm.elements["judul"]?.value.trim();
    const kode = loanForm.elements["kode"]?.value.trim();
    const kategori = loanForm.elements["kategori"]?.value.trim();
    const tanggal = loanForm.elements["tanggal"]?.value;
    const durasi = loanForm.elements["durasi"]?.value;
    const dueDate = calculateDueDate(tanggal, durasi);

    if (!judul || !kode || !kategori || !tanggal || !durasi || !dueDate) {
      setMessage(loanMessage, "Lengkapi seluruh data peminjaman.", "error");
      return;
    }

    const allLoans = getLoans();
    const userLoans = allLoans[session.email] || [];
    userLoans.push({
      id: createLoanId(),
      judul,
      kode,
      kategori,
      tanggal,
      durasi: Number(durasi),
      dueDate: formatISODate(dueDate),
      status: "Menunggu",
      returnStatus: "none",
      returnRequestedAt: null,
      returnedAt: null,
    });
    allLoans[session.email] = userLoans;
    saveLoans(allLoans);

    setMessage(loanMessage, "Pengajuan peminjaman berhasil disimpan.", "success");
    loanForm.reset();
    loanForm.elements["tanggal"].value = today;
    updateDuePreview();
    renderAll();
  });
}

logoutButtons.forEach((button) => {
  button.addEventListener("click", () => {
    clearSession();
    renderAll();
  });
});

setAuthRole("student");
renderAll();
setupCatalogSearch();
window.SIPERDI_APP_READY = true;





