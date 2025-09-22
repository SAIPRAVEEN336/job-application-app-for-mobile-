
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, Briefcase, TrendingUp } from 'lucide-react';

const StatItem = ({ value, label }: { value: string; label: string }) => (
    <div className="text-center">
        <p className="text-3xl lg:text-4xl font-bold text-blue-600">{value}</p>
        <p className="text-sm lg:text-base text-slate-500 mt-1">{label}</p>
    </div>
);

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
    <div className="text-center">
        <div className="flex items-center justify-center h-16 w-16 bg-blue-100 rounded-xl mx-auto mb-4">
            <Icon className="h-8 w-8 text-blue-600" />
        </div>
        <h3 className="text-lg font-bold text-slate-800">{title}</h3>
        <p className="mt-2 text-slate-500">{description}</p>
    </div>
);


const LandingPage: React.FC = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className="py-20 lg:py-32 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight">
                        Find Your Dream Job <span className="text-blue-600">Today</span>
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                        Connect with top companies and discover opportunities that match your skills and aspirations. Your next career move starts here.
                    </p>
                    <div className="mt-8 max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-2">
                        <div className="relative flex-grow w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search jobs, companies, or keywords..."
                                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                         <button className="w-full sm:w-auto flex-shrink-0 bg-blue-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                            <Search className="h-5 w-5" />
                            Search Jobs
                        </button>
                    </div>
                    <div className="mt-12 flex justify-center gap-8 sm:gap-16">
                        <StatItem value="1000+" label="Active Jobs" />
                        <StatItem value="500+" label="Companies" />
                        <StatItem value="10k+" label="Job Seekers" />
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20 lg:py-24 bg-slate-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">Why Choose Our Platform?</h2>
                    <p className="mt-3 max-w-xl mx-auto text-slate-600">
                        Everything you need to find your next opportunity
                    </p>
                    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                        <FeatureCard
                            icon={Search}
                            title="Smart Job Search"
                            description="Find your perfect job with advanced search filters and AI-powered recommendations"
                        />
                        <FeatureCard
                            icon={Users}
                            title="Direct Applications"
                            description="Apply to jobs with one click and track your application status in real-time"
                        />
                         <FeatureCard
                            icon={Briefcase}
                            title="Top Companies"
                            description="Connect with leading companies and startups looking for talented professionals"
                        />
                         <FeatureCard
                            icon={TrendingUp}
                            title="Career Growth"
                            description="Access career development resources and salary insights to grow your career"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;