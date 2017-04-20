import Pencil from "./Pencil";

import { GameSocket } from "../net/Socket";


export default class PlayerPencil extends Pencil {
	constructor(renderer, stage)
	{
		super(renderer, stage);

		/**
		 * @type {number} width of the canvas this pencil is drawing on.
		 */
		this._canvasWidth = renderer.width;

		/**
		 * @type {number} height of the canvas this pencil is drawing on.
		 */
		this._canvasHeight = renderer.height;
	}

	startDrawing(x, y) {
		GameSocket.emit('draw', {
			state: Pencil.STATE_STARTED_DRAWING,
			x: x / this._canvasWidth,
			y: y / this._canvasHeight,
			size: this._size,
			color: this.getColor()
		});

		super.startDrawing(x, y);
	}

	draw(x, y) {
		if (!this.isDrawing()) return;

		GameSocket.emit('draw', {
			state: Pencil.STATE_DRAWING,
			x: x / this._canvasWidth,
			y: y / this._canvasHeight,
			size: this._size,
			color: this.getColor()
		});

		super.draw(x, y);
	}

	stopDrawing(x, y) {
		GameSocket.emit('draw', {
			state: Pencil.STATE_STOPPED_DRAWING,
			x: x / this._canvasWidth,
			y: y / this._canvasHeight,
			size: this._size,
			color: this.getColor()
		});

		super.stopDrawing(x, y);
	}
}