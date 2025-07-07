import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { QuizCategory } from '@/types'
import { getAllCategories } from '@/data/mockdata'
import { 
  BookOpen, 
  Beaker, 
  Calculator, 
  Code, 
  Zap, 
  Lightbulb, 
  Library, 
  ArrowRight,
  Star,
  Clock,
  TrendingUp,
  Users,
  Award,
  Target,
  Sparkles,
  Play,
  ChevronRight,
  Brain,
  Rocket,
  Trophy
} from 'lucide-react'

// Static metadata for SEO
export const metadata: Metadata = {
  title: 'QuizCraft - Master Knowledge Through Micro-Learning',
  description: 'Elevate your expertise with bite-sized quizzes across History, Science, Mathematics, and Programming. Learn smarter, not harder.',
  keywords: 'quiz, micro-learning, education, knowledge, history, science, math, programming, skill development',
  openGraph: {
    title: 'QuizCraft - Master Knowledge Through Micro-Learning',
    description: 'Elevate your expertise with bite-sized quizzes across multiple disciplines',
    type: 'website',
  },
}

// This function runs at build time to fetch data for static generation
async function getCategories(): Promise<QuizCategory[]> {
  try {
    // In a real app, you'd fetch from your API route
    // For build-time static generation, we'll use the mock data directly
    return getAllCategories()
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    return []
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

export default async function HomePage() {
  const categories = await getCategories()

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative z-50 backdrop-blur-xl bg-slate-900/50 border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-2xl shadow-purple-500/25">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-ping"></div>
              </div>
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                  QuizCraft
                </h1>
                <p className="text-xs text-slate-400 font-medium tracking-wide">NEXT-GEN LEARNING</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex items-center space-x-2 bg-slate-800/60 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700/50">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-semibold">4.9</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-800/60 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700/50">
                <Users className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-semibold">12k+</span>
              </div>
              <button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-24">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm text-purple-300 px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-purple-500/30">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Micro Learning</span>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse ml-2"></div>
          </div>
          
          <h2 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Learn
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-emerald-400 bg-clip-text text-transparent">
              Everything
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Fast
            </span>
          </h2>
          
          <p className="mt-8 max-w-3xl mx-auto text-xl text-slate-300 leading-relaxed">
            Revolutionary micro-learning platform that transforms how you acquire knowledge. 
            <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-bold">
              Master any subject in minutes, not hours.
            </span>
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="group relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl shadow-purple-500/25">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center space-x-3">
                <Play className="w-6 h-6" />
                <span>Start Learning Now</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </button>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 bg-slate-800/60 backdrop-blur-sm px-4 py-3 rounded-xl border border-slate-700/50">
                <Clock className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-medium">3-5 min/quiz</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-800/60 backdrop-blur-sm px-4 py-3 rounded-xl border border-slate-700/50">
                <Target className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium">98% success rate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Choose Your Path
            </h3>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Dive into expertly crafted learning experiences across diverse domains
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => {
              const IconComponent = categoryIcons[category.id as keyof typeof categoryIcons] || BookOpen
              const gradientColor = categoryColors[category.id as keyof typeof categoryColors] || 'from-purple-500 to-pink-600'
              
              return (
                <Link
                  key={category.id}
                  href={`/quizzes/${category.id}`}
                  className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/50 transition-all duration-500 transform hover:-translate-y-4 hover:scale-105"
                >
                  {/* Animated background effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradientColor} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  {/* Glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradientColor} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />
                  
                  <div className="relative p-8">
                    <div className="flex items-center justify-between mb-8">
                      <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${gradientColor} flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-8 h-8 text-white" />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full group-hover:animate-ping"></div>
                      </div>
                      <div className="text-right">
                        <div className="bg-slate-700/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-bold border border-slate-600/50">
                          {category.quizCount}
                        </div>
                        <div className="text-xs text-slate-400 mt-1 font-medium">
                          {category.quizCount === 1 ? 'Quiz' : 'Quizzes'}
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 group-hover:bg-clip-text transition-all duration-300">
                      {category.name}
                    </h3>
                    
                    <p className="text-slate-400 text-sm mb-8 line-clamp-3 leading-relaxed">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className={`flex items-center text-transparent bg-gradient-to-r ${gradientColor} bg-clip-text font-bold text-sm group-hover:text-white transition-all duration-300`}>
                        <span>Explore Now</span>
                        <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-slate-700/60 backdrop-blur-sm flex items-center justify-center text-xs font-bold border border-slate-600/50">
                        {index + 1}
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Features Section */}
        <div className="relative mb-24">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-3xl blur-3xl"></div>
          <div className="relative bg-slate-800/30 backdrop-blur-xl rounded-3xl p-12 border border-slate-700/50">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Why QuizCraft Dominates
              </h3>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                Experience the cutting-edge of educational technology
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-purple-500/25 group-hover:scale-110 transition-transform duration-300">
                    <Rocket className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-400 rounded-full animate-bounce"></div>
                </div>
                <h4 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Lightning Speed
                </h4>
                <p className="text-slate-400 leading-relaxed">
                  Revolutionary micro-learning approach that delivers maximum knowledge in minimal time. Perfect for the modern learner.
                </p>
              </div>
              
              <div className="text-center group">
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/25 group-hover:scale-110 transition-transform duration-300">
                    <Brain className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                </div>
                <h4 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  AI-Powered
                </h4>
                <p className="text-slate-400 leading-relaxed">
                  Advanced AI algorithms provide personalized feedback and adaptive learning paths tailored to your unique learning style.
                </p>
              </div>
              
              <div className="text-center group">
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-blue-500/25 group-hover:scale-110 transition-transform duration-300">
                    <Trophy className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-pink-400 rounded-full animate-bounce delay-200"></div>
                </div>
                <h4 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Proven Results
                </h4>
                <p className="text-slate-400 leading-relaxed">
                  Join thousands of successful learners who've mastered new skills and advanced their careers with our platform.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: '12K+', label: 'Active Learners', icon: Users, color: 'from-purple-500 to-pink-600' },
            { number: '200+', label: 'Quiz Topics', icon: Library, color: 'from-emerald-500 to-teal-600' },
            { number: '4.9★', label: 'User Rating', icon: Star, color: 'from-yellow-500 to-orange-600' },
            { number: '98%', label: 'Success Rate', icon: Award, color: 'from-blue-500 to-indigo-600' },
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
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-2xl shadow-purple-500/25">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                QuizCraft
              </span>
            </div>
            <p className="text-slate-400 text-lg mb-6 max-w-2xl mx-auto">
              Revolutionizing education through innovative micro-learning experiences. 
              <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-semibold">
                The future of learning is here.
              </span>
            </p>
            <div className="flex items-center justify-center space-x-8 mb-8">
              <div className="flex items-center space-x-2 text-slate-400">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span className="text-sm">Powered by AI</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <Lightbulb className="w-4 h-4 text-yellow-400" />
                <span className="text-sm">Innovation First</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <Trophy className="w-4 h-4 text-blue-400" />
                <span className="text-sm">Results Driven</span>
              </div>
            </div>
            <p className="text-slate-500 text-sm">
              © 2024 QuizCraft Platform. Engineered for excellence, designed for impact.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}