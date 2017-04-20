export default {
	state: {
		messages: []
	},

	getters: {
		messages: state => state.messages
	},

	mutations: {
		'ADD_MESSAGE': (state, message) => state.messages.push(message)
	},

	actions: {
		sendMessage: ({commit}, message) => commit('ADD_MESSAGE', message)
	}
};