import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RefuelingEvent } from "./RefuelingTimeline";
import { useToast } from "@/hooks/use-toast";

interface AddRefuelingEventProps {
  onAdd: (event: Omit<RefuelingEvent, "id">) => void;
  onCancel: () => void;
}

export const AddRefuelingEvent = ({ onAdd, onCancel }: AddRefuelingEventProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    shipName: "",
    supplier: "",
    fuelAmount: "",
    fuelType: "VLSFO",
    date: "",
    location: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.shipName || !formData.supplier || !formData.fuelAmount || !formData.date || !formData.location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Generate a mock encrypted receipt
    const encryptedReceipt = `0x${Math.random().toString(16).substring(2, 6)}...${Math.random().toString(16).substring(2, 6)}`;

    const newEvent: Omit<RefuelingEvent, "id"> = {
      shipName: formData.shipName,
      supplier: formData.supplier,
      fuelAmount: parseFloat(formData.fuelAmount),
      fuelType: formData.fuelType,
      date: formData.date,
      location: formData.location,
      encryptedReceipt,
      status: "pending",
    };

    onAdd(newEvent);
    
    toast({
      title: "Event Added",
      description: "Refueling event has been recorded on the blockchain.",
    });
  };

  return (
    <Card className="p-6 shadow-maritime animate-in fade-in slide-in-from-top">
      <h3 className="text-2xl font-bold text-foreground mb-6">Add New Refueling Event</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="shipName">Ship Name *</Label>
            <Input
              id="shipName"
              value={formData.shipName}
              onChange={(e) => setFormData({ ...formData, shipName: e.target.value })}
              placeholder="MV Atlantic Voyager"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="supplier">Supplier *</Label>
            <Input
              id="supplier"
              value={formData.supplier}
              onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
              placeholder="Maritime Fuel Solutions"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fuelAmount">Fuel Amount (MT) *</Label>
            <Input
              id="fuelAmount"
              type="number"
              value={formData.fuelAmount}
              onChange={(e) => setFormData({ ...formData, fuelAmount: e.target.value })}
              placeholder="5000"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fuelType">Fuel Type *</Label>
            <Select
              value={formData.fuelType}
              onValueChange={(value) => setFormData({ ...formData, fuelType: value })}
            >
              <SelectTrigger id="fuelType">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="VLSFO">VLSFO</SelectItem>
                <SelectItem value="MGO">MGO</SelectItem>
                <SelectItem value="LSFO">LSFO</SelectItem>
                <SelectItem value="HFO">HFO</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date *</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Singapore Port"
              required
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            className="flex-1 bg-ocean-gradient hover:opacity-90 transition-opacity shadow-maritime"
          >
            Add Event
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};
