import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import ColorPaletteStore from './modules/ColorPaletteStore';
import ChatStore from './modules/ChatStore';

export default new Vuex.Store({
	modules: {
		ColorPaletteStore,
		ChatStore
	}
});