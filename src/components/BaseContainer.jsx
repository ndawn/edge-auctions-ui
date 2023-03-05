import { useContext } from 'react';
import { useNavigate } from 'react-router';

import { Box, Container, Link, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

import PushPermissionContext from 'utils/pushPermissionContext';
import PushDeniedWarning from 'components/PushDeniedWarning';
import MyAuctionsIcon from 'components/MyAuctionsIcon';

const StyledContainer = styled(Container)({
  marginTop: '48px',
  marginBottom: '48px',
  overflow: 'hidden',
  minHeight: 'calc(100vh - 288px)',
});

const BaseContainer = ({ title, children, ...props }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const pushPermissionState = useContext(PushPermissionContext);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <StyledContainer {...props}>
      <Box sx={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
        <Box>
          {pushPermissionState !== 'granted' && <PushDeniedWarning />}
          <MyAuctionsIcon />
        </Box>
        <Box>
          {title && (
            <Typography variant="h1" color={theme.palette.primary.light}>{title}</Typography>
          )}
          {window.location.pathname !== '/' && (
            <Link
            size="small"
            onClick={goBack}
            sx={{ display: 'block', marginTop: '8px', color: '#7a66b9', cursor: 'pointer' }}
            >Назад</Link>
          )}
        </Box>
      </Box>
      {children}
    </StyledContainer>
  );
};

export default BaseContainer;
