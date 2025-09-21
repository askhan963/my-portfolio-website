"use client";

import { useState } from "react";
import Image from "next/image";
import {
  useSkills,
  useSkillForm,
  Skill,
  REACT_ICONS,
  SKILL_CATEGORIES,
  PROFICIENCY_LEVELS,
} from "@/hooks/useSkills";
import Input from "@/components/ui/Input";
import ImageUpload from "@/components/ImageUpload";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import {
  PlusIcon,
  PencilIcon,
  EyeIcon,
  TrashIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Dialog from "@/components/ui/Dialog";
import Button from "@/components/ui/Button";

// Dynamic icon renderer
const renderIcon = (skill: Skill) => {
  if (skill.iconType === 'custom' && skill.iconUrl) {
    return (
      <Image
        width={40}
        height={40}
        src={skill.iconUrl}
        alt={skill.name}
        className="w-10 h-10 object-contain"
      />
    );
  }
  
  if (skill.iconType === 'text') {
    return (
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg"
        style={{ backgroundColor: skill.color || '#3B82F6' }}
      >
        {skill.name.charAt(0).toUpperCase()}
      </div>
    );
  }
  
  if (skill.iconType === 'react-icon' && skill.iconName) {
    // This would need to be dynamically imported in a real implementation
    // For now, we'll show a placeholder
    return (
      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
        <CpuChipIcon className="w-6 h-6 text-gray-500" />
      </div>
    );
  }
  
  return (
    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
      <CpuChipIcon className="w-6 h-6 text-gray-500" />
    </div>
  );
};

export default function SkillsPage() {
  const { skills, loading, createSkill, updateSkill, deleteSkill } = useSkills();
  const {
    formData,
    setFormData,
    errors,
    handleFieldChange,
    validateForm,
    resetForm,
  } = useSkillForm();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const handleCreateClick = () => {
    resetForm();
    setIsEditing(false);
    setIsFormOpen(true);
  };

  const handleEditClick = (skill: Skill) => {
    setFormData({
      name: skill.name,
      category: skill.category,
      iconType: skill.iconType,
      iconName: skill.iconName || '',
      iconUrl: skill.iconUrl || '',
      color: skill.color || '#3B82F6',
      proficiency: skill.proficiency || 'intermediate',
      isActive: skill.isActive,
      displayOrder: skill.displayOrder,
    });
    setSelectedSkill(skill);
    setIsEditing(true);
    setIsFormOpen(true);
  };

  const handleViewClick = (skill: Skill) => {
    setSelectedSkill(skill);
    setIsViewOpen(true);
  };

  const handleDeleteClick = (skill: Skill) => {
    setSelectedSkill(skill);
    setIsDeleteOpen(true);
  };

  const handleFormSubmit = async () => {
    if (!validateForm()) return;

    const success =
      isEditing && selectedSkill
        ? await updateSkill(selectedSkill.id, formData)
        : await createSkill(formData);

    if (success) {
      setIsFormOpen(false);
      resetForm();
      setSelectedSkill(null);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedSkill) return;

    const success = await deleteSkill(selectedSkill.id);
    if (success) {
      setIsDeleteOpen(false);
      setSelectedSkill(null);
    }
  };

  const handleImageUpload = (url: string) => {
    handleFieldChange("iconUrl", url);
  };

  const filteredSkills = filterCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === filterCategory);

  const categories = ['All', ...SKILL_CATEGORIES];

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
            Skills
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your technical skills and expertise
          </p>
        </div>
        <Button
          onClick={handleCreateClick}
          className="flex items-center space-x-2"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add Skill</span>
        </Button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => setFilterCategory(category)}
            variant={filterCategory === category ? 'primary' : 'secondary'}
            size="sm"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Skills Grid */}
      {filteredSkills.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  {renderIcon(skill)}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {skill.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {skill.category}
                    </p>
                    {skill.proficiency && (
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {skill.proficiency.charAt(0).toUpperCase() + skill.proficiency.slice(1)}
                      </p>
                    )}
                    <div className="mt-2 flex items-center space-x-2">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          skill.isActive
                            ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                        }`}
                      >
                        {skill.isActive ? "Active" : "Inactive"}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Order: {skill.displayOrder}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewClick(skill)}
                    className="p-1"
                  >
                    <EyeIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditClick(skill)}
                    className="p-1"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteClick(skill)}
                    className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <CpuChipIcon className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No skills found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {filterCategory === 'All' 
              ? 'Add your first skill to get started.'
              : `No skills found in ${filterCategory} category.`
            }
          </p>
          <Button onClick={handleCreateClick}>Add Skill</Button>
        </div>
      )}

      {/* Form Dialog */}
      <Dialog
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={isEditing ? "Edit Skill" : "Add Skill"}
        size="lg"
      >
        <div className="space-y-6">
          {/* Name */}
          <div>
            <Input
              label="Skill Name"
              value={formData.name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              error={errors.name}
              placeholder="Enter skill name"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleFieldChange("category", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              {SKILL_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.category}
              </p>
            )}
          </div>

          {/* Icon Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Icon Type
            </label>
            <div className="space-y-2">
              {[
                { value: 'react-icon', label: 'React Icon' },
                { value: 'custom', label: 'Custom Icon' },
                { value: 'text', label: 'Text Badge' },
              ].map((type) => (
                <label key={type.value} className="flex items-center">
                  <input
                    type="radio"
                    name="iconType"
                    value={type.value}
                    checked={formData.iconType === type.value}
                    onChange={(e) => handleFieldChange("iconType", e.target.value)}
                    className="mr-2"
                  />
                  {type.label}
                </label>
              ))}
            </div>
          </div>

          {/* React Icon Selection */}
          {formData.iconType === 'react-icon' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                React Icon
              </label>
              <select
                value={formData.iconName || ''}
                onChange={(e) => handleFieldChange("iconName", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select an icon</option>
                {REACT_ICONS.map((icon) => (
                  <option key={icon.name} value={icon.name}>
                    {icon.label}
                  </option>
                ))}
              </select>
              {errors.iconName && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.iconName}
                </p>
              )}
            </div>
          )}

          {/* Custom Icon Upload */}
          {formData.iconType === 'custom' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Custom Icon
              </label>
              <ImageUpload
                image={formData.iconUrl || ''}
                onUpload={handleImageUpload}
                folder="skills"
              />
              {errors.iconUrl && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.iconUrl}
                </p>
              )}
            </div>
          )}

          {/* Text Color */}
          {formData.iconType === 'text' && (
            <div>
              <Input
                label="Color"
                type="color"
                value={formData.color || '#3B82F6'}
                onChange={(e) => handleFieldChange("color", e.target.value)}
                error={errors.color}
              />
            </div>
          )}

          {/* Proficiency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Proficiency Level
            </label>
            <select
              value={formData.proficiency || 'intermediate'}
              onChange={(e) => handleFieldChange("proficiency", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              {PROFICIENCY_LEVELS.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
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
              {isEditing ? "Update Skill" : "Add Skill"}
            </Button>
          </div>
        </div>
      </Dialog>

      {/* View Dialog */}
      <Dialog
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        title="View Skill"
        size="md"
      >
        {selectedSkill && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              {renderIcon(selectedSkill)}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {selectedSkill.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedSkill.category}
                </p>
                {selectedSkill.proficiency && (
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                    Proficiency: {selectedSkill.proficiency.charAt(0).toUpperCase() + selectedSkill.proficiency.slice(1)}
                  </p>
                )}
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                    selectedSkill.isActive
                      ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                  }`}
                >
                  {selectedSkill.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>Icon Type: {selectedSkill.iconType}</p>
                {selectedSkill.iconName && <p>Icon Name: {selectedSkill.iconName}</p>}
                {selectedSkill.color && <p>Color: {selectedSkill.color}</p>}
                <p>Display Order: {selectedSkill.displayOrder}</p>
                <p>
                  Created: {new Date(selectedSkill.createdAt).toLocaleDateString()}
                </p>
                <p>
                  Updated: {new Date(selectedSkill.updatedAt).toLocaleDateString()}
                </p>
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
        title="Delete Skill"
        message={`Are you sure you want to delete the skill "${selectedSkill?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
}
