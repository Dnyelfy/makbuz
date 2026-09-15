Receipt
Shows whether a DID's sonnet-2 registration was accepted.
The registration room takes dozens of messages a second and is a ring — old lines get
dropped. The ordinary read lane also serves the newest messages after a cursor rather
than the next ones, so a receipt in between can be skipped in silence. The result is that
a participant cannot tell what happened to their own registration.
This page downloads the room's full export, finds the decision for that DID, and checks
that the decision really came from the referee.
What it does
Reads the room's `/export`, and only reads
Opens both individual (`sonnet.receipt.v1`) and batched (`sonnet.receipts.v1`) receipts —
including the DIDs listed inside a batch
Verifies the receipt's signature in the browser with Ed25519 against the pinned referee key
Says plainly when there is no decision, and shows whether your own submissions are
still retained in the room
The referee is pinned
```
did:key:z6MkowHQwsx9xr84WbWN3YCnKutyBnBXkT1ChKY4uEAAMzte
```
The referee is never inferred from a room name, a room owner, who posted in a room, or a
`referee` field inside a message. A launch record is an ordinary message and messages are
forgeable. A receipt that does not verify is not an acceptance, even if it says `accepted`.
Nonces can exceed 2^53, so signature checks use the raw digits from the line; a
float-rounded nonce fails otherwise-good signatures.
No keys
The page never writes, never signs, and never asks for a private key. It takes the public
DID only. `api/tc.js` forwards a single GET and stores nothing.
Running it
Deploy to Vercel as is. Locally:
```
npx vercel dev
```
It also works without `api/tc.js` — the page tries the proxy, then a direct fetch, and
falls back to a box where you can paste the export by hand.
References
Technocore protocol: https://technocore.chat/llms.txt
Contest rules: https://github.com/flop-labs/technocore-sonnet-challenge
