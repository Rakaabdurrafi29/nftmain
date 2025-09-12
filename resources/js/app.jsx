import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

import { createAppKit } from "@reown/appkit/react";
import { WagmiProvider } from "wagmi";
import { polygonAmoy, polygon } from "@reown/appkit/networks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

const appName = import.meta.env.VITE_APP_NAME || "NFTLot.io";

const queryClient = new QueryClient();

const projectId = import.meta.env.VITE_WC_PROJECT_ID;

const metadata = {
    name: "NFTLot.io",
    description: "NFTLot.io",
    url: "https://nftlottery.test",
    icons: ["https://nftlottery.test/apple-touch-icon.png"],
};

const networks = [polygon, polygonAmoy];

const wagmiAdapter = new WagmiAdapter({
    networks,
    projectId,
    ssr: true,
});

createAppKit({
    adapters: [wagmiAdapter],
    networks,
    projectId,
    metadata,
    // themeVariables: {
    //     "--w3m-color-mix": "#222222",
    //     "--w3m-color-mix-strength": 100,
    // },
    features: {
        analytics: true, // Optional - defaults to your Cloud configuration
        swaps: false,
        onramp: false,
        legalCheckbox: true,
        connectMethodsOrder: ["wallet"],
    },
});

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <WagmiProvider config={wagmiAdapter.wagmiConfig}>
                <QueryClientProvider client={queryClient}>
                    <App {...props} />
                </QueryClientProvider>
            </WagmiProvider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
