import cv2
import numpy as np
from PIL import Image
from pad_detection import auto_detect_pads

# ----- CONFIG -----
image_path = "test.png"  # Replace this with your real filename
output_path = "detected_pads_preview.jpg"
expected_pads = 14  # Set based on user input or manual test

# Load and prepare image
image = Image.open(image_path).convert("RGB").resize((600, 600))
image_np = np.array(image)

# Detect pads
pad_regions = auto_detect_pads(image_np, expected_pad_count=expected_pads)

# Draw bounding boxes
for (x1, y1, x2, y2) in pad_regions:
    cv2.rectangle(image_np, (x1, y1), (x2, y2), (0, 255, 0), 2)

# Save preview
cv2.imwrite(output_path, cv2.cvtColor(image_np, cv2.COLOR_RGB2BGR))
print(f"✅ Saved preview to {output_path}")
