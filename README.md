# Beans
AI Cat health monitering app
BEANS

# 1. Objective
Build a lightweight but intelligent, AI-powered platform that enables cat owners to track their pets' health, conduct urine tests at home, interpret results with personalized health insights, and take informed next steps.

# 2. Target User
* Cat owners who care deeply for their cat health - specifically older cats or cats with chronic issues
* Users seeking alternatives to vague solutions like Pretty Litter
* People with previous bad experiences googling symptoms or feeling overwhelmed

# 3. Key Features

<table id="features">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Feature Description</th>
      <th scope="col">Description</th>
      <th scope="col">Priority</th>
      <th scope="col">Feasibility</th>
      <th scope="col">Impact</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Urine Test Image Upload</th>
      <td>User uploads a photo (up to 3)of a dipped strip</td>
      <td>P1</td>
      <td>High</td>
      <td>High</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Strip Color Analysis (Computer Vision)</td>
      <td>Use OpenCV to extract pad colors, map to biomarkers</td>
      <td>P1</td>
      <td>Medium</td>
      <td>High</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Behavior & Health Context Intake</td>
      <td>Structured form for symptoms, age, history</td>
      <td>P1</td>
      <td>High</td>
      <td>High</td>
    </tr>
    <tr>
      <td>4</td>
      <td>AI-Generated Personalized Health Report</td>
      <td>Combine color data + context in GPT prompt for wellness insight</td>
      <td>P1</td>
      <td>High</td>
      <td>High</td>
    </tr>
    <tr>
      <td>5</td>
      <td>Tone-Sensitive Language System</td>
      <td>Soft, empathetic UX language in AI output</td>
      <td>P1</td>
      <td>High</td>
      <td>High</td>
    </tr>
    <tr>
      <td>6</td>
      <td>Disclaimers & Trust Layer</td>
      <td>Legal copy + AI reassurance language</td>
      <td>P1</td>
      <td>High</td>
      <td>High</td>
    </tr>
    <tr>
      <td>7</td>
      <td>Save historical health reports </td>
      <td>Ability for users to save health reports to track trends</td>
      <td>P2</td>
      <td>High</td>
      <td>Medium</td>
    </tr>
    <tr>
      <td>8</td>
      <td>Mock Local Vet Listings (Optional)</td>
      <td>Based on ZIP/city; adds optional vet suggestions</td>
      <td>P2</td>
      <td>Medium</td>
      <td>Medium</td>
    </tr>
    <tr>
      <td>9</td>
      <td>Primary Vet Profile</td>
      <td>Save user's vet info and reference it in AI responses</td>
      <td>P2</td>
      <td>High</td>
      <td>Medium</td>
    </tr>
    <tr>
      <td>10</td>
      <td>Cost Estimate Lookup by Condition</td>
      <td>Show average treatment costs based on flagged issues</td>
      <td>P2</td>
      <td>Medium</td>
      <td>High</td>
    </tr>
    <tr>
      <td>11</td>
      <td>Pet Insurance Profile</td>
      <td>Let user input provider, policy, reimbursement info</td>
      <td>P3</td>
      <td>High</td>
      <td>Medium</td>
    </tr>
    <tr>
      <td>12</td>
      <td>AI Incorporates Insurance Coverage</td>
      <td>Estimate OOP cost based on policy details</td>
      <td>P3</td>
      <td>Medium</td>
      <td>High</td>
    </tr>
    <tr>
      <td>13</td>
      <td>Claim Report Generator (PDF)</td>
      <td>Auto-generate AI summary for vet or insurance</td>
      <td>P3</td>
      <td>Medium</td>
      <td>Medium</td>
    </tr>
    <tr>
      <td>14</td>
      <td>“Send to Vet” API Trigger</td>
      <td>Future feature to integrate with vet EMRs</td>
      <td>P4</td>
      <td>Low</td>
      <td>High</td>
    </tr>
    <tr>
      <td>15</td>
      <td>Real-Time Vet Directory Integration</td>
      <td>Google/Yelp API or vet finder platforms</td>
      <td>P4</td>
      <td>Low</td>
      <td>Medium</td>
    </tr>
  </tbody>
</table>



# 4. MVP Feature Set (Version 1.0)

## Core
1. Urine strip image upload 
1. Strip color analysis for 3–4 parameters 
1. Behavior + context form 
1. AI health interpretation 
1. Tone-aware language + legal disclaimer
1. Save historical health reports

## Enhancing, but not blocking
1. Mock vet suggestions by ZIP 
1. Primary vet info in settings 

## 5. Post-MVP Roadmap (V1.1+)
These are high-impact features to consider once core reliability is proven:
1. Add treatment cost estimates based on condition 
1. User insurance profile 
1. AI factoring in reimbursement rates 
1. PDF report download 

## 6. Future Product Line Vision
1. “VetConnect”: Vet software integration 
1. Real-time vet discovery + reviews 
1. Claims API automation
1. Behavior + trend tracking over time
1. Real test kit brand partnerships

# 7. Design Principles
* Clarity > complexity: No medical jargon unless explained
* Empathy first: Calm, non-alarming design and tone
* User control: Optional next steps, no fear pressure
* Data transparency: Clear visual feedback and privacy protection


