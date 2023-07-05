const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
});

AuthorSchema.virtual("name").get(function () {
  let fullName = "";
  if (this.first_name && this.family_name) {
    fullName = `${this.family_name}, ${this.first_name}`;
  }
  return fullName;
});

AuthorSchema.virtual("url").get(function () {
  return `/catalog/author/${this._id}`;
});

AuthorSchema.virtual("dob").get(function () {
  return this.date_of_birth
    ? "Born: " +
        DateTime.fromJSDate(this.date_of_birth).toLocaleString(
          DateTime.DATE_MED
        )
    : "N/A";
});

AuthorSchema.virtual("dob_yyyy_mm_dd").get(function () {
  return DateTime.fromJSDate(this.date_of_birth).toISODate();
});

module.exports = mongoose.model("Author", AuthorSchema);
