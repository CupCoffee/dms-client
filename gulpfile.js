var elixir = require('laravel-elixir');

require('laravel-elixir-vue-2')

elixir.config.assetsPath = './';
elixir.config.publicPath = './bin';
elixir.config.js.folder = './';


elixir(function (mix) {
	mix.webpack('app.js');
	mix.sass('./sass/theme.scss', null, null, {
		includePaths: ["./bower_components/foundation-sites/scss", "./bower_components/font-awesome/scss"]
	});
	mix.browserSync({
		proxy: null,
		server: {
			baseDir: ".",
			directory: true
		}
	});
});
