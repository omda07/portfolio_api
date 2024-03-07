const { ObjectId } = require("mongoose");
const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require:true

    },
    githubLink: {
      type: String,
      require:true
    },

    previewLink: {
      type: String,
      require:true
    },
    
    description: {
      type: String,
      require:true
    },
    imageUrls:{
      type:Array,
      require:true
    }
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("Portfolio", portfolioSchema);
