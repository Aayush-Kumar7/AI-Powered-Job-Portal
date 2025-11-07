from flask import Flask, request, jsonify

app = Flask(__name__)

# Some example jobs
jobs = [
    {"id": 1, "title": "Frontend Developer", "skills": "react javascript css"},
    {"id": 2, "title": "Backend Developer", "skills": "node express mongodb"},
    {"id": 3, "title": "Data Analyst", "skills": "python pandas excel"},
]

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    user_skills = data.get('skills', '').lower()

    # Simple matching logic
    scores = []
    for job in jobs:
        match = len(set(user_skills.split()) & set(job["skills"].split()))
        scores.append((job, match))

    # Sort by best match
    top_jobs = sorted(scores, key=lambda x: x[1], reverse=True)[:3]
    recommended = [j[0] for j in top_jobs]

    return jsonify({"recommended_jobs": recommended})

if __name__ == '__main__':
    app.run(debug=True)
