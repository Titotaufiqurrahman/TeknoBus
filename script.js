 window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        const mobileMenu = document.getElementById('mobileMenu');
        const navLinks = document.getElementById('navLinks');

        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Counter animation
        function animateCounter(element, target, duration = 2000) {
            let start = 0;
            const increment = target / (duration / 16);
            
            function updateCounter() {
                start += increment;
                if (start < target) {
                    element.textContent = Math.floor(start).toLocaleString('id-ID');
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target.toLocaleString('id-ID');
                }
            }
            updateCounter();
        }

        const statsSection = document.querySelector('.stats');
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(document.getElementById('happyCustomers'), 50000);
                    animateCounter(document.getElementById('citiesServed'), 150);
                    animateCounter(document.getElementById('busFleet'), 500);
                    animateCounter(document.getElementById('yearsExperience'), 15);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);

        let currentTestimonial = 1;
        const totalTestimonials = 3;

        function showSlide(n) {
            const testimonials = document.querySelectorAll('.testimonial');
            const dots = document.querySelectorAll('.dot');
            
            if (n > totalTestimonials) currentTestimonial = 1;
            if (n < 1) currentTestimonial = totalTestimonials;
            
            testimonials.forEach(testimonial => {
                testimonial.classList.remove('active');
            });
            
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            testimonials[currentTestimonial - 1].classList.add('active');
            dots[currentTestimonial - 1].classList.add('active');
        }

        function currentSlide(n) {
            currentTestimonial = n;
            showSlide(currentTestimonial);
        }

        function nextSlide() {
            currentTestimonial++;
            showSlide(currentTestimonial);
        }

        setInterval(nextSlide, 5000);

        window.addEventListener('load', function() {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.4s ease-in';
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });

        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.1}px)`;
            }
        });