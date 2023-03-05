import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { Button as BaseButton, ButtonGroup, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import { styled } from '@mui/material/styles';

import { areBidsAvailable as areBidsAvailableHelper, isBuyoutAvailable } from 'utils/auctions';

import BidValue from './BidValue';
import PlaceBid from './PlaceBid';
import TimeLeftTimer from './TimeLeftTimer';
import ItemDescription from 'components/ItemDescription';
import ImageCarousel from 'components/ImageCarousel';
import { useState } from 'react';
import ItemHeader from 'components/ItemHeader';

const Button = styled(BaseButton)({
  paddingTop: '12px',
  paddingBottom: '12px',
  fontSize: '1em',
  lineHeight: '1em',

  '&:disabled': {
    color: '#7a66b9',
  }
});

const Auction = ({ auction, onBidCreated, onCompleted }) => {
  const [ isBidModalOpen, setIsBidModalOpen ] = useState(false);
  const [ isBuyout, setIsBuyout ] = useState(false);

  const areBidsAvailable = useMemo(() => areBidsAvailableHelper(auction), [auction]);

  const onBuyoutClick = () => {
    setIsBuyout(true);
    setIsBidModalOpen(true);
  };

  const onBidCreatedSelf = async (value) => {
    const error = await onBidCreated(value);

    if (!error) {
      onBidModalClose();
    }

    return error;
  };

  const onBidModalClose = () => {
    setIsBidModalOpen(false);
    setTimeout(() => setIsBuyout(false), 150);
  };

  return (
    <>
      <Grid container spacing={8} color="white" sx={{ marginTop: '12px' }}>
        <Grid xs={12} md={4}>
          <ImageCarousel images={auction.item.images} />
        </Grid>
        <Grid xs={12} md={8}>
          <ItemHeader item={auction.item} />
          <Grid container spacing={4} sx={{ paddingLeft: 0, paddingRight: 0 }}>
            <Grid item xs={12} md={6}>
              <ItemDescription item={auction.item} />
            </Grid>
            <Grid item xs={12} md={6}>
              <BidValue
                auction={auction}
                variant="h3"
                withLabel
                sx={{
                  margin: '0',
                  marginBottom: '24px',
                }}
              />
              {auction.endedAt === null ? (
                <TimeLeftTimer
                  auction={auction}
                  sx={{ margin: '24px 0' }}
                  onCompleted={onCompleted}
                />
              ) : (
                <>
                  <Typography sx={{ color: '#7a66b9', marginBottom: '8px' }}>Аукцион завершен</Typography>
                  {auction.isLastBidOwn && (
                    <>
                      <Typography sx={{ margin: '16px 0' }}>Поздравляем, вы выиграли в этом аукционе!</Typography>
                      {auction.invoiceLink ? (
                        <Link to={auction.invoiceLink} target="_blank">
                          <Button variant="contained" disableElevation fullWidth startIcon={<CreditCardOutlinedIcon />}>Оплатить выигрыш</Button>
                        </Link>
                      ) : <Typography sx={{ color: '#7a66b9' }}>Оплата выигранных аукционов будет доступна при завершении текущего набора</Typography>}
                    </>
                  )}
                </>
              )}
              {areBidsAvailable && (
                <ButtonGroup fullWidth>
                  <Button
                    size="large"
                    variant="contained"
                    disabled={auction.isLastBidOwn}
                    onClick={() => setIsBidModalOpen(true)}
                  >{auction.isLastBidOwn ? 'Ваша ставка последняя' : 'Сделать ставку'}</Button>
                  {isBuyoutAvailable(auction) && (
                    <Button
                      size="large"
                      variant="contained"
                      onClick={onBuyoutClick}
                    >Выкупить лот</Button>
                  )}
                </ButtonGroup>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <PlaceBid auction={auction} open={isBidModalOpen} isBuyout={isBuyout} onBidCreated={onBidCreatedSelf} onClose={onBidModalClose} />
    </>
  );
};

export default Auction;
