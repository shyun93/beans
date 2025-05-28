import cv2
import numpy as np

def auto_detect_pads(image_np, expected_pad_count=10, debug=False):
    gray = cv2.cvtColor(image_np, cv2.COLOR_RGB2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)

    # Adaptive threshold to handle varying lighting
    thresh = cv2.adaptiveThreshold(
        blurred, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY_INV, 11, 2
    )

    # Find contours
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    pad_regions = []

    for cnt in contours:
        x, y, w, h = cv2.boundingRect(cnt)

        # Filter: size & aspect ratio (pads are roughly square or slightly rectangular)
        if w < 10 or h < 10 or w > 100 or h > 100:
            continue

        aspect_ratio = w / h
        if 0.4 < aspect_ratio < 2.5:
            mean_color = np.mean(image_np[y:y+h, x:x+w])
            if mean_color < 220:  # filter out near-white regions
                pad_regions.append((x, y, x+w, y+h))

    # Sort top to bottom or left to right based on orientation
    pad_regions.sort(key=lambda box: (box[1], box[0]))  # prioritize vertical layout

    # Refine to top N by area (common heuristic if too many found)
    if len(pad_regions) > expected_pad_count:
        pad_regions = sorted(pad_regions, key=lambda box: (box[1], box[0]))[:expected_pad_count]

    # Visualize (optional)
    if debug:
        debug_img = image_np.copy()
        for i, (x1, y1, x2, y2) in enumerate(pad_regions):
            cv2.rectangle(debug_img, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(debug_img, str(i+1), (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 1)
        cv2.imwrite("debug_pad_detection.jpg", cv2.cvtColor(debug_img, cv2.COLOR_RGB2BGR))

    return pad_regions
