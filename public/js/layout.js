document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeSwitch');
  const html = document.documentElement;
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const adminMenuItems = document.querySelectorAll('#adminMenu');
  const userMenuItems = document.querySelectorAll('#userMenu');

  // =========================================================================
  // TOGGLE TEMA CLARO/OSCURO
  // =========================================================================

  const savedTheme = localStorage.getItem('pokesector-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Aplicar tema guardado o preferencia del sistema
  if (savedTheme) {
    if (savedTheme === 'dark') {
      html.classList.add('dark-mode');
      if (themeToggle) themeToggle.checked = true;
    }
  } else if (prefersDark) {
    html.classList.add('dark-mode');
    if (themeToggle) themeToggle.checked = true;
    localStorage.setItem('pokesector-theme', 'dark');
  }

  // Toggle manual del tema
  if (themeToggle) {
    themeToggle.addEventListener('change', () => {
      html.classList.toggle('dark-mode');
      const isDarkMode = html.classList.contains('dark-mode');
      localStorage.setItem('pokesector-theme', isDarkMode ? 'dark' : 'light');
    });
  }

  // Escuchar cambios en preferencia del sistema
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('pokesector-theme')) {
      html.classList.toggle('dark-mode', e.matches);
      if (themeToggle) themeToggle.checked = e.matches;
    }
  });

  // =========================================================================
  // MOSTRAR MENÚ SEGÚN ROL DEL USUARIO
  // =========================================================================

  function showMenuByRole() {
    const userRole = localStorage.getItem('user_role');
    
    // Ocultar todos los items
    adminMenuItems.forEach(item => item.style.display = 'none');
    userMenuItems.forEach(item => item.style.display = 'none');
    
    // Mostrar según rol
    if (userRole === 'admin') {
      adminMenuItems.forEach(item => item.style.display = '');
    } else if (userRole === 'user') {
      userMenuItems.forEach(item => item.style.display = '');
    }
  }

  // Mostrar menú al cargar la página
  showMenuByRole();

  // =========================================================================
  // TOGGLE MENÚ HAMBURGUESA
  // =========================================================================

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.navbar')) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }
});