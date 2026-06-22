const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

// ==========================
// REGISTER USER
// ==========================
exports.register = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      role,
      walletAddress,
    } = req.body;

    // CHECK EXISTING USER
    const existingUser =
      await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({

        message:
          "User already exists",
      });
    }

    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    // CREATE USER
    const user =
      await User.create({

        name,
        email,

        password:
          hashedPassword,

        role,

        walletAddress,
      });

    res.status(201).json({

      success: true,

      message:
        "User registered successfully",

      user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Server Error",
    });
  }
};

// ==========================
// LOGIN USER
// ==========================
exports.login = async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;

    // FIND USER
    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(400).json({

        message:
          "Invalid Credentials",
      });
    }

    // COMPARE PASSWORD
    const isMatch =
      await bcrypt.compare(

        password,

        user.password
      );

    if (!isMatch) {

      return res.status(400).json({

        message:
          "Invalid Credentials",
      });
    }

    // GENERATE TOKEN
    const token = jwt.sign(

      {
        id: user._id,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({

      success: true,

      token,

      user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Server Error",
    });
  }
};