import mongoose from "mongoose";
import priceSchema from "./price.model.js";

export const ServiceSchema = mongoose.Schema(
  {
    serviceName:{
      type: String,
      required: true,
    },
    category:{
      type: String,
      enum: ["Leakage", "Installation", "Blockage", "Maintenance", "Inspection"],
    },
    price:{
        type:priceSchema
    },
    visitCharge:{
       type: Number,
        default: 250
      },
      
    serviceImg:[
       {
            url: {
              type: String,
              required: true,
            },
          },
    ],
   
    EstimatedTimeMinutes: {
      type: Number,
      default: 60,
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true, optimisticConcurrency: true },
);
ServiceSchema.index(
  { category: 1 },
  { partialFilterExpression: { isActive: true } },
);

const ServiceModel=mongoose.model("service",ServiceSchema )
export default ServiceModel;
