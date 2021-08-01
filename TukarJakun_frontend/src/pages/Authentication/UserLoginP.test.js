import React from 'react';
import { render, screen } from '../../test-utils';
// import { render } from '@testing-library/react';
import UserLoginP from './UserLoginP';

it("checkUsernameFormRendered", () => {
	const { queryByTitle } = render(<UserLoginP />)
	const registerBtn = queryByTitle("usernameForm");
	expect(registerBtn).toBeTruthy();
})

it("checkPasswordFormRendered", () => {
	const { queryByTitle } = render(<UserLoginP />)
	const registerBtn = queryByTitle("passwordForm");
	expect(registerBtn).toBeTruthy();
})

it("checkLoginButtonRendered", () => {
	const { queryByTitle } = render(<UserLoginP />)
	const loginBtn = queryByTitle("loginBtn");
	expect(loginBtn).toBeTruthy();
})

it("checkDontHaveAccountButtonRendered", () => {
	const { queryByTitle } = render(<UserLoginP />)
	const registerBtn = queryByTitle("registerInLoginBtn");
	expect(registerBtn).toBeTruthy();
})