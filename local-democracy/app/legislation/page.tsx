"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function LegislationPage() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  // Sample legislation data with Indian context
  const legislations = [
    {
      id: 1,
      title: "Street Vendor Regulation Bill",
      summary:
        "This bill aims to regulate street vending in urban areas by designating specific zones and providing licenses to vendors.",
      plainLanguage:
        "This bill will create designated areas where street vendors can legally operate. Vendors will need to get a license from the municipal corporation. This will help organize street vending and reduce congestion on footpaths.",
      proposedBy: "Municipal Corporation of Delhi",
      date: "2023-05-10",
      status: "Under Review",
    },
    {
      id: 2,
      title: "Plastic Waste Management Amendment",
      summary:
        "Amendment to strengthen the existing plastic waste management rules by imposing stricter penalties on single-use plastic violations.",
      plainLanguage:
        "This amendment will increase fines for businesses that use banned single-use plastics. First-time offenders will pay ₹10,000 instead of the current ₹5,000. Repeat offenders may face temporary closure of their establishment.",
      proposedBy: "Pune Municipal Corporation",
      date: "2023-04-25",
      status: "Passed",
    },
    {
      id: 3,
      title: "Public Transport Fare Revision",
      summary:
        "Proposal to revise bus and metro fares in Chennai to account for increased operational costs and fuel prices.",
      plainLanguage:
        "This proposal will increase Chennai bus fares by 15% and metro fares by 10%. The minimum bus fare will go from ₹5 to ₹6, and the minimum metro fare from ₹10 to ₹11. This is to cover rising fuel costs and driver salaries.",
      proposedBy: "Chennai Metropolitan Transport Corporation",
      date: "2023-05-05",
      status: "Pending Vote",
    },
    {
      id: 4,
      title: "Urban Green Space Preservation Act",
      summary:
        "Act to preserve and increase green spaces in urban areas by mandating minimum green cover in new developments.",
      plainLanguage:
        "This act requires all new building projects to include at least 15% green space. Existing parks cannot be converted for other uses. The city will also plant 10,000 new trees annually in public spaces.",
      proposedBy: "Jaipur Development Authority",
      date: "2023-03-15",
      status: "Implemented",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Passed":
      case "Implemented":
        return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
      case "Under Review":
      case "Pending Vote":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
      case "Rejected":
        return "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100"
    }
  }

  const filteredLegislations = activeFilter
    ? legislations.filter((legislation) => legislation.status === activeFilter)
    : legislations

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Legislation Summaries</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Plain language summaries of proposed local legislation that affects your community.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <Button
          variant={activeFilter === null ? "default" : "outline"}
          className="rounded-full"
          onClick={() => setActiveFilter(null)}
        >
          All Legislation
        </Button>
        <Button
          variant={activeFilter === "Under Review" ? "default" : "outline"}
          className="rounded-full"
          onClick={() => setActiveFilter("Under Review")}
        >
          Under Review
        </Button>
        <Button
          variant={activeFilter === "Passed" ? "default" : "outline"}
          className="rounded-full"
          onClick={() => setActiveFilter("Passed")}
        >
          Passed
        </Button>
        <Button
          variant={activeFilter === "Implemented" ? "default" : "outline"}
          className="rounded-full"
          onClick={() => setActiveFilter("Implemented")}
        >
          Implemented
        </Button>
      </div>

      <div className="space-y-6">
        {filteredLegislations.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-600 dark:text-slate-400">No legislation found for this filter.</p>
            <Button className="mt-4" onClick={() => setActiveFilter(null)}>
              View All Legislation
            </Button>
          </div>
        ) : (
          filteredLegislations.map((legislation) => (
            <Card key={legislation.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{legislation.title}</CardTitle>
                    <CardDescription>
                      {legislation.proposedBy} • {new Date(legislation.date).toLocaleDateString("en-IN")}
                    </CardDescription>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(legislation.status)}`}>
                    {legislation.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-1">Official Summary:</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{legislation.summary}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">In Plain Language:</h4>
                  <p>{legislation.plainLanguage}</p>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline">Share</Button>
                <Button>Read Full Document</Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
