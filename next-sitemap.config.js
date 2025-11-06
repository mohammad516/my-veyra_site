/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://veyra.website',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  sitemapSize: 7000,
};




