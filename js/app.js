document.addEventListener('DOMContentLoaded',()=>{
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  toggle.addEventListener('click',()=>{
    if(nav.style.display==='flex'){
      nav.style.display='none';
    } else { nav.style.display='flex'; nav.style.flexDirection='column'; }
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const href = a.getAttribute('href');
      if(href.length>1){
        const el = document.querySelector(href);
        if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth',block:'start'}); if(nav.style.display==='flex' && window.innerWidth<640) nav.style.display='none'; }
      }
    })
  })

  // Booking form handler (demo)
  const form = document.getElementById('bookingForm');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get('name') || 'Клиент';
      // Here you'd send data to backend. For demo we show a success message.
      alert(`${name}, заявка принята. Мы свяжемся с вами в ближайшее время.`);
      form.reset();
    })
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item=>{
    const btn = item.querySelector('.faq-q');
    btn && btn.addEventListener('click', ()=>{
      item.classList.toggle('open');
    });
  });
});
