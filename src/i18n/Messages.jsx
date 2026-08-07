import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { scoped } from "./namespaces";

/**
 * Scopes the client-side message payload to one route.
 *
 * `[locale]/layout.js` provides only SHARED (nav, footer, common) so the
 * shell renders; each page wraps its own content in this to add the
 * namespaces its client components need — and nothing else.
 *
 *   export default async function Page() {
 *     return <Messages route="faq"><Faq /></Messages>;
 *   }
 */
export default async function Messages({ route, children }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={scoped(messages, route)}>
      {children}
    </NextIntlClientProvider>
  );
}
