// Python Quest - Main Game Logic
// Maximum dopamine edition! 🎮✨

let pyodide = null;
let currentProfile = null;
let currentMission = null;
let attemptNumber = 0;
let selectedDifficulty = 'easy';

// Initialize Pyodide (Python in browser)
async function initPyodide() {
    showLoading();
    try {
        pyodide = await loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/"
        });
        console.log("✅ Python engine loaded!");
    } catch (error) {
        console.error("Failed to load Python:", error);
        alert("Failed to load Python engine. Please refresh the page.");
    }
    hideLoading();
}

// Initialize game on page load
window.addEventListener('load', async () => {
    await initPyodide();
    loadProfiles();
    setupParticles();
});

// ===== PROFILE MANAGEMENT =====

function loadProfiles() {
    const profileList = document.getElementById('profileList');
    const profiles = getProfiles();
    
    if (profiles.length === 0) {
        profileList.innerHTML = '<p class="text-secondary">No heroes yet. Create your first one!</p>';
        return;
    }
    
    profileList.innerHTML = profiles.map(profile => `
        <div class="profile-card" onclick="loadProfile('${profile.name}')">
            <div class="profile-name">${profile.name}</div>
            <div class="profile-stats">
                <span>⭐ Level ${profile.level}</span>
                <span>🏆 ${profile.missionsCompleted} missions</span>
            </div>
        </div>
    `).join('');
}

function getProfiles() {
    const profiles = localStorage.getItem('pythonQuest_profiles');
    return profiles ? JSON.parse(profiles) : [];
}

function saveProfiles(profiles) {
    localStorage.setItem('pythonQuest_profiles', JSON.stringify(profiles));
}

function showCreateProfile() {
    showScreen('createProfileScreen');
}

function selectDifficulty(difficulty) {
    selectedDifficulty = difficulty;
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    document.querySelector(`[data-difficulty="${difficulty}"]`).classList.add('selected');
}

function createProfile() {
    const name = document.getElementById('heroName').value.trim();
    
    if (!name) {
        alert('Please enter a hero name!');
        return;
    }
    
    const profiles = getProfiles();
    if (profiles.find(p => p.name === name)) {
        alert('Hero name already exists!');
        return;
    }
    
    const newProfile = {
        name: name,
        level: 1,
        xp: 0,
        xpToNextLevel: 100,
        missionsCompleted: 0,
        completedMissions: [],
        difficulty: selectedDifficulty,
        currentTopic: 'basics',
        createdAt: new Date().toISOString()
    };
    
    profiles.push(newProfile);
    saveProfiles(profiles);
    
    loadProfile(name);
    createConfetti();
}

function loadProfile(name) {
    const profiles = getProfiles();
    currentProfile = profiles.find(p => p.name === name);
    
    if (!currentProfile) {
        alert('Profile not found!');
        return;
    }
    
    updateUI();
    loadNextMission();
    showScreen('gameScreen');
}

function updateUI() {
    document.getElementById('playerName').textContent = currentProfile.name;
    document.getElementById('playerLevel').textContent = currentProfile.level;
    document.getElementById('missionsCompleted').textContent = currentProfile.missionsCompleted;
    
    const xpPercent = (currentProfile.xp / currentProfile.xpToNextLevel) * 100;
    document.getElementById('xpBar').style.width = xpPercent + '%';
    document.getElementById('xpText').textContent = 
        `${currentProfile.xp} / ${currentProfile.xpToNextLevel} XP`;
}

function saveProfile() {
    const profiles = getProfiles();
    const index = profiles.findIndex(p => p.name === currentProfile.name);
    if (index !== -1) {
        profiles[index] = currentProfile;
        saveProfiles(profiles);
    }
}

function logout() {
    currentProfile = null;
    currentMission = null;
    showScreen('welcomeScreen');
    loadProfiles();
}

// ===== MISSION MANAGEMENT =====

function loadNextMission() {
    const missions = getMissionsByTopic(currentProfile.currentTopic, currentProfile.difficulty);
    
    // Find first incomplete mission
    currentMission = missions.find(m => 
        !currentProfile.completedMissions.includes(m.id)
    );
    
    if (!currentMission) {
        alert('🎉 All missions completed for this topic! Try changing topics or difficulty.');
        return;
    }
    
    attemptNumber = 1;
    displayMission();
}

function displayMission() {
    document.getElementById('missionTitle').textContent = currentMission.title;
    document.getElementById('missionTopic').textContent = 
        TOPICS[currentMission.topic].name;
    document.getElementById('missionDifficulty').textContent = 
        currentMission.difficulty.toUpperCase();
    document.getElementById('missionDifficulty').style.borderColor = 
        getDifficultyColor(currentMission.difficulty);
    document.getElementById('attemptCounter').textContent = `Attempt #${attemptNumber}`;
    document.getElementById('missionStory').textContent = currentMission.story;
    document.getElementById('missionDescription').textContent = currentMission.description;
    
    // Reset code editor and hints
    document.getElementById('codeEditor').value = '';
    document.getElementById('hintBox').classList.add('hidden');
    document.getElementById('extraHintBox').classList.add('hidden');
    document.getElementById('outputSection').classList.add('hidden');
    
    // Animate mission card
    const missionCard = document.querySelector('.mission-card');
    missionCard.style.animation = 'none';
    setTimeout(() => {
        missionCard.style.animation = 'slideUp 0.5s ease';
    }, 10);
}

function getDifficultyColor(difficulty) {
    const colors = {
        easy: '#10b981',
        medium: '#f59e0b',
        hard: '#ef4444'
    };
    return colors[difficulty] || '#6366f1';
}

function showHint() {
    const hintBox = document.getElementById('hintBox');
    hintBox.textContent = '💡 ' + currentMission.hint;
    hintBox.classList.remove('hidden');
    createSparkles(event.target);
}

function showExtraHint() {
    const hintBox = document.getElementById('extraHintBox');
    hintBox.textContent = '💡💡 ' + currentMission.extraHint;
    hintBox.classList.remove('hidden');
    createSparkles(event.target);
}

function clearCode() {
    document.getElementById('codeEditor').value = '';
    createSparkles(event.target);
}

function skipMission() {
    if (confirm('Skip this mission? You can always come back to it later.')) {
        loadNextMission();
    }
}

// ===== CODE EXECUTION =====

async function runCode() {
    if (!pyodide) {
        alert('Python engine not loaded yet. Please wait a moment and try again.');
        return;
    }
    
    const code = document.getElementById('codeEditor').value;
    if (!code.trim()) {
        alert('Please write some code first!');
        return;
    }
    
    showLoading();
    
    try {
        // Capture output
        pyodide.runPython(`
import sys
import io
sys.stdout = io.StringIO()
        `);
        
        // Run user's code
        pyodide.runPython(code);
        
        // Get output
        const output = pyodide.runPython('sys.stdout.getvalue()');
        
        // Display output
        document.getElementById('output').textContent = output || '(no output)';
        document.getElementById('outputSection').classList.remove('hidden');
        
        // Validate against test cases
        const result = validateSolution(code, output);
        
        hideLoading();
        
        if (result.success) {
            handleSuccess(result);
        } else {
            handleError(result);
        }
        
    } catch (error) {
        hideLoading();
        handleError({
            success: false,
            message: 'Your code produced an error.',
            error: error.toString()
        });
    }
}

function validateSolution(code, output) {
    const testCases = currentMission.testCases;
    
    for (const test of testCases) {
        if (test.type === 'output') {
            if (!output.includes(test.expected)) {
                return {
                    success: false,
                    message: `Expected output: "${test.expected}", but got: "${output.trim()}"`
                };
            }
        } else if (test.type === 'outputLines') {
            const lines = output.trim().split('\n').filter(l => l.trim());
            if (JSON.stringify(lines) !== JSON.stringify(test.expected)) {
                return {
                    success: false,
                    message: `Expected lines: ${test.expected.join(', ')}, but got: ${lines.join(', ')}`
                };
            }
        } else if (test.type === 'contains') {
            for (const expected of test.expected) {
                if (!output.includes(expected)) {
                    return {
                        success: false,
                        message: `Output should contain "${expected}"`
                    };
                }
            }
        } else if (test.type === 'count') {
            const count = (output.match(new RegExp(test.text, 'g')) || []).length;
            if (count !== test.expected) {
                return {
                    success: false,
                    message: `Expected "${test.text}" to appear ${test.expected} times, but appeared ${count} times`
                };
            }
        } else if (test.type === 'custom') {
            if (!test.check(output)) {
                return {
                    success: false,
                    message: 'Solution does not meet the requirements'
                };
            }
        }
    }
    
    // Calculate XP with first-attempt bonus
    const baseXP = currentMission.xp;
    const bonusXP = attemptNumber === 1 ? Math.floor(baseXP * 0.5) : 0;
    const totalXP = baseXP + bonusXP;
    
    return {
        success: true,
        message: getRandomSuccessMessage(),
        xp: totalXP,
        bonusXP: bonusXP,
        firstTry: attemptNumber === 1
    };
}

function handleSuccess(result) {
    // Update profile
    currentProfile.completedMissions.push(currentMission.id);
    currentProfile.missionsCompleted++;
    currentProfile.xp += result.xp;
    
    // Create success modal content
    document.getElementById('successMessage').textContent = result.message;
    
    let xpText = `+${result.xp} XP`;
    if (result.bonusXP > 0) {
        xpText += ` (First Try Bonus: +${result.bonusXP})`;
    }
    document.getElementById('xpGain').textContent = xpText;
    
    // Achievements
    let achievements = [];
    if (result.firstTry) {
        achievements.push('🎯 First Try Master');
    }
    if (currentProfile.missionsCompleted % 5 === 0) {
        achievements.push('🏆 ' + currentProfile.missionsCompleted + ' Missions Milestone');
    }
    
    document.getElementById('achievementBadges').innerHTML = 
        achievements.map(a => `<div class="badge">${a}</div>`).join('');
    
    // Check for level up
    if (currentProfile.xp >= currentProfile.xpToNextLevel) {
        currentProfile.xp -= currentProfile.xpToNextLevel;
        currentProfile.level++;
        currentProfile.xpToNextLevel = Math.floor(currentProfile.xpToNextLevel * 1.5);
        
        // Show level up modal first
        document.getElementById('newLevel').textContent = currentProfile.level;
        document.getElementById('levelUpModal').classList.remove('hidden');
        createConfetti();
        
        setTimeout(() => {
            document.getElementById('levelUpModal').classList.add('hidden');
            document.getElementById('successModal').classList.remove('hidden');
            createConfetti();
        }, 2000);
    } else {
        document.getElementById('successModal').classList.remove('hidden');
        createConfetti();
    }
    
    saveProfile();
    updateUI();
    createFireworks();
}

function handleError(result) {
    attemptNumber++;
    document.getElementById('attemptCounter').textContent = `Attempt #${attemptNumber}`;
    
    document.getElementById('errorMessage').textContent = result.message;
    
    if (result.error) {
        document.getElementById('errorDetails').innerHTML = 
            `<pre>${result.error}</pre>`;
    } else {
        document.getElementById('errorDetails').innerHTML = '';
    }
    
    document.getElementById('errorModal').classList.remove('hidden');
}

function closeError() {
    document.getElementById('errorModal').classList.add('hidden');
}

function giveUpMission() {
    document.getElementById('errorModal').classList.add('hidden');
    loadNextMission();
}

function closeLevelUp() {
    document.getElementById('levelUpModal').classList.add('hidden');
}

function nextMission() {
    document.getElementById('successModal').classList.add('hidden');
    loadNextMission();
}

// ===== MENU FUNCTIONS =====

function showMenu() {
    document.getElementById('menuOverlay').classList.remove('hidden');
}

function closeMenu() {
    document.getElementById('menuOverlay').classList.add('hidden');
}

function showTopics() {
    const topicsList = document.getElementById('topicsList');
    topicsList.innerHTML = Object.entries(TOPICS).map(([id, topic]) => {
        const allMissions = getAllMissionsForTopic(id);
        const completed = allMissions.filter(m => 
            currentProfile.completedMissions.includes(m.id)
        ).length;
        const completedClass = completed === allMissions.length ? 'completed' : '';
        
        return `
            <div class="topic-card ${completedClass}" onclick="selectTopic('${id}')">
                <div class="topic-icon">${topic.icon}</div>
                <div class="topic-name">${topic.name}</div>
                <div class="topic-progress">${completed}/${allMissions.length} missions</div>
            </div>
        `;
    }).join('');
    
    closeMenu();
    showScreen('topicsScreen');
}

function selectTopic(topicId) {
    currentProfile.currentTopic = topicId;
    saveProfile();
    loadNextMission();
    returnToGame();
}

function changeDifficulty() {
    const newDiff = prompt('Choose difficulty: easy, medium, or hard', currentProfile.difficulty);
    if (newDiff && ['easy', 'medium', 'hard'].includes(newDiff.toLowerCase())) {
        currentProfile.difficulty = newDiff.toLowerCase();
        saveProfile();
        loadNextMission();
        closeMenu();
        alert(`Difficulty changed to ${newDiff.toUpperCase()}!`);
    }
}

function showProgress() {
    const progressDetails = document.getElementById('progressDetails');
    
    const topicProgress = Object.entries(TOPICS).map(([id, topic]) => {
        const allMissions = getAllMissionsForTopic(id);
        const completed = allMissions.filter(m => 
            currentProfile.completedMissions.includes(m.id)
        ).length;
        const percent = Math.floor((completed / allMissions.length) * 100);
        
        return `
            <div class="progress-stat">
                <div class="progress-stat-label">${topic.icon} ${topic.name}</div>
                <div class="progress-stat-value">${completed}/${allMissions.length} (${percent}%)</div>
            </div>
        `;
    }).join('');
    
    progressDetails.innerHTML = `
        <div class="progress-stat">
            <div class="progress-stat-label">⭐ Level</div>
            <div class="progress-stat-value">${currentProfile.level}</div>
        </div>
        <div class="progress-stat">
            <div class="progress-stat-label">📊 Total XP</div>
            <div class="progress-stat-value">${currentProfile.xp} / ${currentProfile.xpToNextLevel}</div>
        </div>
        <div class="progress-stat">
            <div class="progress-stat-label">🏆 Missions Completed</div>
            <div class="progress-stat-value">${currentProfile.missionsCompleted}</div>
        </div>
        <div class="progress-stat">
            <div class="progress-stat-label">🎯 Difficulty</div>
            <div class="progress-stat-value">${currentProfile.difficulty.toUpperCase()}</div>
        </div>
        <h3 style="margin-top: 30px; margin-bottom: 15px;">Topic Progress</h3>
        ${topicProgress}
    `;
    
    closeMenu();
    showScreen('progressScreen');
}

function returnToGame() {
    showScreen('gameScreen');
}

// ===== SCREEN MANAGEMENT =====

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function showLoading() {
    document.getElementById('loadingOverlay').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loadingOverlay').classList.add('hidden');
}

// ===== VISUAL EFFECTS =====

// Particle system for background effects
function setupParticles() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Confetti effect
function createConfetti() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    
    const particles = [];
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];
    
    for (let i = 0; i < 150; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: -10,
            vx: (Math.random() - 0.5) * 5,
            vy: Math.random() * 3 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((p, index) => {
            p.y += p.vy;
            p.x += p.vx;
            p.rotation += p.rotationSpeed;
            p.vy += 0.1; // Gravity
            
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation * Math.PI / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-5, -5, 10, 10);
            ctx.restore();
            
            if (p.y > canvas.height) {
                particles.splice(index, 1);
            }
        });
        
        if (particles.length > 0) {
            requestAnimationFrame(animate);
        }
    }
    
    animate();
}

// Fireworks effect
function createFireworks() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    
    const particles = [];
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    for (let i = 0; i < 100; i++) {
        const angle = (Math.PI * 2 * i) / 100;
        const velocity = 2 + Math.random() * 3;
        
        particles.push({
            x: centerX,
            y: centerY,
            vx: Math.cos(angle) * velocity,
            vy: Math.sin(angle) * velocity,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((p, index) => {
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.01;
            
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
            ctx.fill();
            
            if (p.alpha <= 0) {
                particles.splice(index, 1);
            }
        });
        
        ctx.globalAlpha = 1;
        
        if (particles.length > 0) {
            requestAnimationFrame(animate);
        }
    }
    
    animate();
}

// Sparkle effect on button clicks
function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    
    const particles = [];
    
    for (let i = 0; i < 20; i++) {
        particles.push({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
            vx: (Math.random() - 0.5) * 5,
            vy: (Math.random() - 0.5) * 5,
            alpha: 1,
            size: Math.random() * 3 + 1
        });
    }
    
    function animate() {
        particles.forEach((p, index) => {
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.02;
            
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = '#f59e0b';
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            
            if (p.alpha <= 0) {
                particles.splice(index, 1);
            }
        });
        
        ctx.globalAlpha = 1;
        
        if (particles.length > 0) {
            requestAnimationFrame(animate);
        }
    }
    
    animate();
}

// Add CSS for profile card
const style = document.createElement('style');
style.textContent = `
    .profile-card {
        padding: 20px;
        background: var(--bg-dark);
        border: 2px solid var(--border);
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-bottom: 15px;
    }
    
    .profile-card:hover {
        transform: translateY(-3px);
        border-color: var(--primary);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }
    
    .profile-name {
        font-size: 1.3em;
        font-weight: 700;
        color: var(--primary);
        margin-bottom: 10px;
    }
    
    .profile-stats {
        display: flex;
        gap: 15px;
        color: var(--text-secondary);
    }
    
    .text-secondary {
        color: var(--text-secondary);
        text-align: center;
        padding: 20px;
    }
`;
document.head.appendChild(style);
