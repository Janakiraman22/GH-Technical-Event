import * as React from 'react';
import './App.css';
import { useRef, useState } from 'react';
import {
    ScheduleComponent, ViewsDirective, ViewDirective, ResourcesDirective, ResourceDirective,
    TimelineViews, Week, Day, Agenda, Inject, DragAndDrop, ExcelExport, Print
} from '@syncfusion/ej2-react-schedule';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { Internationalization, closest, addClass, remove } from '@syncfusion/ej2-base';
import { Query } from '@syncfusion/ej2-data';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

const rooms = [
    { RoomId: 1, RoomName: 'Room A', RoomCapacity: 110, RoomColor: '#FF5733' },
    { RoomId: 2, RoomName: 'Room B', RoomCapacity: 100, RoomColor: '#33FF57' },
    { RoomId: 3, RoomName: 'Room C', RoomCapacity: 100, RoomColor: '#3380FF' },
    { RoomId: 4, RoomName: 'Room D', RoomCapacity: 100, RoomColor: '#FFC300' },
];

let events = [

    // Room 1 - February 24
    {
        Id: 1,
        Subject: 'Registration & Welcome',
        StartTime: new Date(2025, 1, 24, 8, 0),
        EndTime: new Date(2025, 1, 24, 9, 0),
        RoomId: 1,
        Capacity: 72,
        Speakers: [{ name: 'John Doe', title: 'Event Coordinator' }],
        Description: 'Welcome session to introduce the event and speakers.',
        Duration: '1 hour',
        EventType: 'Opening',
        TargetAudience: 'All attendees',
        EventLevel: 'All levels',
        EventTags: ['Welcome']
    },
    {
        Id: 2,
        Subject: 'Edge Computing and IoT Integration',
        StartTime: new Date(2025, 1, 24, 9, 30),
        EndTime: new Date(2025, 1, 24, 10, 30),
        RoomId: 1,
        Capacity: 100,
        Speakers: [{ name: 'Liam Johnson', title: 'Edge Computing Specialist' }],
        Description: 'Exploring the integration of edge computing with IoT systems.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Developers, Engineers',
        EventLevel: 'Intermediate',
        EventTags: ['Edge Computing', 'IoT']
    },
    {
        Id: 3,
        Subject: 'Break',
        StartTime: new Date(2025, 1, 24, 10, 30),
        EndTime: new Date(2025, 1, 24, 11, 0),
        RoomId: 1,
        Capacity: 0,
        Speakers: [],
        Description: 'Take a break and relax.',
        Duration: '30 minutes',
        EventType: 'Break',
        TargetAudience: 'All attendees',
        EventLevel: 'All levels',
        EventTags: ['Break']
    },
    {
        Id: 4,
        Subject: 'Cloud Security Best Practices',
        StartTime: new Date(2025, 1, 24, 11, 0),
        EndTime: new Date(2025, 1, 24, 12, 0),
        RoomId: 1,
        Capacity: 90,
        Speakers: [{ name: 'Richard Black', title: 'Cloud Security Consultant' }],
        Description: 'Best practices to ensure security in cloud environments.',
        Duration: '1 hour',
        EventType: 'Security Session',
        TargetAudience: 'Security Professionals',
        EventLevel: 'Advanced',
        EventTags: ['Cloud Security']
    },
    {
        Id: 5,
        Subject: 'Lunch Break',
        StartTime: new Date(2025, 1, 24, 12, 0),
        EndTime: new Date(2025, 1, 24, 13, 0),
        RoomId: 1,
        Capacity: 0,
        Speakers: [],
        Description: 'Lunch Break',
        Duration: '1 hour',
        EventType: 'Break',
        TargetAudience: 'All attendees',
        EventLevel: 'All levels',
        EventTags: ['Networking', 'Break']
    },
    {
        Id: 6,
        Subject: 'AI and Machine Learning in Healthcare',
        StartTime: new Date(2025, 1, 24, 13, 0),
        EndTime: new Date(2025, 1, 24, 15, 0),
        RoomId: 1,
        Capacity: 100,
        Speakers: [{ name: 'Dr. Jennifer Smith', title: 'AI Healthcare Expert' }],
        Description: 'The role of AI and ML in improving healthcare outcomes.',
        Duration: '2 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Healthcare Professionals',
        EventLevel: 'Intermediate',
        EventTags: ['AI', 'Healthcare']
    },
    {
        Id: 7,
        Subject: 'Break',
        StartTime: new Date(2025, 1, 24, 15, 0),
        EndTime: new Date(2025, 1, 24, 15, 30),
        RoomId: 1,
        Capacity: 0,
        Speakers: [],
        Description: 'Short break to relax and network.',
        Duration: '30 minutes',
        EventType: 'Break',
        TargetAudience: 'All Participants',
        EventLevel: 'All Levels',
        EventTags: ['Networking', 'Relax']
    },


    {
        Id: 8,
        Subject: 'Smart Cities and IoT Solutions',
        StartTime: new Date(2025, 1, 24, 15, 30),
        EndTime: new Date(2025, 1, 24, 16, 30),
        RoomId: 1,
        Capacity: 80,
        Speakers: [{ name: 'Grace Williams', title: 'IoT Expert' }],
        Description: 'The role of IoT in building and managing smart cities.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Urban Planners, Engineers',
        EventLevel: 'Intermediate',
        EventTags: ['IoT', 'Smart Cities']
    },
    {
        Id: 9,
        Subject: 'AI in Finance: Revolutionizing Banking',
        StartTime: new Date(2025, 1, 24, 18, 0),
        EndTime: new Date(2025, 1, 24, 19, 0),
        RoomId: 1,
        Capacity: 70,
        Speakers: [{ name: 'Olivia Brown', title: 'AI in Finance Expert' }],
        Description: 'How AI technologies are transforming the banking industry.',
        Duration: '1 hour',
        EventType: 'Business Session',
        TargetAudience: 'Finance Professionals',
        EventLevel: 'Intermediate',
        EventTags: ['AI', 'Finance']
    },


    // Room 2 - February 24
    {
        Id: 10,
        Subject: 'Blockchain in Finance',
        StartTime: new Date(2025, 1, 24, 8, 30),
        EndTime: new Date(2025, 1, 24, 9, 30),
        RoomId: 2,
        Capacity: 80,
        Speakers: [{ name: 'David Brooks', title: 'Blockchain Consultant' }],
        Description: 'The use of blockchain to enhance security in financial transactions.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Finance Professionals',
        EventLevel: 'Intermediate',
        EventTags: ['Blockchain', 'Finance']
    },
    {
        Id: 11,
        Subject: 'Artificial Intelligence in Retail',
        StartTime: new Date(2025, 1, 24, 9, 30),
        EndTime: new Date(2025, 1, 24, 10, 30),
        RoomId: 2,
        Capacity: 100,
        Speakers: [{ name: 'Eve Green', title: 'AI Retail Specialist' }],
        Description: 'Leveraging AI to enhance the retail customer experience.',
        Duration: '1 hour',
        EventType: 'Business Session',
        TargetAudience: 'Retailers, Business Owners',
        EventLevel: 'Intermediate',
        EventTags: ['AI', 'Retail']
    },
    {
        Id: 12,
        Subject: 'Machine Learning for Business',
        StartTime: new Date(2025, 1, 24, 11, 0),
        EndTime: new Date(2025, 1, 24, 12, 0),
        RoomId: 2,
        Capacity: 100,
        Speakers: [{ name: 'Sophia Lee', title: 'Machine Learning Expert' }],
        Description: 'Practical use cases of machine learning in business operations.',
        Duration: '1 hour',
        EventType: 'Business Session',
        TargetAudience: 'Business Owners, Entrepreneurs',
        EventLevel: 'Intermediate',
        EventTags: ['Machine Learning', 'Business']
    },
    {
        Id: 11,
        Subject: 'Deep Learning for Computer Vision',
        StartTime: new Date(2025, 1, 24, 13, 0),
        EndTime: new Date(2025, 1, 24, 14, 30),
        RoomId: 2,
        Capacity: 100,
        Speakers: [{ name: 'Daniel White', title: 'AI Researcher' }],
        Description: 'Exploring deep learning algorithms used in computer vision.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Developers, AI Researchers',
        EventLevel: 'Advanced',
        EventTags: ['Deep Learning', 'Computer Vision']
    },
    {
        Id: 12,
        Subject: 'Robotic Process Automation (RPA)',
        StartTime: new Date(2025, 1, 24, 14, 0),
        EndTime: new Date(2025, 1, 24, 15, 0),
        RoomId: 2,
        Capacity: 100,
        Speakers: [{ name: 'Maria Clark', title: 'RPA Specialist' }],
        Description: 'Understanding how RPA can streamline business processes.',
        Duration: '1 hour',
        EventType: 'Business Session',
        TargetAudience: 'Business Analysts',
        EventLevel: 'Intermediate',
        EventTags: ['RPA', 'Business Automation']
    },
    {
        Id: 13,
        Subject: 'Cybersecurity in the Cloud',
        StartTime: new Date(2025, 1, 24, 15, 30),
        EndTime: new Date(2025, 1, 24, 17, 0),
        RoomId: 2,
        Capacity: 100,
        Speakers: [{ name: 'Sam Taylor', title: 'Cloud Security Expert' }],
        Description: 'Best practices for ensuring security in cloud-based environments.',
        Duration: '1 hour',
        EventType: 'Security Session',
        TargetAudience: 'Security Professionals',
        EventLevel: 'Advanced',
        EventTags: ['Cloud Security']
    },

    // Room 3 - February 24 (Expanded)
    {
        Id: 14,
        Subject: 'Introduction to Big Data Analytics',
        StartTime: new Date(2025, 1, 24, 8, 0),
        EndTime: new Date(2025, 1, 24, 8, 45),
        RoomId: 3,
        Capacity: 80,
        Speakers: [{ name: 'Linda Johnson', title: 'Data Scientist' }],
        Description: 'Understanding the basics of big data analytics and its applications.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Data Analysts, IT Professionals',
        EventLevel: 'Beginner',
        EventTags: ['Big Data', 'Analytics']
    },
    {
        Id: 15,
        Subject: 'Data Science with Python',
        StartTime: new Date(2025, 1, 24, 8, 45),
        EndTime: new Date(2025, 1, 24, 10, 0),
        RoomId: 3,
        Capacity: 80,
        Speakers: [{ name: 'Peter Moore', title: 'Data Scientist' }],
        Description: 'Hands-on workshop on using Python for data science.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Data Scientists, Developers',
        EventLevel: 'Intermediate',
        EventTags: ['Data Science', 'Python']
    },
    {
        Id: 61,
        Subject: 'Break',
        StartTime: new Date(2025, 1, 24, 10, 0),
        EndTime: new Date(2025, 1, 24, 10, 30),
        RoomId: 3,
        Capacity: 0,
        Speakers: [],
        Description: 'Short break to relax and network.',
        Duration: '30 minutes',
        EventType: 'Break',
        TargetAudience: 'All Participants',
        EventLevel: 'All Levels',
        EventTags: ['Networking', 'Relax']
    },
    {
        Id: 16,
        Subject: 'Data Visualization with Tableau',
        StartTime: new Date(2025, 1, 24, 10, 30),
        EndTime: new Date(2025, 1, 24, 12, 30),
        RoomId: 3,
        Capacity: 80,
        Speakers: [{ name: 'Nancy Black', title: 'Data Visualization Expert' }],
        Description: 'Learn to create beautiful data visualizations using Tableau.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Data Analysts, Business Intelligence Professionals',
        EventLevel: 'Intermediate',
        EventTags: ['Data Visualization', 'Tableau']
    },

    {
        Id: 51,
        Subject: 'Business Intelligence with Power BI',
        StartTime: new Date(2025, 1, 24, 13, 30),
        EndTime: new Date(2025, 1, 24, 15, 0),
        RoomId: 3,
        Capacity: 100,
        Speakers: [{ name: 'John Mark', title: 'Power BI Expert' }],
        Description: 'Leveraging Power BI for effective business intelligence and analytics.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Business Analysts, IT Professionals',
        EventLevel: 'Intermediate',
        EventTags: ['Business Intelligence', 'Power BI']
    },
    {
        Id: 30,
        Subject: 'Quantum Computing and AI',
        StartTime: new Date(2025, 1, 24, 16, 30),
        EndTime: new Date(2025, 1, 24, 17, 30),
        RoomId: 3,
        Capacity: 100,
        Speakers: [{ name: 'David Adams', title: 'Quantum Computing Expert' }],
        Description: 'The convergence of quantum computing and artificial intelligence.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'AI Researchers, Quantum Computing Enthusiasts',
        EventLevel: 'Advanced',
        EventTags: ['Quantum Computing', 'AI']
    },
    {
        Id: 77,
        Subject: 'Serverless Computing with AWS Lambda',
        StartTime: new Date(2025, 1, 24, 18, 15),
        EndTime: new Date(2025, 1, 24, 19, 0),
        RoomId: 3,
        Capacity: 90,
        Speakers: [{ name: 'Isabella Cooper', title: 'Cloud Architect' }],
        Description: 'Learn how to build and deploy serverless applications using AWS Lambda.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Developers, Cloud Professionals',
        EventLevel: 'Advanced',
        EventTags: ['Serverless', 'AWS Lambda']
    },

    // Room 4 - February 24 (Expanded)
    {
        Id: 17,
        Subject: 'Introduction to Cloud Computing',
        StartTime: new Date(2025, 1, 24, 8, 0),
        EndTime: new Date(2025, 1, 24, 9, 30),
        RoomId: 4,
        Capacity: 50,
        Speakers: [{ name: 'Sophia White', title: 'Cloud Architect' }],
        Description: 'A basic introduction to the principles of cloud computing.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Beginners, Developers',
        EventLevel: 'Beginner',
        EventTags: ['Cloud', 'Computing']
    },
    {
        Id: 18,
        Subject: 'AI in Healthcare: Applications and Challenges',
        StartTime: new Date(2025, 1, 24, 10, 15),
        EndTime: new Date(2025, 1, 24, 11, 15),
        RoomId: 4,
        Capacity: 50,
        Speakers: [{ name: 'Michael Davis', title: 'AI Healthcare Expert' }],
        Description: 'Exploring the application of AI technologies in the healthcare sector.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Healthcare Professionals',
        EventLevel: 'Intermediate',
        EventTags: ['AI', 'Healthcare']
    },
    {
        Id: 19,
        Subject: 'AI-Powered Healthcare Solutions',
        StartTime: new Date(2025, 1, 24, 13, 0),
        EndTime: new Date(2025, 1, 24, 15, 0),
        RoomId: 4,
        Capacity: 50,
        Speakers: [{ name: 'Lucy Green', title: 'AI Solutions Expert' }],
        Description: 'Discussing how AI is transforming healthcare delivery.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Healthcare Professionals',
        EventLevel: 'Intermediate',
        EventTags: ['AI', 'Healthcare']
    },
    {
        Id: 20,
        Subject: 'Robotics in Healthcare',
        StartTime: new Date(2025, 1, 24, 16, 0),
        EndTime: new Date(2025, 1, 24, 17, 0),
        RoomId: 4,
        Capacity: 50,
        Speakers: [{ name: 'James Taylor', title: 'Robotics Expert' }],
        Description: 'Exploring the potential of robotics in healthcare settings.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Healthcare Professionals',
        EventLevel: 'Advanced',
        EventTags: ['Robotics', 'Healthcare']
    },
    {
        Id: 31,
        Subject: 'Natural Language Processing (NLP) in AI',
        StartTime: new Date(2025, 1, 24, 17, 30),
        EndTime: new Date(2025, 1, 24, 18, 30),
        RoomId: 4,
        Capacity: 70,
        Speakers: [{ name: 'Jessica Lee', title: 'NLP Specialist' }],
        Description: 'Exploring the role of NLP in artificial intelligence applications.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Developers, AI Researchers',
        EventLevel: 'Advanced',
        EventTags: ['NLP', 'AI']
    },

    // Room 1 - February 25
    {
        Id: 21,
        Subject: 'Blockchain for Beginners',
        StartTime: new Date(2025, 1, 25, 8, 30),
        EndTime: new Date(2025, 1, 25, 9, 45),
        RoomId: 1,
        Capacity: 72,
        Speakers: [{ name: 'John Williams', title: 'Blockchain Consultant' }],
        Description: 'An introduction to blockchain technology and its applications.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Beginners',
        EventLevel: 'Beginner',
        EventTags: ['Blockchain']
    },
    {
        Id: 22,
        Subject: 'AI for Business Transformation',
        StartTime: new Date(2025, 1, 25, 10, 30),
        EndTime: new Date(2025, 1, 25, 11, 30),
        RoomId: 1,
        Capacity: 100,
        Speakers: [{ name: 'Liam Brown', title: 'AI Business Strategist' }],
        Description: 'How AI can help businesses improve processes and increase efficiency.',
        Duration: '1 hour',
        EventType: 'Business Session',
        TargetAudience: 'Business Owners, Entrepreneurs',
        EventLevel: 'Intermediate',
        EventTags: ['AI', 'Business']
    },
    {
        Id: 23,
        Subject: 'Cybersecurity in the Modern World',
        StartTime: new Date(2025, 1, 25, 12, 30),
        EndTime: new Date(2025, 1, 25, 13, 0),
        RoomId: 1,
        Capacity: 80,
        Speakers: [{ name: 'Emily White', title: 'Cybersecurity Expert' }],
        Description: 'A session on the latest cybersecurity trends and best practices.',
        Duration: '1 hour',
        EventType: 'Security Session',
        TargetAudience: 'IT Professionals, Security Experts',
        EventLevel: 'Advanced',
        EventTags: ['Cybersecurity']
    },
    {
        Id: 24,
        Subject: 'Data Science for Non-Data Scientists',
        StartTime: new Date(2025, 1, 25, 14, 0),
        EndTime: new Date(2025, 1, 25, 15, 0),
        RoomId: 1,
        Capacity: 100,
        Speakers: [{ name: 'Olivia Scott', title: 'Data Science Educator' }],
        Description: 'A simplified approach to understanding data science and analytics.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Non-technical Professionals',
        EventLevel: 'Beginner',
        EventTags: ['Data Science', 'Analytics']
    },
    {
        Id: 25,
        Subject: 'AI and Machine Learning in Retail',
        StartTime: new Date(2025, 1, 25, 14, 0),
        EndTime: new Date(2025, 1, 25, 15, 0),
        RoomId: 1,
        Capacity: 120,
        Speakers: [{ name: 'Sophia Davis', title: 'AI Retail Expert' }],
        Description: 'Leveraging AI to enhance retail operations and customer experience.',
        Duration: '1 hour',
        EventType: 'Business Session',
        TargetAudience: 'Retailers, Business Leaders',
        EventLevel: 'Intermediate',
        EventTags: ['AI', 'Retail']
    },
    {
        Id: 26,
        Subject: 'Digital Transformation in Manufacturing',
        StartTime: new Date(2025, 1, 25, 15, 0),
        EndTime: new Date(2025, 1, 25, 16, 45),
        RoomId: 1,
        Capacity: 70,
        Speakers: [{ name: 'George Clark', title: 'Manufacturing Specialist' }],
        Description: 'Exploring the impact of digital transformation in the manufacturing industry.',
        Duration: '1 hour',
        EventType: 'Business Session',
        TargetAudience: 'Manufacturers, Engineers',
        EventLevel: 'Intermediate',
        EventTags: ['Digital Transformation', 'Manufacturing']
    },
    {
        Id: 69,
        Subject: 'Business Intelligence with SQL',
        StartTime: new Date(2025, 1, 25, 17, 30),
        EndTime: new Date(2025, 1, 25, 18, 30),
        RoomId: 1,
        Capacity: 80,
        Speakers: [{ name: 'Charles Brooks', title: 'SQL Expert' }],
        Description: 'Using SQL for powerful business intelligence and reporting.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Business Analysts, IT Professionals',
        EventLevel: 'Intermediate',
        EventTags: ['SQL', 'Business Intelligence']
    },

    // Room 2 - February 25
    {
        Id: 27,
        Subject: 'Introduction to Cloud Security',
        StartTime: new Date(2025, 1, 25, 8, 0),
        EndTime: new Date(2025, 1, 25, 9, 0),
        RoomId: 2,
        Capacity: 100,
        Speakers: [{ name: 'Chris Green', title: 'Cloud Security Expert' }],
        Description: 'A beginner-friendly introduction to securing cloud environments.',
        Duration: '1 hour',
        EventType: 'Security Session',
        TargetAudience: 'IT Professionals',
        EventLevel: 'Beginner',
        EventTags: ['Cloud Security']
    },
    {
        Id: 28,
        Subject: 'AI for Image Recognition',
        StartTime: new Date(2025, 1, 25, 9, 15),
        EndTime: new Date(2025, 1, 25, 10, 45),
        RoomId: 2,
        Capacity: 100,
        Speakers: [{ name: 'Michael Taylor', title: 'AI Specialist' }],
        Description: 'Exploring AI and its applications in image recognition.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Developers, AI Researchers',
        EventLevel: 'Intermediate',
        EventTags: ['AI', 'Image Recognition']
    },
    {
        Id: 29,
        Subject: 'Robotic Process Automation in Business',
        StartTime: new Date(2025, 1, 25, 11, 0),
        EndTime: new Date(2025, 1, 25, 12, 0),
        RoomId: 2,
        Capacity: 100,
        Speakers: [{ name: 'Jason Clark', title: 'RPA Consultant' }],
        Description: 'Understanding the benefits of RPA in automating business processes.',
        Duration: '1 hour',
        EventType: 'Business Session',
        TargetAudience: 'Business Owners, Analysts',
        EventLevel: 'Intermediate',
        EventTags: ['RPA', 'Automation']
    },
    {
        Id: 121,
        Subject: 'Break',
        StartTime: new Date(2025, 1, 25, 12, 0),
        EndTime: new Date(2025, 1, 25, 13, 0),
        RoomId: 2,
        Capacity: 0,
        Speakers: [],
        Description: 'Break for attendees.',
        Duration: '30 minutes',
        EventType: 'Break',
        TargetAudience: 'All Participants',
        EventLevel: 'All Levels',
        EventTags: ['Networking', 'Relax']
    },

    {
        Id: 30,
        Subject: 'Quantum Computing and AI',
        StartTime: new Date(2025, 1, 25, 13, 0),
        EndTime: new Date(2025, 1, 25, 14, 15),
        RoomId: 2,
        Capacity: 100,
        Speakers: [{ name: 'David Adams', title: 'Quantum Computing Expert' }],
        Description: 'The convergence of quantum computing and artificial intelligence.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'AI Researchers, Quantum Computing Enthusiasts',
        EventLevel: 'Advanced',
        EventTags: ['Quantum Computing', 'AI']
    },
    {
        Id: 31,
        Subject: 'Natural Language Processing (NLP) in AI',
        StartTime: new Date(2025, 1, 25, 15, 0),
        EndTime: new Date(2025, 1, 25, 16, 30),
        RoomId: 2,
        Capacity: 100,
        Speakers: [{ name: 'Jessica Lee', title: 'NLP Specialist' }],
        Description: 'Exploring the role of NLP in artificial intelligence applications.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Developers, AI Researchers',
        EventLevel: 'Advanced',
        EventTags: ['NLP', 'AI']
    },
    {
        Id: 61,
        Subject: 'Smart Cities and IoT',
        StartTime: new Date(2025, 1, 25, 17, 30),
        EndTime: new Date(2025, 1, 25, 19, 0),
        RoomId: 2,
        Capacity: 90,
        Speakers: [{ name: 'Sophia Parker', title: 'IoT Expert' }],
        Description: 'Innovative solutions for smart cities using IoT technologies.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Urban Planners, Engineers',
        EventLevel: 'Intermediate',
        EventTags: ['Smart Cities', 'IoT']
    },

    // Room 3 - February 25
    {
        Id: 32,
        Subject: 'Introduction to Python for Data Science',
        StartTime: new Date(2025, 1, 25, 9, 0),
        EndTime: new Date(2025, 1, 25, 10, 15),
        RoomId: 3,
        Capacity: 80,
        Speakers: [{ name: 'Rachel Adams', title: 'Data Scientist' }],
        Description: 'Getting started with Python for data analysis and data science.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Beginners, Developers',
        EventLevel: 'Beginner',
        EventTags: ['Python', 'Data Science']
    },
    {
        Id: 33,
        Subject: 'Exploring Machine Learning Algorithms',
        StartTime: new Date(2025, 1, 25, 10, 30),
        EndTime: new Date(2025, 1, 25, 11, 30),
        RoomId: 3,
        Capacity: 80,
        Speakers: [{ name: 'James Roberts', title: 'Machine Learning Expert' }],
        Description: 'An overview of popular machine learning algorithms and their use cases.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Data Scientists, AI Researchers',
        EventLevel: 'Intermediate',
        EventTags: ['Machine Learning']
    },
    {
        Id: 34,
        Subject: 'Deep Learning for Image Recognition',
        StartTime: new Date(2025, 1, 25, 13, 0),
        EndTime: new Date(2025, 1, 25, 14, 30),
        RoomId: 3,
        Capacity: 80,
        Speakers: [{ name: 'Mary White', title: 'Deep Learning Specialist' }],
        Description: 'Using deep learning techniques for image recognition and classification.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Data Scientists, AI Researchers',
        EventLevel: 'Advanced',
        EventTags: ['Deep Learning', 'Image Recognition']
    },
    {
        Id: 35,
        Subject: 'Building AI Models with TensorFlow',
        StartTime: new Date(2025, 1, 25, 13, 30),
        EndTime: new Date(2025, 1, 25, 14, 30),
        RoomId: 3,
        Capacity: 80,
        Speakers: [{ name: 'Peter Brown', title: 'AI Specialist' }],
        Description: 'Hands-on session on building AI models using TensorFlow.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Developers, AI Enthusiasts',
        EventLevel: 'Intermediate',
        EventTags: ['TensorFlow', 'AI']
    },
    {
        Id: 36,
        Subject: 'Data Science with R Programming',
        StartTime: new Date(2025, 1, 25, 15, 0),
        EndTime: new Date(2025, 1, 25, 17, 0),
        RoomId: 3,
        Capacity: 80,
        Speakers: [{ name: 'George Martin', title: 'Data Scientist' }],
        Description: 'A comprehensive guide to data analysis using R programming.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Data Analysts, Developers',
        EventLevel: 'Beginner',
        EventTags: ['R', 'Data Science']
    },
    {
        Id: 103,
        Subject: 'Exploring the Internet of Things (IoT)',
        StartTime: new Date(2025, 1, 25, 18, 0),
        EndTime: new Date(2025, 1, 25, 18, 45),
        RoomId: 3,
        Capacity: 80,
        Speakers: [{ name: 'Oliver White', title: 'IoT Expert' }],
        Description: 'An introduction to IoT and its applications in various industries.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'IoT Enthusiasts, Engineers',
        EventLevel: 'Intermediate',
        EventTags: ['IoT', 'Technology']
    },

    // Room 4 - February 25
    {
        Id: 37,
        Subject: 'Cloud Computing for Beginners',
        StartTime: new Date(2025, 1, 25, 8, 0),
        EndTime: new Date(2025, 1, 25, 9, 0),
        RoomId: 4,
        Capacity: 50,
        Speakers: [{ name: 'Sophia Taylor', title: 'Cloud Expert' }],
        Description: 'An introductory session on cloud computing for beginners.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Beginners',
        EventLevel: 'Beginner',
        EventTags: ['Cloud']
    },
    {
        Id: 38,
        Subject: 'AI in Education: Opportunities and Challenges',
        StartTime: new Date(2025, 1, 25, 10, 30),
        EndTime: new Date(2025, 1, 25, 12, 0),
        RoomId: 4,
        Capacity: 50,
        Speakers: [{ name: 'Mark Johnson', title: 'AI in Education Expert' }],
        Description: 'Exploring the role of AI in revolutionizing the education sector.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Educators, Tech Enthusiasts',
        EventLevel: 'Intermediate',
        EventTags: ['AI', 'Education']
    },
    {
        Id: 39,
        Subject: 'Robotics in Healthcare',
        StartTime: new Date(2025, 1, 25, 13, 30),
        EndTime: new Date(2025, 1, 25, 14, 30),
        RoomId: 4,
        Capacity: 50,
        Speakers: [{ name: 'James Taylor', title: 'Robotics Expert' }],
        Description: 'Exploring the use of robotics in healthcare settings.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Healthcare Professionals',
        EventLevel: 'Advanced',
        EventTags: ['Robotics', 'Healthcare']
    },

    {
        Id: 40,
        Subject: 'Building Multi-Language Websites',
        StartTime: new Date(2025, 1, 25, 15, 30),
        EndTime: new Date(2025, 1, 25, 17, 30),
        RoomId: 4,
        Capacity: 40,
        Speakers: [{ name: 'Daniel Fisher', title: 'Full-Stack Developer' }],
        Description: 'How to create websites with multiple languages using modern web technologies.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Frontend Developers, Full-Stack Developers',
        EventLevel: 'Intermediate',
        EventTags: ['Internationalization', 'Web Development']
    },

    // Room 1 - February 26
    {
        Id: 41,
        Subject: 'AI in Healthcare',
        StartTime: new Date(2025, 1, 26, 8, 0),
        EndTime: new Date(2025, 1, 26, 8, 45),
        RoomId: 1,
        Capacity: 72,
        Speakers: [{ name: 'Dr. William Grant', title: 'Healthcare AI Specialist' }],
        Description: 'Exploring the potential of AI applications in healthcare.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Healthcare Professionals',
        EventLevel: 'Intermediate',
        EventTags: ['AI', 'Healthcare']
    },
    {
        Id: 42,
        Subject: 'Robotics Process Automation',
        StartTime: new Date(2025, 1, 26, 9, 15),
        EndTime: new Date(2025, 1, 26, 10, 30),
        RoomId: 1,
        Capacity: 90,
        Speakers: [{ name: 'James Thompson', title: 'RPA Specialist' }],
        Description: 'A comprehensive session on how RPA can automate business processes.',
        Duration: '1 hour',
        EventType: 'Business Session',
        TargetAudience: 'Business Leaders, IT Professionals',
        EventLevel: 'Advanced',
        EventTags: ['RPA', 'Automation']
    },
    {
        Id: 43,
        Subject: 'Data Science for Finance',
        StartTime: new Date(2025, 1, 26, 11, 0),
        EndTime: new Date(2025, 1, 26, 11, 45),
        RoomId: 1,
        Capacity: 90,
        Speakers: [{ name: 'Daniel Carter', title: 'Financial Analyst' }],
        Description: 'How data science is transforming the financial industry.',
        Duration: '1 hour',
        EventType: 'Business Session',
        TargetAudience: 'Finance Professionals',
        EventLevel: 'Intermediate',
        EventTags: ['Data Science', 'Finance']
    },
    {
        Id: 44,
        Subject: 'Digital Transformation with AI',
        StartTime: new Date(2025, 1, 26, 13, 0),
        EndTime: new Date(2025, 1, 26, 14, 30),
        RoomId: 1,
        Capacity: 100,
        Speakers: [{ name: 'Evelyn Miller', title: 'Digital Transformation Expert' }],
        Description: 'Implementing AI to achieve digital transformation across industries.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Executives, IT Leaders',
        EventLevel: 'Advanced',
        EventTags: ['AI', 'Digital Transformation']
    },
    {
        Id: 46,
        Subject: 'Blockchain for Enterprise',
        StartTime: new Date(2025, 1, 26, 18, 0),
        EndTime: new Date(2025, 1, 26, 18, 30),
        RoomId: 1,
        Capacity: 100,
        Speakers: [{ name: 'Liam Davis', title: 'Blockchain Architect' }],
        Description: 'Exploring the use of blockchain in enterprise solutions.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Enterprise Architects, Developers',
        EventLevel: 'Advanced',
        EventTags: ['Blockchain', 'Enterprise']
    },

    // Room 2 - February 26
    {
        Id: 47,
        Subject: 'Data Science with Python',
        StartTime: new Date(2025, 1, 26, 9, 0),
        EndTime: new Date(2025, 1, 26, 10, 30),
        RoomId: 2,
        Capacity: 100,
        Speakers: [{ name: 'Mark Robinson', title: 'Data Scientist' }],
        Description: 'Using Python for data analysis and predictive modeling.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Beginners, Data Enthusiasts',
        EventLevel: 'Beginner',
        EventTags: ['Python', 'Data Science']
    },
    {
        Id: 48,
        Subject: 'Introduction to Cloud Computing',
        StartTime: new Date(2025, 1, 26, 10, 45),
        EndTime: new Date(2025, 1, 26, 12, 30),
        RoomId: 2,
        Capacity: 100,
        Speakers: [{ name: 'Sophia Davis', title: 'Cloud Solutions Architect' }],
        Description: 'Exploring the fundamentals of cloud computing and its services.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'IT Professionals, Developers',
        EventLevel: 'Beginner',
        EventTags: ['Cloud', 'Computing']
    },
    {
        Id: 50,
        Subject: 'Machine Learning for Data Scientists',
        StartTime: new Date(2025, 1, 26, 13, 30),
        EndTime: new Date(2025, 1, 26, 14, 30),
        RoomId: 2,
        Capacity: 100,
        Speakers: [{ name: 'Emily Clarke', title: 'Machine Learning Expert' }],
        Description: 'Practical examples and techniques for building machine learning models.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Data Scientists, Engineers',
        EventLevel: 'Intermediate',
        EventTags: ['Machine Learning']
    },
    {
        Id: 51,
        Subject: 'Business Intelligence with Power BI',
        StartTime: new Date(2025, 1, 26, 15, 30),
        EndTime: new Date(2025, 1, 26, 17, 30),
        RoomId: 2,
        Capacity: 100,
        Speakers: [{ name: 'John Mark', title: 'Power BI Expert' }],
        Description: 'Leveraging Power BI for effective business intelligence and analytics.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Business Analysts, IT Professionals',
        EventLevel: 'Intermediate',
        EventTags: ['Business Intelligence', 'Power BI']
    },

    // Room 3 - February 26
    {
        Id: 52,
        Subject: 'Machine Learning for Developers',
        StartTime: new Date(2025, 1, 26, 8, 30),
        EndTime: new Date(2025, 1, 26, 9, 30),
        RoomId: 3,
        Capacity: 80,
        Speakers: [{ name: 'David Johnson', title: 'ML Developer' }],
        Description: 'A hands-on workshop on building machine learning models.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Developers, AI Enthusiasts',
        EventLevel: 'Intermediate',
        EventTags: ['Machine Learning', 'Development']
    },
    {
        Id: 53,
        Subject: 'Introduction to R for Data Science',
        StartTime: new Date(2025, 1, 26, 10, 0),
        EndTime: new Date(2025, 1, 26, 11, 0),
        RoomId: 3,
        Capacity: 80,
        Speakers: [{ name: 'Sarah Lee', title: 'Data Scientist' }],
        Description: 'Learning R programming for data analysis and visualization.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Data Enthusiasts, Analysts',
        EventLevel: 'Beginner',
        EventTags: ['R', 'Data Science']
    },
    {
        Id: 54,
        Subject: 'Advanced Data Visualization with Tableau',
        StartTime: new Date(2025, 1, 26, 11, 0),
        EndTime: new Date(2025, 1, 26, 12, 0),
        RoomId: 3,
        Capacity: 80,
        Speakers: [{ name: 'Helen Young', title: 'Tableau Expert' }],
        Description: 'Techniques for creating advanced data visualizations using Tableau.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Data Analysts, Business Analysts',
        EventLevel: 'Advanced',
        EventTags: ['Data Visualization', 'Tableau']
    },
    {
        Id: 99,
        Subject: 'Lunch Break',
        StartTime: new Date(2025, 1, 26, 12, 0),
        EndTime: new Date(2025, 1, 26, 13, 0),
        RoomId: 3,
        Capacity: 0,
        Speakers: [],
        Description: 'Lunch Break',
        Duration: '30 minutes',
        EventType: 'Break',
        TargetAudience: 'All Participants',
        EventLevel: 'All Levels',
        EventTags: ['Networking', 'Relax']
    },

    {
        Id: 55,
        Subject: 'Deep Learning with TensorFlow',
        StartTime: new Date(2025, 1, 26, 13, 0),
        EndTime: new Date(2025, 1, 26, 14, 30),
        RoomId: 3,
        Capacity: 80,
        Speakers: [{ name: 'Victor Bell', title: 'Deep Learning Engineer' }],
        Description: 'An introduction to building deep learning models with TensorFlow.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'AI Engineers, Machine Learning Enthusiasts',
        EventLevel: 'Advanced',
        EventTags: ['Deep Learning', 'TensorFlow']
    },
    {
        Id: 98,
        Subject: 'Time Series Forecasting',
        StartTime: new Date(2025, 1, 26, 16, 0),
        EndTime: new Date(2025, 1, 26, 18, 0),
        RoomId: 3,
        Capacity: 50,
        Speakers: [{ name: 'James Davis', title: 'Time Series Expert' }],
        Description: 'An introduction to time series forecasting and its application in predictive modeling.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Data Scientists, Analysts',
        EventLevel: 'Intermediate',
        EventTags: ['Time Series', 'Forecasting']
    },


    // Room 4 - February 26
    {
        Id: 56,
        Subject: 'Introduction to Cloud Security',
        StartTime: new Date(2025, 1, 26, 8, 0),
        EndTime: new Date(2025, 1, 26, 9, 0),
        RoomId: 4,
        Capacity: 50,
        Speakers: [{ name: 'Linda Williams', title: 'Cloud Security Expert' }],
        Description: 'An overview of cloud security practices and tools.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'IT Professionals',
        EventLevel: 'Intermediate',
        EventTags: ['Cloud Security']
    },
    {
        Id: 57,
        Subject: 'AI for Manufacturing',
        StartTime: new Date(2025, 1, 26, 9, 30),
        EndTime: new Date(2025, 1, 26, 10, 30),
        RoomId: 4,
        Capacity: 50,
        Speakers: [{ name: 'Henry Wilson', title: 'AI Expert' }],
        Description: 'Exploring AI applications in manufacturing and production.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Manufacturers, Engineers',
        EventLevel: 'Advanced',
        EventTags: ['AI', 'Manufacturing']
    },
    {
        Id: 58,
        Subject: 'Blockchain for Beginners',
        StartTime: new Date(2025, 1, 26, 11, 0),
        EndTime: new Date(2025, 1, 26, 12, 0),
        RoomId: 4,
        Capacity: 50,
        Speakers: [{ name: 'Rachel Harris', title: 'Blockchain Consultant' }],
        Description: 'An introductory session on blockchain and its applications.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Developers, Entrepreneurs',
        EventLevel: 'Beginner',
        EventTags: ['Blockchain']
    },
    {
        Id: 59,
        Subject: 'Building Scalable Apps in the Cloud',
        StartTime: new Date(2025, 1, 26, 12, 30),
        EndTime: new Date(2025, 1, 26, 13, 30),
        RoomId: 4,
        Capacity: 50,
        Speakers: [{ name: 'Steven Davis', title: 'Cloud Developer' }],
        Description: 'Techniques for developing scalable cloud applications.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Developers, Cloud Engineers',
        EventLevel: 'Intermediate',
        EventTags: ['Cloud Development']
    },

    // Room 1 - February 27
    {
        Id: 60,
        Subject: 'AI in Manufacturing',
        StartTime: new Date(2025, 1, 27, 8, 0),
        EndTime: new Date(2025, 1, 27, 9, 0),
        RoomId: 1,
        Capacity: 72,
        Speakers: [{ name: 'Gregory Moore', title: 'AI Specialist' }],
        Description: 'Exploring AI-driven processes in manufacturing industries.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Manufacturers, Engineers',
        EventLevel: 'Intermediate',
        EventTags: ['AI', 'Manufacturing']
    },
    {
        Id: 61,
        Subject: 'Smart Cities and IoT',
        StartTime: new Date(2025, 1, 27, 9, 30),
        EndTime: new Date(2025, 1, 27, 10, 30),
        RoomId: 1,
        Capacity: 90,
        Speakers: [{ name: 'Sophia Parker', title: 'IoT Expert' }],
        Description: 'Innovative solutions for smart cities using IoT technologies.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Urban Planners, Engineers',
        EventLevel: 'Intermediate',
        EventTags: ['Smart Cities', 'IoT']
    },
    {
        Id: 62,
        Subject: 'AI and Robotics in Healthcare',
        StartTime: new Date(2025, 1, 27, 11, 0),
        EndTime: new Date(2025, 1, 27, 12, 0),
        RoomId: 1,
        Capacity: 120,
        Speakers: [{ name: 'Dr. Alan Roberts', title: 'Healthcare AI Specialist' }],
        Description: 'Application of AI and robotics in improving healthcare delivery.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Healthcare Professionals',
        EventLevel: 'Advanced',
        EventTags: ['AI', 'Robotics', 'Healthcare']
    },
    {
        Id: 63,
        Subject: 'Cloud Security Best Practices',
        StartTime: new Date(2025, 1, 27, 12, 30),
        EndTime: new Date(2025, 1, 27, 13, 30),
        RoomId: 1,
        Capacity: 120,
        Speakers: [{ name: 'Samuel Williams', title: 'Cloud Security Consultant' }],
        Description: 'A session on ensuring cloud security using best practices.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Cloud Engineers, IT Security Professionals',
        EventLevel: 'Intermediate',
        EventTags: ['Cloud Security']
    },

    // Room 2 - February 27
    {
        Id: 64,
        Subject: 'Introduction to Artificial Intelligence',
        StartTime: new Date(2025, 1, 27, 8, 0),
        EndTime: new Date(2025, 1, 27, 9, 0),
        RoomId: 2,
        Capacity: 100,
        Speakers: [{ name: 'Ethan Clarke', title: 'AI Enthusiast' }],
        Description: 'A beginner’s guide to understanding artificial intelligence.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Beginners, AI Enthusiasts',
        EventLevel: 'Beginner',
        EventTags: ['AI', 'Introduction']
    },
    {
        Id: 65,
        Subject: 'Cloud-Native Development with Kubernetes',
        StartTime: new Date(2025, 1, 27, 9, 30),
        EndTime: new Date(2025, 1, 27, 10, 30),
        RoomId: 2,
        Capacity: 100,
        Speakers: [{ name: 'Olivia Green', title: 'Cloud Architect' }],
        Description: 'Building and deploying cloud-native applications using Kubernetes.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Developers, IT Professionals',
        EventLevel: 'Advanced',
        EventTags: ['Kubernetes', 'Cloud']
    },
    {
        Id: 66,
        Subject: 'Data Science for Business Analytics',
        StartTime: new Date(2025, 1, 27, 11, 0),
        EndTime: new Date(2025, 1, 27, 12, 0),
        RoomId: 2,
        Capacity: 100,
        Speakers: [{ name: 'Mia Harris', title: 'Data Scientist' }],
        Description: 'How data science can optimize business decision-making.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Business Analysts, Data Scientists',
        EventLevel: 'Intermediate',
        EventTags: ['Data Science', 'Business Analytics']
    },
    {
        Id: 67,
        Subject: 'Cybersecurity in Cloud Computing',
        StartTime: new Date(2025, 1, 27, 12, 30),
        EndTime: new Date(2025, 1, 27, 13, 30),
        RoomId: 2,
        Capacity: 100,
        Speakers: [{ name: 'Henry Davis', title: 'Cybersecurity Specialist' }],
        Description: 'Ensuring cloud security in today’s highly connected world.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'IT Professionals, Developers',
        EventLevel: 'Advanced',
        EventTags: ['Cybersecurity', 'Cloud Computing']
    },

    // Room 3 - February 27
    {
        Id: 68,
        Subject: 'Introduction to TensorFlow for AI',
        StartTime: new Date(2025, 1, 27, 8, 0),
        EndTime: new Date(2025, 1, 27, 9, 0),
        RoomId: 3,
        Capacity: 80,
        Speakers: [{ name: 'Rachel Stone', title: 'AI Engineer' }],
        Description: 'Getting started with TensorFlow for building AI models.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'AI Enthusiasts, Developers',
        EventLevel: 'Beginner',
        EventTags: ['TensorFlow', 'AI']
    },
    {
        Id: 69,
        Subject: 'Business Intelligence with SQL',
        StartTime: new Date(2025, 1, 27, 9, 30),
        EndTime: new Date(2025, 1, 27, 10, 30),
        RoomId: 3,
        Capacity: 80,
        Speakers: [{ name: 'Charles Brooks', title: 'SQL Expert' }],
        Description: 'Using SQL for powerful business intelligence and reporting.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Business Analysts, IT Professionals',
        EventLevel: 'Intermediate',
        EventTags: ['SQL', 'Business Intelligence']
    },
    {
        Id: 70,
        Subject: 'Advanced Python for Data Science',
        StartTime: new Date(2025, 1, 27, 11, 0),
        EndTime: new Date(2025, 1, 27, 12, 0),
        RoomId: 3,
        Capacity: 80,
        Speakers: [{ name: 'Linda Turner', title: 'Python Expert' }],
        Description: 'Advanced Python techniques for data analysis and modeling.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Data Scientists, Developers',
        EventLevel: 'Advanced',
        EventTags: ['Python', 'Data Science']
    },
    {
        Id: 71,
        Subject: 'Deep Learning for Computer Vision',
        StartTime: new Date(2025, 1, 27, 12, 30),
        EndTime: new Date(2025, 1, 27, 13, 30),
        RoomId: 3,
        Capacity: 80,
        Speakers: [{ name: 'Nathan Bell', title: 'AI Researcher' }],
        Description: 'Techniques for applying deep learning to computer vision tasks.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'AI Enthusiasts, Developers',
        EventLevel: 'Advanced',
        EventTags: ['Deep Learning', 'Computer Vision']
    },

    // Room 4 - February 27
    {
        Id: 72,
        Subject: 'IoT for Smart Homes',
        StartTime: new Date(2025, 1, 27, 8, 0),
        EndTime: new Date(2025, 1, 27, 9, 0),
        RoomId: 4,
        Capacity: 50,
        Speakers: [{ name: 'Benjamin Harris', title: 'IoT Specialist' }],
        Description: 'Applications of IoT for automating and optimizing smart homes.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Smart Home Enthusiasts, Engineers',
        EventLevel: 'Intermediate',
        EventTags: ['IoT', 'Smart Homes']
    },
    {
        Id: 73,
        Subject: 'Ethical Hacking and Penetration Testing',
        StartTime: new Date(2025, 1, 27, 9, 30),
        EndTime: new Date(2025, 1, 27, 10, 30),
        RoomId: 4,
        Capacity: 50,
        Speakers: [{ name: 'Jason White', title: 'Ethical Hacker' }],
        Description: 'A session on ethical hacking and penetration testing techniques.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Security Professionals',
        EventLevel: 'Intermediate',
        EventTags: ['Ethical Hacking', 'Penetration Testing']
    },
    {
        Id: 74,
        Subject: 'Quantum Computing for Beginners',
        StartTime: new Date(2025, 1, 27, 11, 0),
        EndTime: new Date(2025, 1, 27, 12, 0),
        RoomId: 4,
        Capacity: 50,
        Speakers: [{ name: 'James Black', title: 'Quantum Computing Expert' }],
        Description: 'An introduction to the principles of quantum computing.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Tech Enthusiasts, Beginners',
        EventLevel: 'Beginner',
        EventTags: ['Quantum Computing']
    },
    {
        Id: 75,
        Subject: 'Blockchain for Developers',
        StartTime: new Date(2025, 1, 27, 12, 30),
        EndTime: new Date(2025, 1, 27, 13, 30),
        RoomId: 4,
        Capacity: 50,
        Speakers: [{ name: 'Cathy Green', title: 'Blockchain Developer' }],
        Description: 'Advanced blockchain development techniques and tools.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Blockchain Developers',
        EventLevel: 'Advanced',
        EventTags: ['Blockchain', 'Development']
    },

    // Room 1 - February 28
    {
        Id: 76,
        Subject: 'Data Science and Machine Learning',
        StartTime: new Date(2025, 1, 28, 8, 0),
        EndTime: new Date(2025, 1, 28, 9, 0),
        RoomId: 1,
        Capacity: 72,
        Speakers: [{ name: 'Ethan Wells', title: 'Data Scientist' }],
        Description: 'An introduction to machine learning algorithms and techniques.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Data Scientists, AI Enthusiasts',
        EventLevel: 'Intermediate',
        EventTags: ['Data Science', 'Machine Learning']
    },
    {
        Id: 77,
        Subject: 'Serverless Computing with AWS Lambda',
        StartTime: new Date(2025, 1, 28, 9, 30),
        EndTime: new Date(2025, 1, 28, 10, 30),
        RoomId: 1,
        Capacity: 90,
        Speakers: [{ name: 'Isabella Cooper', title: 'Cloud Architect' }],
        Description: 'Learn how to build and deploy serverless applications using AWS Lambda.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Developers, Cloud Professionals',
        EventLevel: 'Advanced',
        EventTags: ['Serverless', 'AWS Lambda']
    },
    {
        Id: 78,
        Subject: 'Blockchain and Smart Contracts',
        StartTime: new Date(2025, 1, 28, 11, 0),
        EndTime: new Date(2025, 1, 28, 12, 0),
        RoomId: 1,
        Capacity: 120,
        Speakers: [{ name: 'Oliver Smith', title: 'Blockchain Developer' }],
        Description: 'Understanding how blockchain and smart contracts are revolutionizing industries.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Blockchain Developers, Entrepreneurs',
        EventLevel: 'Advanced',
        EventTags: ['Blockchain', 'Smart Contracts']
    },
    {
        Id: 79,
        Subject: 'Introduction to Deep Learning with Keras',
        StartTime: new Date(2025, 1, 28, 12, 30),
        EndTime: new Date(2025, 1, 28, 13, 30),
        RoomId: 1,
        Capacity: 120,
        Speakers: [{ name: 'Jade Miller', title: 'AI Researcher' }],
        Description: 'A beginner-friendly session to learn about deep learning using Keras.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'AI Enthusiasts, Developers',
        EventLevel: 'Beginner',
        EventTags: ['Deep Learning', 'Keras']
    },

    // Room 2 - February 28
    {
        Id: 80,
        Subject: 'Web Development with React.js',
        StartTime: new Date(2025, 1, 28, 8, 0),
        EndTime: new Date(2025, 1, 28, 9, 0),
        RoomId: 2,
        Capacity: 100,
        Speakers: [{ name: 'Liam Brown', title: 'Frontend Developer' }],
        Description: 'Building interactive UIs with React.js and Redux.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Web Developers, React Enthusiasts',
        EventLevel: 'Intermediate',
        EventTags: ['React.js', 'Frontend Development']
    },
    {
        Id: 81,
        Subject: 'AI-Powered Chatbots for Business',
        StartTime: new Date(2025, 1, 28, 9, 30),
        EndTime: new Date(2025, 1, 28, 10, 30),
        RoomId: 2,
        Capacity: 100,
        Speakers: [{ name: 'Megan Taylor', title: 'AI Specialist' }],
        Description: 'How to develop and deploy AI-powered chatbots for business applications.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Business Owners, Developers',
        EventLevel: 'Intermediate',
        EventTags: ['AI', 'Chatbots']
    },
    {
        Id: 82,
        Subject: 'Server-Side Programming with Node.js',
        StartTime: new Date(2025, 1, 28, 11, 0),
        EndTime: new Date(2025, 1, 28, 12, 0),
        RoomId: 2,
        Capacity: 100,
        Speakers: [{ name: 'Ella Jones', title: 'Node.js Developer' }],
        Description: 'Learn how to build scalable applications with Node.js.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Backend Developers, JavaScript Enthusiasts',
        EventLevel: 'Intermediate',
        EventTags: ['Node.js', 'Backend Development']
    },
    {
        Id: 83,
        Subject: 'Data Visualization with Tableau',
        StartTime: new Date(2025, 1, 28, 12, 30),
        EndTime: new Date(2025, 1, 28, 13, 30),
        RoomId: 2,
        Capacity: 100,
        Speakers: [{ name: 'Aiden Clark', title: 'Data Analyst' }],
        Description: 'Transform your data into insightful visualizations with Tableau.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Data Analysts, Business Intelligence Professionals',
        EventLevel: 'Intermediate',
        EventTags: ['Tableau', 'Data Visualization']
    },

    // Room 3 - February 28
    {
        Id: 84,
        Subject: 'Building Scalable Microservices with Spring Boot',
        StartTime: new Date(2025, 1, 28, 8, 0),
        EndTime: new Date(2025, 1, 28, 9, 0),
        RoomId: 3,
        Capacity: 80,
        Speakers: [{ name: 'Avery Green', title: 'Java Developer' }],
        Description: 'Learn to create microservices using Spring Boot.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Backend Developers, Java Enthusiasts',
        EventLevel: 'Intermediate',
        EventTags: ['Microservices', 'Spring Boot']
    },
    {
        Id: 85,
        Subject: 'Exploring Augmented Reality (AR)',
        StartTime: new Date(2025, 1, 28, 9, 30),
        EndTime: new Date(2025, 1, 28, 10, 30),
        RoomId: 3,
        Capacity: 80,
        Speakers: [{ name: 'Max Wilson', title: 'AR Developer' }],
        Description: 'Discover the potential of augmented reality in tech industries.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'AR Enthusiasts, Developers',
        EventLevel: 'Intermediate',
        EventTags: ['AR', 'Technology']
    },
    {
        Id: 86,
        Subject: 'JavaScript for Modern Web Development',
        StartTime: new Date(2025, 1, 28, 11, 0),
        EndTime: new Date(2025, 1, 28, 12, 0),
        RoomId: 3,
        Capacity: 80,
        Speakers: [{ name: 'James Daniels', title: 'JavaScript Developer' }],
        Description: 'Modern JavaScript tools for building robust web applications.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Web Developers, JavaScript Enthusiasts',
        EventLevel: 'Intermediate',
        EventTags: ['JavaScript', 'Web Development']
    },
    {
        Id: 87,
        Subject: 'Deep Learning with PyTorch',
        StartTime: new Date(2025, 1, 28, 12, 30),
        EndTime: new Date(2025, 1, 28, 13, 30),
        RoomId: 3,
        Capacity: 80,
        Speakers: [{ name: 'Sophia Williams', title: 'AI Researcher' }],
        Description: 'Learn to build deep learning models using PyTorch.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'AI Enthusiasts, Developers',
        EventLevel: 'Intermediate',
        EventTags: ['Deep Learning', 'PyTorch']
    },

    // Room 4 - February 28
    {
        Id: 88,
        Subject: 'Introduction to Kubernetes for DevOps',
        StartTime: new Date(2025, 1, 28, 8, 0),
        EndTime: new Date(2025, 1, 28, 9, 0),
        RoomId: 4,
        Capacity: 50,
        Speakers: [{ name: 'Lily Evans', title: 'DevOps Engineer' }],
        Description: 'An introductory workshop on Kubernetes for DevOps practitioners.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'DevOps Professionals',
        EventLevel: 'Beginner',
        EventTags: ['Kubernetes', 'DevOps']
    },
    {
        Id: 89,
        Subject: 'Intro to GraphQL',
        StartTime: new Date(2025, 1, 28, 9, 30),
        EndTime: new Date(2025, 1, 28, 10, 30),
        RoomId: 4,
        Capacity: 50,
        Speakers: [{ name: 'Daniel Moore', title: 'Frontend Developer' }],
        Description: 'Learn how to create APIs with GraphQL.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Frontend Developers, Backend Developers',
        EventLevel: 'Intermediate',
        EventTags: ['GraphQL', 'API']
    },
    {
        Id: 90,
        Subject: 'Introduction to Swift Programming',
        StartTime: new Date(2025, 1, 28, 11, 0),
        EndTime: new Date(2025, 1, 28, 12, 0),
        RoomId: 4,
        Capacity: 50,
        Speakers: [{ name: 'Isabelle Scott', title: 'iOS Developer' }],
        Description: 'Learn the basics of Swift programming for iOS development.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'iOS Developers, Beginners',
        EventLevel: 'Beginner',
        EventTags: ['Swift', 'iOS Development']
    },
    {
        Id: 91,
        Subject: 'DevOps Best Practices',
        StartTime: new Date(2025, 1, 28, 12, 30),
        EndTime: new Date(2025, 1, 28, 13, 30),
        RoomId: 4,
        Capacity: 50,
        Speakers: [{ name: 'Rachel Lee', title: 'DevOps Expert' }],
        Description: 'Best practices for continuous integration and continuous deployment in DevOps.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'DevOps Engineers',
        EventLevel: 'Intermediate',
        EventTags: ['DevOps', 'CI/CD']
    },

    // Room 1 - March 1
    {
        Id: 92,
        Subject: 'Artificial Intelligence in Healthcare',
        StartTime: new Date(2025, 2, 1, 8, 0),
        EndTime: new Date(2025, 2, 1, 9, 0),
        RoomId: 1,
        Capacity: 72,
        Speakers: [{ name: 'Dr. Emily Clark', title: 'AI Healthcare Specialist' }],
        Description: 'Exploring AI technologies in the healthcare industry.',
        Duration: '1 hour',
        EventType: 'Keynote',
        TargetAudience: 'Healthcare Professionals, AI Enthusiasts',
        EventLevel: 'Advanced',
        EventTags: ['AI', 'Healthcare']
    },
    {
        Id: 93,
        Subject: 'Cloud Computing with Google Cloud Platform',
        StartTime: new Date(2025, 2, 1, 9, 30),
        EndTime: new Date(2025, 2, 1, 10, 30),
        RoomId: 1,
        Capacity: 90,
        Speakers: [{ name: 'Lucas Gray', title: 'Cloud Engineer' }],
        Description: 'Learn how to use Google Cloud for building scalable applications.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Cloud Professionals, Developers',
        EventLevel: 'Intermediate',
        EventTags: ['Google Cloud', 'Cloud Computing']
    },
    {
        Id: 94,
        Subject: 'Advanced Data Analytics with Python',
        StartTime: new Date(2025, 2, 1, 11, 0),
        EndTime: new Date(2025, 2, 1, 12, 0),
        RoomId: 1,
        Capacity: 120,
        Speakers: [{ name: 'Michael Lewis', title: 'Data Scientist' }],
        Description: 'Learn advanced data analytics techniques using Python.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Data Analysts, Data Scientists',
        EventLevel: 'Advanced',
        EventTags: ['Python', 'Data Analytics']
    },
    {
        Id: 95,
        Subject: 'Building Scalable Web Applications with Angular',
        StartTime: new Date(2025, 2, 1, 12, 30),
        EndTime: new Date(2025, 2, 1, 13, 30),
        RoomId: 1,
        Capacity: 120,
        Speakers: [{ name: 'Zoe Harris', title: 'Frontend Developer' }],
        Description: 'Create high-performing web applications using Angular.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Frontend Developers, Web Developers',
        EventLevel: 'Intermediate',
        EventTags: ['Angular', 'Web Development']
    },

    // Room 2 - March 1
    {
        Id: 96,
        Subject: 'Introduction to Kubernetes',
        StartTime: new Date(2025, 2, 1, 8, 0),
        EndTime: new Date(2025, 2, 1, 9, 0),
        RoomId: 2,
        Capacity: 100,
        Speakers: [{ name: 'Mason Parker', title: 'DevOps Expert' }],
        Description: 'Learn the basics of Kubernetes and container orchestration.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'DevOps Engineers, IT Professionals',
        EventLevel: 'Beginner',
        EventTags: ['Kubernetes', 'DevOps']
    },
    {
        Id: 97,
        Subject: 'Blockchain for Beginners',
        StartTime: new Date(2025, 2, 1, 9, 30),
        EndTime: new Date(2025, 2, 1, 10, 30),
        RoomId: 2,
        Capacity: 100,
        Speakers: [{ name: 'Nina Turner', title: 'Blockchain Developer' }],
        Description: 'Understand blockchain technology and its real-world applications.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Blockchain Enthusiasts, Developers',
        EventLevel: 'Beginner',
        EventTags: ['Blockchain', 'Crypto']
    },
    {
        Id: 98,
        Subject: 'Building RESTful APIs with Express.js',
        StartTime: new Date(2025, 2, 1, 11, 0),
        EndTime: new Date(2025, 2, 1, 12, 0),
        RoomId: 2,
        Capacity: 100,
        Speakers: [{ name: 'Oliver Reid', title: 'Backend Developer' }],
        Description: 'Learn to build robust RESTful APIs using Express.js.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Backend Developers, JavaScript Developers',
        EventLevel: 'Intermediate',
        EventTags: ['Express.js', 'API Development']
    },
    {
        Id: 99,
        Subject: 'Cybersecurity for Developers',
        StartTime: new Date(2025, 2, 1, 12, 30),
        EndTime: new Date(2025, 2, 1, 13, 30),
        RoomId: 2,
        Capacity: 100,
        Speakers: [{ name: 'James Mitchell', title: 'Cybersecurity Expert' }],
        Description: 'Understanding the essentials of cybersecurity for software development.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Developers, IT Professionals',
        EventLevel: 'Intermediate',
        EventTags: ['Cybersecurity', 'Development']
    },

    // Room 3 - March 1
    {
        Id: 100,
        Subject: 'Introduction to SwiftUI for iOS',
        StartTime: new Date(2025, 2, 1, 8, 0),
        EndTime: new Date(2025, 2, 1, 9, 0),
        RoomId: 3,
        Capacity: 80,
        Speakers: [{ name: 'Sophia Moore', title: 'iOS Developer' }],
        Description: 'Learn the basics of building apps with SwiftUI.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'iOS Developers, Beginners',
        EventLevel: 'Beginner',
        EventTags: ['SwiftUI', 'iOS Development']
    },
    {
        Id: 101,
        Subject: 'Mobile App Development with Flutter',
        StartTime: new Date(2025, 2, 1, 9, 30),
        EndTime: new Date(2025, 2, 1, 10, 30),
        RoomId: 3,
        Capacity: 80,
        Speakers: [{ name: 'Benjamin King', title: 'Flutter Developer' }],
        Description: 'Cross-platform mobile app development using Flutter.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Mobile Developers, Beginners',
        EventLevel: 'Intermediate',
        EventTags: ['Flutter', 'Mobile Development']
    },
    {
        Id: 102,
        Subject: 'Data Engineering with Apache Kafka',
        StartTime: new Date(2025, 2, 1, 11, 0),
        EndTime: new Date(2025, 2, 1, 12, 0),
        RoomId: 3,
        Capacity: 80,
        Speakers: [{ name: 'David Walker', title: 'Data Engineer' }],
        Description: 'Learn how to use Apache Kafka for building data pipelines.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Data Engineers, Developers',
        EventLevel: 'Advanced',
        EventTags: ['Apache Kafka', 'Data Engineering']
    },
    {
        Id: 103,
        Subject: 'Exploring the Internet of Things (IoT)',
        StartTime: new Date(2025, 2, 1, 12, 30),
        EndTime: new Date(2025, 2, 1, 13, 30),
        RoomId: 3,
        Capacity: 80,
        Speakers: [{ name: 'Oliver White', title: 'IoT Expert' }],
        Description: 'An introduction to IoT and its applications in various industries.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'IoT Enthusiasts, Engineers',
        EventLevel: 'Intermediate',
        EventTags: ['IoT', 'Technology']
    },

    // Room 4 - March 1
    {
        Id: 104,
        Subject: 'Continuous Integration with Jenkins',
        StartTime: new Date(2025, 2, 1, 8, 0),
        EndTime: new Date(2025, 2, 1, 9, 0),
        RoomId: 4,
        Capacity: 50,
        Speakers: [{ name: 'Eliza Harris', title: 'DevOps Engineer' }],
        Description: 'Automate your build and deployment process with Jenkins.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'DevOps Engineers',
        EventLevel: 'Intermediate',
        EventTags: ['Jenkins', 'CI/CD']
    },
    {
        Id: 105,
        Subject: 'Getting Started with Go Programming',
        StartTime: new Date(2025, 2, 1, 9, 30),
        EndTime: new Date(2025, 2, 1, 10, 30),
        RoomId: 4,
        Capacity: 50,
        Speakers: [{ name: 'Charlotte King', title: 'Go Developer' }],
        Description: 'Learn Go programming language for building fast and scalable applications.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Go Developers, Beginners',
        EventLevel: 'Beginner',
        EventTags: ['Go', 'Programming']
    },
    {
        Id: 106,
        Subject: 'Introduction to DevSecOps',
        StartTime: new Date(2025, 2, 1, 11, 0),
        EndTime: new Date(2025, 2, 1, 12, 0),
        RoomId: 4,
        Capacity: 50,
        Speakers: [{ name: 'Ella Turner', title: 'Security Expert' }],
        Description: 'Learn about the importance of security in DevOps and how to integrate security into the pipeline.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'DevOps Engineers, Security Professionals',
        EventLevel: 'Intermediate',
        EventTags: ['DevSecOps', 'Security']
    },
    {
        Id: 107,
        Subject: 'Exploring Python for Web Development',
        StartTime: new Date(2025, 2, 1, 12, 30),
        EndTime: new Date(2025, 2, 1, 13, 30),
        RoomId: 4,
        Capacity: 50,
        Speakers: [{ name: 'Isabelle Moore', title: 'Web Developer' }],
        Description: 'Building web applications with Python and Django.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Web Developers, Python Enthusiasts',
        EventLevel: 'Beginner',
        EventTags: ['Python', 'Web Development']
    }
];

let availableEvents = [
    {
        Id: 1,
        Subject: 'AI in Robotics',
        Capacity: 85,
        Speakers: [{ name: 'Dr. Alan Smith', title: 'AI Researcher' }],
        Description: 'Exploring the applications of AI in robotics.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'AI Engineers',
        EventLevel: 'Intermediate',
        EventTags: ['AI', 'Robotics']
    },
    {
        Id: 2,
        Subject: 'Blockchain for Enterprises',
        StartTime: new Date(2025, 1, 25, 10, 0),
        EndTime: new Date(2025, 1, 25, 11, 0),
        Capacity: 90,
        Speakers: [{ name: 'Sarah Connor', title: 'Blockchain Expert' }],
        Description: 'Implementing blockchain technology in large organizations.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Business Professionals',
        EventLevel: 'Advanced',
        EventTags: ['Blockchain', 'Enterprise Solutions']
    },
    {
        Id: 3,
        Subject: 'Cloud Computing in Modern Applications',
        StartTime: new Date(2025, 1, 25, 11, 0),
        EndTime: new Date(2025, 1, 25, 12, 0),
        Capacity: 75,
        Speakers: [{ name: 'Mark Johnson', title: 'Cloud Architect' }],
        Description: 'How cloud computing is changing modern software development.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Software Developers',
        EventLevel: 'Intermediate',
        EventTags: ['Cloud Computing', 'Software Development']
    },
    {
        Id: 4,
        Subject: 'Data Science for Beginners',
        StartTime: new Date(2025, 1, 25, 12, 0),
        EndTime: new Date(2025, 1, 25, 13, 0),
        Capacity: 65,
        Speakers: [{ name: 'Emily White', title: 'Data Scientist' }],
        Description: 'An introduction to the basics of data science and machine learning.',
        Duration: '1 hour',
        EventType: 'Workshop',
        TargetAudience: 'Beginners',
        EventLevel: 'Beginner',
        EventTags: ['Data Science', 'Machine Learning']
    },
    {
        Id: 5,
        Subject: 'Building Scalable Web Applications',
        StartTime: new Date(2025, 1, 25, 13, 0),
        EndTime: new Date(2025, 1, 25, 14, 0),
        Capacity: 100,
        Speakers: [{ name: 'Chris Walker', title: 'Web Developer' }],
        Description: 'Learn how to build web applications that can scale with demand.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Web Developers',
        EventLevel: 'Intermediate',
        EventTags: ['Web Development', 'Scalability']
    },
    {
        Id: 6,
        Subject: 'AI and the Future of Work',
        StartTime: new Date(2025, 1, 25, 14, 0),
        EndTime: new Date(2025, 1, 25, 15, 0),
        Capacity: 80,
        Speakers: [{ name: 'Linda Green', title: 'AI Strategist' }],
        Description: 'How AI will reshape the future of work and employment.',
        Duration: '1 hour',
        EventType: 'Keynote Session',
        TargetAudience: 'All Attendees',
        EventLevel: 'All Levels',
        EventTags: ['AI', 'Future of Work']
    },
    {
        Id: 7,
        Subject: 'Cybersecurity in the Digital Age',
        StartTime: new Date(2025, 1, 25, 15, 0),
        EndTime: new Date(2025, 1, 25, 16, 0),
        Capacity: 85,
        Speakers: [{ name: 'Tom Harris', title: 'Cybersecurity Expert' }],
        Description: 'Protecting digital assets in an increasingly interconnected world.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Security Professionals',
        EventLevel: 'Advanced',
        EventTags: ['Cybersecurity', 'Digital Protection']
    },
    {
        Id: 8,
        Subject: 'Internet of Things: Current Trends',
        StartTime: new Date(2025, 1, 25, 16, 0),
        EndTime: new Date(2025, 1, 25, 17, 0),
        Capacity: 60,
        Speakers: [{ name: 'Sam Lee', title: 'IoT Specialist' }],
        Description: 'An overview of the latest trends in the Internet of Things industry.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'IoT Engineers',
        EventLevel: 'Intermediate',
        EventTags: ['IoT', 'Technology Trends']
    }
];


let eventsName = [];

function isOverlapping(event1, event2) {
    return event1.RoomId === event2.RoomId &&
        ((event1.StartTime >= event2.StartTime && event1.StartTime < event2.EndTime) ||
            (event1.EndTime > event2.StartTime && event1.EndTime <= event2.EndTime) ||
            (event1.StartTime <= event2.StartTime && event1.EndTime >= event2.EndTime));
}

// Function to remove overlapping events from the events collection
function removeOverlappingEvents(events) {
    let filteredEvents = [];
    let toRemoveIndexes = new Set(); // To track events that should be removed

    // Iterate through each event
    for (let i = 0; i < events.length; i++) {
        const currentEvent = events[i];

        // Compare with all subsequent events (i + 1 onward)
        for (let j = i + 1; j < events.length; j++) {
            const compareEvent = events[j];
            if (isOverlapping(currentEvent, compareEvent)) {
                // If there's an overlap, mark the event at index j for removal
                toRemoveIndexes.add(j);
            }
        }

        // Always add the current event to the filtered list, unless it's in the remove list
        if (!toRemoveIndexes.has(i) && !checkRoomCapacity(currentEvent.Capacity, currentEvent.RoomId)) {
            filteredEvents.push(currentEvent);
            if (eventsName.indexOf(currentEvent.Subject) === -1) {
                eventsName.push({ id: eventsName.length + 1, name: currentEvent.Subject });
            }
        }
    }

    return filteredEvents;
}

const checkRoomAvailability = (startTime, endTime, eventId, roomId) => {

    let result = events.some((event) => {
        if (event.Id === eventId) {
            return false; // Skip this event
        }
        return (
            event.RoomId === roomId &&
            ((startTime >= event.StartTime && startTime < event.EndTime) ||
                (endTime > event.StartTime && endTime <= event.EndTime) ||
                (startTime <= event.StartTime && endTime >= event.EndTime))
        );
    });
    return result;
};



const checkRoomCapacity = (Capacity, RoomId) => {
    const room = rooms.find((room) => room.RoomId === RoomId);
    return room && room.RoomCapacity < Capacity;
}

events = removeOverlappingEvents(events);








const App = () => {
    const scheduleObj = useRef(null);
    const instance = new Internationalization();

    let eventsData = events;
    const [selectedRoom, setSelectedRoom] = useState(null);

    const onActionBegin = (args) => {
        if (args.requestType === "eventCreate") {
            let eventsData = args.requestType === "eventCreate" ? args.data[0] : args.data;
            const { StartTime, EndTime, RoomId, Capacity, Subject } = eventsData;

            if (checkRoomAvailability(StartTime, EndTime, null, RoomId)) {
                dialogInstance.current.content = 'The room is already booked for this time slot. Please select a different room or choose another available time.';
                setStatus(true);
                args.cancel = true;
                return;
            }

            if (checkRoomCapacity(Capacity, RoomId)) {
                dialogInstance.current.content = 'The room cannot accommodate the number of attendees. Please select a different room that is suitable for the required capacity.';
                setStatus(true);
                args.cancel = true;
                return;
            }

            if (eventsName.indexOf(Subject) === -1) {
                eventsName.push({ id: eventsName.length + 1, name: Subject });
            }
        }
        if (args.requestType === 'toolbarItemRendering') {
            // let exportItem2 = {
            //     align: 'Right', showTextOn: 'Both', prefixIcon: 'e-icons e-print',
            //     text: 'Print', cssClass: 'e-schedule-print', click: onPrintIconClick
            //   };
            let exportItem1 = {
                align: 'Right', showTextOn: 'Both', prefixIcon: 'e-icons e-export-excel',
                text: 'Excel Export', cssClass: 'e-excel-export', click: onExportClick
            };
            let exportItem2 = {
                align: 'Right', showTextOn: 'Both', prefixIcon: 'e-icons e-print',
                text: 'Print', cssClass: 'e-schedule-print', click: onPrintIconClick
            };
            args.items.push({ align: 'Right', cssClass: 'e-toolbar-item e-schedule-seperator e-separator' });
            args.items.push(exportItem1);
            args.items.push(exportItem2);
        }

        if (args.requestType === 'eventCreate' && isTreeItemDropped) {
            let treeViewData = treeObj.current.fields.dataSource;
            const filteredPeople = treeViewData.filter((item) => item.Id !== parseInt(draggedItemId, 10));
            treeObj.current.fields.dataSource = filteredPeople;
            let elements = document.querySelectorAll('.e-drag-item.treeview-external-drag');
            for (let i = 0; i < elements.length; i++) {
                remove(elements[i]);
            }
        }

    }

    const onExportClick = () => {
        const exportFields = [
            { name: 'RoomId', text: 'RoomId' },
            { name: 'Subject', text: 'Subject' },
            { name: 'StartTime', text: 'StartTime' },
            { name: 'EndTime', text: 'EndTime' }
        ];
        const exportValues = { fieldsInfo: exportFields };
        scheduleObj.current.exportToExcel(exportValues);
    }

    const onPrintIconClick = () => {
        scheduleObj.current.print();
    }

    const onRoomChange = (e) => {
        let value = e.value;
        setSelectedRoom(value);
        if (e.previousItem === null) {
            let resourceData = rooms.filter((calendar) => calendar.RoomId !== value);
            for (let idx = 0; idx < resourceData.length; idx++) {
                let resource = resourceData[idx];
                scheduleObj.current.removeResource(resource.RoomId, 'Rooms');
            }
        } else {
            scheduleObj.current.removeResource(e.previousItemData.RoomId, 'Rooms');
            let resourceData = rooms.filter((calendar) => calendar.RoomId === value);
            scheduleObj.current.addResource(resourceData[0], 'Rooms', value - 1);
        }

    };

    const getRoomName = (value) => {
        return ((value.resourceData) ?
            value.resourceData[value.resource.textField] :
            value.resourceName);
    }

    const getCapacity = (value) => {
        return 'Capacity - ' + value.resourceData.RoomCapacity;
    }

    const resourceHeaderTemplate = (props) => {
        console.log(props);
        return (<div className="template-wrap">
            <div className="resource-detail"><div className="resource-name">{getRoomName(props)}</div>
                <div>
                    <span className='e-icons e-capacity-icon'></span>
                    <span className='e-capacity'>{getCapacity(props)}</span>
                </div>
                {/* <div className="resource-designation">{getCapacity(props)}</div> */}
            </div></div>);
    }

    const onEventRendered = (args) => {
        console.log(args.data);
    }

    const onDragStop = (args) => {
        console.log(args);
        let eventsData = args.data;
        const { StartTime, EndTime, RoomId, Capacity } = eventsData;

        if (checkRoomAvailability(StartTime, EndTime, null, RoomId)) {
            dialogInstance.current.content = 'The room is already booked for this time slot. Please select a different room or choose another available time.';
            setStatus(true);
            args.cancel = true;
            // return;
        } else if (checkRoomCapacity(Capacity, RoomId)) {
            dialogInstance.current.content = 'The room cannot accommodate the number of attendees. Please select a different room that is suitable for the required capacity.';
            setStatus(true);
            args.cancel = true;
        }
    }


    let dialogInstance = useRef(null);
    const [status, setStatus] = useState(false);
    let animationSettings = { effect: 'None' };
    let buttons = [
        {
            // Click the footer buttons to hide the Dialog
            click: () => {
                setStatus(false);
            },
            // Accessing button component properties by buttonModel property
            buttonModel: {
                //Enables the primary button
                isPrimary: true,
                content: 'OK',
            },
        },
    ];
    const dialogClose = () => {
        setStatus(false);
    };
    const dialogOpen = () => {
        setStatus(true);
    };

    const headerTooltipTemplate = (props) => {
        let roomName = getRoomName(props); // Assuming getRoomName is a function that returns room name

        if (roomName === 'Room A') {
            return (
                <div className="template-wrap">
                    <div className="header">
                        Room Facilities
                    </div>
                    <ul className="facilities-list">
                        <li>Projector</li>
                        <li>Whiteboard</li>
                        <li>Audio System</li>
                        <li>High-speed Internet</li>
                        <li>Conference Phone</li>
                        <li>Adjustable Lighting</li>
                        <li>Power outlets available</li>
                        <li>Coffee/Water Station</li>
                    </ul>
                </div>
            );
        } else if (roomName === 'Room B') {
            return (
                <div className="template-wrap">
                    <div className="header">
                        Room Facilities
                    </div>
                    <ul className="facilities-list">
                        <li>4K Display</li>
                        <li>Whiteboard</li>
                        <li>Audio System</li>
                        <li>Video Conferencing Setup</li>
                        <li>High-speed Internet</li>
                        <li>Adjustable Lighting</li>
                        <li>Power outlets available</li>
                        <li>Coffee/Water Station</li>
                    </ul>
                </div>
            );
        } else if (roomName === 'Room C') {
            return (
                <div className="template-wrap">
                    <div className="header">
                        Room Facilities
                    </div>
                    <ul className="facilities-list">
                        <li>Projector</li>
                        <li>Whiteboard</li>
                        <li>Audio System</li>
                        <li>High-speed Internet</li>
                        <li>Air Conditioning</li>
                        <li>Power outlets available</li>
                        <li>Coffee/Water Station</li>
                        <li>Video Recording Setup</li>
                    </ul>
                </div>
            );
        } else if (roomName === 'Room D') {
            return (
                <div className="template-wrap">
                    <div className="header">
                        Room Facilities
                    </div>
                    <ul className="facilities-list">
                        <li>Projector</li>
                        <li>Whiteboard</li>
                        <li>Audio System</li>
                        <li>High-speed Internet</li>
                        <li>Conference Phone</li>
                        <li>Adjustable Lighting</li>
                        <li>Power outlets available</li>
                        <li>Coffee/Water Station</li>
                    </ul>
                </div>
            );
        }

        // Return null or any fallback if the room name is neither Room A nor Room B
        return null;
    };

    const fieldsData = {
        subject: { name: 'Subject' },
        startTime: { name: 'StartTime', validation: { required: true } },
        endTime: { name: 'EndTime', validation: { required: true } },
        roomId: { name: 'RoomId' },
        description: {
            name: 'Capacity', title: 'Participants Count',
            validation: { required: true }
            // validation: { required: true, minLength: [minValidation(fieldsData), 'Need atleast 5 letters to be entered'] }
        }
    };

    const onPopupClose = (args) => {
        if (args.type === 'Editor' && args.event.target.textContent !== 'Cancel') {
            let roomId = args.data.RoomId;
            let startTime = args.data.StartTime;
            let endTime = args.data.EndTime;
            let capacity = args.data.Capacity;
            let eventId = null;
            if (args.target) {
                eventId = scheduleObj.current.getEventDetails(args.target).Id;
            }
            let isRoomAvailable = !checkRoomAvailability(startTime, endTime, eventId, roomId);
            let isCapacityAvailable = !checkRoomCapacity(capacity, roomId);

            if (!isRoomAvailable) {
                let timeElement = args.element.querySelector('.e-start-end-row');
                if (!args.element.querySelector('.time-alert')) {
                    const newDiv = document.createElement('div');
                    newDiv.classList.add('time-alert');
                    newDiv.textContent = 'The room is already booked for this time slot. Please select a different room or choose another available time.';
                    timeElement.insertAdjacentElement('afterend', newDiv);
                }
            } else {
                if (args.element.querySelector('.time-alert')) {
                    args.element.querySelector('.time-alert').remove();
                }
            }

            if (!isCapacityAvailable) {
                let timeElement = args.element.querySelector('.e-description-row');
                if (!args.element.querySelector('.capacity-alert')) {
                    const newDiv = document.createElement('div');
                    newDiv.classList.add('capacity-alert');
                    newDiv.textContent = 'The room cannot accommodate the number of attendees. Please select a different room that is suitable for the required capacity.';
                    timeElement.insertAdjacentElement('afterend', newDiv);
                }
            } else {
                if (args.element.querySelector('.capacity-alert')) {
                    args.element.querySelector('.capacity-alert').remove();
                }
            }

            if (!isRoomAvailable || !isCapacityAvailable) {
                args.cancel = true;
            }
        }
    }


    const getTimeString = (value) => {
        return instance.formatDate(value, { type: 'time', skeleton: 'short' });
    }

    const agendaTemplate = (props) => {
        console.log(props);
        return (
            // <div>
            //     <div className="subject "><strong>{props.Subject}</strong></div>
            //     <div className="description ">{props.Description}</div>
            //     <div className="time"><strong>Time Slot:</strong>{getTimeString(props.StartTime) + ' - ' + getTimeString(props.EndTime)}</div>
            //     <div className="type"><strong>Event type:</strong> {props.EventType}</div>
            //     <div className="speaker"><strong>Speakers:</strong> {props.Speakers[0].name + '- ' + props.Speakers[0].title}</div>
            //     <div className="capacity"><strong>Audience Size:</strong> {props.Capacity}</div>
            // </div>

            <div className="agenda-event">
                <div className="event-header">
                    <div className="event-subject">
                        <strong>{props.Subject}</strong>
                    </div>
                    <div className="event-description">{props.Description}</div>
                </div>

                <div className="event-time">
                    <strong><label>Time Slot</label>: </strong>{getTimeString(props.StartTime) + ' - ' + getTimeString(props.EndTime)}
                </div>

                <div className="event-details">
                    <div className="event-type"><strong><label>Event Type</label>: </strong>{props.EventType}</div>
                    <div className="event-capacity"><strong><label>Audience Size</label>: </strong>{props.Capacity}</div>
                </div>

                {props.Speakers && props.Speakers.length > 0 && (
                    <div className="event-speaker">
                        <strong><label>Speakers</label>:</strong>
                        <div className="speaker-details">
                            <div className="speaker-image"></div>
                            <div className="speaker-info">
                                <div><strong>{props.Speakers[0].name}</strong></div>
                                <div>{props.Speakers[0].title}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    const [filter, setFilter] = useState('');

    // Handle filtering based on the text input
    const onFilterChange = (e) => {
        setFilter(e.itemData.name);
    };

    // Create the query to filter events
    const filteredQuery = new Query().where('Subject', 'contains', filter, true);

    let treeObj = useRef(null);
    let isTreeItemDropped = false;
    let draggedItemId = '';
    const allowDragAndDrops = true;
    const fields = { dataSource: availableEvents, id: 'Id', text: 'Subject', duration: 'Duration' };

    const treeTemplate = (props) => {
        return (
            <div id="waiting">
                <div id="waitdetails">
                    <div id="waitlist">{props.Subject}</div>
                    <div id="waitduration">Duration: {props.Duration}</div>
                    <div id="waitcapacity">Audience Size: {props.Capacity}</div>
                </div>
            </div>
        );
    }

    const onItemSelecting = (args) => {
        args.cancel = true;
    };
    const onTreeDrag = (event) => {
        if (scheduleObj.current.isAdaptive) {
            let classElement = scheduleObj.current.element.querySelector('.e-device-hover');
            if (classElement) {
                classElement.classList.remove('e-device-hover');
            }
            if (event.target.classList.contains('e-work-cells')) {
                addClass([event.target], 'e-device-hover');
            }
        }
    };

    const onTreeDragStop = (event) => {
        let treeElement = closest(event.target, '.e-treeview');
        let classElement = scheduleObj.current.element.querySelector('.e-device-hover');
        if (classElement) {
            classElement.classList.remove('e-device-hover');
        }
        if (!treeElement) {
            event.cancel = true;
            let scheduleElement = closest(event.target, '.e-content-wrap');
            if (scheduleElement) {
                let treeviewData = treeObj.current.fields.dataSource;
                if (event.target.classList.contains('e-work-cells')) {
                    const filteredData = treeviewData.filter((item) => item.Id === parseInt(event.draggedNodeData.id, 10));
                    const { Subject, Capacity, Speakers, Description, Duration, EventType, TargetAudience, EventLevel, EventTags } = filteredData[0];

                    let cellData = scheduleObj.current.getCellDetails(event.target);
                    let StartTime = cellData.startTime;
                    let EndTime;

                    // Extracting the number and the unit from the duration
                    let durationValue = parseInt(Duration.split(' ')[0]);
                    let durationUnit = Duration.split(' ')[1];

                    // Create a copy of the StartTime to avoid mutating the original StartTime
                    let endTime = new Date(StartTime);

                    if (durationUnit === 'hour' || durationUnit === 'hours') {
                        endTime.setHours(endTime.getHours() + durationValue);  // Adds hours to StartTime
                    } else if (durationUnit === 'minute' || durationUnit === 'minutes') {
                        endTime.setMinutes(endTime.getMinutes() + durationValue);  // Adds minutes to StartTime
                    }

                    EndTime = endTime;

                    let resourceDetails = scheduleObj.current.getResourcesByIndex(cellData.groupIndex);
                    let roomId = resourceDetails.resourceData.RoomId;

                    if (checkRoomAvailability(StartTime, EndTime, null, roomId)) {
                        dialogInstance.current.content = 'The room is already booked for this time slot. Please select a different room or choose another available time.';
                        setStatus(true);
                        return;
                    } else if (checkRoomCapacity(Capacity, roomId)) {
                        dialogInstance.current.content = 'The room cannot accommodate the number of attendees. Please select a different room that is suitable for the required capacity.';
                        setStatus(true);
                        return;
                    }

                    let eventData = {
                        Subject: Subject,
                        StartTime: StartTime,
                        EndTime: EndTime,
                        RoomId: roomId,
                        Capacity: Capacity,
                        Speakers: Speakers,
                        Description: Description,
                        Duration: Duration,
                        EventType: EventType,
                        TargetAudience: TargetAudience,
                        EventLevel: EventLevel,
                        EventTags: EventTags,
                        IsAllDay: cellData.isAllDay,
                    };
                    scheduleObj.current.openEditor(eventData, 'Add', true);
                    isTreeItemDropped = true;
                    draggedItemId = event.draggedNodeData.id;
                }
            }
        }
        document.body.classList.remove('e-disble-not-allowed');
    };

    const onTreeDragStart = () => {
        document.body.classList.add('e-disble-not-allowed');
    };


    const onPopupOpen = (args) => {
        // if (args.target && !args.target.classList.contains('e-appointment') && !isNullOrUndefined(titleObj) && !isNullOrUndefined(titleObj.current)) {
        //     titleObj.current.focusIn();
        // }
    }


    const getResourceData = (data) => {
        const resources = scheduleObj.current.getResourceCollections().slice(-1)[0];
        const resourceData = (resources.dataSource).filter((resource) => resource.RoomId === data.RoomId)[0];
        return resourceData;
    }

    const getHeaderStyles = (data) => {
        if (data.elementType !== 'cell') {
            const resourceData = getResourceData(data);
            return { background: resourceData.RoomColor, color: '#FFFFFF' };
        }
        return;
    }

    const getHeaderDetails = (data) => {
        return instance.formatDate(data.StartTime, { type: 'date', skeleton: 'full' }) + ' (' +
            instance.formatDate(data.StartTime, { skeleton: 'hm' }) + ' - ' +
            instance.formatDate(data.EndTime, { skeleton: 'hm' }) + ')';
    }

    const buttonClickActions = (e) => {
        const eventDetails = scheduleObj.current.activeEventData.event;
        if (e.target.id === 'delete') {
            let currentAction = 'Delete';
            if (eventDetails.RecurrenceRule) {
                currentAction = 'DeleteOccurrence';
            }
            scheduleObj.current.deleteEvent(eventDetails, currentAction);
        }
        else {
            let currentAction = 'Save';
            if (eventDetails.RecurrenceRule) {
                currentAction = 'EditOccurrence';
            }
            scheduleObj.current.openEditor(eventDetails, currentAction, true);
        }
        scheduleObj.current.closeQuickInfoPopup();
    };

    const headerTemplate = (props) => {
        return (
            <div className="quick-info-header">
                <div className="quick-info-header-content" style={getHeaderStyles(props)}>
                    <div className="quick-info-title">{props.Subject}</div>
                    <div className="duration-text">{getHeaderDetails(props)}</div>
                </div>
            </div>
        );
    }

    const contentTemplate = (props) => {
        if (props.elementType !== 'cell') {
            return (
                <div className="quick-info-content">
                    {
                        <div className="event-content">
                            <div className="meeting-type-wrap">
                                <label>Subject</label>:
                                <span>{props.Description}</span>
                            </div>
                            <div className="meeting-subject-wrap">
                                <label>Type</label>:
                                <span>{props.EventType}</span>
                            </div>
                            <div className="notes-wrap">
                                <label>Speakers</label>:
                                <span>{props.Speakers[0].name} ({props.Speakers[0].title})</span>
                            </div>
                        </div>
                    }
                </div>
            );
        } return;
    }

    const footerTemplate = (props) => {
        return (
            <div className="quick-info-footer">
                {
                    <div className="event-footer">
                        <ButtonComponent id="delete" cssClass='e-flat' content="Delete" onClick={buttonClickActions.bind(this)} />
                        <ButtonComponent id="edit" cssClass='e-flat' content="Edit" isPrimary={true} onClick={buttonClickActions.bind(this)} />
                    </div>
                }
            </div>
        );
    }

    return (<div className='schedule-control-section'>
        <div className='col-lg-12 control-section'>
            <div className='control-wrapper drag-sample-wrapper'>
                <div className="schedule-container">
                    <ScheduleComponent
                        ref={scheduleObj}
                        cssClass='schedule-drag-drop'
                        currentView='Day'
                        selectedDate={new Date(2025, 1, 24)}
                        width='100%' height='650px'
                        startHour="07:00"
                        endHour="19:00"
                        eventSettings={{ dataSource: eventsData, fields: fieldsData, query: filteredQuery }}
                        group={{ resources: ['Rooms'], headerTooltipTemplate: headerTooltipTemplate.bind(this) }}
                        actionBegin={onActionBegin}
                        resourceHeaderTemplate={resourceHeaderTemplate}
                        eventRendered={onEventRendered}
                        dragStop={onDragStop}
                        popupClose={onPopupClose}
                        quickInfoTemplates={{ header: headerTemplate.bind(this), content: contentTemplate.bind(this), footer: footerTemplate.bind(this) }} popupOpen={onPopupOpen.bind(this)}

                    >
                        <ViewsDirective>
                            <ViewDirective option="Day" />
                            <ViewDirective option="Week" />
                            <ViewDirective option="Agenda" eventTemplate={agendaTemplate} />
                        </ViewsDirective>
                        <ResourcesDirective>
                            <ResourceDirective
                                field="RoomId"
                                title="Rooms"
                                name="Rooms"
                                dataSource={rooms}
                                textField="RoomName"
                                idField="RoomId"
                                colorField="RoomColor"
                                capacityField='Capacity'
                            />
                        </ResourcesDirective>
                        <Inject services={[TimelineViews, Agenda, Week, Day, DragAndDrop, ExcelExport, Print]} />
                    </ScheduleComponent>
                </div>
                <div className="treeview-container">
                    <div className="title-container">
                        <h1 className="title-text">Available Staffs</h1>
                    </div>
                    <TreeViewComponent ref={treeObj} cssClass='treeview-external-drag' dragArea=".drag-sample-wrapper" nodeTemplate={treeTemplate} fields={fields} nodeDragStop={onTreeDragStop} nodeSelecting={onItemSelecting} nodeDragging={onTreeDrag} nodeDragStart={onTreeDragStart} allowDragAndDrop={allowDragAndDrops} />
                </div>
                <div id="target" className="col-lg-8">
                    <DialogComponent id="modalDialog" isModal={true} buttons={buttons} header="Notice" width="335px" content="" ref={dialogInstance} target="#target" visible={status} open={dialogOpen} close={dialogClose} animationSettings={animationSettings}></DialogComponent>
                </div>
                <div className='e-room-selection'>
                    <div className="title-container">
                        <h4 className="title-text">Select Room</h4>
                    </div>
                    <DropDownListComponent
                        dataSource={rooms}
                        fields={{ text: 'RoomName', value: 'RoomId' }}
                        placeholder="Select Room"
                        value={selectedRoom}
                        change={onRoomChange}
                    />
                    <div className="title-container">
                        <h4 className="title-text">Select Event</h4>
                    </div>
                    <DropDownListComponent
                        dataSource={eventsName}
                        fields={{ text: 'name', value: 'id' }}
                        placeholder="Select Event"
                        // value={selectedRoom}
                        change={onFilterChange}
                    />
                </div>
            </div>
        </div>
    </div>);
};
export default App;