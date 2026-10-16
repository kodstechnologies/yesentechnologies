<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Render all YESEN website logos through the shared Logo component using surface-specific official asset pointers, so artwork stays consistent across header, footer, mobile menu and splash screen.
- Keep homepage and inner-page laptop headers in three intrinsic grid tracks rather than absolutely centering navigation, so logos, links and quote actions cannot overlap.
- Keep homepage video media in asset pointers and its titles in accessible HTML, so footage replacements do not require baking or regenerating text.
- Manage background-video visibility once at the root, lazy-load below-fold films and keep video surfaces free of scroll transforms and live filters, to avoid concurrent decoding and expensive frame compositing.
- Include the homepage film in root video visibility management and preserve explicit tap-to-pause intent, so offscreen decoding stops without undoing the visitor's choice.
- Use intrinsic responsive tracks for footer navigation; keep homepage capability cards sticky-stacked on all devices with a JS-fitted negative top for cards taller than the screen, so the stacking effect survives while content stays reachable.
- Select the homepage Full HD video on larger screens with adequate bandwidth and retain the lightweight version on phones or constrained connections, so clarity improves without restoring video lag.
- Render written testimonials as a single indexed quotation rather than a scrolling track, so next/previous navigation never exposes partial entries.
- Keep homepage content reveals and directional card entrances replayable after leaving the viewport for every visitor regardless of OS animation settings, with bounded phone travel; animate content rather than video surfaces to preserve playback performance.
- Populate homepage service square links from the shared navigation service lists, so labels and destinations remain consistent with dropdowns; allow section height to grow on small screens to prevent clipping.
- Keep ELCO model specifications in a shared typed content module used by model sections and comparison tables, so technical values cannot diverge; source motor imagery through official asset pointers and use the existing same-page enquiry flow.
- Keep the Marine line without its own overview page: the legacy /marine path permanently redirects to the projects page, marine detail pages return Home, and the homepage E-MARINE teaser scrolls to the on-page showcase — so no route or link ever points at a removed overview.
- Share footer navigation between homepage and inner pages, and redirect the retired Solutions overview Home, so footer destinations stay consistent and published bookmarks remain usable.
- Keep email triggers as mailto anchors enhanced with the shared webmail chooser, so email links remain usable before JavaScript loads.
- Extend the shared QuoteForm for solar and retrofit enquiry details, storing submitted specifics in the existing enquiry details field; reuse shared solar FAQs on the FAQ and land pages to avoid divergent answers.
- Initialize all shared quote forms through the tested quote-start helper so prefilled context cannot skip service confirmation.
- Render B-Kool certification badges from the shared company content so catalogue and detail pages cannot diverge.
- Vercel, AWS Amplify (AWS_APP_ID/AWS_AMPLIFY) and AWS container (AWS_BUILD) builds select their matching Nitro preset and materialize every active asset pointer at its matching public path before building; verify media sizes and known checksums and keep Lovable hosting unchanged so migration does not alter the design or break media URLs.
- Scope phone spacing overrides to exact utilities or named sections, never substring-match small padding/gap classes or strip every section child's padding; broad matches inflate controls and erase card gutters.
- Use one inline fleet rail across devices with hover/focus and touch selection, mobile-only automatic progression, and container-relative selected widths so shared vessel records stay consistent without popups or a separate carousel.
- Fit featured-solution sticky panels with measured negative top offsets like capability panels, so short screens can reach all content without losing stacking.
- Give named inner-page phone frames one gutter owner and shared content-first spacing, so full-width media and readable copy match Home without changing desktop or motion.
- Render homepage project cards from the shared project register with category/status selection; keep source-unspecified vessel completion as a profile rather than claiming delivery, so project details and listings stay consistent.
