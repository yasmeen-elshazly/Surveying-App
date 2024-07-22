export const createBuilding = async (buildingData) => {
    const response = await fetch('https://localhost:7270/api/Building', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(buildingData),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const updateBuilding = async (id, buildingData) => {
    const response = await fetch(`https://localhost:7270/api/Building/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(buildingData),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};
