// No dependencies: node tests/test_script.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require('node:path').join(__dirname, '../js/index.js'), 'utf8');

function run({ gsap = false, scrollTrigger = false, reducedMotion = false } = {}) {
    const calls = [];
    const animation = {
        registerPlugin: plugin => calls.push(['plugin', plugin]),
        from: (target, options) => calls.push(['from', target, options]),
        utils: { toArray: () => ['work', 'about'] }
    };
    const context = {
        document: { addEventListener: (name, callback) => {
            assert.equal(name, 'DOMContentLoaded');
            callback();
        } },
        window: {
            gsap: gsap ? animation : undefined,
            ScrollTrigger: scrollTrigger ? {} : undefined,
            matchMedia: () => ({ matches: reducedMotion })
        },
        gsap: animation,
        ScrollTrigger: {}
    };
    vm.runInNewContext(source, context);
    return calls;
}

assert.equal(run().length, 0, 'No exception or animation when the CDN is unavailable');
assert.equal(run({ gsap: true }).length, 0, 'Missing ScrollTrigger must be safe');
assert.equal(run({ gsap: true, scrollTrigger: true, reducedMotion: true }).length, 0,
    'Reduced-motion preference must skip animations');
const calls = run({ gsap: true, scrollTrigger: true });
assert.equal(calls.filter(c => c[0] === 'from').length, 3);
for (const call of calls.filter(c => c[0] === 'from')) {
    assert.equal(call[2].clearProps, 'all', 'Animation styles must be cleared after completion');
}
console.log('PASS: 4 animation/CDN/reduced-motion scenarios');
