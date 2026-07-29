import joblib
import numpy as np

heart_scaler = joblib.load(
    "models/heart_scaler.joblib"
)
parkinsons_model = joblib.load(
    "models/parkinsons_model.joblib"
)

parkinsons_scaler = joblib.load(
    "models/parkinsons_scaler.joblib"
)
diabetes_model = joblib.load(
    "models/diabetes_model.joblib"
)

diabetes_scaler = joblib.load(
    "models/diabetes_scaler.joblib"
)


heart_model = joblib.load(
    "models/heart_model.joblib"
)

heart_scaler = joblib.load(
    "models/heart_scaler.joblib"
)



def get_risk(probability):

    if probability > 0.7:
        return "High"
    elif probability > 0.4:
        return "Medium"
    else:
        return "Low"



def predict_diabetes(data):

    features = np.array([
        [
            data["pregnancies"],
            data["glucose"],
            data["blood_pressure"],
            data["skin_thickness"],
            data["insulin"],
            data["bmi"],
            data["diabetes_pedigree"],
            data["age"],
            0,
            0,
            0
        ]
    ])


    scaled = diabetes_scaler.transform(features)

    probability = diabetes_model.predict_proba(
        scaled
    )[0][1]


    return {
    "disease": "Diabetes",
    "probability": round(probability * 100, 2),
    "risk": get_risk(probability),
    "recommendations": get_recommendations("Diabetes", get_risk(probability))
}





def predict_heart(data):

    features = np.array([
        [
            data["age"],
            data["sex"],
            data["cp"],
            data["trestbps"],
            data["chol"],
            data["fbs"],
            data["restecg"],
            data["thalach"],
            data["exang"],
            data["oldpeak"],
            data["slope"],
            data["ca"],
            data["thal"],
            0,
            0,
            0
        ]
    ])


    scaled = heart_scaler.transform(features)


    probability = heart_model.predict_proba(
        scaled
    )[0][1]


    risk = get_risk(probability)

    return {
    "disease": "Heart Disease",
    "probability": round(probability * 100, 2),
    "risk": risk,
    "recommendations": get_recommendations(
        "Heart Disease",
        risk
    )
}
def predict_parkinsons(data):

    features = np.array([
        [
            data["MDVP:Fo(Hz)"],
            data["MDVP:Fhi(Hz)"],
            data["MDVP:Flo(Hz)"],
            data["MDVP:Jitter(%)"],
            data["MDVP:Jitter(Abs)"],
            data["MDVP:RAP"],
            data["MDVP:PPQ"],
            data["Jitter:DDP"],
            data["MDVP:Shimmer"],
            data["MDVP:Shimmer(dB)"],
            data["Shimmer:APQ3"],
            data["Shimmer:APQ5"],
            data["MDVP:APQ"],
            data["Shimmer:DDA"],
            data["NHR"],
            data["HNR"],
            data["RPDE"],
            data["DFA"],
            data["spread1"],
            data["spread2"],
            data["D2"],
            data["PPE"]
        ]
    ])


    scaled = parkinsons_scaler.transform(features)


    probability = parkinsons_model.predict_proba(
        scaled
    )[0][1]


    risk = get_risk(probability)

    return {
    "disease": "Parkinson's Disease",
    "probability": round(probability * 100, 2),
    "risk": risk,
    "recommendations": get_recommendations(
        "Parkinson's Disease",
        risk
    )
}
def get_recommendations(disease, risk):

    recommendations = {

        "Diabetes": [
            "Monitor blood glucose regularly",
            "Maintain a balanced diet",
            "Exercise regularly",
            "Reduce sugar intake"
        ],

        "Heart Disease": [
            "Maintain healthy cholesterol levels",
            "Exercise regularly",
            "Avoid smoking and excess stress",
            "Schedule regular cardiac checkups"
        ],

        "Parkinson's Disease": [
            "Consult a neurologist for evaluation",
            "Maintain regular physical activity",
            "Monitor symptoms regularly",
            "Follow prescribed medical guidance"
        ]

    }


    if risk == "Low":
        return [
            "Maintain your current healthy lifestyle",
            "Continue regular health monitoring"
        ]


    return recommendations.get(
        disease,
        []
    )