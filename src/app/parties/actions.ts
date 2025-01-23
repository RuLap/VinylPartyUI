"use server";

import { PartyGet, PartySet } from "@/types/party";

export async function parties() {
	return testParties.sort((a, b) => Number(b.id) - Number(a.id));
}

export async function saveParty(party: PartySet) {
	const partyAdd: PartyGet = {
		id: (testParties.length + 1).toString(),
		name: party.name,
		date: party.date.toString(),
		users: [],
		albums: []
	};
	testParties.push(partyAdd);
}

const party1: PartyGet = {
	id: "1",
	name: "Парти патирк",
	date: "23.01.2025 (18:00)",
	users: [],
	albums: []
};
const party2: PartyGet = {
	id: "2",
	name: "Хор мальчиков зайчиков",
	date: "13.12.2024 (19:00)",
	users: [],
	albums: []
};
const party3: PartyGet = {
	id: "3",
	name: "Я вас не звал",
	date: "01.12.2024 (15:00)",
	users: [],
	albums: []
};
const party4: PartyGet = {
	id: "4",
	name: "Металюжные",
	date: "25.11.2024 (17:30)",
	users: [],
	albums: []
};
const party5: PartyGet = {
	id: "5",
	name: "Джазовики",
	date: "10.10.2024 (20:00)",
	users: [],
	albums: []
};

const testParties = [
	party1,
	party2,
	party3,
	party4,
	party5
];