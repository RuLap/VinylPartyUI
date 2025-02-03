import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { rating } = await request.json();
  const updatedAlbum = {
    id,
    name: "Album 1",
    artist: "Artist 1",
    rating: rating,
  };
  return NextResponse.json(updatedAlbum);
}