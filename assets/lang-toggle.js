(function(){
  var LANG_KEY = 'lingenious-lang';
  var toggle = document.getElementById('langToggle');
  var nodes = document.querySelectorAll('[data-zh]');

  function applyLang(lang){
    nodes.forEach(function(el){
      if (el.dataset.enHtml === undefined) el.dataset.enHtml = el.innerHTML;
      el.innerHTML = lang === 'zh' ? el.dataset.zh : el.dataset.enHtml;
    });
    document.documentElement.lang = lang === 'zh' ? 'zh-Hans' : 'en-AU';
    document.body.classList.toggle('lang-zh', lang === 'zh');
    if (toggle){
      toggle.textContent = lang === 'zh' ? 'EN' : '中文';
      toggle.setAttribute('aria-label', lang === 'zh' ? 'Switch to English' : 'Switch to Chinese (Simplified)');
    }
    localStorage.setItem(LANG_KEY, lang);
  }

  if (toggle){
    toggle.addEventListener('click', function(){
      var current = document.body.classList.contains('lang-zh') ? 'zh' : 'en';
      applyLang(current === 'zh' ? 'en' : 'zh');
    });
  }

  applyLang(localStorage.getItem(LANG_KEY) || 'en');
})();
