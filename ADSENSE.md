# Google AdSense Integration Guide for Bitcoin Mining Insider

This document outlines where to place your Google AdSense ad unit codes to ensure compliance and optimal performance.

**Important:** Do NOT place AdSense code directly into the `AdSlot` component itself. The `AdSlot` component is a visual placeholder. You will replace the *contents* of the `AdSlot` component with your actual AdSense code.

---

## 1. Head Tag (for Auto Ads or general AdSense script)

If you are using Google Auto Ads or need to place the main AdSense script tag in the `<head>` section of your website, you should add it to:

-   `client/index.html`

**Location:** Inside the `<head>` tag, ideally before any other scripts.

**Example Placement in `client/index.html`:**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
    <link rel="icon" type="image/png" href="/favicon.ico" />
    <title>Bitcoin Mining Insider - Your Guide to BTC Mining</title>
    <meta name="description" content="Your ultimate resource for Bitcoin mining news, hardware guides, profitability calculators, and industry insights. Stay updated with the latest in BTC mining." />
    <link rel="canonical" href="https://www.bitcoinmininginsider.com/" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.bitcoinmininginsider.com/" />
    <meta property="og:title" content="Bitcoin Mining Insider - Your Guide to BTC Mining" />
    <meta property="og:description" content="Your ultimate resource for Bitcoin mining news, hardware guides, profitability calculators, and industry insights. Stay updated with the latest in BTC mining." />
    <meta property="og:image" content="https://www.bitcoinmininginsider.com/og-image.jpg" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://www.bitcoinmininginsider.com/" />
    <meta property="twitter:title" content="Bitcoin Mining Insider - Your Guide to BTC Mining" />
    <meta property="twitter:description" content="Your ultimate resource for Bitcoin mining news, hardware guides, profitability calculators, and industry insights. Stay updated with the latest in BTC mining." />
    <meta property="twitter:image" content="https://www.bitcoinmininginsider.com/twitter-image.jpg" />

    <!-- Google AdSense Script (if using Auto Ads or general script) -->
    <!-- <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ADSENSE_PUBLISHER_ID" crossorigin="anonymous"></script> -->
    <!-- End Google AdSense Script -->

  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**Note:** Uncomment the `<script>` tag and replace `ca-pub-YOUR_ADSENSE_PUBLISHER_ID` with your actual AdSense publisher ID.

---

## 2. Ad Unit Placements (Manual Ad Slots)

For specific ad units (e.g., display ads, in-article ads), you will replace the content of the `<AdSlot />` component instances.

### Home Page (`client/src/pages/home.tsx`)

**Location 1:** After Featured Article
-   **Line:** After `<FeaturedArticle post={featuredPost} />`
-   **Current Placeholder:**
    ```tsx
    {/* Google AdSense Ad Slot - After Featured Article */}
    <div className="my-12 flex justify-center">
      <AdSlot label="Banner Ad - After Featured Content" />
    </div>
    ```

**Location 2:** After Blog Grid
-   **Line:** After the blog posts grid section
-   **Current Placeholder:**
    ```tsx
    {/* Google AdSense Ad Slot - After Blog Grid */}
    <div className="my-12 flex justify-center">
      <AdSlot label="Banner Ad - After Blog Grid" />
    </div>
    ```

**Location 3:** After Newsletter Signup
-   **Line:** After `<NewsletterSignup />`
-   **Current Placeholder:**
    ```tsx
    {/* Google AdSense Ad Slot - After Newsletter */}
    <div className="my-12 flex justify-center">
      <AdSlot label="Banner Ad - After Newsletter" />
    </div>
    ```

### Blog Post Page (`client/src/pages/blog-post.tsx`)

-   **Location:** After the main article content (`<div dangerouslySetInnerHTML={{ __html: post.content }}`), within the `<article>` tag.
-   **Current Placeholder:**
    ```tsx
    {/* AdSense Ad Slot - After content */}
    <div className="my-12 flex justify-center">
      <AdSlot size="leaderboard" />
    </div>
    ```

### Mining Guides Page (`client/src/pages/mining-guides.tsx`)

-   **Location:** After the guides grid section, before closing `</main>`
-   **Current Placeholder:**
    ```tsx
    {/* Google AdSense Ad Slot - After Guides Grid */}
    <div className="my-12 flex justify-center">
      <AdSlot label="Banner Ad - After Guides" />
    </div>
    ```

### Hardware Reviews Page (`client/src/pages/hardware-reviews.tsx`)

-   **Location:** After the reviews grid section, before closing `</main>`
-   **Current Placeholder:**
    ```tsx
    {/* Google AdSense Ad Slot - After Reviews Grid */}
    <div className="my-12 flex justify-center">
      <AdSlot label="Banner Ad - After Reviews" />
    </div>
    ```

### News Page (`client/src/pages/news.tsx`)

-   **Location:** After the news content section
-   **Current Placeholder:**
    ```tsx
    {/* Ads must load after primary content */}
    <div className="mt-12">
      <AdSlot label="Responsive ad slot (placed after news content)" />
    </div>
    ```

### Mining Calculator Page (`client/src/pages/mining-calculator.tsx`)

-   **Location:** After the calculator results and disclaimer, before closing `</main>`
-   **Current Placeholder:**
    ```tsx
    {/* Google AdSense Ad Slot - After Calculator Content */}
    <div className="my-12 flex justify-center">
      <AdSlot label="Banner Ad - After Calculator" />
    </div>
    ```

---

## 3. How to Replace AdSlot with Real AdSense Code

**Step 1:** Find the `<AdSlot />` component in the file (use the locations above).

**Step 2:** Replace the entire `<AdSlot />` component with your actual AdSense ad unit code. For example:

```tsx
{/* Google AdSense Responsive Ad Slot */}
<div className="my-12 flex justify-center">
  <ins
    className="adsbygoogle"
    style={{ display: "block" }}
    data-ad-client="ca-pub-YOUR_ADSENSE_PUBLISHER_ID"
    data-ad-slot="YOUR_AD_SLOT_ID"
    data-ad-format="auto"
    data-full-width-responsive="true"
  ></ins>
  <script>
    {(window.adsbygoogle = window.adsbygoogle || []).push({})}
  </script>
</div>
```

**Important Notes:**
-   Replace `ca-pub-YOUR_ADSENSE_PUBLISHER_ID` with your actual publisher ID
-   Replace `YOUR_AD_SLOT_ID` with your actual ad slot ID
-   Ensure `data-ad-format="auto"` and `data-full-width-responsive="true"` are used for responsive ads
-   The `style={{ display: "block" }}` is crucial for proper rendering

**Alternative:** If you prefer to keep the AdSlot component structure, you can modify `client/src/components/common/ad-slot.tsx` to accept props for publisher ID and slot ID, then render the actual AdSense code inside it. However, the direct replacement method above is simpler and more straightforward.

---

## 4. AdSense-Ready Checklist

Before reapplying for AdSense, ensure the following:

-   [x] All required legal pages (`Privacy Policy`, `Terms`, `Disclaimer`, `About`, `Contact`) are present and fully written.
-   [x] All `href="#"` links in navigation and footer have been replaced with real routes or removed if non-functional.
-   [x] Content is expanded to be substantial (aim for 800-1200 words per article).
-   [x] All "investment advice" or "profit promise" language has been removed or rephrased to be educational.
-   [x] Misleading stats (e.g., "98% success rate") have been removed.
-   [x] Site-wide and article-specific disclaimers are in place.
-   [x] `robots.txt` and `sitemap.xml` are correctly configured.
-   [x] Meta titles, descriptions, and Open Graph tags are set for all pages.
-   [x] Replit dev banner script is removed from `index.html`.
-   [x] Ad placeholders are correctly positioned *after* content and marked with comments.
-   [ ] **Manual Step:** Replace placeholder AdSense code in `AdSlot` instances with your actual AdSense ad unit codes.
-   [ ] **Manual Step:** Verify that your `ca-pub-YOUR_ADSENSE_PUBLISHER_ID` is correctly inserted in `index.html` and ad units.
-   [ ] **Manual Step:** Thoroughly review all content for any remaining policy violations.
-   [ ] **Manual Step:** Test mobile responsiveness and user experience across various devices.
-   [ ] **Manual Step:** Ensure ads do not interfere with navigation or create a poor user experience.

---

## 5. Summary of Ad Placements

| Page | Number of Ad Slots | Location |
|------|-------------------|----------|
| Home | 3 | After featured article, after blog grid, after newsletter |
| Blog Post | 1 | After article content |
| Mining Guides | 1 | After guides grid |
| Hardware Reviews | 1 | After reviews grid |
| News | 1 | After news content |
| Mining Calculator | 1 | After calculator results |

**Total:** 8 ad slots across all pages

**Important:** Google AdSense policies recommend not placing too many ads on a single page. Consider using only 1-2 ads per page initially, and monitor performance. You can always add more later if needed.

---

## 6. Next Steps

1. **Get AdSense Approval:** Apply for Google AdSense with your website.
2. **Get Publisher ID:** Once approved, you'll receive your publisher ID (format: `ca-pub-XXXXXXXXXXXXXXXX`).
3. **Create Ad Units:** In your AdSense dashboard, create responsive display ad units and note their slot IDs.
4. **Replace Placeholders:** Use the instructions above to replace all `<AdSlot />` components with your actual ad codes.
5. **Test:** Test your website on desktop and mobile to ensure ads display correctly and don't interfere with user experience.
6. **Monitor:** Monitor your AdSense dashboard for performance and policy compliance.

---

## 7. Support

If you encounter any issues with AdSense integration, refer to:
-   [Google AdSense Help Center](https://support.google.com/adsense/)
-   [AdSense Policies](https://support.google.com/adsense/answer/48182)
-   [AdSense Program Policies](https://support.google.com/adsense/answer/48182)
