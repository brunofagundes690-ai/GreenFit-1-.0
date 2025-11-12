"use client"

import { useState } from "react"
import { Camera, Dumbbell, Apple, MessageSquare, BarChart3, Calendar, Target, TrendingUp, Flame, Utensils, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"

interface MacroData {
  protein: number
  carbs: number
  fats: number
  calories: number
}

interface Meal {
  id: string
  name: string
  time: string
  macros: MacroData
  image?: string
}

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

export default function GreenFit() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [meals, setMeals] = useState<Meal[]>([
    {
      id: "1",
      name: "Café da Manhã",
      time: "08:00",
      macros: { protein: 25, carbs: 45, fats: 12, calories: 380 }
    },
    {
      id: "2",
      name: "Almoço",
      time: "12:30",
      macros: { protein: 40, carbs: 60, fats: 18, calories: 550 }
    }
  ])
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Olá! Sou seu assistente nutricional AI. Como posso ajudar você hoje?" }
  ])
  const [inputMessage, setInputMessage] = useState("")

  // Cálculo de macros totais
  const totalMacros = meals.reduce(
    (acc, meal) => ({
      protein: acc.protein + meal.macros.protein,
      carbs: acc.carbs + meal.macros.carbs,
      fats: acc.fats + meal.macros.fats,
      calories: acc.calories + meal.macros.calories
    }),
    { protein: 0, carbs: 0, fats: 0, calories: 0 }
  )

  // Metas diárias
  const dailyGoals = {
    protein: 150,
    carbs: 250,
    fats: 70,
    calories: 2200
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return
    
    const newMessages: ChatMessage[] = [
      ...chatMessages,
      { role: "user", content: inputMessage }
    ]
    
    // Simulação de resposta AI
    setTimeout(() => {
      const responses = [
        "Ótima escolha! Esse alimento é rico em proteínas e vai te ajudar a atingir suas metas.",
        "Baseado no seu perfil, sugiro adicionar mais vegetais verdes para equilibrar os micronutrientes.",
        "Seu progresso está excelente! Continue assim e você alcançará seus objetivos.",
        "Que tal um treino de força hoje? Vejo que você está com energia suficiente!"
      ]
      setChatMessages([
        ...newMessages,
        { role: "assistant", content: responses[Math.floor(Math.random() * responses.length)] }
      ])
    }, 1000)
    
    setChatMessages(newMessages)
    setInputMessage("")
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Simulação de análise de imagem
      const newMeal: Meal = {
        id: Date.now().toString(),
        name: "Refeição Analisada",
        time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
        macros: {
          protein: Math.floor(Math.random() * 40) + 20,
          carbs: Math.floor(Math.random() * 60) + 30,
          fats: Math.floor(Math.random() * 20) + 10,
          calories: Math.floor(Math.random() * 400) + 300
        }
      }
      setMeals([...meals, newMeal])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900">
      {/* Header Premium */}
      <header className="border-b border-emerald-800/30 bg-slate-900/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/50">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-200 bg-clip-text text-transparent">
                  GreenFit
                </h1>
                <p className="text-xs text-emerald-400/70">Premium Health & Fitness</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <Flame className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-semibold text-emerald-100">{totalMacros.calories} kcal</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Navigation Tabs */}
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 gap-2 bg-slate-900/50 p-2 rounded-xl border border-emerald-800/30">
            <TabsTrigger 
              value="dashboard" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger 
              value="nutrition"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
            >
              <Apple className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Nutrição</span>
            </TabsTrigger>
            <TabsTrigger 
              value="workout"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
            >
              <Dumbbell className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Treino</span>
            </TabsTrigger>
            <TabsTrigger 
              value="scanner"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
            >
              <Camera className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Scanner</span>
            </TabsTrigger>
            <TabsTrigger 
              value="chat"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">AI Chat</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4 bg-gradient-to-br from-emerald-900/50 to-emerald-800/30 border-emerald-700/30 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                  <Flame className="w-5 h-5 text-orange-400" />
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-2xl font-bold text-white">{totalMacros.calories}</p>
                <p className="text-xs text-emerald-300">Calorias / {dailyGoals.calories}</p>
                <Progress 
                  value={(totalMacros.calories / dailyGoals.calories) * 100} 
                  className="mt-2 h-1.5 bg-emerald-950"
                />
              </Card>

              <Card className="p-4 bg-gradient-to-br from-blue-900/50 to-blue-800/30 border-blue-700/30 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                  <Target className="w-5 h-5 text-blue-400" />
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                </div>
                <p className="text-2xl font-bold text-white">{totalMacros.protein}g</p>
                <p className="text-xs text-blue-300">Proteína / {dailyGoals.protein}g</p>
                <Progress 
                  value={(totalMacros.protein / dailyGoals.protein) * 100} 
                  className="mt-2 h-1.5 bg-blue-950"
                />
              </Card>

              <Card className="p-4 bg-gradient-to-br from-amber-900/50 to-amber-800/30 border-amber-700/30 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                  <Utensils className="w-5 h-5 text-amber-400" />
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                </div>
                <p className="text-2xl font-bold text-white">{totalMacros.carbs}g</p>
                <p className="text-xs text-amber-300">Carboidratos / {dailyGoals.carbs}g</p>
                <Progress 
                  value={(totalMacros.carbs / dailyGoals.carbs) * 100} 
                  className="mt-2 h-1.5 bg-amber-950"
                />
              </Card>

              <Card className="p-4 bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-purple-700/30 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                  <Activity className="w-5 h-5 text-purple-400" />
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                </div>
                <p className="text-2xl font-bold text-white">{totalMacros.fats}g</p>
                <p className="text-xs text-purple-300">Gorduras / {dailyGoals.fats}g</p>
                <Progress 
                  value={(totalMacros.fats / dailyGoals.fats) * 100} 
                  className="mt-2 h-1.5 bg-purple-950"
                />
              </Card>
            </div>

            {/* Meals Today */}
            <Card className="p-6 bg-slate-900/50 border-emerald-800/30 backdrop-blur-sm">
              <h2 className="text-xl font-bold text-emerald-100 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-400" />
                Refeições de Hoje
              </h2>
              <div className="space-y-3">
                {meals.map((meal) => (
                  <div 
                    key={meal.id}
                    className="p-4 rounded-lg bg-gradient-to-r from-emerald-900/30 to-slate-900/30 border border-emerald-700/20 hover:border-emerald-600/40 transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-emerald-100">{meal.name}</h3>
                        <p className="text-xs text-emerald-400/70">{meal.time}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-white">{meal.macros.calories} kcal</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center p-2 rounded bg-blue-500/10 border border-blue-500/20">
                        <p className="text-blue-300 font-semibold">{meal.macros.protein}g</p>
                        <p className="text-blue-400/70">Proteína</p>
                      </div>
                      <div className="text-center p-2 rounded bg-amber-500/10 border border-amber-500/20">
                        <p className="text-amber-300 font-semibold">{meal.macros.carbs}g</p>
                        <p className="text-amber-400/70">Carbos</p>
                      </div>
                      <div className="text-center p-2 rounded bg-purple-500/10 border border-purple-500/20">
                        <p className="text-purple-300 font-semibold">{meal.macros.fats}g</p>
                        <p className="text-purple-400/70">Gorduras</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Nutrition Tab */}
          <TabsContent value="nutrition" className="space-y-6">
            <Card className="p-6 bg-slate-900/50 border-emerald-800/30 backdrop-blur-sm">
              <h2 className="text-xl font-bold text-emerald-100 mb-4">Plano Alimentar Personalizado</h2>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-gradient-to-r from-emerald-900/30 to-slate-900/30 border border-emerald-700/20">
                  <h3 className="font-semibold text-emerald-100 mb-2">Café da Manhã (08:00)</h3>
                  <ul className="space-y-1 text-sm text-emerald-200/80">
                    <li>• 3 ovos mexidos com espinafre</li>
                    <li>• 2 fatias de pão integral</li>
                    <li>• 1 banana</li>
                    <li>• Café com leite desnatado</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-r from-emerald-900/30 to-slate-900/30 border border-emerald-700/20">
                  <h3 className="font-semibold text-emerald-100 mb-2">Lanche da Manhã (10:30)</h3>
                  <ul className="space-y-1 text-sm text-emerald-200/80">
                    <li>• Iogurte grego natural</li>
                    <li>• 30g de granola</li>
                    <li>• Mix de frutas vermelhas</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-r from-emerald-900/30 to-slate-900/30 border border-emerald-700/20">
                  <h3 className="font-semibold text-emerald-100 mb-2">Almoço (12:30)</h3>
                  <ul className="space-y-1 text-sm text-emerald-200/80">
                    <li>• 150g de frango grelhado</li>
                    <li>• 100g de arroz integral</li>
                    <li>• Salada verde com azeite</li>
                    <li>• Legumes cozidos</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Workout Tab */}
          <TabsContent value="workout" className="space-y-6">
            <Card className="p-6 bg-slate-900/50 border-emerald-800/30 backdrop-blur-sm">
              <h2 className="text-xl font-bold text-emerald-100 mb-4 flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-emerald-400" />
                Treino de Hoje
              </h2>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-gradient-to-r from-orange-900/30 to-slate-900/30 border border-orange-700/20">
                  <h3 className="font-semibold text-orange-100 mb-3">Treino A - Peito e Tríceps</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center p-2 rounded bg-slate-900/50">
                      <span className="text-emerald-200">Supino Reto</span>
                      <span className="text-emerald-400 font-semibold">4x12</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-slate-900/50">
                      <span className="text-emerald-200">Supino Inclinado</span>
                      <span className="text-emerald-400 font-semibold">4x10</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-slate-900/50">
                      <span className="text-emerald-200">Crucifixo</span>
                      <span className="text-emerald-400 font-semibold">3x15</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-slate-900/50">
                      <span className="text-emerald-200">Tríceps Testa</span>
                      <span className="text-emerald-400 font-semibold">4x12</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-slate-900/50">
                      <span className="text-emerald-200">Tríceps Corda</span>
                      <span className="text-emerald-400 font-semibold">3x15</span>
                    </div>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold">
                  Iniciar Treino
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Scanner Tab */}
          <TabsContent value="scanner" className="space-y-6">
            <Card className="p-6 bg-slate-900/50 border-emerald-800/30 backdrop-blur-sm">
              <h2 className="text-xl font-bold text-emerald-100 mb-4 flex items-center gap-2">
                <Camera className="w-5 h-5 text-emerald-400" />
                Scanner de Alimentos AI
              </h2>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-emerald-600/30 rounded-xl p-12 text-center bg-gradient-to-br from-emerald-900/20 to-slate-900/20 hover:border-emerald-500/50 transition-all">
                  <Camera className="w-16 h-16 mx-auto mb-4 text-emerald-400" />
                  <h3 className="text-lg font-semibold text-emerald-100 mb-2">
                    Tire uma foto da sua refeição
                  </h3>
                  <p className="text-sm text-emerald-300/70 mb-4">
                    Nossa IA analisará automaticamente os macronutrientes
                  </p>
                  <label htmlFor="food-upload">
                    <Button 
                      className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold"
                      onClick={() => document.getElementById("food-upload")?.click()}
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Escanear Alimento
                    </Button>
                  </label>
                  <input
                    id="food-upload"
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
                <div className="p-4 rounded-lg bg-emerald-900/20 border border-emerald-700/30">
                  <h4 className="font-semibold text-emerald-100 mb-2 text-sm">Como funciona:</h4>
                  <ul className="space-y-1 text-xs text-emerald-200/80">
                    <li>1. Tire uma foto clara da sua refeição</li>
                    <li>2. Nossa IA identifica os alimentos automaticamente</li>
                    <li>3. Receba análise completa de macronutrientes</li>
                    <li>4. Os dados são salvos no seu diário alimentar</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Chat Tab */}
          <TabsContent value="chat" className="space-y-6">
            <Card className="p-0 bg-slate-900/50 border-emerald-800/30 backdrop-blur-sm overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-emerald-900/50 to-slate-900/50 border-b border-emerald-800/30">
                <h2 className="text-xl font-bold text-emerald-100 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-emerald-400" />
                  Assistente Nutricional AI
                </h2>
                <p className="text-xs text-emerald-300/70 mt-1">
                  Tire suas dúvidas sobre nutrição e treino
                </p>
              </div>
              
              <ScrollArea className="h-[400px] p-4">
                <div className="space-y-4">
                  {chatMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.role === "user"
                            ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white"
                            : "bg-slate-800/50 text-emerald-100 border border-emerald-700/20"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t border-emerald-800/30 bg-slate-900/30">
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Digite sua pergunta..."
                    className="bg-slate-800/50 border-emerald-700/30 text-emerald-100 placeholder:text-emerald-400/50"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-emerald-800/30 bg-slate-900/50 backdrop-blur-xl mt-12">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-sm text-emerald-300/70">
            GreenFit Premium © 2024 - Seu parceiro em saúde e fitness
          </p>
        </div>
      </footer>
    </div>
  )
}
