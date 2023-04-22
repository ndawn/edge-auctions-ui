import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Box, Paper } from '@mui/material';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import { styled, useTheme } from '@mui/material/styles';
import { useListener } from 'react-bus';

import { getMainImage } from 'utils/auctions';
import ClampedText from 'components/ClampedText';
import BlurContainer from 'components/BlurContainer';
import BidValue from './BidValue';
import TimeLeft from './TimeLeft';

const Card = styled(Paper)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  height: '100%',
  borderRadius: '8px',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  transition: 'transform 0.2s cubic-bezier(0, 0.5, 0.25, 1)',

  '&:hover': {
    transform: 'scale(1.1)',
  }
}));

const Cover = styled('img')({
  display: 'block',
  width: '100%',
  objectFit: 'cover',
  borderRadius: '8px',
});

const Content = styled(Box)({
  display: 'flex',
  position: 'absolute',
  top: 0,
  left: 0,
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '16px',
  boxSizing: 'border-box',
  width: '100%',
  height: '100%',
  color: 'white',
});

const ContentSection = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '4px',
  color: 'inherit !important',
});

const AnimatedOutlineBlurContainer = styled(BlurContainer)({
  boxShadow: '0 0 0 rgba(204,169,44, 0.4)',
  animation: 'bs-pulse 2s 1, bs-lift 0.5s 1',
});

const AnimatedShakeBlurContainer = styled(BlurContainer)({
  animation: 'bs-shake 0.5s 1',
});

const AuctionCard = ({ auction }) => {
  const theme = useTheme();

  const [ bidValueContainer, setBidValueContainer ] = useState(auction);
  const [ dateDueContainer, setDateDueContainer ] = useState(auction);

  const [ bidValueChanged, setBidValueChanged ] = useState(false);
  const [ dateDueChanged, setDateDueChanged ] = useState(false);

  useListener(`auctionBidCreated:${auction.id}`, (payload) => {
    setBidValueContainer({ ...auction, lastBidValue: payload.value });
    setBidValueChanged(true);
    setTimeout(() => setBidValueChanged(false), 2000);
  });

  useListener(`auctionDateDueUpdated:${auction.id}`, (payload) => {
    setDateDueContainer((prevAuction) => ({ ...prevAuction, dateDue: payload.dateDue }));
    setDateDueChanged(true);
    setTimeout(() => setDateDueChanged(false), 2000);
  });

  return (
    <Link to={`/auctions/${auction.id}`}>
      <Card elevation={5}>
        <Cover src={getMainImage(auction.item)?.urls.full} />
        <Content>
          <ContentSection>
            <AnimatedShakeBlurContainer sx={!dateDueChanged && { animation: 'none' }}>
              <TimeLeft auction={dateDueContainer} variant="caption" />
            </AnimatedShakeBlurContainer>
            {auction.endedAt === null && (
              <AnimatedOutlineBlurContainer sx={!bidValueChanged && { animation: 'none' }}>
                <BidValue auction={bidValueContainer} variant="caption" />
              </AnimatedOutlineBlurContainer>
            )}
          </ContentSection>
          <ContentSection>
            <BlurContainer>
              <ClampedText
                variant="caption"
                title={auction.item.type.name}
                color={theme.palette.primary.light}
                fontSize="0.9em"
              >
                <WidgetsOutlinedIcon
                  sx={{
                    marginRight: '4px',
                    marginBottom: '2px',
                    fontSize: '1em',
                    verticalAlign: 'middle',
                  }}
                />
                {auction.item.type.name}
              </ClampedText>
              <ClampedText title={auction.item.name} fontSize="1em">{auction.item.name}</ClampedText>
            </BlurContainer>
          </ContentSection>
        </Content>
      </Card>
    </Link>
  );
};

export default AuctionCard;
