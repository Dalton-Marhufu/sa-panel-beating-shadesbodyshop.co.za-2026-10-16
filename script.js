// Shades Bodyshop — redesign interactions
(function () {
  "use strict";

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Sticky header shadow
  var header = document.getElementById("header");
  var onScroll = function () {
    if (!header) return;
    header.classList.toggle("is-stuck", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu
  var burger = document.getElementById("burger");
  var nav = document.getElementById("nav");
  if (burger && nav) {
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Scroll reveal
  var revealTargets = document.querySelectorAll(
    ".sec-head, .card, .steps li, .why__list li, .gallery img, .approvals__cols, .about__media, .about__body, .contact__info, .contact__form"
  );
  revealTargets.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          var el = entry.target;
          setTimeout(function () { el.classList.add("in"); }, (i % 4) * 70);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("in"); });
  }

  // Quote form -> opens a pre-filled email (static concept site)
  var form = document.getElementById("quoteForm");
  var note = document.getElementById("formNote");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = (document.getElementById("name") || {}).value || "";
      var phone = (document.getElementById("phone") || {}).value || "";
      if (!name.trim() || !phone.trim()) {
        if (note) { note.style.color = "#c0392b"; note.textContent = "Please add your name and phone number."; }
        return;
      }
      var vehicle = (document.getElementById("vehicle") || {}).value || "";
      var message = (document.getElementById("message") || {}).value || "";
      var body = "Name: " + name + "\nPhone: " + phone + "\nVehicle: " + vehicle + "\n\n" + message;
      var href = "mailto:admin@shadesbodyshop.co.za?subject=" +
        encodeURIComponent("Free quote request — " + name) +
        "&body=" + encodeURIComponent(body);
      if (note) { note.style.color = "#1b7a3d"; note.textContent = "Thanks " + name + "! Opening your email app to send the request…"; }
      window.location.href = href;
    });
  }
})();
