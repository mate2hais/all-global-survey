import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";
import { createServerFn } from "@tanstack/react-start";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingContact } from "@/components/site/FloatingContact";
import { Toaster } from "@/components/ui/sonner";


function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  const reportedError = error instanceof Error ? error : new Error(String(error));
  console.error(reportedError);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(reportedError, { boundary: "tanstack_root_error_component" });
  }, [reportedError]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

type GTagFn = (...args: unknown[]) => void;

// Google Analytics measurement ID lives in the secret store; it is a public
// identifier (safe for the browser), but it must be read server-side and
// handed to the client through a server function.
const getAnalyticsConfig = createServerFn({ method: "GET" }).handler(() => ({
  measurementId: process.env["GOOGLE_ANALYTICS_MEASUREMENT_ID"] ?? null,
}));

function GoogleAnalytics() {
  const { measurementId } = Route.useLoaderData();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!measurementId) return;
    const w = window as unknown as { dataLayer?: unknown[]; gtag?: GTagFn };
    w.dataLayer = w.dataLayer || [];
    if (w.gtag) return;
    const gtagFn: GTagFn = (...args) => {
      w.dataLayer!.push(args);
    };
    w.gtag = gtagFn;
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
    gtagFn("set", "developer_id.dZjgwMW", true);
    gtagFn("js", new Date());
    gtagFn("config", measurementId);
  }, [measurementId]);

  // SPA navigations don't reload the page, so report each route change.
  useEffect(() => {
    if (!measurementId) return;
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // initial page_view is sent by gtag("config", ...)
    }
    const w = window as unknown as { gtag?: GTagFn };
    w.gtag?.("event", "page_view", {
      page_path: pathname,
      page_title: document.title,
    });
  }, [pathname, measurementId]);

  return null;
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  staticData: { sitemap: false },
  loader: async () => {
    try {
      return await getAnalyticsConfig();
    } catch {
      return { measurementId: null as string | null };
    }
  },
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Auditor Energetic Galați — Iulian Gabriel Panainte, Gradul I" },
      {
        name: "description",
        content:
          "Certificate energetice, audituri pentru clădiri și industrie, consultanță NZEB și SER în Galați și tot județul. Auditor atestat Gradul I. Tel. 0773.932.496",
      },
      { name: "author", content: "Iulian Gabriel Panainte" },
      { property: "og:site_name", content: "Iulian Gabriel Panainte — Auditor Energetic Galați" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ro_RO" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=optional",
      },
      { rel: "icon", href: "/save-energy.png", type: "image/png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Iulian Gabriel Panainte — Auditor Energetic Gradul I",
          telephone: "+40773932496",
          areaServed: "Județul Galați, România",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Galați",
            addressRegion: "Galați",
            addressCountry: "RO",
          },
          knowsAbout: [
            "certificat energetic",
            "audit energetic",
            "audit energetic industrial",
            "NZEB",
            "surse de energie regenerabilă",
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ro">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <GoogleAnalytics />
      <div className="flex min-h-screen flex-col font-[Manrope,ui-sans-serif,system-ui]">
        <Header />
        <main className="flex-1">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </main>
        <Footer />
        <FloatingContact />
        <Toaster position="top-center" richColors />
      </div>
    </QueryClientProvider>
  );
}

