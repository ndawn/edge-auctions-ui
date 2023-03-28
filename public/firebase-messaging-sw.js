importScripts('https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.1.1/firebase-messaging.js');

let accessToken;

const firebaseConfig = {
  apiKey: 'AIzaSyDJRR1Aq82-rvaT5untfF5zigEtl95OIzw',
  authDomain: 'edgecomicsru.firebaseapp.com',
  projectId: 'edgecomicsru',
  messagingSenderId: '935662148500',
  appId: '1:935662148500:web:d3a51cd664a58392',
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.getToken(
  { vapidKey: 'BJts950fNtsjZ2AliU1dUGYc_MdfAgrLPhaB16py0DvkpCzf2N9NHh-m7ky8WN1n2tUpZGEDqBx-bWMAQ-fnnrQ' },
).then((token) => {
  console.log(token);
});

const messageHandler = (payload) => {
  console.log(payload);

  if (payload.data?.type === 'auctionBidBeaten') {
    const title = 'Ваша ставка бита!';
    const options = {
      body: payload.data?.name,
      data: { url: '/page/auctions' },
      icon: '/favicon.png',
    };

    return self.registration.showNotification(title, options);
  }

  if (payload.data?.type === 'auctionWon') {
    const title = 'Поздравляем, вы выиграли!';

    const countText = (
      +payload.data?.auctionCount === 1
      ? `Ваша ставка победила в ${payload.data?.auctionCount} аукционе`
      : `Ваша ставка победила в ${payload.data?.auctionCount} аукционах`
    )

    const options = {
      body: countText,
      data: { url: '/page/auctions' },
      icon: '/favicon.png',
    };

    return self.registration.showNotification(title, options);
  }
};

messaging.onBackgroundMessage(messageHandler);

const updateSubscription = (subscription) => fetch(
  '/api/push/subscribe',
  {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` },
    body: subscription.toJSON(),
  },
);

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
