/*
  Shared rendering helpers for the case-study library.
  Reads window.LINGENIOUS_PROJECTS (assets/projects-data.js) and renders
  project cards into sector pages and discipline "related projects" pull-ins,
  so project content lives in exactly one place.
*/
(function(){
  function escapeHtml(s){
    return String(s).replace(/[&<>"']/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }

  function cardHTML(p){
    var tags = p.disciplines.map(function(d){ return '<span class="card-tag">' + escapeHtml(d) + '</span>'; }).join('');
    var stats = p.stats.map(function(s){ return '<li>' + escapeHtml(s) + '</li>'; }).join('');
    return '' +
      '<a class="project-card as-link" href="' + escapeHtml(p.slug) + '">' +
        '<div class="project-photo" style="background-image:url(\'' + p.image + '\')"><span>' + escapeHtml(p.sectorLabel.toUpperCase()) + '</span></div>' +
        '<div class="project-body">' +
          '<div class="project-tag">' + escapeHtml(p.sectorLabel) + '</div>' +
          '<h3>' + escapeHtml(p.name) + '</h3>' +
          '<p>' + escapeHtml(p.scope) + '</p>' +
          '<ul class="project-stats">' + stats + '</ul>' +
          '<div class="card-tag-row">' + tags + '</div>' +
        '</div>' +
      '</a>';
  }

  function renderSector(containerId, chipsId, sectorId){
    var container = document.getElementById(containerId);
    if (!container) return;
    var chipsWrap = chipsId ? document.getElementById(chipsId) : null;
    var all = sectorId ? (window.LINGENIOUS_PROJECTS || []).filter(function(p){ return p.sector === sectorId; }) : (window.LINGENIOUS_PROJECTS || []).slice();
    var disciplines = [];
    all.forEach(function(p){
      p.disciplines.forEach(function(d){ if (disciplines.indexOf(d) === -1) disciplines.push(d); });
    });

    function draw(filter){
      var list = filter ? all.filter(function(p){ return p.disciplines.indexOf(filter) !== -1; }) : all;
      container.innerHTML = list.length ? list.map(cardHTML).join('') :
        '<div class="empty-state">No case studies match this filter yet.</div>';
    }

    if (chipsWrap){
      var chips = ['<button type="button" class="filter-chip active" data-filter="">All Disciplines</button>']
        .concat(disciplines.map(function(d){
          return '<button type="button" class="filter-chip" data-filter="' + escapeHtml(d) + '">' + escapeHtml(d) + '</button>';
        }));
      chipsWrap.innerHTML = chips.join('');
      chipsWrap.querySelectorAll('.filter-chip').forEach(function(btn){
        btn.addEventListener('click', function(){
          chipsWrap.querySelectorAll('.filter-chip').forEach(function(b){ b.classList.remove('active'); });
          btn.classList.add('active');
          draw(btn.getAttribute('data-filter') || null);
        });
      });
    }
    draw(null);
  }

  function renderRelated(containerId, disciplineName){
    var container = document.getElementById(containerId);
    if (!container) return;
    var list = (window.LINGENIOUS_PROJECTS || []).filter(function(p){ return p.disciplines.indexOf(disciplineName) !== -1; });
    if (!list.length){
      container.innerHTML = '<div class="empty-state">Case studies for this discipline are being added — <a href="contact.html" style="color:var(--navy);text-decoration:underline;">get in touch</a> to discuss relevant experience.</div>';
      return;
    }
    container.innerHTML = list.map(cardHTML).join('');
  }

  window.LingeniousProjects = { renderSector: renderSector, renderRelated: renderRelated, cardHTML: cardHTML };
})();
