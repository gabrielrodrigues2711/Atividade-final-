
// tema
const toggleTheme = () => {
  document.body.classList.toggle('light');
  localStorage.setItem('theme', document.body.classList.contains('light') ? 'light':'dark');
  showToast(document.body.classList.contains('light') ? 'Modo claro ativado' : 'Modo escuro ativado');
};
const initTheme = () => {
  const saved = localStorage.getItem('theme');
  if(saved === 'light'){ document.body.classList.add('light'); }
};


const smoothAnchors = () => {
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); }
    });
  });
};


const animateProgress = () => {
  document.querySelectorAll('.progress').forEach(p=>{
    const target = p.dataset.value || 0;
    const bar = p.querySelector('div');
    if(!bar) return;
    const rect = p.getBoundingClientRect();
    if(rect.top < window.innerHeight - 80){
      bar.style.width = target + '%';
    }
  });
};


const modal = document.getElementById('modal');
const openModal = (src) => {
  if(!modal) return;
  modal.querySelector('img').src = src;
  modal.style.display = 'flex';
};
const closeModal = () => { if(modal) modal.style.display='none'; };


const toast = document.getElementById('toast');
const showToast = (msg) => {
  if(!toast) return;
  toast.textContent = msg;
  toast.style.display = 'block';
  setTimeout(()=> toast.style.display='none', 2200);
};


const printCV = () => window.print();

document.addEventListener('DOMContentLoaded', ()=>{
  initTheme();
  smoothAnchors();
  animateProgress();
  window.addEventListener('scroll', animateProgress);
  document.querySelectorAll('[data-toggle="theme"]').forEach(b=> b.addEventListener('click', toggleTheme));
  document.querySelectorAll('[data-open]').forEach(img=>{
    img.style.cursor='zoom-in';
    img.addEventListener('click', ()=> openModal(img.src));
  });
  document.querySelectorAll('[data-copy]').forEach(btn=>{
    btn.addEventListener('click', async ()=>{
      await navigator.clipboard.writeText(btn.dataset.copy);
      showToast('Copiado!');
    });
  });
  const closeBtn = document.querySelector('#modal .close');
  if(closeBtn) closeBtn.addEventListener('click', closeModal);
  if(modal) modal.addEventListener('click', (e)=> { if(e.target.id==='modal') closeModal(); });
});
