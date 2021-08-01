import React from 'react';
import { render, screen } from '../../test-utils';
// import { render } from '@testing-library/react';
import RegisterP from './RegisterP';

it("checkUsernameFormRendered", () => {
	const { queryByTitle } = render(<RegisterP />)
	const usernameForm = queryByTitle("usernameForm");
	expect(usernameForm).toBeTruthy();
})

it("checkPasswordFormRendered", () => {
	const { queryByTitle } = render(<RegisterP />)
	const passwordForm = queryByTitle("passwordForm");
	expect(passwordForm).toBeTruthy();
})

it("checkRolesFormRendered", () => {
	const { queryByTitle } = render(<RegisterP />)
	const rolesOptions = queryByTitle("rolesOptions");
	expect(rolesOptions).toBeTruthy();
})

it("checkLoginButtonRendered", () => {
	const { queryByTitle } = render(<RegisterP />)
	const registerBtn = queryByTitle("registerBtn");
	expect(registerBtn).toBeTruthy();
})

it("checkDontHaveAccountButtonRendered", () => {
	const { queryByTitle } = render(<RegisterP />)
	const loginBtn = queryByTitle("loginInRegisterBtn");
	expect(loginBtn).toBeTruthy();
})