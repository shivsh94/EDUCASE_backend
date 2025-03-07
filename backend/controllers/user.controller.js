import School from "../models/school.model.js";

export const addSchool = async (req, res) => {
  try {
    const { name, address, longitude, latitude } = req.body;
    if (!name || !address || !longitude || !latitude) {
      return res.status(400).json({ success: true, error: "All fields are required" });
    }
    const newSchool = await School.create({
      name,
      address,
      longitude,
      latitude,
    });
    res.json({success:true, newSchool});
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const listSchools = async (req, res) => {
  try {
    const { longitude, latitude } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({ error: "Latitude and Longitude are required" });
    }

    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

    const schools = await School.findAll();

    const schoolsWithDistance = schools.map((school) => {
      const distance = getDistance(
        userLat,
        userLon,
        school.latitude,
        school.longitude
      );
      return { ...school.toJSON(), distance };
    });

    const sortedSchools = schoolsWithDistance.sort(
      (a, b) => a.distance - b.distance
    );

    res.json({success:true, schools: sortedSchools });
  } catch (error) {
    console.error("Error fetching schools:", error);
    res.status(500).json({success:false, error: error.message });
  }
};

//  formula to calculate distance 

function getDistance(lat1, lon1, lat2, lon2) {
  const toRad = (degree) => (degree * Math.PI) / 180;

  const R = 6371; // Earth's radius in KM
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
