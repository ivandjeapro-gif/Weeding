#!/usr/bin/env python3
"""
Détourage de la photo du couple Norbé & Ericka.

Le fond de la photo est un blanc studio quasi pur. On supprime uniquement
les pixels quasi blancs CONNECTÉS au bord de l'image (par composantes
connexes via scipy), pour ne jamais trouer les tenues blanches du couple.

Sorties :
  - src/assets/norbe-ericka.webp      → détouré, alpha, pour le site
  - scripts/preview_cutout.png        → aperçu sur fond doré (contrôle visu)
"""

from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

SRC = Path("/home/z/my-project/upload/IMG-20261011-WA0104.jpg.jpeg")
OUT_WEBP = Path("/home/z/my-project/src/assets/norbe-ericka.webp")
OUT_PREVIEW = Path("/home/z/my-project/scripts/preview_cutout.png")

# Seuils : un pixel est "candidat fond" s'il est quasi blanc et neutre
WHITE_MIN = 234  # canal min
NEUTRAL_MAX = 16  # écart max entre canaux (saturation approx.)


def main() -> None:
    im = Image.open(SRC).convert("RGB")
    rgb = np.asarray(im).astype(np.int16)
    h, w, _ = rgb.shape

    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    channel_max = rgb.max(axis=2)
    channel_min = rgb.min(axis=2)
    near_white = (channel_min >= WHITE_MIN) & ((channel_max - channel_min) <= NEUTRAL_MAX)

    # Composantes connexes des pixels quasi blancs
    labels, n = ndimage.label(near_white)
    border_labels = set(np.unique(np.concatenate([labels[0, :], labels[-1, :], labels[:, 0], labels[:, -1]])))
    border_labels.discard(0)

    bg = np.isin(labels, list(border_labels)) if border_labels else np.zeros_like(near_white)
    fg = ~bg
    print(f"Pixels candidats fond : {near_white.mean() * 100:.1f}% → fond réel : {bg.mean() * 100:.1f}%")

    # Érode légèrement le masque avant-plan pour éviter le liseré blanc,
    # puis adoucit le contour (feathering).
    fg_soft = ndimage.binary_erosion(fg, structure=np.ones((3, 3)), iterations=1)
    alpha = Image.fromarray((fg_soft * 255).astype(np.uint8), "L").filter(ImageFilter.GaussianBlur(1.1))
    alpha_np = np.asarray(alpha)

    cut = Image.new("RGBA", im.size)
    cut.paste(im, (0, 0))
    cut.putalpha(Image.fromarray(alpha_np, "L"))

    # Rognage sur le contenu utile + petite marge
    ys, xs = np.where(alpha_np > 10)
    x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
    m = 10
    x0, y0 = max(0, x0 - m), max(0, y0 - m)
    x1, y1 = min(w - 1, x1 + m), min(h - 1, y1 + m)
    cut = cut.crop((x0, y0, x1 + 1, y1 + 1))
    print("Taille rognée :", cut.size)

    # Redimensionnement : largeur max 980px (assez pour tous les usages du site)
    target_w = 980
    if cut.width > target_w:
        target_h = round(cut.height * target_w / cut.width)
        cut = cut.resize((target_w, target_h), Image.LANCZOS)
    print("Taille finale :", cut.size)

    OUT_WEBP.parent.mkdir(parents=True, exist_ok=True)
    cut.save(OUT_WEBP, "WEBP", quality=86, method=6, exact=True)
    kb = OUT_WEBP.stat().st_size / 1024
    print(f"Écrit : {OUT_WEBP} ({kb:.0f} Ko)")

    # Aperçu de contrôle sur fond doré chaud (comme sur le site)
    bg_img = Image.new("RGB", (cut.width + 80, cut.height + 80), (243, 217, 164))
    bg_img.paste(cut, (40, 40), cut)
    bg_img.thumbnail((760, 920))
    bg_img.save(OUT_PREVIEW)
    print(f"Aperçu : {OUT_PREVIEW}")


if __name__ == "__main__":
    main()
