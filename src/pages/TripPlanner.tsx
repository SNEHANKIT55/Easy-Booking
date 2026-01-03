import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, MapPin, Calendar, Trash2, Save, Route } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import DatePicker from "@/components/search/DatePicker";

interface TripStop {
  id: string;
  destination: string;
  date: Date | undefined;
  notes: string;
}

interface Trip {
  id: string;
  name: string;
  source: string;
  stops: TripStop[];
  budget: number;
  createdAt: Date;
}

const TripPlanner = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [currentTrip, setCurrentTrip] = useState<Trip>({
    id: "",
    name: "",
    source: "",
    stops: [{ id: "1", destination: "", date: undefined, notes: "" }],
    budget: 0,
    createdAt: new Date(),
  });
  const [isCreating, setIsCreating] = useState(false);

  const addStop = () => {
    setCurrentTrip((prev) => ({
      ...prev,
      stops: [
        ...prev.stops,
        { id: Date.now().toString(), destination: "", date: undefined, notes: "" },
      ],
    }));
  };

  const removeStop = (stopId: string) => {
    if (currentTrip.stops.length <= 1) return;
    setCurrentTrip((prev) => ({
      ...prev,
      stops: prev.stops.filter((s) => s.id !== stopId),
    }));
  };

  const updateStop = (stopId: string, field: keyof TripStop, value: string | Date | undefined) => {
    setCurrentTrip((prev) => ({
      ...prev,
      stops: prev.stops.map((s) =>
        s.id === stopId ? { ...s, [field]: value } : s
      ),
    }));
  };

  const saveTrip = () => {
    if (!currentTrip.name || !currentTrip.source) {
      toast({
        title: "Missing information",
        description: "Please provide a trip name and starting point",
        variant: "destructive",
      });
      return;
    }

    const hasValidStop = currentTrip.stops.some((s) => s.destination);
    if (!hasValidStop) {
      toast({
        title: "Add at least one destination",
        description: "Your trip needs at least one destination",
        variant: "destructive",
      });
      return;
    }

    const newTrip = {
      ...currentTrip,
      id: Date.now().toString(),
      createdAt: new Date(),
    };

    setTrips((prev) => [...prev, newTrip]);
    setCurrentTrip({
      id: "",
      name: "",
      source: "",
      stops: [{ id: "1", destination: "", date: undefined, notes: "" }],
      budget: 0,
      createdAt: new Date(),
    });
    setIsCreating(false);

    toast({
      title: "Trip saved!",
      description: "Your trip has been saved successfully",
    });
  };

  const deleteTrip = (tripId: string) => {
    setTrips((prev) => prev.filter((t) => t.id !== tripId));
    toast({
      title: "Trip deleted",
      description: "Your trip has been removed",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Personal <span className="text-primary">Trip Planner</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Plan your custom trips with multiple destinations, set budgets, and keep all your travel plans organized
            </p>
          </motion.div>

          {/* Create New Trip Button */}
          {!isCreating && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-8"
            >
              <Button variant="travel" size="lg" onClick={() => setIsCreating(true)}>
                <Plus className="h-5 w-5 mr-2" />
                Create New Trip
              </Button>
            </motion.div>
          )}

          {/* Trip Creation Form */}
          {isCreating && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-8"
            >
              <h2 className="text-2xl font-semibold text-foreground mb-6">Create Your Trip</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <Label htmlFor="tripName">Trip Name</Label>
                  <Input
                    id="tripName"
                    placeholder="e.g., Weekend Getaway to Goa"
                    value={currentTrip.name}
                    onChange={(e) =>
                      setCurrentTrip((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="source">Starting Point</Label>
                  <Input
                    id="source"
                    placeholder="e.g., Bangalore"
                    value={currentTrip.source}
                    onChange={(e) =>
                      setCurrentTrip((prev) => ({ ...prev, source: e.target.value }))
                    }
                    className="mt-1.5"
                  />
                </div>
              </div>

              {/* Stops */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-foreground">Destinations</h3>
                  <Button variant="outline" size="sm" onClick={addStop}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Stop
                  </Button>
                </div>

                <div className="space-y-4">
                  {currentTrip.stops.map((stop, index) => (
                    <motion.div
                      key={stop.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-muted/30 rounded-xl p-4 border border-border"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-bold text-primary">{index + 1}</span>
                        </div>
                        <h4 className="font-medium text-foreground">Stop {index + 1}</h4>
                        {currentTrip.stops.length > 1 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeStop(stop.id)}
                            className="ml-auto text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label>Destination</Label>
                          <div className="relative mt-1.5">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Enter destination"
                              value={stop.destination}
                              onChange={(e) =>
                                updateStop(stop.id, "destination", e.target.value)
                              }
                              className="pl-9"
                            />
                          </div>
                        </div>
                        <DatePicker
                          label="Travel Date"
                          date={stop.date}
                          onDateChange={(date) => updateStop(stop.id, "date", date)}
                        />
                        <div>
                          <Label>Notes</Label>
                          <Input
                            placeholder="Any notes..."
                            value={stop.notes}
                            onChange={(e) => updateStop(stop.id, "notes", e.target.value)}
                            className="mt-1.5"
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div className="mb-8">
                <Label htmlFor="budget">Estimated Budget (₹)</Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="e.g., 15000"
                  value={currentTrip.budget || ""}
                  onChange={(e) =>
                    setCurrentTrip((prev) => ({
                      ...prev,
                      budget: parseInt(e.target.value) || 0,
                    }))
                  }
                  className="mt-1.5 max-w-xs"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <Button variant="travel" onClick={saveTrip}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Trip
                </Button>
                <Button variant="outline" onClick={() => setIsCreating(false)}>
                  Cancel
                </Button>
              </div>
            </motion.div>
          )}

          {/* Saved Trips */}
          {trips.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold text-foreground mb-6">Your Trips</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trips.map((trip) => (
                  <motion.div
                    key={trip.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="h-24 bg-gradient-to-r from-primary/80 to-accent/80 p-4 flex items-end">
                      <h3 className="text-xl font-bold text-primary-foreground">{trip.name}</h3>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Route className="h-4 w-4" />
                        {trip.source} → {trip.stops.map((s) => s.destination).join(" → ")}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Calendar className="h-4 w-4" />
                        {trip.stops.filter((s) => s.date).length} planned dates
                      </div>
                      {trip.budget > 0 && (
                        <p className="text-lg font-bold text-primary">
                          Budget: ₹{trip.budget.toLocaleString()}
                        </p>
                      )}
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" className="flex-1">
                          View Details
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteTrip(trip.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Empty State */}
          {!isCreating && trips.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Route className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No trips yet</h3>
              <p className="text-muted-foreground">
                Create your first trip to start planning your adventures!
              </p>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TripPlanner;
