from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

PISTON_API_URL = 'https://emkc.org/api/v2/piston/execute'

@app.route('/run-code', methods=['POST'])
def run_code():
    code = request.json.get('code')
    if not code:
        return jsonify({'error': 'No code provided'}), 400

    payload = {
        'language': 'python',
        'version': '3.10.0',  # You can specify other versions if needed
        'files': [{'content': code}]
    }

    try:
        response = requests.post(PISTON_API_URL, json=payload)
        response.raise_for_status()  # Raise an exception for bad status codes
        result = response.json()
        
        # Piston API returns 'stdout' and 'stderr' inside the 'run' object
        output = result.get('run', {}).get('stdout', '')
        error = result.get('run', {}).get('stderr', '')

        return jsonify({'output': output, 'error': error})

    except requests.exceptions.RequestException as e:
        # Handle network-related errors
        return jsonify({'error': f'API request failed: {e}'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # For development, allow CORS from your frontend origin
    # In production, configure CORS properly
    from flask_cors import CORS
    CORS(app, origins=['http://localhost:3000', 'http://localhost:5173']) # Assuming your frontend runs on http://localhost:3000 or http://localhost:5173
    app.run(debug=True) 