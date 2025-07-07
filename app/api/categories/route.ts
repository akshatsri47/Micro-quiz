import { NextResponse } from 'next/server'
import { getAllCategories, getQuizzesByCategory } from '@/data/mockdata'

export async function GET() {
  try {
    const categories = getAllCategories().map(cat => ({
      ...cat,
      quizCount: getQuizzesByCategory(cat.id).length,
    }))
    return NextResponse.json(categories)
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}
