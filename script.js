// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');

    mobileToggle.addEventListener('click', function() {
        navLinks.classList.toggle('nav-open');
        navActions.classList.toggle('nav-open');
        
        // Toggle animation for hamburger icon
        const spans = mobileToggle.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
        
        if (navLinks.classList.contains('nav-open')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Course filter tabs
    const filterTabs = document.querySelectorAll('.filter-tab');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Filter courses logic would go here
            // For a real implementation, you would filter the courses based on category
            const category = this.textContent.toLowerCase();
            filterCourses(category);
        });
    });

    function filterCourses(category) {
        const courseCards = document.querySelectorAll('.course-card');
        
        courseCards.forEach(card => {
            const courseCategory = card.querySelector('.course-category').textContent.toLowerCase();
            
            if (category === 'all' || courseCategory === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    // Testimonial slider
    const testimonialContainer = document.getElementById('testimonialContainer');
    const prevArrow = document.getElementById('prevArrow');
    const nextArrow = document.getElementById('nextArrow');
    
    let scrollAmount = 0;
    const cardWidth = document.querySelector('.testimonial-card').offsetWidth + 32; // Card width + margin
    
    prevArrow.addEventListener('click', function() {
        scrollAmount = Math.max(scrollAmount - cardWidth, 0);
        testimonialContainer.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    nextArrow.addEventListener('click', function() {
        scrollAmount = Math.min(scrollAmount + cardWidth, testimonialContainer.scrollWidth - testimonialContainer.clientWidth);
        testimonialContainer.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .course-card, .section-header, .hero-content, .hero-img, .cta');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 30) {
                element.classList.add('fade-in');
            }
        });
    };
    
    // Initial check on page load
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = this.value.toLowerCase();
            searchCourses(searchTerm);
        }
    });
    
    function searchCourses(term) {
        const courseCards = document.querySelectorAll('.course-card');
        let foundCourses = false;
        
        courseCards.forEach(card => {
            const courseTitle = card.querySelector('.course-title').textContent.toLowerCase();
            const courseCategory = card.querySelector('.course-category').textContent.toLowerCase();
            
            if (courseTitle.includes(term) || courseCategory.includes(term)) {
                card.style.display = 'block';
                card.classList.add('highlighted');
                setTimeout(() => {
                    card.classList.remove('highlighted');
                }, 2000);
                foundCourses = true;
            } else {
                card.style.display = 'none';
            }
        });
        
        if (!foundCourses) {
            // Could show a "no results found" message here
            alert('No courses found matching: ' + term);
            
            // Reset to show all courses
            courseCards.forEach(card => {
                card.style.display = 'block';
            });
        }
    }

    // Course enrollment handling
    const enrollButtons = document.querySelectorAll('.course-btn');
    
    enrollButtons.forEach(button => {
        button.addEventListener('click', function() {
            const courseCard = this.closest('.course-card');
            const courseTitle = courseCard.querySelector('.course-title').textContent;
            const coursePrice = courseCard.querySelector('.course-price').textContent;
            
            // Show enrollment confirmation or redirect to enrollment page
            // This is a simple alert for demo purposes
            alert(`You are about to enroll in "${courseTitle}" for ${coursePrice}`);
            
            // In a real app, this would redirect to a checkout page or add to cart
            this.textContent = 'Enrolling...';
            this.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                this.textContent = 'Enrolled';
                this.style.backgroundColor = 'var(--success)';
                this.style.color = 'white';
            }, 1500);
        });
    });

    // Sticky header on scroll
    const header = document.querySelector('header');
    let lastScrollPosition = 0;
    
    window.addEventListener('scroll', function() {
        const currentScrollPosition = window.pageYOffset;
        
        if (currentScrollPosition > 100) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        // Hide header when scrolling down, show when scrolling up
        if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollPosition = currentScrollPosition;
    });

    // Add smooth scrolling for navigation links
    const navItems = document.querySelectorAll('nav a');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#') && targetId !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                const headerHeight = header.offsetHeight;
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile nav if open
                    if (navLinks.classList.contains('nav-open')) {
                        mobileToggle.click();
                    }
                }
            }
        });
    });

    // Course progress tracking (for enrolled courses)
    // This would be part of a user dashboard in a real app
    function initProgressTracking() {
        // Simulated enrolled courses data
        const enrolledCourses = [
            { id: 1, title: 'Web Development Bootcamp', progress: 45, totalLessons: 120 },
            { id: 2, title: 'UI/UX Design Masterclass', progress: 75, totalLessons: 85 }
        ];
        
        // This would update progress bars in a user dashboard
        // Code commented out since we don't have a dashboard in this demo
        /*
        enrolledCourses.forEach(course => {
            const progressEl = document.querySelector(`#course-${course.id} .progress-bar`);
            if (progressEl) {
                progressEl.style.width = `${course.progress}%`;
                document.querySelector(`#course-${course.id} .progress-text`).textContent = 
                    `${course.progress}% Complete (${Math.round((course.progress/100) * course.totalLessons)}/${course.totalLessons} lessons)`;
            }
        });
        */
    }

    // Create a simple notification system
    function createNotificationSystem() {
        const notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        notificationContainer.style.position = 'fixed';
        notificationContainer.style.bottom = '20px';
        notificationContainer.style.right = '20px';
        notificationContainer.style.zIndex = '1000';
        document.body.appendChild(notificationContainer);
        
        // Function to show notifications
        window.showNotification = function(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.innerHTML = `<p>${message}</p><span class="close-notification">×</span>`;
            
            // Style the notification
            notification.style.backgroundColor = 'white';
            notification.style.color = type === 'error' ? '#e74c3c' : type === 'success' ? '#2ecc71' : '#3498db';
            notification.style.padding = '15px 20px';
            notification.style.borderRadius = '5px';
            notification.style.marginBottom = '10px';
            notification.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            notification.style.display = 'flex';
            notification.style.justifyContent = 'space-between';
            notification.style.alignItems = 'center';
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            notification.style.transition = 'opacity 0.3s, transform 0.3s';
            
            // Add close button style
            const closeBtn = notification.querySelector('.close-notification');
            closeBtn.style.cursor = 'pointer';
            closeBtn.style.fontSize = '20px';
            closeBtn.style.marginLeft = '10px';
            
            // Add to container
            notificationContainer.appendChild(notification);
            
            // Animate in
            setTimeout(() => {
                notification.style.opacity = '1';
                notification.style.transform = 'translateY(0)';
            }, 10);
            
            // Auto remove after 5 seconds
            const timeout = setTimeout(() => {
                closeNotification(notification);
            }, 5000);
            
            // Close button functionality
            closeBtn.addEventListener('click', () => {
                clearTimeout(timeout);
                closeNotification(notification);
            });
        };
        
        function closeNotification(notification) {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }
    
    // Initialize notification system
    createNotificationSystem();
    
    // Example notification - comment out in production
    // setTimeout(() => {
    //     window.showNotification('Welcome to EduFlow! Explore our courses.', 'info');
    // }, 2000);
    
    // Advanced search filters toggle (for a more complex site)
    const createAdvancedFilters = function() {
        const searchBox = document.querySelector('.search-box');
        
        // Create advanced filter button
        const advancedFilterBtn = document.createElement('button');
        advancedFilterBtn.className = 'advanced-filter-btn';
        advancedFilterBtn.textContent = 'Filters';
        advancedFilterBtn.style.fontSize = '0.8rem';
        advancedFilterBtn.style.padding = '0.3rem 0.8rem';
        advancedFilterBtn.style.borderRadius = '50px';
        advancedFilterBtn.style.border = '1px solid #e0e0e0';
        advancedFilterBtn.style.backgroundColor = 'white';
        advancedFilterBtn.style.cursor = 'pointer';
        advancedFilterBtn.style.marginLeft = '10px';
        
        // Add it after the search box
        searchBox.parentNode.insertBefore(advancedFilterBtn, searchBox.nextSibling);
        
        // Advanced filter panel
        const filterPanel = document.createElement('div');
        filterPanel.className = 'advanced-filter-panel';
        filterPanel.style.position = 'absolute';
        filterPanel.style.top = '100%';
        filterPanel.style.right = '0';
        filterPanel.style.backgroundColor = 'white';
        filterPanel.style.padding = '1.5rem';
        filterPanel.style.borderRadius = '8px';
        filterPanel.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        filterPanel.style.width = '300px';
        filterPanel.style.display = 'none';
        filterPanel.style.zIndex = '100';
        
        // Add filter options (simplified example)
        filterPanel.innerHTML = `
            <h4 style="margin-bottom: 15px; font-size: 1rem;">Filter Courses</h4>
            <div>
                <label style="display: block; margin-bottom: 8px; font-size: 0.9rem;">Price Range</label>
                <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                    <select style="flex: 1; padding: 8px; border-radius: 4px; border: 1px solid #e0e0e0;">
                        <option>Any Price</option>
                        <option>Free</option>
                        <option>Under $50</option>
                        <option>$50 - $100</option>
                        <option>$100+</option>
                    </select>
                </div>
            </div>
            <div>
                <label style="display: block; margin-bottom: 8px; font-size: 0.9rem;">Rating</label>
                <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                    <select style="flex: 1; padding: 8px; border-radius: 4px; border: 1px solid #e0e0e0;">
                        <option>Any Rating</option>
                        <option>4.5 & Up</option>
                        <option>4.0 & Up</option>
                        <option>3.5 & Up</option>
                    </select>
                </div>
            </div>
            <div>
                <label style="display: block; margin-bottom: 8px; font-size: 0.9rem;">Duration</label>
                <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                    <select style="flex: 1; padding: 8px; border-radius: 4px; border: 1px solid #e0e0e0;">
                        <option>Any Duration</option>
                        <option>Short (0-3 hours)</option>
                        <option>Medium (3-10 hours)</option>
                        <option>Long (10+ hours)</option>
                    </select>
                </div>
            </div>
            <button style="width: 100%; padding: 10px; border-radius: 4px; border: none; background-color: var(--primary); color: white; cursor: pointer; font-weight: 600;">Apply Filters</button>
        `;
        
        // Add to DOM
        document.body.appendChild(filterPanel);
        
        // Toggle filter panel
        advancedFilterBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const btnRect = advancedFilterBtn.getBoundingClientRect();
            filterPanel.style.top = (btnRect.bottom + window.scrollY + 10) + 'px';
            filterPanel.style.right = (window.innerWidth - btnRect.right - window.scrollX) + 'px';
            
            if (filterPanel.style.display === 'none') {
                filterPanel.style.display = 'block';
                setTimeout(() => {
                    filterPanel.style.opacity = '1';
                    filterPanel.style.transform = 'translateY(0)';
                }, 10);
            } else {
                filterPanel.style.opacity = '0';
                filterPanel.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    filterPanel.style.display = 'none';
                }, 300);
            }
        });
        
        // Close filter panel when clicking outside
        document.addEventListener('click', function(e) {
            if (filterPanel.style.display === 'block' && !filterPanel.contains(e.target) && e.target !== advancedFilterBtn) {
                filterPanel.style.opacity = '0';
                filterPanel.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    filterPanel.style.display = 'none';
                }, 300);
            }
        });
    };
    
    // Uncomment to enable advanced filters
    // createAdvancedFilters();
    
    // Initialize any additional features
    // initProgressTracking();
});
