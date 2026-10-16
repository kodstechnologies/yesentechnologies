# YESEN on AWS

## Option A — AWS Amplify Hosting (recommended)
The site needs a running server (it is NOT a plain static site), so Amplify must deploy it as an SSR "compute" app. This project is pre-configured for that via `amplify.yml`.

1. Push this folder to a GitHub/GitLab/Bitbucket repo (include the hidden `.env` file).
2. Amplify Console > Create new app > connect the repo and branch.
3. Amplify detects `amplify.yml` automatically. Do not change the build settings.
   - Build: installs Bun, downloads all images/videos into the build, then builds.
   - Output folder: `.amplify-hosting` (contains `deploy-manifest.json`, `compute/`, `static/`).
4. Save and deploy. Amplify shows the app as "Web Compute" — that is correct.

If an existing Amplify app was set up as static ("Web" / output folder `dist` or `build`), delete it and create a new app from the repo so the platform switches to Web Compute.
Do NOT use the "Deploy without Git" drag-and-drop upload or S3 static hosting — those cannot run the server and the site will break.

## Option B — Docker (App Runner / ECS Fargate / Elastic Beanstalk)
    docker build -t yesen .
    docker run -p 8080:8080 yesen
Container port 8080.

Put CloudFront in front for caching; /__l5e/assets-v1/* is immutable and can be cached for a year.
