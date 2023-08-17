import { RegisterForm } from "../../Components/Forms/register/login";
import { Content, LeftContent, RightContent } from "./style";

export function SectionRegister() {
  return (
    <>
      <Content>
        <LeftContent></LeftContent>
        <RightContent>
          <RegisterForm />
        </RightContent>
      </Content>
    </>
  );
}
