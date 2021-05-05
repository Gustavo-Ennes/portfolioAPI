const mongoose = require('../../database/db');

const UserSchema = new mongoose.Schema({
    name:{
      type: String,
      require: true,
      unique: true
    },
    email:{
      type: String,
      required: true,
      unique: true
    },
    password:{
      type: String,
      required: true
    },
    isLogged: {
      type: Boolean,
      default: false
    },
    qtdVisits: {
      type: Number,
      default: 0
    },
    visitation: [
      {
        start: Date,
        end: Date
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", UserSchema);