from flask import Flask, request, jsonify
import csv
import os
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

# Function to update CSV file
def update_csv(point_id, review):
    csv_file_path = "../data/Nairobi.csv"
    # Check if the CSV file exists
    if not os.path.exists(csv_file_path):
        raise FileNotFoundError(f"CSV file '{csv_file_path}' not found")
    print("Fetching CSV")
    df = pd.read_csv(csv_file_path)
    index = df[df["Station"] == point_id].index
    old_reviews = df.loc[index, "Reviews"].values[0]
    new_reviews = review
    df.loc[index, "Reviews"] = new_reviews
    print("Updating CSV")
    df.to_csv(csv_file_path, index=False)
    print("CSV Updated")

# Endpoint to handle review submission
@app.route('/submit-review', methods=['POST'])
def submit_review():

    print("Receiving")
    # Get review data from the request
    data = request.get_json()

    # Extract pointId and review from the JSON data
    point_id = data.get('pointId')
    review = data.get('review')
    print("Received")

    # Update CSV file with the review
    update_csv(point_id, review)
    print("updated")

    return jsonify({'message': 'Review submitted successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True)


















# This file contains the WSGI configuration required to serve up your
# web application at http://<your-username>.pythonanywhere.com/
# It works by setting the variable 'application' to a WSGI handler of some
# description.
#
# The below has been auto-generated for your Flask project

import sys
import os
os.environ['TZ'] = 'Africa/Nairobi'  # Replace with your time zone


# add your project directory to the sys.path
project_home = '/home/NairobiControls/mysite'
if project_home not in sys.path:
    sys.path = [project_home] + sys.path

# import flask app but need to call it "application" for WSGI to work
from app import app as application
