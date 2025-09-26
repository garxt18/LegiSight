/**
 * Digital Citizen Engagement Platform - Main JavaScript
 * Handles modal interactions, form validations, and animations
 */

(function() {
    'use strict';

    // DOM Elements
    const citizenBtn = document.querySelector('.btn-citizen');
    const officialBtn = document.querySelector('.official-portal');
    const citizenModal = document.getElementById('citizen-modal');
    const officialModal = document.getElementById('official-modal');
    const modalCloseBtns = document.querySelectorAll('.modal-close');
    const citizenForm = document.getElementById('citizen-form');
    const officialForm = document.getElementById('official-form');
    const aadhaarInputs = document.querySelectorAll('.aadhaar-input');

    // Initialize
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        setupEventListeners();
        setupAnimations();
        setupFormValidation();
        
        // Check if we need to open a modal (coming from draft details)
        const modalToOpen = sessionStorage.getItem('openModal');
        if (modalToOpen) {
            sessionStorage.removeItem('openModal');
            setTimeout(() => {
                if (modalToOpen === 'citizen') {
                    if (citizenModal) openModal(citizenModal);
                } else if (modalToOpen === 'official') {
                    if (officialModal) openModal(officialModal);
                }
            }, 500);
        }
    }

    // Event Listeners
    function setupEventListeners() {
        // Modal triggers
        if (citizenBtn) {
            citizenBtn.addEventListener('click', () => openModal(citizenModal));
        }
        
        if (officialBtn) {
            officialBtn.addEventListener('click', () => openModal(officialModal));
        }

        // Close modals
        modalCloseBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                closeModal(modal);
            });
        });

        // Close modal on background click
        [citizenModal, officialModal].forEach(modal => {
            if (modal) {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        closeModal(modal);
                    }
                });
            }
        });

        // Close modal on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const activeModal = document.querySelector('.modal.active');
                if (activeModal) {
                    closeModal(activeModal);
                }
            }
        });
    }

    // Modal Functions
    function openModal(modal) {
        if (!modal) return;
        
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        // Focus first input
        setTimeout(() => {
            const firstInput = modal.querySelector('input');
            if (firstInput) firstInput.focus();
        }, 100);
    }

    function closeModal(modal) {
        if (!modal) return;
        
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        
        // Clear form errors
        const errorMessages = modal.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.textContent = '');
        
        // Reset forms
        const form = modal.querySelector('form');
        if (form) form.reset();
    }

    // Animations
    function setupAnimations() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
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

        // Observe feature items
        const featureItems = document.querySelectorAll('.feature-item');
        featureItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = `all 0.6s ease ${index * 0.1}s`;
            observer.observe(item);
        });

        // Stats circle entrance animation
        const statsCircle = document.querySelector('.stats-circle');
        if (statsCircle) {
            statsCircle.style.opacity = '0';
            statsCircle.style.transform = 'scale(0.8)';
            statsCircle.style.transition = 'all 1s ease';
            
            setTimeout(() => {
                statsCircle.style.opacity = '1';
                statsCircle.style.transform = 'scale(1)';
            }, 500);
        }

        // Thumbs up pulse animation
        const thumbsUp = document.querySelector('.thumbs-up-container');
        if (thumbsUp) {
            setInterval(() => {
                thumbsUp.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    thumbsUp.style.transform = 'scale(1)';
                }, 200);
            }, 3000);
        }
    }

    // Form Validation
    function setupFormValidation() {
        // New Aadhaar single input formatting
        const aadhaarSingleInput = document.getElementById('aadhaar-single');
        
        if (aadhaarSingleInput) {
            aadhaarSingleInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/g, '');
                
                // Format as XXXX XXXX XXXX
                if (value.length > 0) {
                    value = value.match(/.{1,4}/g).join(' ');
                }
                
                e.target.value = value;
            });
            
            aadhaarSingleInput.addEventListener('keydown', (e) => {
                // Allow backspace, delete, tab, escape, enter
                if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
                    // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                    (e.keyCode === 65 && e.ctrlKey === true) ||
                    (e.keyCode === 67 && e.ctrlKey === true) ||
                    (e.keyCode === 86 && e.ctrlKey === true) ||
                    (e.keyCode === 88 && e.ctrlKey === true)) {
                    return;
                }
                // Ensure that it is a number and stop the keypress
                if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                    e.preventDefault();
                }
            });
        }

        // Citizen form submission with prototype ID
        if (citizenForm) {
            citizenForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Check if this is the new login form with email/password
                const emailInput = document.getElementById('citizen-email');
                const passwordInput = document.getElementById('citizen-password');
                const aadhaarSingleInput = document.getElementById('aadhaar-single');
                const errorMsg = citizenForm.querySelector('.error-message');
                
                if (emailInput && passwordInput) {
                    // New login system with prototype credentials
                    const email = emailInput.value.trim();
                    const password = passwordInput.value;
                    
                    // Check prototype credentials
                    if (email === 'citizen@example.com' && password === 'citizen123') {
                        errorMsg.textContent = '';
                        showSuccessMessage('Login successful! Welcome Citizen User');
                        
                        // Set logged in status in localStorage for persistence
                        const loginData = {
                            isLoggedIn: true,
                            role: 'citizen',
                            email: email,
                            userName: 'Demo Citizen'
                        };
                        localStorage.setItem('userAuth', JSON.stringify(loginData));
                        
                        setTimeout(() => {
                            closeModal(citizenModal);
                            // Check if we should redirect to draft details
                            if (window.location.hash === '#from-draft') {
                                const draftId = localStorage.getItem('returnToDraft');
                                if (draftId) {
                                    localStorage.removeItem('returnToDraft');
                                    window.location.href = `draft-details.html?draft=${draftId}`;
                                } else {
                                    window.location.href = 'draft-details.html';
                                }
                            } else {
                                // Reload to update UI
                                location.reload();
                            }
                        }, 1500);
                    } else {
                        errorMsg.textContent = 'Invalid credentials. Use citizen@example.com / citizen123';
                    }
                } else if (aadhaarSingleInput) {
                    // Legacy Aadhaar system (kept for compatibility)
                    const aadhaarNumber = aadhaarSingleInput.value.replace(/\s/g, '');
                    
                    if (aadhaarNumber.length !== 12) {
                        errorMsg.textContent = 'Please enter a valid 12-digit Aadhaar number';
                        return;
                    }
                    
                    // Success - Demo OTP simulation
                    errorMsg.textContent = '';
                    showSuccessMessage('OTP sent successfully! (Demo Mode)');
                    
                    // Simulate OTP verification
                    setTimeout(() => {
                        showSuccessMessage('Authentication successful!');
                        sessionStorage.setItem('userLoggedIn', 'true');
                        sessionStorage.setItem('userType', 'citizen');
                        sessionStorage.setItem('userName', 'Aadhaar User');
                        
                        setTimeout(() => {
                            closeModal(citizenModal);
                            if (window.location.hash === '#from-draft') {
                                window.location.href = 'draft-details.html';
                            }
                        }, 1500);
                    }, 2000);
                }
            });
        }

        // Official form submission
        if (officialForm) {
            officialForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const officialEmail = document.getElementById('official-email');
                const officialPassword = document.getElementById('official-password');
                const email = officialEmail ? officialEmail.value : '';
                const password = officialPassword ? officialPassword.value : '';
                const errorMsg = officialForm.querySelector('.error-message');
                
                // Validate email format
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!email || !emailRegex.test(email)) {
                    errorMsg.textContent = 'Please enter a valid government email address';
                    return;
                }
                
                // Check prototype credentials first
                if (email === 'official@example.com' && password === 'official123') {
                    // Prototype login successful
                    errorMsg.textContent = '';
                    showSuccessMessage('Login successful! Welcome Official User');
                    
                    // Set logged in status in localStorage for persistence
                    const loginData = {
                        isLoggedIn: true,
                        role: 'official',
                        email: email,
                        userName: 'Demo Official'
                    };
                    localStorage.setItem('userAuth', JSON.stringify(loginData));
                    
                    setTimeout(() => {
                        closeModal(officialModal);
                        // Redirect to dashboard for officials
                        window.location.href = 'dashboard.html';
                    }, 1500);
                    return;
                }
                
                // Check if it's a government domain (for non-prototype emails)
                if (!email.endsWith('.gov') && !email.endsWith('.gov.in') && !email.endsWith('.nic.in') && email !== 'official@example.com') {
                    errorMsg.textContent = 'Use official@example.com / official123 for demo';
                    return;
                }
                
                if (!password || password.length < 8) {
                    errorMsg.textContent = 'Password must be at least 8 characters';
                    return;
                }
                
                // Success - would normally authenticate with backend
                errorMsg.textContent = '';
                showSuccessMessage('Verifying credentials...');
                
                setTimeout(() => {
                    showSuccessMessage('Access granted! Redirecting to official dashboard...');
                    // Set logged in status in session storage
                    sessionStorage.setItem('userLoggedIn', 'true');
                    sessionStorage.setItem('userType', 'official');
                    setTimeout(() => {
                        closeModal(officialModal);
                        // Check if we should redirect to draft details
                        if (window.location.hash === '#from-draft') {
                            window.location.href = 'draft-details.html';
                        }
                    }, 1500);
                }, 2000);
            });
        }
    }

    // Aadhaar validation (basic Verhoeff algorithm check)
    function validateAadhaar(aadhaar) {
        // Basic validation - just check if it's 12 digits
        // In production, would implement full Verhoeff algorithm
        return /^\d{12}$/.test(aadhaar);
    }

    // Success message display
    function showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10B981;
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(successDiv);
            }, 300);
        }, 3000);
    }

    // Add CSS animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Smooth scroll for anchor links
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

    // Header scroll effect
    let lastScroll = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });

    // Legislative Discussion functionality
    const participateBtn = document.querySelector('.btn-participate');
    const levelDropdown = document.getElementById('discussion-level');
    
    if (participateBtn) {
        participateBtn.addEventListener('click', () => {
            // Open citizen modal for participation
            const citizenModal = document.getElementById('citizen-modal');
            if (citizenModal) {
                s(citizenModal);
            }
        });
    }
    
    if (levelDropdown) {
        levelDropdown.addEventListener('change', (e) => {
            console.log('Discussion level changed to:', e.target.value);
            // In production, this would filter discussions by level
        });
    }
    
    // Legislation Cards functionality
    const levelFilter = document.getElementById('level-filter');
    const stateFilter = document.getElementById('state-filter');
    const legislationCards = document.querySelectorAll('.legislation-card');
    const resultsCount = document.querySelector('.results-count');
    const cardCTAs = document.querySelectorAll('.card-cta');
    
    // Add draft IDs to cards based on their order
    const draftIds = ['renewable-energy', 'education-modernization', 'urban-housing', 
                      'agricultural-reform', 'healthcare-reform', 'digital-privacy-act'];
    
    // Make legislation cards clickable to navigate to draft details
    legislationCards.forEach((card, index) => {
        // Add draft ID as data attribute
        if (draftIds[index]) {
            card.dataset.draftId = draftIds[index];
        }
        
        // Make the entire card clickable except for the CTA link
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', (e) => {
            // Don't navigate if clicking on the CTA link
            if (!e.target.closest('.card-cta')) {
                const draftId = card.dataset.draftId || 'digital-privacy-act';
                // Navigate to draft details page with draft ID as parameter
                window.location.href = `draft-details.html?draft=${draftId}`;
            }
        });
    });
    
    function filterCards() {
        const levelValue = levelFilter ? levelFilter.value : 'all';
        const stateValue = stateFilter ? stateFilter.value : 'all';
        let visibleCount = 0;
        
        legislationCards.forEach(card => {
            const cardLevel = card.dataset.level;
            const cardState = card.dataset.state;
            
            const levelMatch = levelValue === 'all' || cardLevel === levelValue;
            const stateMatch = stateValue === 'all' || cardState === stateValue || (stateValue === 'all' && cardLevel === 'national');
            
            if (levelMatch && stateMatch) {
                card.style.display = 'flex';
                visibleCount++;
                // Add stagger animation
                setTimeout(() => {
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                }, visibleCount * 50);
            } else {
                card.style.display = 'none';
            }
        });
        
        // Update results count
        if (resultsCount) {
            resultsCount.textContent = `Showing ${visibleCount} legislation${visibleCount !== 1 ? 's' : ''}`;
        }
    }
    
    // Add event listeners for filters
    if (levelFilter) {
        levelFilter.addEventListener('change', filterCards);
    }
    
    if (stateFilter) {
        stateFilter.addEventListener('change', filterCards);
    }
    
    // Add click handlers for CTA links
    cardCTAs.forEach(cta => {
        cta.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); // Prevent card click event
            // Open citizen modal for viewing legislation
            const citizenModal = document.getElementById('citizen-modal');
            if (citizenModal) {
                openModal(citizenModal);
            }
        });
    });
    
    // Add entrance animation for cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                cardObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe legislation cards
    legislationCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
        cardObserver.observe(card);
    });
    
    // Add CSS animation
    if (!document.getElementById('card-animations')) {
        const animationStyle = document.createElement('style');
        animationStyle.id = 'card-animations';
        animationStyle.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(animationStyle);
    }

})();