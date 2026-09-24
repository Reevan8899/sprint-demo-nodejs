const state = {"issues": {"user-auth": 1, "product-catalog": 2, "cart": 3, "checkout": 4, "order-history": 5}, "prs": {"user-auth": 6, "product-catalog": 7, "cart": 8, "order-history": 9}};
const base = 'https://api.github.com/repos/Reevan8899/sprint-demo-nodejs';
async function api(route) {
  const response = await fetch(base + route, { headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'sprint-demo-console' } });
  if (!response.ok) throw new Error(`GitHub HTTP ${response.status}`);
  return response.json();
}
const mode = process.argv[2];
if (mode === 'prs') {
  const prs = await api('/pulls?state=open');
  console.log('Repository: Reevan8899/sprint-demo-nodejs');
  for (const pr of prs) console.log(`#${pr.number}  ${pr.state.toUpperCase()}  ${pr.head.ref} -> ${pr.base.ref}\n    ${pr.title}`);
  console.log(`Open pull requests: ${prs.length}`);
} else if (mode === 'blocked') {
  const issue = await api(`/issues/${state.issues.checkout}`);
  console.log(`Issue #${issue.number}: ${issue.title}`);
  console.log('State:', issue.state);
  console.log('Labels:', issue.labels.map(label => label.name).join(', '));
  console.log(`Dependency: cart issue #${state.issues.cart}`);
  console.log(issue.body);
} else if (mode === 'commits') {
  const pr = await api(`/pulls/${state.prs['order-history']}`);
  console.log(`PR #${pr.number}: ${pr.title}`);
  console.log('State:', pr.state, '| commits:', pr.commits);
  console.log('Head:', pr.head.sha);
} else if (mode === 'reviews') {
  const comments = await api('/pulls/comments?per_page=100');
  for (const comment of comments) {
    console.log(`#${comment.pull_request_url.split('/').at(-1)} ${comment.user.login}: ${comment.path}:${comment.line ?? comment.original_line}`);
    console.log(comment.body);
    console.log('');
  }
} else if (mode === 'merged') {
  const prs = await api('/pulls?state=closed&per_page=100');
  for (const pr of prs.filter(pr => pr.merged_at)) console.log(`#${pr.number} MERGED ${pr.head.ref} -> ${pr.base.ref}\n  ${pr.title}\n  merge: ${pr.merge_commit_sha.slice(0, 12)}`);
} else if (mode === 'release') {
  const release = await api('/releases/tags/v0.1.0');
  console.log('Repository: Reevan8899/sprint-demo-nodejs');
  console.log('Release:', release.name);
  console.log('Tag:', release.tag_name);
  console.log('Draft:', release.draft, '| Prerelease:', release.prerelease);
  console.log('Published:', release.published_at);
  console.log('URL:', release.html_url);
} else throw new Error('Unknown mode');
