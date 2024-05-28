export function generateColorForUser(userId: number) {
    const r = (userId * 25) % 155;
    const g = (userId * 42) % 155;
    const b = (userId * 72) % 155;
    return "#" 
        + r.toString(16).padStart(2, "0") 
        + g.toString(16).padStart(2, "0") 
        + b.toString(16).padStart(2, "0");
}