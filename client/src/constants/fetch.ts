import axios from "axios";

export async function fetchTours() {
        const res = await axios.get('/api/tour/getTours');
        console.log(res.data)
        return res.data
}

export async function fetchTour(slug: string) {
        const res = await axios.get(`/api/tour/getTour?slug=${slug}`);
        console.log(res.data)
        return res.data
}

export async function deleteTour(id: string) {
        const res = await axios.post('/api/tour/deleteTour', { id });
        console.log(res.data)
        return res.data
}