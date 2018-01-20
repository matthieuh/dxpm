import test from 'ava';
import execa from 'execa';

test(async t => {
	const {stdout} = await execa('./cli.js', ['--version']);
	t.true(stdout.length > 0);
});

test('setup cmd should return something', async t => {
	const {stdout} = await execa('./cli.js', ['setup']);
	t.true(stdout.length > 0);
});

test('publish cmd should return something', async t => {
	const {stdout} = await execa('./cli.js', ['publish']);
	t.true(stdout.length > 0);
});
