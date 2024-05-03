import { Button } from "@chakra-ui/react"
import { NavLink } from "react-router-dom"

const ButtonSection = () => {
  return (
    <div className="flex gap-4">
      <Button colorScheme='linkedin' size='sm'><NavLink to={'oral'}>Orders</NavLink></Button>
      <Button colorScheme='linkedin' size='sm'><NavLink to={'profile'}>Profile</NavLink></Button>
      <Button colorScheme='linkedin' size='sm'><NavLink to={'cart'}>Cart</NavLink></Button>
    </div>
  )
}

export default ButtonSection