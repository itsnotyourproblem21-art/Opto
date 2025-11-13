// js/utils.js - Scoring and utility functions

import {
	TOTAL_QUESTIONS_BIOLOGY,
	TOTAL_QUESTIONS_CHEMISTRY,
	TOTAL_QUESTIONS_READING,
	TOTAL_QUESTIONS_PHYSICS,
	TOTAL_QUESTIONS_QUANTITATIVE,
} from './constants.js';

// --- Score Maps ---
const SCORE_MAP_40 = {
	0: 200, 1: 200, 2: 210, 3: 220, 4: 230, 5: 240, 6: 250, 7: 260, 8: 270, 9: 280, 10: 290,
	11: 295, 12: 300, 13: 305, 14: 310, 15: 315, 16: 320, 17: 325, 18: 330, 19: 335, 20: 340,
	21: 345, 22: 350, 23: 355, 24: 360, 25: 365, 26: 370, 27: 375, 28: 380, 29: 385, 30: 390,
	31: 392, 32: 394, 33: 396, 34: 398, 35: 399, 36: 399, 37: 400, 38: 400, 39: 400, 40: 400
};

const SCORE_MAP_30 = {
	0: 200, 1: 200, 2: 215, 3: 230, 4: 245, 5: 260, 6: 275, 7: 290, 8: 300, 9: 310, 10: 320,
	11: 330, 12: 340, 13: 350, 14: 360, 15: 370, 16: 375, 17: 380, 18: 385, 19: 390, 20: 392,
	21: 394, 22: 396, 23: 397, 24: 398, 25: 399, 26: 399, 27: 400, 28: 400, 29: 400, 30: 400
};

const SCORE_MAP_50 = {
	0: 200, 1: 200, 2: 208, 3: 216, 4: 224, 5: 232, 6: 240, 7: 248, 8: 256, 9: 264, 10: 272,
	11: 280, 12: 288, 13: 292, 14: 296, 15: 300, 16: 304, 17: 308, 18: 312, 19: 316, 20: 320,
	21: 324, 22: 328, 23: 332, 24: 336, 25: 340, 26: 344, 27: 348, 28: 352, 29: 356, 30: 360,
	31: 364, 32: 368, 33: 372, 34: 376, 35: 380, 36: 384, 37: 388, 38: 390, 39: 392, 40: 394,
	41: 395, 42: 396, 43: 397, 44: 398, 45: 398, 46: 399, 47: 399, 48: 400, 49: 400, 50: 400
};

export function calculateScore(correct, totalQuestions) {
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
}

export function roundToNearestTen(score) {
	if (score === 0) return 0;
	return Math.round(score / 10) * 10;
}

export function getScoreColorClass(score) {
	const displayScore = roundToNearestTen(score);
	if (displayScore === 0 || displayScore < 200) return 'text-gray-500';
	if (displayScore > 320) return 'text-green-600';
	if (displayScore >= 300 && displayScore <= 320) return 'text-indigo-500';
	return 'text-red-600';
}

export function formatDuration(totalSeconds) {
	if (totalSeconds === 0 || totalSeconds === null || isNaN(totalSeconds)) return 'N/A';
	const totalMinutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	const paddedSeconds = String(seconds).padStart(2, '0');
	if (totalMinutes === 0) return `${seconds}s`;
	return `${totalMinutes}m ${paddedSeconds}s`;
}

export function getSubjectColors(subjectName) {
	return SUBJECT_COLOR_MAP[subjectName] || SUBJECT_COLOR_MAP['General'];
}
