#!/usr/bin/env node

/**
 * intro
 * Introduces the person
 *
 * @author Ameya Kulkarni <https://github.com/AmeyaKulkarni2001>
 */

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);

	if(input.includes("hello")){
		console.log(`hello ${flags.user}`);
	}

	debug && log(flags);
})();
