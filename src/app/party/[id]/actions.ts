import { AlbumCreate } from "@/types/album";

export async function SaveAlbum(partyId: string, spotifyLink: string) {
    try {
        console.log(spotifyLink)
		const response = await fetch(`http://localhost:8083/parties/${partyId}/albums`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                spotify_url: spotifyLink,
            }),
		});
        console.log(response)
        if(response.status == 204) return
	} catch (error) {
		console.error('saveAlbum error:', error);
		return null;
	}
}