"use client";
// Marks this as a Client Component in Next.js
// Needed because we use hooks like useState and browser events

import { useState } from "react";
import { FaUser, FaStar } from "react-icons/fa";

export default function CreatePostInput() {
  // -------------------------------
  // STATE 1: Controls whether form is expanded
  // -------------------------------
  // Initially false → user only sees small textarea
  // When user clicks it → becomes true and full form appears
  const [expanded, setExpanded] = useState(false);

  // -------------------------------
  // STATE 2: Holds all form data
  // -------------------------------
  // Using ONE object keeps form data organized
  // Easier to send to backend later
  const [form, setForm] = useState({
    restaurant: "",
    rating: 0,
    visitDate: "",
    reviewText: "",
  });

  // -------------------------------
  // GENERIC INPUT HANDLER
  // -------------------------------
  // Updates one field in the form object
  // Example:
  // handleChange("restaurant", "Chipotle")
  // → updates only restaurant field
  const handleChange = (key: string, value: string | number) => {
    setForm((prev) => ({
      ...prev, // keep existing values
      [key]: value, // overwrite only the changed field
    }));
  };

  // -------------------------------
  // POST HANDLER (placeholder)
  // -------------------------------
  // For now it just logs data
  // Later you'll send this to your API
  const handlePost = () => {
    // Print form to console so you can see what gets submitted
    console.log(form);

    // Collapse form after posting
    setExpanded(false);

    // Reset form fields
    setForm({
      restaurant: "",
      rating: 0,
      visitDate: "",
      reviewText: "",
    });
  };

  // -------------------------------
  // COMPONENT UI
  // -------------------------------
  return (
    <div className="bg-white p-4 rounded-xl border">
      <div className="flex gap-3">
        {/* User icon placeholder */}
        <FaUser size={40} />

        {/* Main form container */}
        <div className="flex-1 flex flex-col gap-3">
          {/* Restaurant input (only when expanded) */}
          {expanded && (
            <input
              placeholder="Restaurant"
              value={form.restaurant}
              onChange={(e) => handleChange("restaurant", e.target.value)}
              className="bg-gray-200 p-2 rounded"
            />
          )}

          {/* Star rating (only when expanded) */}
          {expanded && (
            <div className="flex gap-1">
              {/* Create 5 stars */}
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  // Clicking a star sets rating to that number
                  onClick={() => handleChange("rating", star)}
                  // If rating >= star, make it blue
                  // otherwise make it gray
                  className={`cursor-pointer text-xl ${
                    form.rating >= star ? "text-blue-primary" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          )}

          {/* ✅ Date visited input */}
          {expanded && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Date visited:</span>

              {/* Browser-native date picker */}
              <input
                type="date"
                value={form.visitDate}
                onChange={(e) => handleChange("visitDate", e.target.value)}
                className="bg-gray-200 px-2 py-1 rounded"
              />
            </div>
          )}

          {/* Review text area (always visible) */}
          <textarea
            placeholder="Write your review..."
            value={form.reviewText}
            onChange={(e) => handleChange("reviewText", e.target.value)}
            // Expands form when clicked
            onClick={() => setExpanded(true)}
            // Small when collapsed, bigger when expanded
            rows={expanded ? 4 : 1}
            className="bg-gray-300 p-2 rounded"
          />

          {/* Buttons (only when expanded) */}
          {expanded && (
            <div className="flex justify-end gap-2">
              {/* Cancel button just collapses form */}
              <button onClick={() => setExpanded(false)}>Cancel</button>

              {/* Post button */}
              <button
                onClick={handlePost}
                // Disable unless required fields filled
                disabled={!form.restaurant || !form.rating || !form.reviewText}
                className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50"
              >
                Post
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
