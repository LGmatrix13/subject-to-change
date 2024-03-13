// import React, {ReactNode} from 'react';
// import { Card } from '@mui/material';

// interface MainCardProps {
//   content: ReactNode;
// }

// const MainCard: React.FC<MainCardProps> = ({ content }) => {
//     const shadowValues = [
//       [-72, 103, 35, 0, [98, 119, 147], 0],
//       [-46, 66, 32, 0, [98, 119, 147], .01],
//       [-26, 37, 27, 0, [98, 119, 147], .05],
//       [-12, 16, 20, 0, [98, 119, 147], .09],
//       [-3, 4, 11, 0, [98, 119, 147], .10],
//     ];

//     const boxShadow = shadowValues.map(
//       ([x, y, blur, spread, color, opacity]) =>
//         `${x}px ${y}px ${blur}px ${spread}px rgba(${(color as number[]).join(',')}, ${opacity})`
//     ).join(',');

//     return (
//       <Card
//         style={{
//             boxShadow: boxShadow,
//             margin: '20px', // add margin if necessary
//             padding: '20px',
//             borderRadius: '30px',
//             backgroundColor: 'rgba(255, 255, 255, 0.5)', // Adjust RGB values and opacity as needed
//             backdropFilter: 'blur(4px)',
//         }}
//       >
//         {content}
//       </Card>
//     );
// }

// export default MainCard;
