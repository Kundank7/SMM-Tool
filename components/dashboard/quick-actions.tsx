import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, LifeBuoy, Code, Plus } from "lucide-react"

export function QuickActions() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common actions to get you started</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <Button className="h-20 flex-col" variant="outline">
            <ShoppingCart className="mb-2 h-5 w-5" />
            New Order
          </Button>
          <Button className="h-20 flex-col" variant="outline">
            <LifeBuoy className="mb-2 h-5 w-5" />
            Support Ticket
          </Button>
          <Button className="h-20 flex-col" variant="outline">
            <Code className="mb-2 h-5 w-5" />
            API Docs
          </Button>
          <Button className="h-20 flex-col" variant="outline">
            <Plus className="mb-2 h-5 w-5" />
            More
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
