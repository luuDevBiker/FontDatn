import styled from 'styled-components';
import { Layout } from "antd";
export const MainWrapper = styled(Layout)`
    background-color: ${({ theme }) => theme.colors.background};
    .site-layout{
    }
`
export const MainLayOut = styled.div`
    margin: 100px 200px 0 200px;
    position: relative;
    top: 42px;
    background-color: ${({ theme }) => theme.colors.background};
    min-height: calc(100vh - 124px);
    display: block;
`
export const MainLayOutFooter = styled.div`
    color: rgba(0, 0, 0, 0.45);
    margin-top: 20px;
    margin-right: 24px;
    padding-bottom: 24px;
    text-align: right;
    background-color: ${({ theme }) => theme.colors.background};
`
