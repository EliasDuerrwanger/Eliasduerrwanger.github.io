(function () {
  "use strict";

  var NAME = "Elias Dürrwanger";
  var page = document.body.dataset.page;
  var base = page === "404" ? "/" : "";
  var IMG = /\.(jpe?g|png|webp|gif|avif)$/i;
  var img = function (file) { return base + "images/" + file; };
  var cfg = typeof SITE !== "undefined" ? SITE : {};
  var rawProjects = typeof PROJECTS !== "undefined" ? PROJECTS : [];
  var homeImages = typeof HOME_IMAGES !== "undefined" ? HOME_IMAGES : [];

  // Active menu item (project pages belong to "Work")
  var activeNav = page === "project" ? "work" : page;
  document.querySelectorAll("[data-nav]").forEach(function (a) {
    if (a.dataset.nav === activeNav) a.classList.add("active");
  });

  // ---------- Find all photos in the repository (one request, cached per visit) ----------
  function loadFileList() {
    var user = cfg.githubUser || "";
    var host = location.hostname;
    if (!user && /\.github\.io$/i.test(host)) user = host.split(".")[0];
    if (!user) return Promise.resolve(null);
    var repo = cfg.githubRepo || user + ".github.io";
    var branch = cfg.branch || "main";
    var key = "filelist:" + user + "/" + repo + "/" + branch;
    // Reuse the file list for 5 minutes, then fetch it again (so new uploads show up)
    try {
      var cached = JSON.parse(sessionStorage.getItem(key) || "null");
      if (cached && cached.paths && Date.now() - cached.time < 5 * 60 * 1000) {
        return Promise.resolve(cached.paths);
      }
    } catch (e) { /* storage not available */ }
    var url = "https://api.github.com/repos/" + user + "/" + repo + "/git/trees/" + branch + "?recursive=1";
    return fetch(url)
      .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
      .then(function (data) {
        var paths = (data.tree || [])
          .filter(function (t) { return t.type === "blob" && t.path.indexOf("images/") === 0; })
          .map(function (t) { return t.path.slice(7); });
        try { sessionStorage.setItem(key, JSON.stringify({ time: Date.now(), paths: paths })); } catch (e) { /* ignore */ }
        return paths;
      })
      .catch(function () { return null; });
  }

  function buildProjects(paths) {
    return rawProjects.map(function (p) {
      var folder = p.folder || "";
      var list = [];
      if (p.images && p.images.length) {
        list = p.images.map(function (f) { return f.indexOf("/") === -1 && folder ? folder + "/" + f : f; });
      } else if (paths && folder) {
        var prefix = folder + "/";
        list = paths.filter(function (f) {
          return f.indexOf(prefix) === 0 && f.slice(prefix.length).indexOf("/") === -1 && IMG.test(f);
        }).sort(function (a, b) { return a.localeCompare(b, undefined, { numeric: true }); });
      }
      if (p.cover) {
        var c = p.cover.indexOf("/") === -1 ? folder + "/" + p.cover : p.cover;
        var i = list.indexOf(c);
        if (i > 0) { list.splice(i, 1); list.unshift(c); }
      }
      return {
        slug: p.slug || folder,
        title: p.title || "",
        caption: p.caption || "",
        onHome: p.onHome !== false,
        images: list,
      };
    }).filter(function (p) { return p.images.length; });
  }

  function notice(el, text) {
    var p = document.createElement("p");
    p.className = "notice";
    p.textContent = text;
    el.appendChild(p);
  }
  var NO_PHOTOS = "No photos found yet. They appear automatically once the site is online on GitHub Pages " +
    "(to preview on your computer, enter your GitHub username in js/photos.js).";

  loadFileList().then(function (paths) {
    var projects = buildProjects(paths);

    // ---------- Homepage: one random photo ----------
    if (page === "home") {
      var homeImg = document.getElementById("home-image");
      var pool = homeImages.slice();
      if (!pool.length) {
        projects.forEach(function (p) { if (p.onHome) pool = pool.concat(p.images); });
      }
      if (homeImg && pool.length) {
        homeImg.addEventListener("load", function () { homeImg.classList.add("loaded"); });
        homeImg.src = img(pool[Math.floor(Math.random() * pool.length)]);
      }
    }

    // ---------- Work: project grid ----------
    if (page === "work") {
      var grid = document.getElementById("work-grid");
      if (!projects.length) { notice(grid, NO_PHOTOS); return; }
      projects.forEach(function (p) {
        var a = document.createElement("a");
        a.className = "work-item";
        a.href = "project.html?p=" + encodeURIComponent(p.slug);
        var cover = document.createElement("div");
        cover.className = "cover";
        var im = document.createElement("img");
        im.src = img(p.images[0]);
        im.alt = p.title;
        im.loading = "lazy";
        im.decoding = "async";
        cover.appendChild(im);
        var h = document.createElement("h3");
        h.textContent = p.title;
        a.appendChild(cover);
        a.appendChild(h);
        grid.appendChild(a);
      });
    }

    // ---------- Project: slideshow ----------
    if (page === "project") initProject(projects);
  });

  function initProject(projects) {
    var slug = new URLSearchParams(location.search).get("p");
    var idx = -1;
    projects.forEach(function (p, i) { if (p.slug === slug) idx = i; });
    if (idx === -1) {
      if (projects.length) location.replace("work.html");
      else notice(document.querySelector(".project"), NO_PHOTOS);
      return;
    }

    var project = projects[idx];
    var images = project.images;
    var pos = 0;
    var slideImg = document.getElementById("slide-img");
    var caption = document.getElementById("slide-caption");
    var prevBtn = document.getElementById("prev");
    var nextBtn = document.getElementById("next");

    document.title = project.title + " — " + NAME;
    caption.textContent = project.caption;
    if (images.length < 2) { prevBtn.hidden = true; nextBtn.hidden = true; }

    function show(i) {
      pos = (i + images.length) % images.length;
      slideImg.classList.add("fading");
      var pre = new Image();
      pre.onload = function () {
        slideImg.src = pre.src;
        slideImg.alt = project.title;
        slideImg.hidden = false;
        slideImg.classList.remove("fading");
      };
      pre.onerror = function () { slideImg.hidden = true; };
      pre.src = img(images[pos]);
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
    if (!nextLink) return;
    if (projects.length > 1) {
      var np = projects[(idx + 1) % projects.length];
      nextLink.href = "project.html?p=" + encodeURIComponent(np.slug);
      document.getElementById("next-title").textContent = np.title;
    } else {
      nextLink.hidden = true;
    }
  }
})();
// Block right-click "Save image" and drag-to-desktop on photos
document.addEventListener("contextmenu", function (e) {
  if (e.target.tagName === "IMG") e.preventDefault();
});
document.addEventListener("dragstart", function (e) {
  if (e.target.tagName === "IMG") e.preventDefault();
});
