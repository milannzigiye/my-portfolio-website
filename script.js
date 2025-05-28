// Interactive elements and animations
document.addEventListener('DOMContentLoaded', function() {
    // Create robotics animation container
    createRoboticsAnimations();
    
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(function() {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });
    
    document.addEventListener('mousedown', function() {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursorFollower.style.width = '40px';
        cursorFollower.style.height = '40px';
    });
    
    document.addEventListener('mouseup', function() {
        cursor.style.width = '10px';
        cursor.style.height = '10px';
        cursorFollower.style.width = '30px';
        cursorFollower.style.height = '30px';
    });
    
    // Links and buttons hover effect
    const links = document.querySelectorAll('a, button, .btn');
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            cursor.style.width = '0px';
            cursor.style.height = '0px';
            cursorFollower.style.width = '50px';
            cursorFollower.style.height = '50px';
            cursorFollower.style.borderColor = 'var(--accent-color)';
        });
        
        link.addEventListener('mouseleave', function() {
            cursor.style.width = '10px';
            cursor.style.height = '10px';
            cursorFollower.style.width = '30px';
            cursorFollower.style.height = '30px';
            cursorFollower.style.borderColor = 'var(--secondary-color)';
        });
    });
    
    // Dark mode toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Animate stats counter
    const stats = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const count = +stat.innerText;
            const increment = target / 30;
            
            if (count < target) {
                stat.innerText = Math.ceil(count + increment);
                setTimeout(animateStats, 50);
            } else {
                stat.innerText = target;
            }
        });
    }
    
    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress') + '%';
            bar.style.width = progress;
        });
    }
    
    // Animate language circles
    const languageCircles = document.querySelectorAll('.circle-progress svg circle:nth-child(2)');
    
    function animateLanguageCircles() {
        languageCircles.forEach(circle => {
            const progress = circle.parentElement.parentElement.getAttribute('data-progress');
            const dashoffset = 410 - (410 * progress / 100);
            circle.style.strokeDashoffset = dashoffset;
        });
    }
    
    // Projects filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else if (card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Form submission with email functionality
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simulate form submission with actual email functionality
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;
            
            // Create a mailto link that opens the user's email client
            const mailtoLink = `mailto:milannzigiye@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Contact: ' + name)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message)}`;
            
            // Open the mailto link in a new window
            window.open(mailtoLink, '_blank');
            
            // Show success message
            setTimeout(function() {
                submitBtn.innerText = 'Message Sent!';
                contactForm.reset();
                
                setTimeout(function() {
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            }, 1000);
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('about-stats')) {
                    animateStats();
                } else if (entry.target.classList.contains('skills-categories')) {
                    animateSkillBars();
                } else if (entry.target.classList.contains('language-circles')) {
                    animateLanguageCircles();
                } else if (entry.target.classList.contains('timeline-item')) {
                    entry.target.classList.add('animate');
                } else if (entry.target.classList.contains('project-card')) {
                    entry.target.classList.add('animate');
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.about-stats, .skills-categories, .language-circles, .timeline-item, .project-card').forEach(el => {
        observer.observe(el);
    });
    
    // Initialize project images with random gradients
    const projectImgs = document.querySelectorAll('.project-img');
    
    projectImgs.forEach(img => {
        const colors = [
            'rgba(26, 54, 93, 0.8)',
            'rgba(42, 157, 143, 0.8)',
            'rgba(233, 196, 106, 0.8)',
            'rgba(244, 162, 97, 0.8)',
            'rgba(231, 111, 81, 0.8)'
        ];
        
        const color1 = colors[Math.floor(Math.random() * colors.length)];
        const color2 = colors[Math.floor(Math.random() * colors.length)];
        
        img.style.background = `linear-gradient(135deg, ${color1}, ${color2})`;
    });
    
    // Typing effect for hero text
    const heroText = document.querySelector('.hero-text p');
    const text = heroText.innerText;
    heroText.innerText = '';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            heroText.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Start animations
    setTimeout(function() {
        typeWriter();
    }, 1000);
});

// Create robotics animations
function createRoboticsAnimations() {
    // Create animation container if it doesn't exist
    if (!document.querySelector('.robotics-animation-container')) {
        const animationContainer = document.createElement('div');
        animationContainer.className = 'robotics-animation-container';
        document.body.appendChild(animationContainer);
        
        // Create robot arm
        createRobotArm(animationContainer);
        
        // Create drones
        createDrones(animationContainer);
        
        // Create floating gears
        createFloatingGears(animationContainer);
        
        // Create circuit lines
        createCircuitLines(animationContainer);
        
        // Create data particles
        createDataParticles(animationContainer);
    }
}

// Create robot arm
function createRobotArm(container) {
    const robotArm = document.createElement('div');
    robotArm.className = 'robot-arm';
    container.appendChild(robotArm);
    
    // Robot joints
    for (let i = 0; i < 3; i++) {
        const joint = document.createElement('div');
        joint.className = 'robot-joint';
        robotArm.appendChild(joint);
    }
    
    // Robot claw
    const robotClaw = document.createElement('div');
    robotClaw.className = 'robot-claw';
    robotArm.appendChild(robotClaw);
    
    // Claw parts
    const leftClaw = document.createElement('div');
    leftClaw.className = 'claw-part left-claw';
    robotClaw.appendChild(leftClaw);
    
    const rightClaw = document.createElement('div');
    rightClaw.className = 'claw-part right-claw';
    robotClaw.appendChild(rightClaw);
}

// Create drones
function createDrones(container) {
    for (let i = 0; i < 3; i++) {
        const drone = document.createElement('div');
        drone.className = 'drone';
        drone.style.animationDelay = `${i * 2}s`;
        
        // Drone body
        const droneBody = document.createElement('div');
        droneBody.className = 'drone-body';
        drone.appendChild(droneBody);
        
        // Drone propellers
        for (let j = 0; j < 4; j++) {
            const propeller = document.createElement('div');
            propeller.className = 'drone-propeller';
            drone.appendChild(propeller);
        }
        
        container.appendChild(drone);
    }
}

// Create floating gears
function createFloatingGears(container) {
    // Reduce number of gears from 8 to 4
    for (let i = 0; i < 4; i++) {
        const gear = document.createElement('div');
        gear.className = 'floating-gear';
        
        // Randomize gear properties
        const size = 20 + Math.random() * 30;
        gear.style.width = `${size}px`;
        gear.style.height = `${size}px`;
        
        gear.style.left = `${Math.random() * 90}%`;
        gear.style.top = `${Math.random() * 90}%`;
        
        // Create gear teeth
        const teethCount = 6 + Math.floor(size / 10);
        for (let j = 0; j < teethCount; j++) {
            const tooth = document.createElement('div');
            tooth.className = 'gear-tooth';
            tooth.style.transform = `rotate(${j * (360 / teethCount)}deg)`;
            gear.appendChild(tooth);
        }
        
        // Create gear center
        const gearCenter = document.createElement('div');
        gearCenter.className = 'gear-center';
        gear.appendChild(gearCenter);
        
        container.appendChild(gear);
    }
}

// Create circuit lines
function createCircuitLines(container) {
    const circuitContainer = document.createElement('div');
    circuitContainer.className = 'circuit-container';
    container.appendChild(circuitContainer);
    
    // Reduce number of circuit lines from 10 to 5
    for (let i = 0; i < 5; i++) {
        // Horizontal lines
        const hLine = document.createElement('div');
        hLine.className = 'circuit-line horizontal';
        hLine.style.top = `${15 + i * 15}%`;
        hLine.style.width = `${20 + Math.random() * 30}%`;
        hLine.style.left = `${Math.random() * 40}%`;
        circuitContainer.appendChild(hLine);
        
        // Vertical lines
        const vLine = document.createElement('div');
        vLine.className = 'circuit-line vertical';
        vLine.style.left = `${15 + i * 15}%`;
        vLine.style.height = `${20 + Math.random() * 30}%`;
        vLine.style.top = `${Math.random() * 40}%`;
        circuitContainer.appendChild(vLine);
        
        // Create nodes at intersections
        const node = document.createElement('div');
        node.className = 'circuit-node';
        node.style.left = `${parseInt(hLine.style.left) + Math.random() * parseInt(hLine.style.width)}%`;
        node.style.top = `${parseInt(hLine.style.top)}%`;
        circuitContainer.appendChild(node);
    }
}

// Create data particles
function createDataParticles(container) {
    // Reduce number of particles from 20 to 10
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'data-particle';
        
        // Randomize particle properties
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        container.appendChild(particle);
    }
}
