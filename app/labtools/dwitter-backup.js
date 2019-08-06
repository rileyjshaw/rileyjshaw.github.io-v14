/*
  Dwitter backup scripts.

  Is the API up?

  Yes: 1. Paste Script A into a Node console.
       2. Copy and save the output.

  No:  1. Go to https://www.dwitter.net/u/rileyjshaw.
       2. Scroll to the bottom so that all dweets are loaded.
       3. Paste Script B into a JS console.
       4. Copy and save the output.
 */

// Script A.
const https = require('https');

function requestAll(url, dweets = [], page = 1) {
  console.log(`Requesting page ${page}`);

  return new Promise((resolve, reject) => {
    https.get(url, response => {
      let body = '';

      response.on('data', chunk => {
        body += chunk;
      });

      response.on('end', () => {
        console.log('Response received!');
        if (response.statusCode >= 300 && response.statusCode < 400) {
          console.log(`Redirected to ${response.headers.location}`);
          requestAll(response.headers.location, dweets, page);
        } else if (response.statusCode === 200) {
          try {
            console.log('Parsing…');
            const parsed = JSON.parse(body);
            const next = parsed.next;
            if (next) return requestAll(next, dweets.concat(parsed.results), page + 1);
            else resolve(dweets.concat(parsed.results));
          } catch (e) {
            reject(e);
          }
        } else {
          reject(Error(`Rejected with status: ${response.statusCode}`));
        }
      });
    }).on('error', reject);
  });
}

requestAll('https://www.dwitter.net/api/dweets?author=rileyjshaw').then(
  results => results.map(result => ({
    length: result.code.length,
    date: result.posted.split('T')[0],
    code: result.code,
    href: result.link,
    likes: result.awesome_count,
  }))
).then(mapped => console.log(JSON.stringify(mapped, null, 2))
).catch(e => console.log(`Error: ${e}`));

// Script B.
console.log(JSON.stringify(Array.from(document.querySelectorAll('.dweet-wrapper')).map(dweet => {
  const date = new Date(dweet.querySelector('.dweet-timestamp').textContent);
  return {
    length: dweet.querySelector('.character-count').textContent.split('/')[0],
    date: [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(n => String(n).padStart(2, '0')).join('-'),
    code: dweet.querySelector('.code-input').textContent,
    href: dweet.querySelector('.share-link').value,
    likes: dweet.querySelector('.score-text').textContent,
  };
}), null, 2));

// To convert them to a format that fits with projects.json:
console.log(JSON.stringify(dweets.map(dweet => ({
  title: `Dweet ${dweet.id}`,
  date: dweet.date,
  tags: ['online', 'golf'],
  coolness: dweet.likes,
  href: dweet.href,
  lastTagged: Date.now(),
})), null, 2));
