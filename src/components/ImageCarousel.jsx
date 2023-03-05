import { useEffect, useState } from 'react';

import { Backdrop, Box, IconButton, Paper } from '@mui/material';
import CropFreeOutlinedIcon from '@mui/icons-material/CropFreeOutlined';
import { styled } from '@mui/material/styles';
import ScrollBar from 'react-perfect-scrollbar';

import { getMainImage } from 'utils/auctions';
import Carousel from 're-carousel';
import CarouselButtons from 'components/CarouselButtons';
import Thumb from 'components/Thumb';
import Thumbs from 'components/Thumbs';

const MainImageContainer = styled(Paper)({
  position: 'relative',
  background: 'none',
  border: 'none',
  overflow: 'hidden',
});

const MainImage = styled('img')({
  display: 'block',
  width: '100%',
  objectFit: 'cover',
  borderRadius: '8px',
  cursor: 'pointer',
});

const ZoomIn = styled(Box)({
  display: 'flex',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'backdrop-filter 0.2s cubic-bezier(0, 0.5, 0.25, 1)',

  '&& .MuiIconButton-root': {
    opacity: '0',
    transition: 'opacity 0.2s cubic-bezier(0, 0.5, 0.25, 1)',
  },

  '&:hover': {
    backdropFilter: 'brightness(0.7) blur(3px)',

    '&& .MuiIconButton-root': {
      opacity: '1',
    }
  }
});

const FullscreenImageContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px',
  boxSizing: 'border-box',
});

const FullscreenImage = styled('img')({
  objectFit: 'contain',
  maxWidth: '100%',
  maxHeight: '100%',
});

const FullScreenCarousel = ({ images, frontImage, open, onClose }) => {
  const [ sortedImages, setSortedImages ] = useState(images);

  useEffect(() => {
    setSortedImages((previousValue) => {
      const copy = previousValue.slice();

      const index = copy.findIndex((image) => image.id === frontImage?.id);

      if (index === -1) {
        return copy;
      }

      copy.splice(index, 1);
      copy.splice(0, 0, frontImage);

      return copy;
    });
  }, [images, frontImage]);

  const preventClose = (event) => {
    event.stopPropagation();
  }

  return (
    <Backdrop
      open={open}
      onClick={onClose}
      sx={{ zIndex: 200 }}
    >
      <Carousel onClick={preventClose} widgets={[CarouselButtons]}>
        {sortedImages.map((image) => (
          <FullscreenImageContainer key={image.id}>
            <FullscreenImage src={`/${image.urls.full}`} onClick={preventClose} />
          </FullscreenImageContainer>
        ))}
      </Carousel>
    </Backdrop>
  )
};

const ImageCarousel = ({ images }) => {
  const [ currentImage, setCurrentImage ] = useState(null);
  const [ isFullscreen, setIsFullscreen ] = useState(false);

  useEffect(() => {
    setCurrentImage(getMainImage({ images }));
  }, []);

  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  return (
    <>
      <MainImageContainer elevation={3}>
        <MainImage src={`/${currentImage?.urls.full}`} />
        <ZoomIn>
          <IconButton size="large" color="grey" onClick={openFullscreen}>
            <CropFreeOutlinedIcon color="inherit" />
          </IconButton>
        </ZoomIn>
      </MainImageContainer>
      <Thumbs>
        <ScrollBar style={{ width: '100%', height: '72px' }}>
          {images.map((image) => (
            <Thumb
              key={image.id}
              src={`/${image.urls.small}`}
              onMouseEnter={() => setCurrentImage(image)}
            />
          ))}
        </ScrollBar>
      </Thumbs>
      <FullScreenCarousel
        images={images}
        current={currentImage}
        open={isFullscreen}
        onClose={closeFullscreen}
      />
    </>
  );
};

export default ImageCarousel;
