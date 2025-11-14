import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Ship, 
  Fuel, 
  Calendar, 
  MapPin, 
  Lock, 
  FileCheck,
  Plus
} from "lucide-react";
import { AddRefuelingEvent } from "./AddRefuelingEvent";

export interface RefuelingEvent {
  id: string;
  shipName: string;
  supplier: string;
  fuelAmount: number;
  fuelType: string;
  date: string;
  location: string;
  encryptedReceipt: string;
  status: "verified" | "pending" | "disputed";
}

const mockEvents: RefuelingEvent[] = [
  {
    id: "1",
    shipName: "MV Atlantic Voyager",
    supplier: "Maritime Fuel Solutions",
    fuelAmount: 5000,
    fuelType: "VLSFO",
    date: "2024-01-15",
    location: "Singapore Port",
    encryptedReceipt: "0x7a9b...3c4d",
    status: "verified",
  },
  {
    id: "2",
    shipName: "SS Pacific Breeze",
    supplier: "Ocean Energy Corp",
    fuelAmount: 3500,
    fuelType: "MGO",
    date: "2024-01-10",
    location: "Rotterdam Port",
    encryptedReceipt: "0x2f8e...9a1b",
    status: "verified",
  },
  {
    id: "3",
    shipName: "MV Indian Ocean Star",
    supplier: "Global Marine Fuels",
    fuelAmount: 4200,
    fuelType: "VLSFO",
    date: "2024-01-05",
    location: "Dubai Port",
    encryptedReceipt: "0x5d6c...7e8f",
    status: "pending",
  },
];

export const RefuelingTimeline = () => {
  const [events, setEvents] = useState<RefuelingEvent[]>(mockEvents);
  const [showAddEvent, setShowAddEvent] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-secondary text-secondary-foreground";
      case "pending":
        return "bg-accent text-accent-foreground";
      case "disputed":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleAddEvent = (newEvent: Omit<RefuelingEvent, "id">) => {
    const event: RefuelingEvent = {
      ...newEvent,
      id: Date.now().toString(),
    };
    setEvents([event, ...events]);
    setShowAddEvent(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Refueling Timeline</h2>
          <p className="text-muted-foreground mt-1">
            Encrypted delivery records for dispute-free settlement
          </p>
        </div>
        <Button
          onClick={() => setShowAddEvent(true)}
          className="gap-2 bg-ocean-gradient hover:opacity-90 transition-opacity shadow-maritime"
        >
          <Plus className="h-4 w-4" />
          Add Event
        </Button>
      </div>

      {showAddEvent && (
        <AddRefuelingEvent
          onAdd={handleAddEvent}
          onCancel={() => setShowAddEvent(false)}
        />
      )}

      <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/50 before:via-secondary/50 before:to-transparent md:before:ml-8">
        {events.map((event, index) => (
          <div key={event.id} className="relative flex gap-4 md:gap-6">
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ocean-gradient shadow-glow">
              <Fuel className="h-5 w-5 text-primary-foreground" />
            </div>

            <Card className="flex-1 p-6 shadow-maritime hover:shadow-glow transition-shadow duration-300 animate-in fade-in slide-in-from-left" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Ship className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold text-foreground">
                      {event.shipName}
                    </h3>
                    <Badge className={getStatusColor(event.status)}>
                      {event.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Fuel className="h-4 w-4" />
                      <span>
                        {event.fuelAmount.toLocaleString()} MT {event.fuelType}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <FileCheck className="h-4 w-4" />
                      <span>{event.supplier}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                    <Lock className="h-4 w-4 text-accent" />
                    <span className="text-xs font-mono text-muted-foreground">
                      Encrypted Receipt: {event.encryptedReceipt}
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="shrink-0"
                >
                  View Details
                </Button>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
