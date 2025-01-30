import React from 'react';
import { Clock, Mail, Phone, CheckCircle2, AlertCircle } from 'lucide-react';

interface Issue {
  id: number;
  description: string;
  informedDate: string;
  resolvedDate?: string;
  status: 'resolved' | 'pending';
  statusUpdate?: string;
}

function App() {
  const [emailCount] = React.useState(22);
  const [callCount] = React.useState(16);
  const [currentTime, setCurrentTime] = React.useState(new Date());
  
  const issues: Issue[] = [
    {
      id: 1,
      description: "A professional clean",
      informedDate: "2024-12-30",
      resolvedDate: "2024-12-31",
      status: "resolved"
    },
    {
      id: 2,
      description: "A double bed as advertised that matches the side tables",
      informedDate: "2024-12-30",
      resolvedDate: "2025-01-13",
      status: "resolved"
    },
    {
      id: 3,
      description: "A safe and usable dining table and chair set",
      informedDate: "2024-12-30",
      status: "pending",
      statusUpdate: "JLL + Landlord actively trying to avoid replacing damaged furniture despite sharing pictures."
    },
    {
      id: 4,
      description: "A 2-seater modern sofa and armchair set",
      informedDate: "2024-12-30",
      status: "pending",
      statusUpdate: "JLL + Landlord routinely try to minimize the issue with the sofa and forget it from the list. Now focused on the armchair, hasn't acknowledged sofa. Pretends to schedule technicians."
    },
    {
      id: 5,
      description: "Vent maintenance (fan replacement)",
      informedDate: "2024-12-30",
      status: "pending",
      statusUpdate: "JLL + Landlord, Hoping for a technician soon."
    },
    {
      id: 6,
      description: "Outstanding previous tenant debt via Insite",
      informedDate: "2025-01-18",
      status: "pending",
      statusUpdate: "JLL + Landlord, claimed to be resolved. Still an issue."
    },
    {
      id: 7,
      description: "Washer/Dryer maintenance",
      informedDate: "2025-01-20",
      status: "pending",
      statusUpdate: "JLL + Landlord, nothing yet!"
    }
  ];

  const formatBritishDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
  };

  const calculateTimeSince = (startDate: string, endDate?: string) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : currentTime;
    const diffTime = Math.abs(end.getTime() - start.getTime());
    
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds
    };
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            The Never-Ending Maintenance Saga 🏠
          </h1>
          <p className="text-gray-600 mb-4">
            Featuring JLL: Where "Luxury Living" Meets "We'll Get To It Eventually"
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg flex items-center space-x-3">
              <Mail className="text-blue-500 w-6 h-6" />
              <div>
                <p className="text-sm text-blue-600">Emails Exchanged</p>
                <p className="text-2xl font-bold text-blue-700">{emailCount}</p>
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg flex items-center space-x-3">
              <Phone className="text-purple-500 w-6 h-6" />
              <div>
                <p className="text-sm text-purple-600">Calls Made</p>
                <p className="text-2xl font-bold text-purple-700">{callCount}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {issues.map((issue) => {
              const timeSince = calculateTimeSince(issue.informedDate, issue.resolvedDate);
              
              return (
                <div 
                  key={issue.id}
                  className={`border rounded-lg p-4 ${
                    issue.status === 'resolved' 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-yellow-50 border-yellow-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {issue.status === 'resolved' ? (
                        <CheckCircle2 className="text-green-500 w-6 h-6 mt-1" />
                      ) : (
                        <AlertCircle className="text-yellow-500 w-6 h-6 mt-1" />
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {issue.description}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Reported: {formatBritishDate(issue.informedDate)}
                        </p>
                        {issue.statusUpdate && (
                          <p className="text-sm text-gray-600 mt-2 italic">
                            {issue.statusUpdate}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      {issue.status === 'resolved' ? (
                        <div>
                          <p className="text-sm text-green-600">Resolved!</p>
                          <p className="text-xs text-gray-600">
                            Resolved on: {formatBritishDate(issue.resolvedDate!)}
                          </p>
                          <p className="text-xs text-gray-600">
                            Took {timeSince.days} day{timeSince.days !== 1 ? 's' : ''}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm text-yellow-600">Pending</p>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4 text-yellow-500" />
                            <p className="text-xs text-gray-600">
                              {timeSince.days}d {timeSince.hours}h {timeSince.minutes}m {timeSince.seconds}s
                              <br />and counting...
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            Last updated: {currentTime.toLocaleString('en-GB')}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;