import { Html, Head, Main, NextScript } from 'next/document'
import { ToastContainer } from 'react-toastify';

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />
            {/* Same as */}
        <ToastContainer />
        <NextScript />
      </body>
    </Html>
  )
}