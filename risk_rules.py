
def estimate_condition_risks(cat_age, cat_sex, cat_breed, behaviors, conditions):
    """
    Returns a dictionary of likely conditions based on demographic and behavior-based rules.
    """
    risks = {}

    # Normalize inputs
    cat_sex = cat_sex.lower()
    breed = cat_breed.lower() if cat_breed else ""
    behaviors = [b.lower() for b in behaviors]
    conditions = [c.lower() for c in conditions]

    # ----------------------------
    # Risk Factors by Sex
    # ----------------------------
    if cat_sex == "male":
        risks["Urinary Blockage"] = "High"
        risks["Feline Lower Urinary Tract Disease (FLUTD)"] = "Moderate"

    # ----------------------------
    # Risk Factors by Age
    # ----------------------------
    if cat_age >= 15:
        risks["Chronic Kidney Disease (CKD)"] = "High"
        risks["Hyperthyroidism"] = "High"
        risks["Arthritis"] = "Moderate"
    elif cat_age >= 10:
        risks["Chronic Kidney Disease (CKD)"] = "Moderate"
        risks["Hyperthyroidism"] = "Moderate"

    if cat_age < 2:
        risks["Congenital Disorders"] = "Moderate"

    # ----------------------------
    # Behavior-based Risk Triggers
    # ----------------------------
    behavior_map = {
        "lethargy": "Diabetes Mellitus",
        "weight loss": "Hyperthyroidism",
        "vomiting food": "Gastrointestinal Disorder",
        "frequent urination": "UTI",
        "straining to urinate": "Urinary Blockage",
        "blood in urine": "Bladder stones",
        "constipation": "IBD or Blockage",
        "sleeping more": "Arthritis",
        "hiding more": "Pain or Stress",
        "unusual meowing": "Cognitive Dysfunction",
        "trouble jumping": "Arthritis",
        "not grooming": "Pain or Arthritis",
    }

    for behavior in behaviors:
        for key, condition in behavior_map.items():
            if key in behavior:
                risks[condition] = risks.get(condition, "Moderate")

    # ----------------------------
    # Breed-Specific Risk Examples
    # ----------------------------
    if "persian" in breed:
        risks["Polycystic Kidney Disease (PKD)"] = "High"
    if "maine coon" in breed:
        risks["Hypertrophic Cardiomyopathy (HCM)"] = "High"
    if "siamese" in breed:
        risks["Asthma"] = "Moderate"
        risks["Progressive Retinal Atrophy (PRA)"] = "Moderate"
    if "sphynx" in breed:
        risks["Skin Conditions"] = "Moderate"

    # ----------------------------
    # Fallback if no significant matches
    # ----------------------------
    if not risks:
        risks["No high-risk conditions identified"] = "Low"

    return risks
