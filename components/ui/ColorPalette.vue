<template>
    <div class="color-palette">
        <div class="clearfix">
            <div v-for="color in colors" class="color-palette__color"
                 :class="{'color-palette__color--active': isPicked(color)}" :style="{'backgroundColor': `#${color}`}"
                 @click="pickColor(color)">
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
	import {mapGetters, mapActions} from 'vuex';

	export default {
		data() {
			return {
				colors: ['ff0000', '00ff00', '0000ff'],
			};
		},

		mounted() {
			if (!this.currentColor) {
				this.pickColor(this.colors[0]);
			}
		},

		computed: {
			...mapGetters(['currentColor'])
		},

		methods: {
			...mapActions(['pickColor']),

			isPicked(color) {
				return this.currentColor === color;
			}
		}
	}
</script>