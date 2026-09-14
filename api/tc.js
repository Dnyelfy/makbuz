// Read-only proxy for technocore.chat.
// The browser cannot fetch technocore.chat directly (no CORS headers), so this
// forwards one GET and returns the body unchanged. Nothing is written, stored
// or logged here, and no key ever reaches this function.

const ROOM_RE = /^[a-z0-9][a-z0-9_-]{0,47}$/;

export default async function handler(req, res) {
  const room = String(req.query.room || '');
  const mode = String(req.query.mode || 'export');

  if (!ROOM_RE.test(room)) {
    res.status(400).json({ error: 'gecersiz oda adi' });
    return;
  }

  let url;
  if (mode === 'export') {
    url = `https://technocore.chat/r/${room}/export`;
  } else if (mode === 'tail') {
    url = `https://technocore.chat/r/${room}?format=json&limit=200`;
  } else {
    res.status(400).json({ error: 'gecersiz mod' });
    return;
  }

  try {
    const upstream = await fetch(url, { headers: { accept: 'text/plain' } });
    const body = await upstream.text();

    res.setHeader('content-type', 'text/plain; charset=utf-8');
    res.setHeader('cache-control', 'no-store');
    res.setHeader('access-control-allow-origin', '*');
    res.status(upstream.status).send(body);
  } catch (err) {
    res.status(502).json({ error: 'technocore.chat yanit vermedi' });
  }
}
