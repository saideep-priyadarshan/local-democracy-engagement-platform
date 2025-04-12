"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { ToastContainer } from "@/components/ui/toast"

export default function InitiativesPage() {
  const [activeTab, setActiveTab] = useState("ongoing")
  const { toasts, addToast, removeToast } = useToast()

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    category: "",
    resources: "",
    image: null as File | null,
  })

  // Sample initiatives data with Indian context
  const [initiatives, setInitiatives] = useState({
    ongoing: [
      {
        id: 1,
        title: "Clean Yamuna Campaign",
        description: "Community initiative to clean up the Yamuna riverbank and raise awareness about river pollution.",
        organizer: "Delhi Environmental Society",
        location: "Yamuna Ghat, Delhi",
        date: "Every Sunday, 7 AM - 10 AM",
        participants: 78,
        image: "/placeholder.svg?height=200&width=400",
        joined: false,
      },
      {
        id: 2,
        title: "Teach for Slum Children",
        description: "Volunteer teaching program for underprivileged children in Dharavi slum area.",
        organizer: "Education For All NGO",
        location: "Community Center, Dharavi, Mumbai",
        date: "Weekdays, 4 PM - 6 PM",
        participants: 45,
        image: "/placeholder.svg?height=200&width=400",
        joined: false,
      },
      {
        id: 3,
        title: "Community Garden Project",
        description: "Converting vacant lot into a community garden with organic vegetables and medicinal plants.",
        organizer: "Green Bengaluru Initiative",
        location: "Jayanagar, Bengaluru",
        date: "Saturdays, 8 AM - 12 PM",
        participants: 32,
        image: "/placeholder.svg?height=200&width=400",
        joined: false,
      },
    ],
    upcoming: [
      {
        id: 4,
        title: "Rainwater Harvesting Workshop",
        description: "Learn how to implement rainwater harvesting in your home and community.",
        organizer: "Chennai Water Trust",
        location: "Public Library, T. Nagar, Chennai",
        date: "June 15, 2023, 10 AM - 1 PM",
        participants: 25,
        image: "/placeholder.svg?height=200&width=400",
        joined: false,
      },
      {
        id: 5,
        title: "Senior Citizens Health Camp",
        description: "Free health checkup camp for senior citizens with focus on diabetes and hypertension.",
        organizer: "Jaipur Medical Association",
        location: "Community Hall, Malviya Nagar, Jaipur",
        date: "June 20, 2023, 9 AM - 4 PM",
        participants: 12,
        image: "/placeholder.svg?height=200&width=400",
        joined: false,
      },
    ],
    completed: [
      {
        id: 6,
        title: "Tree Plantation Drive",
        description: "Successfully planted 500 native trees across various locations in Pune.",
        organizer: "Green Pune Movement",
        location: "Multiple locations, Pune",
        date: "Completed on May 5, 2023",
        participants: 120,
        image: "/placeholder.svg?height=200&width=400",
        joined: false,
      },
      {
        id: 7,
        title: "Waste Segregation Awareness",
        description: "Door-to-door campaign educating residents about proper waste segregation practices.",
        organizer: "Swachh Hyderabad",
        location: "Banjara Hills, Hyderabad",
        date: "Completed on April 22, 2023",
        participants: 65,
        image: "/placeholder.svg?height=200&width=400",
        joined: false,
      },
    ],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }))
    }
  }

  const handleCreateInitiative = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.description || !formData.location || !formData.date || !formData.category) {
      addToast("Please fill in all required fields", "error")
      return
    }

    // Create new initiative
    const newInitiative = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      organizer: "Your Organization", // In a real app, this would be the user's organization
      location: formData.location,
      date: formData.date,
      participants: 0,
      image: "/placeholder.svg?height=200&width=400", // In a real app, we would upload the image
      joined: false,
    }

    // Add to upcoming initiatives
    setInitiatives((prev) => ({
      ...prev,
      upcoming: [...prev.upcoming, newInitiative],
    }))

    // Reset form
    setFormData({
      title: "",
      description: "",
      location: "",
      date: "",
      category: "",
      resources: "",
      image: null,
    })

    // Show success message
    addToast("Your initiative has been created successfully!", "success")

    // Switch to upcoming tab
    setActiveTab("upcoming")
  }

  const joinInitiative = (tabName: keyof typeof initiatives, id: number) => {
    setInitiatives((prev) => ({
      ...prev,
      [tabName]: prev[tabName].map((initiative) =>
        initiative.id === id ? { ...initiative, joined: true, participants: initiative.participants + 1 } : initiative,
      ),
    }))
    addToast("You have successfully joined this initiative!", "success")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Neighborhood Initiatives</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Organize and join local initiatives to improve your community.
        </p>
      </div>

      <div className="flex border-b overflow-x-auto">
        <button
          className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === "ongoing" ? "border-b-2 border-slate-900 dark:border-slate-100" : "text-slate-600 dark:text-slate-400"}`}
          onClick={() => setActiveTab("ongoing")}
        >
          Ongoing Initiatives
        </button>
        <button
          className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === "upcoming" ? "border-b-2 border-slate-900 dark:border-slate-100" : "text-slate-600 dark:text-slate-400"}`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming Initiatives
        </button>
        <button
          className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === "completed" ? "border-b-2 border-slate-900 dark:border-slate-100" : "text-slate-600 dark:text-slate-400"}`}
          onClick={() => setActiveTab("completed")}
        >
          Completed Initiatives
        </button>
        <button
          className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === "create" ? "border-b-2 border-slate-900 dark:border-slate-100" : "text-slate-600 dark:text-slate-400"}`}
          onClick={() => setActiveTab("create")}
        >
          Create Initiative
        </button>
      </div>

      {activeTab !== "create" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {initiatives[activeTab as keyof typeof initiatives].length === 0 ? (
            <div className="col-span-full text-center py-8">
              <p className="text-slate-600 dark:text-slate-400">No initiatives found in this category.</p>
              <Button className="mt-4" onClick={() => setActiveTab("create")}>
                Create New Initiative
              </Button>
            </div>
          ) : (
            initiatives[activeTab as keyof typeof initiatives].map((initiative) => (
              <Card key={initiative.id} className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={initiative.image || "/placeholder.svg"}
                    alt={initiative.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{initiative.title}</CardTitle>
                  <CardDescription>
                    {initiative.organizer} • {initiative.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>{initiative.description}</p>
                  <p className="font-medium">{initiative.date}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex -space-x-2">
                      {[...Array(3)].map((_, i) => (
                        <Avatar key={i} className="border-2 border-white dark:border-slate-800">
                          <AvatarFallback>U{i + 1}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{initiative.participants} participants</p>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline">Share</Button>
                  {(activeTab === "ongoing" || activeTab === "upcoming") && (
                    <Button
                      onClick={() => joinInitiative(activeTab as keyof typeof initiatives, initiative.id)}
                      disabled={initiative.joined}
                    >
                      {initiative.joined ? "Joined" : "Join Initiative"}
                    </Button>
                  )}
                  {activeTab === "completed" && <Button>View Results</Button>}
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      )}

      {activeTab === "create" && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Initiative</CardTitle>
            <CardDescription>Organize a community initiative to improve your neighborhood</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleCreateInitiative}>
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                  Initiative Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                  placeholder="Give your initiative a clear, descriptive name"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                  placeholder="Describe the purpose and activities of your initiative"
                ></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                    placeholder="Where will this initiative take place?"
                  />
                </div>
                <div>
                  <label htmlFor="date" className="block text-sm font-medium mb-1">
                    Date & Time
                  </label>
                  <input
                    type="text"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                    placeholder="When will this initiative happen?"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-1">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                >
                  <option value="">Select a category</option>
                  <option value="environment">Environment</option>
                  <option value="education">Education</option>
                  <option value="health">Health & Wellness</option>
                  <option value="infrastructure">Infrastructure</option>
                  <option value="culture">Arts & Culture</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="resources" className="block text-sm font-medium mb-1">
                  Resources Needed
                </label>
                <textarea
                  id="resources"
                  name="resources"
                  value={formData.resources}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                  placeholder="List any resources, volunteers, or materials needed"
                ></textarea>
              </div>
              <div>
                <label htmlFor="image" className="block text-sm font-medium mb-1">
                  Cover Image
                </label>
                <input
                  type="file"
                  id="image"
                  onChange={handleFileChange}
                  className="w-full p-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                />
              </div>
              <Button type="submit" className="w-full">
                Create Initiative
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  )
}
