import Game from "./src/Game";

import Vue from "vue";

import Vuex from "vuex";
import VueRouter from "vue-router";

Vue.use(Vuex);
Vue.use(VueRouter);

import App from "./components/App.vue";

import TitleView from "./components/views/TitleView.vue";
import GameView from "./components/views/GameView.vue";

let router = new VueRouter({
	routes: [
		{
			path: '/',
			component: GameView
		}
	]
});

new Vue({
	el: '#app',
	render: (h) => h(App),
	router
});