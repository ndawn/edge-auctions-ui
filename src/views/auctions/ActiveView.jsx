import { useEffect } from 'react';

import { useGetActiveAuctionsQuery } from 'store/slices/api';
import BaseContainer from 'components/BaseContainer';
import AuctionsGrid from 'components/auctions/AuctionsGrid';
import AuctionsGridSkeleton from 'components/auctions/AuctionsGridSkeleton';
import NoAuctions from 'components/auctions/NoAuctions';

const ActiveView = () => {
  const { data: auctions, isFetching, refetch } = useGetActiveAuctionsQuery();

  useEffect(() => {
    refetch();
  }, []);

  return (
    <BaseContainer title="Текущие аукционы">
      {isFetching
        ? <AuctionsGridSkeleton />
        : ((auctions && auctions.length > 0)
          ? <AuctionsGrid auctions={auctions ?? []} />
          : <NoAuctions />)}
    </BaseContainer>
  );
};

export default ActiveView;
