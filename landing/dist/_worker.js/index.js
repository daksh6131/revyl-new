globalThis.process ??= {}; globalThis.process.env ??= {};
import { r as renderers } from './chunks/_@astro-renderers_CJZ3LhXa.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_JvlbF8-M.mjs';
import { manifest } from './manifest_Cq-k5YKi.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/blog.astro.mjs');
const _page1 = () => import('./pages/blog/_---slug_.astro.mjs');
const _page2 = () => import('./pages/features/cli.astro.mjs');
const _page3 = () => import('./pages/features/crash-reporting.astro.mjs');
const _page4 = () => import('./pages/features/mcp.astro.mjs');
const _page5 = () => import('./pages/pricing.astro.mjs');
const _page6 = () => import('./pages/privacy.astro.mjs');
const _page7 = () => import('./pages/products/android-testing.astro.mjs');
const _page8 = () => import('./pages/products/ios-testing.astro.mjs');
const _page9 = () => import('./pages/products/mobile-infrastructure.astro.mjs');
const _page10 = () => import('./pages/terms.astro.mjs');
const _page11 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["src/pages/blog/index.astro", _page0],
    ["src/pages/blog/[...slug].astro", _page1],
    ["src/pages/features/cli.astro", _page2],
    ["src/pages/features/crash-reporting.astro", _page3],
    ["src/pages/features/mcp.astro", _page4],
    ["src/pages/pricing.astro", _page5],
    ["src/pages/privacy.astro", _page6],
    ["src/pages/products/android-testing.astro", _page7],
    ["src/pages/products/ios-testing.astro", _page8],
    ["src/pages/products/mobile-infrastructure.astro", _page9],
    ["src/pages/terms.astro", _page10],
    ["src/pages/index.astro", _page11]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = undefined;
const _exports = createExports(_manifest);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
