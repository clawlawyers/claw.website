const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const path = require('path');

// Define your static routes
const staticRoutes = [
  '/',
  '/news',
  '/blog',
  '/create/blog',
  '/privacyPolicy',
  '/terms-of-service',
  '/pricing',
  '/login',
  '/leaders',
  '/leaders/apply',
  '/leaders/dashboard',
  '/admin',
  '/admin/leaders/add',
  '/paymentgateway',
  '/case/search',
  '/contact-us',
  '/refund-and-cancellation-policy',
  '/shipping-and-delivery-policy',
  '/gpt/legalGPT',
  '/gpt/finGPT'
];

// // Function to fetch dynamic routes (optional)
// const fetchDynamicRoutes = async () => {
//   // Example: Fetch routes from an API
//   // const response = await axios.get('https://api.example.com/routes');
//   // return response.data.map(route => `/dynamic/${route.slug}`);
//   // Returning an empty array for this example
//   return [];
// };

(async () => {
  // Create a stream to write to
  const sitemapStream = new SitemapStream({ hostname: 'https://www.clawlaw.in' });

  // Pipe the stream to a file
  const writeStream = createWriteStream(path.resolve(__dirname, 'public', 'sitemap.xml'));
  sitemapStream.pipe(writeStream);

  // Add static routes
  staticRoutes.forEach(route => sitemapStream.write({ url: route, changefreq: 'daily', priority: 0.7 }));

  // Add dynamic routes
  // const dynamicRoutes = await fetchDynamicRoutes();
  // dynamicRoutes.forEach(route => sitemapStream.write({ url: route, changefreq: 'daily', priority: 0.7 }));

  // End the stream
  sitemapStream.end();

  // Convert the stream to a promise and resolve it
  await streamToPromise(sitemapStream);
  console.log('Sitemap generated successfully.');
})();
