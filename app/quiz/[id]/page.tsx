'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  points: number
  explanation: string
}

interface Quiz {
  id: string
  title: string
  category: string
  difficulty: string
  timeLimit: number
  questions: Question[]
}

interface QuizPageProps {
  params: {
    id: string
  }
}

interface QuizState {
  currentQuestionIndex: number
  selectedAnswers: (number | null)[]
  showFeedback: boolean
  currentAnswer: number | null
  score: number
  isCompleted: boolean
  timeRemaining: number
  isTimerActive: boolean
}

export default function QuizPage({ params }: QuizPageProps) {
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Quiz state management
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    selectedAnswers: [],
    showFeedback: false,
    currentAnswer: null,
    score: 0,
    isCompleted: false,
    timeRemaining: 0,
    isTimerActive: false
  })

  // Fetch quiz data on component mount
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/quiz/${params.id}`)
        
        if (!response.ok) {
          throw new Error('Quiz not found')
        }
        
        const quizData = await response.json()
        setQuiz(quizData)
        
        // Initialize quiz state
        setQuizState(prev => ({
          ...prev,
          selectedAnswers: new Array(quizData.questions.length).fill(null),
          timeRemaining: quizData.timeLimit * 60, // Convert minutes to seconds
          isTimerActive: true
        }))
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load quiz')
      } finally {
        setLoading(false)
      }
    }

    fetchQuiz()
  }, [params.id])

  // Timer effect
  useEffect(() => {
    if (!quizState.isTimerActive || quizState.timeRemaining <= 0) return

    const timer = setInterval(() => {
      setQuizState(prev => {
        const newTimeRemaining = prev.timeRemaining - 1
        
        if (newTimeRemaining <= 0) {
          // Time's up - auto-submit quiz
          return {
            ...prev,
            timeRemaining: 0,
            isTimerActive: false,
            isCompleted: true
          }
        }
        
        return {
          ...prev,
          timeRemaining: newTimeRemaining
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [quizState.isTimerActive, quizState.timeRemaining])

  // Handle answer selection
  const handleAnswerSelect = (answerIndex: number) => {
    if (quizState.showFeedback) return

    setQuizState(prev => ({
      ...prev,
      currentAnswer: answerIndex,
      showFeedback: true
    }))

    // Auto-advance after showing feedback
    setTimeout(() => {
      handleNextQuestion(answerIndex)
    }, 2000)
  }

  // Handle next question
  const handleNextQuestion = (answerIndex: number) => {
    if (!quiz) return

    const currentQuestion = quiz.questions[quizState.currentQuestionIndex]
    const isCorrect = answerIndex === currentQuestion.correctAnswer
    
    setQuizState(prev => {
      const newSelectedAnswers = [...prev.selectedAnswers]
      newSelectedAnswers[prev.currentQuestionIndex] = answerIndex
      
      const newScore = isCorrect ? prev.score + currentQuestion.points : prev.score
      const isLastQuestion = prev.currentQuestionIndex === quiz.questions.length - 1
      
      return {
        ...prev,
        selectedAnswers: newSelectedAnswers,
        score: newScore,
        currentQuestionIndex: isLastQuestion ? prev.currentQuestionIndex : prev.currentQuestionIndex + 1,
        showFeedback: false,
        currentAnswer: null,
        isCompleted: isLastQuestion,
        isTimerActive: isLastQuestion ? false : prev.isTimerActive
      }
    })
  }

  // Format time remaining
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Calculate final score percentage
  const getFinalScorePercentage = () => {
    if (!quiz) return 0
    const totalPossiblePoints = quiz.questions.reduce((sum, q) => sum + q.points, 0)
    return Math.round((quizState.score / totalPossiblePoints) * 100)
  }

  // Get score color based on percentage
  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-400'
    if (percentage >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading quiz...</p>
        </div>
      </div>
    )
  }

  if (error || !quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Quiz Not Found</h1>
          <p className="text-gray-300 mb-6">{error || 'The requested quiz could not be found.'}</p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const currentQuestion = quiz.questions[quizState.currentQuestionIndex]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">Q</span>
                </div>
                <span className="text-xl font-bold text-white">QuizCraft</span>
              </Link>
            </div>
            
            {/* Timer */}
            {quizState.isTimerActive && (
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium ${
                quizState.timeRemaining <= 60 ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-slate-700/50 text-gray-300 border border-slate-600'
              }`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{formatTime(quizState.timeRemaining)}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!quizState.isCompleted ? (
          /* Quiz In Progress */
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700 overflow-hidden">
            {/* Quiz Header */}
            <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white p-6 border-b border-slate-600">
              <h1 className="text-2xl font-bold mb-3 text-white">{quiz.title}</h1>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-300">
                  <span>Question {quizState.currentQuestionIndex + 1} of {quiz.questions.length}</span>
                  <span>•</span>
                  <span className="capitalize bg-slate-600/50 px-2 py-1 rounded text-xs">{quiz.difficulty}</span>
                </div>
                <div className="text-sm text-gray-300">
                  Score: <span className="text-orange-400 font-medium">{quizState.score} pts</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-slate-700 h-2">
              <div 
                className="bg-gradient-to-r from-orange-500 to-pink-500 h-2 transition-all duration-500"
                style={{ width: `${((quizState.currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
              />
            </div>

            {/* Question Content */}
            <div className="p-8">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4 leading-relaxed">
                  {currentQuestion.question}
                </h2>
                <div className="text-sm text-gray-400 mb-6">
                  Worth <span className="text-orange-400 font-medium">{currentQuestion.points} points</span>
                </div>
              </div>

              {/* Answer Options */}
              <div className="space-y-4">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = quizState.currentAnswer === index
                  const isCorrect = index === currentQuestion.correctAnswer
                  const showResult = quizState.showFeedback
                  
                  let buttonClass = "w-full p-4 text-left border-2 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                  
                  if (showResult) {
                    if (isCorrect) {
                      buttonClass += " bg-green-500/20 border-green-500 text-green-400"
                    } else if (isSelected && !isCorrect) {
                      buttonClass += " bg-red-500/20 border-red-500 text-red-400"
                    } else {
                      buttonClass += " bg-slate-700/30 border-slate-600 text-gray-400"
                    }
                  } else {
                    buttonClass += isSelected 
                      ? " bg-orange-500/20 border-orange-500 text-orange-400" 
                      : " bg-slate-700/30 border-slate-600 text-gray-300 hover:bg-slate-600/40 hover:border-slate-500"
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={quizState.showFeedback}
                      className={buttonClass}
                    >
                      <div className="flex items-center space-x-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-current flex items-center justify-center text-sm font-bold">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="flex-1 text-left">{option}</span>
                        {showResult && isCorrect && (
                          <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                        {showResult && isSelected && !isCorrect && (
                          <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Feedback */}
              {quizState.showFeedback && (
                <div className="mt-8 p-6 bg-slate-700/50 border border-slate-600 rounded-xl">
                  <h3 className="font-semibold text-white mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Explanation:
                  </h3>
                  <p className="text-gray-300 leading-relaxed">{currentQuestion.explanation}</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Quiz Completed */
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-8 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-3xl font-bold mb-2">Quiz Complete!</h1>
              <p className="text-xl opacity-90">You've finished "{quiz.title}"</p>
            </div>

            <div className="p-8">
              {/* Score Summary */}
              <div className="text-center mb-8">
                <div className="mb-4">
                  <span className="text-5xl font-bold text-white">{quizState.score}</span>
                  <span className="text-xl text-gray-400 ml-2">
                    / {quiz.questions.reduce((sum, q) => sum + q.points, 0)} points
                  </span>
                </div>
                <div className={`text-3xl font-bold ${getScoreColor(getFinalScorePercentage())}`}>
                  {getFinalScorePercentage()}%
                </div>
              </div>

              {/* Performance Message */}
              <div className="text-center mb-8">
                <p className="text-gray-300 text-lg">
                  {getFinalScorePercentage() >= 80 
                    ? "🌟 Excellent work! You really know your stuff!" 
                    : getFinalScorePercentage() >= 60 
                    ? "👍 Good job! You have a solid understanding." 
                    : "📚 Keep studying! You'll get better with practice."}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/quizzes/${quiz.category}`}
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  More {quiz.category.charAt(0).toUpperCase() + quiz.category.slice(1)} Quizzes
                </Link>
                
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-8 py-4 bg-slate-700 text-white rounded-xl hover:bg-slate-600 transition-all duration-300 font-medium border border-slate-600"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}