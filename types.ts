
export interface User {
  id: string;
  name: string;
  email: string;
  profilePictureUrl: string;
}

export enum ApplicationStatus {
  Applied = 'Applied',
  Interviewing = 'Interviewing',
  Offer = 'Offer',
  Rejected = 'Rejected',
}

export interface Application {
  id: string;
  role: string;
  companyName: string;
  status: ApplicationStatus;
  dateApplied: string; // ISO string
  location: string;
  salary?: number;
  jobPostingUrl?: string;
  description?: string;
  contactIds?: string[];
}

export interface Contact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  companyName: string;
  role: string;
  notes?: string;
  applicationIds: string[];
}

export enum InterviewType {
    PhoneScreen = 'Phone Screen',
    Technical = 'Technical',
    Behavioral = 'Behavioral',
    Onsite = 'Onsite',
    Final = 'Final Round',
}

export interface Interview {
    id: string;
    applicationId: string;
    type: InterviewType;
    date: string; // ISO string for datetime
    interviewers: string[];
    notes?: string;
}
