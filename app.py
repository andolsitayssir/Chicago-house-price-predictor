from flask import Flask, send_from_directory, request, jsonify
import joblib
import pandas as pd
import os

app = Flask(__name__)

# Charger le modèle
model = joblib.load('house_price_model.pkl')

@app.route('/')
def home():
    return send_from_directory('.', 'index.html')

@app.route('/style.css')
def styles():
    return send_from_directory('.', 'style.css')

@app.route('/script.js')
def script():
    return send_from_directory('.', 'script.js')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    features = {
        'Bedroom': data['bedroom'],
        'Room': data['room'],
        'Space': data['space'],
        'Lot': data['lot'],
        'Tax': data['tax'],
        'Bathroom': data['bathroom'],
        'Garage': data['garage'],
        'Condition': data['condition']
    }

    # Convert features to a DataFrame to ensure the same format as training data
    features_df = pd.DataFrame([features])

    # Perform prediction
    prediction = model.predict(features_df)[0]

    return jsonify({'prediction': prediction})
    
    return jsonify({'prediction': prediction[0]})

if __name__ == '__main__':
    app.run(debug=True)
