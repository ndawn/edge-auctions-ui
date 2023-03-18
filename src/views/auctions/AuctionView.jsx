import { useState } from 'react';
import { useParams } from 'react-router';

import { useToast } from 'use-toast-mui';

import { useCreateBidMutation, useGetAuctionQuery } from 'store/slices/api';
import Auction from 'components/auctions/Auction';
import AuctionViewSkeleton from 'components/auctions/AuctionViewSkeleton';
import BaseContainer from 'components/BaseContainer';
import { createBidFailReason } from 'store/constant';
import { useEffect } from 'react';
import AuctionUpdater from 'components/auctions/AuctionUpdater';

const AuctionView = () => {
  const params = useParams();
  const toast = useToast();

  const { data: auction, isFetching, refetch } = useGetAuctionQuery(params.auctionId);
  const [ createBid, createBidResult ] = useCreateBidMutation();

  const [ updater, setUpdater ] = useState(null);

  useEffect(() => {
    if (auction && auction.endedAt === null) {
      setUpdater(<AuctionUpdater auction={auction} onUpdated={() => refetch()} />);
    } else {
      setUpdater(null);
    }
  }, [auction]);

  const onBidCreated = async (value) => {
    try {
      await createBid({ auctionId: auction.id, value }).unwrap();
      toast.success('Ставка размещена');
    } catch (err) {
      console.error(err);
      console.error(err?.data?.extra?.reason);

      if (err?.data?.extra?.reason) {
        return createBidFailReason[err.data.extra.reason];
      }

      refetch();
      toast.error('Ошибка при размещении ставки');
    }

    refetch();
  };

  const onCompleted = () => {
    refetch();
  };

  return (
    <BaseContainer>
      {isFetching
        ? <AuctionViewSkeleton />
        : (
          <>
            {updater}
            <Auction auction={auction} onBidCreated={onBidCreated} onCompleted={onCompleted} />
          </>
        )}
    </BaseContainer>
  );
};

export default AuctionView;
