import { ThirdwebProvider } from '@thirdweb-dev/react';
import '../styles/globals.css';
// import "../css/tailwind.css";


// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = 'mumbai';

function MyApp({ Component, pageProps }) {
	return (
		<ThirdwebProvider
		    attribute="class"
			activeChain={activeChain}
			clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
		>
			<Component {...pageProps} />
		</ThirdwebProvider>
	);
}

export default MyApp;
