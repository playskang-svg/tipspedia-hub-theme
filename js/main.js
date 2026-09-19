/* ==========================================================================
   TipsPedia Hub (hub.tipspedia.kr) - Custom Blogger Theme JS
   Served via jsDelivr CDN from github.com/playskang-svg/tipspedia-hub-theme
   v2: mobile hamburger nav + header search toggle
   ========================================================================== */
(function(){
  "use strict";

  function ready(fn){
    if(document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function(){
    // Mobile hamburger nav toggle
    var navToggle = document.querySelector(".tp-nav-toggle");
    var navLinks = document.querySelector(".tp-nav-links");
    if(navToggle && navLinks){
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.addEventListener("click", function(){
        var open = navLinks.classList.toggle("tp-open");
        navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }

    // Header search toggle (mobile)
    var searchToggle = document.querySelector(".tp-nav-search-toggle");
    var searchBox = document.querySelector(".tp-nav-search");
    if(searchToggle && searchBox){
      searchToggle.addEventListener("click", function(e){
        e.preventDefault();
        var open = searchBox.classList.toggle("tp-open");
        if(open){
          var input = searchBox.querySelector("input");
          if(input) input.focus();
        }
      });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll(".tp-nav-links a").forEach(function(a){
      a.addEventListener("click", function(){
        if(navLinks) navLinks.classList.remove("tp-open");
      });
    });

    // Highlight current label/category in nav
    try {
      var path = window.location.pathname + window.location.search;
      document.querySelectorAll(".tp-nav-links a").forEach(function(a){
        var href = a.getAttribute("href") || "";
        if(href && href !== "/" && path.indexOf(href) === 0){
          a.classList.add("tp-active");
        }
      });
    } catch(e){}

    // Native lazy-load fallback for thumbnails
    document.querySelectorAll(".tp-post-thumb img, .tp-popular-thumb img, .post-body img").forEach(function(img){
      if(!img.hasAttribute("loading")) img.setAttribute("loading","lazy");
    });

    // Reading-time badge for single post body
    var body = document.querySelector(".post-body");
    var meta = document.querySelector(".post-meta, .post-timestamp");
    if(body && meta && !meta.querySelector(".tp-read-time")){
      var words = (body.innerText || "").trim().split(/\s+/).length;
      var minutes = Math.max(1, Math.round(words / 350));
      var span = document.createElement("span");
      span.className = "tp-read-time";
      span.style.marginLeft = "8px";
      span.textContent = "· 읽는데 약 " + minutes + "분";
      meta.appendChild(span);
    }
  });
})();
