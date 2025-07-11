import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { ILoginResponse } from './user';

export interface LayoutProps {
	children: ReactNode
}
export type NextPageWithLayout = NextPage & {
	Layout?: (props: LayoutProps) => ReactElement
}
export type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}
export interface IPagination{
	page:number, 
	perPage:number,
}

export interface IMainHeaderProps {
	loginInfo: ILoginResponse
}