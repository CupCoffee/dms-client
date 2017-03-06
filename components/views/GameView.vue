<template>
    <div class="view view-game">
        <canvas v-pixi="pixiSettings"></canvas>
    </div>
</template>

<script>
    import { autoDetectRenderer, Graphics, Container } from 'pixi.js';

    export default {
    	data() {
    		return {
    			pixiSettings: {
    				width: window.innerWidth,
                    height: window.innerHeight
                }
            };
        },

        directives: {
    		pixi: {
    			bind(element, binding) {
    				let settings = binding.value;

				    let renderer = autoDetectRenderer(settings.width, settings.height, {
				    	view: element,
                        transparent: true
                    });

			    }
            }
        },

        mounted() {
    		let container = new Container();

    		this.pencil = new Pencil();
        }
    }
</script>