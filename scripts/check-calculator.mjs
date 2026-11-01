import assert from 'node:assert/strict';
import fs from 'node:fs';
import { calculateSubscriptions } from '../public/scripts/subscription-math.v1.mjs';
assert.deepEqual(calculateSubscriptions([]), { monthly:0, yearly:0, removableYearly:0 });
assert.deepEqual(calculateSubscriptions([
  {amount:150,period:'monthly',removable:false},
  {amount:250,period:'monthly',removable:true},
  {amount:1200,period:'yearly',removable:true},
]), {monthly:500,yearly:6000,removableYearly:4200});
const fractional = calculateSubscriptions([{amount:99.99,period:'yearly',removable:true}]);
assert(Math.abs(fractional.yearly-99.99)<1e-9);
assert(Math.abs(fractional.removableYearly-99.99)<1e-9);
assert.deepEqual(calculateSubscriptions([{amount:0,period:'monthly',removable:true}]), {monthly:0,yearly:0,removableYearly:0});
for(const amount of [-1,NaN,Infinity,1000001]) assert.throws(()=>calculateSubscriptions([{amount,period:'monthly'}]),RangeError);
assert.throws(()=>calculateSubscriptions([{amount:10,period:'weekly'}]),RangeError);
const html = fs.readFileSync('dist/index.html','utf8');
assert(html.includes('src="/scripts/subscription-calculator.v1.js"'));
assert(html.includes('id="subscription-calculator"'));
assert(!/<script(?![^>]*(?:src=|application\/ld\+json))[^>]*>[^<]+/.test(html), 'Unexpected inline executable script conflicts with CSP');
for (const file of ['subscription-calculator.v1.js','subscription-math.v1.mjs']) assert(fs.existsSync(`dist/scripts/${file}`));
console.log('Calculator: mixed periods, removable totals, rounding, zero, invalid input and CSP-compatible output OK.');
