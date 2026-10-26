# Deploying AI 742 to your VPS

Tested target: **Ubuntu 22.04 / 24.04**, 2 GB RAM minimum (4 GB recommended), Node.js 22.
Replace `example.com` with your domain throughout.

## 1. Point your domain at the server

At your domain registrar, create an **A record** for `example.com` and `www.example.com` pointing to the VPS IP address.

## 2. Install the server software (once)

```bash
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs nginx certbot python3-certbot-nginx sqlite3 git
sudo npm install -g pm2
sudo ufw allow OpenSSH && sudo ufw allow 'Nginx Full' && sudo ufw enable
```

With 2 GB RAM, add swap so the build doesn't run out of memory:

```bash
sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

## 3. Upload the project

```bash
sudo mkdir -p /var/www/ai742 && sudo chown $USER:$USER /var/www/ai742
# Option A: git clone your repository into /var/www/ai742
# Option B: upload this folder with scp/SFTP into /var/www/ai742
cd /var/www/ai742
npm ci
cp .env.example .env
nano .env
```

Set in `.env`:

| Variable | Value |
|---|---|
| `PAYLOAD_SECRET` | output of `openssl rand -hex 32` |
| `DATABASE_URI` | `file:./data/ai742.db` |
| `NEXT_PUBLIC_SERVER_URL` | `https://example.com` (your real domain — used in the sitemap and Google data) |
| `NOTIFY_EMAIL` | `abdullaah4229@gmail.com` |
| `SMTP_USER` / `SMTP_FROM` | `abdullaah4229@gmail.com` |
| `SMTP_PASS` | your Gmail App Password (see README → Email notifications) |

## 4. Create the database and build

```bash
npm run migrate
npm run seed      # first deployment only: starting services, industries and FAQs
npm run build
```

## 5. Create your admin account BEFORE going public

The first person to open `/admin` creates the first admin account, so do this privately first.
From **your own computer**, open an SSH tunnel and start the site:

```bash
# on the server
pm2 start deploy/ecosystem.config.cjs
# on your computer
ssh -L 3000:localhost:3000 youruser@YOUR_SERVER_IP
```

Then open http://localhost:3000/admin in your browser and create your account with a strong password.

## 6. Connect Nginx and HTTPS

```bash
sudo cp deploy/nginx-ai742.conf /etc/nginx/sites-available/ai742
sudo sed -i 's/example.com/YOURDOMAIN.com/g' /etc/nginx/sites-available/ai742
sudo ln -s /etc/nginx/sites-available/ai742 /etc/nginx/sites-enabled/ai742
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d example.com -d www.example.com
```

Certbot installs a free SSL certificate and renews it automatically.

## 7. Keep the site running after reboots

```bash
pm2 save
pm2 startup   # run the command it prints
```

## 8. Daily backups

```bash
chmod +x deploy/backup.sh
crontab -e
# add this line (runs every night at 3:15):
15 3 * * * /var/www/ai742/deploy/backup.sh >> /var/www/ai742/backups/backup.log 2>&1
```

Backups (database + uploaded images) are kept for 14 days in `/var/www/ai742/backups`. Copy them off the server regularly (e.g. download weekly).

## 9. Tell search engines about the site

1. **Google Search Console** (search.google.com/search-console): add your domain, verify it, then submit `https://example.com/sitemap.xml`.
2. **Bing Webmaster Tools** (bing.com/webmasters): import from Google Search Console.
3. **Ubersuggest**: create a project for your domain and track the saved list “AI 742 – Target Keywords (US)”.
4. Before launch, ask an attorney to review the Privacy Policy and Terms, paste the final text into Admin → Pages → Legal pages, and tick “reviewed”.

## Updating the site later

```bash
cd /var/www/ai742
git pull            # or upload the new files
npm ci
npm run migrate
npm run build
pm2 reload ai742
```
