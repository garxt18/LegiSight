// Draft Legislation Data
const draftData = {
    'digital-privacy-act': {
        id: 'digital-privacy-act',
        status: 'review',
        level: 'national',
        state: null,
        title: 'Digital Privacy Protection Act 2025',
        description: 'Comprehensive legislation to protect consumer data privacy and establish clear guidelines for data collection and processing by technology companies.',
        department: 'Department of Technology',
        date: '1/15/2025',
        tags: ['privacy', 'technology', 'consumer protection'],
        image: 'privacy',
        initialComments: 3,
        sentimentBreakdown: { positive: 68, neutral: 24, negative: 8 },
        fullContent: `
            <h3>## Purpose and Intent</h3>
            <p>This Act aims to establish comprehensive data privacy protections for consumers while fostering innovation in the technology sector. The legislation builds upon existing privacy frameworks to create a unified approach to data protection nationwide.</p>
            
            <h3>## Key Provisions</h3>
            <h4>### Section 1: Consumer Rights</h4>
            <ul>
                <li>Right to know what personal information is collected</li>
                <li>Right to delete personal information</li>
                <li>Right to opt-out of the sale of personal information</li>
            </ul>
            
            <div class="collapsed-content" id="collapsed-content">
                <li>Right to non-discrimination for exercising privacy rights</li>
                <li>Right to data portability</li>
            </ul>
            
            <h4>### Section 2: Business Obligations</h4>
            <ul>
                <li>Transparency requirements for data collection practices</li>
                <li>Implementation of reasonable security measures</li>
                <li>Data minimization principles</li>
                <li>Purpose limitation for data use</li>
                <li>Regular privacy impact assessments</li>
            </ul>
            
            <h4>### Section 3: Enforcement</h4>
            <p>The legislation establishes a dedicated Data Protection Authority with the power to investigate violations, impose fines up to 4% of annual revenue, and mandate corrective actions.</p>
        `
    },
    'healthcare-reform': {
        id: 'healthcare-reform',
        status: 'draft',
        level: 'state',
        state: 'Karnataka',
        title: 'Universal Healthcare Access Bill 2025',
        description: 'Proposal to expand healthcare coverage and reduce medical costs through state-sponsored insurance programs and price regulations.',
        department: 'Department of Health & Family Welfare',
        date: '1/12/2025',
        tags: ['healthcare', 'insurance', 'public welfare'],
        image: 'health',
        initialComments: 5,
        sentimentBreakdown: { positive: 72, neutral: 18, negative: 10 },
        fullContent: `
            <h3>## Executive Summary</h3>
            <p>The Universal Healthcare Access Bill aims to ensure every resident has access to quality healthcare services regardless of their economic status. This landmark legislation introduces comprehensive reforms to the healthcare system.</p>
            
            <h3>## Core Components</h3>
            <h4>### Universal Coverage</h4>
            <ul>
                <li>Free preventive care for all residents</li>
                <li>Subsidized treatment for chronic conditions</li>
                <li>Emergency care guarantee within 30 minutes</li>
            </ul>
            
            <div class="collapsed-content">
                <h4>### Funding Mechanism</h4>
                <ul>
                    <li>2% health tax on incomes above ₹10 lakhs</li>
                    <li>Corporate healthcare contribution mandate</li>
                    <li>Federal and state government co-funding</li>
                </ul>
                
                <h4>### Implementation Timeline</h4>
                <p>Phase 1 (2025): Primary care centers in all districts<br>
                Phase 2 (2026): Specialist services expansion<br>
                Phase 3 (2027): Full implementation with digital health records</p>
            </div>
        `
    },
    'education-modernization': {
        id: 'education-modernization',
        status: 'published',
        level: 'state',
        state: 'Karnataka',
        title: 'Karnataka Education Technology Fund',
        description: 'State funding initiative to upgrade technology infrastructure in public schools and provide digital learning resources across Karnataka.',
        department: 'Department of School Education',
        date: '1/10/2025',
        tags: ['education', 'technology', 'curriculum reform'],
        image: 'education',
        initialComments: 8,
        sentimentBreakdown: { positive: 65, neutral: 25, negative: 10 },
        fullContent: `
            <h3>## Vision Statement</h3>
            <p>Transform education to prepare students for the 21st century economy through technology integration, critical thinking development, and practical skills training.</p>
            
            <h3>## Key Reforms</h3>
            <h4>### Curriculum Updates</h4>
            <ul>
                <li>Mandatory coding education from Grade 6</li>
                <li>Financial literacy as core subject</li>
                <li>Environmental studies integration</li>
            </ul>
            
            <div class="collapsed-content">
                <h4>### Teacher Development</h4>
                <ul>
                    <li>Annual 40-hour professional development requirement</li>
                    <li>Technology training certification</li>
                    <li>Performance-based incentives</li>
                </ul>
                
                <h4>### Infrastructure Investment</h4>
                <p>₹5,000 crore allocation for digital classrooms, including high-speed internet, tablets for students, and interactive learning platforms.</p>
            </div>
        `
    },
    'renewable-energy': {
        id: 'renewable-energy',
        status: 'review',
        level: 'national',
        state: null,
        title: 'Renewable Energy Transition Act 2025',
        description: 'Mandate for transitioning to 50% renewable energy by 2030 with incentives for solar and wind power adoption.',
        department: 'Ministry of New and Renewable Energy',
        date: '1/14/2025',
        tags: ['environment', 'energy', 'climate'],
        image: 'energy',
        initialComments: 12,
        sentimentBreakdown: { positive: 75, neutral: 15, negative: 10 },
        fullContent: `
            <h3>## Climate Action Initiative</h3>
            <p>This Act represents India's commitment to combat climate change through aggressive renewable energy adoption and carbon emission reduction targets.</p>
            
            <h3>## Transition Framework</h3>
            <h4>### Renewable Targets</h4>
            <ul>
                <li>50% renewable energy by 2030</li>
                <li>Net-zero emissions by 2050</li>
                <li>Phase out coal plants by 2040</li>
            </ul>
            
            <div class="collapsed-content">
                <h4>### Incentive Programs</h4>
                <ul>
                    <li>40% subsidy for rooftop solar installation</li>
                    <li>Tax breaks for renewable energy companies</li>
                    <li>Green bonds for project financing</li>
                </ul>
                
                <h4>### Job Transition Support</h4>
                <p>₹10,000 crore fund for retraining workers from fossil fuel industries, ensuring just transition to green economy jobs.</p>
            </div>
        `
    },
    'urban-housing': {
        id: 'urban-housing',
        status: 'draft',
        level: 'state',
        state: 'Maharashtra',
        title: 'Affordable Urban Housing Scheme 2025',
        description: 'Initiative to provide affordable housing in metropolitan areas through public-private partnerships and zoning reforms.',
        department: 'Department of Housing',
        date: '1/13/2025',
        tags: ['housing', 'urban development', 'infrastructure'],
        image: 'housing',
        initialComments: 7,
        sentimentBreakdown: { positive: 60, neutral: 28, negative: 12 },
        fullContent: `
            <h3>## Housing Crisis Solution</h3>
            <p>Addressing the urban housing shortage through innovative financing, zoning reforms, and sustainable development practices.</p>
            
            <h3>## Program Components</h3>
            <h4>### Affordable Units Target</h4>
            <ul>
                <li>1 million affordable homes by 2030</li>
                <li>30% reservation in new developments</li>
                <li>Rent control in designated zones</li>
            </ul>
            
            <div class="collapsed-content">
                <h4>### Financing Options</h4>
                <ul>
                    <li>2% interest subsidy for first-time buyers</li>
                    <li>Extended loan tenure up to 30 years</li>
                    <li>Zero down payment for EWS category</li>
                </ul>
                
                <h4>### Smart City Integration</h4>
                <p>All new housing projects must include green spaces, renewable energy systems, and public transport connectivity within 500 meters.</p>
            </div>
        `
    },
    'agricultural-reform': {
        id: 'agricultural-reform',
        status: 'published',
        level: 'state',
        state: 'Punjab',
        title: 'Sustainable Agriculture Development Act 2025',
        description: 'Promote sustainable farming practices, ensure fair pricing for farmers, and modernize agricultural infrastructure.',
        department: 'Department of Agriculture',
        date: '1/11/2025',
        tags: ['agriculture', 'farmers', 'sustainability'],
        image: 'agriculture',
        initialComments: 15,
        sentimentBreakdown: { positive: 55, neutral: 30, negative: 15 },
        fullContent: `
            <h3>## Agricultural Transformation</h3>
            <p>Modernizing agriculture through technology adoption, sustainable practices, and improved market access for farmers.</p>
            
            <h3>## Reform Measures</h3>
            <h4>### Farmer Support</h4>
            <ul>
                <li>Minimum Support Price guarantee</li>
                <li>Crop insurance with 90% subsidy</li>
                <li>Direct benefit transfers</li>
            </ul>
            
            <div class="collapsed-content">
                <h4>### Technology Integration</h4>
                <ul>
                    <li>AI-powered crop advisory services</li>
                    <li>Drone technology for precision farming</li>
                    <li>Blockchain for supply chain transparency</li>
                </ul>
                
                <h4>### Market Reforms</h4>
                <p>Direct farmer-to-consumer platforms, elimination of middlemen, and export promotion for agricultural products.</p>
            </div>
        `
    }
};

// Function to get draft data by ID
function getDraftById(draftId) {
    return draftData[draftId] || null;
}

// Function to get all drafts
function getAllDrafts() {
    return Object.values(draftData);
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { draftData, getDraftById, getAllDrafts };
}