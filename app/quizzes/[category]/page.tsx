// app/quizzes/[category]/page.tsx (App Router version)
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Quiz, QuizCategory } from '@/types'
import { getCategoryById, getQuizzesByCategory } from '@/data/mockdata'
import { 
  BookOpen, 
  Beaker, 
  Calculator, 
  Code, 
  Clock,
  Users,
  Star,
  ChevronRight,
  ArrowLeft,
  Play,
  Target,
  Zap,
  Brain,
  Trophy,
  CheckCircle,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Calendar,
  Award,
  Flame
} from 'lucide-react'

interface CategoryPageProps {
  params: {
    category: string
  }
}

// Dynamic metadata generation for SEO
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = getCategoryById(params.category)
  
  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'The requested quiz category could not be found.',
    }
  }

  return {
    title: `${category.name} Quizzes - QuizCraft`,
    description: `${category.description}. Take our ${category.name} quizzes and test your knowledge!`,
    keywords: `${category.name.toLowerCase()}, quiz, learning, education, ${category.name.toLowerCase()} quiz`,
    openGraph: {
      title: `${category.name} Quizzes - QuizCraft`,
      description: `${category.description}. Take our ${category.name} quizzes and test your knowledge!`,
      type: 'website',
    },
  }
}

// Icon mapping for categories
const categoryIcons = {
  history: BookOpen,
  science: Beaker,
  math: Calculator,
  programming: Code,
}

// Category color schemes
const categoryColors = {
  history: 'from-amber-500 to-orange-600',
  science: 'from-emerald-500 to-teal-600',
  math: 'from-blue-500 to-indigo-600',
  programming: 'from-purple-500 to-pink-600',
}

// Server-Side Rendering (SSR) - This component runs on the server for each request
export default async function CategoryPage({ params }: CategoryPageProps) {
  // Fetch data on the server for each request (SSR)
  const category = getCategoryById(params.category)
  const quizzes = getQuizzesByCategory(params.category)

  // Handle category not found
  if (!category) {
    notFound()
  }

  // Get category-specific styling
  const IconComponent = categoryIcons[category.id as keyof typeof categoryIcons] || BookOpen
  const gradientColor = categoryColors[category.id as keyof typeof categoryColors] || 'from-purple-500 to-pink-600'

  // Format difficulty levels for display
  const getDifficultyConfig = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return {
          color: 'from-emerald-500 to-green-600',
          bg: 'bg-emerald-500/20',
          border: 'border-emerald-500/30',
          text: 'text-emerald-300'
        }
      case 'medium':
        return {
          color: 'from-yellow-500 to-orange-600',
          bg: 'bg-yellow-500/20',
          border: 'border-yellow-500/30',
          text: 'text-yellow-300'
        }
      case 'hard':
        return {
          color: 'from-red-500 to-pink-600',
          bg: 'bg-red-500/20',
          border: 'border-red-500/30',
          text: 'text-red-300'
        }
      default:
        return {
          color: 'from-gray-500 to-gray-600',
          bg: 'bg-gray-500/20',
          border: 'border-gray-500/30',
          text: 'text-gray-300'
        }
    }
  }

  const formatTimeLimit = (minutes: number) => {
    return `${minutes} min${minutes !== 1 ? 's' : ''}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br ${gradientColor} opacity-5 rounded-full blur-3xl animate-pulse`}></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative z-50 backdrop-blur-xl bg-slate-900/50 border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-4 hover:opacity-80 transition-opacity group">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-2xl shadow-purple-500/25">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
                </div>
                <span className="text-xl font-black bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                  QuizCraft
                </span>
              </Link>
            </div>
            
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-3 text-sm">
              <Link href="/" className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                <span>Home</span>
              </Link>
              <ChevronRight className="w-4 h-4 text-slate-600" />
              <span className="text-white font-semibold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                {category.name}
              </span>
            </nav>
          </div>
        </div>
      </header>

      {/* Category Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${gradientColor} flex items-center justify-center shadow-2xl shadow-purple-500/25`}>
                <IconComponent className="w-16 h-16 text-white" />
              </div>
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center animate-bounce">
                <Sparkles className="w-4 h-4 text-slate-900" />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              {category.name}
            </span>
            <br />
            <span className={`bg-gradient-to-r ${gradientColor} bg-clip-text text-transparent`}>
              Mastery
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            {category.description}
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
            <div className="flex items-center space-x-2 bg-slate-800/60 backdrop-blur-sm px-4 py-3 rounded-xl border border-slate-700/50">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-semibold">{quizzes.length} Quiz{quizzes.length !== 1 ? 'es' : ''}</span>
            </div>
            
            <div className="flex items-center space-x-2 bg-slate-800/60 backdrop-blur-sm px-4 py-3 rounded-xl border border-slate-700/50">
              <Clock className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-semibold">
                {Math.min(...quizzes.map(q => q.timeLimit))} - {Math.max(...quizzes.map(q => q.timeLimit))} mins
              </span>
            </div>

            <div className="flex items-center space-x-2 bg-slate-800/60 backdrop-blur-sm px-4 py-3 rounded-xl border border-slate-700/50">
              <Target className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-semibold">All Levels</span>
            </div>
          </div>

          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm text-purple-300 px-6 py-3 rounded-full text-sm font-semibold border border-purple-500/30">
            <Flame className="w-4 h-4" />
            <span>Ready to dominate?</span>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse ml-2"></div>
          </div>
        </div>

        {/* Quizzes Grid */}
        {quizzes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quizzes.map((quiz, index) => {
              const difficultyConfig = getDifficultyConfig(quiz.difficulty)
              
              return (
                <Link
                  key={quiz.id}
                  href={`/quiz/${quiz.id}`}
                  className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/50 transition-all duration-500 transform hover:-translate-y-4 hover:scale-105"
                >
                  {/* Animated background effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradientColor} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  {/* Glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradientColor} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />
                  
                  {/* Top accent bar */}
                  <div className={`h-1 w-full bg-gradient-to-r ${gradientColor}`} />
                  
                  <div className="relative p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className={`px-3 py-1 rounded-full text-xs font-bold ${difficultyConfig.bg} ${difficultyConfig.border} ${difficultyConfig.text} border backdrop-blur-sm`}>
                            {quiz.difficulty.toUpperCase()}
                          </div>
                          <div className="w-8 h-8 rounded-full bg-slate-700/60 backdrop-blur-sm flex items-center justify-center text-xs font-bold border border-slate-600/50">
                            {index + 1}
                          </div>
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 group-hover:bg-clip-text transition-all duration-300">
                          {quiz.title}
                        </h3>
                        
                        <p className="text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed">
                          {quiz.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center space-x-2 bg-slate-800/40 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-700/30">
                        <Target className="w-4 h-4 text-blue-400" />
                        <span className="text-xs font-medium">{quiz.questions.length} questions</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 bg-slate-800/40 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-700/30">
                        <Clock className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-medium">{formatTimeLimit(quiz.timeLimit)}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-slate-500">
                        <Calendar className="w-4 h-4" />
                        <span className="text-xs">{formatDate(quiz.createdAt)}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradientColor} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <Play className="w-5 h-5 text-white ml-0.5" />
                        </div>
                        <div className={`flex items-center text-transparent bg-gradient-to-r ${gradientColor} bg-clip-text font-bold text-sm group-hover:text-white transition-all duration-300`}>
                          <span>Start</span>
                          <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="relative mb-8">
              <div className="w-32 h-32 bg-slate-800/60 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto border border-slate-700/50">
                <Trophy className="w-16 h-16 text-slate-400" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center border border-slate-600">
                <span className="text-xs font-bold text-slate-400">0</span>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              No Quizzes Available Yet
            </h3>
            
            <p className="text-slate-400 mb-8 max-w-md mx-auto">
              The {category.name} category is currently being crafted. Check back soon for mind-bending challenges!
            </p>
            
            <Link
              href="/"
              className="group inline-flex items-center space-x-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 px-8 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl shadow-purple-500/25"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Explore Other Categories</span>
            </Link>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { number: `${quizzes.length}`, label: 'Total Quizzes', icon: Trophy, color: gradientColor },
            { number: `${quizzes.reduce((sum, quiz) => sum + quiz.questions.length, 0)}`, label: 'Questions', icon: Target, color: 'from-emerald-500 to-teal-600' },
            { number: `${Math.round(quizzes.reduce((sum, quiz) => sum + quiz.timeLimit, 0) / quizzes.length || 0)}`, label: 'Avg Time (min)', icon: Clock, color: 'from-blue-500 to-indigo-600' },
            { number: '98%', label: 'Success Rate', icon: Award, color: 'from-yellow-500 to-orange-600' },
          ].map((stat, index) => (
            <div key={index} className="group relative overflow-hidden bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 transform hover:-translate-y-2">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              <div className="relative text-center">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-black mb-2 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-slate-900/80 backdrop-blur-xl border-t border-slate-800/50 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-2xl shadow-purple-500/25">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-black bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                  QuizCraft
                </span>
                <p className="text-xs text-slate-400 font-medium">© 2024 - Future of Learning</p>
              </div>
            </div>
            
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors group"
            >
              <span className="text-sm font-medium">Explore More</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Optional: Generate static params for better performance (if you have a finite set of categories)
export async function generateStaticParams() {
  // This would pre-generate pages for known categories at build time
  // But since we want SSR as per requirements, we'll keep this minimal
  return []
}