import { SessionProvider } from 'next-auth/react'
import './styles.css'

export default function App({ Component, pageProps }) {
	return (
		<SessionProvider
			options={{
				staleTime: 0,
				refetchInterval: 0,
			}}
			session={pageProps.session}
		>
			<Component {...pageProps} />
		</SessionProvider>
	)
}
