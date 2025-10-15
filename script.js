document.addEventListener('DOMContentLoaded', () => {
	const themeToggle = document.getElementById('theme-toggle');
	const themeIconLight = document.getElementById('theme-icon-light');
	const themeIconDark = document.getElementById('theme-icon-dark');
	const navToggle = document.querySelector('.nav-toggle');
	const siteNav = document.getElementById('site-nav');
	const yearSpan = document.getElementById('year');

	// --- Theme Toggling ---
	const applyTheme = (theme) => {
		if (theme === 'dark') {
			document.documentElement.classList.add('dark');
			themeIconLight.classList.add('hidden');
			themeIconDark.classList.remove('hidden');
		} else {
			document.documentElement.classList.remove('dark');
			themeIconLight.classList.remove('hidden');
			themeIconDark.classList.add('hidden');
		}
	};

	// Immediately apply theme on initial load
	const savedTheme = localStorage.getItem('theme');
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
	applyTheme(currentTheme);

	themeToggle.addEventListener('click', () => {
		const isDark = document.documentElement.classList.toggle('dark');
		const newTheme = isDark ? 'dark' : 'light';
		localStorage.setItem('theme', newTheme);
		applyTheme(newTheme);
	});

	// --- Mobile Navigation ---
	if (navToggle && siteNav) {
		const iconOpen = navToggle.querySelector('.icon-open');
		const iconClose = navToggle.querySelector('.icon-close');

		navToggle.addEventListener('click', () => {
			const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
			navToggle.setAttribute('aria-expanded', !isExpanded);
			siteNav.classList.toggle('hidden');
			iconOpen.classList.toggle('hidden');
			iconClose.classList.toggle('hidden');
		});

		// Close nav when a link is clicked
		siteNav.addEventListener('click', (e) => {
			if (e.target.tagName === 'A') {
				navToggle.setAttribute('aria-expanded', 'false');
				siteNav.classList.add('hidden');
				iconOpen.classList.remove('hidden');
				iconClose.classList.add('hidden');
			}
		});
	}

	// --- Animate on Scroll ---
	const animatedElements = document.querySelectorAll('[data-animate], [data-stagger-container]');
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('animate-in');
					const staggerChildren = entry.target.querySelectorAll('[data-stagger]');
					staggerChildren.forEach((child, index) => {
						child.style.transitionDelay = `${index * 100}ms`;
						child.classList.add('animate-in');
					});
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.1 }
	);

	animatedElements.forEach((el) => observer.observe(el));

	// --- Hero Blob Parallax ---
	const heroSection = document.getElementById('hero');
	const blob = document.querySelector('.blob');
	if (heroSection && blob) {
		heroSection.addEventListener('mousemove', (e) => {
			const { clientX, clientY } = e;
			const { offsetWidth, offsetHeight } = heroSection;
			const x = (clientX / offsetWidth - 0.5) * 40; // Adjust multiplier for effect strength
			const y = (clientY / offsetHeight - 0.5) * 40;
			blob.style.transition = 'transform 0.1s ease-out';
			blob.style.transform = `translateX(${x}px) translateY(${y}px)`;
		});
	}

	// --- Dynamic Project Loading ---
	const projects = [
		{
			name: 'Malware Detection System',
			description:
				'Developed a detection model using Python, Flask, and a JS front-end. Achieved over 94% accuracy with Logistic Regression and Extra Tree Classifier.',
			link: '#',
			image: 'https://placehold.co/600x400/7c5cff/white?text=Malware+System',
		},
		{
			name: 'Full-Stack Food Delivery Platform',
			description:
				'Built a complete food delivery platform using the MERN stack, featuring authentication, real-time order tracking, and a payment workflow.',
			link: '#',
			image: 'https://placehold.co/600x400/7c5cff/white?text=Food+Delivery',
		},
		{
			name: 'Full-Stack Freelance Platform – Ignite',
			description:
				'Created a freelance marketplace with the MERN stack, including project posting, hiring, task management, and an admin dashboard.',
			link: '#',
			image: 'https://placehold.co/600x400/7c5cff/white?text=Ignite',
		},
	];

	const projectsGrid = document.getElementById('projects-grid');
	if (projectsGrid) {
		projects.forEach(project => {
			const projectWrapper = document.createElement('div');
			projectWrapper.setAttribute('data-stagger', '');

			projectWrapper.innerHTML = `
                <a href="${project.link}" class="project-card group relative block overflow-hidden rounded-lg border border-border bg-panel transition-shadow duration-300 hover:shadow-lg dark:border-dark-border dark:bg-dark-panel" aria-label="View ${project.name}">
                    <img src="${project.image}" alt="${project.name} screenshot" class="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div class="absolute inset-0 flex flex-col items-center justify-center bg-black/70 p-4 text-center text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                        <p class="text-sm">${project.description}</p>
                        <span class="mt-3 inline-block rounded-md bg-accent py-1 px-3 text-sm font-medium">View Project</span>
                    </div>
                </a>
                <h3 class="mt-3 text-lg font-semibold">${project.name}</h3>
            `;
			projectsGrid.appendChild(projectWrapper);
		});
	}

	// --- Footer Year ---
	if (yearSpan) {
		yearSpan.textContent = new Date().getFullYear();
	}
});