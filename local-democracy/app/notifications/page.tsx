"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  // Sample notifications data with Indian context
  const notifications = [
    {
      id: 1,
      title: "Water Supply Interruption",
      description: "Scheduled maintenance will affect water supply in Lajpat Nagar on Tuesday from 10 AM to 2 PM.",
      date: "2023-05-15",
      area: "Lajpat Nagar, Delhi",
      priority: "high",
    },
    {
      id: 2,
      title: "New Traffic Regulations",
      description: "One-way traffic system to be implemented on MG Road starting next week to reduce congestion.",
      date: "2023-05-14",
      area: "MG Road, Bengaluru",
      priority: "medium",
    },
    {
      id: 3,
      title: "Property Tax Deadline Extended",
      description: "The deadline for property tax payment has been extended to June 30th for all Mumbai residents.",
      date: "2023-05-12",
      area: "Mumbai",
      priority: "medium",
    },
    {
      id: 4,
      title: "Public Park Renovation",
      description:
        "Nehru Park will be closed for renovation from June 1st to July 15th. Alternative parks are available at Lodhi Gardens.",
      date: "2023-05-10",
      area: "Chanakyapuri, Delhi",
      priority: "low",
    },
    {
      id: 5,
      title: "COVID-19 Vaccination Camp",
      description: "Free vaccination camp at Rajiv Gandhi Stadium this weekend. Bring Aadhar card for registration.",
      date: "2023-05-08",
      area: "Sector 15, Chandigarh",
      priority: "high",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100"
    }
  }

  const filteredNotifications = activeFilter
    ? notifications.filter((notification) => {
        if (activeFilter === "High Priority") return notification.priority === "high"
        return notification.area.includes(activeFilter)
      })
    : notifications

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Neighborhood Notifications</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Stay informed about issues affecting your neighborhood with real-time alerts.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <Button
          variant={activeFilter === null ? "default" : "outline"}
          className="rounded-full"
          onClick={() => setActiveFilter(null)}
        >
          All Notifications
        </Button>
        <Button
          variant={activeFilter === "Delhi" ? "default" : "outline"}
          className="rounded-full"
          onClick={() => setActiveFilter("Delhi")}
        >
          Delhi
        </Button>
        <Button
          variant={activeFilter === "Mumbai" ? "default" : "outline"}
          className="rounded-full"
          onClick={() => setActiveFilter("Mumbai")}
        >
          Mumbai
        </Button>
        <Button
          variant={activeFilter === "Bengaluru" ? "default" : "outline"}
          className="rounded-full"
          onClick={() => setActiveFilter("Bengaluru")}
        >
          Bengaluru
        </Button>
        <Button
          variant={activeFilter === "High Priority" ? "default" : "outline"}
          className="rounded-full"
          onClick={() => setActiveFilter("High Priority")}
        >
          High Priority
        </Button>
      </div>

      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-600 dark:text-slate-400">No notifications found for this filter.</p>
            <Button className="mt-4" onClick={() => setActiveFilter(null)}>
              View All Notifications
            </Button>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <Card key={notification.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{notification.title}</CardTitle>
                    <CardDescription>
                      {notification.area} • {new Date(notification.date).toLocaleDateString("en-IN")}
                    </CardDescription>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(notification.priority)}`}
                  >
                    {notification.priority.charAt(0).toUpperCase() + notification.priority.slice(1)}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p>{notification.description}</p>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    Share
                  </Button>
                  <Button size="sm">More Details</Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
