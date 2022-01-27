async function getResource(url) {
    try {
        let res = await fetch(url);
            if (!res.ok) {
                throw new Error(`Could not fetch ${url}, status: ${res.status}`);
            }
        return await res.json();
    } catch (error) {
        console.log('Возникла проблема с вашим fetch запросом: ', error.message);
    }
    
}

export default getResource;




