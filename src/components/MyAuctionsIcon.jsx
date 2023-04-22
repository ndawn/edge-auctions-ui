import { Link } from 'react-router-dom';

import { Badge, IconButton, Tooltip } from '@mui/material';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';

import { useGetWonAuctionsQuery } from 'store/slices/api';

const MyAuctionsIcon = () => {
  const { data: packs } = useGetWonAuctionsQuery();

  return (
    <Tooltip title="Мои аукционы">
      <Link to="/my">
        <Badge color="error" variant="dot" overlap="circular" invisible={!packs || packs.length === 0}>
          <IconButton sx={{ padding: 0, color: 'white' }}>
            <EmojiEventsOutlinedIcon sx={{ fontSize: '1.5em', color: 'white', textDecoration: 'none' }} />
          </IconButton>
        </Badge>
      </Link>
    </Tooltip>
  );
};

export default MyAuctionsIcon;
