export const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth's radius in kilometers

    // Convert degrees to radians
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const rLat1 = lat1 * Math.PI / 180;
    const rLat2 = lat2 * Math.PI / 180;

    // Haversine core formula
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(rLat1) * Math.cos(rLat2);
              
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    return R * c; // Distance in kilometers
}

// Example Usage: Distance between New York City and London
// const nycLat = 40.7128, nycLon = -74.0060;
// const lonLat = 51.5074, lonLon = -0.1278;

// const distance = haversineDistance(nycLat, nycLon, lonLat, lonLon);
// console.log(`Distance: ${(distance*1000).toFixed(2)} m`); // Output: ~5570.22 km
