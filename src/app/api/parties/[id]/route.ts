import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  // Здесь должна быть логика получения данных о вечеринке из базы данных
  const party = {
    id,
    name: "Вечеринка 1",
    date: "2023-10-01",
    users: [{ id: "1", name: "User 1" }],
    albums: [{ id: "1", name: "Album 1", artist: "Artist 1", rating: 4.5 }],
  };
  return NextResponse.json(party);
}