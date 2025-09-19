"use client";

import { useState } from "react";
import Image from "next/image";
import {
  usePublicProfile,
  usePublicProfileForm,
  PublicProfile,
} from "@/hooks/usePublicProfile";
import Input from "@/components/ui/Input";
import ImageUpload from "@/components/ImageUpload";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import {
  PlusIcon,
  PencilIcon,
  EyeIcon,
  TrashIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Dialog from "@/components/ui/Dialog";
import Button from "@/components/ui/Button";

export default function PublicProfilePage() {
  const { profile, loading, createProfile, updateProfile, deleteProfile } =
    usePublicProfile();
  const {
    formData,
    setFormData,
    errors,
    handleFieldChange,
    handleHeadlineChange,
    addHeadline,
    removeHeadline,
    validateForm,
    resetForm,
  } = usePublicProfileForm();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<PublicProfile | null>(
    null
  );
  const [isEditing, setIsEditing] = useState(false);

  const handleCreateClick = () => {
    resetForm();
    setIsEditing(false);
    setIsFormOpen(true);
  };

  const handleEditClick = (profile: PublicProfile) => {
    setFormData({
      name: profile.name,
      image: profile.image,
      headlines: profile.headlines,
      tagline: profile.tagline,
      isActive: profile.isActive,
    });
    setSelectedProfile(profile);
    setIsEditing(true);
    setIsFormOpen(true);
  };

  const handleViewClick = (profile: PublicProfile) => {
    setSelectedProfile(profile);
    setIsViewOpen(true);
  };

  const handleDeleteClick = (profile: PublicProfile) => {
    setSelectedProfile(profile);
    setIsDeleteOpen(true);
  };

  const handleFormSubmit = async () => {
    if (!validateForm()) return;

    const success =
      isEditing && selectedProfile
        ? await updateProfile(selectedProfile.id, formData)
        : await createProfile(formData);

    if (success) {
      setIsFormOpen(false);
      resetForm();
      setSelectedProfile(null);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedProfile) return;

    const success = await deleteProfile(selectedProfile.id);
    if (success) {
      setIsDeleteOpen(false);
      setSelectedProfile(null);
    }
  };

  const handleImageUpload = (url: string) => {
    handleFieldChange("image", url);
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
            Public Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your public profile information displayed on the homepage
          </p>
        </div>
        <Button
          onClick={handleCreateClick}
          className="flex items-center space-x-2"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Create Profile</span>
        </Button>
      </div>

      {/* Profile Card */}
      {profile ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                <Image
                  src={profile.image}
                  alt={profile.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {profile.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {profile.tagline}
                </p>
                <div className="flex flex-wrap gap-1">
                  {profile.headlines.map((headline, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300"
                    >
                      {headline}
                    </span>
                  ))}
                </div>
                <div className="mt-2 flex items-center space-x-2">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      profile.isActive
                        ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                    }`}
                  >
                    {profile.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleViewClick(profile)}
                className="flex items-center space-x-1"
              >
                <EyeIcon className="w-4 h-4" />
                <span>View</span>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleEditClick(profile)}
                className="flex items-center space-x-1"
              >
                <PencilIcon className="w-4 h-4" />
                <span>Edit</span>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleDeleteClick(profile)}
                className="flex items-center space-x-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
              >
                <TrashIcon className="w-4 h-4" />
                <span>Delete</span>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <UserIcon className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No public profile found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Create your first public profile to get started.
          </p>
          <Button onClick={handleCreateClick}>Create Profile</Button>
        </div>
      )}

      {/* Form Dialog */}
      <Dialog
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={isEditing ? "Edit Public Profile" : "Create Public Profile"}
        size="lg"
      >
        <div className="space-y-6">
          {/* Name */}
          <div>
            <Input
              label="Name"
              value={formData.name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              error={errors.name}
              placeholder="Enter your full name"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Profile Image
            </label>
            <ImageUpload
              image={formData.image}
              onUpload={handleImageUpload}
              folder="profile"
            />
            {errors.image && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.image}
              </p>
            )}
          </div>

          {/* Headlines */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Headlines (for type animation)
            </label>
            <div className="space-y-2">
              {formData.headlines.map((headline, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={headline}
                    onChange={(e) =>
                      handleHeadlineChange(index, e.target.value)
                    }
                    placeholder={`Headline ${index + 1}`}
                    className="flex-1"
                  />
                  {formData.headlines.length > 1 && (
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => removeHeadline(index)}
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
                onClick={addHeadline}
                className="w-full"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                Add Headline
              </Button>
            </div>
            {errors.headlines && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.headlines}
              </p>
            )}
          </div>

          {/* Tagline */}
          <div>
            <Input
              label="Tagline"
              value={formData.tagline}
              onChange={(e) => handleFieldChange("tagline", e.target.value)}
              error={errors.tagline}
              placeholder="Enter your tagline or intro text"
              multiline
              rows={3}
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
              Set as active profile (only one can be active at a time)
            </label>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button variant="secondary" onClick={() => setIsFormOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleFormSubmit}>
              {isEditing ? "Update Profile" : "Create Profile"}
            </Button>
          </div>
        </div>
      </Dialog>

      {/* View Dialog */}
      <Dialog
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        title="View Public Profile"
        size="lg"
      >
        {selectedProfile && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                <Image
                  src={selectedProfile.image}
                  alt={selectedProfile.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {selectedProfile.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedProfile.tagline}
                </p>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                    selectedProfile.isActive
                      ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                  }`}
                >
                  {selectedProfile.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                Headlines
              </h4>
              <div className="space-y-2">
                {selectedProfile.headlines.map((headline, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {index + 1}.
                    </span>
                    <span className="ml-2 text-gray-900 dark:text-white">
                      {headline}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>
                  Created:{" "}
                  {new Date(selectedProfile.createdAt).toLocaleDateString()}
                </p>
                <p>
                  Updated:{" "}
                  {new Date(selectedProfile.updatedAt).toLocaleDateString()}
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
        title="Delete Public Profile"
        message={`Are you sure you want to delete the profile "${selectedProfile?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
}
