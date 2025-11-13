import React, { useState, useMemo, useEffect, useRef } from 'react';

import {
	Home, Clock, Tag, BookOpen, ChevronLeft, ChevronDown, GraduationCap, ClipboardList,
	Dna, FlaskConical, Atom, Calculator, RotateCw, Eye, ChevronUp, Cpu, Lightbulb, Zap, MessageSquare, Send, Trash2,
	Gauge, Check, Users, BarChart3, TrendingUp, X, ChevronRight, Hash, TrendingDown
} from 'lucide-react';

// --- Gemini API Constants ---
const GEMINI_MODEL = 'gemini-2.5-flash-preview-09-2025';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=`;
const API_KEY = ""; // Placeholder for Canvas environment

// --- Design/Color Constants (New Structure) ---
const SUBJECT_COLOR_MAP = {
	'Biology': {
		primaryHex: '#4f72c2', 	// Page background & Active Nav BG (Darker Blue)
		secondaryHex: '#b3d4f8', // Header box background (Lighter Blue)
		icon: Dna, iconEmoji: '🧬', quoteAccentClass: 'text-sky-300'
	},
	'General Chemistry': {
		primaryHex: '#06B6D4', 	// Cyan-500
		secondaryHex: '#67E8F9', // Cyan-300
		icon: FlaskConical, iconEmoji: '🧪', quoteAccentClass: 'text-cyan-300'
	},
	'Organic Chemistry': {
		primaryHex: '#EA580C', 	// Orange-600
		secondaryHex: '#FDBA74', // Orange-300
		icon: Atom, iconEmoji: '👩‍🔬', quoteAccentClass: 'text-orange-300'
	},
	'Reading Comprehension': {
		primaryHex: '#065F46', 	// Green-800
		secondaryHex: '#6EE7B7', // Green-300
		icon: BookOpen, iconEmoji: '📖', quoteAccentClass: 'text-green-300'
	},
	'Physics': {
		primaryHex: '#7E22CE', 	// Purple-700
		secondaryHex: '#C4B5FD', // Purple-300
		icon: Lightbulb, iconEmoji: '💡', quoteAccentClass: 'text-purple-300'
	},
	'Quantitative Reasoning': {
		primaryHex: '#B91C1C', 	// Red-700
		secondaryHex: '#FCA5A5', // Red-300
		icon: Calculator, iconEmoji: '📐', quoteAccentClass: 'text-red-300'
	},
	'General': {
		primaryHex: '#2e2b5e',
		secondaryHex: '#4a478a',
		icon: GraduationCap, iconEmoji: '🎓', quoteAccentClass: 'text-indigo-300'
	}
};

// --- Utility Functions ---
const fetchWithRetry = async (url, options, maxRetries = 3) => {
	let lastError = null;
	for (let i = 0; i < maxRetries; i++) {
		try {
			const response = await fetch(url, options);
			if (!response.ok) {
				const errorBody = await response.text();
				throw new Error(`API call failed with status: ${response.status}. Body: ${errorBody.substring(0, 100)}`);
			}
			return await response.json();
		} catch (error) {
			lastError = error;
			const delay = Math.pow(2, i) * 1000 + Math.random() * 1000;
			if (i < maxRetries - 1) {
				await new Promise(resolve => setTimeout(resolve, delay));
			}
		}
	}
	throw new Error(`Gemini API failed after ${maxRetries} attempts. Last error: ${lastError.message}`);
};

const roundToNearestTen = (score) => {
	if (score === 0) return 0;
	return Math.round(score / 10) * 10;
};

const formatDuration = (totalSeconds) => {
	if (totalSeconds === 0 || totalSeconds === null || isNaN(totalSeconds)) return 'N/A';
	const totalMinutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	const paddedSeconds = String(seconds).padStart(2, '0');
	if (totalMinutes === 0) {
		return `${seconds}s`;
	}
	const minutes = totalMinutes;
	return `${minutes}m ${paddedSeconds}s`;
};

const getScoreColorClass = (score) => {
	const displayScore = roundToNearestTen(score);
	if (displayScore === 0 || displayScore < 200) return 'text-gray-500';
	if (displayScore > 320) return 'text-green-600';
	if (displayScore >= 300 && displayScore <= 320) return 'text-indigo-500';
	return 'text-red-600';
};

// --- Scoring Logic (Non-Linear Scale) ---
const TOTAL_QUESTIONS_BIOLOGY = 40;
const TOTAL_QUESTIONS_CHEMISTRY = 30;
const TOTAL_QUESTIONS_READING = 50;
const TOTAL_QUESTIONS_PHYSICS = 40;
const TOTAL_QUESTIONS_QUANTITATIVE = 40;

const SCORE_MAP_40 = {
	0: 200, 1: 200, 2: 200, 3: 200, 4: 200, 5: 200, 6: 210, 7: 220, 8: 230, 9: 240, 10: 250,
	11: 260, 12: 270, 13: 280, 14: 280, 15: 290, 16: 290, 17: 290, 18: 290, 19: 290, 20: 290,
	21: 290, 22: 300, 23: 300, 24: 310, 25: 310, 26: 320, 27: 320, 28: 330, 29: 330, 30: 340,
	31: 350, 32: 360, 33: 370, 34: 370, 35: 380, 36: 390, 37: 390, 38: 400, 39: 400, 40: 400
};

const SCORE_MAP_30 = {
	0: 200, 1: 200, 2: 200, 3: 200, 4: 210, 5: 220, 6: 230, 7: 240, 8: 250, 9: 260, 10: 270,
	11: 280, 12: 290, 13: 290, 14: 290, 15: 290,
	16: 300, 17: 310, 18: 320, 19: 330, 20: 340, 21: 350, 22: 360, 23: 370, 24: 380, 25: 390,
	26: 400, 27: 400, 28: 400, 29: 400, 30: 400
};

const SCORE_MAP_50 = {
	0: 200, 1: 200, 2: 200, 3: 200, 4: 200, 5: 200, 6: 200, 7: 200, 8: 200, 9: 200, 10: 200,
	11: 200, 12: 200, 13: 200, 14: 200, 15: 210, 16: 220, 17: 230, 18: 240, 19: 250, 20: 260,
	21: 270, 22: 280, 23: 290, 24: 290,
	25: 290, 26: 290,
	27: 300, 28: 300,
	29: 310, 30: 310,
	31: 320,
	32: 330,
	33: 340, 34: 340,
	35: 350,
	36: 360, 37: 360,
	38: 370, 39: 370,
	40: 380, 41: 380, 42: 380,
	43: 390, 44: 390,
	45: 400, 46: 400, 47: 400, 48: 400, 49: 400, 50: 400
};

const calculateScore = (correct, totalQuestions) => {
	if (correct < 0) return 200;
	let scoreMap = SCORE_MAP_40;
	switch (totalQuestions) {
		case TOTAL_QUESTIONS_CHEMISTRY:
			scoreMap = SCORE_MAP_30;
			break;
		case TOTAL_QUESTIONS_READING:
			scoreMap = SCORE_MAP_50;
			break;
		default:
			scoreMap = SCORE_MAP_40;
	}
	if (correct > totalQuestions) correct = totalQuestions;
	return scoreMap[correct] || 200;
};

// --- Subject Topic Maps ---
const BIOLOGY_TOPICS = [
	"Cell Biology", "Genetics & Evolution", "Physiology", "Ecology & Biochemistry"
];

const CHEMISTRY_TOPICS = [
	"Stoichiometry & General Concepts", "Atomic & Molecular Structure",
	"Chemical Equilibrium", "Liquids and Solids",
	"Gases", "Acids and Bases",
	"Thermochemistry & Thermodynamics", "Chemical Kinetics"
];

const ORGANIC_CHEMISTRY_TOPICS = [
	"Nomenclature & Structure",
	"Isomers & Stereochemistry",
	"Acids, Bases & Nucleophiles",
	"Substitution & Elimination Reactions",
	"Carbonyl Chemistry",
	"Aromaticity & Spectroscopy",
	"Spectroscopy & Analysis"
];

const READING_TOPICS = [
	"Main Idea & Purpose", "Detail & Inference", "Reasoning & Logic", "Vocabulary in Context", "Passage Analysis"
];

const PHYSICS_TOPICS = [
	"Mechanics & Motion",
	"Fluids & Solids",
	"Electrostatics & Circuits",
	"Magnetism & Induction",
	"Waves & Optics",
	"Thermodynamics & Heat",
	"Modern Physics",
	"Advanced Kinematics"
];

const QUANTITATIVE_TOPICS = [
	"Algebra & Functions",
	"Geometry & Measurement",
	"Data Analysis & Probability",
	"Statistics & Experimental Methods",
	"Logic & Problem Solving"
];

const getTopicList = (subject) => {
	switch (subject) {
		case 'General Chemistry':
			return CHEMISTRY_TOPICS;
		case 'Organic Chemistry':
			return ORGANIC_CHEMISTRY_TOPICS;
		case 'Reading Comprehension':
			return READING_TOPICS;
		case 'Physics':
			return PHYSICS_TOPICS;
		case 'Quantitative Reasoning':
			return QUANTITATIVE_TOPICS;
		case 'Biology':
		default:
			return BIOLOGY_TOPICS;
	}
};

const generateMockBreakdown = (correctCount, subject) => {
	if (correctCount === 'N/A' || correctCount < 0) return [];
	const topicsList = getTopicList(subject);
	let totalQuestions;
	switch (subject) {
		case 'General Chemistry':
		case 'Organic Chemistry':
			totalQuestions = TOTAL_QUESTIONS_CHEMISTRY;
			break;
		case 'Reading Comprehension':
			totalQuestions = TOTAL_QUESTIONS_READING;
			break;
		case 'Physics':
			totalQuestions = TOTAL_QUESTIONS_PHYSICS;
			break;
		case 'Quantitative Reasoning':
			totalQuestions = TOTAL_QUESTIONS_QUANTITATIVE;
			break;
		case 'Biology':
		default:
			totalQuestions = TOTAL_QUESTIONS_BIOLOGY;
	}
	const questionsPerTopic = Math.floor(totalQuestions / topicsList.length);
	let remainderQuestions = totalQuestions % topicsList.length;
	let breakdown = topicsList.map((topic, index) => {
		const baseTotal = questionsPerTopic + (index < remainderQuestions ? 1 : 0);
		return { topic, total: baseTotal, correct: 0 };
	});
	let remainingCorrect = correctCount;
	let finalBreakdown = breakdown.map(item => {
		let estimatedCorrect = Math.min(item.total, Math.round(item.total * (correctCount / totalQuestions)));
		let variance = Math.floor(Math.random() * 3) - 1;
		let finalCorrect = Math.max(0, Math.min(item.total, estimatedCorrect + variance));
		if (finalCorrect > remainingCorrect) {
			finalCorrect = remainingCorrect;
		}
		remainingCorrect -= finalCorrect;
		return { ...item, correct: finalCorrect };
	});
	if (remainingCorrect > 0) {
		for (let i = 0; i < finalBreakdown.length && remainingCorrect > 0; i++) {
			const topic = finalBreakdown[i];
			const added = Math.min(remainingCorrect, topic.total - topic.correct);
			topic.correct += added;
			remainingCorrect -= added;
		}
	}
	const calculateAccuracy = (c, total) => Math.min(100, Math.round((c / total) * 100));
	return finalBreakdown.map(item => {
		const accuracy = calculateAccuracy(item.correct, item.total);
		let color = 'text-red-500';
		let statusIcon = '🧊';
		if (accuracy >= 75) {
			color = 'text-green-500';
			statusIcon = '🔥';
		} else if (accuracy >= 50) {
			color = 'text-indigo-500';
			statusIcon = '⚙️';
		}
		return {
			...item,
			accuracy,
			color,
			statusIcon
		};
	});
};

const initialTestData = [
	{ id: 1, name: "Practice Test 1", total: TOTAL_QUESTIONS_BIOLOGY, attempts: 3, tagged: 10, history: [
		{ attempt: 1, correct: 28, score: calculateScore(28, TOTAL_QUESTIONS_BIOLOGY), date: "Oct 10, 2025", durationInSeconds: 450 },
		{ attempt: 2, correct: 34, score: calculateScore(34, TOTAL_QUESTIONS_BIOLOGY), date: "Oct 25, 2025", durationInSeconds: 380 },
		{ attempt: 3, correct: 38, score: calculateScore(38, TOTAL_QUESTIONS_BIOLOGY), date: "Nov 10, 2025", durationInSeconds: 240 },
	]},
	{ id: 2, name: "Practice Test 2", total: TOTAL_QUESTIONS_BIOLOGY, attempts: 2, tagged: 15, history: [
		{ attempt: 1, correct: 25, score: calculateScore(25, TOTAL_QUESTIONS_BIOLOGY), date: "Oct 20, 2025", durationInSeconds: 520 },
		{ attempt: 2, correct: 31, score: calculateScore(31, TOTAL_QUESTIONS_BIOLOGY), date: "Nov 5, 2025", durationInSeconds: 480 },
	]},
	{ id: 3, name: "Practice Test 3", total: TOTAL_QUESTIONS_BIOLOGY, attempts: 1, tagged: 20, history: [
		{ attempt: 1, correct: 39, score: calculateScore(39, TOTAL_QUESTIONS_BIOLOGY), date: "Oct 28, 2025", durationInSeconds: 700 },
	]},
	{ id: 4, name: "Practice Test 4", total: TOTAL_QUESTIONS_BIOLOGY, attempts: 0, tagged: 0, history: [] },
	{ id: 5, name: "Practice Test 5", total: TOTAL_QUESTIONS_BIOLOGY, attempts: 3, tagged: 12, history: [
		{ attempt: 1, correct: 32, score: calculateScore(32, TOTAL_QUESTIONS_BIOLOGY), date: "Oct 1, 2025", durationInSeconds: 300 },
		{ attempt: 2, correct: 33, score: calculateScore(33, TOTAL_QUESTIONS_BIOLOGY), date: "Oct 10, 2025", durationInSeconds: 320 },
		{ attempt: 3, correct: 37, score: calculateScore(37, TOTAL_QUESTIONS_BIOLOGY), date: "Oct 20, 2025", durationInSeconds: 280 },
	]},
	{ id: 6, name: "Practice Test 6", total: TOTAL_QUESTIONS_BIOLOGY, attempts: 2, tagged: 8, history: [
		{ attempt: 1, correct: 20, score: calculateScore(20, TOTAL_QUESTIONS_BIOLOGY), date: "Sep 20, 2025", durationInSeconds: 210 },
		{ attempt: 2, correct: 29, score: calculateScore(29, TOTAL_QUESTIONS_BIOLOGY), date: "Oct 1, 2025", durationInSeconds: 260 },
	]},
	{ id: 7, name: "Practice Test 7", total: TOTAL_QUESTIONS_BIOLOGY, attempts: 3, tagged: 10, history: [
		{ attempt: 1, correct: 22, score: calculateScore(22, TOTAL_QUESTIONS_BIOLOGY), date: "Sep 15, 2025", durationInSeconds: 350 },
		{ attempt: 2, correct: 20, score: calculateScore(20, TOTAL_QUESTIONS_BIOLOGY), date: "Sep 20, 2025", durationInSeconds: 410 },
		{ attempt: 3, correct: 21, score: calculateScore(21, TOTAL_QUESTIONS_BIOLOGY), date: "Sep 25, 2025", durationInSeconds: 390 },
	]},
	{ id: 8, name: "Practice Test 8", total: TOTAL_QUESTIONS_BIOLOGY, attempts: 0, tagged: 0, history: [] },
	{ id: 9, name: "Practice Test 9", total: TOTAL_QUESTIONS_BIOLOGY, attempts: 2, tagged: 20, history: [
		{ attempt: 1, correct: 30, score: calculateScore(30, TOTAL_QUESTIONS_BIOLOGY), date: "Aug 20, 2025", durationInSeconds: 650 },
		{ attempt: 2, correct: 35, score: calculateScore(35, TOTAL_QUESTIONS_BIOLOGY), date: "Sep 10, 2025", durationInSeconds: 580 },
	]},
	{ id: 10, name: "Practice Test 10", total: TOTAL_QUESTIONS_BIOLOGY, attempts: 1, tagged: 10, history: [
		{ attempt: 1, correct: 30, score: calculateScore(30, TOTAL_QUESTIONS_BIOLOGY), date: "Sep 5, 2025", durationInSeconds: 330 },
	]},
];

const appSubjectLinks = [
	{ name: 'Biology', icon: Dna, isChild: true },
	{ name: 'General Chemistry', icon: FlaskConical, isChild: true },
	{ name: 'Organic Chemistry', icon: Atom, isChild: true },
	{ name: 'Reading Comprehension', icon: BookOpen, isChild: true },
	{ name: 'Physics', icon: Lightbulb, isChild: true },
	{ name: 'Quantitative Reasoning', icon: Calculator, isChild: true },
];

const navigation = {
	STUDY: [
		{ name: 'Subjects', icon: GraduationCap, isCollapsible: true, children: appSubjectLinks },
		{ name: 'Full Length Tests', icon: ClipboardList },
	],
	REVIEW: [
		{ name: 'Previous Tests', icon: Clock },
		{ name: 'Tagged Questions', icon: Tag },
	],
};

const getSubjectColors = (subjectName) => {
	return SUBJECT_COLOR_MAP[subjectName] || SUBJECT_COLOR_MAP['Biology'];
};

const getMotivationalQuote = (subject) => {
	const baseClasses = "text-center text-lg font-medium leading-tight";
	const quoteTextColor = 'text-white';
	let quoteText;
	switch (subject) {
		case 'General Chemistry':
			quoteText = `Don't let your motivation reach equilibrium! Keep pushing that reaction forward, because you are the activation energy your prep needs! ⚡`;
			break;
		case 'Organic Chemistry':
			quoteText = `Hydrocarbons fuel the world, and your determination fuels your prep. 🔥`;
			break;
		case 'Reading Comprehension':
			quoteText = `Every passage has a heartbeat, and your job is to find its rhythm. Read less like a scanner, more like a detective. 🧠`;
			break;
		case 'Physics':
		case 'Quantitative Reasoning':
			quoteText = `Apply the Laws of Dedication and achieve maximum Velocity toward your goal! ✨`;
			break;
		case 'Biology':
		default:
			quoteText = `Remember, mitochondria is the powerhouse of the cell, and you are the powerhouse of your prep 🔋`;
			break;
	}
	return (
		<p className={`${baseClasses} ${quoteTextColor}`}>
			<span>{quoteText}</span>
		</p>
	);
};

const cssStyles = `
	.main-content {
		flex-grow: 1;
		padding: 0 2.5rem 2.5rem 2.5rem;
		min-height: 100vh;
	}
	@keyframes spin {
	  from { transform: rotate(0deg); }
	  to { transform: rotate(360deg); }
	}
	.animate-spin {
	  animation: spin 1s linear infinite;
	}
	.watermark-text {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) rotate(30deg);
		transform-origin: center center;
		font-size: 8rem;
		font-weight: 900;
		opacity: 0.15;
		z-index: 0;
		pointer-events: none;
		white-space: nowrap;
		text-transform: uppercase;
		line-height: 1;
	}
	.markdown-content ul, .markdown-content ol {
		margin: 0;
		padding-left: 1.5em;
	}
	.markdown-content li {
		margin-bottom: 0.25em;
	}
	.markdown-content br {
		content: "";
		display: none;
	}
	.stat-pill-v2 {
		padding: 1rem;
		border-radius: 0.75rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
		border: 2px solid #000000;
		transition: transform 0.2s;
		position: relative;
		z-index: 10;
	}
	.stat-pill-v2:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
	}
	.stat-pill-v2 > svg {
		filter: drop-shadow(0 0 2px rgba(0,0,0,0.2));
	}
	.card-shadow {
		box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
	}
	.stat-icon-v2 {
		width: 32px;
		height: 32px;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		margin-bottom: 8px;
	}
	@media (max-width: 768px) {
		 .main-content {
			 padding: 1rem;
		 }
		 .stat-pill-v2 {
			 padding: 0.75rem 0.25rem;
		 }
		 .stat-icon-v2 {
			 width: 24px;
			 height: 24px;
		 }
		 .flex-col .md\\:w-2\\/5 {
			 width: 100%;
			 border-radius: 0.75rem 0.75rem 0 0;
		 }
		 .flex-grow.p-6.md\\:p-8 {
			 padding: 1rem;
		 }
	}
`;

const App = () => {
	const [activeLink, setActiveLink] = useState('Biology');
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const [isSubjectsOpen, setIsSubjectsOpen] = useState(true);
	const [testData, setTestData] = useState(initialTestData);
	const defaultTestId = initialTestData.find(t => t.attempts > 0)?.id || initialTestData[0].id;
	const [selectedTestId, setSelectedTestId] = useState(defaultTestId);
	const initialSelectedAttempt = initialTestData.find(t => t.id === defaultTestId)?.attempts || 1;
	const [selectedAttempt, setSelectedAttempt] = useState(initialSelectedAttempt);
	const [message, setMessage] = useState(null);
	const [isResetModalOpen, setIsResetModalOpen] = useState(false);
	const [isSingleResetConfirmOpen, setIsSingleResetConfirmOpen] = useState(false);
	const [isChatModalOpen, setIsChatModalOpen] = useState(false);
	const [chatHistory, setChatHistory] = useState([]);
	const [isChatLoading, setIsChatLoading] = useState(false);

	const selectedTest = useMemo(() => testData.find(t => t.id === selectedTestId), [selectedTestId, testData]);

	const selectedMetrics = useMemo(() => {
		if (!selectedTest) {
			return { correct: 'N/A', total: 0, score: 0, date: 'N/A', duration: 0, isUnattempted: true, topicBreakdown: [] };
		}
		const isUnattempted = selectedTest.attempts === 0;
		let currentTotalQuestions;
		switch (activeLink) {
			case 'General Chemistry':
			case 'Organic Chemistry':
				currentTotalQuestions = TOTAL_QUESTIONS_CHEMISTRY;
				break;
			case 'Reading Comprehension':
				currentTotalQuestions = TOTAL_QUESTIONS_READING;
				break;
			case 'Physics':
				currentTotalQuestions = TOTAL_QUESTIONS_PHYSICS;
				break;
			case 'Quantitative Reasoning':
				currentTotalQuestions = TOTAL_QUESTIONS_QUANTITATIVE;
				break;
			case 'Biology':
			default:
				currentTotalQuestions = selectedTest.total;
		}
		if (isUnattempted) {
			return {
				correct: 'N/A',
				total: currentTotalQuestions,
				score: 200,
				date: 'N/A',
				duration: 0,
				isUnattempted: true,
				topicBreakdown: []
			};
		}
		const metrics = selectedTest.history.find(h => h.attempt === selectedAttempt);
		let currentCorrect = metrics?.correct || 0;
		currentCorrect = Math.min(currentCorrect, currentTotalQuestions);
		return {
			correct: currentCorrect,
			total: currentTotalQuestions,
			score: calculateScore(currentCorrect, currentTotalQuestions),
			date: metrics?.date || 'N/A',
			duration: metrics?.durationInSeconds || 0,
			isUnattempted: false,
			topicBreakdown: generateMockBreakdown(currentCorrect, activeLink)
		};
	}, [selectedTest, selectedAttempt, activeLink]);

	useEffect(() => {
		if (selectedTest) {
			setSelectedAttempt(Math.max(1, selectedTest.attempts));
			setChatHistory([]);
		}
	}, [selectedTest]);

	const showMessage = (text) => {
		setMessage(text);
	};

	const handleCloseMessage = () => {
		setMessage(null);
	};

	const selectTest = (id) => {
		setSelectedTestId(id);
	};

	const handleSingleTestReset = (testId) => {
		setTestData(prevData =>
			prevData.map(test => {
				if (test.id === testId) {
					return {
						...test,
						attempts: 0,
						history: [],
					};
				}
				return test;
			})
		);
		setSelectedAttempt(1);
		setIsSingleResetConfirmOpen(false);
		showMessage(`Successfully reset progress for ${selectedTest.name}.`);
	};

	const handleOpenMultiResetModal = () => {
		setIsResetModalOpen(true);
	};

	const handleConfirmMultiReset = (testIdsToReset) => {
		setTestData(prevData =>
			prevData.map(test => {
				if (testIdsToReset.includes(test.id)) {
					return {
						...test,
						attempts: 0,
						history: [],
					};
				}
				return test;
			})
		);
		setIsResetModalOpen(false);
		if (selectedTestId && testIdsToReset.includes(selectedTestId)) {
			setSelectedAttempt(1);
			const firstTestId = initialTestData[0].id;
			setSelectedTestId(firstTestId);
		}
		showMessage(`Successfully reset progress for ${testIdsToReset.length} test(s)!`);
	};

	const handleReviewClick = (test) => {
		if (selectedAttempt > 0 && selectedAttempt <= test.attempts) {
			showMessage(`Initiating review for attempt ${selectedAttempt} (Scored: ${selectedMetrics.score}) of ${test.name}.`);
		} else if (test.attempts === 0) {
			showMessage(`${test.name} has not been attempted yet.`);
		} else {
			 showMessage(`Attempt ${selectedAttempt} not found. Latest attempt is ${test.attempts}.`);
		}
	};

	const handleChatOpen = () => {
		if (!selectedTest) {
			 showMessage("Please select a subject and a practice test before opening the AI Tutor.");
			 return;
		}
		setIsChatModalOpen(true);
	};

	const handleChatClose = () => setIsChatModalOpen(false);

	const handleSendMessage = async (userMessage) => {
		if (!userMessage.trim() || isChatLoading) return;
		const newUserHistory = [...chatHistory, { role: 'user', parts: [{ text: userMessage }] }];
		setChatHistory(newUserHistory);
		setIsChatLoading(true);
		const currentTestStatus = selectedMetrics.isUnattempted
			? `Status: Unattempted. Total Questions: ${selectedMetrics.total}.`
			: `Status: Attempted (Attempt ${selectedAttempt}). Score: ${selectedMetrics.score}/${selectedMetrics.total}.`;
		const systemPrompt = `You are an expert academic tutor named 'AI Tutor' specializing in the ${activeLink} test area. You are currently assisting a student reviewing their performance on '${selectedTest.name}'.
Test Context: ${currentTestStatus} The student is looking for highly focused, actionable, and encouraging study advice related to ${activeLink}.
Keep responses concise and use markdown formatting (lists, bolding) for clarity.`;
		const payload = {
			contents: newUserHistory,
			systemInstruction: {
				parts: [{ text: systemPrompt }]
			},
		};
		try {
			const responseData = await fetchWithRetry(GEMINI_API_URL + API_KEY, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			});
			const aiResponseText = responseData.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process that question right now. Please try again.";
			setChatHistory(prev => [
				...prev,
				{ role: 'model', parts: [{ text: aiResponseText }] }
			]);
		} catch (err) {
			console.error("Gemini Chat API Error:", err);
			setChatHistory(prev => [
				...prev,
				{ role: 'model', parts: [{ text: "🚨 **Error:** Failed to connect to the AI service. Please check your connection or try again later." }] }
			]);
		} finally {
			setIsChatLoading(false);
		}
	};

	const handleClearChat = () => {
		setChatHistory([]);
		showMessage("Chat history cleared. Start a new conversation!");
	};

	const completedTests = useMemo(() => testData.filter(t => t.attempts > 0), [testData]);
	const currentSubjectColors = getSubjectColors(activeLink);

	const AIChatModal = ({ open, onClose, chatHistory, isChatLoading, onSendMessage, selectedTest, activeLink, onClearChat, selectedAttempt, selectedMetrics }) => {
		const modalClasses = `
			fixed bottom-4 right-4 z-50 transition-all duration-300 ease-in-out
			${open ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}
		`;
		const [input, setInput] = useState('');
		const chatEndRef = useRef(null);
		const handleInputSubmit = (e) => {
			e.preventDefault();
			const message = input.trim();
			if (message) {
				onSendMessage(message);
				setInput('');
			}
		};
		useEffect(() => {
			chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
		}, [chatHistory]);
		const initialMessage = selectedTest?.attempts === 0
			? `Hello! I'm your AI Tutor for **${activeLink}**. This test hasn't been attempted yet. Ask me general questions about ${activeLink} concepts!`
			: `Welcome back! You're currently reviewing **${selectedTest?.name}** (Attempt ${selectedAttempt}, Score ${selectedMetrics.score}). Ask me anything about ${activeLink} concepts or how to improve your weakest areas!`;
		const renderMarkdown = (text) => {
			if (!text) return null;
			let html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
			const listRegex = /^\s*(\*|\d+\.) (.*)$/gm;
			const lines = html.split('\n');
			let inList = false;
			let listType = '';
			let newHtml = '';
			for (const line of lines) {
				const match = line.match(listRegex);
				if (match) {
					const listItemText = match[0].replace(/(\*|\d+\.) /, '').trim();
					const currentType = line.includes('*') ? 'ul' : 'ol';
					if (!inList) {
						listType = currentType;
						newHtml += `<${listType}><li>${listItemText}</li>`;
						inList = true;
					} else if (currentType !== listType) {
						newHtml += `</${listType}><${currentType}><li>${listItemText}</li>`;
						listType = currentType;
					} else {
						newHtml += `<li>${listItemText}</li>`;
					}
				} else {
					if (inList) {
						newHtml += `</${listType}>`;
						inList = false;
					}
					newHtml += line.trim() + '\n';
				}
			}
			if (inList) {
				newHtml += `</${listType}>`;
			}
			newHtml = newHtml.replace(/\n/g, '<br/>');
			return <div className="markdown-content" dangerouslySetInnerHTML={{ __html: newHtml }} />;
		};
		return (
			<div className={modalClasses}>
				<div className="bg-white rounded-xl shadow-2xl max-w-sm w-screen h-[60vh] flex flex-col transform">
					<div className="flex justify-between items-center p-4 border-b border-indigo-200 bg-indigo-600 rounded-t-xl">
						<h3 className="text-xl font-bold text-white flex items-center">
							<Cpu className="w-5 h-5 mr-3" /> AI Tutor
						</h3>
						<div className="flex space-x-2">
							<button
								onClick={onClearChat}
								title="Clear Chat History"
								className="p-2 rounded-full text-white hover:bg-indigo-700 transition duration-150"
							>
								<Trash2 className="w-5 h-5" />
							</button>
							<button onClick={onClose} className="p-2 rounded-full text-white hover:bg-indigo-700 transition duration-150">
								<X className="w-5 h-5" />
							</button>
						</div>
					</div>
					<div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50">
						{chatHistory.length === 0 && (
							<div className="flex justify-start">
								<div className="bg-indigo-100 p-3 rounded-xl max-w-[85%] shadow-sm text-gray-800 text-sm border-l-4 border-indigo-400">
									{renderMarkdown(initialMessage)}
								</div>
							</div>
						)}
						{chatHistory.map((msg, index) => (
							<div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
								<div className={`p-3 rounded-xl max-w-[85%] shadow-md text-sm ${
									msg.role === 'user'
										? 'bg-blue-500 text-white rounded-br-none'
										: 'bg-white text-gray-800 rounded-tl-none border border-gray-200'
								}`}>
									{renderMarkdown(msg.parts[0].text)}
								</div>
							</div>
						))}
						{isChatLoading && (
							<div className="flex justify-start">
								<div className="bg-white p-3 rounded-xl max-w-[85%] shadow-md text-sm text-gray-500 border border-gray-200 animate-pulse">
									<RotateCw className="w-4 h-4 mr-2 inline-block animate-spin" />
									AI Tutor is typing...
								</div>
							</div>
						)}
						<div ref={chatEndRef} />
					</div>
					<form onSubmit={handleInputSubmit} className="p-4 border-t border-gray-200 bg-white flex space-x-3 rounded-b-xl">
						<input
							type="text"
							value={input}
							onChange={(e) => setInput(e.target.value)}
							disabled={isChatLoading}
							placeholder="Ask a question..."
							className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
						/>
						<button
							type="submit"
							disabled={isChatLoading || !input.trim()}
							className="p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-150 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md shadow-indigo-500/50"
						>
							<Send className="w-5 h-5" />
						</button>
					</form>
				</div>
			</div>
		);
	};

	const FloatingChatBubble = ({ onClick, isChatModalOpen, isUnattempted }) => {
		if (isChatModalOpen) return null;
		const disabled = isUnattempted && !selectedTest;
		return (
			<button
				onClick={onClick}
				disabled={disabled}
				className={`fixed bottom-4 right-4 p-3 rounded-full shadow-2xl transition-all duration-300 transform
					${disabled
						? 'bg-gray-400 cursor-not-allowed opacity-70'
						: 'bg-indigo-600 hover:bg-indigo-700 scale-100 hover:scale-105 active:scale-95'
					}
					z-40 text-white
				`}
				title={disabled ? "Select a subject/test first" : "Open AI Tutor Chat"}
			>
				<MessageSquare className="w-6 h-6" />
			</button>
		);
	};

	const SingleResetConfirmModal = ({ open, test, onClose, onConfirm }) => {
		if (!open || !test) return null;
		return (
			<div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 transition-opacity">
				<div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full transform transition-all">
					<div className="flex justify-between items-start border-b pb-3 mb-4">
						<h3 className="text-xl font-bold text-gray-900">Confirm Reset</h3>
						<button onClick={onClose} className="text-gray-400 hover:text-gray-600">
							<X className="w-5 h-5" />
						</button>
					</div>
					<p className="text-base text-gray-700 mb-6">
						Are you sure you want to **completely reset all progress** for:
						<br/>
						<span className="font-semibold text-red-600">{test.name}</span>?
						<br/>
						This action cannot be undone and all {test.attempts} attempt(s) will be cleared.
					</p>
					<div className="flex justify-end space-x-3 border-t pt-4">
						<button
							onClick={onClose}
							className="px-4 py-2 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-100"
						>
							Cancel
						</button>
						<button
							onClick={() => onConfirm(test.id)}
							className="px-4 py-2 text-white rounded-lg text-sm font-semibold transition bg-red-600 hover:bg-red-700 shadow-lg shadow-red-500/50"
						>
							Reset
						</button>
					</div>
				</div>
			</div>
		);
	};

	const ResetSelectionModal = ({ open, completedTests, onClose, onConfirm }) => {
		const [selectedTests, setSelectedTests] = useState([]);
		useEffect(() => {
			if (open) {
				setSelectedTests([]);
			}
		}, [open]);
		const toggleTest = (testId) => {
			setSelectedTests(prev => {
				const isSelected = prev.includes(testId);
				if (isSelected) {
					return prev.filter(id => id !== testId);
				} else if (prev.length < 3) {
					return [...prev, testId];
				}
				return prev;
			});
		};
		const handleConfirm = () => {
			if (selectedTests.length > 0) {
				onConfirm(selectedTests);
			} else {
				onClose();
			}
		};
		if (!open) return null;
		return (
			<div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 transition-opacity">
				<div className="bg-white p-6 rounded-xl shadow-2xl max-w-lg w-full transform transition-all">
					<div className="flex justify-between items-start border-b pb-3 mb-4">
						<h3 className="text-xl font-bold text-gray-900">Select Tests to Reset (Max 3)</h3>
						<button onClick={onClose} className="text-gray-400 hover:text-gray-600">
							<X className="w-5 h-5" />
						</button>
					</div>
					<p className="text-sm text-gray-600 mb-4">Choose 1, 2, or 3 tests to completely wipe their scores and attempts.</p>
					<div className="space-y-3 max-h-60 overflow-y-auto pr-2">
						{completedTests.map(test => {
							const lastAttemptDate = test.history.length > 0 ? test.history[test.history.length - 1].date : 'N/A';
							return (
								<div
									key={test.id}
									className={`flex justify-between items-center p-3 rounded-lg border cursor-pointer transition ${
										selectedTests.includes(test.id)
										? 'bg-red-50 border-red-400 ring-2 ring-red-400'
										: 'bg-white border-gray-200 hover:bg-gray-50'
									}`}
									onClick={() => toggleTest(test.id)}
								>
									<div className="flex flex-col">
										<span className="font-medium text-gray-800">{test.name}</span>
										<span className="text-xs text-gray-400">Last Attempt: {lastAttemptDate}</span>
									</div>
									<span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${selectedTests.includes(test.id) ? 'bg-red-600 text-white shadow-md' : 'bg-gray-200 text-gray-600'}`}>
										{selectedTests.includes(test.id) ? 'Selected for Reset' : `Attempts: ${test.attempts}`}
									</span>
								</div>
							);
						})}
						{completedTests.length === 0 && (
							<p className="text-center text-gray-400 italic py-5">No tests have been attempted yet to reset.</p>
						)}
					</div>
					<div className="flex justify-end space-x-3 mt-6 border-t pt-4">
						<button
							onClick={onClose}
							className="px-4 py-2 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-100"
						>
							Cancel
						</button>
						<button
							onClick={handleConfirm}
							disabled={selectedTests.length === 0}
							className={`px-4 py-2 text-white rounded-lg text-sm font-semibold transition ${
								selectedTests.length > 0
								? 'bg-red-600 hover:bg-red-700 shadow-lg shadow-red-500/50'
								: 'bg-gray-400 cursor-not-allowed'
							}`}
						>
							Reset {selectedTests.length} Test{selectedTests.length !== 1 ? 's' : ''}
						</button>
					</div>
				</div>
			</div>
		);
	};

	const getItemClasses = (linkName, isCollapsible = false, isChild = false) => {
		const isActive = activeLink === linkName || (isChild && activeLink === linkName);
		const isSubject = appSubjectLinks.some(link => link.name === linkName);
		const subjectColors = isSubject ? getSubjectColors(linkName) : SUBJECT_COLOR_MAP.General;
		const primaryHex = subjectColors.primaryHex;
		const isDisabled = false;
		const baseClasses = `flex items-center py-3 font-medium transition duration-150 rounded-lg mx-2
			${isDisabled ? 'cursor-default opacity-50' : 'cursor-pointer'}
			${isActive
				? `text-white shadow-xl shadow-indigo-700/30`
				: 'text-gray-300 hover:bg-gray-800'
			}`;
		const activeStyle = isActive ? { backgroundColor: primaryHex, color: 'white' } : {};
		let paddingClasses = '';
		if (isCollapsible) {
			paddingClasses = 'px-3 text-xl justify-between';
		} else if (isChild) {
			paddingClasses = 'px-3 text-lg space-x-3';
		} else {
			paddingClasses = 'px-3 text-lg space-x-3';
		}
		const indentationClass = (isChild && isSidebarOpen) ? 'pl-10' : '';
		const iconColorClass = isActive ? subjectColors.quoteAccentClass : 'text-gray-500';
		return {
			container: `${baseClasses} ${paddingClasses} ${indentationClass}`,
			style: activeStyle,
			icon: `w-6 h-6 flex-shrink-0 ${iconColorClass}`,
			text: `${isActive ? 'text-white' : 'text-gray-300'}`,
			isDisabled: isDisabled,
			IconComponent: getSubjectColors(linkName).icon
		};
	};

	const handleLinkClick = (linkName, isSubjectsParent = false, isChild = false) => {
		if (isSubjectsParent) {
			setIsSubjectsOpen(!isSubjectsOpen);
		} else {
			setActiveLink(linkName);
			const isSubjectLink = appSubjectLinks.some(link => link.name === linkName);
			if (isSubjectLink && testData.length > 0) {
				setSelectedTestId(testData[0].id);
			}
		}
	};

	const TestSelectorConsole = ({ selectedTest, selectedAttempt, setSelectedAttempt }) => {
		const [expandedTestId, setExpandedTestId] = useState(selectedTestId);
		useEffect(() => {
			setExpandedTestId(selectedTestId);
		}, [selectedTestId]);
		const activeSubjectColors = getSubjectColors(activeLink);
		const activeItemStyle = {
			backgroundColor: activeSubjectColors.secondaryHex,
			borderLeft: `4px solid ${activeSubjectColors.primaryHex}`,
			color: '#1f2937',
			fontWeight: '900',
			boxShadow: `0 4px 6px -1px ${activeSubjectColors.primaryHex}70`
		};
		return (
			<div className="w-full h-full bg-gray-900 border-r border-gray-700 px-0 flex flex-col rounded-l-xl">
				<div className="py-3 px-4 mb-0 border-b border-gray-700">
					<div className="flex items-center">
						<ClipboardList className="w-6 h-6 mr-3 text-indigo-400" />
						<span className="text-xl font-bold text-gray-300">Practice Tests</span>
					</div>
				</div>
				<div className="flex-grow overflow-y-auto pt-8">
					{testData.map(test => {
						const parts = test.name.split(' ');
						const name = parts.slice(0, 2).join(' ');
						const number = parts[2];
						const isActive = test.id === selectedTestId;
						const isExpanded = test.id === expandedTestId;
						const rightContent = test.attempts > 0
							? isActive
								? `Attempt ${selectedAttempt}`
								: `Attempts: ${test.attempts}`
							: 'Not attempted';
						const itemClasses = isActive
							? ''
							: 'bg-gray-700 text-gray-300 hover:bg-gray-600';
						const itemStyle = isActive ? activeItemStyle : {};
						const rightTextColor = isActive ? 'text-gray-900' : 'text-gray-400';
						return (
							<React.Fragment key={test.id}>
								<div
									className={`flex justify-between items-center px-4 py-5 cursor-pointer transition rounded-none border-b border-gray-800 ${itemClasses}`}
									style={itemStyle}
									onClick={() => {
										selectTest(test.id);
										setExpandedTestId(isExpanded ? null : test.id);
									}}
								>
									<div className="flex flex-col flex-grow min-w-0 pr-2">
										<span className={`text-xl font-extrabold whitespace-nowrap truncate ${isActive ? 'text-black' : 'text-gray-300'}`}>
											{name} <span className="font-extrabold">{number}</span>
										</span>
									</div>
									<div className="flex items-center space-x-2 flex-shrink-0">
										<span className={`text-lg font-medium ${rightTextColor} whitespace-nowrap`}>
											{rightContent}
										</span>
										{test.attempts > 0 && (
											<ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''} ${isActive ? 'text-black' : 'text-gray-400'}`} />
										)}
									</div>
								</div>
								{isExpanded && test.attempts > 0 && (
									<div className={`pl-6 pr-3 pt-3 pb-3 bg-gray-800 rounded-b-lg border-l-4`} style={{ borderLeftColor: activeSubjectColors.primaryHex }}>
										<div className="flex flex-wrap gap-2">
											{Array.from({ length: test.attempts }, (_, i) => i + 1).map(attempt => (
												<button
													key={attempt}
													onClick={() => setSelectedAttempt(attempt)}
													className={`px-2 py-0.5 rounded-full text-xs font-bold transition duration-150 shadow-sm w-9 h-9 flex items-center justify-center ${
														attempt === selectedAttempt
														? 'text-gray-900 shadow-md ring-2 ring-sky-400/50'
														: 'bg-gray-700 text-gray-300 hover:bg-gray-600'
													}`}
													style={attempt === selectedAttempt ? { backgroundColor: activeSubjectColors.secondaryHex, outline: `2px solid ${activeSubjectColors.primaryHex}` } : {}}
													title={`Select Attempt ${attempt}`}
												>
													{attempt}
												</button>
											))}
										</div>
									</div>
								)}
							</React.Fragment>
						);
					})}
				</div>
			</div>
		);
	};

	const SubjectHeaderBlock = ({ activeLink, currentSubjectColors }) => {
		const bannerStyle = { backgroundColor: currentSubjectColors.primaryHex };
		let quoteText;
		let largeTitle = activeLink;
		switch (activeLink) {
			case 'Biology':
				quoteText = `Remember, mitochondria is the powerhouse of the cell, and you are the powerhouse of your prep 🔋`;
				break;
			case 'General Chemistry':
				quoteText = `Don't let your motivation reach equilibrium! Keep pushing that reaction forward, because you are the activation energy your prep needs! ⚡`;
				break;
			case 'Organic Chemistry':
				quoteText = `Hydrocarbons fuel the world, and your determination fuels your prep. 🔥`;
				break;
			case 'Reading Comprehension':
				quoteText = `Every passage has a heartbeat, and your job is to find its rhythm. Read less like a scanner, more like a detective. 🧠`;
				break;
			case 'Physics':
			case 'Quantitative Reasoning':
				quoteText = `Apply the Laws of Dedication and achieve maximum Velocity toward your goal! ✨`;
				break;
			default:
				quoteText = `Welcome to your subject dashboard.`;
		}
		return (
			<header className="flex flex-col text-center mb-6">
				<div
					className={`mx-auto w-full px-8 py-5 rounded-xl shadow-xl transition-colors duration-300`}
					style={bannerStyle}
				>
					<div className="flex items-center justify-center space-x-3 mb-2">
						<h1 className="text-4xl font-extrabold tracking-tight text-white">
							{largeTitle}
						</h1>
						<span className="text-4xl font-extrabold tracking-tight text-white">
							{currentSubjectColors.iconEmoji}
						</span>
					</div>
					{getMotivationalQuote(activeLink)}
				</div>
			</header>
		);
	};

	const EmptyDashboardView = ({ activeLink, currentSubjectColors }) => {
		const primaryHex = currentSubjectColors.primaryHex;
		const secondaryHex = currentSubjectColors.secondaryHex;
		let icon, description;
		switch (activeLink) {
			case 'Full Length Tests':
				icon = <ClipboardList className="w-16 h-16" style={{ color: primaryHex }} />;
				description = "Start a new full-length simulation or continue your last test here.";
				break;
			case 'Previous Tests':
				icon = <Clock className="w-16 h-16" style={{ color: primaryHex }} />;
				description = "Your complete history and detailed score reports will be accessible here.";
				break;
			case 'Tagged Questions':
				icon = <Tag className="w-16 h-16" style={{ color: primaryHex }} />;
				description = "Review all questions you have flagged across any subject or test.";
				break;
			case 'Home':
			default:
				icon = <Home className="w-16 h-16" style={{ color: primaryHex }} />;
				description = "Welcome to your dashboard. Select a subject to get started!";
				break;
		}
		return (
			<div className="bg-white card-shadow rounded-xl p-10 transition-all duration-300 min-h-[70vh] flex flex-col items-center justify-center">
				<div
					className="p-8 rounded-full mb-6"
					style={{ backgroundColor: secondaryHex, boxShadow: `0 0 20px ${primaryHex}80` }}
				>
					{icon}
				</div>
				<h2 className="text-3xl font-extrabold text-gray-900 mb-2">{activeLink}</h2>
				<p className="text-lg text-gray-600 text-center max-w-md">{description}</p>
			</div>
		);
	};

	const SubjectDashboardView = ({
		test,
		metrics,
		handleReviewClick,
		activeLink,
	}) => {
		if (!test || !appSubjectLinks.some(link => link.name === activeLink)) {
			return (
				<div className="bg-white card-shadow rounded-xl p-10 transition-all duration-300 min-h-[70vh]">
					<p className="text-gray-500 text-center py-20">Select a practice test in the left panel to load metrics for {activeLink}.</p>
				</div>
			);
		}
		const [isTopicsExpanded, setIsTopicsExpanded] = useState(false);
		const MAX_INITIAL_TOPICS = 4;
		const MAX_ATTEMPTS = 3;
		const isUnattempted = metrics.isUnattempted;
		const isMaxAttempts = test.attempts >= MAX_ATTEMPTS;
		const displayScore = roundToNearestTen(metrics.score);
		const scoreColorClass = getScoreColorClass(metrics.score);
		const scoreText = isUnattempted ? 'N/A' : displayScore;
		const correctText = isUnattempted ? 'N/A' : `${metrics.correct}/${metrics.total}`;
		const displayDate = isUnattempted ? 'N/A' : metrics.date;
		const displayTimeText = formatDuration(metrics.duration);
		const currentSubjectColors = getSubjectColors(activeLink);
		const watermarkText = "Optofutureprep";
		const topicsToDisplay = useMemo(() => {
			if (!metrics.topicBreakdown) return [];
			return isTopicsExpanded
				? metrics.topicBreakdown
				: metrics.topicBreakdown.slice(0, MAX_INITIAL_TOPICS);
		}, [isTopicsExpanded, metrics.topicBreakdown]);
		const shouldShowToggleButton = metrics.topicBreakdown.length > MAX_INITIAL_TOPICS;
		const startAvailableButtonClass = 'bg-gray-500 hover:bg-gray-600 text-white shadow-lg shadow-gray-500/50';
		const maxAttemptButtonClass = 'bg-gray-400 text-gray-700 cursor-default shadow-inner';
		const reviewButtonClass = 'bg-sky-400 hover:bg-sky-500 text-white rounded-lg text-sm font-semibold shadow-md shadow-sky-400/50 transition duration-150';
		const resetButtonClass = 'bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold shadow-md shadow-red-500/50 transition duration-150';
		const finalStartButtonClass = isMaxAttempts
			? maxAttemptButtonClass
			: startAvailableButtonClass;
		const TopicMasteryMatrix = (
			!isUnattempted && metrics.topicBreakdown.length > 0 && (
				<div className="bg-white p-6 rounded-xl shadow-2xl mb-6 border border-gray-200 shadow-indigo-300/50">
					<h3 className="text-xl font-extrabold text-gray-800 mb-4 flex items-center">
						<currentSubjectColors.icon className={`w-5 h-5 mr-3 text-gray-800`} /> Topic Mastery Matrix
					</h3>
					<div className="space-y-3">
						{topicsToDisplay.map((item, index) => (
							<div key={item.topic} className="flex justify-between items-center py-2 px-3 bg-gray-100 rounded-lg">
								<span className="font-semibold text-gray-900 w-1/3">{item.topic}</span>
								<div className="flex items-center justify-end w-2/3 space-x-4">
									<div className="relative w-full max-w-xs h-2 rounded-full bg-gray-300 overflow-hidden">
										<div
											className={`h-full rounded-full transition-all duration-500 ${item.color.replace('text-', 'bg-')}`}
											style={{ width: `${item.accuracy}%` }}
										></div>
									</div>
									<span className={`text-sm font-extrabold ${item.color} w-12 text-right`}>
										{item.accuracy}%
									</span>
									<span className="text-lg w-5 text-center">
										{item.statusIcon}
									</span>
								</div>
							</div>
						))}
					</div>
					{shouldShowToggleButton && (
						<div className="pt-4 mt-4 border-t border-gray-200">
							<button
								onClick={() => setIsTopicsExpanded(prev => !prev)}
								className="w-full py-2 text-sm font-semibold rounded-lg text-indigo-600 hover:bg-indigo-50 transition duration-150 flex justify-center items-center space-x-2"
							>
								{isTopicsExpanded ? (
									<ChevronUp className="w-4 h-4" />
								) : (
									<ChevronDown className="w-4 h-4" />
								)}
								<span>{isTopicsExpanded ? 'Show Less Topics' : `Show All ${metrics.topicBreakdown.length} Topics`}</span>
							</button>
						</div>
					)}
				</div>
			)
		);
		return (
			<div className="bg-white card-shadow rounded-xl flex flex-col md:flex-row min-h-[70vh] relative overflow-hidden">
				<h1 className="watermark-text" style={{ color: currentSubjectColors.secondaryHex }}>
					{watermarkText}
				</h1>
				<div className="w-full md:w-2/5 flex-shrink-0 z-10">
					<TestSelectorConsole
						selectedTest={test}
						selectedAttempt={selectedAttempt}
						setSelectedAttempt={setSelectedAttempt}
					/>
				</div>
				<div className="flex-grow p-6 md:p-8 flex flex-col justify-between z-10">
					<div>
						<div className="flex justify-between items-center border-b pb-4 mb-6">
							<h2 className="text-3xl font-extrabold text-gray-900">{test.name}</h2>
							<p className="text-sm text-gray-500 whitespace-nowrap pt-1 flex items-center">
								<Clock className="w-4 h-4 mr-1.5 text-gray-400" />
								<span className="font-semibold">Attempt Date:</span>&nbsp;{displayDate}
							</p>
						</div>
						<div className="grid grid-cols-3 gap-6 mb-8">
							<div className="stat-pill-v2 bg-white">
								<Gauge className={`stat-icon-v2 ${scoreColorClass.replace('text-', 'text-')}`} />
								<span className={`${scoreColorClass} font-extrabold text-3xl`}>{scoreText}</span>
								<span className="text-sm text-gray-500 uppercase font-medium mt-1">
									{isUnattempted ? 'Overall Score' : `Score (Attempt ${selectedAttempt})`}
								</span>
							</div>
							<div className="stat-pill-v2 bg-white">
								<Check className="stat-icon-v2 text-green-500" />
								<span className="text-gray-900 font-extrabold text-2xl">{correctText}</span>
								<span className="text-sm text-gray-500 uppercase font-medium mt-1">Correct/Total</span>
							</div>
							<div className="stat-pill-v2 bg-white">
								<Clock className="stat-icon-v2 text-blue-500" />
								<span className="text-gray-900 font-extrabold text-2xl whitespace-nowrap overflow-hidden">
									{displayTimeText}
								</span>
								<span className="text-sm text-gray-500 font-medium mt-1 uppercase">
									{isUnattempted ? 'N/A' : 'TOTAL TIME'}
								</span>
							</div>
						</div>
						{TopicMasteryMatrix}
						{isMaxAttempts && (
							<div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-8 shadow-inner">
								<p className="font-semibold">Maximum Attempts Reached ({MAX_ATTEMPTS}/{MAX_ATTEMPTS})</p>
								<p className="text-sm">You must reset this test to attempt it again.</p>
							</div>
						)}
					</div>
					<div className="flex justify-end space-x-3 pt-4 border-t border-gray-100 mt-auto">
						{test.attempts > 0 && (
							<button
								className={`px-5 py-2 ${resetButtonClass}`}
								onClick={() => setIsSingleResetConfirmOpen(true)}
							>
								Reset
							</button>
						)}
						{test.attempts > 0 && (
							<button
								className={`px-5 py-2 ${reviewButtonClass}`}
								onClick={() => handleReviewClick(test)}
							>
								Review
							</button>
						)}
						<button
							className={`px-6 py-2.5 text-white rounded-lg text-sm font-semibold transition duration-150 ${finalStartButtonClass}`}
							onClick={() => isMaxAttempts ? showMessage("You must reset this test to try again.") : showMessage(`Starting test ${test.id}: ${test.name}.`)}
							disabled={isMaxAttempts}
						>
							{isMaxAttempts ? `Max Attempts (${MAX_ATTEMPTS})` : 'Start'}
						</button>
					</div>
				</div>
			</div>
		);
	};

	const isSubjectLink = (linkName) => appSubjectLinks.some(link => link.name === linkName);

	return (
		<div
			className="flex min-h-screen transition-colors duration-500"
			style={{
				backgroundColor: isSubjectLink(activeLink) ? currentSubjectColors.primaryHex : SUBJECT_COLOR_MAP.General.primaryHex,
				fontFamily: 'Inter, sans-serif'
			}}
		>
			<aside
				className={`transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} text-white min-h-screen flex flex-col p-0 shadow-2xl z-20`}
				style={{ backgroundColor: '#141A29' }}
			>
				<div className={`p-4 mb-4 pt-8 ${isSidebarOpen ? 'justify-between' : 'justify-center'} flex items-center`}>
					<div
						className={`transition-all duration-300 ${isSidebarOpen ? 'px-4 py-2' : 'p-2'} rounded-xl`}
						style={{ backgroundColor: '#20242b' }}
					>
						<span className="text-xl font-bold tracking-tight text-white whitespace-nowrap">
							<span className="text-blue-400">Opto</span>
							<span className="text-white">future</span>
							<span className="text-blue-400">prep</span>
						</span>
					</div>
					{isSidebarOpen && (
						<button
							onClick={() => setIsSidebarOpen(!isSidebarOpen)}
							className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition duration-150 flex-shrink-0 ml-2"
							aria-label={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
						>
							<ChevronLeft className={`w-6 h-6 transition-transform duration-300 ${isSidebarOpen ? '' : 'rotate-180'}`} />
						</button>
					)}
					{!isSidebarOpen && (
						 <Eye className="w-7 h-7 text-sky-400 p-1" />
					)}
				</div>
				{(() => {
					const classes = getItemClasses('Home');
					const HomeIcon = Home;
					const isActive = activeLink === 'Home';
					const homeStyle = isActive ? { backgroundColor: '#20242b' } : {};
					const iconClasses = isActive ? 'text-white' : 'text-gray-400';
					const textClasses = isActive ? 'text-white' : 'text-gray-300';
					return (
						<div className={`mx-2 mb-4 p-0 transition duration-150 rounded-xl ${isActive ? 'shadow-lg shadow-gray-900/50' : 'hover:bg-gray-800'}`}>
							<a
								href="#"
								onClick={() => handleLinkClick('Home')}
								className={`flex items-center py-3 font-medium rounded-xl ${isSidebarOpen ? 'px-4' : 'justify-center p-3'}`}
								style={homeStyle}
							>
								<HomeIcon className={`w-6 h-6 flex-shrink-0 ${iconClasses}`} />
								{isSidebarOpen && <span className={`ml-3 text-lg font-bold ${textClasses}`}>Home</span>}
							</a>
						</div>
					);
				})()}
				<nav className="flex-1 space-y-0 text-sm overflow-y-auto">
					{Object.entries(navigation).map(([sectionTitle, links]) => (
						<React.Fragment key={sectionTitle}>
							{isSidebarOpen && (
								<div className={`px-5 pt-6 pb-2 text-xs uppercase font-medium tracking-wider text-gray-500 ${sectionTitle === 'REVIEW' ? 'border-t border-gray-800 mt-4' : ''}`}>
									{sectionTitle}
								</div>
							)}
							{links.map((link) => {
								if (link.isCollapsible) {
									const parentClasses = getItemClasses(link.name, true);
									const IconComponent = link.icon;
									return (
										<div key={link.name}>
											<a href="#" onClick={() => handleLinkClick(link.name, true)} className={`${parentClasses.container}`} style={parentClasses.style}>
												<div className="flex items-center space-x-3">
													<IconComponent className={parentClasses.icon} />
													{isSidebarOpen && <span className={parentClasses.text}>Subjects</span>}
												</div>
												{isSidebarOpen && (
													<ChevronDown className={`w-5 h-5 ml-auto transition-transform duration-300 ${isSubjectsOpen ? 'rotate-180' : ''}`} />
												)}
											</a>
											{isSubjectsOpen && link.children && isSidebarOpen && link.children.map(childLink => {
												const childClasses = getItemClasses(childLink.name, false, true);
												const ChildIconComponent = childLink.icon;
												return (
													<a
														key={childLink.name}
														href="#"
														onClick={() => handleLinkClick(childLink.name, false, true)}
														className={`${childClasses.container}`}
														style={childClasses.style}
													>
														<ChildIconComponent className={childClasses.icon} />
														<span className={childClasses.text}>{childLink.name}</span>
													</a>
												);
											})}
										</div>
									);
								}
								const standardLinkClasses = getItemClasses(link.name);
								const IconComponentStandard = link.icon;
								return (
									<a key={link.name} href="#" onClick={() => handleLinkClick(link.name)} className={`${standardLinkClasses.container}`} style={standardLinkClasses.style}>
										<IconComponentStandard className={standardLinkClasses.icon} />
										{isSidebarOpen && <span className={standardLinkClasses.text}>{link.name}</span>}
									</a>
								);
							})}
						</React.Fragment>
					))}
				</nav>
				<div className="h-8"></div>
			</aside>
			<div className="main-content flex justify-center pt-10">
				<div className="w-full max-w-6xl">
					{isSubjectLink(activeLink) ? (
						<SubjectHeaderBlock
							activeLink={activeLink}
							currentSubjectColors={currentSubjectColors}
						/>
					) : (
						<header className="flex flex-col text-center mb-6">
							<div className={`mx-auto px-6 py-3 mb-4 rounded-xl shadow-lg transition-colors duration-300`} style={{ backgroundColor: currentSubjectColors.primaryHex }}>
								<h1 className="text-4xl font-extrabold tracking-tight text-white">
									{activeLink}
								</h1>
							</div>
						</header>
					)}
					{isSubjectLink(activeLink) ? (
						<SubjectDashboardView
							test={selectedTest}
							metrics={selectedMetrics}
							handleReviewClick={handleReviewClick}
							activeLink={activeLink}
						/>
					) : (
						<EmptyDashboardView
							activeLink={activeLink}
							currentSubjectColors={currentSubjectColors}
						/>
					)}
				</div>
			</div>
			<FloatingChatBubble
				onClick={handleChatOpen}
				isChatModalOpen={isChatModalOpen}
				isUnattempted={selectedMetrics.isUnattempted}
			/>
			<AIChatModal
				open={isChatModalOpen}
				onClose={handleChatClose}
				chatHistory={chatHistory}
				isChatLoading={isChatLoading}
				onSendMessage={handleSendMessage}
				onClearChat={handleClearChat}
				selectedTest={selectedTest}
				activeLink={activeLink}
				selectedAttempt={selectedAttempt}
				selectedMetrics={selectedMetrics}
			/>
			<SingleResetConfirmModal
				open={isSingleResetConfirmOpen}
				test={selectedTest}
				onClose={() => setIsSingleResetConfirmOpen(false)}
				onConfirm={handleSingleTestReset}
			/>
			<ResetSelectionModal
				open={isResetModalOpen}
				completedTests={completedTests}
				onClose={() => setIsResetModalOpen(false)}
				onConfirm={handleConfirmMultiReset}
			/>
			{message && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
					<div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
						<h3 className="text-lg font-bold text-gray-800 mb-3">Action Complete</h3>
						<p className="text-gray-600">{message}</p>
						<button
							className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium"
							onClick={handleCloseMessage}
						>
							OK
						</button>
					</div>
				</div>
			)}
			<style dangerouslySetInnerHTML={{ __html: cssStyles }} />
		</div>
	);
};

export default App;
