import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/*', '/checkout', '/confirmation/*']
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'Google-Extended', 'Anthropic-AI', 'Claude-Web', 'CCBot', 'PerplexityBot'],
        allow: ['/', '/destinations/*', '/packages/*', '/hotels/*', '/guides/*', '/experiences'],
        disallow: ['/admin/*', '/checkout', '/confirmation/*']
      }
    ],
    sitemap: 'https://arabandbeyond.com/sitemap.xml'
  };
}

