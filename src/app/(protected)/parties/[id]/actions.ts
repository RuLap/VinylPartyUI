import { AlbumGet } from "@/types/album";
import { PartyGet } from "@/types/party";
import { RatingCreate } from "@/types/rating";

export async function CreateAlbum(partyId: string, spotifyLink: string): Promise<AlbumGet | null> {
    try {
		const response = await fetch(`http://localhost:8083/parties/${partyId}/albums`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                spotify_url: spotifyLink,
            }),
		});

        if (response.status !== 201) {
			const errorData = await response.json();
			throw new Error(errorData.message || 'Ошибка сохранения вечеринки');
		}
	
		const data: AlbumGet = await response.json();

		if (!data.id) {
			throw new Error('Некорректный ответ сервера');
		}

		return data
	} catch (error) {
		console.error('saveAlbum error:', error);
		return null;
	}
}

export async function GetParty(id: string): Promise<PartyGet | null> {
	try {
		const response = await fetch(`http://localhost:8083/parties/${id}`, {
			method: "GET",
			cache: "no-store",
		});
        console.log(response)
		if (!response.ok) throw new Error("Ошибка загрузки вечеринки");

		const data = await response.json();
		var result = data as PartyGet
		return result
	} catch (error) {
		console.error("getParty error:", error);
		return null;
	}
}

export async function CreateRating({albumId, userId, score}: RatingCreate): Promise<AlbumGet> {
	try {
		const response = await fetch(`http://localhost:8083/albums/${albumId}/ratings`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				user_id: userId,
				score: score,
			}),
		});
		console.log(response)
		if (response.status !== 201) {
			const errorData = await response.json();
			throw new Error(errorData.message || 'Ошибка сохранения вечеринки');
		}
	
		const data: AlbumGet = await response.json();
		console.log(data)
	
		return data;
	} catch (error) {
		console.error('CreateParty error:', error);
		throw new Error(typeof error === 'string' ? error : 'Неизвестная ошибка');
	}
}