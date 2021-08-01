import React from 'react';
import { render, screen } from './test-utils';
// import { render } from '@testing-library/react';
import TabBar from './components/TabBar';
import ModalP from './components/ModalP';
import Testdung from './Testdung';
import UserLoginP from './pages/Authentication/UserLoginP';

test('Tab Bar Login', () => {
	// const [ state, dispatch ] = useReducer(globalReducer, initialState, initialFunction);
	// const providerValue = useMemo(() => ({ state, dispatch }), [ state, dispatch ]);
	render(<Testdung />);
	const UploadBar = screen.getByText('Hello');
	expect(UploadBar).toBeInTheDocument();
});
