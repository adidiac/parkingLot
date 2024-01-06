import axios from 'axios'
export const getCoordinates = async (locationName)=>{
    let result=await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${locationName}&apiKey=b5b8555521e541e89c40f77cc9fb9ae2`);
    let lat=result.data.features[0].properties.lat;
    let lon=result.data.features[0].properties.lon;
    return {lat,lon};
}
export const getMap=(lon,lat)=>{
    return `https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=600&height=400&center=lonlat:${lon},${lat}&zoom=11&apiKey=b5b8555521e541e89c40f77cc9fb9ae2`
}
