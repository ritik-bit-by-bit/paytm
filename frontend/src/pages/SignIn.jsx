
import { Button } from "../components/Button"
import { ButtonWarning } from "../components/ButtonWarning"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"

export const SignIn=()=>{
    return (
        <div className='justify-self-center pt-24'>
          <div className='h-82 w-80  bg-blue-100 rounded-3xl drop-shadow-lg '>
           <Heading label={"SignIn"}></Heading>
           <SubHeading label={"Enter Your credentials to access your Account "}></SubHeading>
            <InputBox label={"Email"} placeholder={"test123@gmail.com"}></InputBox>
            <InputBox label={"password"} placeholder={"1234"}></InputBox>
            <Button label={"Sign In"}></Button>
            <ButtonWarning statement={"Already have an Account ? "} textTo={"SignIn"}to={"/SignIn"}></ButtonWarning>
          </div>
        </div>
    )
}