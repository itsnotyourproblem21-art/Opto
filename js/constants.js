// js/constants.js - All static data and constants

// --- Gemini API Constants ---
export const GEMINI_MODEL = 'gemini-2.5-flash-preview-09-20-25';
export const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=`;

// --- OAT Test Structure Constants ---
export const TOTAL_QUESTIONS_BIOLOGY = 40;
export const TOTAL_QUESTIONS_CHEMISTRY = 30; // Gen Chem & Organic Chem
export const TOTAL_QUESTIONS_READING = 50;
export const TOTAL_QUESTIONS_PHYSICS = 40;
export const TOTAL_QUESTIONS_QUANTITATIVE = 40;

export const MAX_ATTEMPTS = 3;

// --- Subject Color & Icon Mapping ---
export const SUBJECT_COLOR_MAP = {
	'Biology': {
		primaryHex: '#4f72c2',
		secondaryHex: '#b3d4f8',
		iconEmoji: '🧬',
		quoteAccentClass: 'text-sky-300'
	},
	'General Chemistry': {
		primaryHex: '#06B6D4',
		secondaryHex: '#67E8F9',
		iconEmoji: '🧪',
		quoteAccentClass: 'text-cyan-300'
	},
	'Organic Chemistry': {
		primaryHex: '#EA580C',
		secondaryHex: '#FDBA74',
		iconEmoji: '👩‍🔬',
		quoteAccentClass: 'text-orange-300'
	},
	'Reading Comprehension': {
		primaryHex: '#065F46',
		secondaryHex: '#6EE7B7',
		iconEmoji: '📖',
		quoteAccentClass: 'text-green-300'
	},
	'Physics': {
		primaryHex: '#7E22CE',
		secondaryHex: '#C4B5FD',
		iconEmoji: '💡',
		quoteAccentClass: 'text-purple-300'
	},
	'Quantitative Reasoning': {
		primaryHex: '#B91C1C',
		secondaryHex: '#FCA5A5',
		iconEmoji: '📐',
		quoteAccentClass: 'text-red-300'
	},
	'General': {
		primaryHex: '#2e2b5e',
		secondaryHex: '#4a478a',
		iconEmoji: '🎓',
		quoteAccentClass: 'text-indigo-300'
	}
};

// --- Navigation Links ---
export const appSubjectLinks = [
	{ name: 'Biology', iconEmoji: '🧬', isChild: true },
	{ name: 'General Chemistry', iconEmoji: '🧪', isChild: true },
	{ name: 'Organic Chemistry', iconEmoji: '👩‍🔬', isChild: true },
	{ name: 'Reading Comprehension', iconEmoji: '📖', isChild: true },
	{ name: 'Physics', iconEmoji: '💡', isChild: true },
	{ name: 'Quantitative Reasoning', iconEmoji: '📐', isChild: true },
];

export const navigation = {
	STUDY: [
		{ name: 'Subjects', iconEmoji: '🎓', isCollapsible: true, children: appSubjectLinks },
		{ name: 'Full Length Tests', iconEmoji: '📋' },
	],
	REVIEW: [
		{ name: 'Previous Tests', iconEmoji: '🕐' },
		{ name: 'Tagged Questions', iconEmoji: '🏷️' },
	],
};

// --- *** FIXED DATA MODEL *** ---
export const initialTestData = {
	'Biology': [
		{ id: 1, name: "Practice Test 1", total: TOTAL_QUESTIONS_BIOLOGY, attempts: 3, tagged: 10, history: [
			{ attempt: 1, correct: 28, score: 330, date: "Oct 10, 2025", durationInSeconds: 450 },
			{ attempt: 2, correct: 34, score: 370, date: "Oct 25, 2025", durationInSeconds: 380 },
			{ attempt: 3, correct: 38, score: 400, date: "Nov 10, 2025", durationInSeconds: 240 },
		]},
		{ id: 2, name: "Practice Test 2", total: TOTAL_QUESTIONS_BIOLOGY, attempts: 2, tagged: 15, history: [
			{ attempt: 1, correct: 25, score: 310, date: "Oct 20, 2025", durationInSeconds: 520 },
			{ attempt: 2, correct: 31, score: 350, date: "Nov 5, 2025", durationInSeconds: 480 },
		]},
		{ id: 3, name: "Practice Test 3", total: TOTAL_QUESTIONS_BIOLOGY, attempts: 0, tagged: 0, history: [] },
	],
	'General Chemistry': [
		{ id: 101, name: "Practice Test 1", total: TOTAL_QUESTIONS_CHEMISTRY, attempts: 2, tagged: 8, history: [
			{ attempt: 1, correct: 18, score: 320, date: "Oct 12, 2025", durationInSeconds: 600 },
			{ attempt: 2, correct: 22, score: 360, date: "Oct 28, 2025", durationInSeconds: 510 },
		]},
		{ id: 102, name: "Practice Test 2", total: TOTAL_QUESTIONS_CHEMISTRY, attempts: 0, tagged: 0, history: [] },
	],
	'Organic Chemistry': [
		{ id: 201, name: "Practice Test 1", total: TOTAL_QUESTIONS_CHEMISTRY, attempts: 1, tagged: 12, history: [
			{ attempt: 1, correct: 25, score: 390, date: "Nov 1, 2025", durationInSeconds: 720 },
		]},
	],
	'Reading Comprehension': [],
	'Physics': [],
	'Quantitative Reasoning': [],
};
