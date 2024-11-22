import React, { useState, useEffect } from 'react'
import { IntlProvider, MessageFormatElement } from 'react-intl'
import { flatten } from 'flat'
import useConfig from '../../hooks/useConfig'

const loadLocaleData = (locale: string) => {
	// Se ci sono più lingue da gestire aggiungere qui uno switch
	return import('utils/locales/it.json')
}

// ==============================|| LOCALIZATION ||============================== //

interface LocalsProps {
	children: React.ReactNode
}

function Locales({ children }: LocalsProps) {
	const { locale } = useConfig()
	const [messages, setMessages] = useState<Record<string, string> | Record<string, MessageFormatElement[]> | undefined>()

	useEffect(() => {
		loadLocaleData(locale).then((d: any) => {
			setMessages(flatten(d.default))
		})
	}, [locale])

	return (
		<>
			{messages && (
				<IntlProvider locale={locale} defaultLocale="it" messages={messages}>
					{children}
				</IntlProvider>
			)}
		</>
	)
}

export default Locales
