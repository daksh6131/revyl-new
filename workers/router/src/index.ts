/**
 * Edge Router Worker
 *
 * Routes traffic between Webflow (main site) and Cloudflare Pages (blog/changelog).
 * Deploy this worker and point your domain's DNS to Cloudflare.
 */

interface Env {
  WEBFLOW_ORIGIN: string;
  BLOG_ORIGIN: string;
}

// Paths that should be served from the blog/Cloudflare Pages
const BLOG_PATHS = ['/blog', '/changelog'];

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // Determine which origin to use
    const isBlogPath = BLOG_PATHS.some(
      (prefix) => path === prefix || path.startsWith(`${prefix}/`)
    );

    const origin = isBlogPath ? env.BLOG_ORIGIN : env.WEBFLOW_ORIGIN;

    // Build the proxied URL
    const proxiedUrl = new URL(path + url.search, origin);

    // Create the proxied request
    const proxiedRequest = new Request(proxiedUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: 'manual',
    });

    // Fetch from the origin
    const response = await fetch(proxiedRequest);

    // Clone the response to modify headers
    const modifiedResponse = new Response(response.body, response);

    // Add cache headers for blog content
    if (isBlogPath) {
      modifiedResponse.headers.set(
        'Cache-Control',
        'public, max-age=3600, s-maxage=86400'
      );
    }

    // Add security headers
    modifiedResponse.headers.set('X-Content-Type-Options', 'nosniff');
    modifiedResponse.headers.set('X-Frame-Options', 'DENY');

    return modifiedResponse;
  },
};
