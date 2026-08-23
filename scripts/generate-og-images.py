#!/usr/bin/env python3
"""Gera imagens Open Graph (1200x630) com a identidade visual MadeTech."""
from PIL import Image, ImageDraw, ImageFilter, ImageFont
import os

W, H = 1200, 630
BG_TOP = (15, 23, 42)
BG_BOT = (30, 27, 75)
BLUE = (37, 99, 235)
SKY = (56, 189, 248)
LIME = (163, 230, 53)
MUTED = (148, 163, 184)
WHITE = (248, 250, 252)

FONT_DIR = "/usr/share/fonts/truetype/dejavu"
ASSETS = os.path.join(os.path.dirname(__file__), "..", "public", "assets")


def font(size, bold=True):
    name = "DejaVuSans-Bold.ttf" if bold else "DejaVuSans.ttf"
    return ImageFont.truetype(os.path.join(FONT_DIR, name), size)


def base_canvas():
    img = Image.new("RGB", (W, H))
    top, bot = BG_TOP, BG_BOT
    for y in range(H):
        t = y / H
        img.paste(tuple(int(top[i] + (bot[i] - top[i]) * t) for i in range(3)), (0, y, W, y + 1))
    blobs = Image.new("RGB", (W, H), (0, 0, 0))
    bd = ImageDraw.Draw(blobs)
    bd.ellipse((-180, -220, 420, 320), fill=(20, 60, 160))
    bd.ellipse((850, 380, 1450, 900), fill=(10, 90, 110))
    blobs = blobs.filter(ImageFilter.GaussianBlur(140))
    img = Image.blend(img, Image.composite(blobs, img, blobs.convert("L").point(lambda p: p)), 0.55)
    return img


def draw_grid_overlay(draw):
    for x in range(0, W, 80):
        draw.line((x, 0, x, H), fill=(255, 255, 255, 4))
    for y in range(0, H, 80):
        draw.line((0, y, W, y), fill=(255, 255, 255, 4))


def wrap(text, f, max_w, draw):
    words, lines, cur = text.split(), [], ""
    for w_ in words:
        test = f"{cur} {w_}".strip()
        if draw.textlength(test, font=f) <= max_w:
            cur = test
        else:
            lines.append(cur)
            cur = w_
    if cur:
        lines.append(cur)
    return lines


def make(fname, title, subtitle, icon_path=None, accent=SKY):
    img = base_canvas().convert("RGBA")
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)

    x_content = 90
    if icon_path and os.path.exists(icon_path):
        icon = Image.open(icon_path).convert("RGBA").resize((200, 200), Image.LANCZOS)
        mask = Image.new("L", (200, 200), 0)
        ImageDraw.Draw(mask).rounded_rectangle((0, 0, 200, 200), radius=44, fill=255)
        img.paste(icon, (x_content, 120), mask)
        x_content = 340

    y = 120
    tf = font(64)
    for line in wrap(title, tf, W - x_content - 90, d)[:2]:
        d.text((x_content, y), line, font=tf, fill=WHITE)
        y += 82

    bar = ImageDraw.Draw(overlay)
    bar.rounded_rectangle((x_content, y + 6, x_content + 130, y + 16), 5, fill=accent)
    y += 40

    sf = font(30, bold=False)
    for line in wrap(subtitle, sf, min(W - x_content - 90, 760), d)[:2]:
        d.text((x_content, y + 18), line, font=sf, fill=MUTED)
        y += 44

    brand = font(34)
    bw = d.textlength("MadeTech", font=brand)
    d.text((90, H - 100), "MadeTech", font=brand, fill=WHITE)
    dot = ImageDraw.Draw(overlay)
    dot.ellipse((112 + bw, H - 78, 124 + bw, H - 66), fill=LIME)
    dom = font(26, bold=False)
    dw = d.textlength("madetech.pt", font=dom)
    d.text((W - 90 - dw, H - 96), "madetech.pt", font=dom, fill=MUTED)

    img = Image.alpha_composite(img, overlay).convert("RGB")
    out = os.path.join(ASSETS, fname)
    img.save(out, "PNG", optimize=True)
    print(f"ok {out} ({os.path.getsize(out)//1024} KB)")


make("madetech-og.png",
     "Apps Mobile Nativas para Android e iOS",
     "Estúdio indie português. Kotlin Multiplatform: Best Gym, Scrutinium e SMAS. Grátis e privadas por design.")

make("bestgym-og.png",
     "Best Gym — Encontra o teu ginásio ideal",
     "Mapa em tempo real, 19 critérios de avaliação e notas unificadas comunidade + Google Reviews.",
     icon_path=os.path.join(ASSETS, "bestgym-icon.png"), accent=LIME)

make("scrutinium-og.png",
     "Scrutinium — O pulso da sociedade",
     "A Pergunta do Dia com resultados ao vivo e demografia por género, idade e continente.",
     icon_path=os.path.join(ASSETS, "scrutinium-icon.png"), accent=(244, 114, 182))

make("smas-og.png",
     "SMAS Almada — Gestão digital da água",
     "Faturas, pagamentos Multibanco e leituras de contador na palma da mão.",
     icon_path=os.path.join(ASSETS, "smas-icon.png"), accent=(56, 189, 248))

for city in ("lisboa", "porto"):
    nome = "Lisboa" if city == "lisboa" else "Porto"
    make(f"bestgym-{city}-og.png",
         f"Os melhores ginásios de {nome}",
         "Mapa interativo, 19 critérios de avaliação e rankings por categoria. Grátis no Google Play.",
         icon_path=os.path.join(ASSETS, "bestgym-icon.png"), accent=LIME)
