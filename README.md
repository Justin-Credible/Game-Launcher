Game-Launcher
=============

Game-Launcher is a simple frontend designed for an Arcade machine or other game hardware that allows the user to browse a selection of games and start one. It was designed to be a much simpler alternative to fully-featured frontends (like [Hyperspin](http://www.hyperspin-fe.com/)) for system that have a handful of games rather than thousands.

Though it was designed for launching games, it can actually launch any type of executable.

It is written in JavaScript and HTML5 and runs on [node-webkit](https://github.com/rogerwang/node-webkit). It utilizes the [reveal.js](https://github.com/hakimel/reveal.js) framework for the user interface.

Currently it has only been tested on Windows, though it should work on Linux and Mac OS platforms as well.

## User Experience ##

The user is launched into a full screen application and can then use the arrow keys to move left and right through a list of games. For each game a large image and the name of the game are displayed. Pressing enter (or other configured key) will cause the selected game to be launched.

During the launch process a loading screen will be shown to prevent the user from attempting to launch the game multiple times.

When idle, the frontend can be configured to launch a specific game after a configurable number of seconds.

## How to Build ##

*Currently, the build process only supports build output for Windows platforms and must be built from a Windows environment. Builds for other platforms must be created manually at this point.*

Since the application is written in JavaScript and runs on node-webkit, the build process doesn't actually build any binaries. A "build" of Game-Launcher doesn't actually require a build script and can be "built" by simply copying the files to the right places next to a node-webkit build. Therefore the build script in this case is just for convenience.

The build script uses [NAnt](http://nant.sourceforge.net/); if you don't have NAnt already you can install it via the [Chocolatey](http://chocolatey.org/) package manager:

    $ cinst nant

Once NAnt is installed, one of the build targets can be executed from the project directory:

	$ git clone https://github.com/Justin-Credible/Game-Launcher
	$ cd Game-Launcher
	$ nant build

The build target will node-webkit, reveal.js, and other dependencies and copies the contents of `src` to the `bin` directory. After it completes, Game-Launcher can be started by executing `Game-Launcher.exe` from the `bin` directory.

Additionally, the `package` target can be used to ZIP file for distribution.


## Configuration ##

Several parameters such as resolution, emulator path, and ROM list can be configured by editing the self-documented `configuration.js` file.

## License ##

Copyright © 2014 Justin Unterreiner.

Released under an MIT license; see [LICENSE](https://github.com/Justin-Credible/Game-Launcher/blob/master/LICENSE) for more information.