import { Content, LeftContent, RightContent } from "./style";
import { AccountForm } from "../../Components/Forms/formLogin/acountForm";

export function SectionLogin() {
  return (
    <>
      <Content>
        <LeftContent></LeftContent>
        <RightContent>
          <AccountForm />
        </RightContent>
      </Content>
    </>
  );
}
