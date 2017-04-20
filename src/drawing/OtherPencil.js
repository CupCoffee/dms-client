import Pencil from "./Pencil";

export default class OtherPencil extends Pencil {
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

	handlePacket(packet)
	{
		if (!this.graphics) return;

		if (packet.color !== this.getColor()) {
			this.setColor(packet.color);
		}

		if (packet.size !== this._size) {
			this.setSize(packet.size);
		}

		let x = Math.round(packet.x * this._canvasWidth);
		let y = Math.round(packet.y * this._canvasHeight);

		switch(packet.state) {
			case Pencil.STATE_STARTED_DRAWING:
				if (!this.isDrawing()) {
					this.startDrawing(x, y);
				}
				break;
			case Pencil.STATE_DRAWING:
				if (this.isDrawing()) {
					this.draw(x, y);
				}
				break;
			case Pencil.STATE_STOPPED_DRAWING:
				if (this.isDrawing()) {
					this.stopDrawing(x, y);
				}
		}
	}
}