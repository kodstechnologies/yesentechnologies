# YESEN on Vercel — no ZIP required

Import this project's connected GitHub repository into Vercel and deploy it.
Use Node.js 22.x. The repository explicitly declares Nitro in `vercel.json`;
Vercel automatically selects the build command and output directory.

The build downloads all currently referenced asset-pointer media into the exact
public paths used by the website. Videos are not resized or re-encoded. Original
sizes and known SHA-256 checksums are verified; missing or damaged media stops the
deployment rather than producing a site with broken videos. Existing bundled
photos, posters and public downloads are included by Vite/Nitro as usual.

The public website connection settings are provided by `vercel.json`. The existing
Lovable Cloud enquiry service remains connected; no private credentials or
database migration are needed for the existing public forms.

YouTube testimonials remain external embeds, not locally hosted video files.
Fonts, maps and external links still require their respective services.

After deployment, verify the homepage, Land & Earth, About, Products, Contact,
Projects and Advisory videos; ELCO images; a refreshed deep link; and a real enquiry
on the Vercel URL before changing the domain. Local preparation does not prove a
successful Vercel deployment. Deployment requires access to your Vercel account.

For a media-only integrity check, run `bun run media:prepare`.