(() => {
  const B = {
    ig: "https://www.instagram.com/lebsek_wear33/",
    dm: "https://ig.me/m/lebsek_wear33",
    tt: "https://www.tiktok.com/@lebsek81",
    // Names/colours are read off the photos and the captions on the shop's own page. No prices anywhere: none are published.
    products: [
      { id: "denim", cat: "denim", tag: "Denim", name: "جاكت جينز كحلي", text: "جاكت جينز بقصة واسعة وأزرار، يتنسّق مع كل لوك. مش أي جاكت… القطعة اللي هتكمّل كل لوك.", imgs: ["0-1", "0-4"] },
      { id: "wash", cat: "denim", tag: "Denim", name: "جاكت جينز غسيل بحزام", text: "جاكت جينز بغسيلة مميزة وحزام على الوسط وحواف متقطّعة.", imgs: ["7-0", "7-1", "7-3", "7-5"] },
      { id: "argyle", cat: "knit", tag: "Knitwear", name: "سويتر أرجايل بني × أبيض", text: "Brown & White Argyle Sweater. ستايل شيك وألوان رايقة. نسّقيه مع جينز أو بنطلون فورمال.", imgs: ["2-0", "2-1"] },
      { id: "hoodie", cat: "hoodies", tag: "Hoodies", name: "هودي أوفرسايز", text: "Winter Essential. هودي مريح وشيك وينفع لكل خروجاتك.", sw: ["زيتي", "أسود", "أخضر فاتح", "بني", "بيج", "أوف وايت", "وردي"], imgs: ["5-0", "5-1", "5-2", "5-3", "5-4", "5-5", "5-6"] },
      { id: "polo", cat: "knit", tag: "Knitwear", name: "بولو سويتر مقلّم", text: "سويتر مقلّم بياقة بولو، متوفر بألوان متعددة.", imgs: ["6-0", "6-1", "6-2"] },
      { id: "coat-b", cat: "coats", tag: "Coats", name: "كوت طويل أسود", text: "كوت طويل بقصة مستقيمة للأيام الباردة.", imgs: ["1-0"] },
      { id: "coat-m", cat: "coats", tag: "Coats", name: "كوت عنابي", text: "كوت بلون عنابي دافي يكمّل لوك الشتا.", imgs: ["1-1", "1-2"] },
      { id: "coat-br", cat: "coats", tag: "Coats", name: "كوت طويل بني", text: "كوت طويل بلون بني هادي وتفاصيل بسيطة.", imgs: ["3-0", "3-1", "3-2", "3-3"] },
      { id: "crop", cat: "denim", tag: "Jackets", name: "جاكيت كروب", text: "جاكيت قصير بخيط على الحافة، متوفر بالأسود والزيتي والبيج.", sw: ["أسود", "زيتي", "بيج"], imgs: ["8-0", "8-1", "8-2"] },
      { id: "set", cat: "sets", tag: "Sets", name: "سيت تريننج", text: "Sporty, Chic & Always on Trend. راحة وستايل في لوك واحد.", sw: ["أسود", "أحمر", "أزرق فاتح", "أصفر فاتح"], imgs: ["9-0", "9-1", "9-2", "9-3"] },
    ],
    cats: [
      { k: "denim", n: "جاكتات", en: "Jackets & Denim", img: "7-3" },
      { k: "coats", n: "كوتات", en: "Coats", img: "1-0" },
      { k: "hoodies", n: "هوديز", en: "Hoodies", img: "5-3" },
      { k: "knit", n: "سويترات", en: "Knitwear", img: "2-1" },
      { k: "sets", n: "سيتات", en: "Sets", img: "9-2" },
    ],
  };
  const $ = (s) => document.querySelector(s), $$ = (s) => [...document.querySelectorAll(s)];
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover:hover) and (pointer:fine)").matches;

  ["#hdDm", "#navDm"].forEach((s) => ($(s).href = B.dm));
  $("#hdTt").href = B.tt; $("#igFb").href = B.ig; $("#fIg").href = B.ig; $("#fTt").href = B.tt;

  // ---- product strip
  let filter = "all";
  const card = (p) => `
    <article class="pc" data-id="${p.id}">
      <button class="pc-img" aria-label="${p.name}"><img class="a" src="img/${p.imgs[0]}-m.webp" alt="${p.name}" loading="lazy">${p.imgs[1] ? `<img class="b" src="img/${p.imgs[1]}-m.webp" alt="" loading="lazy">` : ""}<em>NEW</em></button>
      <div class="pc-b"><span>${p.tag}</span><h3>${p.name}</h3>${p.sw ? `<small>${p.sw.length} ألوان</small>` : ""}<button class="link-u order-btn" data-id="${p.id}">اطلبي</button></div>
    </article>`;
  const drawStrip = () => {
    const list = B.products.filter((p) => filter === "all" || p.cat === filter);
    $("#strip").innerHTML = list.map(card).join("");
    $("#strip").scrollTo({ left: 0 });
  };
  drawStrip();
  $("#catGrid").innerHTML = B.cats.map((c) => `
    <a class="ct rv" href="#new" data-filter="${c.k}"><span class="ct-img"><img src="img/${c.img}-m.webp" alt="${c.n}" loading="lazy"></span><b>${c.n}</b><small dir="ltr">${c.en}</small></a>`).join("");
  document.addEventListener("click", (e) => {
    const f = e.target.closest("[data-filter]");
    if (f) { filter = f.dataset.filter; drawStrip(); }
  });
  const sc = (d) => $("#strip").scrollBy({ left: d * Math.min(640, innerWidth * .8), behavior: reduce ? "auto" : "smooth" });
  $("#pPrev").onclick = () => sc(1); $("#pNext").onclick = () => sc(-1);

  // ---- ordering: copy a ready message, open the DM
  const toast = (t) => { const el = $("#toast"); el.textContent = t; el.classList.add("on"); clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove("on"), 4200); };
  async function order(text) {
    try { await navigator.clipboard.writeText(text); toast("اتنسخت رسالة الطلب. الصقيها في الرسائل وابعتيها."); }
    catch { toast("انسخي الرسالة دي وابعتيها: " + text); }
    window.open(B.dm, "_blank", "noopener");
  }
  const msgFor = (p, color) => `أهلاً، عايزة أطلب: ${p.name}${color ? " — اللون: " + color : ""}\nالمقاس: \nالمحافظة: `;

  // ---- dialog
  const dlg = $("#dlg");
  let cur = null, curColor = "";
  function open(p) {
    cur = p; curColor = "";
    $("#dImg").src = `img/${p.imgs[0]}-l.webp`; $("#dImg").alt = p.name;
    $("#dTh").innerHTML = p.imgs.map((x, i) => `<button class="${i ? "" : "on"}" data-src="${x}"><img src="img/${x}-m.webp" alt=""></button>`).join("");
    $("#dTag").textContent = p.tag; $("#dName").textContent = p.name; $("#dText").textContent = p.text;
    $("#dSw").innerHTML = p.sw ? "<span>الألوان:</span>" + p.sw.map((c) => `<button data-c="${c}">${c}</button>`).join("") : "";
    dlg.showModal();
  }
  $("#dTh").onclick = (e) => { const b = e.target.closest("button"); if (!b) return; $("#dImg").src = `img/${b.dataset.src}-l.webp`; $$("#dTh button").forEach((x) => x.classList.toggle("on", x === b)); };
  $("#dSw").onclick = (e) => { const b = e.target.closest("button"); if (!b) return; curColor = b.dataset.c; $$("#dSw button").forEach((x) => x.classList.toggle("on", x === b)); };
  $("#dOrder").onclick = () => { order(msgFor(cur, curColor)); };
  $("#dlgX").onclick = () => dlg.close();
  dlg.addEventListener("click", (e) => e.target === dlg && dlg.close());
  $("#strip").addEventListener("click", (e) => {
    const ob = e.target.closest(".order-btn");
    if (ob) { order(msgFor(B.products.find((p) => p.id === ob.dataset.id))); return; }
    const c = e.target.closest(".pc"); if (c) open(B.products.find((p) => p.id === c.dataset.id));
  });
  $("#orderForm").onsubmit = (e) => {
    e.preventDefault();
    const item = $("#fItem").value.trim();
    if (!item) { $("#fErr").textContent = "اكتبي القطعة اللي عايزاها."; $("#fItem").focus(); return; }
    $("#fErr").textContent = "";
    const size = $("#fSize").value.trim(), color = $("#fColor").value.trim(), city = $("#fCity").value.trim();
    order(`أهلاً، عايزة أطلب: ${item}${color ? " — اللون: " + color : ""}\nالمقاس: ${size}\nالمحافظة: ${city}`);
  };

  // ---- menu
  const nav = $("#nav"), bg = $("#burger");
  const setMenu = (o) => { nav.classList.toggle("open", o); bg.setAttribute("aria-expanded", o); };
  bg.onclick = () => setMenu(!nav.classList.contains("open"));
  nav.addEventListener("click", (e) => e.target.closest("a") && setMenu(false));

  // ---- reveals
  $$(".cats,.ben-in").forEach((g) => [...g.children].forEach((c, i) => c.style.setProperty("--d", i * 0.08 + "s")));
  const els = $$(".rv");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((en) => en.forEach((x) => x.isIntersecting && (x.target.classList.add("in"), io.unobserve(x.target))), { threshold: 0.12 });
    els.forEach((e) => io.observe(e));
  } else els.forEach((e) => e.classList.add("in"));

  // ---- loader -> hero + counter
  let started = false;
  const countUp = () => $$("[data-count]").forEach((el) => {
    if (reduce) return;
    const to = +el.dataset.count, suf = el.dataset.suf || "", t0 = performance.now();
    const tick = (t) => { const p = Math.min(1, (t - t0) / 1400), e = 1 - Math.pow(1 - p, 3); el.textContent = Math.round(to * e) + suf; if (p < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  });
  const start = () => {
    if (started) return; started = true;
    $("#loader").classList.add("gone"); root.classList.remove("loading"); root.classList.add("ready");
    setTimeout(countUp, 600);
  };
  if (reduce) start();
  else {
    const min = new Promise((r) => setTimeout(r, 1900));
    const loaded = new Promise((r) => (document.readyState === "complete" ? r() : addEventListener("load", r)));
    Promise.all([min, loaded]).then(start);
    setTimeout(start, 4500);
  }

  // ---- progress + sticky header
  const bar = $("#progress"), header = $(".header");
  let tick = false;
  addEventListener("scroll", () => { if (tick) return; tick = true; requestAnimationFrame(() => { tick = false; const max = root.scrollHeight - innerHeight; bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`; header.classList.toggle("stuck", scrollY > 30); }); }, { passive: true });

  // ---- ripple on buttons
  document.addEventListener("pointerdown", (e) => {
    const b = e.target.closest(".btn"); if (!b || reduce) return;
    const r = b.getBoundingClientRect(), s = Math.max(r.width, r.height), d = document.createElement("span");
    d.className = "ripple"; d.style.cssText = `inline-size:${s}px;block-size:${s}px;left:${e.clientX - r.left - s / 2}px;top:${e.clientY - r.top - s / 2}px`;
    b.append(d); setTimeout(() => d.remove(), 650);
  });
})();
