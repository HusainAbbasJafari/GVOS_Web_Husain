import '@/app/globals.css';
import ClientLayout from '@/components/ClientLayout';
import SessionWrapper from '@/components/SessionWrapper';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import "nprogress/nprogress.css"; // Import styles
import { Toaster } from 'sonner';
import { Providers } from './providers';

export const metadata = {
  title: "Greenstone",
  description: "The Best Way To Access The French Property Market",
};

export default async function RootLayout({ children }) {
  const locale = await getLocale();
  const messages = await getMessages();


  return (
    <html lang={locale}>
      <body>
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ClientLayout>
              <SessionWrapper>
                {children}
              </SessionWrapper>
              <Toaster richColors position="top-center" />
            </ClientLayout>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}

