from flask import Flask
from flask_cors import CORS
import joblib

from routes.predict_routes import predict_bp

parkinsons_model = joblib.load(
    "models/parkinsons_model.joblib"
)

parkinsons_scaler = joblib.load(
    "models/parkinsons_scaler.joblib"
)
app = Flask(__name__)

CORS(app)


app.register_blueprint(
    predict_bp
)


if __name__ == "__main__":

    app.run(
        port=5000,
        debug=True
    )