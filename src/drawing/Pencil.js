import * as PIXI from 'pixi.js';
import {distance} from '../util/Point';

export default class Pencil {
	constructor(renderer, stage) {
		/**
		 * The renderer
		 * @type {PIXI.WebGLRenderer|PIXI.CanvasRenderer}
		 */
		this._renderer = renderer;

		/**
		 * The rendering container
		 * @type {PIXI.Container}
		 * @private
		 */
		this._stage = stage;

		/**
		 * The state of the pencil
		 * @type {string}
		 * @private
		 */
		this._state = Pencil.STATE_STOPPED_DRAWING;

		/**
		 * The point that was set in the last draw call
		 * @type {PIXI.Point}
		 * @private
		 */
		this._lastPoint = null;

		/**
		 * The size of the pencil line
		 * @type {number}
		 * @private
		 */
		this._size = 20;

		/**
		 * The color of the pencil line
		 * @type {string}
		 * @private
		 */
		this._color = '0x000000';

		/**
		 * The pencils graphics object
		 * @type {PIXI.Graphics}
		 */
		this.graphics = new PIXI.Graphics(true);
		stage.addChild(this.graphics);

		this._updateLineStyle();
	}

	/**
	 * started_drawing state constant
	 * @return {string}
	 */
	static get STATE_STARTED_DRAWING() {
		return 'started_drawing';
	}

	/**
	 * drawing state constant
	 * @return {string}
	 */
	static get STATE_DRAWING() {
		return 'drawing';
	}

	/**
	 * stopped_drawing state constant
	 * @return {string}
	 */
	static get STATE_STOPPED_DRAWING() {
		return 'stopped_drawing';
	}

	/**
	 * Starts the pencil line, this is the point where the pencil line begins
	 * @param  {number} x
	 * @param  {number} y
	 * @return {void}
	 */
	startDrawing(x, y) {
		this._setState(Pencil.STATE_STARTED_DRAWING);

		this.graphics.moveTo(x, y);
		this.setLastPoint(x, y);
	}

	/**
	 * Adds a point to the pencil line if the pencil is in a drawing state @see isDrawing
	 * @param  {number} x
	 * @param  {number} y
	 * @return {void}
	 */
	draw(x, y) {
		if (!this.isDrawing()) return;
		this._setState(Pencil.STATE_DRAWING);


		if (this._lastPoint) {
			this.graphics.quadraticCurveTo(this._lastPoint.x + (x - this._lastPoint.x) / 2, this._lastPoint.y + (y - this._lastPoint.y) / 2, x, y);
		} else {
			this.graphics.lineTo(x, y);
		}

		this.setLastPoint(x, y);
	}

	/**
	 * Ends the pencil line end sets the state to STATE_STOPPED_DRAWING
	 * @param  {number} x
	 * @param  {number} y
	 * @return {void}
	 */

	stopDrawing(x, y) {
		this._setState(Pencil.STATE_STOPPED_DRAWING);

		this._swapGraphicsBuffer();
	}

	/**
	 * Sets the last point that was added to the pencil line
	 * @param {number} x
	 * @param {number} y
	 */
	setLastPoint(x, y) {
		this._lastPoint = new PIXI.Point(x, y);
	}

	/**
	 * Sets the current state of the pencil
	 * @param {string} state
	 * @private
	 */
	_setState(state) {
		this._state = state;
	}

	/**
	 * Get the current state of the pencil
	 * @return {string}
	 */
	getState() {
		return this._state;
	}

	/**
	 * Returns true if the state is equal to STATE_DRAWING or STATE_STARTED_DRAWING
	 * @returns {boolean}
	 */
	isDrawing() {
		return this.getState() === Pencil.STATE_DRAWING || this.getState() === Pencil.STATE_STARTED_DRAWING;
	}

	/**
	 * Update the current linestyle
	 * @private
	 */
	_updateLineStyle() {
		this.graphics.lineStyle(this._size, this._color, 1);
	}

	/**
	 * @param {string} color Color in HEX value
	 */
	setColor(color) {
		this._color = parseInt(color, 16);
		this._updateLineStyle();
	}

	/**
	 * @returns {string}
	 */
	getColor() {
		return this._color.toString(16)
	}

	/**
	 * @param {number} size
	 */
	setSize(size) {
		this._size = size;
		this._updateLineStyle();
	}

	/**
	 * Stores the current state of the stage in a texture and renders that instead.
	 * If there is already a previous texture rendered, a new one is rendered on top of that and then the old is removed from the stage.
	 * @private
	 */
	_swapGraphicsBuffer() {
		let oldBufferSprite = this._bufferSprite;

		let bufferTexture = this._renderer.generateTexture(this._stage);
		this._bufferSprite = new PIXI.Sprite(bufferTexture);

		this._stage.addChildAt(this._bufferSprite, 0);

		if (typeof oldBufferSprite !== "undefined") {
			this._stage.removeChild(oldBufferSprite);
			this.graphics.clear();
		}

		this._updateLineStyle();
	}
}
