#!/usr/bin/env node
'use strict';
const updateNotifier = require('update-notifier');
const meow = require('meow');

const cli = meow(`
	Usage
	  $ sf

	Decentralyzed node package manager on top of ethereum
`);

updateNotifier({pkg: cli.pkg}).notify();
