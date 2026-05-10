import 'cookie';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_Cbczmtiv.mjs';
import 'es-module-lexer';
import { i as decodeKey } from './chunks/astro/server_BQg5qKBQ.mjs';
import 'clsx';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/reucodec/Desktop/soapbizzz/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"blog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/blog","isIndex":false,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog.astro","pathname":"/blog","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"bundles/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/bundles","isIndex":false,"type":"page","pattern":"^\\/bundles\\/?$","segments":[[{"content":"bundles","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/bundles.astro","pathname":"/bundles","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"checkout/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/checkout","isIndex":false,"type":"page","pattern":"^\\/checkout\\/?$","segments":[[{"content":"checkout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/checkout.astro","pathname":"/checkout","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"shop/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/shop","isIndex":false,"type":"page","pattern":"^\\/shop\\/?$","segments":[[{"content":"shop","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/shop.astro","pathname":"/shop","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/api/keystatic/[...params]","pattern":"^\\/api\\/keystatic(?:\\/(.*?))?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"keystatic","dynamic":false,"spread":false}],[{"content":"...params","dynamic":true,"spread":true}]],"params":["...params"],"component":"node_modules/@keystatic/astro/internal/keystatic-api.js","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","isIndex":false,"route":"/keystatic/[...params]","pattern":"^\\/keystatic(?:\\/(.*?))?\\/?$","segments":[[{"content":"keystatic","dynamic":false,"spread":false}],[{"content":"...params","dynamic":true,"spread":true}]],"params":["...params"],"component":"node_modules/@keystatic/astro/internal/keystatic-astro-page.astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/reucodec/Desktop/soapbizzz/src/pages/blog.astro",{"propagation":"in-tree","containsHead":true}],["/Users/reucodec/Desktop/soapbizzz/src/pages/blog/[slug].astro",{"propagation":"in-tree","containsHead":true}],["/Users/reucodec/Desktop/soapbizzz/src/pages/bundles.astro",{"propagation":"in-tree","containsHead":true}],["/Users/reucodec/Desktop/soapbizzz/src/pages/checkout.astro",{"propagation":"none","containsHead":true}],["/Users/reucodec/Desktop/soapbizzz/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["/Users/reucodec/Desktop/soapbizzz/src/pages/shop.astro",{"propagation":"in-tree","containsHead":true}],["/Users/reucodec/Desktop/soapbizzz/src/pages/shop/[id].astro",{"propagation":"in-tree","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/reucodec/Desktop/soapbizzz/src/lib/content.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blog@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blog/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/bundles@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/shop@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/shop/[id]@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:node_modules/@keystatic/astro/internal/keystatic-astro-page@_@astro":"pages/keystatic/_---params_.astro.mjs","\u0000@astro-page:src/pages/blog/[slug]@_@astro":"pages/blog/_slug_.astro.mjs","\u0000@astro-page:src/pages/blog@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/bundles@_@astro":"pages/bundles.astro.mjs","\u0000@astro-page:src/pages/checkout@_@astro":"pages/checkout.astro.mjs","\u0000@astro-page:src/pages/shop/[id]@_@astro":"pages/shop/_id_.astro.mjs","\u0000@astro-page:src/pages/shop@_@astro":"pages/shop.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:node_modules/@keystatic/astro/internal/keystatic-api@_@js":"pages/api/keystatic/_---params_.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","/Users/reucodec/Desktop/soapbizzz/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","/Users/reucodec/Desktop/soapbizzz/src/content/posts/oatmeal-and-eczema.md?astroContentCollectionEntry=true":"chunks/oatmeal-and-eczema_CFYkZV5d.mjs","/Users/reucodec/Desktop/soapbizzz/src/content/posts/sourcing-sustainable-ingredients.md?astroContentCollectionEntry=true":"chunks/sourcing-sustainable-ingredients_CgPihGkb.mjs","/Users/reucodec/Desktop/soapbizzz/src/content/posts/why-cold-pressed-is-better.md?astroContentCollectionEntry=true":"chunks/why-cold-pressed-is-better_BR8C-3XP.mjs","/Users/reucodec/Desktop/soapbizzz/src/content/bundles/detox-duo.json?astroDataCollectionEntry=true":"chunks/detox-duo_D_7G2-mz.mjs","/Users/reucodec/Desktop/soapbizzz/src/content/bundles/floral-collection.json?astroDataCollectionEntry=true":"chunks/floral-collection_Cr2cpqpE.mjs","/Users/reucodec/Desktop/soapbizzz/src/content/bundles/fresh-start.json?astroDataCollectionEntry=true":"chunks/fresh-start_CHcDwKmQ.mjs","/Users/reucodec/Desktop/soapbizzz/src/content/bundles/full-collection.json?astroDataCollectionEntry=true":"chunks/full-collection_CglgXl2n.mjs","/Users/reucodec/Desktop/soapbizzz/src/content/products/charcoal-detox.json?astroDataCollectionEntry=true":"chunks/charcoal-detox_C_zQOzm7.mjs","/Users/reucodec/Desktop/soapbizzz/src/content/products/citrus-burst.json?astroDataCollectionEntry=true":"chunks/citrus-burst_BTXJ8cND.mjs","/Users/reucodec/Desktop/soapbizzz/src/content/products/lavender-dream.json?astroDataCollectionEntry=true":"chunks/lavender-dream_D3VORE2C.mjs","/Users/reucodec/Desktop/soapbizzz/src/content/products/matcha-green-tea.json?astroDataCollectionEntry=true":"chunks/matcha-green-tea_Cw1qAios.mjs","/Users/reucodec/Desktop/soapbizzz/src/content/products/minty-morning.json?astroDataCollectionEntry=true":"chunks/minty-morning_CLfzlq9R.mjs","/Users/reucodec/Desktop/soapbizzz/src/content/products/oatmeal-honey.json?astroDataCollectionEntry=true":"chunks/oatmeal-honey_7g1BwakT.mjs","/Users/reucodec/Desktop/soapbizzz/src/content/products/ocean-breeze.json?astroDataCollectionEntry=true":"chunks/ocean-breeze_Gqx87-P9.mjs","/Users/reucodec/Desktop/soapbizzz/src/content/products/rose-petal.json?astroDataCollectionEntry=true":"chunks/rose-petal_DK1JJyox.mjs","/Users/reucodec/Desktop/soapbizzz/src/content/posts/oatmeal-and-eczema.md?astroPropagatedAssets":"chunks/oatmeal-and-eczema_7Bv3h4-n.mjs","/Users/reucodec/Desktop/soapbizzz/src/content/posts/sourcing-sustainable-ingredients.md?astroPropagatedAssets":"chunks/sourcing-sustainable-ingredients_xm8Qwy0U.mjs","/Users/reucodec/Desktop/soapbizzz/src/content/posts/why-cold-pressed-is-better.md?astroPropagatedAssets":"chunks/why-cold-pressed-is-better_DEL_efTu.mjs","\u0000astro:asset-imports":"chunks/_astro_asset-imports_D9aVaOQr.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_BcEe_9wP.mjs","/Users/reucodec/Desktop/soapbizzz/src/content/posts/oatmeal-and-eczema.md":"chunks/oatmeal-and-eczema_9ps3Wbzd.mjs","/Users/reucodec/Desktop/soapbizzz/src/content/posts/sourcing-sustainable-ingredients.md":"chunks/sourcing-sustainable-ingredients_BH0CRQCw.mjs","/Users/reucodec/Desktop/soapbizzz/src/content/posts/why-cold-pressed-is-better.md":"chunks/why-cold-pressed-is-better_BUZaxfaT.mjs","\u0000@astrojs-manifest":"manifest_DQuRCT81.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.BwN_xHdP.js","/astro/hoisted.js?q=1":"_astro/hoisted.Bu28TUm-.js","/astro/hoisted.js?q=2":"_astro/hoisted.C0DYc4ue.js","@astrojs/react/client.js":"_astro/client.DpMD088w.js","/Users/reucodec/Desktop/soapbizzz/node_modules/@keystatic/astro/internal/keystatic-page.js":"_astro/keystatic-page.C-WipweM.js","/astro/hoisted.js?q=3":"_astro/hoisted.Cn76JHRr.js","/astro/hoisted.js?q=4":"_astro/hoisted.-0UksbYd.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/blog.C9bQso6O.css","/_astro/blog.s9JlKgnI.css","/_astro/bundles.BdjOX8IB.css","/_astro/checkout.DUWBhS0O.css","/_astro/index.BL4w8TYu.css","/favicon.ico","/favicon.svg","/_astro/client.DpMD088w.js","/_astro/hoisted.-0UksbYd.js","/_astro/hoisted.Bu28TUm-.js","/_astro/hoisted.BwN_xHdP.js","/_astro/hoisted.C0DYc4ue.js","/_astro/hoisted.Cn76JHRr.js","/_astro/index.CGryQLpk.js","/_astro/keystatic-page.C-WipweM.js","/blog/index.html","/bundles/index.html","/checkout/index.html","/shop/index.html","/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"1ne+k3qLR1+HF0rPdum56O6+7Hnu/RdLvej+B/5H0Ss=","experimentalEnvGetSecretEnabled":false});

export { manifest };
