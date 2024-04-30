import { Button } from "@chakra-ui/react"

const ButtonSection = () => {
  return (
    <div className="flex gap-4">
        <Button colorScheme='linkedin' size='sm'>Home</Button>
        <Button colorScheme='linkedin' size='sm'>Profile</Button>
        <Button colorScheme='linkedin' size='sm'>Cart</Button>
    </div>
  )
}

export default ButtonSection