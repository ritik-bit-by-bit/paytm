import { Button } from "../components/Button"
import { ButtonWarning } from "../components/ButtonWarning"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"

export const SignUp=()=>{
    return (
        <div className='justify-self-center pt-24'>
          <div className='h-120 w-80  bg-blue-100 rounded-3xl drop-shadow-lg '>
           <Heading label={"SignUp"}></Heading>
           <SubHeading label={"Enter Your information to create an Account "}></SubHeading>
            <InputBox label={"First Name"} placeholder={"Ritik"}></InputBox>
            <InputBox label={"Last Name"} placeholder={"Yadav"}></InputBox>
            <InputBox label={"Email"} placeholder={"test123@gmail.com"}></InputBox>
            <InputBox label={"password"} placeholder={"1234"}></InputBox>
            <Button label={"Sign Up"}></Button>
            <ButtonWarning statement={"Already have an Account ? "} textTo={"SignUp"}to={"/SignUp"}></ButtonWarning>
          </div>
        </div>
    )
}