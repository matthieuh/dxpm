'use strict';
const updateNotifier = require('update-notifier');
const meow = require('meow');
const execa = require('execa');
const subarg = require('subarg');
const resolveCwd = require('resolve-cwd');
const sudoBlock = require('sudo-block');

const log = console.log;

const cli = meow(`
	Usage
	  $ sf

	Decentralyzed node package manager on top of yarn and ethereum
`);

function main() {
	updateNotifier({pkg: cli.pkg}).notify();

	log('subarg', subarg(cli.input));
	init(subarg(cli.input)._, cli.flags);
}

async function init(args) {
	log('args', args);
	sudoBlock();

	const libPath = resolveCwd.silent(`./lib/${args[0]}`);
	if (libPath) {
		require(libPath)(args);
	}

	await execa('yarn', args, {stdio: 'inherit'});
}

module.exports = main;
