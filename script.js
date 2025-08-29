

    let isClickScrolling = false;

    // Highlight nav link on click
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        isClickScrolling = true;
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          const navbarHeight = document.querySelector('.navbar').offsetHeight;
          window.scrollTo({
            top: targetSection.offsetTop - navbarHeight,
            behavior: 'smooth'
          });
          // Reset isClickScrolling after scroll animation completes
          setTimeout(() => {
            isClickScrolling = false;
          }, 1000); // Adjust based on scroll duration
        }
      });
    });

    // Highlight nav link on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
      root: null,
      rootMargin: '-150px 0px -150px 0px', // Increased margin for better detection
      threshold: 0.5 // Trigger when 50% of section is visible
    };

    const observer = new IntersectionObserver((entries) => {
      if (!isClickScrolling) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
              link.classList.remove('active');
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
              }
            });
          }
        });
      }
    }, observerOptions);

    sections.forEach(section => {
      if (section.getAttribute('id')) {
        observer.observe(section);
      }
    });

    // Highlight Home when at the top of the page
    window.addEventListener('scroll', () => {
      if (!isClickScrolling && window.scrollY <= 50) {
        navLinks.forEach(link => link.classList.remove('active'));
        document.querySelector('a[href="#home"]').classList.add('active');
      }
    });

    // Ensure initial highlight on page load
    document.addEventListener('DOMContentLoaded', () => {
      navLinks.forEach(link => link.classList.remove('active'));
      document.querySelector('a[href="#home"]').classList.add('active');
    });
