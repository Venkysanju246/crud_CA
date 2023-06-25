const express = require("express")
const CompanyModel = require("../model/posts.model")
const auth = require("../middleware/auth.middleware")
const PostRoute = express.Router() 

PostRoute.post("/company",auth, async (req, res)=>{
  const payLoad = req.body 
  const newCompany = new CompanyModel(payLoad)
  await newCompany.save()
  res.status(201).send({
    msg:"Company added successfully"
  })

})

PostRoute.get("/companies",auth, async(req, res)=>{
    console.log("getall",req.body.userID)
    const data = await CompanyModel.find({userID:req.body.userID})
    res.status(200).send({
        msg:data
    })
})

PostRoute.get("/company/:id",auth, async(req, res)=>{
    const id = req.params.id
    console.log(id)
    const data = await CompanyModel.findOne({_id:id})
    res.status(200).send({
        msg:data
    })
})

PostRoute.put("/company/:id", auth, async (req, res) => {
    try {
      const id = req.params.id;
      const payLoad = req.body;
      const authenticatedUser = req.body.userID;
  
      const data = await CompanyModel.findOneAndUpdate(
        { userID: authenticatedUser, _id: id },
        payLoad,
        { new: true }
      );
  
      if (!data) {
        return res.status(404).send({
          msg: "Company not found or you are not authorized to update this company's details",
        });
      }
  
      res.status(201).send({
        msg: "Company details updated successfully",
        data: data,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        msg: "Internal server error",
      });
    }
  });
  

  PostRoute.delete("/company/:id", auth, async (req, res) => {
    try {
      const id = req.params.id;
      const authenticatedUser = req.body.userID;
  
      const data = await CompanyModel.findOneAndDelete(
        { userID: authenticatedUser, _id: id },
        { new: true }
      );
  
      if (!data) {
        return res.status(404).send({
          msg: "Company not found or you are not authorized to delete this company's details",
        });
      }
  
      res.status(201).send({
        msg: "Company deleted successfully",
        data: data,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        msg: "Internal server error",
      });
    }
  });
  

module.exports = PostRoute