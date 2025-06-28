from flask import Flask, request, jsonify
import requests
import os

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

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'}), 200

if __name__ == '__main__':
    # For development, allow CORS from your frontend origin
    # In production, configure CORS properly
    from flask_cors import CORS
    
    # Get allowed origins from environment variable or use defaults
    allowed_origins = os.environ.get('ALLOWED_ORIGINS', 'http://localhost:3000,http://localhost:5173').split(',')
    CORS(app, origins=allowed_origins)
    
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False) 