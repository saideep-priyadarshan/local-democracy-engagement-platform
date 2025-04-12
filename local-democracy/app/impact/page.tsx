import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ImpactPage() {
  // Sample policy impact data with Indian context
  const policies = [
    {
      id: 1,
      title: "Odd-Even Vehicle Scheme",
      description: "Impact of the odd-even vehicle number policy on Delhi's air quality and traffic.",
      impacts: [
        { group: "Air Quality", impact: 65, description: "15% reduction in PM2.5 levels during implementation" },
        { group: "Traffic Congestion", impact: 70, description: "20% reduction in average commute time" },
        { group: "Public Transport Usage", impact: 80, description: "35% increase in metro ridership" },
        { group: "Small Businesses", impact: 40, description: "12% decrease in customer footfall for some markets" },
      ],
      implementation: "2023-01-15",
      area: "Delhi NCR",
    },
    {
      id: 2,
      title: "Plastic Ban in Municipal Markets",
      description: "Impact of single-use plastic ban in municipal markets of Mumbai.",
      impacts: [
        { group: "Waste Reduction", impact: 75, description: "30% reduction in plastic waste collection" },
        { group: "Vendor Compliance", impact: 60, description: "65% of vendors have switched to alternatives" },
        { group: "Consumer Behavior", impact: 55, description: "50% increase in customers bringing own bags" },
        { group: "Market Cleanliness", impact: 70, description: "Visible improvement in market cleanliness" },
      ],
      implementation: "2022-10-02",
      area: "Mumbai",
    },
    {
      id: 3,
      title: "Free Bus Travel for Women",
      description: "Impact of free bus travel scheme for women in Delhi public transport.",
      impacts: [
        { group: "Women Mobility", impact: 85, description: "40% increase in women using public transport" },
        { group: "Household Savings", impact: 75, description: "Average monthly savings of ₹1,000 per household" },
        { group: "Bus Occupancy", impact: 90, description: "30% increase in overall bus occupancy" },
        { group: "Revenue Impact", impact: 30, description: "20% decrease in direct ticket revenue" },
      ],
      implementation: "2022-08-15",
      area: "Delhi",
    },
  ]

  const getImpactColor = (impact: number) => {
    if (impact >= 75) return "bg-green-500"
    if (impact >= 50) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Impact Visualization</h1>
        <p className="text-slate-600 mb-6">
          See how policies affect different segments of your community with simple visualizations.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <Button variant="outline" className="rounded-full">
          All Policies
        </Button>
        <Button variant="outline" className="rounded-full">
          Delhi
        </Button>
        <Button variant="outline" className="rounded-full">
          Mumbai
        </Button>
        <Button variant="outline" className="rounded-full">
          Environment
        </Button>
        <Button variant="outline" className="rounded-full">
          Transportation
        </Button>
      </div>

      <div className="space-y-8">
        {policies.map((policy) => (
          <Card key={policy.id} className="overflow-hidden">
            <CardHeader>
              <CardTitle>{policy.title}</CardTitle>
              <CardDescription>
                {policy.area} • Implemented: {new Date(policy.implementation).toLocaleDateString("en-IN")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{policy.description}</p>

              <div className="space-y-4 mt-4">
                <h3 className="font-semibold">Impact by Community Segment:</h3>
                <div className="space-y-3">
                  {policy.impacts.map((impact, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="font-medium">{impact.group}</span>
                        <span>{impact.impact}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-4">
                        <div
                          className={`${getImpactColor(impact.impact)} h-4 rounded-full`}
                          style={{ width: `${impact.impact}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-slate-600">{impact.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="outline">View Full Report</Button>
                <Button>Share Insights</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
