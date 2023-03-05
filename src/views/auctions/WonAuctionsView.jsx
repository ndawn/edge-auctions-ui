import { useGetWonAuctionsQuery } from 'store/slices/api';
import WonAuctions from 'components/auctions/WonAuctions';
import WonAuctionsSkeleton from 'components/auctions/WonAuctionsSkeleton';
import NoAuctions from 'components/auctions/NoAuctions';

const WonAuctionsView = () => {
  const { data: packs, isFetching } = useGetWonAuctionsQuery();

  return (
        isFetching
        ? <WonAuctionsSkeleton />
        : (
          packs && packs.length > 0
          ? <WonAuctions packs={packs} />
          : <NoAuctions />
        )
  );
};

export default WonAuctionsView;
