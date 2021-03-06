<template>
    <div class="view view-game">
        <canvas class="drawing-canvas" v-pixi="drawCanvasSettings" @mousedown="pencil.startDrawing($event.pageX, $event.pageY)" @mousemove="pencil.draw($event.pageX, $event.pageY)" @mouseup="pencil.stopDrawing($event.pageX, $event.pageY)"></canvas>
        <div class="ui-overlay">
            <canvas v-pixi="renderCanvasSettings"></canvas>
            <color-palette></color-palette>
            <chat-box></chat-box>
            <chat></chat>
        </div>
    </div>
</template>

<script>
    import { autoDetectRenderer, Graphics, Container, Sprite } from 'pixi.js';
    import { extend } from 'underscore';
    import { mapGetters } from 'vuex';

    import { GameSocket } from '../../src/net/Socket';

    import ColorPalette from "../ui/ColorPalette.vue";
    import ChatBox from "../ui/chat/ChatBox.vue";
    import Chat from "../ui/chat/Chat.vue";
    import PlayerPencil from "../../src/drawing/PlayerPencil";
    import OtherPencil from "../../src/drawing/OtherPencil";

    export default {
    	components: {
    		Chat,
    		ChatBox,
    		ColorPalette
        },

    	data() {
    		return {
    			drawCanvasSettings: {
    				width: window.innerWidth,
                    height: window.innerHeight,
                    renderSetupCallback: this.setupRenderer
                },
                renderCanvasSettings: {
    				width: window.innerWidth,
                    height: window.innerHeight,
                    transparent: true,
                    renderSetupCallback(renderer) {
    					let pencilScale = 0.1;
	                    let pencilSprite = Sprite.fromImage('assets/pencil.png');
	                    pencilSprite.scale.set(pencilScale, pencilScale);
	                    pencilSprite.anchor.set(pencilSprite.width / pencilScale, pencilSprite.height / pencilScale / 2);
	                    let stage = new Container();

	                    stage.addChild(pencilSprite);

	                    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;

	                    window.addEventListener('mousemove', function(e) {
	                    	mouseX = e.pageX;
	                    	mouseY = e.pageY;
                        });

	                    renderer.render(stage);

	                    let render = () => {
		                    requestAnimationFrame(render);

		                    pencilSprite.rotation = Math.cos(pencilSprite.position.y / (window.innerHeight / 2) + pencilSprite.position.x / (window.innerWidth / 2));
		                    pencilSprite.position.x = mouseX;
		                    pencilSprite.position.y = mouseY;

		                    renderer.render(stage);
	                    };

	                    requestAnimationFrame(render);

                    }
                }
            };
        },

        computed: {
            ...mapGetters(['currentColor'])
        },

        watch: {
    		currentColor(color) {
    			this.pencil.setColor(color);
            }
        },

        directives: {
    		pixi: {
    			bind(element, binding) {
    				let settings = extend({
    					width: 640,
                        height: 480,
                        renderSetupCallback: () => {}
                    }, binding.value);

				    let renderer = autoDetectRenderer(settings.width, settings.height, {
				    	view: element,
                        transparent: true
                    });

				    settings.renderSetupCallback(renderer);
			    }
            }
        },

        methods: {
    		setupRenderer(renderer) {
			    let stage = new Container();

			    this.pencil = new PlayerPencil(renderer, stage);

			    let otherPencils = {};

			    GameSocket.on('draw', function(packet) {
				    if (packet.id && !(packet.id in otherPencils)) {
					    otherPencils[packet.id] = new OtherPencil(renderer, stage);
				    }

				    otherPencils[packet.id].handlePacket(packet);
                });

			    let render = () => {
				    renderer.render(stage);

				    requestAnimationFrame(render);
			    };

			    render();
            }
        }
    }
</script>