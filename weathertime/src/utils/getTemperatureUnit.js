export const getTemperatureWithCurrentUnit = (weatherObject, tempUnit) => {
    console.log("this is the TempUnit",tempUnit)
    if (JSON.stringify(weatherObject) !== '{}') {
        if (tempUnit === false) {
            return weatherObject.Temperature.Metric.Value + "°"
        } else {
            return weatherObject.Temperature.Imperial.Value + "°"
        }
    }
    return null
}