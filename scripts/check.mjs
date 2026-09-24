import { readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
for (const dir of ['src', 'tests', 'scripts']) {
  for (const file of readdirSync(dir, { recursive: true })) {
    if (!/\.(m?js)$/.test(file)) continue;
    const path = `${dir}/${file}`;
    const result = spawnSync(process.execPath, ['--check', path], { stdio: 'inherit' });
    if (result.status !== 0) process.exit(1);
    console.log(`OK ${path}`);
  }
}
