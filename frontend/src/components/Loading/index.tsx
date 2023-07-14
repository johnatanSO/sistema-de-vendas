import { Box, CircularProgress } from '@mui/material'

type Props = {
  size?: number
}

export function Loading({ size }: Props) {
  return (
    <Box>
      <CircularProgress style={{ color: 'white' }} size={size || 10} />
    </Box>
  )
}
