# Employee Directory Application

A comprehensive employee management system built with modern web technologies, featuring a responsive design and full CRUD functionality.

## 🚀 Features

### Core Functionality
- **Employee Dashboard**: Clean, responsive grid layout displaying employee information
- **Add/Edit Forms**: Comprehensive forms with validation for employee data management
- **CRUD Operations**: Complete Create, Read, Update, Delete functionality
- **Search**: Real-time search across employee names and email addresses
- **Advanced Filtering**: Filter by department, role, and first name
- **Sorting**: Sort employees by name or department (ascending/descending)
- **Pagination**: Configurable pagination with 10, 25, 50, or 100 items per page

### Technical Features
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile
- **Form Validation**: Client-side validation with clear error messages
- **Clean UI/UX**: Modern, intuitive interface using shadcn/ui components
- **Modular Code**: Well-organized, commented code structure
- **Mock Data**: Pre-loaded with 20 sample employees for testing

## 🛠️ Technology Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Icons**: Lucide React
- **State Management**: React hooks (useState, useEffect, useMemo)
- **Data**: Mock JavaScript array (simulating Freemarker data injection)

## 📁 Project Structure

\`\`\`
employee-directory/
├── app/
│   ├── page.tsx                 # Main application component
│   └── layout.tsx              # Root layout
├── components/
│   ├── employee-dashboard.tsx   # Dashboard with employee grid
│   ├── employee-form.tsx       # Add/Edit form component
│   └── ui/                     # shadcn/ui components
├── lib/
│   └── mock-data.ts            # Employee mock data
└── README.md
\`\`\`

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd employee-directory
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📱 Features Overview

### Dashboard
- **Employee Grid**: Responsive card-based layout showing employee information
- **Search Bar**: Real-time search functionality
- **Filter Panel**: Advanced filtering options with apply/clear functionality
- **Sort Controls**: Sort by name or department with visual indicators
- **Pagination**: Navigate through large employee lists efficiently

### Employee Management
- **Add Employee**: Form to add new employees with validation
- **Edit Employee**: Pre-filled form for updating existing employee data
- **Delete Employee**: Confirmation dialog before deletion
- **Form Validation**: 
  - Required field validation
  - Email format validation
  - Clear error messages
  - Real-time validation feedback

### Responsive Design
- **Desktop**: Full-featured layout with sidebar and grid view
- **Tablet**: Adapted layout with responsive grid
- **Mobile**: Stacked layout with touch-friendly controls

## 🎯 Key Implementation Details

### Data Management
- Uses a JavaScript array to simulate database operations
- All operations (CRUD) are performed in-memory
- Mock data includes 20 diverse employee records

### Search & Filter Logic
- **Search**: Filters by first name, last name, and email
- **Filters**: Department, role, and first name filters
- **Sorting**: Alphabetical sorting with ascending/descending options
- **Pagination**: Efficient pagination with configurable page sizes

### Form Validation
- **Required Fields**: All fields are mandatory
- **Email Validation**: Regex-based email format validation
- **Real-time Feedback**: Errors clear as user types
- **Visual Indicators**: Red borders and error messages for invalid fields

## 🔧 Customization

### Adding New Departments/Roles
Update the select options in \`employee-form.tsx\` and \`employee-dashboard.tsx\`:

\`\`\`tsx
// Add new department
<SelectItem value="Engineering">Engineering</SelectItem>

// Add new role  
<SelectItem value="Senior Developer">Senior Developer</SelectItem>
\`\`\`

### Modifying Employee Fields
1. Update the \`Employee\` interface in \`lib/mock-data.ts\`
2. Add form fields in \`employee-form.tsx\`
3. Update display components in \`employee-dashboard.tsx\`

## 🚀 Future Enhancements

### Potential Improvements
- **Backend Integration**: Connect to a real database (PostgreSQL, MongoDB)
- **Authentication**: Add user login and role-based permissions
- **File Upload**: Employee photo upload functionality
- **Export Features**: Export employee data to CSV/PDF
- **Advanced Search**: Full-text search with multiple criteria
- **Bulk Operations**: Select multiple employees for bulk actions
- **Audit Trail**: Track changes to employee records
- **Email Integration**: Send notifications for employee updates

### Technical Improvements
- **Infinite Scroll**: Alternative to pagination for large datasets
- **Caching**: Implement client-side caching for better performance
- **Offline Support**: PWA features for offline functionality
- **Animations**: Smooth transitions and loading states
- **Accessibility**: Enhanced ARIA labels and keyboard navigation

## 🐛 Known Issues & Limitations

- **Data Persistence**: Data resets on page refresh (in-memory storage)
- **Concurrent Users**: No real-time updates between multiple users
- **File Handling**: No image upload for employee photos
- **Advanced Validation**: Limited to basic client-side validation

## 📝 Development Notes

### Challenges Faced
1. **State Management**: Managing complex state for search, filter, sort, and pagination
2. **Responsive Design**: Ensuring consistent UX across all device sizes
3. **Form Validation**: Implementing comprehensive validation with good UX
4. **Performance**: Optimizing re-renders with useMemo for filtered data

### Solutions Implemented
1. **Centralized State**: Used React hooks with proper state lifting
2. **CSS Grid/Flexbox**: Responsive layouts with Tailwind CSS
3. **Real-time Validation**: Clear errors on user input with visual feedback
4. **Memoization**: Optimized filtering and sorting with useMemo

## 📄 License

This project is created for educational purposes as part of a technical assignment.

## 🤝 Contributing

This is an assignment project, but suggestions and improvements are welcome!

---

**Note**: This application simulates Freemarker template functionality within a modern React framework. In a real Freemarker implementation, the initial data would be server-side rendered, but the client-side functionality would remain similar.
\`\`\`
