# Field Sales app

A home-screen app for B2B field sales: visit log, street map, free address lookup, daily scoreboard, morning plan and evening review, follow-up messages, weekly review, and backup.

## Put it online (one time, about 15 minutes, on your computer)

1. Make a free account at https://github.com/signup
2. Click the **+** in the top right, then **New repository**.
   - Repository name: `fieldsales`
   - Leave it **Public** (free hosting requires this; your sales data is NOT in here, it stays on your phone)
   - Click **Create repository**
3. On the next page, click **uploading an existing file**.
4. Unzip `fieldsales-app.zip`. Open the `fieldsales-pwa` folder and select everything inside it (index.html, sw.js, manifest.json, README.md, and the `icons` and `vendor` folders). Drag it all into the GitHub upload box. Click **Commit changes**.
   - Check that `icons` and `vendor` show up as folders in the repo. If they didn't upload, drag those two folders in again.
5. Go to **Settings** (top of the repo), then **Pages** (left side).
   - Under "Build and deployment", Source: **Deploy from a branch**
   - Branch: **main**, folder **/ (root)**, then click **Save**
6. Wait 1–2 minutes and refresh. The page shows your link:
   `https://YOUR-USERNAME.github.io/fieldsales/`

## Install on your iPhone

1. Open that link in **Safari** (it has to be Safari, not Chrome).
2. Tap the **Share** button, scroll down, and tap **Add to Home Screen**, then **Add**.
3. From now on, open it from the home-screen icon. It opens full screen and works without signal (the map needs signal for areas you haven't viewed yet).

## First-time setup in the app

- **Week tab → Settings**: set your contacts, demos, and hours targets, plus your name for messages.
- **Week tab → My weekly B2B game plan**: paste your game plan.
- **Week tab → Backup**: tap **Back up now** every Friday and save the file to Files or email it to yourself. Your data lives only on your phone.

## Updating the app later

Upload the changed files to the same repo, overwriting the old ones. Close the app and reopen it twice, and the update loads.
