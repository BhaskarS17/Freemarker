"use client"

import { useState, useMemo } from "react"
import { EmployeeDashboard } from "@/components/employee-dashboard"
import { EmployeeForm } from "@/components/employee-form"
import { type Employee, mockEmployees } from "@/lib/mock-data"

export default function Home() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees)
  const [currentView, setCurrentView] = useState<"dashboard" | "form">("dashboard")
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)

  // Search, Filter, Sort states
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    department: "",
    role: "",
    firstName: "",
  })
  const [sortBy, setSortBy] = useState<"firstName" | "department" | "">("")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Filtered and sorted employees
  const filteredAndSortedEmployees = useMemo(() => {
    let result = [...employees]

    // Apply search
    if (searchTerm) {
      result = result.filter(
        (emp) =>
          emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply filters
    if (filters.department) {
      result = result.filter((emp) => emp.department === filters.department)
    }
    if (filters.role) {
      result = result.filter((emp) => emp.role === filters.role)
    }
    if (filters.firstName) {
      result = result.filter((emp) => emp.firstName.toLowerCase().includes(filters.firstName.toLowerCase()))
    }

    // Apply sorting
    if (sortBy) {
      result.sort((a, b) => {
        const aValue = a[sortBy].toLowerCase()
        const bValue = b[sortBy].toLowerCase()
        if (sortOrder === "asc") {
          return aValue.localeCompare(bValue)
        } else {
          return bValue.localeCompare(aValue)
        }
      })
    }

    return result
  }, [employees, searchTerm, filters, sortBy, sortOrder])

  // Paginated employees
  const paginatedEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredAndSortedEmployees.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredAndSortedEmployees, currentPage, itemsPerPage])

  const totalPages = Math.ceil(filteredAndSortedEmployees.length / itemsPerPage)

  const handleAddEmployee = () => {
    setEditingEmployee(null)
    setCurrentView("form")
  }

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee)
    setCurrentView("form")
  }

  const handleDeleteEmployee = (id: number) => {
    if (confirm("Are you sure you want to delete this employee?")) {
      setEmployees((prev) => prev.filter((emp) => emp.id !== id))
    }
  }

  const handleSaveEmployee = (employeeData: Omit<Employee, "id">) => {
    if (editingEmployee) {
      // Edit existing employee
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === editingEmployee.id ? { ...employeeData, id: editingEmployee.id } : emp)),
      )
    } else {
      // Add new employee
      const newId = Math.max(...employees.map((e) => e.id)) + 1
      setEmployees((prev) => [...prev, { ...employeeData, id: newId }])
    }
    setCurrentView("dashboard")
    setEditingEmployee(null)
  }

  const handleCancelForm = () => {
    setCurrentView("dashboard")
    setEditingEmployee(null)
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    setCurrentPage(1) // Reset to first page when searching
  }

  const handleFilter = (newFilters: typeof filters) => {
    setFilters(newFilters)
    setCurrentPage(1) // Reset to first page when filtering
  }

  const handleSort = (field: "firstName" | "department", order: "asc" | "desc") => {
    setSortBy(field)
    setSortOrder(order)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items)
    setCurrentPage(1) // Reset to first page when changing items per page
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === "dashboard" ? (
        <EmployeeDashboard
          employees={paginatedEmployees}
          totalEmployees={filteredAndSortedEmployees.length}
          searchTerm={searchTerm}
          filters={filters}
          sortBy={sortBy}
          sortOrder={sortOrder}
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onAddEmployee={handleAddEmployee}
          onEditEmployee={handleEditEmployee}
          onDeleteEmployee={handleDeleteEmployee}
          onSearch={handleSearch}
          onFilter={handleFilter}
          onSort={handleSort}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      ) : (
        <EmployeeForm employee={editingEmployee} onSave={handleSaveEmployee} onCancel={handleCancelForm} />
      )}
    </div>
  )
}
