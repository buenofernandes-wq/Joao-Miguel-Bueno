// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
  
  // ===== SCROLL SUAVE E ATUALIZAÇÃO DO LINK ATIVO =====
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  // Função para atualizar link ativo durante o scroll
  function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink(); // executa ao carregar

  // ===== FORMULÁRIO DE CONTATO =====
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const nome = document.getElementById('nome').value.trim();
      const email = document.getElementById('email').value.trim();
      const mensagem = document.getElementById('mensagem').value.trim();
      
      if (!nome || !email || !mensagem) {
        alert('Por favor, preencha todos os campos.');
        return;
      }
      
      // Simula envio (aqui você pode integrar com um backend real)
      alert(`Obrigado, ${nome}! Sua mensagem foi enviada com sucesso. Entrarei em contato em breve.`);
      
      // Limpa o formulário
      contactForm.reset();
    });
  }

  // ===== EFEITO DINÂMICO NOS CARDS DE SERVIÇO =====
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s ease';
    });
  });

  // ===== ANIMAÇÃO DE ENTRADA PARA SEÇÕES (Intersection Observer) =====
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Aplica animação inicial e observa cada seção
  sections.forEach(section => {
    if (section.id !== 'home') {
      section.style.opacity = '0';
      section.style.transform = 'translateY(30px)';
      section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      observer.observe(section);
    }
  });

  // ===== CARTÃO DE VISITA - EFEITO 3D LEVE =====
  const businessCard = document.querySelector('.business-card');
  if (businessCard) {
    businessCard.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    businessCard.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  }

  // ===== LOGO - EFEITO DE ROTAÇÃO AO CLICAR =====
  const logoSvg = document.querySelector('.logo-svg');
  if (logoSvg) {
    logoSvg.addEventListener('click', function() {
      this.style.transform = 'rotate(360deg) scale(1.2)';
      setTimeout(() => {
        this.style.transform = 'rotate(0) scale(1)';
      }, 500);
    });
  }

  // ===== BOTÃO "AGENDE UMA AULA" - SCROLL SUAVE =====
  const ctaButton = document.querySelector('.hero-content .btn-primary');
  if (ctaButton) {
    ctaButton.addEventListener('click', function(e) {
      e.preventDefault();
      const contatoSection = document.getElementById('contato');
      if (contatoSection) {
        contatoSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ===== ANO ATUAL NO FOOTER (opcional, mas dinâmico) =====
  const footer = document.querySelector('footer p');
  if (footer) {
    const currentYear = new Date().getFullYear();
    footer.innerHTML = footer.innerHTML.replace('2025', currentYear);
  }

});
