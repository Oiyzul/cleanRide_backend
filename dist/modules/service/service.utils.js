"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeToMinutes = timeToMinutes;
exports.minutesToTime = minutesToTime;
exports.generateSlots = generateSlots;
// Helper function to convert time string to minutes
function timeToMinutes(timeString) {
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * 60 + minutes;
}
// Helper function to convert minutes back to time string
function minutesToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const minutesPart = minutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutesPart).padStart(2, "0")}`;
}
function generateSlots(startTime, endTime, serviceDuration) {
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
