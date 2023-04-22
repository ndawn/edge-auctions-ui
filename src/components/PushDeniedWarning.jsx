import { Tooltip } from '@mui/material';
import NotificationImportantOutlinedIcon from '@mui/icons-material/NotificationImportantOutlined';

const PushDeniedWarning = () => (
  <Tooltip title="Уведомления отключены. Чтобы получать уведомления о событиях, разрешите получение уведомлений в настройках браузера, а затем перезагрузите страницу">
    <NotificationImportantOutlinedIcon sx={{ fontSize: '2.3em', color: '#bd9700' }} />
  </Tooltip>
);

export default PushDeniedWarning;
