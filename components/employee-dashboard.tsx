"use client"

import { useState } from "react"
import { Search, Filter, Plus, Edit, Trash2, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Employee } from "@/lib/mock-data"

interface EmployeeDashboardProps {
  employees: Employee[]
  totalEmployees: number
  searchTerm: string
  filters: {
    department: string
    role: string
    firstName: string
  }
  sortBy: "firstName" | "department" | ""
  sortOrder: "asc" | "desc"
  currentPage: number
  totalPages: number
  itemsPerPage: number
  onAddEmployee: () => void
  onEditEmployee: (employee: Employee) => void
  onDeleteEmployee: (id: number) => void
  onSearch: (term: string) => void
  onFilter: (filters: { department: string; role: string; firstName: string }) => void
  onSort: (field: "firstName" | "department", order: "asc" | "desc") => void
  onPageChange: (page: number) => void
  onItemsPerPageChange: (items: number) => void
}

export function EmployeeDashboard({
  employees,
  totalEmployees,
  searchTerm,
  filters,
  sortBy,
  sortOrder,
  currentPage,
  totalPages,
  itemsPerPage,
  onAddEmployee,
  onEditEmployee,
  onDeleteEmployee,
  onSearch,
  onFilter,
  onSort,
  onPageChange,
  onItemsPerPageChange,
}: EmployeeDashboardProps) {
  const [showFilters, setShowFilters] = useState(false)
  const [tempFilters, setTempFilters] = useState(filters)

  const handleApplyFilters = () => {
    onFilter(tempFilters)
    setShowFilters(false)
  }

  const handleClearFilters = () => {
    const clearedFilters = { department: "", role: "", firstName: "" }
    setTempFilters(clearedFilters)
    onFilter(clearedFilters)
  }

  const handleSortClick = (field: "firstName" | "department") => {
    if (sortBy === field) {
      onSort(field, sortOrder === "asc" ? "desc" : "asc")
    } else {
      onSort(field, "asc")
    }
  }

  const renderPagination = () => {
    const pages = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          variant={i === currentPage ? "default" : "outline"}
          size="sm"
          onClick={() => onPageChange(i)}
          className="w-10 h-10"
        >
          {i}
        </Button>,
      )
    }

    return (
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalEmployees)} of{" "}
            {totalEmployees} employees
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {pages}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employee Directory</h1>
          <p className="text-gray-600 mt-1">Manage your team members</p>
        </div>
        <Button onClick={onAddEmployee} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Employee
        </Button>
      </div>

      {/* Search and Controls */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search employees by name or email..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          <Select value={itemsPerPage.toString()} onValueChange={(value) => onItemsPerPageChange(Number(value))}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 per page</SelectItem>
              <SelectItem value="25">25 per page</SelectItem>
              <SelectItem value="50">50 per page</SelectItem>
              <SelectItem value="100">100 per page</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Filter Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">First Name</label>
                <Input
                  placeholder="Filter by first name"
                  value={tempFilters.firstName}
                  onChange={(e) => setTempFilters((prev) => ({ ...prev, firstName: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Department</label>
                <Select
                  value={tempFilters.department}
                  onValueChange={(value) => setTempFilters((prev) => ({ ...prev, department: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All departments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All departments</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="IT">IT</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Role</label>
                <Select
                  value={tempFilters.role}
                  onValueChange={(value) => setTempFilters((prev) => ({ ...prev, role: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All roles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All roles</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Developer">Developer</SelectItem>
                    <SelectItem value="Analyst">Analyst</SelectItem>
                    <SelectItem value="Coordinator">Coordinator</SelectItem>
                    <SelectItem value="Specialist">Specialist</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={handleApplyFilters}>Apply Filters</Button>
              <Button variant="outline" onClick={handleClearFilters}>
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sort Controls */}
      <div className="flex gap-2 mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleSortClick("firstName")}
          className="flex items-center gap-1"
        >
          Sort by Name
          {sortBy === "firstName" &&
            (sortOrder === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleSortClick("department")}
          className="flex items-center gap-1"
        >
          Sort by Department
          {sortBy === "department" &&
            (sortOrder === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
        </Button>
      </div>

      {/* Employee Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {employees.map((employee) => (
          <Card key={employee.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    {employee.firstName} {employee.lastName}
                  </h3>
                  <p className="text-sm text-gray-500">ID: {employee.id}</p>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => onEditEmployee(employee)} className="p-2">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteEmployee(employee.id)}
                    className="p-2 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">{employee.email}</p>
                <div className="flex gap-2">
                  <Badge variant="secondary">{employee.department}</Badge>
                  <Badge variant="outline">{employee.role}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {employees.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No employees found matching your criteria.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && renderPagination()}
    </div>
  )
}
