import React from "react";



// Function to generate randomized email addresses
const generateEmail = (firstName: string, lastName: string) => {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
  const domain = "@gcc.edu";
  return `${initials.toLowerCase()}${Math.floor(Math.random() * 100)}${domain}`;
};

// Function to generate randomized office hours
const generateOfficeHours = () => {
  const hours = [];
  const timeSlots = ["8:00 am", "9:00 am", "10:00 am", "11:00 am", "12:00 pm", "1:00 pm", "2:00 pm", "3:00 pm", "4:00 pm"];
  for (let i = 0; i < 2; i++) {
    const startTime = timeSlots[Math.floor(Math.random() * timeSlots.length)];
    const endTime = timeSlots[Math.floor(Math.random() * timeSlots.length)];
    hours.push(`${startTime} - ${endTime}`);
  }
  return hours;
};

// Function to generate randomized office numbers
const generateOfficeNumbers = () => {
  const buildings = ["STEM", "HAL", "PFAC"];
  const roomNumbers = Array.from({ length: 300 }, (_, i) => 100 + i);
    const building = buildings[Math.floor(Math.random() * buildings.length)];
    const roomNumber = roomNumbers[Math.floor(Math.random() * roomNumbers.length)];
  return `${building} ${roomNumber}`;
};

export default function ProfessorCard(props: { profileImageUrl?: any; department?: any; firstName?: any; lastName?: any; roomNumber?: any; officeHours?: any; bio?: any; rating?: any; difficulty?: any; numRatings?: any; }) {
  const { department, firstName, lastName, roomNumber, officeHours, bio, rating, difficulty, numRatings } = props;
  const tempBio = `Dr. ${lastName} is a professor of ${department} at Grove City College. They are excited to meet you and help you learn more about their subject!`;

  // Generate randomized data
  const email = generateEmail(firstName, lastName);
  const randomizedOfficeHours = generateOfficeHours();
  const randomizedOfficeNumbers = generateOfficeNumbers();

  return (
    <div className="bg-white rounded-lg p-5 shadow-lg">
      <div className="flex items-center space-x-4 pb-5 border-b">
        <div>
          <h2 className="text-xl font-bold">{firstName} {lastName}</h2>
          <p className="text-gray-500">{department}</p>
          <p className="text-gray-500 text-sm">{email}</p>
        </div>
      </div>

      <div className="pt-5 space-y-2 pb-5 border-b">
        <div className="flex justify-between items-center pb-2">
          <p className="font-bold inline">Room Number:</p>
          <p className="inline text-gray-600 font-bold text-sm">{randomizedOfficeNumbers}</p>
        </div>
        <div className="flex justify-between items-top pb-2">
          <p className="inline font-bold ">Office Hours:</p>
          <div className="inline text-gray-600 text-sm">
            {randomizedOfficeHours.map((slot, index) => (
              <p key={index}>{slot}</p>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-top">
          <p className="font-bold inline pr-2">Bio:</p>
          <p className="inline text-gray-600 text-sm">{bio || tempBio}</p>
        </div>
      </div>

      <div className="pt-5 p-2 rounded bg-gray-300">
        <div className="flex flex-col items-center">
            <h3 className="font-bold pb-5">Rate My Professor Score</h3>
        </div>
        <div className="flex justify-between items-top pb-2">
          <p className="font-bold inline pr-2">{rating}/5</p>
          <p className="inline text-sm">from <strong>{numRatings}</strong> reviews</p>
        </div>
        <div className="flex justify-between items-top">
          <p className="font-bold inline pr-2">Difficulty:</p>
          <p className="inline">{difficulty}</p>
        </div>
      </div>
    </div>
  );
}


