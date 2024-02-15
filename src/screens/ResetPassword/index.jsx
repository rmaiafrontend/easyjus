import { Content, LeftContent, RightContent } from "./style";
import { ResetForm } from "../../Components/Forms/formReset/ResetForm";

export function SectionResetPassword() {
  return (
    <>
      <Content>
        <LeftContent></LeftContent>
        <RightContent>
          <ResetForm></ResetForm>
        </RightContent>
      </Content>
    </>
  );
}
