import { useGetOwnAuctionsQuery } from 'store/slices/api';
import AuctionsGrid from 'components/auctions/AuctionsGrid';
import AuctionsGridSkeleton from 'components/auctions/AuctionsGridSkeleton';
import NoAuctions from 'components/auctions/NoAuctions';

const OwnAuctionsView = () => {
  const { data: auctions, isFetching } = useGetOwnAuctionsQuery();

  return (
        isFetching
        ? <AuctionsGridSkeleton />
        : (
          auctions && auctions.length > 0
          ? <AuctionsGrid auctions={auctions} />
          : <NoAuctions />
        )
  );
};

export default OwnAuctionsView;
