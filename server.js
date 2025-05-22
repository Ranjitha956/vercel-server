const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Employee = require('./model/Employee'); // You can rename this model later if it's not for employees

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ MongoDB Atlas connection with new database name: student_feedback
mongoose.connect(
  'mongodb+srv://user1:ninja34r5r764@cluster0.0bthphz.mongodb.net/student_feedback?retryWrites=true&w=majority&appName=Cluster0',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(() => console.log('✅ MongoDB Atlas connected to student_feedback DB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Root route (optional, useful for checking deployment)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// POST route to save employee
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

// GET route to fetch all employees
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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
