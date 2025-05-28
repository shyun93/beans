from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from urine_analysis import analyze_multiple_strips
from PIL import Image, UnidentifiedImageError
import io
import json
import os
from dotenv import load_dotenv 
from pathlib import Path
load_dotenv(dotenv_path=Path(__file__).resolve().parent / ".env")
print("OPENAI_API_KEY is:", os.getenv("OPENAI_API_KEY"))
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
import requests  
from risk_rules import estimate_condition_risks

app = Flask(__name__)
CORS(app)

# Load condition + behavior vocab
with open("data/conditions_prefixed.json") as f:
    conditions_prefixed = json.load(f)
with open("data/behaviors_prefixed.json") as f:
    behaviors_prefixed = json.load(f)

import cv2
import numpy as np

def auto_detect_pads(image_np, num_pads):
    gray = cv2.cvtColor(image_np, cv2.COLOR_RGB2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    edged = cv2.Canny(blurred, 50, 150)

    contours, _ = cv2.findContours(edged.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    pad_regions = []
    for c in contours:
        x, y, w, h = cv2.boundingRect(c)
        if 30 < w < 80 and 30 < h < 80:  # rough size filter
            pad_regions.append((x, y, x + w, y + h))

    pad_regions = sorted(pad_regions, key=lambda b: b[0])  # left to right

    if len(pad_regions) >= num_pads:
        return pad_regions[:num_pads]
    else:
        return None

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.form
    files = request.files.getlist("images")

    cat_name = data.get("cat_name")
    cat_age = data.get("cat_age")
    cat_sex = data.get("cat_sex")
    cat_breed = data.get("cat_breed")
    cat_weight = data.get("cat_weight") or "Unknown"
    cat_conditions = json.loads(data.get("cat_conditions", "[]"))
    cat_behavior = json.loads(data.get("cat_behavior", "[]"))
    cat_temperature = data.get("cat_temperature") or "Unknown"
    ordered_pads = json.loads(data.get("ordered_pads", "[]"))
    risk_profile = estimate_condition_risks(
        cat_age=int(cat_age),
        cat_sex=cat_sex,
        cat_breed=cat_breed,
        behaviors=cat_behavior,
        conditions=cat_conditions
    )
    risk_insights = "\n".join([f"- {k}: {v}" for k, v in risk_profile.items()])


    results = {}

    if files:
        try:
            strips = []
            for f in files:
                try:
                    img = Image.open(f.stream)
                    strips.append(img)
                except UnidentifiedImageError:
                    return jsonify({"error": f"Invalid image file: {f.filename}"}), 400
            results = analyze_multiple_strips(strips, ordered_pads)
            if not results:
                results = {pad: ["(not provided)"] for pad in ordered_pads}

        except Exception as e:
            return jsonify({"error": f"Image processing failed: {str(e)}"}), 500


    # Placeholder logic eventually want to implement ML here
    urine_analysis = {pad: "(simulated)" for pad in ordered_pads}
    urinalysis_text = "\n".join([f"- {pad}: {urine_analysis[pad]}" for pad in ordered_pads])

    prompt = f"""
You're an AI assistant helping a cat owner interpret at-home urine test results.

🐱 Name: {cat_name}
Age: {cat_age}
Sex: {cat_sex}
Breed: {cat_breed}
Weight: {cat_weight}
Conditions: {', '.join(cat_conditions) or 'None reported'}
Behaviors: {', '.join(cat_behavior) or "None"}
Temperature: {cat_temperature}

🧠 DEMOGRAPHIC-BASED RISK ASSESSMENT:
{risk_insights}

🧪 URINALYSIS:
{urinalysis_text}

Please generate a calm, supportive summary:
- Explain what the findings might indicate
- Reassure the user
- Consider any breed, age, or sex-related risk factors
- Use the findings of the urinalysis to determine what might be happening.
- Suggest next steps (e.g. monitoring, follow-up with vet)

"""

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
            max_tokens=400
        )
        summary = response.choices[0].message.content
    except Exception:
        summary = "Unable to generate summary at this time."

    return jsonify({
        "summary": summary,
        "pad_results": results,
        "condition_likelihoods": risk_profile
    })

@app.route("/categories", methods=["GET"])
def get_categories():
    return jsonify({
        "conditions": conditions_prefixed,
        "behaviors": behaviors_prefixed
    })

@app.route("/test/breeds")
def test_breeds():
    response = requests.get("https://api.thecatapi.com/v1/breeds")
    if response.status_code == 200:
        data = response.json()
        breed_names = [b["name"] for b in data]
        breed_names.append("Other") 
        return jsonify(breed_names)
    return jsonify({"error": "Could not fetch breeds"}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)