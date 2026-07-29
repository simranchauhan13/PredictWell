import joblib
import json
import numpy as np
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent.parent
MODELS_DIR = BASE_DIR / "models"


def load_model(disease):
    model = joblib.load(
        MODELS_DIR / f"{disease}_model.joblib"
    )

    scaler = joblib.load(
        MODELS_DIR / f"{disease}_scaler.joblib"
    )

    with open(MODELS_DIR / f"{disease}_metadata.json") as f:
        metadata = json.load(f)

    return model, scaler, metadata


diabetes_model, diabetes_scaler, diabetes_meta = load_model("diabetes")
heart_model, heart_scaler, heart_meta = load_model("heart")


def get_risk(probability):
    if probability < 0.35:
        return "Low"
    elif probability < 0.65:
        return "Medium"
    else:
        return "High"


def predict_diabetes(data):

    features = np.array(data).reshape(1, -1)

    scaled = diabetes_scaler.transform(features)

    probability = diabetes_model.predict_proba(scaled)[0][1]

    return {
        "disease": "Diabetes",
        "probability": round(float(probability) * 100, 2),
        "risk": get_risk(probability)
    }



def predict_heart(data):

    features = np.array(data).reshape(1, -1)

    scaled = heart_scaler.transform(features)

    probability = heart_model.predict_proba(scaled)[0][1]

    return {
        "disease": "Heart Disease",
        "probability": round(float(probability) * 100, 2),
        "risk": get_risk(probability)
    }