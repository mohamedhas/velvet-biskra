/* Velvet Biskra — تفاعلات الموقع */
(function () {
  document.documentElement.classList.add('js');

  // قائمة الجوال
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') nav.classList.remove('open');
    });
  }

  // ظهور العناصر عند التمرير
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('visible');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // رمز QR — يُبنى تلقائيًا من رابط الموقع في js/config.js
  document.querySelectorAll('img.js-qr').forEach(function (img) {
    var url = (typeof SITE_CONFIG !== 'undefined' ? SITE_CONFIG.siteUrl : '') || window.location.href;
    img.src = 'https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=10&data=' + encodeURIComponent(url);
    img.alt = 'رمز QR لرابط الموقع';
  });

  // عارض الصور في المعرض
  var lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = '<img alt="عرض الصورة">';
  document.body.appendChild(lb);
  var lbImg = lb.querySelector('img');

  document.querySelectorAll('.gallery-item img').forEach(function (img) {
    img.addEventListener('click', function () {
      lbImg.src = img.src;
      lb.classList.add('open');
    });
  });
  lb.addEventListener('click', function () { lb.classList.remove('open'); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') lb.classList.remove('open');
  });

  // سنة الحقوق
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
