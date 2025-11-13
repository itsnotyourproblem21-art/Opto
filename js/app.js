// js/app.js - Main application logic

import { initialTestData, appSubjectLinks, SUBJECT_COLOR_MAP, navigation } from './constants.js';
import { calculateScore, getScoreColorClass, formatDuration, roundToNearestTen } from './utils.js';

// --- Application State ---
const state = {
	activeLink: 'Biology',
	testData: JSON.parse(JSON.stringify(initialTestData)), // Deep clone
	selectedTestId: null,
	selectedAttempt: 1,
	expandedTestId: null,
	isSidebarCollapsed: false,
	expandedSidebarSection: 'Subjects',
};

// --- Initialize App ---
function initApp() {
	// Set initial test
	const testsForBiology = state.testData['Biology'] || [];
	if (testsForBiology.length > 0) {
		state.selectedTestId = testsForBiology[0].id;
		state.selectedAttempt = Math.max(1, testsForBiology[0].attempts);
		state.expandedTestId = testsForBiology[0].id;
	}
	
	render();
	attachEventListeners();
}

// --- Get Current Subject Tests ---
function getCurrentSubjectTests() {
	return state.testData[state.activeLink] || [];
}

// --- Get Selected Test ---
function getSelectedTest() {
	const tests = getCurrentSubjectTests();
	return tests.find(t => t.id === state.selectedTestId) || null;
}

// --- Get Selected Metrics ---
function getSelectedMetrics() {
	const test = getSelectedTest();
	if (!test || test.attempts === 0) {
		return {
			score: 0,
			correct: 0,
			total: test ? test.total : 40,
			percentage: 0,
			date: 'N/A',
			duration: 'N/A',
		};
	}

	const attemptData = test.history.find(h => h.attempt === state.selectedAttempt);
	if (!attemptData) {
		return {
			score: 0,
			correct: 0,
			total: test.total,
			percentage: 0,
			date: 'N/A',
			duration: 'N/A',
		};
	}

	return {
		score: attemptData.score,
		correct: attemptData.correct,
		total: test.total,
		percentage: Math.round((attemptData.correct / test.total) * 100),
		date: attemptData.date,
		duration: formatDuration(attemptData.durationInSeconds),
	};
}

// --- Event Handlers ---
function handleSubjectClick(subjectName) {
	state.activeLink = subjectName;
	
	const testsForSubject = state.testData[subjectName] || [];
	if (testsForSubject.length > 0) {
		const firstTest = testsForSubject[0];
		state.selectedTestId = firstTest.id;
		state.selectedAttempt = Math.max(1, firstTest.attempts);
		state.expandedTestId = firstTest.id;
	} else {
		state.selectedTestId = null;
		state.selectedAttempt = 1;
		state.expandedTestId = null;
	}
	
	render();
}

function handleTestSelect(testId) {
	state.selectedTestId = testId;
	const test = getCurrentSubjectTests().find(t => t.id === testId);
	if (test) {
		state.selectedAttempt = Math.max(1, test.attempts);
	}
	
	// Toggle expand
	state.expandedTestId = state.expandedTestId === testId ? null : testId;
	render();
}

function handleAttemptSelect(attempt) {
	state.selectedAttempt = attempt;
	render();
}

function toggleSidebar() {
	state.isSidebarCollapsed = !state.isSidebarCollapsed;
	render();
}

function toggleSidebarSection(sectionName) {
	state.expandedSidebarSection = state.expandedSidebarSection === sectionName ? null : sectionName;
	render();
}

// --- Render Functions ---
function render() {
	renderPageBackground();
	renderSidebar();
	renderHeader();
	renderTestSelector();
	renderDashboard();
}

function renderPageBackground() {
	const colors = SUBJECT_COLOR_MAP[state.activeLink] || SUBJECT_COLOR_MAP['General'];
	document.body.style.background = `linear-gradient(135deg, ${colors.primaryHex} 0%, ${colors.secondaryHex} 100%)`;
}

function renderSidebar() {
	const sidebar = document.getElementById('sidebar');
	const colors = SUBJECT_COLOR_MAP[state.activeLink] || SUBJECT_COLOR_MAP['General'];
	
	sidebar.innerHTML = `
		<div class="sidebar-header">
			<h1 class="sidebar-title">🎓 OAT Prep</h1>
			<a href="index.html" class="home-link" title="Back to Reading Test">
				🏠
			</a>
		</div>
		
		<nav class="sidebar-nav">
			<div class="nav-section">
				<div class="nav-section-title">STUDY</div>
				<button class="nav-item nav-item-collapsible ${state.expandedSidebarSection === 'Subjects' ? 'expanded' : ''}"
					onclick="window.app.toggleSidebarSection('Subjects')">
					<span>🎓 Subjects</span>
					<span class="chevron">${state.expandedSidebarSection === 'Subjects' ? '▼' : '▶'}</span>
				</button>
				${state.expandedSidebarSection === 'Subjects' ? renderSubjectsList() : ''}
				<button class="nav-item">
					<span>📋 Full Length Tests</span>
				</button>
			</div>
			
			<div class="nav-section">
				<div class="nav-section-title">REVIEW</div>
				<button class="nav-item">
					<span>🕐 Previous Tests</span>
				</button>
				<button class="nav-item">
					<span>🏷️ Tagged Questions</span>
				</button>
			</div>
		</nav>
	`;
	
	sidebar.className = state.isSidebarCollapsed ? 'sidebar collapsed' : 'sidebar';
}

function renderSubjectsList() {
	return appSubjectLinks.map(subject => {
		const isActive = state.activeLink === subject.name;
		const colors = SUBJECT_COLOR_MAP[subject.name];
		const style = isActive ? `background: ${colors.secondaryHex}; border-left: 4px solid ${colors.primaryHex}; font-weight: 700;` : '';
		
		return `
			<button class="nav-item nav-child ${isActive ? 'active' : ''}"
				style="${style}"
				onclick="window.app.handleSubjectClick('${subject.name}')">
				<span>${subject.iconEmoji} ${subject.name}</span>
			</button>
		`;
	}).join('');
}

function renderHeader() {
	const header = document.getElementById('header');
	const colors = SUBJECT_COLOR_MAP[state.activeLink] || SUBJECT_COLOR_MAP['General'];
	
	header.innerHTML = `
		<div class="header-content" style="background: ${colors.secondaryHex}20; border-left: 6px solid ${colors.primaryHex};">
			<div class="header-title">
				<span class="header-icon">${colors.iconEmoji}</span>
				<h2>${state.activeLink}</h2>
			</div>
			<p class="header-subtitle">Master the OAT ${state.activeLink} section with targeted practice</p>
		</div>
	`;
}

function renderTestSelector() {
	const testSelector = document.getElementById('test-selector');
	const tests = getCurrentSubjectTests();
	const colors = SUBJECT_COLOR_MAP[state.activeLink] || SUBJECT_COLOR_MAP['General'];
	
	if (tests.length === 0) {
		testSelector.innerHTML = `
			<div class="test-selector-header">
				<h3>📋 Practice Tests</h3>
			</div>
			<div class="no-tests">
				<p>No practice tests available for ${state.activeLink} yet.</p>
			</div>
		`;
		return;
	}
	
	const testsHTML = tests.map(test => {
		const isActive = test.id === state.selectedTestId;
		const isExpanded = test.id === state.expandedTestId;
		const activeStyle = isActive ? `background: ${colors.secondaryHex}; border-left: 4px solid ${colors.primaryHex}; font-weight: 700; box-shadow: 0 4px 6px ${colors.primaryHex}70;` : '';
		
		const attemptsHTML = isExpanded && test.attempts > 0 ? `
			<div class="attempt-pills">
				${Array.from({ length: test.attempts }, (_, i) => i + 1).map(attempt => `
					<button class="attempt-pill ${attempt === state.selectedAttempt ? 'active' : ''}"
						onclick="window.app.handleAttemptSelect(${attempt})">
						${attempt}
					</button>
				`).join('')}
			</div>
		` : '';
		
		return `
			<div class="test-item ${isActive ? 'active' : ''}"
				style="${activeStyle}"
				onclick="window.app.handleTestSelect(${test.id})">
				<div class="test-item-header">
					<span class="test-name">${test.name}</span>
					<span class="chevron">${isExpanded ? '▼' : '▶'}</span>
				</div>
				<div class="test-stats">
					<span>📝 ${test.attempts}/${3} attempts</span>
					<span>🏷️ ${test.tagged} tagged</span>
				</div>
			</div>
			${attemptsHTML}
		`;
	}).join('');
	
	testSelector.innerHTML = `
		<div class="test-selector-header">
			<h3>📋 Practice Tests</h3>
		</div>
		<div class="test-list">
			${testsHTML}
		</div>
	`;
}

function renderDashboard() {
	const dashboard = document.getElementById('dashboard');
	const test = getSelectedTest();
	const metrics = getSelectedMetrics();
	const colors = SUBJECT_COLOR_MAP[state.activeLink] || SUBJECT_COLOR_MAP['General'];
	
	if (!test) {
		dashboard.innerHTML = `<div class="no-test">Select a test to view details</div>`;
		return;
	}
	
	const scoreColorClass = getScoreColorClass(metrics.score);
	
	dashboard.innerHTML = `
		<div class="dashboard-grid">
			<!-- Score Card -->
			<div class="metric-card score-card" style="border-top: 4px solid ${colors.primaryHex};">
				<div class="metric-label">Score</div>
				<div class="metric-value ${scoreColorClass}">${roundToNearestTen(metrics.score)}</div>
				<div class="metric-sublabel">out of 400</div>
			</div>
			
			<!-- Correct Answers Card -->
			<div class="metric-card" style="border-top: 4px solid ${colors.primaryHex};">
				<div class="metric-label">Correct</div>
				<div class="metric-value">${metrics.correct}/${metrics.total}</div>
				<div class="metric-sublabel">${metrics.percentage}% accuracy</div>
			</div>
			
			<!-- Duration Card -->
			<div class="metric-card" style="border-top: 4px solid ${colors.primaryHex};">
				<div class="metric-label">Duration</div>
				<div class="metric-value">${metrics.duration}</div>
				<div class="metric-sublabel">${metrics.date}</div>
			</div>
			
			<!-- Action Buttons -->
			<div class="action-buttons">
				<button class="btn btn-primary" style="background: ${colors.primaryHex};">
					${test.attempts === 0 ? '▶ Start Test' : '🔄 Retake Test'}
				</button>
				${test.attempts > 0 ? `
					<button class="btn btn-secondary">📊 View Details</button>
					<button class="btn btn-secondary">💬 AI Tutor</button>
				` : ''}
			</div>
			
			<!-- Mock Screenshot -->
			<div class="mock-screenshot">
				${renderMockScreenshot(test, metrics, colors)}
			</div>
		</div>
	`;
}

function renderMockScreenshot(test, metrics, colors) {
	return `
		<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
			<!-- Background -->
			<rect width="800" height="500" fill="#f9fafb" rx="12"/>
			
			<!-- Header -->
			<rect width="800" height="80" fill="${colors.primaryHex}" opacity="0.1"/>
			<text x="30" y="45" font-size="24" font-weight="bold" fill="${colors.primaryHex}">
				${test.name} - Attempt ${state.selectedAttempt}
			</text>
			
			<!-- Progress Bar -->
			<rect x="30" y="100" width="740" height="40" fill="#e5e7eb" rx="20"/>
			<rect x="30" y="100" width="${740 * (metrics.percentage / 100)}" height="40" fill="${colors.primaryHex}" rx="20"/>
			<text x="400" y="127" font-size="18" font-weight="bold" fill="#1f2937" text-anchor="middle">
				${metrics.correct} / ${metrics.total} questions (${metrics.percentage}%)
			</text>
			
			<!-- Questions Preview -->
			${Array.from({ length: 5 }, (_, i) => {
				const y = 170 + i * 60;
				const isCorrect = i < 3;
				return `
					<rect x="30" y="${y}" width="740" height="50" fill="white" stroke="#d1d5db" stroke-width="2" rx="8"/>
					<text x="50" y="${y + 30}" font-size="16" fill="#374151">Question ${i + 1}</text>
					<circle cx="720" cy="${y + 25}" r="15" fill="${isCorrect ? '#10b981' : '#ef4444'}"/>
					<text x="720" y="${y + 30}" font-size="20" fill="white" text-anchor="middle">
						${isCorrect ? '✓' : '✗'}
					</text>
				`;
			}).join('')}
		</svg>
	`;
}

// --- Attach Event Listeners ---
function attachEventListeners() {
	// Expose functions to window for onclick handlers
	window.app = {
		handleSubjectClick,
		handleTestSelect,
		handleAttemptSelect,
		toggleSidebar,
		toggleSidebarSection,
	};
}

// --- Start App ---
document.addEventListener('DOMContentLoaded', initApp);
