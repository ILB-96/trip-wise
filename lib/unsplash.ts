export const fetchUnsplashImage = async (query: string): Promise<string> => {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.UNSPLASH_ACCESS_KEY}&order_by=relevant&per_page=1`);
    const data = await response.json();

    return data.results[0].urls.regular;
}