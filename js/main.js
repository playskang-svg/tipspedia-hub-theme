/* ==========================================================================
   TipsPedia Hub (hub.tipspedia.kr) - Custom Blogger Theme JS
   Served via jsDelivr CDN from github.com/playskang-svg/tipspedia-hub-theme
   ========================================================================== */
(function(){
  "use strict";

  function ready(fn){
    if(document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function(){
    // Mobile nav toggle
    var menuBtn = document.querySelector(".tp-menu-toggle");
    var nav = document.querySelector(".tp-nav");
    if(menuBtn && nav){
      menuBtn.addEventListener("click", function(){
        nav.classList.toggle("tp-nav-open");
      });
    }

    // Search box toggle (mobile)
    var searchBtn = document.querySelector(".tp-search-toggle");
    var searchBox = document.querySelector(".tp-header-search");
    if(searchBtn && searchBox){
      searchBtn.addEventListener("click", function(){
        searchBox.classList.toggle("tp-open");
        var input = searchBox.querySelector("input");
        if(input && searchBox.classList.contains("tp-open")) input.focus();
      });
    }

    // Highlight current label/category in nav
    try {
      var path = window.location.pathname + window.location.search;
      document.querySelectorAll(".tp-nav a").forEach(function(a){
        var href = a.getAttribute("href") || "";
        if(href && path.indexOf(href) === 0 && href !== "/"){
          a.classList.add("tp-active");
        }
      });
    } catch(e){}

    // Native lazy-load fallback for post thumbnails without loading attr
    document.querySelectorAll(".tp-post-thumb img, .tp-popular-thumb img").forEach(function(img){
      if(!img.hasAttribute("loading")) img.setAttribute("loading","lazy");
    });

    // Reading-time badge (optional, purely cosmetic) for single post body
    var body = document.querySelector(".tp-post-single .post-body");
    var meta = document.querySelector(".tp-post-single .tp-post-meta");
    if(body && meta){
      var words = body.innerText.trim().split(/\s+/).length;
      var minutes = Math.max(1, Math.round(words / 350));
      var span = document.createElement("span");
      span.textContent = "읽는데 약 " + minutes + "분";
      meta.appendChild(span);
    }
  });
})();
