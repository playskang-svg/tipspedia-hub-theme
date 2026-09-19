/* ==========================================================================
   TipsPedia Hub (hub.tipspedia.kr) - Custom Blogger Theme JS
   Design replicated from bizhelp.kr (no JS needed for nav - flex-wrap handles it)
   Served via jsDelivr CDN from github.com/playskang-svg/tipspedia-hub-theme
   ========================================================================== */
(function(){
  "use strict";

  function ready(fn){
    if(document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  var LABEL_COLORS = {
    "여행": "#2f5fa8",
    "생활정보": "#1d6f5c",
    "재테크": "#b8860b",
    "건강": "#b5461e",
    "리뷰": "#5b4b8a"
  };

  ready(function(){
    // Single-post page detection also happens earlier via an inline script in the
    // header gadget (see layout); this is a safety net in case that inline script
    // is ever removed.
    if (!document.body.classList.contains("is-single-post") &&
        /\/\d{4}\/\d{2}\/[^/]+\.html$/.test(window.location.pathname)) {
      document.body.classList.add("is-single-post");
    }

    // Color-code category chips/labels per post based on label text.
    // ::before can't read per-element custom props reliably across engines, so generate
    // one scoped rule per post via a data attribute instead.
    var styleTag = document.createElement("style");
    var rules = [];
    document.querySelectorAll(".post-outer").forEach(function(post, i){
      var labelLink = post.querySelector(".post-labels a");
      var labelText = labelLink ? labelLink.textContent.trim() : null;
      var color = (labelText && LABEL_COLORS[labelText]) || "#2f5fa8";
      post.setAttribute("data-chip", "chip-" + i);
      rules.push('.post-outer[data-chip="chip-' + i + '"]::before{background:' + color + ' !important;}');
      if (labelLink) labelLink.style.color = color;
    });
    styleTag.textContent = rules.join("\n");
    document.head.appendChild(styleTag);

    // Lazy-load images
    document.querySelectorAll(".post-body img, .row-thumb img").forEach(function(img){
      if(!img.hasAttribute("loading")) img.setAttribute("loading", "lazy");
    });

    // Mark current nav link active
    try {
      var path = window.location.pathname;
      document.querySelectorAll(".main-nav a").forEach(function(a){
        var href = a.getAttribute("href") || "";
        if(href && href !== "/" && path.indexOf(href) === 0){
          a.classList.add("active");
        }
      });
    } catch(e){}
  });
})();
