const mongoose = require("mongoose");

const { Schema } = mongoose;

const confessionDataSchema = new Schema({
	date: String,
	data: Array,
});

/*
    date: "20-05-2024"
    data: [
        {
            name: "mystich",
            userId: "192910291",
            absent: {
                type: "hadir"
                time: "23:00"
            }
        },
        {
            name: "veon",
            userId: "912939131",
            absent: {
                type: "berhalangan",
                time: "21:00"
                reason: "menjaga mommy tobrut."
            }
        }
    ]
*/

module.exports = mongoose.model("absentdata", confessionDataSchema);
