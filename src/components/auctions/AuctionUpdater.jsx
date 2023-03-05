import { useListener } from 'react-bus';

const AuctionUpdater = ({ auction, onUpdated }) => {
  useListener(`auctionBidCreated:${auction.id}`, onUpdated);
  useListener(`auctionDateDueUpdated:${auction.id}`, onUpdated);

  return <></>;
};

export default AuctionUpdater;
