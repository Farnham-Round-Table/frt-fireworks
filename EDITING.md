# Editing the website

You don't need to know any code. Everything you can change is a plain text file in the `src/content` folder. Each change goes live in three steps:

1. **Edit the file on GitHub.** Open it, click the pencil icon, make your change, then choose "Propose changes". This makes a pull request.
2. **Check the preview.** After a minute or so a bot comments on the pull request with a preview link. Open it and check your change looks right. If the check fails, the comment says which file and field is wrong (see "If the build fails").
3. **Merge.** Click "Merge pull request". The live site updates within a few minutes.

## What to edit

| To change... | Edit this |
|---|---|
| Event date, page title, contact email, Facebook/Instagram links | `src/content/site/site.yaml` |
| The intro paragraph above each section, or a section's heading | `src/content/sections/<section>.md` |
| The YouTube video | `youtubeId` in `src/content/sections/video.md` (the part after `v=` in the video's address) |
| A food or drink vendor | `src/content/vendors/<vendor>.md` |
| A performer or act in Entertainment | `src/content/entertainment/<act>.md` |
| The What's On running order | `src/content/timeline/timeline.yaml` |
| Ticket prices, deadlines, Ticket Tailor link | `src/content/tickets/tickets.yaml` |
| A FAQ | `src/content/faqs/<question>.md` |
| What the map says when you tap a place, Key Timings, Good to know | `src/content/map/map.yaml` |
| A sponsor | `src/content/sponsors/<sponsor>.md` |
| The "Become our sponsor" boxes | `src/content/sponsor-tiers/<tier>.md` |

## How the files look

Most files have a small block at the top between two `---` lines (the details), then the text that appears on the page underneath. For example, a vendor:

```
---
name: "Hey Spud"
type: "Loaded fries"
order: 50
logo: "hey-spud.png"
link: "https://www.heyspud.co.uk/"
linkLabel: "Visit website"
---

Naturally gluten free loaded fries... (the description shown on the card)
```

Keep the quote marks and the spacing exactly as in the existing files. In the text part you can use `**bold**`, `*italics*`, and `[link text](https://address)`. A web address or email on its own is turned into a link automatically.

## Common jobs

**Add a vendor.** On GitHub, open the `src/content/vendors` folder, choose Add file, then Create new file. Name it like `my-vendor.md` and copy the layout above. `logo` and `link` are optional, so leave those lines out if you don't have them. Cards appear lowest `order` first, so use a number between two existing ones to slot it in. To add a logo, upload the image to `public/img/vendors` and put its file name in `logo`.

**Remove a vendor, FAQ, act or sponsor.** Open its file, click the bin icon, and propose the change.

**Add a FAQ.** Copy any file in `src/content/faqs`, change `question`, `order` and the text. Several paragraphs are fine, just leave a blank line between them.

**Change the running order.** Open `timeline.yaml`. Each entry is two lines, `- time:` and `text:`. Times look like `17:30`. Add, remove or reorder entries as you like.

**Change ticket prices.** Open `tickets.yaml`. The `tiers` list is the pricing periods (Early bird, Advance, Final week) and each ticket has one price per period, in the same order. Write prices without the pound sign, like `8.00`. If a ticket has a different number of prices than there are periods, the build fails and tells you.

**Add a sponsor.** Copy a file in `src/content/sponsors`. `tier` must be one of the file names in `src/content/sponsor-tiers` (`headline`, `community-champion` or `community-supporters`). Upload their logo to `public/img` and put its file name in `logo`; leave `logo` out to show "Logo coming soon". Once a tier is filled, set `showInvitation: false` in its `sponsor-tiers` file to hide the "Become our..." box.

**Change what the map says.** Edit the names and descriptions in `map.yaml`. The shapes and positions on the map are part of the site's design and aren't changed here.

**Turn on visitor counting (Google Analytics).** Create a Google Analytics 4 property, then copy its measurement ID (it starts with `G-`). Open `src/content/site/site.yaml` and replace `G-XXXXXXXXXX` next to `googleAnalyticsId` with it. Until you do, the cookie banner and "Cookie settings" link are hidden and nothing is tracked. Once it is set, visitors see a banner with equal Accept and Decline buttons, and Google Analytics only loads after they press Accept. Their choice is remembered, and they can change it from "Cookie settings" in the footer.

## Tracking where visitors come from

Once Google Analytics is on, you can see which posts bring visitors by giving each place you share the site its own tagged link. Copy the link for where you are posting. All of them go to the same page, the tags only tell Google Analytics where the click came from.

| Where you post | Link to copy |
|---|---|
| Facebook post | `https://farnhamfireworks.com/?utm_source=facebook&utm_medium=social&utm_campaign=fireworks2026` |
| Instagram bio | `https://farnhamfireworks.com/?utm_source=instagram-bio&utm_medium=social&utm_campaign=fireworks2026` |
| Instagram story | `https://farnhamfireworks.com/?utm_source=instagram-story&utm_medium=social&utm_campaign=fireworks2026` |
| Email newsletter | `https://farnhamfireworks.com/?utm_source=newsletter&utm_medium=email&utm_campaign=fireworks2026` |
| Poster QR code | `https://farnhamfireworks.com/?utm_source=poster-qr&utm_medium=print&utm_campaign=fireworks2026` |
| Community group or WhatsApp | `https://farnhamfireworks.com/?utm_source=community-group&utm_medium=referral&utm_campaign=fireworks2026` |
| Local press | `https://farnhamfireworks.com/?utm_source=local-press&utm_medium=referral&utm_campaign=fireworks2026` |

- Use a different link for each place, otherwise Google Analytics can't tell them apart. For a second post in the same place, change the `utm_source` word (for example `facebook-ticket-reminder`).
- Only use these links outside the site. Don't add tags to links between pages of the site itself, because that makes visitors look like they arrived from somewhere new.
- In Google Analytics, open Reports, then Acquisition, then Traffic acquisition to see visitors by source and campaign.
- Sources only carry through to ticket purchases once `tickettailor.com` is linked in Google Analytics (see below). Until then you will see visitors per source, but not who bought.

**Count ticket purchases (key event).** Tickets are bought on Ticket Tailor, which is a different website, so Google Analytics only learns about a purchase if you set up both of these:

1. In Ticket Tailor, add your Google Analytics measurement ID (the `G-` code) in its settings for Google Analytics tracking, so it reports `purchase` events.
2. In Google Analytics, open Admin, then Data streams, choose the website stream, then Configure tag settings, then Configure your domains, and add `farnhamfireworks.com` and `tickettailor.com`. This keeps one visitor's journey together across both sites, so the purchase is credited to the post that brought them.

Then mark the purchase as a key event: in Google Analytics open Admin, then Data display, then Events, find `purchase` in the list and switch on "Mark as key event" (the star). The event only appears in the list after the first purchase has been recorded, so if it isn't there yet, use "New key event", type `purchase` exactly, and save. Key events then show in Reports under Acquisition, with a column for each source. Google's menu names change now and then, so if one has moved, search the Analytics help for "mark an event as a key event".

## If the build fails

The pull request shows a red cross and the "Details" link says what's wrong, for example `vendors → bootleg-bars data does not match collection schema: order: Required`. That names the file (`bootleg-bars`) and the missing or mistyped field (`order`). Fix it by editing the file again on the same pull request. Nothing reaches the live site until the check is green and the pull request is merged.

## For developers

```
npm install
npm run dev      # local preview at http://localhost:4321
npm run build    # builds the site into dist/
```

The page layout is in `src/components` and `src/pages/index.astro`. The rules for every content file are in `src/content.config.ts`. Static files (CSS, images, fonts, scripts) live in `public/`. GitHub Actions builds the site and deploys `dist/` to Firebase Hosting.
