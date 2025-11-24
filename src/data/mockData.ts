export type UserRole = 'ngo' | 'donor' | 'auditor';

export interface Project {
  id: string;
  name: string;
  ngo: string;
  description: string;
  location: string;
  lat: number;
  lng: number;
  targetAmount: number;
  raisedAmount: number;
  beneficiaries: number;
  status: 'active' | 'completed' | 'pending';
  category: string;
  startDate: string;
  image?: string;
}

export interface Activity {
  id: string;
  type: 'donation' | 'report' | 'verification' | 'milestone';
  title: string;
  description: string;
  timestamp: string;
  user: string;
  projectId: string;
  status?: 'verified' | 'pending' | 'flagged';
  amount?: number;
}

export interface Beneficiary {
  id: string;
  name: string;
  location: string;
  lat: number;
  lng: number;
  projectId: string;
  helpReceived: string;
  date: string;
  verified: boolean;
  image?: string;
}

export interface Report {
  id: string;
  projectId: string;
  title: string;
  description: string;
  submittedBy: string;
  submittedDate: string;
  status: 'pending' | 'verified' | 'flagged';
  documents: string[];
  beneficiariesHelped: number;
}

export const projects: Project[] = [
  {
    id: '1',
    name: 'Clean Water Initiative',
    ngo: 'Water For All',
    description: 'Providing clean drinking water to rural communities through well installations and water purification systems.',
    location: 'Rural Kenya',
    lat: -1.286389,
    lng: 36.817223,
    targetAmount: 50000,
    raisedAmount: 38500,
    beneficiaries: 1250,
    status: 'active',
    category: 'Water & Sanitation',
    startDate: '2024-01-15',
  },
  {
    id: '2',
    name: 'Education for All',
    ngo: 'Learning Foundation',
    description: 'Building schools and providing educational materials to underprivileged children in remote areas.',
    location: 'Northern India',
    lat: 28.7041,
    lng: 77.1025,
    targetAmount: 75000,
    raisedAmount: 62000,
    beneficiaries: 850,
    status: 'active',
    category: 'Education',
    startDate: '2024-02-01',
  },
  {
    id: '3',
    name: 'Healthcare Access Program',
    ngo: 'Global Health Network',
    description: 'Mobile clinics providing free healthcare services and medicines to underserved communities.',
    location: 'Rural Bangladesh',
    lat: 23.8103,
    lng: 90.4125,
    targetAmount: 60000,
    raisedAmount: 60000,
    beneficiaries: 2100,
    status: 'completed',
    category: 'Healthcare',
    startDate: '2023-11-01',
  },
  {
    id: '4',
    name: 'Food Security Project',
    ngo: 'Hunger Relief Org',
    description: 'Establishing community gardens and providing agricultural training to ensure food security.',
    location: 'Southern Ethiopia',
    lat: 9.145,
    lng: 40.4897,
    targetAmount: 45000,
    raisedAmount: 28000,
    beneficiaries: 680,
    status: 'active',
    category: 'Food Security',
    startDate: '2024-03-10',
  },
];

export const activities: Activity[] = [
  {
    id: '1',
    type: 'donation',
    title: 'New Donation Received',
    description: 'Anonymous donor contributed to Clean Water Initiative',
    timestamp: '2024-11-20T10:30:00Z',
    user: 'Anonymous Donor',
    projectId: '1',
    amount: 5000,
    status: 'verified',
  },
  {
    id: '2',
    type: 'report',
    title: 'Monthly Progress Report',
    description: 'Water For All submitted monthly progress report with beneficiary data',
    timestamp: '2024-11-20T09:15:00Z',
    user: 'Water For All',
    projectId: '1',
    status: 'pending',
  },
  {
    id: '3',
    type: 'verification',
    title: 'Report Verified',
    description: 'Auditor verified education materials distribution report',
    timestamp: '2024-11-19T16:45:00Z',
    user: 'Auditor J. Smith',
    projectId: '2',
    status: 'verified',
  },
  {
    id: '4',
    type: 'milestone',
    title: 'Project Milestone Achieved',
    description: 'Healthcare Access Program reached 2000 beneficiaries',
    timestamp: '2024-11-19T14:20:00Z',
    user: 'Global Health Network',
    projectId: '3',
    status: 'verified',
  },
  {
    id: '5',
    type: 'donation',
    title: 'Corporate Donation',
    description: 'TechCorp donated to Education for All program',
    timestamp: '2024-11-19T11:00:00Z',
    user: 'TechCorp Foundation',
    projectId: '2',
    amount: 10000,
    status: 'verified',
  },
  {
    id: '6',
    type: 'report',
    title: 'Field Report Submitted',
    description: 'Food Security Project team submitted field visit report',
    timestamp: '2024-11-18T15:30:00Z',
    user: 'Hunger Relief Org',
    projectId: '4',
    status: 'pending',
  },
];

export const beneficiaries: Beneficiary[] = [
  {
    id: '1',
    name: 'Amara Community',
    location: 'Kiambu County, Kenya',
    lat: -1.1718,
    lng: 36.8356,
    projectId: '1',
    helpReceived: 'Clean water well installed, serving 150 families',
    date: '2024-11-15',
    verified: true,
  },
  {
    id: '2',
    name: 'Sunrise School',
    location: 'Uttar Pradesh, India',
    lat: 26.8467,
    lng: 80.9462,
    projectId: '2',
    helpReceived: 'School building renovated, 200 students provided with books and supplies',
    date: '2024-11-12',
    verified: true,
  },
  {
    id: '3',
    name: 'Village Health Clinic',
    location: 'Sylhet, Bangladesh',
    lat: 24.8949,
    lng: 91.8687,
    projectId: '3',
    helpReceived: 'Mobile clinic provided free healthcare to 300 patients',
    date: '2024-11-10',
    verified: true,
  },
  {
    id: '4',
    name: 'Farmers Cooperative',
    location: 'Hawassa, Ethiopia',
    lat: 7.0621,
    lng: 38.4769,
    projectId: '4',
    helpReceived: 'Agricultural training and seeds distributed to 80 farmers',
    date: '2024-11-08',
    verified: false,
  },
];

export const reports: Report[] = [
  {
    id: '1',
    projectId: '1',
    title: 'Q4 2024 Progress Report',
    description: 'Detailed report on water well installations and community impact assessment',
    submittedBy: 'Water For All',
    submittedDate: '2024-11-20',
    status: 'pending',
    documents: ['impact_report_q4.pdf', 'beneficiary_photos.zip'],
    beneficiariesHelped: 450,
  },
  {
    id: '2',
    projectId: '2',
    title: 'School Infrastructure Update',
    description: 'Report on school renovation progress and student enrollment data',
    submittedBy: 'Learning Foundation',
    submittedDate: '2024-11-18',
    status: 'verified',
    documents: ['school_renovation.pdf', 'enrollment_data.xlsx'],
    beneficiariesHelped: 200,
  },
  {
    id: '3',
    projectId: '3',
    title: 'Healthcare Services Summary',
    description: 'Monthly summary of medical services provided and patient outcomes',
    submittedBy: 'Global Health Network',
    submittedDate: '2024-11-15',
    status: 'verified',
    documents: ['patient_records.pdf', 'medical_supplies.xlsx'],
    beneficiariesHelped: 300,
  },
  {
    id: '4',
    projectId: '4',
    title: 'Agricultural Training Results',
    description: 'Report on farming techniques training and crop yield improvements',
    submittedBy: 'Hunger Relief Org',
    submittedDate: '2024-11-14',
    status: 'flagged',
    documents: ['training_results.pdf'],
    beneficiariesHelped: 80,
  },
];
