
import ProfileHeader from './ProfileHeader';
import PersonalInfoCard from './PersonalInfoCard';
import EditEmployeeForm from './EditEmployeeForm';
import { Employee } from '@/services/userService';
import { User as UserType } from '@/services/userService';

interface ProfileContentProps {
  employee: Employee;
  currentUser: UserType;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (data: any) => void;
  onCancel: () => void;
  isUpdating: boolean;
}

const ProfileContent = ({ 
  employee, 
  currentUser, 
  isEditing, 
  onEdit, 
  onSave, 
  onCancel, 
  isUpdating 
}: ProfileContentProps) => {
  return (
    <div className="flex-1 container mx-auto px-4 py-6 max-w-4xl pb-20">
      <div className="mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-white">Información Personal</h2>
        <p className="text-sm md:text-base text-gray-400">Gestiona tu información personal y datos del empleado</p>
      </div>

      {isEditing ? (
        <EditEmployeeForm
          employee={employee}
          onSave={onSave}
          onCancel={onCancel}
          isLoading={isUpdating}
        />
      ) : (
        <div className="space-y-4 md:space-y-6">
          <ProfileHeader 
            employee={employee} 
            currentUser={currentUser} 
            onEdit={onEdit} 
          />
          <PersonalInfoCard 
            employee={employee} 
            currentUser={currentUser} 
          />
        </div>
      )}
    </div>
  );
};

export default ProfileContent;
