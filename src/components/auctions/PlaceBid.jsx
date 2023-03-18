import { useEffect, useState } from 'react';

import { Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, TextField, Typography } from '@mui/material';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import { LoadingButton } from '@mui/lab';
import { styled, useTheme } from '@mui/material/styles';

import ItemHeader from 'components/ItemHeader';
import config from 'config';

const BidInputField = styled((props) => (
  <TextField
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <CurrencyRubleIcon sx={{ color: '#ffffff' }} />
        </InputAdornment>
      )
    }}
    {...props}
  />
))({
  marginTop: '8px',
  background: 'none',

  '& .MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputAdornedStart': {
    color: '#ffffff',
    background: '#2d2740',
  },

  '& .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-formControl.MuiInputBase-adornedStart': {
    background: '#2d2740',
  },

  '& .MuiInputLabel-root': {
    color: '#ffffff',
  },
});

const BidValue = ({ auction, open, isBuyout, onBidCreated, onClose }) => {
  const theme = useTheme();

  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  const [ bidValue, setBidValue ] = useState(0);
  const [ bidMinValue, setBidMinValue ] = useState(0);

  const getAppropriateValue = (start) => {
    let result = start;

    while (result / auction.item.priceCategory.bidMultipleOf !== 0) {
      result++;
    }

    return result;
  };

  useEffect(() => {
    if (isBuyout && auction.item.priceCategory.buyNowPrice) {
      setBidMinValue(auction.item.priceCategory.buyNowPrice);
      setBidValue(auction.item.priceCategory.buyNowPrice);
    } else {
      setBidMinValue(
        getAppropriateValue(
          auction.lastBidValue
            ? auction.lastBidValue + auction.item.priceCategory.bidMinStep
            : auction.item.priceCategory.bidStartPrice
        )
      );
      setBidValue(
        getAppropriateValue(
          auction.lastBidValue
            ? auction.lastBidValue + auction.item.priceCategory.bidMinStep
            : auction.item.priceCategory.bidStartPrice
        )
      );
    }
  }, [auction, isBuyout]);

  const onBidCreatedSelf = async (value) => {
    setIsLoading(true);
    const err = await onBidCreated(isBuyout ? -1 : value);
    setIsLoading(false);

    if (!err) {
      onClose?.();
      return;
    }

    setError(err);
  };

  const processInput = (value) => {
    if (
      isNaN(+value)
      || value.includes('.')
      || value.includes('-')
      || +value > config.bidValueLimit
    ) {
      return;
    }

    if (+value < bidMinValue || +value % auction.item.priceCategory.bidMultipleOf !== 0) {
      setError(`Ставка должна быть больше ${bidMinValue} рублей и кратна ${auction.item.priceCategory.bidMultipleOf}`);
    } else {
      setError(null);
    }

    setBidValue(+value);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiPaper-root': {
          width: '300px',
          color: '#ffffff',
          backgroundColor: '#1b162b',
        }
      }}
    >
      <DialogTitle fontSize={24} color="inherit">
        <ItemHeader item={auction.item} variant="h3" />
      </DialogTitle>
      <DialogContent>
        {isBuyout
          ? (
            <>
              <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', color: '#ffffff' }}>Стоимость выкупа лота:</Typography>
              <Typography variant="h3" sx={{ textAlign: 'center', color: '#ffffff' }}>{auction.item.priceCategory.buyNowPrice} рублей</Typography>
            </>
          ) : (
            <BidInputField
              fullWidth
              variant="outlined"
              label="Ваша ставка"
              error={error}
              value={bidValue}
              onChange={(event) => processInput(event.target.value)}
            />
          )}
          {error && <Typography variant="caption" color="error" sx={{ display: 'block', marginTop: '8px' }}>{error}</Typography>}
      </DialogContent>
      <DialogActions sx={{ padding: '0 24px 20px' }}>
        <LoadingButton
          variant="contained"
          size="large"
          fullWidth
          disableElevation
          disabled={Boolean(auction.isLastBidOwn || error)}
          loading={isLoading} onClick={() => onBidCreatedSelf(bidValue)}
        >
          {isBuyout ? 'Подтвердить выкуп' : `Поставить ${bidValue} рублей`}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default BidValue;
