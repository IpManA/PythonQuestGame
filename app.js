// Python Quest - Main App Logic with Sound Effects (Simplified Editor)

let pyodide;
let currentMission = null;
let selectedDifficulty = 'easy';
let selectedTopic = 'basics';
let soundEnabled = true;

// Sound effects
const sounds = {
    success: null,
    error: null,
    levelUp: null,
    click: null,
    hint: null
};

// Player progress
let playerProgress = {
    level: 1,
    xp: 0,
    completedMissions: [],
    currentStreak: 0
};

// Load progress from localStorage
function loadProgress() {
    const saved = localStorage.getItem('pythonQuestProgress');
    if (saved) {
        playerProgress = JSON.parse(saved);
    }
    updateStatsDisplay();
}

// Save progress to localStorage
function saveProgress() {
    localStorage.setItem('pythonQuestProgress', JSON.stringify(playerProgress));
}

// Initialize sound effects
function initSounds() {
    sounds.success = document.getElementById('successSound');
    sounds.error = document.getElementById('errorSound');
    sounds.levelUp = document.getElementById('levelUpSound');
    sounds.click = document.getElementById('clickSound');
    sounds.hint = document.getElementById('hintSound');
    
    // Set volume
    Object.values(sounds).forEach(sound => {
        if (sound) sound.volume = 0.5;
    });
}

// Play sound effect
function playSound(soundName) {
    if (!soundEnabled || !sounds[soundName]) return;
    
    try {
        sounds[soundName].currentTime = 0;
        sounds[soundName].play().catch(e => console.log('Sound play error:', e));
    } catch (e) {
        console.log('Sound error:', e);
    }
}

// Toggle sound on/off
function toggleSound() {
    soundEnabled = !soundEnabled;
    const soundBtn = document.getElementById('soundToggle');
    
    if (soundEnabled) {
        soundBtn.classList.remove('muted');
        soundBtn.innerHTML = '🔊 <span id="soundStatus">ON</span>';
        playSound('click');
    } else {
        soundBtn.classList.add('muted');
        soundBtn.innerHTML = '🔇 <span id="soundStatus">OFF</span>';
    }
}

// Update stats display
function updateStatsDisplay() {
    document.getElementById('playerLevel').textContent = playerProgress.level;
    document.getElementById('playerXP').textContent = playerProgress.xp;
    document.getElementById('missionsCompleted').textContent = playerProgress.completedMissions.length;
}

// Calculate XP needed for next level
function getXPForLevel(level) {
    return level * 100;
}

// Add XP and check for level up
function addXP(amount) {
    playerProgress.xp += amount;
    const xpNeeded = getXPForLevel(playerProgress.level);
    
    if (playerProgress.xp >= xpNeeded) {
        playerProgress.level++;
        playerProgress.xp -= xpNeeded;
        playSound('levelUp');
        showLevelUpMessage();
    }
    
    updateStatsDisplay();
    saveProgress();
}

// Show level up message
function showLevelUpMessage() {
    const resultBox = document.getElementById('resultBox');
    const resultContent = document.getElementById('resultContent');
    
    resultBox.className = 'result-box success pulse';
    resultContent.innerHTML = `
        <h2>🎉 LEVEL UP! 🎉</h2>
        <p style="font-size: 1.5em; margin: 15px 0;">You are now Level ${playerProgress.level}!</p>
        <p>Keep up the great work, adventurer!</p>
    `;
    resultBox.classList.remove('hidden');
    
    launchFireworks();
}

// Initialize Pyodide
async function initPyodide() {
    try {
        pyodide = await loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/"
        });
        
        // Hide loading screen
        setTimeout(() => {
            document.getElementById('loadingPython').classList.add('hidden');
        }, 500);
        
    } catch (error) {
        console.error('Error loading Pyodide:', error);
        document.querySelector('.loading-content p').textContent = 'Error loading Python. Please refresh the page.';
    }
}

// Update line numbers
function updateLineNumbers() {
    const editor = document.getElementById('codeEditor');
    const lineNumbers = document.getElementById('lineNumbers');
    const lines = editor.value.split('\n').length;
    
    let lineNumbersHtml = '';
    for (let i = 1; i <= lines; i++) {
        lineNumbersHtml += i + '\n';
    }
    lineNumbers.textContent = lineNumbersHtml;
}

// Setup code editor
function setupCodeEditor() {
    const editor = document.getElementById('codeEditor');
    
    // Update line numbers on input
    editor.addEventListener('input', updateLineNumbers);
    
    // Handle tab key
    editor.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = this.selectionStart;
            const end = this.selectionEnd;
            const value = this.value;
            
            this.value = value.substring(0, start) + '    ' + value.substring(end);
            this.selectionStart = this.selectionEnd = start + 4;
            
            updateLineNumbers();
        }
    });
    
    // Initial update
    updateLineNumbers();
}

// Display missions based on selected difficulty and topic
function displayMissions() {
    const missionList = document.getElementById('missionList');
    missionList.innerHTML = '';
    
    const filteredMissions = MISSIONS.filter(m => 
        m.difficulty === selectedDifficulty && m.topic === selectedTopic
    );
    
    if (filteredMissions.length === 0) {
        missionList.innerHTML = '<p style="text-align: center; color: #666; padding: 40px;">No missions available for this combination. Try a different topic!</p>';
        return;
    }
    
    filteredMissions.forEach(mission => {
        const isCompleted = playerProgress.completedMissions.includes(mission.id);
        const card = document.createElement('div');
        card.className = `mission-card ${isCompleted ? 'completed' : ''}`;
        card.innerHTML = `
            <h3>${mission.title}</h3>
            <p>${mission.description}</p>
            <div class="mission-badges">
                <span class="badge difficulty">${mission.difficulty}</span>
                <span class="badge topic">${mission.topic.replace('_', ' ')}</span>
                ${isCompleted ? '<span class="badge completed">✓ Completed</span>' : ''}
            </div>
        `;
        card.addEventListener('click', () => {
            playSound('click');
            startMission(mission);
        });
        missionList.appendChild(card);
    });
}

// Start a mission
function startMission(mission) {
    currentMission = mission;
    
    // Update mission display
    document.getElementById('missionTitle').textContent = mission.title;
    document.getElementById('missionDifficulty').textContent = mission.difficulty.toUpperCase();
    document.getElementById('missionTopic').textContent = mission.topic.replace('_', ' ').toUpperCase();
    document.getElementById('missionStory').textContent = mission.story;
    document.getElementById('missionObjective').textContent = mission.objective;
    document.getElementById('hintText').textContent = mission.hint;
    
    // Clear previous code and output
    document.getElementById('codeEditor').value = mission.starterCode || '';
    document.getElementById('output').textContent = '';
    document.getElementById('hintBox').classList.add('hidden');
    document.getElementById('resultBox').classList.add('hidden');
    
    // Update line numbers
    updateLineNumbers();
    
    // Switch screens
    document.getElementById('missionSelect').classList.remove('active');
    document.getElementById('missionScreen').classList.add('active');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Run Python code
async function runCode() {
    if (!pyodide) {
        alert('Python is still loading. Please wait...');
        return;
    }
    
    playSound('click');
    
    const code = document.getElementById('codeEditor').value;
    const outputBox = document.getElementById('output');
    const resultBox = document.getElementById('resultBox');
    const resultContent = document.getElementById('resultContent');
    
    // Clear previous output
    outputBox.textContent = 'Running...\n';
    resultBox.classList.add('hidden');
    
    try {
        // Redirect stdout
        pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
        `);
        
        // Run user code
        pyodide.runPython(code);
        
        // Get output
        const output = pyodide.runPython('sys.stdout.getvalue()');
        outputBox.textContent = output || '(No output)';
        
        // Check if mission is completed
        if (currentMission && currentMission.tests) {
            checkMissionCompletion(code, output);
        }
        
    } catch (error) {
        playSound('error');
        outputBox.textContent = `Error:\n${error.message}`;
        outputBox.parentElement.classList.add('shake');
        setTimeout(() => outputBox.parentElement.classList.remove('shake'), 500);
        
        resultBox.className = 'result-box error shake';
        resultContent.innerHTML = `
            <h3>❌ Error</h3>
            <p>There's an error in your code. Check the output above for details.</p>
            <p style="margin-top: 15px;"><strong>Tip:</strong> ${currentMission.hint}</p>
        `;
        resultBox.classList.remove('hidden');
    }
}

// Check mission completion
function checkMissionCompletion(code, output) {
    const resultBox = document.getElementById('resultBox');
    const resultContent = document.getElementById('resultContent');
    let allTestsPassed = true;
    let testResults = [];
    
    for (const test of currentMission.tests) {
        try {
            // Run test
            const testResult = pyodide.runPython(test.code);
            const passed = test.expected(testResult, output);
            
            testResults.push({
                description: test.description,
                passed: passed
            });
            
            if (!passed) {
                allTestsPassed = false;
            }
        } catch (error) {
            allTestsPassed = false;
            testResults.push({
                description: test.description,
                passed: false,
                error: error.message
            });
        }
    }
    
    // Display results
    if (allTestsPassed) {
        playSound('success');
        
        // Mark mission as completed
        if (!playerProgress.completedMissions.includes(currentMission.id)) {
            playerProgress.completedMissions.push(currentMission.id);
            playerProgress.currentStreak++;
            
            // Award XP based on difficulty
            const xpReward = {
                'easy': 50,
                'medium': 100,
                'hard': 200
            }[currentMission.difficulty];
            
            addXP(xpReward);
            
            resultBox.className = 'result-box success pulse';
            resultContent.innerHTML = `
                <h2>🎉 Mission Complete! 🎉</h2>
                <p style="font-size: 1.2em; margin: 15px 0;">Excellent work, adventurer!</p>
                <p><strong>+${xpReward} XP</strong></p>
                <p style="margin-top: 20px;">${currentMission.successMessage}</p>
            `;
            
            launchConfetti();
        } else {
            resultBox.className = 'result-box success';
            resultContent.innerHTML = `
                <h3>✅ All Tests Passed!</h3>
                <p>You've already completed this mission, but great job solving it again!</p>
            `;
        }
    } else {
        playSound('error');
        
        resultBox.className = 'result-box error shake';
        let failedTests = testResults.filter(t => !t.passed);
        resultContent.innerHTML = `
            <h3>❌ Tests Failed</h3>
            <p>Your code doesn't quite meet all the requirements yet. Keep trying!</p>
            <ul style="margin: 15px 0; padding-left: 25px;">
                ${failedTests.map(t => `<li>${t.description}${t.error ? ': ' + t.error : ''}</li>`).join('')}
            </ul>
            <p><strong>Tip:</strong> ${currentMission.hint}</p>
        `;
    }
    
    resultBox.classList.remove('hidden');
}

// Clear code
function clearCode() {
    playSound('click');
    if (confirm('Are you sure you want to clear your code?')) {
        document.getElementById('codeEditor').value = currentMission.starterCode || '';
        document.getElementById('output').textContent = '';
        document.getElementById('resultBox').classList.add('hidden');
        updateLineNumbers();
    }
}

// Show hint
function showHint() {
    playSound('hint');
    const hintBox = document.getElementById('hintBox');
    hintBox.classList.toggle('hidden');
}

// Launch confetti
function launchConfetti() {
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confetti = [];
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe', '#43e97b', '#ffd89b'];
    
    for (let i = 0; i < 150; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 6 + 4,
            speedY: Math.random() * 3 + 2,
            speedX: Math.random() * 2 - 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 10 - 5
        });
    }
    
    function drawConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confetti.forEach((c, index) => {
            ctx.save();
            ctx.translate(c.x, c.y);
            ctx.rotate(c.rotation * Math.PI / 180);
            ctx.fillStyle = c.color;
            ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size);
            ctx.restore();
            
            c.y += c.speedY;
            c.x += c.speedX;
            c.rotation += c.rotationSpeed;
            
            if (c.y > canvas.height) {
                confetti.splice(index, 1);
            }
        });
        
        if (confetti.length > 0) {
            requestAnimationFrame(drawConfetti);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    
    drawConfetti();
}

// Launch fireworks for level up
function launchFireworks() {
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe', '#43e97b', '#ffd89b', '#ff6b6b'];
    
    function createFirework(x, y) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        for (let i = 0; i < 50; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5 + 2;
            particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                color: color,
                size: Math.random() * 4 + 2
            });
        }
    }
    
    // Create multiple fireworks
    setTimeout(() => createFirework(canvas.width * 0.3, canvas.height * 0.3), 0);
    setTimeout(() => createFirework(canvas.width * 0.7, canvas.height * 0.4), 200);
    setTimeout(() => createFirework(canvas.width * 0.5, canvas.height * 0.2), 400);
    setTimeout(() => createFirework(canvas.width * 0.2, canvas.height * 0.5), 600);
    setTimeout(() => createFirework(canvas.width * 0.8, canvas.height * 0.3), 800);
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((p, index) => {
            ctx.save();
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
            
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1; // Gravity
            p.life -= 0.01;
            
            if (p.life <= 0) {
                particles.splice(index, 1);
            }
        });
        
        if (particles.length > 0) {
            requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    
    animate();
}

// Reset progress
function resetProgress() {
    if (confirm('Are you sure you want to reset all your progress? This cannot be undone!')) {
        playSound('click');
        playerProgress = {
            level: 1,
            xp: 0,
            completedMissions: [],
            currentStreak: 0
        };
        saveProgress();
        updateStatsDisplay();
        displayMissions();
        alert('Progress reset successfully!');
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize
    initPyodide();
    initSounds();
    loadProgress();
    setupCodeEditor();
    displayMissions();
    
    // Sound toggle
    document.getElementById('soundToggle').addEventListener('click', toggleSound);
    
    // Difficulty selection
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            playSound('click');
            document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedDifficulty = this.dataset.difficulty;
            displayMissions();
        });
    });
    
    // Topic selection
    document.querySelectorAll('.topic-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            playSound('click');
            document.querySelectorAll('.topic-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedTopic = this.dataset.topic;
            displayMissions();
        });
    });
    
    // Back to menu
    document.getElementById('backToMenu').addEventListener('click', () => {
        playSound('click');
        document.getElementById('missionScreen').classList.remove('active');
        document.getElementById('missionSelect').classList.add('active');
        displayMissions();
    });
    
    // Run code button
    document.getElementById('runCode').addEventListener('click', runCode);
    
    // Clear code button
    document.getElementById('clearCode').addEventListener('click', clearCode);
    
    // Show hint button
    document.getElementById('showHint').addEventListener('click', showHint);
    
    // Reset progress button
    document.getElementById('resetProgress').addEventListener('click', resetProgress);
    
    // Keyboard shortcut: Ctrl/Cmd + Enter to run code
    document.getElementById('codeEditor').addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            runCode();
        }
    });
});
