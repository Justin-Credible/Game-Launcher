
var Config = {

	// ************************************************
	// User Interface
	// ************************************************

	// Show UI controls
	controls: false,

	// Show a item progress bar at the bottom of the screen.
	progress: false,

	// Width and height of the main UI container. This should match the
	// resolution that the menu will be displayed at (which is dependant
	// upon the fullscreen and width/height properties in package.json)
	// If set to full screen, then these values should match the active
	// screen resolution. Otherwise these values should match the width
	// and height values as defiend in the package.json file.
	width: 1050,
	height: 1680,

	// The trasnition to use when switching between games/menu items.
	// Possible Values: default/cube/page/concave/zoom/linear/fade/none
	transition: "default",

	// Enables debug mode which will show the dev console on startup.
	debug: false,

	// The game that should be automatically started after a period of
	// inactivity when at the game launcher (and not in-game). Set
	// either property to null to disable the auto launch feature.
	autoLaunchGame: "galaga",
	autoLaunchGameTimeout: 30,

	// A string of HTML that will be injected into the intructions element
	// on the page; useful for showing instructional content to the end user.
	instructions: "Move joystick left and right to select a game.<br/>Press FIRE to start the selected game.<br/>Hold P1 and press P2 to exit game and select a new one.",

	// ************************************************
	// Key Bindings
	// ************************************************

	// Used to start the currently selected game.
	// 13 - Return/Enter
	makeSelection: 13,

	// ************************************************
	// Emulator Settings
	// ************************************************

	mameExePath: "C:/Emulators/MAME/mame.exe",
	mameDirPath: "C:/Emulators/MAME/",

	// ************************************************
	// List of Games/ROMs
	// ************************************************

	gameList: [
		{ name: "Ms. Pac-Man", rom: "mspacman" },
		{ name: "Donkey Kong", rom: "dkong" },
		{ name: "Donkey Kong Jr", rom: "dkongjr" },
		{ name: "Donkey Kong 3", rom: "dkong3" },
		{ name: "Galaga", rom: "galaga" },
		{ name: "Galaga '88", rom: "galaga88" },
		{ name: "Galaxian", rom: "galaxian" },
		{ name: "Dig Dug", rom: "digdug" },
		{ name: "Frogger", rom: "frogger" },
		{ name: "Burger Time", rom: "btime" }
	]
};

