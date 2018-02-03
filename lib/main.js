'use strict';
const fs = require('fs');
const updateNotifier = require('update-notifier');
const meow = require('meow');
const execa = require('execa');
const subarg = require('subarg');
const resolveCwd = require('resolve-cwd');
const sudoBlock = require('sudo-block');

const log = console.log;

const cli = meow(`
	Usage
	  $ dxpm

	Decentralyzed node package manager on top of yarn and ethereum
`);

function main() {
	updateNotifier({pkg: cli.pkg}).notify();

	sudoBlock();

	init(subarg(cli.input)._, cli.flags);
}

const yarnFallbackCmds = ['add'];

async function init(args) {
	const mainArg = args[0];
	const libPath = resolveCwd.silent(`./lib/${mainArg}`);

	if (mainArg) {
		if (libPath && fs.existsSync(libPath)) {
			require(libPath)(args);
		} else {
			log('This command does not exist');
		}
	}

	if (yarnFallbackCmds.indexOf(mainArg) > -1) {
		await execa('yarn', args, {stdio: 'inherit'});
	}
}

module.exports = main;
