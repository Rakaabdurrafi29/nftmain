import { http, createConfig } from "@wagmi/core";
import { polygonAmoy, polygon } from "@wagmi/core/chains";

export const config = createConfig({
    chains: [polygonAmoy, polygon],
    transports: {
        [polygonAmoy.id]: http(),
        [polygon.id]: http(),
    },
});
