(function () {
  "use strict";

  var NAME = "Elias Dürrwanger";
  var page = document.body.dataset.page;
  var base = page === "404" ? "/" : "";
  var img = function (file) { return base + "images/" + file; };
  var projects = (typeof PROJECTS !== "undefined" ? PROJECTS : []).map(function (p) {
    // Build the image list: either listed by hand ("images") or numbered files ("count")
    var list = p.images ? p.images.slice() : [];
    if (!list.length && p.folder && p.count) {
      for (var n = 1; n <= p.count; n++) {
        list.push(p.folder + "/" + (n < 10 ? "0" + n : n) + "." + (p.ext || "jpg"));
      }
    } else if (p.folder) {
      list = list.map(function (f) { return f.indexOf("/") === -1 ? p.folder + "/" + f : f; });
    }
    return {
      slug: p.slug || p.folder,
      title: p.title || "",
      caption: p.caption || "",
      images: list,
    };
  });
  var homeImages = typeof HOME_IMAGES !== "undefined" ? HOME_IMAGES : [];

  // Active menu item (project pages belong to "Work")
  var activeNav = page === "project" ? "work" : page;
  document.querySelectorAll("[data-nav]").forEach(function (a) {
    if (a.dataset.nav === activeNav) a.classList.add("active");
  });

  // ---------- Homepage: one random photo ----------
  if (page === "home") {
    var homeImg = document.getElementById("home-image");
    if (homeImg && homeImages.length) {
      homeImg.addEventListener("load", function () { homeImg.classList.add("loaded"); });
      homeImg.src = img(homeImages[Math.floor(Math.random() * homeImages.length)]);
    }
  }

  // ---------- Work: project grid ----------
  if (page === "work") {
    var grid = document.getElementById("work-grid");
    projects.forEach(function (p) {
      if (!p.images || !p.images.length) return;
      var a = document.createElement("a");
      a.className = "work-item";
      a.href = "project.html?p=" + encodeURIComponent(p.slug);
      var cover = document.createElement("div");
      cover.className = "cover";
      var im = document.createElement("img");
      im.src = img(p.images[0]);
      im.alt = p.title || "";
      im.loading = "lazy";
      im.decoding = "async";
      cover.appendChild(im);
      var h = document.createElement("h3");
      h.textContent = p.title || "";
      a.appendChild(cover);
      a.appendChild(h);
      grid.appendChild(a);
    });
  }

  // ---------- Project: slideshow ----------
  if (page === "project") {
    var slug = new URLSearchParams(location.search).get("p");
    var idx = -1;
    projects.forEach(function (p, i) { if (p.slug === slug) idx = i; });
    if (idx === -1) { location.replace("work.html"); return; }

    var project = projects[idx];
    var images = project.images || [];
    var pos = 0;
    var slideImg = document.getElementById("slide-img");
    var caption = document.getElementById("slide-caption");
    var count = document.getElementById("slide-count");
    var prevBtn = document.getElementById("prev");
    var nextBtn = document.getElementById("next");

    document.title = project.title + " — " + NAME;
    caption.textContent = project.caption || "";
    if (images.length < 2) { prevBtn.hidden = true; nextBtn.hidden = true; }

    function show(i) {
      pos = (i + images.length) % images.length;
      slideImg.classList.add("fading");
      var pre = new Image();
      pre.onload = pre.onerror = function () {
        slideImg.src = pre.src;
        slideImg.alt = project.title + " – image " + (pos + 1);
        slideImg.classList.remove("fading");
      };
      pre.src = img(images[pos]);
      count.textContent = images.length > 1 ? (pos + 1) + " / " + images.length : "";
      // preload the next one
      if (images.length > 1) new Image().src = img(images[(pos + 1) % images.length]);
    }
    show(0);

    prevBtn.addEventListener("click", function () { show(pos - 1); });
    nextBtn.addEventListener("click", function () { show(pos + 1); });
    slideImg.addEventListener("click", function () { show(pos + 1); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") show(pos - 1);
      if (e.key === "ArrowRight") show(pos + 1);
    });
    var startX = null;
    slideImg.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
    slideImg.addEventListener("touchend", function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) show(dx < 0 ? pos + 1 : pos - 1);
      startX = null;
    });

    var nextLink = document.getElementById("next-project");
    if (projects.length > 1) {
      var np = projects[(idx + 1) % projects.length];
      nextLink.href = "project.html?p=" + encodeURIComponent(np.slug);
      document.getElementById("next-title").textContent = np.title;
    } else {
      nextLink.hidden = true;
    }
  }
})();
