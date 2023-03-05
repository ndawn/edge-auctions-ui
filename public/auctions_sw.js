let accessToken;

const updateSubscription = (subscription) => fetch(
  '/api/push/subscribe',
  {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` },
    body: subscription.toJSON(),
  },
);

self.addEventListener('push', (event) => {
  const payload = event.data.json();

  event.waitUntil(
    self.clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];
          if (client.url === event.target.registration.scope) {
            client.postMessage({
              type: 'push',
              data: payload,
            });
          }
        }

        if (payload.type === 'auctionBidBeaten') {
          const title = 'Ваша ставка бита!';
          const options = {
            body: payload.name,
            data: { url: '/page/auctions' },
            icon: '/favicon.png',
          };

          return self.registration.showNotification(title, options);
        }

        if (payload.type === 'auctionWon') {
          const title = 'Поздравляем, вы выиграли!';

          const countText = (
            payload.auctionCount === 1
            ? `Ваша ставка победила в ${payload.auctionCount} аукционе`
            : `Ваша ставка победила в ${payload.auctionCount} аукционах`
          )

          const options = {
            body: countText,
            data: { url: '/page/auctions' },
            icon: '/favicon.png',
          };

          return self.registration.showNotification(title, options);
        }
      })
  );
});

self.addEventListener('message', (event) => {
  if (event.data.type === 'accessToken') {
    accessToken = event.data.payload;
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(clients.matchAll({ type: 'window' })
    .then((clientList) => clients.openWindow?.(event.notification.data.url)));
});

self.addEventListener('pushsubscriptionchange', (event) => {
  event.waitUntil(
    self.registration.pushManager.subscribe(event.oldSubscription.options).then(updateSubscription)
  )
});
