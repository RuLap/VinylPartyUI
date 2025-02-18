"use server";

import { PartySet, PartyShortGet } from "@/types/party";

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

		const res = data.map((party: PartyShortGet) => ({
			id: party.id,
			title: party.title,
			date: party.date
		}));
		
		return res
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
