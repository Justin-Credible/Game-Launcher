
/*globals Reveal, jQuery, require, setTimeout, clearTimeout, Config*/

var GameLauncher = (function ($, Reveal, Config) {

	var
		VERSION = "1.0.0",

		// Node.js modules
		exec = require("child_process").exec,

		// Private Variables
		isGameRunning, autoLaunchEnabled = false, inactivityCheck,

		// Events
		reveal_selectionMade, reveal_slideChanged, mameTerminated, inactivityCheck_timeout,

		// Private functions
		launchMame, buildPager, buildSlides, format, init,

		// DOM object references
		pager = $(".pager"),
		blockingOverlay = $(".blockingOverlay"),
		loadingDialog = $(".loadingDialog");

	// Events **************************************************

	reveal_selectionMade = function () {
		var romName;

		if (isGameRunning) {
			return;
		}

		if (autoLaunchEnabled) {
			clearTimeout(inactivityCheck);
		}

		romName = Reveal.getCurrentSlide().getAttribute("data-rom-name");
		launchMame(romName);
	};

	reveal_slideChanged = function (event) {

		if (autoLaunchEnabled) {
			// The user changed the slide, then we want to reset the timeout checker.
			clearTimeout(inactivityCheck);

			// Start new inactivity timeout check.
			inactivityCheck = setTimeout(inactivityCheck_timeout, Config.autoLaunchGameTimeout * 1000);
		}

		buildPager(event.indexh);
	};

	mameTerminated = function () {
		blockingOverlay.hide();
		loadingDialog.hide();
		isGameRunning = false;

		if (autoLaunchEnabled) {
			// There shouldn't be a timeout at this point, but we'll clear it just in case.
			clearTimeout(inactivityCheck);

			// Start new inactivity timeout check.
			inactivityCheck = setTimeout(inactivityCheck_timeout, Config.autoLaunchGameTimeout * 1000);
		}
	};

	inactivityCheck_timeout = function () {
		if (isGameRunning) {
			return;
		}

		launchMame(Config.autoLaunchGame);
	};

	// Private Functions ***************************************

	launchMame = function (romName) {
		var execOptions;

		isGameRunning = true;

		execOptions = {
			cwd: Config.mameDirPath
		};

		blockingOverlay.fadeIn(750);
		loadingDialog.fadeIn(750, function () {
			setTimeout(function () {
				exec(Config.mameExePath + " " + romName, execOptions, mameTerminated);
			}, 3000);
		});
	};

	buildPager = function (activeSlideIndex) {
		var i, pagerText = "";

		for (i = 0; i < Config.gameList.length; i += 1) {
			if (i === activeSlideIndex) {
				pagerText += "•";
			}
			else {
				pagerText += ".";
			}
		}

		pager.text(pagerText);
	};

	buildSlides = function () {
		var slidesTarget;

		slidesTarget = $("div.slides");

		$.each(Config.gameList, function (index, game) {
			var html = "";

			html += format("<section data-rom-name='{0}'>", game.rom);

			html += "<h1>";
			html += format("<img src='../game-images/{0}.png'/>", game.rom);
			html += "</h1>";

			html += "<h1>";
			html += format("<font style='font-size: 72px;'>{0}</font>", game.name);
			html += "<br/>";
			html += "</h1>";

			html += "</section>";

			slidesTarget.append(html);
		});
	};

	// Used to format strings.
	format = function () {
		var i, s, reg;
		i = 0;
		s = arguments[0];

		for (i = 0; i < arguments.length - 1; i += 1) {
			reg = new RegExp("\\{" + i + "\\}", "gm");
			s = s.replace(reg, arguments[i + 1]);
		}

		return s;
	};

	init = function () {
		var revealConfig = {};

		if (Config.debug) {
			require('nw.gui').Window.get().showDevTools();
		}

		$(".instructions").html(Config.instructions);

		buildSlides();

		// Full list of configuration options available here:
		// https://github.com/hakimel/reveal.js#configuration
		Reveal.initialize({
			controls: Config.controls,
			progress: Config.progress,
			history: false,
			center: true,
			width: Config.width,
			height: Config.height,
			closeOnEsc: false,
			theme: Reveal.getQueryHash().theme, // available themes are in /css/theme
			transition: Config.transition,

			// Optional libraries used to extend on reveal.js
			/*
			dependencies: [
				{ src: 'lib/js/classList.js', condition: function () { return !document.body.classList; } },
				{ src: 'plugin/markdown/marked.js', condition: function () { return !!document.querySelector( '[data-markdown]' ); } },
				{ src: 'plugin/markdown/markdown.js', condition: function () { return !!document.querySelector( '[data-markdown]' ); } },
				{ src: 'plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
				{ src: 'plugin/zoom-js/zoom.js', async: true, condition: function () { return !!document.body.classList; } },
				{ src: 'plugin/notes/notes.js', async: true, condition: function () { return !!document.body.classList; } }
			]
			*/
		});

		// Setup the keyboard bindings.
		revealConfig.keyboard = {};
		revealConfig.keyboard[Config.makeSelection] = reveal_selectionMade;

		// Push the configuration into Reveal.
		Reveal.configure(revealConfig);

		// Wire up event listeners for events by Reveal.
		Reveal.addEventListener("slidechanged", reveal_slideChanged);

		// The pager will initially be on the first game.
		buildPager(0);

		// If auto launch is configured, then setup a callback to fire every X seconds.
		if (typeof(Config.autoLaunchGame) === "string" && typeof(Config.autoLaunchGameTimeout) === "number") {
			autoLaunchEnabled = true;
			inactivityCheck = setTimeout(inactivityCheck_timeout, Config.autoLaunchGameTimeout * 1000);
		}
	};

	// Once the document is ready, fire off the init function.
	$(init);

})(jQuery, Reveal, Config);