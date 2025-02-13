"use server";

import { AlbumGet } from "@/types/album";
import { PartyGet, PartySet } from "@/types/party";

export async function parties(): Promise<PartyGet[]> {
	try {
		const response = await fetch(`http://localhost:8083/parties`, {
			method: 'GET',
			cache: 'no-store'
		});

		if (!response.ok) throw new Error('Ошибка загрузки вечеринок');

		const data = await response.json();

		return data.map((party: any) => ({
			id: party.ID,
			name: party.Title,
			date: party.Date
		}));
	} catch (error) {
		console.error('parties error:', error);
		return [];
	}
}

  export async function saveParty(party: PartySet): Promise<PartyGet | null> {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/parties/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(party),
		});

		if (!response.ok) throw new Error('Ошибка сохранения вечеринки');
		
		return await response.json();
	} catch (error) {
		console.error('saveParty error:', error);
		return null;
	}
}

export async function getParty(id: string): Promise<PartyGet | null> {
	try {
	  const response = await fetch(`http://localhost:8083/parties/${id}`, {
		method: "GET",
		cache: "no-store",
	  });
  
	  console.log(response)

	  if (!response.ok) throw new Error("Ошибка загрузки вечеринки");
  
	  const data = await response.json();
	  var result = {
		id: data.id,
		name: data.title,
		date: data.date,
		albums: data.albums ? data.albums.map(mapAlbum) : [],
		users: data.participants,
	  };

	  console.log(data)

	  console.log(result)

	  return result
	} catch (error) {
	  console.error("getParty error:", error);
	  return null;
	}
  }
  
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