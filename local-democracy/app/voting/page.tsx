"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { ToastContainer } from "@/components/ui/toast"

export default function VotingPage() {
  // Sample polls data with Indian context
  const [polls, setPools] = useState([
    {
      id: 1,
      title: "New Metro Line Extension",
      description: "Should the Delhi Metro be extended to connect Najafgarh to Dwarka?",
      options: ["Yes, it's needed", "No, focus on other areas", "Undecided"],
      votes: [245, 68, 32],
      totalVotes: 345,
      endDate: "2023-06-15",
      category: "Infrastructure",
    },
    {
      id: 2,
      title: "Weekly Market Days",
      description: "Which days should be designated for the weekly market in Sarojini Nagar?",
      options: ["Saturday-Sunday", "Wednesday-Thursday", "Friday-Saturday"],
      votes: [156, 87, 203],
      totalVotes: 446,
      endDate: "2023-05-30",
      category: "Commerce",
    },
    {
      id: 3,
      title: "Park Renovation Priority",
      description: "Which aspect of Cubbon Park renovation should be prioritized first?",
      options: ["Children's play area", "Walking tracks", "Green cover and landscaping", "Public toilets"],
      votes: [124, 98, 156, 87],
      totalVotes: 465,
      endDate: "2023-06-10",
      category: "Public Spaces",
    },
  ])

  const [userVotes, setUserVotes] = useState<Record<number, number>>({})
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const { toasts, addToast, removeToast } = useToast()

  // Load saved votes from localStorage
  useEffect(() => {
    const savedVotes = localStorage.getItem("userVotes")
    if (savedVotes) {
      setUserVotes(JSON.parse(savedVotes))
    }
  }, [])

  const handleVote = (pollId: number, optionIndex: number) => {
    setUserVotes((prev) => ({
      ...prev,
      [pollId]: optionIndex,
    }))
  }

  const submitVote = (pollId: number) => {
    if (userVotes[pollId] === undefined) {
      addToast("Please select an option before submitting", "warning")
      return
    }

    // Update the poll votes
    setPools((prev) =>
      prev.map((poll) => {
        if (poll.id === pollId) {
          const newVotes = [...poll.votes]
          newVotes[userVotes[pollId]] += 1
          return {
            ...poll,
            votes: newVotes,
            totalVotes: poll.totalVotes + 1,
          }
        }
        return poll
      }),
    )

    // Save to localStorage
    localStorage.setItem("userVotes", JSON.stringify(userVotes))

    addToast("Your vote has been submitted successfully!", "success")
  }

  const calculatePercentage = (votes: number, total: number) => {
    return Math.round((votes / total) * 100)
  }

  const filteredPolls = activeCategory ? polls.filter((poll) => poll.category === activeCategory) : polls

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Community Voting</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Participate in polls about local issues and see what your neighbors think.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <Button
          variant={activeCategory === null ? "default" : "outline"}
          className="rounded-full"
          onClick={() => setActiveCategory(null)}
        >
          All Polls
        </Button>
        <Button
          variant={activeCategory === "Infrastructure" ? "default" : "outline"}
          className="rounded-full"
          onClick={() => setActiveCategory("Infrastructure")}
        >
          Infrastructure
        </Button>
        <Button
          variant={activeCategory === "Public Spaces" ? "default" : "outline"}
          className="rounded-full"
          onClick={() => setActiveCategory("Public Spaces")}
        >
          Public Spaces
        </Button>
        <Button
          variant={activeCategory === "Commerce" ? "default" : "outline"}
          className="rounded-full"
          onClick={() => setActiveCategory("Commerce")}
        >
          Commerce
        </Button>
        <Button
          variant={activeCategory === "Education" ? "default" : "outline"}
          className="rounded-full"
          onClick={() => setActiveCategory("Education")}
        >
          Education
        </Button>
      </div>

      <div className="space-y-6">
        {filteredPolls.map((poll) => (
          <Card key={poll.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{poll.title}</CardTitle>
                  <CardDescription>
                    Category: {poll.category} • Ends: {new Date(poll.endDate).toLocaleDateString("en-IN")}
                  </CardDescription>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                  {poll.totalVotes} votes
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{poll.description}</p>
              <div className="space-y-3">
                {poll.options.map((option, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {userVotes[poll.id] === index ? (
                          <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                        ) : (
                          <div
                            className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600 cursor-pointer"
                            onClick={() => handleVote(poll.id, index)}
                          ></div>
                        )}
                        <span>{option}</span>
                      </div>
                      <span className="text-sm font-medium">
                        {calculatePercentage(poll.votes[index], poll.totalVotes)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${calculatePercentage(poll.votes[index], poll.totalVotes)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button variant="outline">Share</Button>
              <Button onClick={() => submitVote(poll.id)}>Submit Vote</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  )
}
