import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const getStatus = (entity) => {
  if (entity.startedAt === null) {
    return 'notStarted';
  }

  if (entity.endedAt === null) {
    return 'inProcess';
  }

  return 'completed';
};

const statusText = {
  notStarted: 'Ожидает старта',
  inProcess: 'В процессе',
  completed: 'Завершен',
};

const statusColor = (theme, status) => ({
  notStarted: theme.palette.dark.main,
  inProcess: theme.palette.primary[800],
  completed: theme.palette.dark.main,
}[status]);

const Status = ({ entity, ...props }) => {
  const theme = useTheme();

  return (
    <Typography
      color={statusColor(theme, getStatus(entity))}
      fontWeight={500}
      {...props}
    >
      {statusText[getStatus(entity)]}
    </Typography>
  );
};

export default Status;
