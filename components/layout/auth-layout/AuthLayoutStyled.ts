import styled from 'styled-components';
import logo from '../../../assets/images/bg_kpi.png'
import bg from '@/assets/icons/backgroand.png'
export const LayoutWrapper = styled.div`
  /* background: url('https://ucarecdn.com/d7559cd6-d0b4-4989-97d0-addb7a14a957/bg.png') no-repeat ; */
  background-color: #F0F0F0;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: space-between;
  object-fit: cover;
  object-fit: cover;
`;
export const LayoutAuthTop = styled.div``;

export const LanguageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 25px;
  padding-top: 13px;

  .text {
    margin: 0px 6px 0 16px;
    font-weight: 400;
  }
`;
export const LogoAuth = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 60px;

  .text_logo {
    font-weight: 400;
    font-size: 33px;
    line-height: 38px;
  }
`;
export const LayoutAuthCenter = styled.div`
  width: 368px;
  margin: 0 auto;
  margin-top: 61px;
`;
export const LayoutAuthOrganization = styled.div`
  margin: 0 auto;
`;
export const LayoutAuthFooter = styled.div`
  text-align: center;
  color: rgba(0, 0, 0, 0.45);
  font-size: 16px;
  line-height: 24px;
  padding-bottom: 10px;
`;
export const LayoutImageOrganization=styled.div`
  width: 100%;

  img {
    width: 100% !important;
  }
  padding: 0 168px 0 300px;
 
`
export const LayoutFormLoginOrga=styled.div`
  width: 368px;
  margin: 0 auto;
  margin-top: 100px;
  left: 100px;
  position: absolute;
  left: -50px;
`
export const LogoAuthOrgani = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 100px;
  margin-right: 7.5px;
  .text_logo {
    font-weight: 400;
    font-size: 30px;
    margin-left: 7.5px;
    line-height: 38px;
  }
`;