import { createContext, ReactNode } from 'react'
import useLocalStorage from 'hooks/useLocalStorage'
import { CustomizationProps } from 'types/config'

// initial state
const initialState: CustomizationProps = {
	locale: 'en',
	onChangeLocale: (locale: string)=> {}
}

// ==============================|| CONFIG CONTEXT & PROVIDER ||============================== //

const ConfigContext = createContext(initialState)

type ConfigProviderProps = {
	children: ReactNode
}

function ConfigProvider({ children }: ConfigProviderProps) {
	const [config, setConfig] = useLocalStorage('revo-config-ts', {
		locale: initialState.locale
	})

	const onChangeLocale = (locale: string) => {
		setConfig({
			...config,
			locale
		})
	}

	return (
		<ConfigContext.Provider
			value={{
				...config,
				onChangeLocale,
			}}>
			{children}
		</ConfigContext.Provider>
	)
}

export { ConfigProvider, ConfigContext }
