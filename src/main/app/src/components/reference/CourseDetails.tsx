// import React, {ReactNode} from 'react';
// import { Box, Typography, Card} from '@mui/material';
// import BookIcon from '@mui/icons-material/Book';
// import LocationOnIcon from '@mui/icons-material/LocationOn';

// export default function CourseDetails() {
//   const courses = [
//     {
//       title: "Introduction to Computer Science",
//       code: "COMP 101",
//       location: "Room 101",
//       time: "MWF: 12:34 pm"
//     },
//     {
//       title: "Advanced Mathematics",
//       code: "MATH 201",
//       location: "Room 202",
//       time: "TTR: 2:00 pm"
//     },
//     // Add more courses as needed
//   ];

//   const assignments = [
//     {
//       name: "Programming Assignment 1",
//       dueDate: "2024-02-20",
//       dueTime: "11:59 pm"
//     },
//     {
//       name: "Mathematics Quiz",
//       dueDate: "2024-02-25",
//       dueTime: "10:00 am"
//     },
//     // Add more assignments as needed
//   ];

//     interface MainCardProps {
//     content: ReactNode;
//     }

//     const MainCard: React.FC<MainCardProps> = ({ content }) => {
//         const shadowValues = [
//         [-72, 103, 35, 0, [98, 119, 147], 0],
//         [-46, 66, 32, 0, [98, 119, 147], .01],
//         [-26, 37, 27, 0, [98, 119, 147], .05],
//         [-12, 16, 20, 0, [98, 119, 147], .09],
//         [-3, 4, 11, 0, [98, 119, 147], .10],
//         ];

//         const boxShadow = shadowValues.map(
//         ([x, y, blur, spread, color, opacity]) =>
//             `${x}px ${y}px ${blur}px ${spread}px rgba(${(color as number[]).join(',')}, ${opacity})`
//         ).join(',');

//         return (
//         <Card
//             style={{
//                 boxShadow: boxShadow,
//                 margin: '20px', // add margin if necessary
//                 padding: '30px',
//                 width: '350px',
//                 height: '350px',
//                 borderRadius: '30px',
//                 backgroundColor: 'rgba(255, 255, 255, 0.5)', // Adjust RGB values and opacity as needed
//                 backdropFilter: 'blur(4px)',
//             }}
//         >
//             {content}
//         </Card>
//         );
//     }

//   return (
//     <Box
//         display="flex"
//         flexDirection="row"
//     >
//       {courses.map((course) => (
//         <MainCard
//           key={course.title}
//           content={
//             <>
//             <div>
//               <Typography style={{fontSize: '18px', fontWeight: '900', color: '#5D7888', textTransform: 'uppercase', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{course.title}</Typography>
//             </div>
//             <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
//               <Typography variant="subtitle1">
//                 <BookIcon style={{width: '18px', height: 'auto', color: '#5D7888'}} /> {course.code}
//               </Typography>
//               <Typography variant="subtitle1">
//                 <LocationOnIcon style={{width: '18px', height: 'auto', color: '#5D7888'}}/> {course.location}
//               </Typography>
//             </div>
//             <Box sx={{borderWidth: '1px', borderColor: '#5D7888', borderRadius: '8px', padding: '3px', margin: '10px 0 10px 0'}}>
//               <Typography variant="subtitle1" style={{fontWeight: '100', color: '#5D7888'}}>{course.time}</Typography>
//             </Box>
//             <Box sx={{borderWidth: '1px', borderColor: '#5D7888', borderRadius: '8px', padding: '3px', margin: '10px 0 10px 0'}}>
//               <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
//                 <Typography variant="subtitle1" style={{fontWeight: '500', color: '#5D7888'}}>Assignments</Typography>
//               </div>
//                 <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '20px'}}>
//                     <Typography variant="body1" style={{fontWeight: '100', color: '#5D7888', fontSize: '10px'}}>Name</Typography>
//                   <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
//                     <Typography variant="body1" style={{fontWeight: '100', color: '#5D7888', fontSize: '10px', paddingRight: '20px'}}>Date</Typography>
//                     <Typography variant="body1" style={{fontWeight: '100', color: '#5D7888', fontSize: '10px'}}>Time</Typography>
//                   </div>
//                 </div>
//               {assignments.map((assignment) => (
//                 <div key={assignment.name} style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '20px'}}>
//                     <Typography variant="body1" style={{fontWeight: '300', color: '#5D7888', fontSize: '10px'}}>{assignment.name}</Typography>
//                     <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
//                     <Typography variant="body1" style={{fontWeight: '100', color: '#5D7888', fontSize: '10px', paddingRight: '20px'}}>{assignment.dueDate}</Typography>
//                     <Typography variant="body1" style={{fontWeight: '100', color: '#5D7888', fontSize: '10px'}}>{assignment.dueTime}</Typography>
//                   </div>
//                 </div>
//               ))}
//             </Box>
//             </>
//           }
//         />
//       ))}
//     </Box>
//   );
// }
