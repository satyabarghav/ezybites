"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

import { type Admin, admins, restaurants } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AdminTable } from "@/components/admins/admin-table"
import { AdminForm } from "@/components/admins/admin-form"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function AdminsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null)
  const [deletingAdmin, setDeletingAdmin] = useState<Admin | null>(null)
  const [showNewAdminForm, setShowNewAdminForm] = useState(false)

  // Filter admins based on search term
  const filteredAdmins = admins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.restaurantName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleEdit = (admin: Admin) => {
    setEditingAdmin(admin)
  }

  const handleDelete = (admin: Admin) => {
    setDeletingAdmin(admin)
  }

  const confirmDelete = () => {
    // In a real app, this would call an API to delete the admin
    console.log(`Deleting admin: ${deletingAdmin?.name}`)
    setDeletingAdmin(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-ezy-text">Restaurant Admins</h1>
          <p className="text-muted-foreground">Manage restaurant admin accounts</p>
        </div>
        <Button className="bg-ezy-cta hover:bg-ezy-cta-dark" onClick={() => setShowNewAdminForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Admin
        </Button>
      </div>

      <div className="flex items-center">
        <Input
          placeholder="Search admins..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <AdminTable admins={filteredAdmins} onEdit={handleEdit} onDelete={handleDelete} />

      {/* Edit Admin Dialog */}
      {editingAdmin && (
        <Dialog open={!!editingAdmin} onOpenChange={(open) => !open && setEditingAdmin(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <AdminForm admin={editingAdmin} restaurants={restaurants} onCancel={() => setEditingAdmin(null)} />
          </DialogContent>
        </Dialog>
      )}

      {/* New Admin Dialog */}
      {showNewAdminForm && (
        <Dialog open={showNewAdminForm} onOpenChange={setShowNewAdminForm}>
          <DialogContent className="sm:max-w-[600px]">
            <AdminForm restaurants={restaurants} onCancel={() => setShowNewAdminForm(false)} />
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingAdmin} onOpenChange={(open) => !open && setDeletingAdmin(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the admin account for {deletingAdmin?.name}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
