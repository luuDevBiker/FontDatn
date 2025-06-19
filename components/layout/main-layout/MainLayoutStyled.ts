import styled from "styled-components";
import { Layout } from "antd";
export const MainWrapper = styled(Layout)`
  background-color: ${({ theme }) => theme.colors.background};
  background-image: url("https://assets.isu.pub/document-structure/230530104013-516677457fd54e456bfe38a98e2760fe/v1/80d96b2a994829e279f0cc1f44c288eb.jpeg");
`;
export const MainLayOut = styled.div`
  margin: 100px 200px 0 200px;
  position: relative;
  top: 42px;
  background-color: ${({ theme }) => theme.colors.background};
  min-height: calc(100vh - 124px);
  display: block;
`;
export const MainLayOutFooter = styled.div`
  color: rgba(0, 0, 0, 0.45);
  margin-top: 20px;
  margin-right: 24px;
  padding-bottom: 24px;
  text-align: right;
  background-color: ${({ theme }) => theme.colors.background};
`;
