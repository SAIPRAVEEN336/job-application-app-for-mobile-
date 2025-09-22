
import React, { useState, FormEvent, useEffect } from 'react';
import { useInterviews } from '../../contexts/InterviewContext';
import { Interview, InterviewType } from '../../types';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import { format } from 'date-fns';


interface InterviewFormProps {
  onSave: () => void;
  applicationId: string;
  interviewToEdit?: Interview;
}

const InterviewForm: React.FC<InterviewFormProps> = ({ onSave, applicationId, interviewToEdit }) => {
  const { addInterview, updateInterview } = useInterviews();
  const [formData, setFormData] = useState({
    type: InterviewType.PhoneScreen,
    date: '',
    interviewers: '',
    notes: '',
  });

  useEffect(() => {
    if (interviewToEdit) {
      const formattedDate = format(new Date(interviewToEdit.date), "yyyy-MM-dd'T'HH:mm");
      setFormData({
        type: interviewToEdit.type,
        date: formattedDate,
        interviewers: interviewToEdit.interviewers.join(', '),
        notes: interviewToEdit.notes || '',
      });
    } else {
        // Default to current time for new interviews
        const now = format(new Date(), "yyyy-MM-dd'T'HH:mm");
        setFormData(prev => ({ ...prev, date: now }));
    }
  }, [interviewToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const interviewData = {
      applicationId,
      type: formData.type,
      date: new Date(formData.date).toISOString(),
      interviewers: formData.interviewers.split(',').map(name => name.trim()).filter(Boolean),
      notes: formData.notes,
    };
    
    if (interviewToEdit) {
      updateInterview({ ...interviewData, id: interviewToEdit.id });
    } else {
      addInterview(interviewData);
    }
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-white">
      <div>
        <label className="text-sm font-medium text-slate-300 mb-1 block">Interview Type</label>
        <Select name="type" value={formData.type} onChange={handleChange} required>
            {Object.values(InterviewType).map(s => <option key={s} value={s}>{s}</option>)}
        </Select>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-300 mb-1 block">Date & Time</label>
        <Input name="date" type="datetime-local" value={formData.date} onChange={handleChange} required />
      </div>
       <div>
        <label className="text-sm font-medium text-slate-300 mb-1 block">Interviewers</label>
        <Input name="interviewers" value={formData.interviewers} onChange={handleChange} placeholder="e.g. Jane Doe, John Smith" />
        <p className="text-xs text-slate-400 mt-1">Separate multiple names with a comma.</p>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-300 mb-1 block">Notes (Optional)</label>
        <Textarea name="notes" value={formData.notes} onChange={handleChange} rows={4} placeholder="Add any preparation notes..." />
      </div>
      <div className="pt-4 flex justify-end">
        <Button type="submit">
          {interviewToEdit ? 'Save Changes' : 'Add Interview'}
        </Button>
      </div>
    </form>
  );
};

export default InterviewForm;
