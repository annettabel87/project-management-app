import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';

export default function Preloader() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress size={25} style={{ color: 'white' }} />
    </Box>
  );
}

/*export const PreloaderForApp = () => {
  return (
    <div className={style.preloaderForApp}>
      {/!*<Space size="large">
        <Spin size="large" />
      </Space>*!/}
    </div>
  );
};*/
