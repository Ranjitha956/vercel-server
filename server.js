const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Employee = require('./model/Employee'); // ✅ Ensure this path and file exists

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Handles JSON form data
app.use(express.urlencoded({ extended: true })); // Handles form-urlencoded data (optional if using JSON)

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/employee_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// POST: Add a new employee
app.post('/employees', async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json({ message: 'Employee registered successfully' });
  } catch (err) {
    console.error('❌ Error saving employee:', err);
    res.status(500).json({ error: 'Error saving employee' });
  }
});

// GET: Fetch all employees
app.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    console.error('❌ Error fetching employees:', err);
    res.status(500).json({ error: 'Error fetching employees' });
  }
});

// Start server
app.listen(5000, () => {
  console.log('🚀 Server running at http://localhost:5000');
});
