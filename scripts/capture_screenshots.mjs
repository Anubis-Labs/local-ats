import { spawn, execSync } from 'child_process';
import http from 'http';
import path from 'path';
import fs from 'fs';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT_DIR = path.resolve('docs/screenshots');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Routes to capture
const PAGES = [
  { name: '01-executive-dashboard.png', route: '/' },
  { name: '02-candidate-roster.png', route: '/candidates' },
  { name: '03-candidate-dossier.png', route: '/candidates/cand-001' },
  { name: '04-pipeline-kanban.png', route: '/pipeline' },
  { name: '05-candidate-comparison.png', route: '/compare' },
  { name: '06-project-team-builder.png', route: '/team-builder' },
  { name: '07-award-scenarios.png', route: '/scenarios' },
  { name: '08-site-readiness.png', route: '/readiness' },
  { name: '09-compliance-radar.png', route: '/compliance' },
  { name: '10-requisition-management.png', route: '/jobs' },
  { name: '11-engagement-cost-calculator.png', route: '/cost-calculator' },
];

async function run() {
  console.log('Starting preview server...');
  const preview = spawn('npx', ['vite', 'preview', '--port', '4173', '--strictPort'], {
    stdio: 'pipe',
  });

  // Wait for server to be responsive
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Server timeout')), 10000);
    const check = () => {
      http.get('http://localhost:4173', (res) => {
        if (res.statusCode === 200) {
          clearTimeout(timeout);
          resolve();
        } else {
          setTimeout(check, 200);
        }
      }).on('error', () => setTimeout(check, 200));
    };
    check();
  });

  console.log('Preview server ready at http://localhost:4173');

  for (const page of PAGES) {
    const outPath = path.join(OUT_DIR, page.name);
    const url = `http://localhost:4173${page.route}`;
    console.log(`Capturing ${page.name} from ${url}...`);

    try {
      execSync(`"${CHROME_PATH}" --headless=new --screenshot="${outPath}" --window-size=1440,900 --virtual-time-budget=2500 --hide-scrollbars "${url}"`, {
        stdio: 'inherit',
      });
      console.log(`Saved ${page.name}`);
    } catch (err) {
      console.error(`Failed to capture ${page.name}:`, err);
    }
  }

  preview.kill();
  console.log('All screenshots captured successfully!');
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
