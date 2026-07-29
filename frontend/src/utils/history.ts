export interface PredictionHistory {
  disease: string;
  probability: number;
  risk: string;
  date: string;
}


export const savePrediction = (
  data: PredictionHistory
) => {

  const oldHistory =
    JSON.parse(
      localStorage.getItem("predictionHistory") || "[]"
    );


  oldHistory.unshift(data);


  localStorage.setItem(
    "predictionHistory",
    JSON.stringify(oldHistory.slice(0,10))
  );

};



export const getPredictionHistory = () => {

  return JSON.parse(
    localStorage.getItem("predictionHistory") || "[]"
  );

};