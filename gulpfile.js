var elixir = require('laravel-elixir');

require('laravel-elixir-vue-2')

console.log(elixir.config);

elixir.config.assetsPath = './';
elixir.config.publicPath = './bin';
elixir.config.js.folder = './';


elixir(function(mix) {
	mix.webpack('app.js');
});