// પ્રિવ્યૂ: કંઈ સાચવતું નથી, દર વખતે નેટ પરથી તાજું લાવે
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
