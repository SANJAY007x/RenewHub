const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

// REGISTER
const registerUser = async (req, res) => {
  try {
    const {
      fullName,
      email,
      mobile,
      country,
      dateOfBirth,
      gender,
      password
    } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "Full name, email and password are required"
      });
    }

    const [existingUsers] = await pool.execute(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        message: "An account with this email already exists"
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [result] = await pool.execute(
      `INSERT INTO users
      (full_name, email, mobile, password_hash, country, date_of_birth, gender)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        fullName,
        email,
        mobile || null,
        passwordHash,
        country || "India",
        dateOfBirth || null,
        gender || null
      ]
    );

    res.status(201).json({
      message: "Account created successfully",
      userId: result.insertId
    });

  } catch (error) {
    console.error("Register Error:", error);

    res.status(500).json({
      message: "Server error while creating account"
    });
  }
};


// LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check required fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    // 2. Find user by email
    const [users] = await pool.execute(
      `SELECT
        id,
        full_name,
        email,
        mobile,
        country,
        gender,
        password_hash,
        role
       FROM users
       WHERE email = ?`,
      [email]
    );

    // 3. User not found
    if (users.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const user = users[0];

    // 4. Compare entered password with bcrypt hash
    const passwordMatch = await bcrypt.compare(
      password,
      user.password_hash
    );

    // 5. Wrong password
    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // 6. Create JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    // 7. Send response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        mobile: user.mobile,
        country: user.country,
        gender: user.gender,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Login Error:", error);

    res.status(500).json({
      message: "Server error while logging in"
    });
  }
};


module.exports = {
  registerUser,
  loginUser
};