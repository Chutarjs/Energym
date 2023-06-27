import { Box, Container, Grid, Typography } from '@mui/material'

export function Footer () {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        height: '4.5rem',
        backgroundColor: 'primary.main',
        paddingTop: '1rem',
        paddingBottom: '1rem'
      }}
    >
      <Container maxWidth='lg'>
        <Grid container direction='column' alignItems='center'>
          <Grid item xs={12}>
            <Typography color='black' variant='subtitle1'>
              ISW-613
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color='textSecondary' variant='body1'>
              {`${new Date().getFullYear()}`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

