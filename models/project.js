const mongoose = require('../database/db')

const ProjectSchema = new mongoose.Schema(
  {
    name: {type: String, required: true, unique: true},
    title: {type: String, required: true},
    subTitle: String,
    imagesUrls: [String],
    videoUrl: String,
    usedTechs: [String],
    projectLink: String,
    repo:String,    
  },
  {timestamps: true}
);

module.exports = mongoose.model('project', ProjectSchema)