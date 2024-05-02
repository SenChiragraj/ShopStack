import { Box, Button, Text } from '@chakra-ui/react'
const ErrorPage = (message = null) => {
  return (
    <Box height={'100%'} className='m-10'>
      <Text fontSize='4xl' >Error Page</Text>
      <Text fontSize='3xl' textColor={'red'} >{message}</Text>
      <Button colorScheme='teal' size='sm'>Go Back</Button>
    </Box>
  )
}

export default ErrorPage