export default {
	state: {
		currentColor: null
	},

	getters: {
		currentColor: state => state.currentColor
	},

	mutations: {
		'SET_CURRENT_COLOR': (state, color) => state.currentColor = color
	},

	actions: {
		pickColor: ({commit}, color) => commit('SET_CURRENT_COLOR', color)
	}
};