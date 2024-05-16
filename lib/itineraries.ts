
export const addRating = async (rating: number, itineraryId: string): Promise<{ success: boolean, error?: string }> => {
    try {
        
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}