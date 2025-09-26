// Draft Details Page JavaScript

// Load draft data
const script = document.createElement('script');
script.src = 'js/draft-data.js';
document.head.appendChild(script);

// Get draft ID from URL
function getDraftIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('draft') || 'digital-privacy-act';
}

// Current draft data
let currentDraft = null;

// Sample comments data for testing
const sampleComments = [
    {
        id: 1,
        author: 'Sarah Johnson',
        date: '1/18/2025',
        sentiment: 'positive',
        text: 'This legislation is crucial for protecting our digital rights. The proposed measures strike a good balance between privacy protection and innovation.',
        likes: 12
    },
    {
        id: 2,
        author: 'Mike Chen',
        date: '1/17/2025',
        sentiment: 'neutral',
        text: 'While I support the goals, I\'m concerned about the implementation timeline. Six months may not be enough for smaller companies to comply.',
        likes: 8
    },
    {
        id: 3,
        author: 'Emily Rodriguez',
        date: '1/16/2025',
        sentiment: 'positive',
        text: 'Excellent initiative! This will finally give consumers the control they deserve over their personal data.',
        likes: 15
    },
    {
        id: 4,
        author: 'David Thompson',
        date: '1/16/2025',
        sentiment: 'negative',
        text: 'The compliance costs seem excessive for small businesses. We need more support and resources for implementation.',
        likes: 6
    },
    {
        id: 5,
        author: 'Lisa Anderson',
        date: '1/15/2025',
        sentiment: 'positive',
        text: 'As a parent, I\'m particularly pleased with the enhanced protections for children\'s data. This is a step in the right direction.',
        likes: 20
    },
    {
        id: 6,
        author: 'Robert Kumar',
        date: '1/15/2025',
        sentiment: 'neutral',
        text: 'The cross-border data transfer provisions need more clarity. How will this align with international standards?',
        likes: 9
    }
];

// Topic keywords with counts and sentiments
const topicKeywords = [
    { text: 'data', count: 82, sentiment: 'positive' },
    { text: 'privacy', count: 65, sentiment: 'positive' },
    { text: 'protection', count: 38, sentiment: 'positive' },
    { text: 'rights', count: 33, sentiment: 'positive' },
    { text: 'support', count: 31, sentiment: 'positive' },
    { text: 'consumer', count: 28, sentiment: 'positive' },
    { text: 'technology', count: 26, sentiment: 'neutral' },
    { text: 'security', count: 23, sentiment: 'neutral' },
    { text: 'companies', count: 22, sentiment: 'neutral' },
    { text: 'control', count: 19, sentiment: 'positive' },
    { text: 'innovation', count: 18, sentiment: 'neutral' },
    { text: 'regulation', count: 17, sentiment: 'neutral' },
    { text: 'compliance', count: 16, sentiment: 'negative' },
    { text: 'implementation', count: 14, sentiment: 'negative' },
    { text: 'timeline', count: 12, sentiment: 'negative' }
];

// Check if user is logged in and user type
function isUserLoggedIn() {
    const userAuth = localStorage.getItem('userAuth');
    if (userAuth) {
        try {
            const userData = JSON.parse(userAuth);
            return userData.isLoggedIn === true;
        } catch (e) {
            return false;
        }
    }
    return false;
}

function getUserType() {
    const userAuth = localStorage.getItem('userAuth');
    if (userAuth) {
        try {
            const userData = JSON.parse(userAuth);
            return userData.role || null;
        } catch (e) {
            return null;
        }
    }
    return null;
}

function getUserName() {
    const userAuth = localStorage.getItem('userAuth');
    if (userAuth) {
        try {
            const userData = JSON.parse(userAuth);
            return userData.userName || 'User';
        } catch (e) {
            return 'User';
        }
    }
    return 'User';
}

// Initialize navbar hover functionality
function initNavbarHover() {
    const navbar = document.getElementById('navbar');
    const navbarTrigger = document.getElementById('navbar-trigger');
    let hideTimeout;

    // Show navbar when hovering over trigger area
    navbarTrigger.addEventListener('mouseenter', () => {
        clearTimeout(hideTimeout);
        navbar.classList.remove('navbar-hidden');
        navbar.classList.add('navbar-visible');
    });

    // Keep navbar visible when hovering over it
    navbar.addEventListener('mouseenter', () => {
        clearTimeout(hideTimeout);
    });

    // Hide navbar when mouse leaves
    navbar.addEventListener('mouseleave', () => {
        hideTimeout = setTimeout(() => {
            navbar.classList.remove('navbar-visible');
            navbar.classList.add('navbar-hidden');
        }, 300);
    });

    navbarTrigger.addEventListener('mouseleave', () => {
        hideTimeout = setTimeout(() => {
            navbar.classList.remove('navbar-visible');
            navbar.classList.add('navbar-hidden');
        }, 300);
    });
}

// Toggle Read More functionality
function toggleReadMore() {
    const content = document.getElementById('details-content');
    const button = document.getElementById('read-more-btn');
    
    content.classList.toggle('expanded');
    button.classList.toggle('expanded');
    
    if (content.classList.contains('expanded')) {
        button.innerHTML = `
            Read Less
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
        `;
    } else {
        button.innerHTML = `
            Read More
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
        `;
        // Scroll to top of details section
        document.querySelector('.legislation-details').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Generate topic pills
function generateTopics() {
    const container = document.getElementById('topics-container');
    container.innerHTML = '';
    
    topicKeywords.forEach(topic => {
        const pill = document.createElement('div');
        pill.className = `topic-pill ${topic.sentiment}`;
        pill.innerHTML = `
            ${topic.text}
            <span class="topic-count">(${topic.count})</span>
        `;
        container.appendChild(pill);
    });
    
    // Update topics count
    document.getElementById('topics-count').textContent = `${topicKeywords.length} topics identified`;
}

// Initialize discussion section
function initDiscussionSection() {
    const discussionCard = document.getElementById('discussion-card');
    const userType = getUserType();
    const userName = getUserName();
    
    if (isUserLoggedIn() && userType === 'citizen') {
        // Only citizens can comment
        discussionCard.innerHTML = `
            <form class="comment-form" onsubmit="submitComment(event)">
                <div class="user-info">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span>Commenting as <strong>${userName}</strong></span>
                </div>
                <h3>Share Your Thoughts</h3>
                <textarea 
                    class="comment-textarea" 
                    placeholder="Share your feedback on this legislation..."
                    required
                ></textarea>
                <button type="submit" class="submit-comment">Submit Comment</button>
            </form>
        `;
    } else if (isUserLoggedIn() && userType === 'official') {
        // Officials can't comment
        discussionCard.innerHTML = `
            <div class="permission-prompt">
                <svg class="warning-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
                <h3>Commenting Restricted</h3>
                <p>Officials can view public feedback but cannot participate in discussions to maintain neutrality.</p>
                <div class="info-note">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                    <span>You are logged in as an official. Switch to a citizen account to participate.</span>
                </div>
            </div>
        `;
    } else {
        // Show login prompt for non-logged-in users
        discussionCard.innerHTML = `
            <div class="login-prompt">
                <svg class="login-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                <h3>Login to Comment</h3>
                <p>Join the discussion and share your thoughts on this legislation.</p>
                <button class="btn-login" onclick="openCitizenModal()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"></path>
                        <polyline points="10 17 15 12 10 7"></polyline>
                        <line x1="15" y1="12" x2="3" y2="12"></line>
                    </svg>
                    Login to Participate
                </button>
            </div>
        `;
    }
}

// Load comments
function loadComments() {
    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = '';
    
    sampleComments.forEach(comment => {
        const commentCard = createCommentCard(comment);
        commentsList.appendChild(commentCard);
    });
    
    // Update comment count
    document.getElementById('comment-count').textContent = `${sampleComments.length} comments`;
    document.getElementById('comments-number').textContent = sampleComments.length;
}

// Create comment card element
function createCommentCard(comment) {
    const card = document.createElement('div');
    card.className = 'comment-card';
    
    const sentimentIcon = comment.sentiment === 'positive' ? '👍' : 
                          comment.sentiment === 'negative' ? '👎' : '💬';
    
    card.innerHTML = `
        <div class="comment-header">
            <div class="comment-sentiment ${comment.sentiment}">
                ${sentimentIcon}
            </div>
            <div class="comment-info">
                <div class="comment-author">${comment.author}</div>
                <div class="comment-date">${comment.date}</div>
            </div>
        </div>
        <div class="comment-text">${comment.text}</div>
        <div class="comment-actions">
            <button class="like-button" onclick="toggleLike(this, ${comment.id})">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"></path>
                </svg>
                <span class="like-count">${comment.likes}</span>
            </button>
        </div>
    `;
    
    return card;
}

// Toggle like on comment
function toggleLike(button, commentId) {
    button.classList.toggle('liked');
    const likeCount = button.querySelector('.like-count');
    const currentCount = parseInt(likeCount.textContent);
    
    if (button.classList.contains('liked')) {
        likeCount.textContent = currentCount + 1;
    } else {
        likeCount.textContent = currentCount - 1;
    }
}

// Submit comment (mock function)
function submitComment(event) {
    event.preventDefault();
    
    const textarea = event.target.querySelector('.comment-textarea');
    const text = textarea.value.trim();
    
    if (text) {
        // Create new comment object
        const newComment = {
            id: sampleComments.length + 1,
            author: 'Current User',
            date: new Date().toLocaleDateString(),
            sentiment: analyzeSentiment(text),
            text: text,
            likes: 0
        };
        
        // Add to comments array
        sampleComments.unshift(newComment);
        
        // Reload comments
        loadComments();
        
        // Clear textarea
        textarea.value = '';
        
        // Update topics based on new comment
        updateTopics(text);
        
        // Show success message
        showNotification('Comment submitted successfully!');
    }
}

// Simple sentiment analysis (mock)
function analyzeSentiment(text) {
    const positiveWords = ['good', 'great', 'excellent', 'support', 'agree', 'important', 'crucial'];
    const negativeWords = ['bad', 'concern', 'worry', 'oppose', 'against', 'problem', 'issue'];
    
    const lowerText = text.toLowerCase();
    let positiveCount = 0;
    let negativeCount = 0;
    
    positiveWords.forEach(word => {
        if (lowerText.includes(word)) positiveCount++;
    });
    
    negativeWords.forEach(word => {
        if (lowerText.includes(word)) negativeCount++;
    });
    
    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
}

// Update topics based on comment keywords
function updateTopics(commentText) {
    // Extract words from comment
    const words = commentText.toLowerCase().match(/\b\w+\b/g);
    
    if (words) {
        words.forEach(word => {
            const existingTopic = topicKeywords.find(t => t.text === word);
            if (existingTopic) {
                existingTopic.count++;
            }
        });
        
        // Regenerate topics display
        generateTopics();
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10B981;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 500;
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Modal functions (integrate with main site modals)
function openCitizenModal() {
    // Redirect to main page to open the citizen login modal
    // Add a hash to indicate we came from draft details
    window.location.href = 'index.html#from-draft';
    // Store that we need to open citizen modal
    sessionStorage.setItem('openModal', 'citizen');
}

function openOfficialModal() {
    // Redirect to main page to open the official login modal
    // Add a hash to indicate we came from draft details
    window.location.href = 'index.html#from-draft';
    // Store that we need to open official modal
    sessionStorage.setItem('openModal', 'official');
}

// Update sentiment percentages based on comments
function updateSentimentBreakdown() {
    const total = sampleComments.length;
    const positive = sampleComments.filter(c => c.sentiment === 'positive').length;
    const negative = sampleComments.filter(c => c.sentiment === 'negative').length;
    const neutral = total - positive - negative;
    
    document.getElementById('positive-percent').textContent = Math.round((positive / total) * 100) + '%';
    document.getElementById('negative-percent').textContent = Math.round((negative / total) * 100) + '%';
    document.getElementById('neutral-percent').textContent = Math.round((neutral / total) * 100) + '%';
}

// Load draft data and update page
function loadDraftData() {
    const draftId = getDraftIdFromUrl();
    
    // Wait for draft data to be loaded
    setTimeout(() => {
        if (typeof getDraftById === 'function') {
            currentDraft = getDraftById(draftId);
            
            if (currentDraft) {
                // Update page title
                document.title = `${currentDraft.title} - Draft Details | Public Voice`;
                
                // Update draft header
                const titleElement = document.querySelector('.draft-title');
                if (titleElement) titleElement.textContent = currentDraft.title;
                
                const descElement = document.querySelector('.draft-description');
                if (descElement) descElement.textContent = currentDraft.description;
                
                // Update badges
                const badgeReview = document.querySelector('.badge-review');
                const badgeNational = document.querySelector('.badge-national');
                if (badgeReview) badgeReview.textContent = currentDraft.status.toUpperCase();
                if (badgeNational) {
                    if (currentDraft.level === 'state' && currentDraft.state) {
                        badgeNational.textContent = currentDraft.state.toUpperCase();
                        badgeNational.className = 'badge badge-state';
                    } else {
                        badgeNational.textContent = 'NATIONAL';
                    }
                }
                
                // Update metadata
                const metaItems = document.querySelectorAll('.meta-item span');
                if (metaItems[0]) metaItems[0].textContent = currentDraft.department;
                if (metaItems[1]) metaItems[1].textContent = currentDraft.date;
                if (metaItems[2]) metaItems[2].textContent = `${currentDraft.initialComments} comments`;
                
                // Update tags
                const tagsContainer = document.querySelector('.draft-tags');
                if (tagsContainer) {
                    tagsContainer.innerHTML = currentDraft.tags.map(tag => 
                        `<span class="tag">${tag}</span>`
                    ).join('');
                }
                
                // Update legislation content
                const detailsContent = document.getElementById('details-content');
                if (detailsContent && currentDraft.fullContent) {
                    detailsContent.innerHTML = currentDraft.fullContent;
                }
                
                // Update sentiment breakdown
                if (currentDraft.sentimentBreakdown) {
                    document.getElementById('positive-percent').textContent = currentDraft.sentimentBreakdown.positive + '%';
                    document.getElementById('negative-percent').textContent = currentDraft.sentimentBreakdown.negative + '%';
                    document.getElementById('neutral-percent').textContent = currentDraft.sentimentBreakdown.neutral + '%';
                }
            }
        }
    }, 500);
}

// Update navigation based on user type
function updateNavigation() {
    const userType = getUserType();
    const isLoggedIn = isUserLoggedIn();
    const userName = getUserName();
    
    const navLinksContainer = document.getElementById('nav-links-container');
    const navActions = document.getElementById('nav-actions');
    
    if (isLoggedIn && userType === 'official') {
        // Show Dashboard link for officials
        if (navLinksContainer) {
            navLinksContainer.innerHTML = `
                <a href="about.html">About</a>
                <a href="dashboard.html">Dashboard</a>
            `;
        }
        
        // Update nav actions for logged-in official
        if (navActions) {
            navActions.innerHTML = `
                <div class="user-info">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span>${userName}</span>
                </div>
                <button class="btn-logout" onclick="logout()">Logout</button>
            `;
        }
    } else if (isLoggedIn && userType === 'citizen') {
        // Update nav actions for logged-in citizen
        if (navActions) {
            navActions.innerHTML = `
                <div class="user-info">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span>${userName}</span>
                </div>
                <button class="btn-logout" onclick="logout()">Logout</button>
            `;
        }
    }
    // For non-logged users, keep default buttons
}

// Initialize page on load
document.addEventListener('DOMContentLoaded', () => {
    updateNavigation();
    loadDraftData();
    initNavbarHover();
    generateTopics();
    initDiscussionSection();
    loadComments();
    updateSentimentBreakdown();
    
    // Add CSS animation for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
});

// Logout function for testing
function logout() {
    sessionStorage.removeItem('userLoggedIn');
    sessionStorage.removeItem('userType');
    location.reload();
}

// Export functions for global access
window.toggleReadMore = toggleReadMore;
window.toggleLike = toggleLike;
window.submitComment = submitComment;
window.openCitizenModal = openCitizenModal;
window.openOfficialModal = openOfficialModal;
window.logout = logout;
