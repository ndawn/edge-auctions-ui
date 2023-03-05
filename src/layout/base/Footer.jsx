import { Box, Container, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

const StyledFooter = styled('footer')({
  width: '100%',
  height: 96,
  borderTop: '1px solid #29233e',
});

const StyledContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '100%',
  color: 'white',
});

const Footer = () => {
  const theme = useTheme();

  return (
    <StyledFooter theme={theme}>
      <StyledContainer>
        <Box
          sx={{
            color: 'inherit',
            '&:hover': {
              textDecoration: 'underline',
            }
          }}
        >
          <a
            href="https://edgecomics.ru"
            target="_blank"
            style={{
              color: 'inherit',
              textDecoration: 'none',
            }}
          >Кстати, у нас есть магазин!</a>
        </Box>
        <Box>
          <Typography>Виз лав фром Едж {'<'}3, {new Date(Date.now()).getFullYear()}</Typography>
        </Box>
      </StyledContainer>
    </StyledFooter>
  );
};

export default Footer;
