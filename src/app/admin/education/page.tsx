"use client";

import { useState } from "react";
import Image from "next/image";
import {
  useEducation,
  useEducationForm,
  Education,
} from "@/hooks/useEducation";
import Input from "@/components/ui/Input";
import ImageUpload from "@/components/ImageUpload";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import {
  PlusIcon,
  PencilIcon,
  EyeIcon,
  TrashIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Dialog from "@/components/ui/Dialog";
import Button from "@/components/ui/Button";

export default function EducationPage() {
  const { education, loading, createEducation, updateEducation, deleteEducation } =
    useEducation();
  const {
    formData,
    setFormData,
    errors,
    handleFieldChange,
    handleCoreCourseChange,
    addCoreCourse,
    removeCoreCourse,
    validateForm,
    resetForm,
  } = useEducationForm();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState<Education | null>(
    null
  );
  const [isEditing, setIsEditing] = useState(false);

  const handleCreateClick = () => {
    resetForm();
    setIsEditing(false);
    setIsFormOpen(true);
  };

  const handleEditClick = (education: Education) => {
    setFormData({
      institution: education.institution,
      degree: education.degree,
      period: education.period,
      cgpa: education.cgpa || '',
      logo: education.logo,
      link: education.link || '',
      coreCourses: education.coreCourses,
      isActive: education.isActive,
      displayOrder: education.displayOrder,
    });
    setSelectedEducation(education);
    setIsEditing(true);
    setIsFormOpen(true);
  };

  const handleViewClick = (education: Education) => {
    setSelectedEducation(education);
    setIsViewOpen(true);
  };

  const handleDeleteClick = (education: Education) => {
    setSelectedEducation(education);
    setIsDeleteOpen(true);
  };

  const handleFormSubmit = async () => {
    if (!validateForm()) return;

    const success =
      isEditing && selectedEducation
        ? await updateEducation(selectedEducation.id, formData)
        : await createEducation(formData);

    if (success) {
      setIsFormOpen(false);
      resetForm();
      setSelectedEducation(null);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedEducation) return;

    const success = await deleteEducation(selectedEducation.id);
    if (success) {
      setIsDeleteOpen(false);
      setSelectedEducation(null);
    }
  };

  const handleImageUpload = (url: string) => {
    handleFieldChange("logo", url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Education
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your education and academic background
          </p>
        </div>
        <Button
          onClick={handleCreateClick}
          className="flex items-center space-x-2"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add Education</span>
        </Button>
      </div>

      {/* Education List */}
      {education.length > 0 ? (
        <div className="space-y-4">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                    <Image
                      src={edu.logo}
                      alt={`${edu.institution} Logo`}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {edu.institution}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {edu.degree}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">
                      {edu.period}
                    </p>
                    {edu.cgpa && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        CGPA: {edu.cgpa}
                      </p>
                    )}
                    <div className="mt-2 flex items-center space-x-2">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          edu.isActive
                            ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                        }`}
                      >
                        {edu.isActive ? "Active" : "Inactive"}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Order: {edu.displayOrder}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleViewClick(edu)}
                    className="flex items-center space-x-1"
                  >
                    <EyeIcon className="w-4 h-4" />
                    <span>View</span>
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleEditClick(edu)}
                    className="flex items-center space-x-1"
                  >
                    <PencilIcon className="w-4 h-4" />
                    <span>Edit</span>
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleDeleteClick(edu)}
                    className="flex items-center space-x-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
                  >
                    <TrashIcon className="w-4 h-4" />
                    <span>Delete</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <AcademicCapIcon className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No education entries found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Add your first education entry to get started.
          </p>
          <Button onClick={handleCreateClick}>Add Education</Button>
        </div>
      )}

      {/* Form Dialog */}
      <Dialog
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={isEditing ? "Edit Education Entry" : "Add Education Entry"}
        size="lg"
      >
        <div className="space-y-6">
          {/* Institution */}
          <div>
            <Input
              label="Institution"
              value={formData.institution}
              onChange={(e) => handleFieldChange("institution", e.target.value)}
              error={errors.institution}
              placeholder="Enter institution name"
            />
          </div>

          {/* Degree */}
          <div>
            <Input
              label="Degree"
              value={formData.degree}
              onChange={(e) => handleFieldChange("degree", e.target.value)}
              error={errors.degree}
              placeholder="Enter degree name"
            />
          </div>

          {/* Period */}
          <div>
            <Input
              label="Period"
              value={formData.period}
              onChange={(e) => handleFieldChange("period", e.target.value)}
              error={errors.period}
              placeholder="e.g., 2020 - 2024"
            />
          </div>

          {/* CGPA */}
          <div>
            <Input
              label="CGPA/GPA (Optional)"
              value={formData.cgpa || ''}
              onChange={(e) => handleFieldChange("cgpa", e.target.value)}
              error={errors.cgpa}
              placeholder="e.g., 3.37"
            />
          </div>

          {/* Logo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Institution Logo
            </label>
            <ImageUpload
              image={formData.logo}
              onUpload={handleImageUpload}
              folder="education"
            />
            {errors.logo && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.logo}
              </p>
            )}
          </div>

          {/* Link */}
          <div>
            <Input
              label="Institution Website (Optional)"
              value={formData.link || ''}
              onChange={(e) => handleFieldChange("link", e.target.value)}
              error={errors.link}
              placeholder="https://example.com"
            />
          </div>

          {/* Core Courses */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Core Courses/Subjects
            </label>
            <div className="space-y-2">
              {formData.coreCourses.map((course, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={course}
                    onChange={(e) =>
                      handleCoreCourseChange(index, e.target.value)
                    }
                    placeholder={`Course ${index + 1}`}
                    className="flex-1"
                  />
                  {formData.coreCourses.length > 1 && (
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => removeCoreCourse(index)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={addCoreCourse}
                className="w-full"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                Add Course
              </Button>
            </div>
            {errors.coreCourses && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.coreCourses}
              </p>
            )}
          </div>

          {/* Display Order */}
          <div>
            <Input
              label="Display Order"
              type="number"
              value={formData.displayOrder}
              onChange={(e) => handleFieldChange("displayOrder", parseInt(e.target.value) || 0)}
              error={errors.displayOrder}
              placeholder="0"
            />
          </div>

          {/* Active Status */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => handleFieldChange("isActive", e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="isActive"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Set as active (visible on website)
            </label>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button variant="secondary" onClick={() => setIsFormOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleFormSubmit}>
              {isEditing ? "Update Education" : "Add Education"}
            </Button>
          </div>
        </div>
      </Dialog>

      {/* View Dialog */}
      <Dialog
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        title="View Education Entry"
        size="lg"
      >
        {selectedEducation && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                <Image
                  src={selectedEducation.logo}
                  alt={`${selectedEducation.institution} Logo`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {selectedEducation.institution}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedEducation.degree}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  {selectedEducation.period}
                </p>
                {selectedEducation.cgpa && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    CGPA: {selectedEducation.cgpa}
                  </p>
                )}
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                    selectedEducation.isActive
                      ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                  }`}
                >
                  {selectedEducation.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            {selectedEducation.link && (
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Website
                </h4>
                <a
                  href={selectedEducation.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {selectedEducation.link}
                </a>
              </div>
            )}

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                Core Courses/Subjects
              </h4>
              <div className="space-y-2">
                {selectedEducation.coreCourses.map((course, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {index + 1}.
                    </span>
                    <span className="ml-2 text-gray-900 dark:text-white">
                      {course}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>
                  Created:{" "}
                  {new Date(selectedEducation.createdAt).toLocaleDateString()}
                </p>
                <p>
                  Updated:{" "}
                  {new Date(selectedEducation.updatedAt).toLocaleDateString()}
                </p>
                <p>Display Order: {selectedEducation.displayOrder}</p>
              </div>
            </div>
          </div>
        )}
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Education Entry"
        message={`Are you sure you want to delete the education entry "${selectedEducation?.institution}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
}
