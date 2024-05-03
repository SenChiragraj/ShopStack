import { Stack, Skeleton } from '@chakra-ui/react'

const SkeletonLoading = () => {
  // eslint-disable-next-line no-undef
  return (
    <Stack padding={4} spacing={1}>

      <Skeleton
        height='40px'
        isLoaded={false}
        color='white'
        fadeDuration={1}
      >
      </Skeleton>

      <Skeleton
        height='40px'
        isLoaded={false}
        fadeDuration={4}
        bg='blue.500'
        color='white'
      >
      </Skeleton><Skeleton
        height='40px'
        isLoaded={false}
        fadeDuration={4}
        bg='blue.500'
        color='white'
      >
      </Skeleton><Skeleton
        height='40px'
        isLoaded={false}
        fadeDuration={4}
        bg='blue.500'
        color='white'
      >
      </Skeleton>
    </Stack>

  )
}

export default SkeletonLoading