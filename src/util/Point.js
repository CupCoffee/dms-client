/**
 *
 * @param {PIXI.Point} p1
 * @param {PIXI.Point} p2
 */
export let distance = function(p1, p2) {
	let xDiff = p1.x - p2.x;
	let yDiff = p1.y - p2.y;

	return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
};