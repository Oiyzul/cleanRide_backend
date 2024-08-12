// Helper function to convert time string to minutes
export function timeToMinutes(timeString: string) {
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * 60 + minutes;
  }
  
  // Helper function to convert minutes back to time string
  export function minutesToTime(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const minutesPart = minutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutesPart).padStart(
      2,
      "0"
    )}`;
  }
  
  export function generateSlots(
    startTime: string,
    endTime: string,
    serviceDuration: number
  ) {
    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);
    const totalDuration = endMinutes - startMinutes;
  
    const numberOfSlots = Math.floor(totalDuration / serviceDuration);
  
    const slots = [];
    for (let i = 0; i < numberOfSlots; i++) {
      const slotStartTime = startMinutes + i * serviceDuration;
      const slotEndTime = slotStartTime + serviceDuration;
      slots.push({
        startTime: minutesToTime(slotStartTime),
        endTime: minutesToTime(slotEndTime),
      });
    }
  
    return slots;
  }