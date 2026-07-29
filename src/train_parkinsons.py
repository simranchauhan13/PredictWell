import json
import joblib
import pandas as pd

from pathlib import Path

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score
)


MODELS_DIR = Path("models")
MODELS_DIR.mkdir(exist_ok=True)


def train():

    df = pd.read_csv(
        "data/parkinsons.csv"
    )


    X = df.drop(
        columns=["name", "status"]
    )

    y = df["status"]


    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y
    )


    scaler = StandardScaler()

    X_train_scaled = scaler.fit_transform(
        X_train
    )

    X_test_scaled = scaler.transform(
        X_test
    )


    models = {

        "logistic_regression":
            LogisticRegression(
                max_iter=2000,
                class_weight="balanced"
            ),

        "random_forest":
            RandomForestClassifier(
                n_estimators=300,
                random_state=42,
                class_weight="balanced"
            )
    }


    best_model = None
    best_name = ""
    best_accuracy = 0

    results = {}


    for name, model in models.items():

        model.fit(
            X_train_scaled,
            y_train
        )


        pred = model.predict(
            X_test_scaled
        )


        acc = accuracy_score(
            y_test,
            pred
        )


        results[name] = {

            "accuracy": round(acc,4),
            "precision": round(
                precision_score(y_test,pred),
                4
            ),
            "recall": round(
                recall_score(y_test,pred),
                4
            ),
            "f1": round(
                f1_score(y_test,pred),
                4
            )

        }


        if acc > best_accuracy:
            best_accuracy = acc
            best_model = model
            best_name = name



    joblib.dump(
        best_model,
        MODELS_DIR / "parkinsons_model.joblib"
    )


    joblib.dump(
        scaler,
        MODELS_DIR / "parkinsons_scaler.joblib"
    )


    metadata = {

        "disease": "Parkinson's Disease",
        "best_model": best_name,
        "best_accuracy": round(best_accuracy,4),
        "feature_cols": list(X.columns),
        "results": results

    }


    with open(
        MODELS_DIR / "parkinsons_metadata.json",
        "w"
    ) as f:

        json.dump(
            metadata,
            f,
            indent=2
        )


    print(metadata)



if __name__ == "__main__":
    train()