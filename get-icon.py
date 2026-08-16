import urllib.request
import re

def download_playstore_icon(app_id, output_path):
    url = f"https://play.google.com/store/apps/details?id={app_id}"
    print(f"Fetching icon for {app_id} from {url}...")
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
    html = urllib.request.urlopen(req).read().decode("utf-8")

    match = re.search(r'<img[^>]+alt="Cover art"[^>]+src="([^"]+)"', html)
    if not match:
        match = re.search(r'<img[^>]+src="(https://play-lh\.googleusercontent\.com/[^"]+)"[^>]+alt="Icon image"', html)

    if match:
        icon_url = match.group(1).split('=')[0] + '=s512'
        print(f"Found official icon URL for {app_id}:", icon_url)
        urllib.request.urlretrieve(icon_url, output_path)
        print(f"Successfully saved to {output_path}!")
    else:
        print(f"Searching fallback for {app_id}...")
        all_imgs = re.findall(r'src="(https://play-lh\.googleusercontent\.com/[^"]+)"', html)
        if all_imgs:
            icon_url = all_imgs[0].split('=')[0] + '=s512'
            urllib.request.urlretrieve(icon_url, output_path)
            print(f"Saved fallback icon to {output_path}")

# Fetch Best Gym
download_playstore_icon("com.gymreviewer.app", "/home/edson/projects/madetech/public/assets/bestgym-icon.png")

# Fetch Scrutinium
download_playstore_icon("com.scrutinium.app", "/home/edson/projects/madetech/public/assets/scrutinium-icon.png")
