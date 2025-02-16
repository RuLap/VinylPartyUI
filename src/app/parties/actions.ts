"use server";

import { AlbumGet } from "@/types/album";
import { PartyGet, PartySet, PartyShortGet } from "@/types/party";

export async function GetUserParties(userId: string, status: string): Promise<PartyShortGet[]> {
	try {
		console.log(status)
		const response = await fetch(`http://localhost:8083/users/${userId}/parties?status=${status}`, {
			method: 'GET',
			cache: 'no-store',
			credentials: 'include'
		});

		if (!response.ok) throw new Error('Ошибка загрузки вечеринок');

		const data = await response.json();
		console.log(data)

		return data.map((party: any) => ({
			id: party.ID,
			title: party.Title,
			date: party.Date
		}));
	} catch (error) {
		console.error('parties error:', error);
		return [];
	}
}

export async function CreateParty(userId: string, party: PartySet): Promise<PartyShortGet> {
	try {
		const response = await fetch(`http://localhost:8083/parties`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				host_id: userId,
				title: party.title,
				description: party.description,
				date: party.date,
			}),
		});
	
		if (response.status !== 201) {
			const errorData = await response.json();
			throw new Error(errorData.message || 'Ошибка сохранения вечеринки');
		}
	
		const data: PartyShortGet = await response.json();

		if (!data.id) {
			throw new Error('Некорректный ответ сервера');
		}

		console.log(data)
	
		return data;
	} catch (error) {
		console.error('CreateParty error:', error);
		throw new Error(typeof error === 'string' ? error : 'Неизвестная ошибка');
	}
}

// export async function getParty(id: string): Promise<PartyGet | null> {
// 	try {
// 		const response = await fetch(`http://localhost:8083/parties/${id}`, {
// 			method: "GET",
// 			cache: "no-store",
// 		});

// 		if (!response.ok) throw new Error("Ошибка загрузки вечеринки");

// 		const data = await response.json();
// 		var result = {
// 			id: data.id,
// 			name: data.title,
// 			date: data.date,
// 			description: data.description,
// 			albums: data.albums ? data.albums.map(mapAlbum) : [],
// 			users: data.participants,
// 		};
// 		return result
// 	} catch (error) {
// 		console.error("getParty error:", error);
// 		return null;
// 	}
// }
  
function mapAlbum(apiAlbum: any): AlbumGet {
	return {
		id: apiAlbum.id,
		title: apiAlbum.title || "Без названия",
		artist: apiAlbum.artist || "Неизвестный исполнитель",
		imageUrl: apiAlbum.cover_url || "/placeholder.jpg",
		rating: apiAlbum.averageRating || 0,
		ratedBy: apiAlbum.ratings?.map((rating: any) => ({
		userId: rating.userId,
		userName: `${rating.rater.firstName} ${rating.rater.lastName}`,
		score: rating.score
		})) || []
	};
}
