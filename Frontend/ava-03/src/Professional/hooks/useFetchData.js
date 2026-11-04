

//Here, we will fetch raw data from the backend and convert it into an object.

/**
 * A default data object will be of the form:
 *  Object {
 *   "timestamp": 0,
 *   "data": {}
 * 
 */

const fetchData = async (driveId) => {
    const dataUrl = "http://localhost:8000/api/" + driveId;
}

const fetchDrives = async () => {
    const dataUrl = "/api/drive";
    try {
        const response = await fetch(dataUrl)
        console.log("Response:", response);
        if(!response.ok) {
            throw new Error(`Failed to fetch drives (${response.status})`);
        }
        const data = await response.json();
        console.log("Fetched drives:", data);
        return data;
    } catch(error) {
        console.error("Error fetching drives:", error);
        throw error;
    }
}

export default fetchDrives;