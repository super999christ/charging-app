import React, { memo, Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';

const fallback = (
  <Box
    sx={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <CircularProgress />
  </Box>
);

const WithSuspense = (Component: any) => {
  function WrappedComponent() {
    return (
      <Suspense fallback={fallback}>
        <Component />
      </Suspense>
    );
  }
  return memo(WrappedComponent);
};

export default WithSuspense;
