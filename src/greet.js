import { execSync } from 'node:child_process';
import path from 'node:path';

// BAD 1 — `process.cwd()` is an absolute path taken from the environment, and
// interpolating it into a shell string hands the shell control of it. Run the
// app from a directory whose name contains a space (or a `;`) and `rm -rf`
// deletes something other than what you meant.
export function cleanReports() {
  const reportDir = path.join(process.cwd(), 'reports');
  execSync(`rm -rf ${reportDir}`);
}

// BAD 2 — `process.argv` is untrusted input: whoever starts the process
// controls it. `node src/greet.js "x; whoami"` runs BOTH commands, because the
// shell splits on the `;` — Node never sees two commands.
export function greet() {
  const name = process.argv[2] || 'world';
  execSync(`echo Hello, ${name}`, { stdio: 'inherit' });
}
