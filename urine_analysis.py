import cv2
import numpy as np
from PIL import Image

def analyze_multiple_strips(uploaded_files, ordered_pads):
    """
    Dynamically analyzes multiple test strips by dividing the image
    into equal-width sections based on user-defined pad order.
    """
    results = {pad: [] for pad in ordered_pads}

    for file in uploaded_files[:3]:
        image = Image.open(file).resize((600, 200))  # standardize size
        image_np = np.array(image)

        pad_width = 600 // len(ordered_pads)
        y1, y2 = 80, 130  # Fixed vertical sampling region

        for idx, pad in enumerate(ordered_pads):
            x1 = idx * pad_width
            x2 = x1 + pad_width
            region = image_np[y1:y2, x1:x2]
            avg_color = np.mean(region, axis=(0, 1)).astype(int)
            results[pad].append(avg_color.tolist())

    return results
