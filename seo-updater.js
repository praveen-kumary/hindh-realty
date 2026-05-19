const fs = require('fs');
const path = require('path');

const siteUrl = 'https://hindhgroup.com';
const baseDir = __dirname;

function cleanUrl(relativePath) {
    let urlPath = relativePath.replace(/\\/g, '/');

    // Remove index.html
    urlPath = urlPath.replace(/index\.html$/i, '');

    // Remove .html extension
    urlPath = urlPath.replace(/\.html$/i, '');

    // Remove trailing slash duplication
    urlPath = urlPath.replace(/\/+/g, '/');

    return `${siteUrl}/${urlPath}`.replace(/\/$/, '') || siteUrl;
}

function processFile(filePath, relativePath) {
    let content = fs.readFileSync(filePath, 'utf-8');

    // Prevent duplicates
    if (
        content.includes('rel="canonical"') ||
        content.includes('property="og:title"')
    ) {
        return;
    }

    // Extract title
    const titleMatch = content.match(/<title>(.*?)<\/title>/is);
    const title = titleMatch
        ? titleMatch[1].trim()
        : 'Hindh Group';

    // Extract description
    const descMatch = content.match(
        /<meta\s+name=["']description["'][^>]*content=["']([^"]*)["']/i
    );

    const description = descMatch
        ? descMatch[1].trim()
        : 'Premium BIAAPA approved plotted community by Hindh Group in North Bangalore.';

    const fileUrl = cleanUrl(relativePath);

    const seoTags = `
    <!-- SEO & Social Meta Tags -->
    <link rel="canonical" href="${fileUrl}" />

    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${fileUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${siteUrl}/assets/about-hero.jpg" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${siteUrl}/assets/about-hero.jpg" />
    `;

    // Insert tags
    if (descMatch) {
        content = content.replace(descMatch[0], descMatch[0] + seoTags);
    } else if (titleMatch) {
        content = content.replace(titleMatch[0], titleMatch[0] + seoTags);
    }

    fs.writeFileSync(filePath, content, 'utf-8');
}

function walkDir(currentPath) {
    const entries = fs.readdirSync(currentPath, {
        withFileTypes: true
    });

    let htmlFiles = [];

    for (const entry of entries) {
        const fullPath = path.join(currentPath, entry.name);

        if (entry.isDirectory()) {
            if (
                entry.name !== 'node_modules' &&
                entry.name !== '.git'
            ) {
                htmlFiles = htmlFiles.concat(walkDir(fullPath));
            }
        } else if (
            entry.isFile() &&
            entry.name.endsWith('.html')
        ) {
            htmlFiles.push(fullPath);
        }
    }

    return htmlFiles;
}

const htmlFiles = walkDir(baseDir);
let sitemapUrls = [];

htmlFiles.forEach(file => {
    const relPath = path.relative(baseDir, file);

    processFile(file, relPath);

    sitemapUrls.push(cleanUrl(relPath));
});

// Remove duplicate URLs
sitemapUrls = [...new Set(sitemapUrls)];

// Generate sitemap.xml
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${sitemapUrls.map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(
    path.join(baseDir, 'sitemap.xml'),
    sitemapContent
);

// Generate robots.txt
const robotsContent = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

fs.writeFileSync(
    path.join(baseDir, 'robots.txt'),
    robotsContent
);

console.log(
    'SEO tags, sitemap.xml, and robots.txt successfully generated.'
);
