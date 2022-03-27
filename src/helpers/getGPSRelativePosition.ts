import * as geolib from 'geolib';
import coordinateType from "../types/coordinateType";



function GetGPSRelativePosition (objectPosition:coordinateType, centerPosition: coordinateType) {

  // Get GPS distance
  // console.log({objectPosition, centerPosition})

  const distance = geolib.getDistance(objectPosition, centerPosition);

  // Get bearing angle
  const bearing = geolib.getRhumbLineBearing(objectPosition, centerPosition);

  // console.log(distance)

  // Calculate X by centerPosition.x + distance * cos(rad)
  const x = centerPosition[0] + (distance * Math.cos(bearing * Math.PI / 180));

  //@ts-ignore Calculate Y by centerPosition.y + distance * cos(rad)
  const y = centerPosition[1] + (distance * Math.sin(bearing * Math.PI / 180));

  const scale = 0.01

  const result = [ x*scale, y*scale ]
  // console.log(result)
  // Reverce X (it work)
  return result
}

export default GetGPSRelativePosition;