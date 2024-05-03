import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Button, Text } from '@chakra-ui/react'

const ErrorPage = ({ message = null }) => {
  const handleGoBack = () => {
    window.history.back(); // Go back using window.history
  };

  return (
    <Box height={'100%'} className='m-10'>
      <Text fontSize='4xl' >Error Page</Text>
      <Text fontSize='xl' >{message || 'There was an error'}</Text>
      <Button leftIcon={<ArrowBackIcon />} colorScheme='dark' bg={'black'} color={'white'} variant='outline' onClick={handleGoBack}>Go back</Button>
    </Box>
  )
}

export default ErrorPage;
