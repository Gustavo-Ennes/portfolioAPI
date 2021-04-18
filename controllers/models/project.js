const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    name: {type: String, required: true, unique: true},
    title: {type: String, required: true},
    subTitle: String,
    imagesUrls: [String],
    videoUrl: String,
    usedTechs: [String],
    projectLink: String,
  },
  {timestamps: true}
);

module.exports = mongoose.model('project', ProjectSchema)