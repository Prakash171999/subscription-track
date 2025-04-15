import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      trim: true,
      minLength: [2, "Subscription name must be at least 2 characters long"],
      maxLength: [100, "Subscription name must be at most 100 characters long"],
    },
    price: {
      type: Number,
      required: [true, "Subscription price is required"],
      min: [0, "Subscription price must be at least 0"],
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "GBP"],
      default: "USD",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
      type: String,
      enum: [
        "sports",
        "entertainment",
        "health",
        "food",
        "travel",
        "other",
        "news",
        "politics",
      ],
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value <= Date.now();
        },
        message: "Start date must be in the past",
      },
    },
    renewalDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "Renewal date must be after start date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User model
      ref: "User", // Reference to the User model
      required: true,
      index: true, // Create an index on the user field for faster queries (optimization)
    },
  },
  { timestamps: true }
);

//This is a piece of code that runs automatically before saving a subscription to the database. (pre-save hook)
//Auto calculate the renewal date if not set
subscriptionSchema.pre("save", function (next) {
  if(!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    }

    this.renewalDate = new Date(this.startDate); // Set the renewal date to the start date
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]); // Add the appropriate number of days, weeks, months, or years
  }
  
  if (this.renewalDate < new Date()) {
    this.status = "expired"; // Set the status to "expired" if the renewal date is in the past
    next() // Move to the next middleware
  }
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;