import React from "react";




export const RegexValidation={
	REGEXPHONENUMBER:/([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/,
	REGEXEMAIL: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
	REGEXPASSWORD:'^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*?[#?!@$%^&*-])[A-Za-z\d@$!+-=#%*()^?&]{6,}$',
	REGEXOTP:/^[0-9][0-9]\?[0-9]\?[0-9]\?[0-9]\?[0-9]\?$/,
	DOMAIN:/^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}$/,
	REGEXWHITESPACE:/\s/
}

export interface OptionProduct{
	Name:string,
	OptionValue:[
		{
			NameValue:string
		}
	]
}

export const Color=[
	{
		name:'magenta'
	},
	{
		name:'red'
	},
	{
		name:'volcano'
	},
	{
		name:'orange'
	},
	{
		name:'gold'
	},
	{
		name:'lime'
	},
	{
		name:'green'
	},
	{
		name:'cyan'
	},
	{
		name:'blue'
	},
	{
		name:'geekblue'
	},
	{
		name:'purple'
	},
	{
		name:'magenta'
	}
]