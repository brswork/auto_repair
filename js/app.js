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

  // Reveal sections on scroll using IntersectionObserver
  (function(){
    const sections = Array.from(document.querySelectorAll('main > section'));
    if(!sections.length) return;

    // mark initial hidden state
    sections.forEach((sec, i)=>{
      sec.classList.add('reveal-hidden');
      // stagger via inline transition delay for children cards (if any)
      sec.style.setProperty('--reveal-delay', `${i * 80}ms`);
    });

    const io = new IntersectionObserver((entries, obs)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const el = entry.target;
          // apply visible class with small stagger for better effect
          const delay = getComputedStyle(el).getPropertyValue('--reveal-delay') || '0ms';
          window.requestAnimationFrame(()=>{
            setTimeout(()=>{
              el.classList.remove('reveal-hidden');
              el.classList.add('reveal-visible');
            }, parseInt(delay));
          });
          obs.unobserve(el);
        }
      });
    },{root:null,rootMargin:'0px 0px -10% 0px',threshold:0.12});

    sections.forEach(s=>io.observe(s));
  })();
});
