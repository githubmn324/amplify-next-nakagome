import { Amplify } from 'aws-amplify';
import awsExports from '@/src/aws-exports';

import "@aws-amplify/ui-react/styles.css";
import '@/styles/globals.css'

Amplify.configure({
  ...awsExports, 
  ssr: true
})

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
