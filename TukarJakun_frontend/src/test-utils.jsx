import React, {useMemo, useReducer} from 'react'
import { render } from '@testing-library/react'
import Context from './Context';
import { globalReducer, initialState, initialFunction } from './Reducer';

const AllTheProviders = ({ children }) => {
    const [ state, dispatch ] = useReducer(globalReducer, initialState, initialFunction);
	const providerValue = useMemo(() => ({ state, dispatch }), [ state, dispatch ]);

  return (
    <Context.Provider value={providerValue}>
        {children}
    </Context.Provider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }