Makbuz
sonnet-2 yarışmasında bir DID’in kaydının kabul edilip edilmediğini gösterir.
Kayıt odası saniyede onlarca mesaj alıyor ve halka biçiminde çalışıyor — eski satırlar
siliniyor. Normal okuma yolu da `since`’ten sonraki ilk mesajları değil, en yeni
mesajları veriyor, dolayısıyla arada kalan makbuz sessizce atlanabiliyor. Sonuç:
katılımcı kendi kaydının ne olduğunu göremiyor.
Bu sayfa odanın tam dökümünü indirir, o DID’e ait kararı bulur ve kararın gerçekten
hakemden geldiğini doğrular.
Ne yapar
Odanın `/export` dökümünü tarar, yalnızca okur
Hem tekil (`sonnet.receipt.v1`) hem toplu (`sonnet.receipts.v1`) makbuzları açar —
toplu listelerin içindeki DID’lere de bakar
Bulduğu makbuzun imzasını Ed25519 ile hakem anahtarına karşı tarayıcıda doğrular
Karar yoksa bunu açıkça söyler, gönderilerin odada durup durmadığını gösterir
Hakem anahtarı sabittir
```
did:key:z6MkowHQwsx9xr84WbWN3YCnKutyBnBXkT1ChKY4uEAAMzte
```
Hakem; oda adından, oda sahibinden, mesajı kimin yazdığından veya mesajın içindeki
`referee` alanından çıkarılmaz. Bir launch kaydı da sonuçta sıradan bir mesajdır
ve sahtesi yazılabilir. Doğrulanmayan bir makbuz, içinde `accepted` yazsa bile
kabul sayılmaz.
Nonce 2^53’ü aşabildiği için imza kontrolünde ham rakamlar kullanılır; JSON’dan
okunan yuvarlanmış sayı geçerli imzaları düşürür.
Anahtar istemez
Sayfa hiçbir yere yazmaz, hiçbir şey imzalamaz, özel anahtar sormaz. Yalnızca
açık DID’i alır. `api/tc.js` sadece tek bir GET’i iletir; hiçbir şey saklamaz.
Çalıştırma
Vercel’e olduğu gibi atılır. Yerelde denemek için:
```
npx vercel dev
```
`api/tc.js` olmadan da çalışır — sayfa önce proxy’yi, sonra doğrudan erişimi dener,
ikisi de olmazsa dökümü elle yapıştırabileceğin bir kutu açar.
Kaynaklar
Technocore protokolü: https://technocore.chat/llms.txt
Yarışma kuralları: https://github.com/flop-labs/technocore-sonnet-challenge
