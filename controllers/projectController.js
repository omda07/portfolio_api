const Project = require("../models/portfolio_model");

const jwt = require("jsonwebtoken");
const { forEach } = require("lodash");

const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;

const portfolioCtr = {
  // * _________________________________GET FUNCTION_____________________________________________

  getAllProjects: async (req, res, next) => {
    let project;
    try {
      project = await Project.find()
        .sort({ createdAt: -1 })
        .select("-__v");
      if (!project) {
        return res
          .status(404)
          .json({ status: false, message: "Cannot find projects" });
      }

      return res
        .status(200)
        .json({ status: true, message: "Success", projects: project });
    } catch (err) {
      return res.status(500).json({ status: false, message: err.message });
    }
  },

  // getPeople: async (req, res, next) => {
  //   let people;
  //   try {
  //     people = await People.find().sort({ createdAt: -1 }).select("-__v");
  //     if (!people) {
  //       return res
  //         .status(404)
  //         .json({ status: false, message: "Cannot find people" });
  //     }

  //     return res
  //       .status(200)
  //       .json({ status: true, message: "Success", peoples: people });
  //   } catch (err) {
  //     return res.status(500).json({ status: false, message: err.message });
  //   }
  // },

  // * ______________________________________CREATE FUNCTION__________________________

  createProject: async (req, res, next) => {
    const {name,githubLink,previewLink,description} = req.body
   
    let newName;
    try {
      const imageUrls = req.files;
      if (!req.files && req.files.length <= 0) {
        return res.status(400).json({status: false, message: 'Please upload at least 1 image'});
      }
     let imagesList  = [];
     for(let i = 0; i < imageUrls.length; i++) {
      const url = req.protocol + "://" + req.get("host");
      const fileName = imageUrls[i].filename; // Accessing filename property of each file object
      console.log(fileName);
      let imagePaths = url + "/uploads/" + fileName;
      imagesList.push(imagePaths);
  }
  
      console.log(imagesList)
      const orders = new Project({
        name: name,
        description: description,
        githubLink:githubLink,
        previewLink:previewLink,
        imageUrls:imagesList
      });

    const  newName = await orders.save();

      
      return res
        .status(201)
        .json({ status: true, message: "Success", project: newName });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ status: false, message: err });
    }
  },

  // ? ______________________________________UPDATE FUNCTION_____________________________

  updateProject: async (req, res) => {
    const { id, name, assign } = req.body;
    try {
      const check = await Project.findById(ObjectId(id));

      if (check) {
        const result = await Project.updateOne(
          {
            _id: req.body.id,
          },
          {
            $set: {
              approved: !(check.approved),
            },
          }
        );
        console.log(result);
        return res.json({ status: true, message: "Accepted" });
      } else {
        return res.status(404).json({ status: false, message: "not found" });
      }
    } catch (error) {
      return res.status(400).json({ status: false, message: error.message });
    }
  },

  // ! __________________________________________DELETE FINCTION____________________________

  deleteProject: async (req, res) => {
    const { id } = req.body;
    try {
      const check = await Project.findById(ObjectId(id));
      if (check) {
        const result = await Project.deleteOne({
          _id: req.body.id,
        });
        console.log(result);
        return res.json({ status: true, message: "Deleted" });
      } else {
        return res.status(404).json({ status: false, message: "Not found" });
      }
    } catch (error) {
      return res.status(400).json({ status: false, message: error.message });
    }
  },
};
module.exports = portfolioCtr;
