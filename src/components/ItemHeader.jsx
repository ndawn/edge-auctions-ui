import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import { useTheme } from '@mui/material/styles';

import ClampedText from './ClampedText';

const ItemHeader = ({ item, variant = "h1" }) => {
  const theme = useTheme();

  return (
    <>
      <ClampedText variant={variant} color="inherit" title={item.name}>{item.name}</ClampedText>
      <ClampedText
        variant="caption"
        title={item.type.name}
        color="inherit"
      >
        <WidgetsOutlinedIcon
          sx={{
            marginRight: '4px',
            marginBottom: '2px',
            fontSize: '1em',
            verticalAlign: 'middle',
          }}
        />
        {item.type.name}
      </ClampedText>
    </>
  );
};

export default ItemHeader;
