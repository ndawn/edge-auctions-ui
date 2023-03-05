import dayjs from 'utils/dayjs';

export const getSetName = (set) => {
  const date = new Date(Date.parse(set.dateDue));
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  return `Аукционы до ${date.getUTCDate()}.${month}`;
};

export const getDateDue = (dateDue) => {
  const date = new Date(dateDue).toLocaleDateString('ru', { year: 'numeric', month: 'long', day: 'numeric' });
  const time = new Date(dateDue).toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' });

  return `${date} в ${time}`;
};

export const getTimeLeft = (dateDue) => {
  const date = dayjs(dateDue);
  const now = dayjs(Date.now());

  let currentDeltaA;
  let currentDeltaB;

  const unitMap = {
    day: ['day', 'д'],
    hour: ['hour', 'ч'],
    minute: ['minute', 'м'],
    second: ['second', 'с'],
  };

  for (let [ [ unitA, displaySymbolA ], [ unitB, displaySymbolB ], multiplier ] of [
    [unitMap.day, unitMap.hour, 24],
    [unitMap.hour, unitMap.minute, 60],
    [unitMap.minute, unitMap.second, 60],
  ]) {

    currentDeltaA = date.diff(now, unitA);

    if (currentDeltaA > 0) {
      currentDeltaB = date.diff(now, unitB) - currentDeltaA * multiplier;
      return `${currentDeltaA}${displaySymbolA} ${currentDeltaB}${displaySymbolB}`;
    }
  }

  return `${date.diff(now, 'second')}с`;
};

export const getTotal = (auctions) => auctions.reduce((sum, auction) => sum + auction.lastBidValue, 0);

export const getOffsetString = () => {
  const offsetHours = dayjs().utcOffset() / 60;
  const offsetSign = offsetHours < 0 ? '' : '+';
  const offsetAlias = dayjs.tz.guess();
  const offsetAliasSuffix = offsetAlias ? ` — ${offsetAlias}` : '';
  return `UTC${offsetSign}${offsetHours}${offsetAliasSuffix}`;
};

export const getMainImage = (item) => {
  return item.images.find((image) => image.isMain);
};

export const isBuyoutAvailable = (auction) => (
  !auction.isLastBidOwn
  && auction.item.priceCategory.buyNowPrice
  && auction.item.priceCategory.buyNowExpires
  && ((auction.lastBidValue ?? 0) < auction.item.priceCategory.buyNowExpires)
);

export const areBidsAvailable = (auction) => (
  auction.endedAt === null
  && +dayjs(auction.dateDue) > Date.now()
);

export const antiSniperEnabled = (dateDue, antiSniper) => (
  +dayjs(dateDue) <= (Date.now() + antiSniper * 60000)
);
