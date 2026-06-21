import React, { useState, useEffect } from 'react';
import apiClient from './apiClient.js';

export default function StudentDashboard() {
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({ fullname: '', email: '', course: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ==============================================================================
    // WEEK 6 - FIG 4: Dynamic UI Data Grid Displaying Existing Records
    // ==============================================================================
    const fetchStudents = async () => {
        try {
            const response = await apiClient.get('/students');
            setStudents(response.data);
        } catch (err) {
            console.error("Error fetching data grid rows:", err);
        }
    };

    // ==============================================================================
    // WEEK 6 - FIG 3: React Component State Handling & PUT Request Processing Log
    // ==============================================================================
    const handleUpdateRecord = async (id, updatedCourse) => {
        console.log(`[EXECUTION LOG] Initiating PUT request for Row ID: ${id}`);
        try {
            await apiClient.put(`/students/${id}`, { course: updatedCourse });
            console.log(`[EXECUTION LOG] PUT Request Status 200: Row ID ${id} modified`);
            fetchStudents(); 
        } catch (err) {
            console.error("PUT execution failed:", err);
        }
    };

    // ==============================================================================
    // WEEK 6 - FIG 5: Warning Interceptor with Secondary Delete Confirmation
    // ==============================================================================
    const handleDeleteRecord = async (id) => {
        const confirmClearance = window.confirm("⚠️ WARNING: Are you sure you want to permanently remove this student row entry?");
        if (confirmClearance) {
            await apiClient.delete(`/students/${id}`);
            fetchStudents();
        }
    };

    return (
        <div className="dashboard-container">
            <table>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id}>
                            <td>{student.fullname}</td>
                            <td><button onClick={() => handleDeleteRecord(student.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* ==============================================================================
                WEEK 6 - FIG 2: Interface Rendering Student Registration Modal Layout
            ============================================================================== */}
            {isModalOpen && (
                <div className="registration-modal">
                    <h3>Register New Student Portal Profile</h3>
                    <input type="text" placeholder="Enter Full Name" />
                    <button type="submit">Save Student Record</button>
                </div>
            )}
        </div>
    );
}
