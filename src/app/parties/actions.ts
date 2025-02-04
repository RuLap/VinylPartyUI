"use server";

import { PartyGet, PartySet } from "@/types/party";

export async function parties() {
	return partiesData.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

export async function saveParty(party: PartySet) {
	const partyAdd: PartyGet = {
		id: (partiesData.length + 1),
		name: party.name,
		date: party.date.toString(),
		users: [],
		albums: []
	};
	partiesData.push(partyAdd);
}

export async function getParty(id: number) {
	return partiesData.find(p => p.id == id);
}

const partiesData: PartyGet[] = [
  {
	id: 1,
	name: "Вечеринка 1",
	date: "2023-10-01",
	users: [
	  { id: 1, firstName: "Иван", lastName: "Иванов", email: "", avatar: "https://bit.ly/dan-abramov" },
	  { id: 2, firstName: "Петр", lastName: "Петров", email: "", avatar: "https://bit.ly/kent-c-dodds" },
	  { id: 3, firstName: "Анатолий", lastName: "Сидоров", email: "", avatar: "https://bit.ly/ryan-florence" },
	],
	albums: [
	  {
		id: 1,
		imageUrl: "https://i.scdn.co/image/ab67616d00001e025225e9931a558f6d2f541a7d",
		title: "Origin Of Symmetry",
		artist: "Muse",
		rating: 85,
		ratedBy: [
		  { id: 1, firstName: "Иван", lastName: "Иванов", avatar: "https://bit.ly/dan-abramov", rating: 90 },
		  { id: 2, firstName: "Петр", lastName: "Петров", avatar: "https://bit.ly/kent-c-dodds", rating: 80 },
		],
	  },
	  {
		id: 2,
		imageUrl: "https://i.scdn.co/image/ab67616d00001e02e7dd69ac32cf313fde62cbad",
		title: "Tell Me I'm Pretty",
		artist: "Cage The Elephant",
	  },
	],
  }
]