"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { ToastContainer } from "@/components/ui/toast"

export default function FeedbackPage() {
  const [activeTab, setActiveTab] = useState("representatives")
  const { toasts, addToast, removeToast } = useToast()

  // Form state
  const [formData, setFormData] = useState({
    representative: "",
    subject: "",
    message: "",
    category: "infrastructure",
    attachment: null as File | null,
  })

  // Sample representatives data with Indian context
  const representatives = [
    {
      id: 1,
      name: "Rajesh Kumar",
      position: "Ward Councilor",
      area: "Ward 15, Karol Bagh",
      party: "BJP",
      image: "/placeholder.svg?height=100&width=100",
      responseRate: "85%",
      contact: {
        email: "rajesh.kumar@mcd.gov.in",
        phone: "+91 98765 43210",
        office: "MCD Office, Karol Bagh, Delhi",
      },
    },
    {
      id: 2,
      name: "Priya Sharma",
      position: "MLA",
      area: "Malviya Nagar",
      party: "AAP",
      image: "/placeholder.svg?height=100&width=100",
      responseRate: "92%",
      contact: {
        email: "priya.sharma@delhi.gov.in",
        phone: "+91 98765 12345",
        office: "MLA Office, Malviya Nagar, Delhi",
      },
    },
    {
      id: 3,
      name: "Amit Patel",
      position: "Municipal Commissioner",
      area: "South Delhi",
      party: "IAS Officer",
      image: "/placeholder.svg?height=100&width=100",
      responseRate: "78%",
      contact: {
        email: "commissioner.south@mcd.gov.in",
        phone: "+91 98765 67890",
        office: "South Delhi Municipal Office, Saket",
      },
    },
  ]

  // Sample feedback data
  const [feedbackHistory, setFeedbackHistory] = useState([
    {
      id: 1,
      subject: "Poor Road Conditions in Lajpat Nagar",
      message:
        "The roads in Lajpat Nagar Block C are in terrible condition with multiple potholes causing accidents. Please repair them urgently.",
      sentTo: "Rajesh Kumar",
      date: "2023-04-15",
      status: "Responded",
      response:
        "Thank you for bringing this to my attention. I have directed the PWD to inspect and repair the roads within 2 weeks. A budget of ₹15 lakhs has been allocated for this work.",
    },
    {
      id: 2,
      subject: "Request for Additional Street Lights",
      message:
        "The park area near Malviya Nagar metro station is very dark at night and unsafe for residents. We need at least 5 additional street lights in this area.",
      sentTo: "Priya Sharma",
      date: "2023-05-01",
      status: "Pending",
      response: null,
    },
    {
      id: 3,
      subject: "Irregular Water Supply in Saket",
      message:
        "Our colony in Saket has been facing irregular water supply for the past month. Sometimes we don't get water for 2 days straight.",
      sentTo: "Amit Patel",
      date: "2023-05-10",
      status: "Responded",
      response:
        "We are aware of the issue and it's due to maintenance work at the main water treatment plant. Normal supply should resume by May 20th. Meanwhile, water tankers will be provided on request.",
    },
  ])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, attachment: e.target.files![0] }))
    }
  }

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.representative || !formData.subject || !formData.message) {
      addToast("Please fill in all required fields", "error")
      return
    }

    // Get representative name
    const rep = representatives.find((r) => r.id.toString() === formData.representative)
    if (!rep) {
      addToast("Please select a valid representative", "error")
      return
    }

    // Create new feedback
    const newFeedback = {
      id: Date.now(),
      subject: formData.subject,
      message: formData.message,
      sentTo: rep.name,
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
      response: null,
    }

    // Add to history
    setFeedbackHistory((prev) => [newFeedback, ...prev])

    // Reset form
    setFormData({
      representative: "",
      subject: "",
      message: "",
      category: "infrastructure",
      attachment: null,
    })

    // Show success message
    addToast("Your feedback has been submitted successfully!", "success")

    // Switch to feedback history tab
    setActiveTab("feedback")
  }

  const markAsResolved = (id: number) => {
    setFeedbackHistory((prev) =>
      prev.map((feedback) => (feedback.id === id ? { ...feedback, status: "Resolved" } : feedback)),
    )
    addToast("Feedback marked as resolved", "success")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Representative Feedback</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Directly communicate with your local representatives and track their responses.
        </p>
      </div>

      <div className="flex border-b">
        <button
          className={`px-4 py-2 font-medium ${activeTab === "representatives" ? "border-b-2 border-slate-900 dark:border-slate-100" : "text-slate-600 dark:text-slate-400"}`}
          onClick={() => setActiveTab("representatives")}
        >
          Your Representatives
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === "feedback" ? "border-b-2 border-slate-900 dark:border-slate-100" : "text-slate-600 dark:text-slate-400"}`}
          onClick={() => setActiveTab("feedback")}
        >
          Feedback History
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === "new" ? "border-b-2 border-slate-900 dark:border-slate-100" : "text-slate-600 dark:text-slate-400"}`}
          onClick={() => setActiveTab("new")}
        >
          New Feedback
        </button>
      </div>

      {activeTab === "representatives" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {representatives.map((rep) => (
            <Card key={rep.id}>
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={rep.image || "/placeholder.svg"} alt={rep.name} />
                  <AvatarFallback>
                    {rep.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{rep.name}</CardTitle>
                  <CardDescription>
                    {rep.position}, {rep.area}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Party:</span> {rep.party}
                  </p>
                  <p>
                    <span className="font-medium">Response Rate:</span> {rep.responseRate}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span> {rep.contact.email}
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span> {rep.contact.phone}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => {
                    setActiveTab("new")
                    setFormData((prev) => ({ ...prev, representative: rep.id.toString() }))
                  }}
                >
                  Send Feedback
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "feedback" && (
        <div className="space-y-6">
          {feedbackHistory.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-600 dark:text-slate-400">You haven't submitted any feedback yet.</p>
              <Button className="mt-4" onClick={() => setActiveTab("new")}>
                Submit Your First Feedback
              </Button>
            </div>
          ) : (
            feedbackHistory.map((feedback) => (
              <Card key={feedback.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{feedback.subject}</CardTitle>
                      <CardDescription>
                        Sent to: {feedback.sentTo} • {new Date(feedback.date).toLocaleDateString("en-IN")}
                      </CardDescription>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        feedback.status === "Responded"
                          ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                          : feedback.status === "Resolved"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                      }`}
                    >
                      {feedback.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-1">Your Message:</h4>
                    <p className="text-sm">{feedback.message}</p>
                  </div>
                  {feedback.response && (
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                      <h4 className="font-semibold mb-1">Response:</h4>
                      <p className="text-sm">{feedback.response}</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline">Follow Up</Button>
                  {feedback.status !== "Resolved" && (
                    <Button onClick={() => markAsResolved(feedback.id)}>Mark as Resolved</Button>
                  )}
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      )}

      {activeTab === "new" && (
        <Card>
          <CardHeader>
            <CardTitle>Send New Feedback</CardTitle>
            <CardDescription>Your message will be sent directly to your local representative</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmitFeedback}>
              <div>
                <label htmlFor="representative" className="block text-sm font-medium mb-1">
                  Select Representative
                </label>
                <select
                  id="representative"
                  name="representative"
                  value={formData.representative}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                >
                  <option value="">Select a representative</option>
                  {representatives.map((rep) => (
                    <option key={rep.id} value={rep.id}>
                      {rep.name} - {rep.position}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                  placeholder="Brief description of your issue"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full p-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                  placeholder="Describe your issue or feedback in detail"
                ></textarea>
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
                  <option value="infrastructure">Infrastructure</option>
                  <option value="sanitation">Sanitation</option>
                  <option value="water">Water Supply</option>
                  <option value="electricity">Electricity</option>
                  <option value="public_safety">Public Safety</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="attachment" className="block text-sm font-medium mb-1">
                  Attachment (Optional)
                </label>
                <input
                  type="file"
                  id="attachment"
                  onChange={handleFileChange}
                  className="w-full p-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Upload photos or documents related to your issue (max 5MB)
                </p>
              </div>
              <Button type="submit" className="w-full">
                Submit Feedback
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  )
}
