import { NextResponse } from 'next/server'
import { getQuizById } from '@/data/mockdata'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params
  if (!id) {
    return NextResponse.json(
      { error: 'Missing quiz ID' },
      { status: 400 }
    )
  }

  try {
    const quiz = getQuizById(id)
    if (!quiz) {
      return NextResponse.json(
        { error: `Quiz '${id}' not found` },
        { status: 404 }
      )
    }
    return NextResponse.json(quiz)
  } catch (error) {
    console.error(`Error loading quiz '${id}':`, error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
