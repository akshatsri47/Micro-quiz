import { NextResponse } from 'next/server'
import { getCategoryById, getQuizzesByCategory } from '@/data/mockdata'

export async function GET(
  request: Request,
  { params }: { params: { category: string } }
) {
  const { category } = params
  if (!category) {
    return NextResponse.json(
      { error: 'Missing category parameter' },
      { status: 400 }
    )
  }

  const cat = getCategoryById(category)
  if (!cat) {
    return NextResponse.json(
      { error: `Category '${category}' not found` },
      { status: 404 }
    )
  }

  try {
    const quizzes = getQuizzesByCategory(category)
    return NextResponse.json(quizzes)
  } catch (error) {
    console.error(`Error loading quizzes for '${category}':`, error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
