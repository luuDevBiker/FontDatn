import React from "react";

export const RegexValidation={
	REGEXPHONENUMBER:/([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/,
	REGEXEMAIL: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
	REGEXPASSWORD:'^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*?[#?!@$%^&*-])[A-Za-z\d@$!+-=#%*()^?&]{6,}$',
	REGEXOTP:/^[0-9][0-9]\?[0-9]\?[0-9]\?[0-9]\?[0-9]\?$/,
	DOMAIN:/^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}$/,
	REGEXWHITESPACE:/\s/,
	REGEXNUMBER:/([1|2|3|4|5|6|7|8|9]+(3|5|7|8|9|1[2|6|8|9]))+([0-9])\b/,
}


export const formatStringSmart = (str: any) => {
	const maxLength = 30;
	if (str.length <= maxLength) return str;

	let trimmed = str.substring(0, maxLength);
	const lastSpace = trimmed.lastIndexOf(" ");
	if (lastSpace > 0) {
		trimmed = trimmed.substring(0, lastSpace);
	}
	return trimmed + "...";
};