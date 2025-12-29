# AdSense Integration - What You Need to Do

## ✅ What I've Done

1. **Removed Non-Functional Links from Footer**
   - Removed clickable social media icons that were redirecting to `/contact`
   - Changed them to static icons (no links) to avoid dead links

2. **Added Ad Banners Across All Pages**
   - **Home Page:** 3 ad slots (after featured article, after blog grid, after newsletter)
   - **Blog Post Page:** 1 ad slot (after article content)
   - **Mining Guides Page:** 1 ad slot (after guides grid)
   - **Hardware Reviews Page:** 1 ad slot (after reviews grid)
   - **News Page:** 1 ad slot (after news content)
   - **Mining Calculator Page:** 1 ad slot (after calculator results)

   **Total: 8 ad slots** placed strategically after content (not above the fold)

3. **Updated AdSense Guide**
   - Created comprehensive `ADSENSE.md` with all ad placement locations
   - Included step-by-step instructions for replacing placeholders

---

## 📋 What You Need to Do Next

### Step 1: Get Google AdSense Approval
1. Apply for Google AdSense at https://www.google.com/adsense/
2. Wait for approval (this can take a few days to weeks)
3. Once approved, you'll receive your **Publisher ID** (format: `ca-pub-XXXXXXXXXXXXXXXX`)

### Step 2: Create Ad Units
1. Log into your AdSense dashboard
2. Go to "Ads" → "By ad unit"
3. Create new responsive display ad units
4. Note down the **Ad Slot ID** for each ad unit (format: `1234567890`)

### Step 3: Add AdSense Script to HTML
1. Open `client/index.html`
2. Find the commented AdSense script (around line 30)
3. Uncomment it and replace `ca-pub-YOUR_ADSENSE_PUBLISHER_ID` with your actual publisher ID

```html
<!-- Google AdSense Script -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ACTUAL_PUBLISHER_ID" crossorigin="anonymous"></script>
```

### Step 4: Replace AdSlot Components with Real Ad Code

You need to replace each `<AdSlot />` component with actual AdSense code. Here's how:

**Find this in each file:**
```tsx
<div className="my-12 flex justify-center">
  <AdSlot label="Banner Ad - After Featured Content" />
</div>
```

**Replace with:**
```tsx
<div className="my-12 flex justify-center">
  <ins
    className="adsbygoogle"
    style={{ display: "block" }}
    data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
    data-ad-slot="YOUR_AD_SLOT_ID"
    data-ad-format="auto"
    data-full-width-responsive="true"
  ></ins>
  <script>
    {(window.adsbygoogle = window.adsbygoogle || []).push({})}
  </script>
</div>
```

**Files to update:**
- `client/src/pages/home.tsx` (3 locations)
- `client/src/pages/blog-post.tsx` (1 location)
- `client/src/pages/mining-guides.tsx` (1 location)
- `client/src/pages/hardware-reviews.tsx` (1 location)
- `client/src/pages/news.tsx` (1 location)
- `client/src/pages/mining-calculator.tsx` (1 location)

**Total: 8 locations to update**

### Step 5: Test Your Website
1. Build your website: `npm run build`
2. Test on desktop and mobile
3. Verify ads appear correctly
4. Ensure ads don't interfere with navigation or content
5. Check that ads are responsive on mobile devices

---

## 📍 Quick Reference: All Ad Locations

| File | Line Location | Description |
|------|--------------|-------------|
| `home.tsx` | After FeaturedArticle | After featured article |
| `home.tsx` | After blog grid | After latest articles grid |
| `home.tsx` | After NewsletterSignup | After newsletter signup |
| `blog-post.tsx` | After article content | After main article body |
| `mining-guides.tsx` | After guides grid | After mining guides list |
| `hardware-reviews.tsx` | After reviews grid | After hardware reviews list |
| `news.tsx` | After news content | After news articles |
| `mining-calculator.tsx` | After calculator | After calculator results |

---

## ⚠️ Important Notes

1. **Don't Over-Ad:** Google recommends not placing too many ads. Consider starting with 1-2 ads per page and adding more if needed.

2. **Mobile Responsive:** All ad slots use responsive ad units (`data-full-width-responsive="true"`), so they'll adapt to mobile screens.

3. **Policy Compliance:** 
   - Ads are placed AFTER content (not above the fold)
   - Ads don't interfere with navigation
   - All content is educational (no financial advice)
   - Legal pages are in place

4. **Testing:** Always test your website after adding AdSense code to ensure everything works correctly.

---

## 📚 Additional Resources

- **Detailed Guide:** See `ADSENSE.md` for comprehensive instructions
- **Google AdSense Help:** https://support.google.com/adsense/
- **AdSense Policies:** https://support.google.com/adsense/answer/48182

---

## 🎯 Summary

✅ **Done:**
- Removed non-functional footer links
- Added 8 ad slot placeholders across all pages
- Created comprehensive integration guide

⏳ **Your Turn:**
1. Get AdSense approval
2. Get your Publisher ID and Ad Slot IDs
3. Replace placeholders with real AdSense code
4. Test and deploy

Good luck with your AdSense application! 🚀

