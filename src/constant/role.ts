export const USER_ROLE = {
  super_admin: 'super_admin',
  admin: 'admin',
  teacher: 'teacher',
  student: 'student',
  class_teacher: 'class_teacher',
  super_visor: 'super_visor',
  user: 'user',
  editor: 'editor',
};

export const userRole = [
  'super_admin',
  'admin',
  'teacher',
  'student',
  'class_teacher',
  'super_visor',
  'user',
  'editor',
] as const;

export const status = ['active', 'inactive'] as const;
