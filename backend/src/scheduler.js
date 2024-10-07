//src/scheduler.js
const cron = require("node-cron");
const Appointment = require("./models/Appointment");
const sendEmail = require("./utils/sendEmail"); 
// Schedule a cron job to run every day at 9 AM
cron.schedule("0 9 * * *", async () => {
  try {
    // Get tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Find appointments scheduled for tomorrow
    const appointments = await Appointment.find({
      date: tomorrow.toISOString().split("T")[0], // Only the date part
    });

    // Send reminder emails for each appointment
    appointments.forEach((appointment) => {
      sendEmail(
        appointment.email,
        "Appointment Reminder",
        `Dear ${appointment.name}, this is a reminder for your appointment on ${appointment.date} at ${appointment.time}.`
      );
    });

    console.log("Reminders sent for upcoming appointments");
  } catch (error) {
    console.error("Error sending reminders:", error);
  }
});
