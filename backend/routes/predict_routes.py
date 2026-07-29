from flask import Blueprint, request, jsonify

from services.prediction_service import (
    predict_diabetes,
    predict_heart,
    predict_parkinsons
)

predict_bp = Blueprint(
    "predict",
    __name__
)



@predict_bp.route(
    "/predict/diabetes",
    methods=["POST"]
)
def diabetes():

    data = request.json

    result = predict_diabetes(data)

    return jsonify({
        "success": True,
        "result": result
    })




@predict_bp.route(
    "/predict/heart",
    methods=["POST"]
)
def heart():

    data = request.json

    result = predict_heart(data)

    return jsonify({
        "success": True,
        "result": result
    })
@predict_bp.route(
    "/predict/parkinsons",
    methods=["POST"]
)
def parkinsons():

    data = request.json

    result = predict_parkinsons(data)

    return jsonify({
        "success": True,
        "result": result
    })