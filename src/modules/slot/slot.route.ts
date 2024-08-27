import { Router } from "express";
import { SlotControllers } from "./slot.controller";

const router = Router();

router.get(
  "/availability", SlotControllers.getAvailableSlots
);

router.patch(
  "/update-slot/:slotId", SlotControllers.updateSlot
);

export const SlotRoutes = router;
